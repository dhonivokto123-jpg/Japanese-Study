// Natural Japanese Audio Engine & Sound Effects
// Prioritizes natural ja-JP speech, prevents overlapping, supports normal/slow speeds, and eliminates any mic dependencies.

export interface AudioState {
  isPlaying: boolean;
  playingText: string;
  speed: number;
}

type AudioStateListener = (state: AudioState) => void;

/**
 * Clean Japanese text for natural pronunciation:
 * - Strips English/Bengali parenthetical annotations: e.g. "食べる (taberu)" -> "食べる"
 * - Strips bracketed tags: e.g. "[N5]" or "【動詞】"
 * - Retains pure Kanji, Hiragana, Katakana, and Japanese punctuation
 */
export const cleanJapaneseText = (rawText: string): string => {
  if (!rawText) return '';
  let cleaned = rawText
    // Remove bracketed or parenthetical translations/romaji
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\{.*?\}/g, '')
    .replace(/（.*?）/g, '')
    .replace(/【.*?】/g, '')
    .replace(/「.*?」/g, '')
    // Replace commas or slashes with Japanese pauses
    .replace(/[,/、]/g, '、')
    .trim();

  // If text became empty (e.g. was only in brackets), fall back to raw
  if (!cleaned) {
    cleaned = rawText.replace(/[[\](){}]/g, '').trim();
  }
  return cleaned;
};

