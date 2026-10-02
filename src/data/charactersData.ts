export interface KanaCharacter {
  hiragana: string;
  katakana: string;
  romaji: string;
  bengali: string;
  type: 'vowel' | 'k' | 's' | 't' | 'n' | 'h' | 'm' | 'y' | 'r' | 'w' | 'n_single' | 'dakuten' | 'handakuten';
}

export const basicKanaList: KanaCharacter[] = [
  // Vowels
  { hiragana: 'あ', katakana: 'ア', romaji: 'a', bengali: 'আ', type: 'vowel' },
  { hiragana: 'い', katakana: 'イ', romaji: 'i', bengali: 'ই', type: 'vowel' },
  { hiragana: 'う', katakana: 'ウ', romaji: 'u', bengali: 'উ', type: 'vowel' },
  { hiragana: 'え', katakana: 'エ', romaji: 'e', bengali: 'এ', type: 'vowel' },
  { hiragana: 'お', katakana: 'オ', romaji: 'o', bengali: 'ও', type: 'vowel' },

  // K
  { hiragana: 'か', katakana: 'カ', romaji: 'ka', bengali: 'কা', type: 'k' },
  { hiragana: 'き', katakana: 'キ', romaji: 'ki', bengali: 'কি', type: 'k' },
  { hiragana: 'く', katakana: 'ク', romaji: 'ku', bengali: 'কু', type: 'k' },
  { hiragana: 'け', katakana: 'ケ', romaji: 'ke', bengali: 'কে', type: 'k' },
  { hiragana: 'こ', katakana: 'コ', romaji: 'ko', bengali: 'কো', type: 'k' },

  // S
  { hiragana: 'さ', katakana: 'サ', romaji: 'sa', bengali: 'সা', type: 's' },
  { hiragana: 'し', katakana: 'シ', romaji: 'shi', bengali: 'শি', type: 's' },
  { hiragana: 'す', katakana: 'ス', romaji: 'su', bengali: 'সু', type: 's' },
  { hiragana: 'せ', katakana: 'セ', romaji: 'se', bengali: 'সে', type: 's' },
  { hiragana: 'そ', katakana: 'ソ', romaji: 'so', bengali: 'সো', type: 's' },

  // T
  { hiragana: 'た', katakana: 'タ', romaji: 'ta', bengali: 'তা', type: 't' },
  { hiragana: 'ち', katakana: 'チ', romaji: 'chi', bengali: 'চি', type: 't' },
  { hiragana: 'つ', katakana: 'ツ', romaji: 'tsu', bengali: 'ৎসু', type: 't' },
  { hiragana: 'て', katakana: 'テ', romaji: 'te', bengali: 'তে', type: 't' },
  { hiragana: 'と', katakana: 'ト', romaji: 'to', bengali: 'তো', type: 't' },

  // N
  { hiragana: 'な', katakana: 'ナ', romaji: 'na', bengali: 'না', type: 'n' },
  { hiragana: 'に', katakana: 'ニ', romaji: 'ni', bengali: 'নি', type: 'n' },
  { hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu', bengali: 'নু', type: 'n' },
  { hiragana: 'ね', katakana: 'ネ', romaji: 'ne', bengali: 'নে', type: 'n' },
  { hiragana: 'の', katakana: 'ノ', romaji: 'no', bengali: 'নো', type: 'n' },

  // H
  { hiragana: 'は', katakana: 'ハ', romaji: 'ha', bengali: 'হা', type: 'h' },
  { hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi', bengali: 'হি', type: 'h' },
  { hiragana: 'ふ', katakana: 'フ', romaji: 'fu', bengali: 'ফু', type: 'h' },
  { hiragana: 'へ', katakana: 'ヘ', romaji: 'he', bengali: 'হে', type: 'h' },
  { hiragana: 'ほ', katakana: 'ホ', romaji: 'ho', bengali: 'হো', type: 'h' },

  // M
  { hiragana: 'ま', katakana: 'マ', romaji: 'ma', bengali: 'মা', type: 'm' },
  { hiragana: 'み', katakana: 'ミ', romaji: 'mi', bengali: 'মি', type: 'm' },
  { hiragana: 'む', katakana: 'ム', romaji: 'mu', bengali: 'মু', type: 'm' },
  { hiragana: 'め', katakana: 'メ', romaji: 'me', bengali: 'মে', type: 'm' },
  { hiragana: 'も', katakana: 'モ', romaji: 'mo', bengali: 'মো', type: 'm' },

  // Y
  { hiragana: 'や', katakana: 'ヤ', romaji: 'ya', bengali: 'ইয়া', type: 'y' },
  { hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu', bengali: 'ইউ', type: 'y' },
  { hiragana: 'よ', katakana: 'ヨ', romaji: 'yo', bengali: 'ইয়ো', type: 'y' },

  // R
  { hiragana: 'ら', katakana: 'ラ', romaji: 'ra', bengali: 'রা', type: 'r' },
  { hiragana: 'り', katakana: 'リ', romaji: 'ri', bengali: 'রি', type: 'r' },
  { hiragana: 'る', katakana: 'ル', romaji: 'ru', bengali: 'রু', type: 'r' },
  { hiragana: 'れ', katakana: 'レ', romaji: 're', bengali: 'রে', type: 'r' },
  { hiragana: 'ろ', katakana: 'ロ', romaji: 'ro', bengali: 'রো', type: 'r' },

  // W / N
  { hiragana: 'わ', katakana: 'ワ', romaji: 'wa', bengali: 'ওয়া', type: 'w' },
  { hiragana: 'を', katakana: 'ヲ', romaji: 'wo', bengali: 'ও (পার্টিকেল)', type: 'w' },
  { hiragana: 'ん', katakana: 'ン', romaji: 'n', bengali: 'ন্ / ং', type: 'n_single' },
];

export const dakutenKanaList: KanaCharacter[] = [
  // G (from K)
  { hiragana: 'が', katakana: 'ガ', romaji: 'ga', bengali: 'গা', type: 'dakuten' },
  { hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi', bengali: 'গি', type: 'dakuten' },
  { hiragana: 'ぐ', katakana: 'グ', romaji: 'gu', bengali: 'গু', type: 'dakuten' },
  { hiragana: 'げ', katakana: 'ゲ', romaji: 'ge', bengali: 'গে', type: 'dakuten' },
  { hiragana: 'ご', katakana: 'ゴ', romaji: 'go', bengali: 'গো', type: 'dakuten' },

  // Z (from S)
  { hiragana: 'ざ', katakana: 'ザ', romaji: 'za', bengali: 'জা', type: 'dakuten' },
  { hiragana: 'じ', katakana: 'ジ', romaji: 'ji', bengali: 'জি', type: 'dakuten' },
  { hiragana: 'ず', katakana: 'ズ', romaji: 'zu', bengali: 'জু', type: 'dakuten' },
  { hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze', bengali: 'জে', type: 'dakuten' },
  { hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo', bengali: 'জো', type: 'dakuten' },

  // D (from T)
  { hiragana: 'だ', katakana: 'ダ', romaji: 'da', bengali: 'দা', type: 'dakuten' },
  { hiragana: 'ぢ', katakana: 'ヂ', romaji: 'ji (di)', bengali: 'জি / দি', type: 'dakuten' },
  { hiragana: 'づ', katakana: 'ヅ', romaji: 'zu (du)', bengali: 'জু / দু', type: 'dakuten' },
  { hiragana: 'で', katakana: 'デ', romaji: 'de', bengali: 'দে', type: 'dakuten' },
  { hiragana: 'ど', katakana: 'ド', romaji: 'do', bengali: 'দো', type: 'dakuten' },

  // B (from H)
  { hiragana: 'ば', katakana: 'バ', romaji: 'ba', bengali: 'বা', type: 'dakuten' },
  { hiragana: 'び', katakana: 'ビ', romaji: 'bi', bengali: 'বি', type: 'dakuten' },
  { hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu', bengali: 'বু', type: 'dakuten' },
  { hiragana: 'べ', katakana: 'ベ', romaji: 'be', bengali: 'বে', type: 'dakuten' },
  { hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo', bengali: 'বো', type: 'dakuten' },

  // P (Handakuten from H)
  { hiragana: 'ぱ', katakana: 'パ', romaji: 'pa', bengali: 'পা', type: 'handakuten' },
  { hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi', bengali: 'পি', type: 'handakuten' },
  { hiragana: 'ぷ', katakana: 'プ', romaji: 'pu', bengali: 'পু', type: 'handakuten' },
  { hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe', bengali: 'পে', type: 'handakuten' },
  { hiragana: 'ぽ', katakana: 'ポ', romaji: 'po', bengali: 'পো', type: 'handakuten' },
];

export const yoonKanaList: KanaCharacter[] = [
  { hiragana: 'きゃ', katakana: 'キャ', romaji: 'kya', bengali: 'ক্যা / কিয়া', type: 'k' },
  { hiragana: 'きゅ', katakana: 'キュ', romaji: 'kyu', bengali: 'কিউ', type: 'k' },
  { hiragana: 'きょ', katakana: 'キョ', romaji: 'kyo', bengali: 'কিয়ো', type: 'k' },
  { hiragana: 'しゃ', katakana: 'シャ', romaji: 'sha', bengali: 'শা', type: 's' },
  { hiragana: 'しゅ', katakana: 'シュ', romaji: 'shu', bengali: 'শু', type: 's' },
  { hiragana: 'しょ', katakana: 'ショ', romaji: 'sho', bengali: 'শো', type: 's' },
  { hiragana: 'ちゃ', katakana: 'チャ', romaji: 'cha', bengali: 'চা', type: 't' },
  { hiragana: 'ちゅ', katakana: 'チュ', romaji: 'chu', bengali: 'চু', type: 't' },
  { hiragana: 'ちょ', katakana: 'チョ', romaji: 'cho', bengali: 'চো', type: 't' },
  { hiragana: 'にゃ', katakana: 'ニャ', romaji: 'nya', bengali: 'নিয়া', type: 'n' },
  { hiragana: 'にゅ', katakana: 'ニュ', romaji: 'nyu', bengali: 'নিউ', type: 'n' },
  { hiragana: 'にょ', katakana: 'ニョ', romaji: 'nyo', bengali: 'নিয়ো', type: 'n' },
  { hiragana: 'ひゃ', katakana: 'ヒャ', romaji: 'hya', bengali: 'হিয়া', type: 'h' },
  { hiragana: 'ひゅ', katakana: 'ヒュ', romaji: 'hyu', bengali: 'হিউ', type: 'h' },
  { hiragana: 'ひょ', katakana: 'ヒョ', romaji: 'hyo', bengali: 'হিয়ো', type: 'h' },
  { hiragana: 'みゃ', katakana: 'ミャ', romaji: 'mya', bengali: 'মিয়া', type: 'm' },
  { hiragana: 'みゅ', katakana: 'ミュ', romaji: 'myu', bengali: 'মিউ', type: 'm' },
  { hiragana: 'みょ', katakana: 'ミョ', romaji: 'myo', bengali: 'মিয়ো', type: 'm' },
  { hiragana: 'りゃ', katakana: 'リャ', romaji: 'rya', bengali: 'রিয়া', type: 'r' },
  { hiragana: 'りゅ', katakana: 'リュ', romaji: 'ryu', bengali: 'রিউ', type: 'r' },
  { hiragana: 'りょ', katakana: 'リョ', romaji: 'ryo', bengali: 'রিয়ো', type: 'r' },
  { hiragana: 'ぎゃ', katakana: 'ギャ', romaji: 'gya', bengali: 'গিয়া', type: 'dakuten' },
  { hiragana: 'ぎゅ', katakana: 'ギュ', romaji: 'gyu', bengali: 'গিউ', type: 'dakuten' },
  { hiragana: 'ぎょ', katakana: 'ギョ', romaji: 'gyo', bengali: 'গিয়ো', type: 'dakuten' },
  { hiragana: 'じゃ', katakana: 'ジャ', romaji: 'ja', bengali: 'জা', type: 'dakuten' },
  { hiragana: 'じゅ', katakana: 'ジュ', romaji: 'ju', bengali: 'জু', type: 'dakuten' },
  { hiragana: 'じょ', katakana: 'ジョ', romaji: 'jo', bengali: 'জো', type: 'dakuten' },
  { hiragana: 'びゃ', katakana: 'ビャ', romaji: 'bya', bengali: 'বিয়া', type: 'dakuten' },
  { hiragana: 'びゅ', katakana: 'ビュ', romaji: 'byu', bengali: 'বিউ', type: 'dakuten' },
  { hiragana: 'びょ', katakana: 'ビョ', romaji: 'byo', bengali: 'বিয়ো', type: 'dakuten' },
  { hiragana: 'ぴゃ', katakana: 'ピャ', romaji: 'pya', bengali: 'পিয়া', type: 'handakuten' },
  { hiragana: 'ぴゅ', katakana: 'ピュ', romaji: 'pyu', bengali: 'পিউ', type: 'handakuten' },
  { hiragana: 'ぴょ', katakana: 'ピョ', romaji: 'pyo', bengali: 'পিয়ো', type: 'handakuten' },
];
