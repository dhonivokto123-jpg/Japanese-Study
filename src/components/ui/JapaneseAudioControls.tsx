import React, { useState, useEffect, useCallback } from 'react';
import {
  japaneseAudioEngine,
  cleanJapaneseText,
  playJapaneseAudio,
  stopJapaneseAudio,
  replayJapaneseAudio,
} from '../../utils/audio';
import { Volume2, Snail, RotateCcw, VolumeX } from 'lucide-react';

/**
 * Hook to interact with the natural Japanese audio engine
 */
export function useJapaneseAudio(targetText?: string) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isThisPlaying, setIsThisPlaying] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = japaneseAudioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      if (targetText) {
        const cleanTarget = cleanJapaneseText(targetText);
        setIsThisPlaying(state.isPlaying && state.playingText === cleanTarget);
      } else {
        setIsThisPlaying(state.isPlaying);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [targetText]);

  const play = useCallback(
    (textToPlay?: string, speed: number = 0.95) => {
      const text = textToPlay || targetText || '';
      if (!text) return;
      return playJapaneseAudio(text, speed);
    },
    [targetText]
  );

  const playSlow = useCallback(
    (textToPlay?: string) => {
      const text = textToPlay || targetText || '';
      if (!text) return;
      return playJapaneseAudio(text, 0.72);
    },
    [targetText]
  );

  const stop = useCallback(() => {
    stopJapaneseAudio();
  }, []);

  const replay = useCallback(() => {
    return replayJapaneseAudio();
  }, []);

  return {
    isPlaying,
    isThisPlaying,
    play,
    playSlow,
    stop,
    replay,
  };
}

interface JapaneseAudioButtonProps {
  text: string;
  speed?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  className?: string;
  showIcon?: boolean;
  stopOnClickWhenPlaying?: boolean;
  id?: string;
}

export const JapaneseAudioButton: React.FC<JapaneseAudioButtonProps> = ({
  text,
  speed = 0.95,
  label,
  size = 'md',
  variant = 'secondary',
  className = '',
  showIcon = true,
  stopOnClickWhenPlaying = false,
  id,
}) => {
  const { isThisPlaying, play, stop } = useJapaneseAudio(text);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isThisPlaying && stopOnClickWhenPlaying) {
      stop();
    } else {
      play(text, speed);
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs rounded-xl gap-1',
    md: 'px-3.5 py-1.5 text-xs font-semibold rounded-xl gap-1.5',
    lg: 'px-4 py-2 text-sm font-bold rounded-2xl gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        id={id}
        onClick={handleClick}
        className={`p-1.5 rounded-xl transition-all cursor-pointer select-none ${
          isThisPlaying
            ? 'bg-indigo-600 text-white shadow-md animate-pulse'
            : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10'
        } ${className}`}
        title="জাপানি উচ্চারণ শুনুন"
      >
        <Volume2 className={`${iconSizes[size]} ${isThisPlaying ? 'animate-bounce' : ''}`} />
      </button>
    );
  }

  return (
    <button
      type="button"
      id={id}
      onClick={handleClick}
      className={`inline-flex items-center justify-center transition-all cursor-pointer select-none ${
        sizeClasses[size]
      } ${
        isThisPlaying
          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md ring-2 ring-indigo-400/50 scale-[1.02]'
          : variant === 'primary'
          ? 'glass-btn-primary'
          : variant === 'ghost'
          ? 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/10'
          : 'glass-btn-secondary'
      } ${className}`}
      title="জাপানি উচ্চারণ শুনুন (ja-JP Natural Audio)"
    >
      {showIcon && (
        <Volume2
          className={`${iconSizes[size]} ${
            isThisPlaying ? 'animate-pulse text-white' : 'text-indigo-600 dark:text-indigo-400'
          }`}
        />
      )}
      <span>{isThisPlaying ? 'উচ্চারণ হচ্ছে...' : label || 'শুনুন'}</span>
    </button>
  );
};

interface JapaneseAudioControlGroupProps {
  text: string;
  className?: string;
  idPrefix?: string;
}

/**
 * Full Professional Audio Control Suite:
 * 🔊 Normal Speed (0.95x)
 * 🐢 Slow Speed (0.72x)
 * 🔁 Replay
 */
export const JapaneseAudioControlGroup: React.FC<JapaneseAudioControlGroupProps> = ({
  text,
  className = '',
  idPrefix = 'audio-ctrl',
}) => {
  const { isThisPlaying, play, playSlow, replay } = useJapaneseAudio(text);

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 ${className}`}
    >
      {/* 🔊 Normal Speed (0.95x) */}
      <button
        type="button"
        id={`${idPrefix}-normal`}
        onClick={(e) => {
          e.stopPropagation();
          play(text, 0.95);
        }}
        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
          isThisPlaying
            ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400'
            : 'glass-btn-secondary hover:text-indigo-600 dark:hover:text-indigo-300'
        }`}
        title="স্বাভাবিক গতি (Normal 0.95x) - প্রাকৃতিক উচ্চারণ"
      >
        <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
        <span>স্বাভাবিক</span>
      </button>

      {/* 🐢 Slow Speed (0.72x) */}
      <button
        type="button"
        id={`${idPrefix}-slow`}
        onClick={(e) => {
          e.stopPropagation();
          playSlow(text);
        }}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold glass-btn-secondary hover:text-amber-600 dark:hover:text-amber-300 transition-all cursor-pointer select-none"
        title="ধীর গতি (Slow 0.72x) - নতুনদের জন্য স্পষ্ট"
      >
        <Snail className="w-3.5 h-3.5 text-amber-500" />
        <span>ধীর গতি</span>
      </button>

      {/* 🔁 Replay */}
      <button
        type="button"
        id={`${idPrefix}-replay`}
        onClick={(e) => {
          e.stopPropagation();
          replay();
        }}
        className="p-1.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
        title="পুনরায় শুনুন (Replay)"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
