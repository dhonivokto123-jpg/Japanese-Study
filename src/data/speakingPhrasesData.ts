import { SpeakingPhrase } from '../types';

export const n5SpeakingPhrases: SpeakingPhrase[] = [
  {
    id: 'sp-1',
    japanese: 'はじめまして。',
    reading: 'はじめまして。',
    romaji: 'Hajimemashite.',
    bengali: 'প্রথম সাক্ষাতে শুভেচ্ছা / কেমন আছেন?',
    english: 'Nice to meet you.',
    lessonId: 1,
    category: 'greeting',
    tipsBn: 'কাউকে প্রথমবার দেখার সময় মাথা কিছুটা নুইয়ে মার্জিতভাবে বলুন।'
  },
  {
    id: 'sp-2',
    japanese: 'わたし は がくせい です。',
    reading: 'わたし は がくせい です。',
    romaji: 'Watashi wa gakusei desu.',
    bengali: 'আমি একজন ছাত্র/ছাত্রী।',
    english: 'I am a student.',
    lessonId: 1,
    category: 'introduction',
    tipsBn: 'は-কে "ওয়া" উচ্চারণ করুন, এবং です-এর "সু" হালকাভাবে শেষ করুন।'
  },
  {
    id: 'sp-3',
    japanese: 'どうぞ よろしく おねがいします。',
    reading: 'どうぞ よろしく おねがいします。',
    romaji: 'Douzo yoroshiku onegaishimasu.',
    bengali: 'অনুগ্রহ করে সদয় দৃষ্টি রাখবেন।',
    english: 'Pleased to meet you / Please treat me well.',
    lessonId: 1,
    category: 'introduction',
    tipsBn: 'আত্মপরিচয়ের শেষে এই বাক্যটি বিনয়ের সাথে বলুন।'
  },
  {
    id: 'sp-4',
    japanese: 'これ は なん ですか。',
    reading: 'これ は なん ですか。',
    romaji: 'Kore wa nan desu ka.',
    bengali: 'এটি কী?',
    english: 'What is this?',
    lessonId: 2,
    category: 'question',
    tipsBn: 'か বলার সময় গলার স্বর সামান্য উপরে তুলুন।'
  },
  {
    id: 'sp-5',
    japanese: 'すみません、トイレ は どこ ですか。',
    reading: 'すみません、トイレ は どこ ですか。',
    romaji: 'Sumimasen, toire wa doko desu ka.',
    bengali: 'মাফ করবেন, টয়লেট কোথায়?',
    english: 'Excuse me, where is the restroom?',
    lessonId: 3,
    category: 'daily',
    tipsBn: 'রাস্তা বা দোকানে কাউকে ডাকার সময় すみません ব্যবহার করুন।'
  },
  {
    id: 'sp-6',
    japanese: 'いま なんじ ですか。',
    reading: 'いま なんじ ですか।',
    romaji: 'Ima nanji desu ka.',
    bengali: 'এখন কয়টা বাজে?',
    english: 'What time is it now?',
    lessonId: 4,
    category: 'daily',
    tipsBn: 'সময় জানতে সহজ ও বহুল ব্যবহৃত বাক্য।'
  },
  {
    id: 'sp-7',
    japanese: 'とうきょう へ いきます。',
    reading: 'とうきょう へ いきます。',
    romaji: 'Toukyou e ikimasu.',
    bengali: 'টোকিও যাব।',
    english: 'I am going to Tokyo.',
    lessonId: 5,
    category: 'travel',
    tipsBn: 'গন্তব্য নির্দেশক へ অক্ষরটি এখানে "এ" উচ্চারিত হয়।'
  },
  {
    id: 'sp-8',
    japanese: 'いっしょ に ごはん を たべませんか。',
    reading: 'いっしょ に ごはん を たべませんか。',
    romaji: 'Issho ni gohan o tabemasen ka.',
    bengali: 'একসাথে খাবার খাবেন কি?',
    english: 'Won\'t you have a meal together with me?',
    lessonId: 6,
    category: 'invitation',
    tipsBn: 'কাউকে কোনো প্রস্তাব দেওয়ার জন্য 〜ませんか অতি উত্তম কাঠামো।'
  },
  {
    id: 'sp-9',
    japanese: 'これ を ください。',
    reading: 'これ を ください。',
    romaji: 'Kore o kudasai.',
    bengali: 'দয়া করে আমাকে এটি দিন।',
    english: 'Please give me this.',
    lessonId: 3,
    category: 'shopping',
    tipsBn: 'দোকান বা রেস্তোরাঁয় অর্ডার করার সময় এই বাক্য ব্যবহৃত হয়।'
  },
  {
    id: 'sp-10',
    japanese: 'にほんご が すこし わかります。',
    reading: 'にほんご が すこし わかります。',
    romaji: 'Nihongo ga sukoshi wakarimasu.',
    bengali: 'আমি একটু একটু জাপানি বুঝি।',
    english: 'I understand a little Japanese.',
    lessonId: 9,
    category: 'daily',
    tipsBn: 'দক্ষতা প্রকাশে が বসে, を নয়।'
  },
  {
    id: 'sp-11',
    japanese: 'ちょっと まって ください。',
    reading: 'ちょっと まって ください。',
    romaji: 'Chotto matte kudasai.',
    bengali: 'দয়া করে একটু অপেক্ষা করুন।',
    english: 'Please wait a moment.',
    lessonId: 14,
    category: 'daily',
    tipsBn: 'ছোট বিরতি দিয়ে মার্জিতভাবে বলুন।'
  },
  {
    id: 'sp-12',
    japanese: 'しゃしん を とっても いいですか。',
    reading: 'しゃしん を とっても いいですか。',
    romaji: 'Shashin o tottemo ii desu ka.',
    bengali: 'ছবি তোলা যাবে কি?',
    english: 'May I take a picture?',
    lessonId: 15,
    category: 'request',
    tipsBn: 'অনুমতি চাওয়ার জন্য 〜てもいいですか নিয়মটি মনে রাখুন।'
  },
  {
    id: 'sp-13',
    japanese: 'ありがとう ございます。',
    reading: 'ありがとう ございます。',
    romaji: 'Arigatou gozaimasu.',
    bengali: 'আপনাকে অনেক ধন্যবাদ।',
    english: 'Thank you very much.',
    lessonId: 1,
    category: 'greeting',
    tipsBn: 'ধন্যবাদ জানানোর সর্বাধিক সম্মানসূচক রূপ।'
  },
  {
    id: 'sp-14',
    japanese: 'ごちそうさまでした。',
    reading: 'ごちそうさまでした。',
    romaji: 'Gochisousama deshita.',
    bengali: 'খাবারটি দারুণ ছিল / ধন্যবাদ (ভোজনের পর)।',
    english: 'Thank you for the meal.',
    lessonId: 6,
    category: 'dining',
    tipsBn: 'খাওয়া শেষ করে এই ঐতিহ্যবাহী বাক্যটি বলা হয়।'
  }
];