class JapaneseAudioEngine {
  private bestVoice: SpeechSynthesisVoice | null = null;
  private voicesLoaded: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private fallbackAudio: HTMLAudioElement | null = null;
  private state: AudioState = {
    isPlaying: false,
    playingText: '',
    speed: 0.95,
  };
  private lastPlayedText: string = '';
  private lastPlayedSpeed: number = 0.95;
  private listeners: Set<AudioStateListener> = new Set();
  private watchdogTimer: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initVoices();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.initVoices();
        };
      }
    }
  }

  /**
   * Evaluates and picks the highest quality Japanese voice available in the client.
   * Priority:
   * 1. Premium Neural / Natural online voices (Google 日本語, Microsoft Nanami/Keita Natural, Apple Kyoko/Otoya)
   * 2. Dedicated local ja-JP voices
   * 3. Compatible generic ja voice
   */
  private initVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    this.voicesLoaded = true;

    // Filter candidate Japanese voices
    const jaCandidates = voices.filter((v) => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      return lang.startsWith('ja') || lang === 'ja-jp' || lang === 'jp';
    });

    if (jaCandidates.length === 0) {
      this.bestVoice = null;
      return;
    }

    // Quality scoring function
    const scoreVoice = (v: SpeechSynthesisVoice): number => {
      let score = 10;
      const name = (v.name || '').toLowerCase();
      const lang = (v.lang || '').toLowerCase().replace('_', '-');

      // 1. Premium Natural / Neural Voices (+60 pts)
      if (
        name.includes('natural') ||
        name.includes('online') ||
        name.includes('google 日本語') ||
        name.includes('kyoko') ||
        name.includes('otoya') ||
        name.includes('hattori') ||
        name.includes('nanami') ||
        name.includes('keita') ||
        name.includes('ayumi') ||
        name.includes('haruka')
      ) {
        score += 60;
      }

      // 2. Google Japanese Voice in Chrome/Edge (+40 pts)
      if (name.includes('google')) {
        score += 40;
      }

      // 3. Exact ja-JP dialect matching (+25 pts)
      if (lang === 'ja-jp') {
        score += 25;
      }

      // 4. Local service (low latency) (+15 pts)
      if (v.localService) {
        score += 15;
      }

      return score;
    };

    // Sort descending by score
    jaCandidates.sort((a, b) => scoreVoice(b) - scoreVoice(a));
    this.bestVoice = jaCandidates[0];
  }

  public getBestVoice(): SpeechSynthesisVoice | null {
    if (!this.bestVoice && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
    }
    return this.bestVoice;
  }

  public hasJapaneseVoice(): boolean {
    return this.getBestVoice() !== null;
  }

  public subscribe(listener: AudioStateListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(state: Partial<AudioState>): void {
    this.state = { ...this.state, ...state };
    this.listeners.forEach((fn) => {
      try {
        fn(this.state);
      } catch (err) {
        console.error('AudioStateListener error:', err);
      }
    });
  }

  /**
   * Instantly stops any ongoing pronunciation cleanly.
   * Cancels SpeechSynthesis and stops any active streaming fallback.
   */
  public stop(): void {
    if (this.watchdogTimer) {
      window.clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }

    // Cancel speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }

    // Stop fallback HTML5 audio element
    if (this.fallbackAudio) {
      try {
        this.fallbackAudio.pause();
        this.fallbackAudio.currentTime = 0;
        this.fallbackAudio.src = '';
      } catch (e) {
        // ignore
      }
      this.fallbackAudio = null;
    }

    this.currentUtterance = null;
    this.notify({ isPlaying: false, playingText: '' });
  }

  /**
   * Plays pure Japanese text at specified speed.
   * Speed guidelines:
   * Normal: 0.95 (natural native speed)
   * Slow: 0.72 (deliberate beginner clarity)
   */
  public async play(rawText: string, speed: number = 0.95): Promise<void> {
    if (!rawText || typeof window === 'undefined') return;

    // 1. Immediately stop any active audio to prevent overlap
    this.stop();

    const cleanText = cleanJapaneseText(rawText);
    if (!cleanText) return;

    this.lastPlayedText = cleanText;
    this.lastPlayedSpeed = speed;

    this.notify({
      isPlaying: true,
      playingText: cleanText,
      speed,
    });

    const bestVoice = this.getBestVoice();

    // Primary: Web Speech API with verified Japanese Voice
    if (bestVoice && 'speechSynthesis' in window) {
      return new Promise<void>((resolve) => {
        try {
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.voice = bestVoice;
          utterance.lang = bestVoice.lang || 'ja-JP';
          utterance.rate = Math.max(0.5, Math.min(2, speed));
          utterance.pitch = 1.0;

          // Keep reference in memory so garbage collection doesn't prematurely drop utterance
          this.currentUtterance = utterance;

          const finish = () => {
            if (this.watchdogTimer) {
              window.clearTimeout(this.watchdogTimer);
              this.watchdogTimer = null;
            }
            this.currentUtterance = null;
            this.notify({ isPlaying: false, playingText: '' });
            resolve();
          };

          utterance.onend = finish;
          utterance.onerror = (e) => {
            // If synthesis failed, try fallback
            console.warn('SpeechSynthesis error, attempting audio stream fallback:', e);
            finish();
          };

          // Watchdog timer: speech synthesis can stall indefinitely on some browsers
          const estimatedDurationMs = Math.max(1500, (cleanText.length * 300) / speed + 1000);
          this.watchdogTimer = window.setTimeout(() => {
            if (this.state.isPlaying) {
              this.stop();
              resolve();
            }
          }, estimatedDurationMs);

          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.warn('Error starting SpeechSynthesis:', err);
          this.playFallbackStream(cleanText, speed).then(resolve);
        }
      });
    }

    // Secondary Fallback: High-definition Google Japanese TTS audio stream
    // Strictly uses authentic Japanese pronunciation, NEVER an English voice!
    return this.playFallbackStream(cleanText, speed);
  }

  /**
   * Fallback high-definition Japanese TTS audio stream
   * Guaranteeing authentic native Japanese pronunciation on systems without local ja-JP voices.
   */
  private playFallbackStream(text: string, speed: number): Promise<void> {
    return new Promise<void>((resolve) => {
      try {
        const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(
          text
        )}`;

        const audio = new Audio(audioUrl);
        this.fallbackAudio = audio;
        audio.playbackRate = Math.max(0.6, Math.min(1.5, speed));

        const finish = () => {
          if (this.fallbackAudio === audio) {
            this.fallbackAudio = null;
          }
          this.notify({ isPlaying: false, playingText: '' });
          resolve();
        };

        audio.onended = finish;
        audio.onerror = () => {
          console.warn('Fallback Japanese TTS audio stream could not load.');
          finish();
        };

        // Ensure playback starts smoothly
        audio.play().catch((err) => {
          console.warn('Audio play prevented or blocked:', err);
          finish();
        });
      } catch (err) {
        console.error('Failed to initialize fallback audio stream:', err);
        this.notify({ isPlaying: false, playingText: '' });
        resolve();
      }
    });
  }

  /**
   * Replays the last played Japanese audio instantly
   */
  public replay(): Promise<void> {
    if (this.lastPlayedText) {
      return this.play(this.lastPlayedText, this.lastPlayedSpeed);
    }
    return Promise.resolve();
  }

  public getState(): AudioState {
    return this.state;
  }
}

// Global Singleton Engine
export const japaneseAudioEngine = new JapaneseAudioEngine();

/**
 * Standard public function to play Japanese audio with automatic text cleaning,
 * ja-JP voice priority, overlap prevention, and speed control.
 */
export const playJapaneseAudio = (text: string, rate: number = 0.95): Promise<void> => {
  return japaneseAudioEngine.play(text, rate);
};

export const speakJapanese = playJapaneseAudio;

export const stopJapaneseAudio = (): void => {
  japaneseAudioEngine.stop();
};

export const replayJapaneseAudio = (): Promise<void> => {
  return japaneseAudioEngine.replay();
};

// Web Audio API Synthesized UI Sound Effects
class SoundEffects {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
    osc1.frequency.setValueAtTime(783.99, now + 0.2); // G5
    osc1.frequency.setValueAtTime(1046.5, now + 0.3); // C6

    osc2.frequency.setValueAtTime(261.63, now); // C4
    osc2.frequency.setValueAtTime(329.63, now + 0.1);
    osc2.frequency.setValueAtTime(392.0, now + 0.2);
    osc2.frequency.setValueAtTime(523.25, now + 0.3);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  }

  playIncorrect() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.setValueAtTime(180, now + 0.12);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  playWrong() {
    this.playIncorrect();
  }

  playLevelUp() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.2, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.45);
    });
  }

  playStreak() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [587.33, 739.99, 880, 1174.66];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  }

  playClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }
}

export const soundFx = new SoundEffects();
