import { VocabItem } from '../types';

export interface VocabCategoryDef {
  id: string;
  labelBn: string;
  labelEn?: string;
  filterFn: (item: VocabItem) => boolean;
}

// Na-adjectives that end with 'い' sound in kana but are actually na-adjectives:
const NA_ADJECTIVES_KANA = ['きれい', 'ゆうめい', 'きらい'];

export const VOCAB_CATEGORIES: VocabCategoryDef[] = [
  {
    id: 'all',
    labelBn: 'সব',
    labelEn: 'All',
    filterFn: () => true,
  },
  {
    id: 'verb',
    labelBn: 'ক্রিয়া (Verb)',
    labelEn: 'Verbs',
    filterFn: (v) => v.type === 'VERB',
  },
  {
    id: 'i-adj',
    labelBn: 'い-বিশেষণ (i-Adjective)',
    labelEn: 'i-Adjectives',
    filterFn: (v) => {
      if (v.type !== 'ADJECTIVE') return false;
      const isNa = NA_ADJECTIVES_KANA.some((na) => v.reading.includes(na) || v.word.includes(na));
      if (isNa) return false;
      return v.reading.endsWith('い') || v.word.endsWith('い');
    },
  },
  {
    id: 'na-adj',
    labelBn: 'な-বিশেষণ (na-Adjective)',
    labelEn: 'na-Adjectives',
    filterFn: (v) => {
      if (v.type !== 'ADJECTIVE') return false;
      const isExplicitNa = NA_ADJECTIVES_KANA.some((na) => v.reading.includes(na) || v.word.includes(na));
      if (isExplicitNa) return true;
      return !v.reading.endsWith('い') && !v.word.endsWith('い');
    },
  },
  {
    id: 'people-family',
    labelBn: 'মানুষ ও পরিবার',
    labelEn: 'People & Family',
    filterFn: (v) => {
      if (v.type !== 'NOUN') return false;
      const keywords = [
        'people', 'person', 'family', 'father', 'mother', 'brother', 'sister',
        'son', 'daughter', 'man', 'woman', 'boy', 'girl', 'child', 'children',
        'teacher', 'student', 'doctor', 'employee', 'friend', 'husband', 'wife',
        'parents', 'baby', 'grandfather', 'grandmother', 'cousin'
      ];
      const bnKeywords = ['মানুষ', 'ব্যক্তি', 'বাবা', 'মা', 'ভাই', 'বোন', 'পরিবার', 'বন্ধু', 'শিক্ষক', 'ছাত্র', 'ডাক্তার', 'সন্তান', 'ছেলে', 'মেয়ে', 'স্ত্রী', 'স্বামী'];
      const en = v.english.toLowerCase();
      const bn = v.bengali;
      return keywords.some((k) => en.includes(k)) || bnKeywords.some((k) => bn.includes(k));
    },
  },
  {
    id: 'time-days',
    labelBn: 'সময় ও দিন',
    labelEn: 'Time & Days',
    filterFn: (v) => {
      const keywords = [
        'day', 'today', 'tomorrow', 'yesterday', 'time', 'hour', 'minute',
        'week', 'month', 'year', 'morning', 'afternoon', 'evening', 'night',
        'now', 'clock', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday',
        'friday', 'saturday', 'weekend', 'noon', 'o\'clock', 'am', 'pm'
      ];
      const bnKeywords = ['দিন', 'আজ', 'কাল', 'গতকাল', 'সময়', 'ঘণ্টা', 'মিনিট', 'সপ্তাহ', 'মাস', 'বছর', 'সকাল', 'বিকাল', 'সন্ধ্যা', 'রাত', 'এখন', 'বার'];
      const en = v.english.toLowerCase();
      const bn = v.bengali;
      return keywords.some((k) => en.includes(k)) || bnKeywords.some((k) => bn.includes(k));
    },
  },
  {
    id: 'places',
    labelBn: 'স্থান',
    labelEn: 'Places',
    filterFn: (v) => {
      if (v.type !== 'NOUN') return false;
      const keywords = [
        'place', 'school', 'hospital', 'station', 'airport', 'room', 'classroom',
        'office', 'bank', 'post office', 'library', 'restaurant', 'store', 'shop',
        'supermarket', 'department', 'park', 'country', 'city', 'town', 'house', 'home',
        'dormitory', 'kitchen', 'hotel', 'japan', 'toilet', 'reception', 'lobby'
      ];
      const bnKeywords = ['স্থান', 'জায়গা', 'স্কুল', 'বিদ্যালয়', 'হাসপাতাল', 'স্টেশন', 'বিমানবন্দর', 'ঘর', 'রুম', 'অফিস', 'ব্যাঙ্ক', 'দোকান', 'শহর', 'বাড়ি', 'বাড়ি', 'দেশ'];
      const en = v.english.toLowerCase();
      const bn = v.bengali;
      return keywords.some((k) => en.includes(k)) || bnKeywords.some((k) => bn.includes(k));
    },
  },
  {
    id: 'food-drinks',
    labelBn: 'খাবার ও পানীয়',
    labelEn: 'Food & Drinks',
    filterFn: (v) => {
      const keywords = [
        'food', 'drink', 'water', 'tea', 'coffee', 'milk', 'juice', 'beer', 'sake',
        'rice', 'bread', 'meat', 'fish', 'egg', 'vegetable', 'fruit', 'apple',
        'meal', 'breakfast', 'lunch', 'dinner', 'cake', 'sugar', 'salt', 'dish',
        'curry', 'noodle', 'soup'
      ];
      const bnKeywords = ['খাবার', 'পানীয়', 'পানি', 'চা', 'কফি', 'দুধ', 'ভাত', 'রুটি', 'মাংস', 'মাছ', 'ডিম', 'সবজি', 'ফল', 'আপেল', 'ভোজন', 'মিষ্টি'];
      const en = v.english.toLowerCase();
      const bn = v.bengali;
      return keywords.some((k) => en.includes(k)) || bnKeywords.some((k) => bn.includes(k));
    },
  },
  {
    id: 'body-clothes',
    labelBn: 'শরীর ও পোশাক',
    labelEn: 'Body & Clothes',
    filterFn: (v) => {
      const keywords = [
        'eye', 'ear', 'mouth', 'nose', 'hand', 'foot', 'leg', 'head', 'face',
        'hair', 'body', 'tooth', 'teeth', 'stomach', 'throat', 'clothes', 'shirt',
        'pants', 'trousers', 'shoes', 'socks', 'hat', 'cap', 'glasses', 'coat', 'jacket'
      ];
      const bnKeywords = ['চোখ', 'কান', 'মুখ', 'নাক', 'হাত', 'পা', 'মাথা', 'চুল', 'শরীর', 'দাঁত', 'পেট', 'পোশাক', 'শার্ট', 'জুতো', 'টুপি'];
      const en = v.english.toLowerCase();
      const bn = v.bengali;
      return keywords.some((k) => en.includes(k)) || bnKeywords.some((k) => bn.includes(k));
    },
  },
  {
    id: 'nature-animals',
    labelBn: 'প্রকৃতি ও প্রাণী',
    labelEn: 'Nature & Animals',
    filterFn: (v) => {
      const keywords = [
        'dog', 'cat', 'bird', 'animal', 'fish', 'flower', 'tree', 'mountain',
        'river', 'sea', 'ocean', 'rain', 'snow', 'weather', 'wind', 'sky', 'sun',
        'moon', 'star', 'season', 'spring', 'summer', 'autumn', 'fall', 'winter'
      ];
      const bnKeywords = ['কুকুর', 'বিড়াল', 'বিড়াল', 'পাখি', 'প্রাণী', 'ফুল', 'গাছ', 'পাহাড়', 'নদী', 'বৃষ্টি', 'বরফ', 'আবহাওয়া', 'বাতাস', 'আকাশ', 'সূর্য', 'চাঁদ', 'ঋতু'];
      const en = v.english.toLowerCase();
      const bn = v.bengali;
      return keywords.some((k) => en.includes(k)) || bnKeywords.some((k) => bn.includes(k));
    },
  },
  {
    id: 'objects',
    labelBn: 'জিনিসপত্র',
    labelEn: 'Objects & Tools',
    filterFn: (v) => {
      if (v.type !== 'NOUN') return false;
      const keywords = [
        'book', 'dictionary', 'newspaper', 'magazine', 'notebook', 'pencil', 'pen',
        'bag', 'umbrella', 'car', 'bus', 'train', 'bicycle', 'computer', 'camera',
        'television', 'tv', 'radio', 'phone', 'telephone', 'desk', 'chair', 'table',
        'bed', 'door', 'window', 'clock', 'watch', 'key', 'money', 'wallet', 'letter',
        'stamp', 'passport', 'ticket'
      ];
      const bnKeywords = ['বই', 'অভিধান', 'পত্রিকা', 'খাতা', 'কলম', 'ব্যাগ', 'ছাতা', 'গাড়ি', 'গাড়ি', 'বাস', 'ট্রেন', 'কম্পিউটার', 'ক্যামেরা', 'ফোন', 'টেবিল', 'চেয়ার', 'টাকা', 'চিঠি'];
      const en = v.english.toLowerCase();
      const bn = v.bengali;
      return keywords.some((k) => en.includes(k)) || bnKeywords.some((k) => bn.includes(k));
    },
  },
  {
    id: 'abstract',
    labelBn: 'ভাব ও বিষয়',
    labelEn: 'Concepts & Hobbies',
    filterFn: (v) => {
      if (v.type !== 'NOUN') return false;
      const keywords = [
        'language', 'japanese', 'english', 'music', 'sport', 'sports', 'movie',
        'cinema', 'song', 'picture', 'photo', 'travel', 'trip', 'lesson', 'class',
        'homework', 'test', 'exam', 'meeting', 'party', 'work', 'job', 'hobby',
        'meaning', 'problem', 'question', 'answer'
      ];
      const bnKeywords = ['ভাষা', 'জাপানি', 'ইংরেজি', 'সঙ্গীত', 'খেলা', 'সিনেমা', 'গান', 'ছবি', 'ভ্রমণ', 'পরীক্ষা', 'কাজ', 'শখ', 'অর্থ', 'প্রশ্ন'];
      const en = v.english.toLowerCase();
      const bn = v.bengali;
      return keywords.some((k) => en.includes(k)) || bnKeywords.some((k) => bn.includes(k));
    },
  },
  {
    id: 'numbers',
    labelBn: 'সংখ্যা',
    labelEn: 'Numbers',
    filterFn: (v) => {
      const numPattern = /^(one|two|three|four|five|six|seven|eight|nine|ten|hundred|thousand|zero|first|second)/i;
      const bnNum = ['এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়', 'দশ', 'শত', 'হাজার', 'শূন্য'];
      const en = v.english.toLowerCase();
      const bn = v.bengali;
      return numPattern.test(en) || bnNum.some((b) => bn.startsWith(b));
    },
  },
  {
    id: 'counters',
    labelBn: 'গণনা শব্দ (Counter)',
    labelEn: 'Counters',
    filterFn: (v) => {
      const counterKana = ['ひとつ', 'ふたつ', 'みっつ', 'よっつ', 'いつつ', 'むっつ', 'ななつ', 'やっつ', 'ここのつ', 'とお'];
      const counterReadings = ['まい', 'だい', 'かい', 'ほん', 'さつ', 'ひき', 'はい', 'にん', 'ばん'];
      return (
        counterKana.includes(v.reading) ||
        counterReadings.some((cr) => v.reading.endsWith(cr)) ||
        v.english.toLowerCase().includes('counter') ||
        v.bengali.includes('গণনা') ||
        v.bengali.includes('টি')
      );
    },
  },
  {
    id: 'pronouns',
    labelBn: 'সর্বনাম',
    labelEn: 'Pronouns',
    filterFn: (v) => {
      const pronounKana = [
        'わたし', 'あなた', 'あのひと', 'あのかた', 'かれ', 'かのじょ', 'わたしたち',
        'これ', 'それ', 'あれ', 'どれ', 'ここ', 'そこ', 'あそこ', 'どこ',
        'こちら', 'そちら', 'あちら', 'どちら', 'だれ', 'どなた', 'なに', 'なん'
      ];
      return pronounKana.includes(v.reading);
    },
  },
  {
    id: 'adverbs',
    labelBn: 'ক্রিয়া-বিশেষণ (Adverb)',
    labelEn: 'Adverbs',
    filterFn: (v) => {
      if (v.type === 'ADVERB') return true;
      const adverbsKana = [
        'いつも', 'ときどき', 'よく', 'だいたい', 'たくさん', 'すこし',
        'あまり', 'ぜんぜん', 'とても', 'ゆっくり', 'もう', 'まだ', 'ずっと',
        'いっしょに', 'ひとりで', 'まっすぐ', 'すぐ', 'もっと'
      ];
      return adverbsKana.includes(v.reading) || v.english.toLowerCase().includes('always') || v.english.toLowerCase().includes('often');
    },
  },
  {
    id: 'demonstratives',
    labelBn: 'নির্দেশক',
    labelEn: 'Demonstratives',
    filterFn: (v) => {
      const demoKana = [
        'この', 'その', 'あの', 'どの', 'こんな', 'そんな', 'あんな', 'どんな',
        'これ', 'それ', 'あれ', 'どれ', 'ここ', 'そこ', 'あそこ', 'どこ'
      ];
      return demoKana.includes(v.reading);
    },
  },
  {
    id: 'conjunctions',
    labelBn: 'সংযোজক',
    labelEn: 'Conjunctions',
    filterFn: (v) => {
      const conjKana = ['そして', 'それから', 'でも', 'だから', 'しかし', 'また', 'じゃ', 'それでは'];
      return conjKana.includes(v.reading) || v.english.toLowerCase().includes('and') || v.english.toLowerCase().includes('but');
    },
  },
  {
    id: 'particles',
    labelBn: 'অব্যয় (Particle/Interj)',
    labelEn: 'Particles & Aux',
    filterFn: (v) => {
      if (v.type === 'PARTICLE') return true;
      const partKana = ['は', 'が', 'を', 'に', 'へ', 'で', 'と', 'から', 'まで', 'より', 'も', 'ね', 'よ', 'か'];
      return partKana.includes(v.word) || partKana.includes(v.reading);
    },
  },
  {
    id: 'expressions',
    labelBn: 'অনুভূতিসূচক (Expressions)',
    labelEn: 'Expressions & Greetings',
    filterFn: (v) => {
      if (v.type === 'EXPRESSION') return true;
      const expKana = [
        'おはよう', 'こんにちは', 'こんばんは', 'さようなら', 'ありがとう',
        'すみません', 'ごめんなさい', 'いただきます', 'ごちそうさま',
        'はじめまして', 'どうぞ', 'よろしく', 'いってきます', 'いってらっしゃい',
        'ただいま', 'おかえりなさい', 'おねがいします', 'おめでとう'
      ];
      return expKana.some((e) => v.reading.includes(e));
    },
  },
  {
    id: 'affixes',
    labelBn: 'উপসর্গ/প্রত্যয়',
    labelEn: 'Prefixes & Suffixes',
    filterFn: (v) => {
      const affixes = ['さん', 'ちゃん', 'くん', 'じん', 'ご', 'さい', 'ねん', 'がつ', 'にち', 'かい', 'じ', 'ふん', 'ぷん'];
      return (
        v.word.startsWith('～') ||
        v.word.startsWith('~') ||
        v.word.startsWith('お') ||
        affixes.some((af) => v.word.endsWith(af) && v.word.length <= 4)
      );
    },
  },
  {
    id: 'other-nouns',
    labelBn: 'অন্যান্য বিশেষ্য',
    labelEn: 'Other Nouns',
    filterFn: (v) => {
      return v.type === 'NOUN';
    },
  },
];

// Helper to convert standard integer to Bengali numeral string
export const toBengaliNumber = (num: number): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num)
    .split('')
    .map((char) => {
      const n = parseInt(char, 10);
      return isNaN(n) ? char : bnDigits[n];
    })
    .join('');
};
