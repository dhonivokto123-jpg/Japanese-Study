const fs = require('fs');
const path = require('path');

// Lesson vocabulary definitions covering 25 lessons of Minna no Nihongo
const rawLessonsVocab = [
  // Lesson 1
  {
    lessonId: 1,
    items: [
      { word: 'わたし', reading: 'わたし', romaji: 'watashi', english: 'I, me', bengali: 'আমি', exampleJp: 'わたし は がくせい です。', exampleBn: 'আমি একজন ছাত্র।', type: 'NOUN' },
      { word: 'あなた', reading: 'あなた', romaji: 'anata', english: 'You', bengali: 'তুমি / আপনি', exampleJp: 'あなた は せんせい ですか。', exampleBn: 'আপনি কি শিক্ষক?', type: 'NOUN' },
      { word: 'あのひと', reading: 'あのひと', romaji: 'ano hito', english: 'That person', bengali: 'ঐ ব্যক্তি / তিনি', exampleJp: 'あのひと は だれ ですか。', exampleBn: 'ঐ ব্যক্তিটি কে?', type: 'NOUN' },
      { word: 'あのかた', reading: 'あのかた', romaji: 'ano kata', english: 'That person (polite)', bengali: 'ঐ ভদ্রলোক/মহিলা (ভদ্র)', exampleJp: 'あのかた は どなた ですか。', exampleBn: 'ঐ সম্মানিত ব্যক্তিটি কে?', type: 'NOUN' },
      { word: 'さん', reading: 'さん', romaji: 'san', english: 'Mr./Ms. (suffix)', bengali: 'সাহেব / জনাব / মহোদয়া', exampleJp: 'たなかさん は にほんじん です。', exampleBn: 'তানাকা সাহেব জাপানি।', type: 'NOUN' },
      { word: 'ちゃん', reading: 'ちゃん', romaji: 'chan', english: 'Little (suffix for kids)', bengali: 'স্নেহসূচক উপাধি (বাচ্চাদের জন্য)', exampleJp: 'さくらちゃん は かわいい です。', exampleBn: 'সাকুরা-চান মিষ্টি।', type: 'NOUN' },
      { word: 'じん', reading: 'じん', romaji: 'jin', english: 'Person of nationality', bengali: 'নাগরিক / অধিবাসী', exampleJp: 'わたし は バングラデシュじん です。', exampleBn: 'আমি বাংলাদেশি।', type: 'NOUN' },
      { word: 'せんせい', reading: 'せんせい', romaji: 'sensei', english: 'Teacher, doctor', bengali: 'শিক্ষক / ডাক্তার', exampleJp: 'やまもとせんせい は やさしい です。', exampleBn: 'ইয়ামামোতো শিক্ষক দয়ালু।', type: 'NOUN' },
      { word: 'きょうし', reading: 'きょうし', romaji: 'kyoushi', english: 'Instructor, teacher (profession)', bengali: 'শিক্ষক (পেশা হিসেবে)', exampleJp: 'わたし の しごと は きょうし です。', exampleBn: 'আমার পেশা শিক্ষকতা।', type: 'NOUN' },
      { word: 'がくせい', reading: 'がくせい', romaji: 'gakusei', english: 'Student', bengali: 'ছাত্র / শিক্ষার্থী', exampleJp: 'かれ は だいがくせい です。', exampleBn: 'সে বিশ্ববিদ্যালয়ের ছাত্র।', type: 'NOUN' },
      { word: 'かいしゃいん', reading: 'かいしゃいん', romaji: 'kaishain', english: 'Company employee', bengali: 'কোম্পানি কর্মী / চাকরিজীবী', exampleJp: 'ちち は かいしゃいん です。', exampleBn: 'আমার বাবা চাকরিজীবী।', type: 'NOUN' },
      { word: 'ぎんこういん', reading: 'ぎんこういん', romaji: 'ginkouin', english: 'Bank employee', bengali: 'ব্যাংক কর্মকর্তা', exampleJp: 'あね は ぎんこういん です。', exampleBn: 'আমার বড় বোন ব্যাংক কর্মকর্তা।', type: 'NOUN' },
      { word: 'いしゃ', reading: 'いしゃ', romaji: 'isha', english: 'Doctor, physician', bengali: 'চিকিৎসক / ডাক্তার', exampleJp: 'いしゃ に なりたい です。', exampleBn: 'ডাক্তার হতে চাই।', type: 'NOUN' },
      { word: 'けんきゅうしゃ', reading: 'けんきゅうしゃ', romaji: 'kenkyuusha', english: 'Researcher', bengali: 'গবেষক', exampleJp: 'あのかた は けんきゅうしゃ です。', exampleBn: 'ঐ ব্যক্তি একজন গবেষক।', type: 'NOUN' },
      { word: 'エンジニア', reading: 'エンジニア', romaji: 'enjinia', english: 'Engineer', bengali: 'প্রকৌশলী / ইঞ্জিনিয়ার', exampleJp: 'わたし は エンジニア です。', exampleBn: 'আমি একজন প্রকৌশলী।', type: 'NOUN' },
      { word: 'だいがく', reading: 'だいがく', romaji: 'daigaku', english: 'University, college', bengali: 'বিশ্ববিদ্যালয়', exampleJp: 'とうきょうだいがく の がくせい です。', exampleBn: 'টোকিও বিশ্ববিদ্যালয়ের ছাত্র।', type: 'NOUN' },
      { word: 'びょういん', reading: 'びょういん', romaji: 'byouin', english: 'Hospital', bengali: 'হাসপাতাল', exampleJp: 'びょういん へ いきます。', exampleBn: 'হাসপাতালে যাচ্ছি।', type: 'NOUN' },
      { word: 'でんき', reading: 'でんき', romaji: 'denki', english: 'Electricity, light', bengali: 'বিদ্যুৎ / বাতি', exampleJp: 'でんき を けして ください。', exampleBn: 'বাতি নিভিয়ে দিন।', type: 'NOUN' },
      { word: 'だれ', reading: 'だれ', romaji: 'dare', english: 'Who', bengali: 'কে', exampleJp: 'あの ひと は だれ ですか。', exampleBn: 'ঐ ব্যক্তি কে?', type: 'NOUN' },
      { word: 'どなた', reading: 'どなた', romaji: 'donata', english: 'Who (polite)', bengali: 'কে (মার্জিত রূপ)', exampleJp: 'あのかた は どなた ですか。', exampleBn: 'ঐ সম্মানিত ব্যক্তি কে?', type: 'NOUN' },
      { word: 'さい', reading: 'さい', romaji: 'sai', english: 'Years old', bengali: 'বছর বয়স', exampleJp: 'わたし は にじゅうさい です。', exampleBn: 'আমার বয়স ২০ বছর।', type: 'NOUN' },
      { word: 'なんさい', reading: 'なんさい', romaji: 'nansai', english: 'How old', bengali: 'কত বয়স', exampleJp: 'おいくつ ですか。なんさい ですか。', exampleBn: 'আপনার বয়স কত?', type: 'NOUN' },
      { word: 'はい', reading: 'はい', romaji: 'hai', english: 'Yes', bengali: 'হ্যাঁ / জি', exampleJp: 'はい、そうです。', exampleBn: 'হ্যাঁ, তাই।', type: 'EXPRESSION' },
      { word: 'いいえ', reading: 'いいえ', romaji: 'iie', english: 'No', bengali: 'না', exampleJp: 'いいえ、ちがいます。', exampleBn: 'না, তা নয়।', type: 'EXPRESSION' },
      { word: 'はじめまして', reading: 'はじめまして', romaji: 'hajimemashite', english: 'Nice to meet you', bengali: 'প্রথম সাক্ষাতে শুভেচ্ছা (কেমন আছেন)', exampleJp: 'はじめまして、カマル です。', exampleBn: 'প্রথম সাক্ষাতে শুভেচ্ছা, আমি কামাল।', type: 'EXPRESSION' },
      { word: 'どうぞよろしく', reading: 'どうぞよろしく', romaji: 'douzo yoroshiku', english: 'Pleased to meet you', bengali: 'অনুগ্রহ করে সদয় দৃষ্টি রাখবেন', exampleJp: 'どうぞ よろしく おねがいします。', exampleBn: 'দয়া করে সদয় দৃষ্টি রাখবেন।', type: 'EXPRESSION' },
      { word: 'にほん', reading: 'にほん', romaji: 'nihon', english: 'Japan', bengali: 'জাপান', exampleJp: 'にほん は きれい な くに です。', exampleBn: 'জাপান সুন্দর দেশ।', type: 'NOUN' }
    ]
  },
  // Lesson 2
  {
    lessonId: 2,
    items: [
      { word: 'これ', reading: 'これ', romaji: 'kore', english: 'This (thing here)', bengali: 'এটি (বক্তার কাছের বস্তু)', exampleJp: 'これ は わたし の ほん です。', exampleBn: 'এটি আমার বই।', type: 'NOUN' },
      { word: 'それ', reading: 'それ', romaji: 'sore', english: 'That (thing near listener)', bengali: 'ওটি (শ্রোতার কাছের বস্তু)', exampleJp: 'それ は なん ですか。', exampleBn: 'ওটি কী?', type: 'NOUN' },
      { word: 'あれ', reading: 'あれ', romaji: 'are', english: 'That (thing over there)', bengali: 'ঐটি (উভয় থেকে দূরে)', exampleJp: 'あれ は くるま です。', exampleBn: 'ঐটি গাড়ি।', type: 'NOUN' },
      { word: 'この', reading: 'この', romaji: 'kono', english: 'This (modifier)', bengali: 'এই (বস্তুর সাথে যুক্ত)', exampleJp: 'この ほん は おもしろい です。', exampleBn: 'এই বইটি মজার।', type: 'NOUN' },
      { word: 'その', reading: 'その', romaji: 'sono', english: 'That (modifier)', bengali: 'ঐ (শ্রোতার কাছের)', exampleJp: 'その かさ は だれ の ですか。', exampleBn: 'ঐ ছাতাটি কার?', type: 'NOUN' },
      { word: 'あの', reading: 'あの', romaji: 'ano', english: 'That over there (modifier)', bengali: 'ঐ দূরের (উভয় থেকে দূরে)', exampleJp: 'あの ビル は たかい です。', exampleBn: 'ঐ ভবনটি উঁচু।', type: 'NOUN' },
      { word: 'ほん', reading: 'ほん', romaji: 'hon', english: 'Book', bengali: 'বই', exampleJp: 'ほん を よみます。', exampleBn: 'বই পড়ি।', type: 'NOUN' },
      { word: 'じしょ', reading: 'じしょ', romaji: 'jisho', english: 'Dictionary', bengali: 'অভিধান', exampleJp: 'じしょ を ひきます。', exampleBn: 'অভিধান দেখি।', type: 'NOUN' },
      { word: 'ざっし', reading: 'ざっし', romaji: 'zasshi', english: 'Magazine', bengali: 'ম্যাগাজিন / সাময়িকী', exampleJp: 'ざっし を かいました。', exampleBn: 'ম্যাগাজিন কিনেছি।', type: 'NOUN' },
      { word: 'しんぶん', reading: 'しんぶん', romaji: 'shinbun', english: 'Newspaper', bengali: 'সংবাদপত্র', exampleJp: 'まいあさ しんぶん を よみます。', exampleBn: 'প্রতি সকালে পত্রিকা পড়ি।', type: 'NOUN' },
      { word: 'ノート', reading: 'ノート', romaji: 'nooto', english: 'Notebook', bengali: 'নোটবুক / খাতা', exampleJp: 'ノート に かきます。', exampleBn: 'খাতায় লিখি।', type: 'NOUN' },
      { word: 'てちょう', reading: 'てちょう', romaji: 'techou', english: 'Pocket notebook, planner', bengali: 'পকেট ডায়েরি', exampleJp: 'てちょう を みます。', exampleBn: 'পকেট ডায়েরি দেখছি।', type: 'NOUN' },
      { word: 'めいし', reading: 'めいし', romaji: 'meishi', english: 'Business card', bengali: 'ভিজিটিং কার্ড', exampleJp: 'これ は わたし の めいし です。', exampleBn: 'এটি আমার ভিজিটিং কার্ড।', type: 'NOUN' },
      { word: 'えんぴつ', reading: 'えんぴつ', romaji: 'enpitsu', english: 'Pencil', bengali: 'পেন্সিল', exampleJp: 'えんぴつ で かいて ください。', exampleBn: 'পেন্সিল দিয়ে লিখুন।', type: 'NOUN' },
      { word: 'ボールペン', reading: 'ボールペン', romaji: 'boorupen', english: 'Ballpoint pen', bengali: 'বলপেন', exampleJp: 'あかい ボールペン です。', exampleBn: 'লাল বলপেন।', type: 'NOUN' },
      { word: 'かぎ', reading: 'かぎ', romaji: 'kagi', english: 'Key', bengali: 'চাবি', exampleJp: 'へや の かぎ を なくしました。', exampleBn: 'ঘরের চাবি হারিয়েছি।', type: 'NOUN' },
      { word: 'とけい', reading: 'とけい', romaji: 'tokei', english: 'Watch, clock', bengali: 'ঘড়ি', exampleJp: 'この とけい は スイス の です。', exampleBn: 'এই ঘড়িটি সুইজারল্যান্ডের।', type: 'NOUN' },
      { word: 'かさ', reading: 'かさ', romaji: 'kasa', english: 'Umbrella', bengali: 'ছাতা', exampleJp: 'あめ です から かさ を もちます。', exampleBn: 'বৃষ্টি থাকায় ছাতা নিয়েছি।', type: 'NOUN' },
      { word: 'かばん', reading: 'かばん', romaji: 'kaban', english: 'Bag, briefcase', bengali: 'ব্যাগ', exampleJp: 'くろい かばん を かいました。', exampleBn: 'কালো ব্যাগ কিনেছি।', type: 'NOUN' },
      { word: 'テレビ', reading: 'テレビ', romaji: 'terebi', english: 'Television', bengali: 'টেলিভিশন', exampleJp: 'テレビ を みます。', exampleBn: 'টিভি দেখি।', type: 'NOUN' },
      { word: 'カメラ', reading: 'カメラ', romaji: 'kamera', english: 'Camera', bengali: 'ক্যামেরা', exampleJp: 'カメラ で しゃしん を とります。', exampleBn: 'ক্যামেরা দিয়ে ছবি তুলি।', type: 'NOUN' },
      { word: 'コンピューター', reading: 'コンピューター', romaji: 'konpyuutaa', english: 'Computer', bengali: 'কম্পিউটার', exampleJp: 'コンピューター を つかいます。', exampleBn: 'কম্পিউটার ব্যবহার করি।', type: 'NOUN' },
      { word: 'くるま', reading: 'くるま', romaji: 'kuruma', english: 'Car, vehicle', bengali: 'গাড়ি', exampleJp: 'あたらしい くるま です。', exampleBn: 'নতুন গাড়ি।', type: 'NOUN' },
      { word: 'つくえ', reading: 'つくえ', romaji: 'tsukue', english: 'Desk', bengali: 'টেবিল / পড়ার ডেস্ক', exampleJp: 'つくえ の うえ に あります。', exampleBn: 'টেবিলের উপরে আছে।', type: 'NOUN' },
      { word: 'いす', reading: 'いす', romaji: 'isu', english: 'Chair', bengali: 'চেয়ার / কেদারা', exampleJp: 'いす に すわって ください。', exampleBn: 'চেয়ারে বসুন।', type: 'NOUN' },
      { word: 'チョコレート', reading: 'チョコレート', romaji: 'chokoreeto', english: 'Chocolate', bengali: 'চকলেট', exampleJp: 'チョコレート を たべます。', exampleBn: 'চকলেট খাব।', type: 'NOUN' },
      { word: 'コーヒー', reading: 'コーヒー', romaji: 'koohii', english: 'Coffee', bengali: 'কফি', exampleJp: 'あつい コーヒー を のみます。', exampleBn: 'গরম কফি পান করি।', type: 'NOUN' },
      { word: 'おみやげ', reading: 'おみやげ', romaji: 'omiyage', english: 'Souvenir, gift', bengali: 'স্মারক উপহার / উপঢৌকন', exampleJp: 'にほん の おみやげ です。', exampleBn: 'জাপানের উপহার।', type: 'NOUN' },
      { word: 'えいご', reading: 'えいご', romaji: 'eigo', english: 'English language', bengali: 'ইংরেজি ভাষা', exampleJp: 'えいご が はなせますか。', exampleBn: 'ইংরেজি বলতে পারেন?', type: 'NOUN' },
      { word: 'にほんご', reading: 'にほんご', romaji: 'nihongo', english: 'Japanese language', bengali: 'জাপানি ভাষা', exampleJp: 'にほんご は おもしろい です。', exampleBn: 'জাপানি ভাষা আকর্ষণীয়।', type: 'NOUN' }
    ]
  },
  // Lesson 3
  {
    lessonId: 3,
    items: [
      { word: 'ここ', reading: 'ここ', romaji: 'koko', english: 'Here, this place', bengali: 'এখানে (বক্তার স্থান)', exampleJp: 'ここ は きょうしつ です。', exampleBn: 'এখানে শ্রেণিকক্ষ।', type: 'NOUN' },
      { word: 'そこ', reading: 'そこ', romaji: 'soko', english: 'There, that place near you', bengali: 'সেখানে (শ্রোতার স্থান)', exampleJp: 'そこ は じむしょ です。', exampleBn: 'ওখানে অফিসকক্ষ।', type: 'NOUN' },
      { word: 'あそこ', reading: 'あそこ', romaji: 'asoko', english: 'That place over there', bengali: 'ঐখানে (উভয় থেকে দূরে)', exampleJp: 'あそこ は しょくどう です。', exampleBn: 'ঐখানে ক্যান্টিন।', type: 'NOUN' },
      { word: 'どこ', reading: 'どこ', romaji: 'doko', english: 'Where', bengali: 'কোথায়', exampleJp: 'おてあらい は どこ ですか。', exampleBn: 'টয়লেট কোথায়?', type: 'NOUN' },
      { word: 'こちら', reading: 'こちら', romaji: 'kochira', english: 'This way / here (polite)', bengali: 'এদিকে / এখানে (মার্জিত)', exampleJp: 'どうぞ こちら へ。', exampleBn: 'দয়া করে এদিকে আসুন।', type: 'NOUN' },
      { word: 'そちら', reading: 'そちら', romaji: 'sochira', english: 'That way (polite)', bengali: 'ওদিকে (মার্জিত)', exampleJp: 'そちら は エレベーター です。', exampleBn: 'ওদিকে লিফট।', type: 'NOUN' },
      { word: 'あちら', reading: 'あちら', romaji: 'achira', english: 'That way over there (polite)', bengali: 'ঐদিকে (মার্জিত)', exampleJp: 'あちら は うけつけ です。', exampleBn: 'ঐদিকে রিসেপশন।', type: 'NOUN' },
      { word: 'どちら', reading: 'どちら', romaji: 'dochira', english: 'Which way / where (polite)', bengali: 'কোন দিকে / কোথায় (মার্জিত)', exampleJp: 'おくに は どちら ですか。', exampleBn: 'আপনার দেশ কোনটি?', type: 'NOUN' },
      { word: 'きょうしつ', reading: 'きょうしつ', romaji: 'kyoushitsu', english: 'Classroom', bengali: 'শ্রেণিকক্ষ', exampleJp: 'きょうしつ に はいります。', exampleBn: 'শ্রেণিকক্ষে প্রবেশ করি।', type: 'NOUN' },
      { word: 'しょくどう', reading: 'しょくどう', romaji: 'shokudou', english: 'Dining hall, cafeteria', bengali: 'ডাইনিং হল / ক্যান্টিন', exampleJp: 'しょくどう で ひるごはん を たべます。', exampleBn: 'ক্যান্টিনে দুপুরের খাবার খাই।', type: 'NOUN' },
      { word: 'じむしょ', reading: 'じむしょ', romaji: 'jimusho', english: 'Office', bengali: 'অফিস / কার্যালয়', exampleJp: 'じむしょ は ２かい です。', exampleBn: 'অফিস ২য় তলায়।', type: 'NOUN' },
      { word: 'かいぎしつ', reading: 'かいぎしつ', romaji: 'kaigishitsu', english: 'Conference room', bengali: 'সম্মেলন কক্ষ / মিটিং রুম', exampleJp: 'かいぎしつ で はなします。', exampleBn: 'মিটিং রুমে কথা বলব।', type: 'NOUN' },
      { word: 'うけつけ', reading: 'うけつけ', romaji: 'uketsuke', english: 'Reception desk', bengali: 'অভ্যর্থনা ডেস্ক', exampleJp: 'うけつけ で きいて ください。', exampleBn: 'রিসেপশনে জিজ্ঞাসা করুন।', type: 'NOUN' },
      { word: 'ロビー', reading: 'ロビー', romaji: 'robii', english: 'Lobby', bengali: 'লবি / অপেক্ষা কক্ষ', exampleJp: 'ロビー で まちます。', exampleBn: 'লবিতে অপেক্ষা করছি।', type: 'NOUN' },
      { word: 'へや', reading: 'へや', romaji: 'heya', english: 'Room', bengali: 'ঘর / কক্ষ', exampleJp: 'わたし の へや は ひろい です。', exampleBn: 'আমার ঘরটি প্রশস্ত।', type: 'NOUN' },
      { word: 'トイレ', reading: 'トイレ', romaji: 'toire', english: 'Restroom, toilet', bengali: 'টয়লেট / শৌচাগার', exampleJp: 'トイレ は あちら です。', exampleBn: 'টয়লেট ঐদিকে।', type: 'NOUN' },
      { word: 'かいだん', reading: 'かいだん', romaji: 'kaidan', english: 'Staircase', bengali: 'সিঁড়ি', exampleJp: 'かいだん を あがります。', exampleBn: 'সিঁড়ি দিয়ে উপরে উঠি।', type: 'NOUN' },
      { word: 'エレベーター', reading: 'エレベーター', romaji: 'erebeetaa', english: 'Elevator, lift', bengali: 'লিফট', exampleJp: 'エレベーター で ５かい へ いきます。', exampleBn: 'লিফটে করে ৫ তলায় যাই।', type: 'NOUN' },
      { word: 'うち', reading: 'うち', romaji: 'uchi', english: 'Home, house', bengali: 'বাড়ি / বাসা', exampleJp: 'うち へ かえります。', exampleBn: 'বাড়ি ফিরে যাচ্ছি।', type: 'NOUN' },
      { word: 'かいしゃ', reading: 'かいしゃ', romaji: 'kaisha', english: 'Company, corporation', bengali: 'কোম্পানি / প্রতিষ্ঠান', exampleJp: 'にほん の かいしゃ です。', exampleBn: 'জাপানি কোম্পানি।', type: 'NOUN' },
      { word: 'くつ', reading: 'くつ', romaji: 'kutsu', english: 'Shoes', bengali: 'জুতো', exampleJp: 'くつ を ぬいで ください。', exampleBn: 'জুতো খুলুন।', type: 'NOUN' },
      { word: 'ネクタイ', reading: 'ネクタイ', romaji: 'nekutai', english: 'Necktie', bengali: 'টাই', exampleJp: 'あおい ネクタイ です。', exampleBn: 'নীল টাই।', type: 'NOUN' },
      { word: 'ワイン', reading: 'ワイン', romaji: 'wain', english: 'Wine', bengali: 'ওয়াইন', exampleJp: 'フランス の ワイン です。', exampleBn: 'ফ্রান্সের ওয়াইন।', type: 'NOUN' },
      { word: 'うりば', reading: 'うりば', romaji: 'uriba', english: 'Selling counter / sales area', bengali: 'বিক্রয় কাউন্টার', exampleJp: 'くつ の うりば は どこ ですか。', exampleBn: 'জুতোর কাউন্টার কোথায়?', type: 'NOUN' },
      { word: 'ちか', reading: 'ちか', romaji: 'chika', english: 'Basement, underground', bengali: 'ভূগর্ভস্থ / বেসমেন্ট', exampleJp: 'ちか１かい に あります。', exampleBn: 'বেসমেন্ট ১ এ আছে।', type: 'NOUN' },
      { word: 'いくら', reading: 'いくら', romaji: 'ikura', english: 'How much (price)', bengali: 'কত দাম', exampleJp: 'これ は いくら ですか。', exampleBn: 'এটির দাম কত?', type: 'NOUN' },
      { word: 'ひゃく', reading: 'ひゃく', romaji: 'hyaku', english: 'Hundred', bengali: 'একশ', exampleJp: 'ひゃくえん です。', exampleBn: '১০০ ইয়েন।', type: 'NOUN' },
      { word: 'せん', reading: 'せん', romaji: 'sen', english: 'Thousand', bengali: 'হাজার', exampleJp: 'せんえん です。', exampleBn: '১০০০ ইয়েন।', type: 'NOUN' },
      { word: 'まん', reading: 'まん', romaji: 'man', english: 'Ten thousand', bengali: 'দশ হাজার', exampleJp: 'いちまんえん です。', exampleBn: '১০,০০০ ইয়েন।', type: 'NOUN' }
    ]
  },
  // Lesson 4
  {
    lessonId: 4,
    items: [
      { word: 'おきます', reading: 'おきます', romaji: 'okimasu', english: 'Wake up, get up', bengali: 'ঘুম থেকে ওঠা', exampleJp: 'まいあさ ６じ に おきます。', exampleBn: 'প্রতি সকালে ৬টায় উঠি।', type: 'VERB' },
      { word: 'ねます', reading: 'ねます', romaji: 'nemasu', english: 'Go to bed, sleep', bengali: 'ঘুমাতে যাওয়া / শোয়া', exampleJp: '１１じ に ねます。', exampleBn: '১১টায় ঘুমাই।', type: 'VERB' },
      { word: 'はたらきます', reading: 'はたらきます', romaji: 'hatarakimasu', english: 'Work', bengali: 'কাজ করা / চাকরি করা', exampleJp: 'ぎんこう で はたらきます。', exampleBn: 'ব্যাংকে কাজ করি।', type: 'VERB' },
      { word: 'やすみます', reading: 'やすみます', romaji: 'yasumimasu', english: 'Take a rest, take a holiday', bengali: 'বিশ্রাম নেওয়া / ছুটি কাটানো', exampleJp: 'どようび は やすみます。', exampleBn: 'শনিবারে ছুটি থাকে।', type: 'VERB' },
      { word: 'べんきょうします', reading: 'べんきょうします', romaji: 'benkyoushimasu', english: 'Study', bengali: 'পড়াশোনা করা', exampleJp: 'まいにち にほんご を べんきょうします。', exampleBn: 'প্রতিদিন জাপানি ভাষা পড়ি।', type: 'VERB' },
      { word: 'おわります', reading: 'おわります', romaji: 'owarimasu', english: 'Finish, end', bengali: 'শেষ হওয়া', exampleJp: '５じ に しごと が おわります。', exampleBn: '৫টায় কাজ শেষ হয়।', type: 'VERB' },
      { word: 'デパート', reading: 'デパート', romaji: 'depaato', english: 'Department store', bengali: 'ডিপার্টমেন্টাল স্টোর', exampleJp: 'デパート で かいもの します。', exampleBn: 'ডিপার্টমেন্টাল স্টোরে কেনাকাটা করি।', type: 'NOUN' },
      { word: 'ぎんこう', reading: 'ぎんこう', romaji: 'ginkou', english: 'Bank', bengali: 'ব্যাংক', exampleJp: 'ぎんこう は ９じ から です。', exampleBn: 'ব্যাংক ৯টা থেকে শুরু।', type: 'NOUN' },
      { word: 'ゆうびんきょく', reading: 'ゆうびんきょく', romaji: 'yuubinkyoku', english: 'Post office', bengali: 'ডাকঘর / পোস্ট অফিস', exampleJp: 'ゆうびんきょく へ いきます。', exampleBn: 'পোস্ট অফিসে যাচ্ছি।', type: 'NOUN' },
      { word: 'としょかん', reading: 'としょかん', romaji: 'toshokan', english: 'Library', bengali: 'গ্রন্থাগার / লাইব্রেরি', exampleJp: 'としょかん で ほん を よみます。', exampleBn: 'লাইব্রেরিতে বই পড়ি।', type: 'NOUN' },
      { word: 'いま', reading: 'いま', romaji: 'ima', english: 'Now', bengali: 'এখন', exampleJp: 'いま なんじ ですか。', exampleBn: 'এখন কয়টা বাজে?', type: 'NOUN' },
      { word: 'じ', reading: 'じ', romaji: 'ji', english: 'O\'clock', bengali: 'ঘণ্টা / টা (সময়)', exampleJp: 'いま ３じ です。', exampleBn: 'এখন ৩টা বাজে।', type: 'NOUN' },
      { word: 'ふん', reading: 'ふん', romaji: 'fun / pun', english: 'Minute', bengali: 'মিনিট', exampleJp: '３じ １５ふん です。', exampleBn: '৩টা ১৫ মিনিট।', type: 'NOUN' },
      { word: 'はん', reading: 'はん', romaji: 'han', english: 'Half past', bengali: 'সাড়ে / অর্ধেক', exampleJp: '４じはん です。', exampleBn: 'সাড়ে ৪টা বাজে।', type: 'NOUN' },
      { word: 'ごぜん', reading: 'ごぜん', romaji: 'gozen', english: 'Morning, A.M.', bengali: 'সকাল / পূর্বাহ্ন', exampleJp: 'ごぜん ９じ です。', exampleBn: 'সকাল ৯টা।', type: 'NOUN' },
      { word: 'ごご', reading: 'ごご', romaji: 'gogo', english: 'Afternoon, P.M.', bengali: 'অপরাহ্ন / দুপুর পর', exampleJp: 'ごご ２じ です。', exampleBn: 'দুপুর ২টা।', type: 'NOUN' },
      { word: 'あさ', reading: 'あさ', romaji: 'asa', english: 'Morning', bengali: 'সকাল', exampleJp: 'あさ はやい です。', exampleBn: 'সকালে খুব ভোরে।', type: 'NOUN' },
      { word: 'ひる', reading: 'ひる', romaji: 'hiru', english: 'Daytime, noon', bengali: 'দুপুর / দিনের বেলা', exampleJp: 'ひるごはん を たべます。', exampleBn: 'দুপুরের খাবার খাব।', type: 'NOUN' },
      { word: 'ばん', reading: 'ばん', romaji: 'ban', english: 'Night, evening', bengali: 'সন্ধ্যা / রাত', exampleJp: 'ばん べんきょうします。', exampleBn: 'রাতে পড়াশোনা করি।', type: 'NOUN' },
      { word: 'おととい', reading: 'おととい', romaji: 'ototoi', english: 'The day before yesterday', bengali: 'গত পরশু', exampleJp: 'おととい あめ でした。', exampleBn: 'গত পরশু বৃষ্টি ছিল।', type: 'NOUN' },
      { word: 'きのう', reading: 'きのう', romaji: 'kinou', english: 'Yesterday', bengali: 'গতকাল', exampleJp: 'きのう はたらきました。', exampleBn: 'গতকাল কাজ করেছি।', type: 'NOUN' },
      { word: 'きょう', reading: 'きょう', romaji: 'kyou', english: 'Today', bengali: 'আজ', exampleJp: 'きょう は やすみ です。', exampleBn: 'আজ ছুটি।', type: 'NOUN' },
      { word: 'あした', reading: 'あした', romaji: 'ashita', english: 'Tomorrow', bengali: 'আগামীকাল', exampleJp: 'あした とうきょう へ いきます。', exampleBn: 'আগামীকাল টোকিও যাব।', type: 'NOUN' },
      { word: 'あさって', reading: 'あさって', romaji: 'asatte', english: 'The day after tomorrow', bengali: 'আগামী পরশু', exampleJp: 'あさって テスト が あります。', exampleBn: 'পরশু পরীক্ষা আছে।', type: 'NOUN' },
      { word: 'たいへんですね', reading: 'たいへんですね', romaji: 'taihen desu ne', english: 'That must be tough', bengali: 'খুবই কষ্টের বিষয় তো', exampleJp: 'ざんぎょう ですか。たいへんですね。', exampleBn: 'ওভারটাইম? খুব কষ্ট তো।', type: 'EXPRESSION' }
    ]
  },
  // Lesson 5
  {
    lessonId: 5,
    items: [
      { word: 'いきます', reading: 'いきます', romaji: 'ikimasu', english: 'Go', bengali: 'যাওয়া', exampleJp: 'とうきょう へ いきます。', exampleBn: 'টোকিওতে যাব।', type: 'VERB' },
      { word: 'きます', reading: 'きます', romaji: 'kimasu', english: 'Come', bengali: 'আসা', exampleJp: 'あした ともだち が きます。', exampleBn: 'আগামীকাল বন্ধু আসবে।', type: 'VERB' },
      { word: 'かえります', reading: 'かえります', romaji: 'kaerimasu', english: 'Return, go home', bengali: 'ফেরা / বাড়ি ফেরা', exampleJp: 'うち へ かえります。', exampleBn: 'বাড়ি ফিরে যাব।', type: 'VERB' },
      { word: 'がっこう', reading: 'がっこう', romaji: 'gakkou', english: 'School', bengali: 'স্কুল / বিদ্যালয়', exampleJp: 'がっこう へ いきます。', exampleBn: 'স্কুলে যাচ্ছি।', type: 'NOUN' },
      { word: 'スーパー', reading: 'スーパー', romaji: 'suupaa', english: 'Supermarket', bengali: 'সুপারমার্কেট', exampleJp: 'スーパー で やさい を かいます。', exampleBn: 'সুপারমার্কেটে সবজি কিনি।', type: 'NOUN' },
      { word: 'えき', reading: 'えき', romaji: 'eki', english: 'Station', bengali: 'রেল স্টেশন', exampleJp: 'えき で でんしゃ に のります。', exampleBn: 'স্টেশনে ট্রেনে চড়ি।', type: 'NOUN' },
      { word: 'ひこうき', reading: 'ひこうき', romaji: 'hikouki', english: 'Airplane', bengali: 'উড়োজাহাজ / বিমান', exampleJp: 'ひこうき で にほん へ いきます。', exampleBn: 'বিমানে জাপানে যাব।', type: 'NOUN' },
      { word: 'ふね', reading: 'ふね', romaji: 'fune', english: 'Ship, boat', bengali: 'জাহাজ / নৌকা', exampleJp: 'ふね に のりました。', exampleBn: 'জাহাজে চড়েছি।', type: 'NOUN' },
      { word: 'でんしゃ', reading: 'でんしゃ', romaji: 'densha', english: 'Electric train', bengali: 'বৈদ্যুতিক ট্রেন', exampleJp: 'でんしゃ で かよいます。', exampleBn: 'ট্রেনে যাতায়াত করি।', type: 'NOUN' },
      { word: 'ちかてつ', reading: 'ちかてつ', romaji: 'chikatetsu', english: 'Subway, metro', bengali: 'পাতাল রেল / মেট্রো', exampleJp: 'ちかてつ は べんり です。', exampleBn: 'মেট্রো সুবিধাজনক।', type: 'NOUN' },
      { word: 'しんかんせん', reading: 'しんかんせん', romaji: 'shinkansen', english: 'Bullet train', bengali: 'বুলেট ট্রেন', exampleJp: 'しんかんせん は はやい です。', exampleBn: 'বুলেট ট্রেন দ্রুতগামী।', type: 'NOUN' },
      { word: 'バス', reading: 'バス', romaji: 'basu', english: 'Bus', bengali: 'বাস', exampleJp: 'バス で いきます。', exampleBn: 'বাসে যাব।', type: 'NOUN' },
      { word: 'タクシー', reading: 'タクシー', romaji: 'takushii', english: 'Taxi', bengali: 'ট্যাক্সি', exampleJp: 'タクシー を よびます。', exampleBn: 'ট্যাক্সি ডাকছি।', type: 'NOUN' },
      { word: 'じてんしゃ', reading: 'じてんしゃ', romaji: 'jitensha', english: 'Bicycle', bengali: 'বাইসাইকেল', exampleJp: 'じてんしゃ で はしります。', exampleBn: 'সাইকেল চালিয়ে যাই।', type: 'NOUN' },
      { word: 'あるいて', reading: 'あるいて', romaji: 'aruite', english: 'On foot', bengali: 'হেঁটে', exampleJp: 'あるいて いきます。', exampleBn: 'হেঁটে যাচ্ছি।', type: 'NOUN' },
      { word: 'ともだち', reading: 'ともだち', romaji: 'tomodachi', english: 'Friend', bengali: 'বন্ধু', exampleJp: 'ともだち と あいます。', exampleBn: 'বন্ধুর সাথে দেখা করব।', type: 'NOUN' },
      { word: 'ひとりで', reading: 'ひとりで', romaji: 'hitoride', english: 'Alone, by oneself', bengali: 'একা একা', exampleJp: 'ひとりで りょこう します。', exampleBn: 'একা ভ্রমণ করব।', type: 'NOUN' },
      { word: 'せんしゅう', reading: 'せんしゅう', romaji: 'senshuu', english: 'Last week', bengali: 'গত সপ্তাহ', exampleJp: 'せんしゅう きょうと へ いきました。', exampleBn: 'গত সপ্তাহে কিয়োটো গিয়েছিলাম।', type: 'NOUN' },
      { word: 'こんしゅう', reading: 'こんしゅう', romaji: 'konshuu', english: 'This week', bengali: 'চলতি সপ্তাহ', exampleJp: 'こんしゅう いそがしい です。', exampleBn: 'এই সপ্তাহে ব্যস্ত।', type: 'NOUN' },
      { word: 'らいしゅう', reading: 'らいしゅう', romaji: 'raishuu', english: 'Next week', bengali: 'আগামী সপ্তাহ', exampleJp: 'らいしゅう また あいましょう。', exampleBn: 'আগামী সপ্তাহে আবার দেখা হবে।', type: 'NOUN' },
      { word: 'たんじょうび', reading: 'たんじょうび', romaji: 'tanjoubi', english: 'Birthday', bengali: 'জন্মদিন', exampleJp: 'おたんじょうび おめでとうございます。', exampleBn: 'শুভ জন্মদিন!', type: 'NOUN' }
    ]
  }
];

// Add lessons 6 to 25 systematically with real Minna no Nihongo N5 curriculum vocabulary
const remainingLessons = [
  {
    lessonId: 6,
    items: [
      { word: 'たべます', reading: 'たべます', romaji: 'tabemasu', english: 'Eat', bengali: 'খাওয়া', exampleJp: 'ごはん を たべます。', exampleBn: 'ভাত খাব।', type: 'VERB' },
      { word: 'のみます', reading: 'のみます', romaji: 'nomimasu', english: 'Drink', bengali: 'পান করা', exampleJp: 'おみず を のみます。', exampleBn: 'পানি পান করি।', type: 'VERB' },
      { word: 'すいます', reading: 'すいます', romaji: 'suimasu', english: 'Smoke (cigarette)', bengali: 'ধূমপান করা', exampleJp: 'たばこ を すいません。', exampleBn: 'ধূমপান করি না।', type: 'VERB' },
      { word: 'みます', reading: 'みます', romaji: 'mimasu', english: 'See, look, watch', bengali: 'দেখা', exampleJp: 'えいが を みます。', exampleBn: 'সিনেমা দেখি।', type: 'VERB' },
      { word: 'ききます', reading: 'ききます', romaji: 'kikimasu', english: 'Hear, listen', bengali: 'শোনা', exampleJp: 'おんがく を ききます。', exampleBn: 'গান শুনি।', type: 'VERB' },
      { word: 'よみます', reading: 'よみます', romaji: 'yomimasu', english: 'Read', bengali: 'পড়া', exampleJp: 'ほん を よみます。', exampleBn: 'বই পড়ছি।', type: 'VERB' },
      { word: 'かきます', reading: 'かきます', romaji: 'kakimasu', english: 'Write, draw', bengali: 'লেখা / আঁকা', exampleJp: 'てがみ を かきます。', exampleBn: 'চিঠি লিখি।', type: 'VERB' },
      { word: 'かいます', reading: 'かいます', romaji: 'kaimasu', english: 'Buy', bengali: 'কেনা', exampleJp: 'パン を かいます。', exampleBn: 'পাউরুটি কিনি।', type: 'VERB' },
      { word: 'とります', reading: 'とります', romaji: 'torimasu', english: 'Take (a picture)', bengali: 'তোলা (ছবি)', exampleJp: 'しゃしん を とります。', exampleBn: 'ছবি তুলি।', type: 'VERB' },
      { word: 'します', reading: 'します', romaji: 'shimasu', english: 'Do', bengali: 'করা', exampleJp: 'サッカー を します。', exampleBn: 'ফুটবল খেলি।', type: 'VERB' },
      { word: 'あいます', reading: 'あいます', romaji: 'aimasu', english: 'Meet', bengali: 'দেখা করা', exampleJp: 'ともだち に あいます。', exampleBn: 'বন্ধুর সাথে দেখা করব।', type: 'VERB' },
      { word: 'ごはん', reading: 'ごはん', romaji: 'gohan', english: 'Meal, cooked rice', bengali: 'ভাত / খাবার', exampleJp: 'ごはん を どうぞ。', exampleBn: 'খাবার গ্রহণ করুন।', type: 'NOUN' },
      { word: 'パン', reading: 'パン', romaji: 'pan', english: 'Bread', bengali: 'পাউরুটি', exampleJp: 'パン を たべます。', exampleBn: 'পাউরুটি খাই।', type: 'NOUN' },
      { word: 'たまご', reading: 'たまご', romaji: 'tamago', english: 'Egg', bengali: 'ডিম', exampleJp: 'たまご を かいました。', exampleBn: 'ডিম কিনেছি।', type: 'NOUN' },
      { word: 'にく', reading: 'にく', romaji: 'niku', english: 'Meat', bengali: 'মাংস', exampleJp: 'ぎゅうにく を たべます。', exampleBn: 'গরুর মাংস খাই।', type: 'NOUN' },
      { word: 'さかな', reading: 'さかな', romaji: 'sakana', english: 'Fish', bengali: 'মাছ', exampleJp: 'さかな が すき です。', exampleBn: 'মাছ পছন্দ করি।', type: 'NOUN' },
      { word: 'やさい', reading: 'やさい', romaji: 'yasai', english: 'Vegetables', bengali: 'শাকসবজি', exampleJp: 'しんせん な やさい です。', exampleBn: 'তাজা শাকসবজি।', type: 'NOUN' },
      { word: 'くだもの', reading: 'くだもの', romaji: 'kudamono', english: 'Fruit', bengali: 'ফলমূল', exampleJp: 'くだもの を かいます。', exampleBn: 'ফল কিনব।', type: 'NOUN' },
      { word: 'おちゃ', reading: 'おちゃ', romaji: 'ocha', english: 'Green tea', bengali: 'সবুজ চা', exampleJp: 'おちゃ を どうぞ。', exampleBn: 'চা নিন।', type: 'NOUN' },
      { word: 'ぎゅうにゅう', reading: 'ぎゅうにゅう', romaji: 'gyuunyuu', english: 'Milk', bengali: 'দুধ', exampleJp: 'ぎゅうにゅう を のみます。', exampleBn: 'দুধ পান করি।', type: 'NOUN' }
    ]
  },
  {
    lessonId: 7,
    items: [
      { word: 'きります', reading: 'きります', romaji: 'kirimasu', english: 'Cut, slice', bengali: 'কাটা', exampleJp: 'ハサミ で かみ を きります。', exampleBn: 'কাঁচি দিয়ে কাগজ কাটি।', type: 'VERB' },
      { word: 'おくります', reading: 'おくります', romaji: 'okurimasu', english: 'Send', bengali: 'পাঠানো', exampleJp: 'メール を おくります。', exampleBn: 'ইমেইল পাঠাচ্ছি।', type: 'VERB' },
      { word: 'あげます', reading: 'あげます', romaji: 'agemasu', english: 'Give', bengali: 'দেওয়া (অন্যকে)', exampleJp: 'はな を あげます。', exampleBn: 'ফুল উপহার দিই।', type: 'VERB' },
      { word: 'もらいます', reading: 'もらいます', romaji: 'moraimasu', english: 'Receive', bengali: 'পাওয়া / গ্রহণ করা', exampleJp: 'プレゼント を もらいました。', exampleBn: 'উপহার পেয়েছি।', type: 'VERB' },
      { word: 'かします', reading: 'かします', romaji: 'kashimasu', english: 'Lend', bengali: 'ধার দেওয়া', exampleJp: 'おかね を かします。', exampleBn: 'টাকা ধার দিই।', type: 'VERB' },
      { word: 'かります', reading: 'かります', romaji: 'karimasu', english: 'Borrow', bengali: 'ধার নেওয়া', exampleJp: 'ほん を かりました。', exampleBn: 'বই ধার নিয়েছি।', type: 'VERB' },
      { word: 'おしえます', reading: 'おしえます', romaji: 'oshiemasu', english: 'Teach, tell', bengali: 'শেখানো / জানানো', exampleJp: 'えいご を おしえます。', exampleBn: 'ইংরেজি শেখাই।', type: 'VERB' },
      { word: 'ならいます', reading: 'ならいます', romaji: 'naraimasu', english: 'Learn', bengali: 'শেখা', exampleJp: 'ピアノ を ならいます。', exampleBn: 'পিয়ানো শিখি।', type: 'VERB' },
      { word: 'はし', reading: 'はし', romaji: 'hashi', english: 'Chopsticks', bengali: 'চপস্টিক', exampleJp: 'はし で たべます。', exampleBn: 'চপস্টিক দিয়ে খাই।', type: 'NOUN' },
      { word: 'スプーン', reading: 'スプーン', romaji: 'supuun', english: 'Spoon', bengali: 'চামচ', exampleJp: 'スプーン を つかいます。', exampleBn: 'চামচ ব্যবহার করি।', type: 'NOUN' },
      { word: 'ナイフ', reading: 'ナイフ', romaji: 'naifu', english: 'Knife', bengali: 'ছুরি', exampleJp: 'ナイフ で きります。', exampleBn: 'ছুরি দিয়ে কাটি।', type: 'NOUN' },
      { word: 'フォーク', reading: 'フォーク', romaji: 'fooku', english: 'Fork', bengali: 'কাঁটাচামচ', exampleJp: 'フォーク で たべます。', exampleBn: 'কাঁটাচামচ দিয়ে খাই।', type: 'NOUN' },
      { word: 'ハサミ', reading: 'ハサミ', romaji: 'hasami', english: 'Scissors', bengali: 'কাঁচি', exampleJp: 'ハサミ を かしてください。', exampleBn: 'কাঁচি ধার দিন।', type: 'NOUN' },
      { word: 'ケータイ', reading: 'ケータイ', romaji: 'keetai', english: 'Mobile phone', bengali: 'মোবাইল ফোন', exampleJp: 'ケータイ で でんわ します。', exampleBn: 'মোবাইলে ফোন করি।', type: 'NOUN' },
      { word: 'メール', reading: 'メール', romaji: 'meeru', english: 'E-mail', bengali: 'ইমেইল', exampleJp: 'メール を かきました。', exampleBn: 'ইমেইল লিখেছি।', type: 'NOUN' },
      { word: 'プレゼント', reading: 'プレゼント', romaji: 'purezento', english: 'Present, gift', bengali: 'উপহার', exampleJp: 'すてき な プレゼント です。', exampleBn: 'সুন্দর উপহার।', type: 'NOUN' },
      { word: 'にもつ', reading: 'にもつ', romaji: 'nimotsu', english: 'Baggage, parcel', bengali: 'মালামাল / পার্সেল', exampleJp: 'にもつ を はこびます。', exampleBn: 'মালামাল বহন করি।', type: 'NOUN' },
      { word: 'おかね', reading: 'おかね', romaji: 'okane', english: 'Money', bengali: 'টাকা / অর্থ', exampleJp: 'おかね を はらいます。', exampleBn: 'টাকা পরিশোধ করি।', type: 'NOUN' },
      { word: 'きっぷ', reading: 'きっぷ', romaji: 'kippu', english: 'Ticket', bengali: 'টিকিট', exampleJp: 'でんしゃ の きっぷ です。', exampleBn: 'ট্রেনের টিকিট।', type: 'NOUN' },
      { word: 'クリスマス', reading: 'クリスマス', romaji: 'kurisumasu', english: 'Christmas', bengali: 'বড়দিন', exampleJp: 'メリー クリスマス！', exampleBn: 'শুভ বড়দিন!', type: 'NOUN' }
    ]
  },
  {
    lessonId: 8,
    items: [
      { word: 'ハンサムな', reading: 'ハンサムな', romaji: 'hansamu na', english: 'Handsome', bengali: 'সুদর্শন', exampleJp: 'かれ は ハンサム です。', exampleBn: 'সে সুদর্শন।', type: 'ADJECTIVE' },
      { word: 'きれいな', reading: 'きれいな', romaji: 'kirei na', english: 'Beautiful, clean', bengali: 'সুন্দর / পরিষ্কার', exampleJp: 'へや は きれい です。', exampleBn: 'ঘরটি পরিষ্কার।', type: 'ADJECTIVE' },
      { word: 'しずかな', reading: 'しずかな', romaji: 'shizuka na', english: 'Quiet', bengali: 'শান্ত / নিস্তব্ধ', exampleJp: 'しずか な まち です。', exampleBn: 'শান্ত শহর।', type: 'ADJECTIVE' },
      { word: 'にぎやかな', reading: 'にぎやかな', romaji: 'nigiyaka na', english: 'Lively, bustling', bengali: 'কোলাহলপূর্ণ / প্রাণবন্ত', exampleJp: 'にぎやか な とおり です。', exampleBn: 'প্রাণবন্ত রাস্তা।', type: 'ADJECTIVE' },
      { word: 'ゆうめいな', reading: 'ゆうめいな', romaji: 'yuumei na', english: 'Famous', bengali: 'বিখ্যাত', exampleJp: 'ゆうめい な レストラン です。', exampleBn: 'বিখ্যাত রেস্তোরাঁ।', type: 'ADJECTIVE' },
      { word: 'しんせつな', reading: 'しんせつな', romaji: 'shinsetsu na', english: 'Kind, helpful', bengali: 'দয়ালু / অমায়িক', exampleJp: 'せんせい は しんせつ です。', exampleBn: 'শিক্ষক দয়ালু।', type: 'ADJECTIVE' },
      { word: 'げんきな', reading: 'げんきな', romaji: 'genki na', english: 'Healthy, lively', bengali: 'সুস্থ / সবল', exampleJp: 'おげんき ですか。', exampleBn: 'কেমন আছেন?', type: 'ADJECTIVE' },
      { word: 'ひまな', reading: 'ひまな', romaji: 'hima na', english: 'Free (time)', bengali: 'অবসর / অলস সময়', exampleJp: 'きょう は ひま です。', exampleBn: 'আজ আমি অবসর।', type: 'ADJECTIVE' },
      { word: 'べんりな', reading: 'べんりな', romaji: 'benri na', english: 'Convenient', bengali: 'সুবিধাজনক', exampleJp: 'ちかてつ は べんり です。', exampleBn: 'মেট্রো সুবিধাজনক।', type: 'ADJECTIVE' },
      { word: 'おおきい', reading: 'おおきい', romaji: 'ookii', english: 'Big, large', bengali: 'বড়', exampleJp: 'おおきい いえ です。', exampleBn: 'বড় বাড়ি।', type: 'ADJECTIVE' },
      { word: 'ちいさい', reading: 'ちいさい', romaji: 'chiisai', english: 'Small, little', bengali: 'ছোট', exampleJp: 'ちいさい くるま です。', exampleBn: 'ছোট গাড়ি।', type: 'ADJECTIVE' },
      { word: 'あたらしい', reading: 'あたらしい', romaji: 'atarashii', english: 'New', bengali: 'নতুন', exampleJp: 'あたらしい ほん です。', exampleBn: 'নতুন বই।', type: 'ADJECTIVE' },
      { word: 'ふるい', reading: 'ふるい', romaji: 'furui', english: 'Old (not person)', bengali: 'পুরাতন', exampleJp: 'ふるい おてら です。', exampleBn: 'পুরাতন মন্দির।', type: 'ADJECTIVE' },
      { word: 'いい', reading: 'いい / よい', romaji: 'ii', english: 'Good', bengali: 'ভালো', exampleJp: 'いい てんき です。', exampleBn: 'সুন্দর আবহাওয়া।', type: 'ADJECTIVE' },
      { word: 'わるい', reading: 'わるい', romaji: 'warui', english: 'Bad', bengali: 'খারাপ', exampleJp: 'てんき が わるい です。', exampleBn: 'আবহাওয়া খারাপ।', type: 'ADJECTIVE' },
      { word: 'あつい', reading: 'あつい', romaji: 'atsui', english: 'Hot', bengali: 'গরম', exampleJp: 'きょう は あつい です。', exampleBn: 'আজ গরম।', type: 'ADJECTIVE' },
      { word: 'さむい', reading: 'さむい', romaji: 'samui', english: 'Cold (weather)', bengali: 'ঠান্ডা (আবহাওয়া)', exampleJp: 'ふゆ は さむい です。', exampleBn: 'শীতকালে ঠান্ডা।', type: 'ADJECTIVE' },
      { word: 'むずかしい', reading: 'むずかしい', romaji: 'muzukashii', english: 'Difficult', bengali: 'কঠিন', exampleJp: 'テスト は むずかしい です。', exampleBn: 'পরীক্ষা কঠিন।', type: 'ADJECTIVE' },
      { word: 'やさしい', reading: 'やさしい', romaji: 'yasashii', english: 'Easy, kind', bengali: 'সহজ / নম্র', exampleJp: 'この もんだい は やさしい です。', exampleBn: 'এই প্রশ্নটি সহজ।', type: 'ADJECTIVE' },
      { word: 'おいしい', reading: 'おいしい', romaji: 'oishii', english: 'Delicious, tasty', bengali: 'সুস্বাদু / মজাদার', exampleJp: 'この りょうり は おいしい です。', exampleBn: 'এই খাবারটি সুস্বাদু।', type: 'ADJECTIVE' }
    ]
  },
  {
    lessonId: 9,
    items: [
      { word: 'わかります', reading: 'わかります', romaji: 'wakarimasu', english: 'Understand', bengali: 'বোঝা / জানা', exampleJp: 'にほんご が わかります。', exampleBn: 'জাপানি ভাষা বুঝি।', type: 'VERB' },
      { word: 'あります', reading: 'あります', romaji: 'arimasu', english: 'Have, possess (inanimate)', bengali: 'থাকা / আছে', exampleJp: 'じかん が あります。', exampleBn: 'সময় আছে।', type: 'VERB' },
      { word: 'すきな', reading: 'すきな', romaji: 'suki na', english: 'Like, favorite', bengali: 'পছন্দনীয়', exampleJp: 'スポーツ が すき です。', exampleBn: 'খেলাধুলা পছন্দ করি।', type: 'ADJECTIVE' },
      { word: 'きらいな', reading: 'きらいな', romaji: 'kirai na', english: 'Dislike', bengali: 'অপছন্দনীয়', exampleJp: 'やさい が きらい です。', exampleBn: 'সবজি অপছন্দ করি।', type: 'ADJECTIVE' },
      { word: 'じょうずな', reading: 'じょうずな', romaji: 'jouzu na', english: 'Good at, skillful', bengali: 'দক্ষ / পারদর্শী', exampleJp: 'りょうり が じょうず です。', exampleBn: 'রান্নায় দক্ষ।', type: 'ADJECTIVE' },
      { word: 'へたな', reading: 'へたな', romaji: 'heta na', english: 'Poor at, unskillful', bengali: 'অদক্ষ / দুর্বল', exampleJp: 'うた が へた です。', exampleBn: 'গানে অপটু।', type: 'ADJECTIVE' },
      { word: 'りょうり', reading: 'りょうり', romaji: 'ryouri', english: 'Cooking, cuisine', bengali: 'রান্না / খাবার', exampleJp: 'にほんりょうり を つくります。', exampleBn: 'জাপানি খাবার রান্না করি।', type: 'NOUN' },
      { word: 'のみもの', reading: 'のみもの', romaji: 'nomimono', english: 'Beverage, drinks', bengali: 'পানীয়', exampleJp: 'つめたい のみもの です。', exampleBn: 'ঠান্ডা পানীয়।', type: 'NOUN' },
      { word: 'スポーツ', reading: 'スポーツ', romaji: 'supootsu', english: 'Sports', bengali: 'খেলাধুলা', exampleJp: 'スポーツ を します。', exampleBn: 'খেলাধুলা করি।', type: 'NOUN' },
      { word: 'おんがく', reading: 'おんがく', romaji: 'ongaku', english: 'Music', bengali: 'সংগীত / গান', exampleJp: 'おんがく を ききます。', exampleBn: 'গান শুনি।', type: 'NOUN' },
      { word: 'うた', reading: 'うた', romaji: 'uta', english: 'Song', bengali: 'গান', exampleJp: 'うた を うたいます。', exampleBn: 'গান গাই।', type: 'NOUN' },
      { word: 'かんじ', reading: 'かんじ', romaji: 'kanji', english: 'Kanji characters', bengali: 'কানজি লিপি', exampleJp: 'かんじ を べんきょうします。', exampleBn: 'কানজি শিখছি।', type: 'NOUN' },
      { word: 'ひらがな', reading: 'ひらがな', romaji: 'hiragana', english: 'Hiragana script', bengali: 'হিরাগানা লিপি', exampleJp: 'ひらがな を かきます。', exampleBn: 'হিরাগানা লিখি।', type: 'NOUN' },
      { word: 'かたかな', reading: 'かたかな', romaji: 'katakana', english: 'Katakana script', bengali: 'কাতাকানা লিপি', exampleJp: 'かたかな を おぼえます。', exampleBn: 'কাতাকানা মুখস্থ করছি।', type: 'NOUN' },
      { word: 'じかん', reading: 'じかん', romaji: 'jikan', english: 'Time', bengali: 'সময়', exampleJp: 'じかん が ありません。', exampleBn: 'সময় নেই।', type: 'NOUN' },
      { word: 'やくそく', reading: 'やくそく', romaji: 'yakusoku', english: 'Promise, appointment', bengali: 'প্রতিশ্রুতি / অ্যাপয়েন্টমেন্ট', exampleJp: 'ともだち と やくそく が あります。', exampleBn: 'বন্ধুর সাথে দেখা করার কথা আছে।', type: 'NOUN' },
      { word: 'アルバイト', reading: 'アルバイト', romaji: 'arubaito', english: 'Part-time job', bengali: 'খণ্ডকালীন কাজ / পার্ট-টাইম', exampleJp: 'コンビニ で アルバイト します。', exampleBn: 'কনভেনিয়েন্স স্টোরে পার্ট-টাইম করি।', type: 'NOUN' },
      { word: 'たくさん', reading: 'たくさん', romaji: 'takusan', english: 'Many, a lot', bengali: 'অনেক / প্রচুর', exampleJp: 'ほん が たくさん あります。', exampleBn: 'অনেক বই আছে।', type: 'NOUN' },
      { word: 'すこし', reading: 'すこし', romaji: 'sukoshi', english: 'A little, few', bengali: 'একটু / সামান্য', exampleJp: 'すこし わかります。', exampleBn: 'সামান্য বুঝি।', type: 'NOUN' },
      { word: 'ぜんぜん', reading: 'ぜんぜん', romaji: 'zenzen', english: 'Not at all (with neg)', bengali: 'একেবারেই না', exampleJp: 'ぜんぜん わかりません。', exampleBn: 'একেবারেই বুঝি না।', type: 'NOUN' }
    ]
  },
  {
    lessonId: 10,
    items: [
      { word: 'います', reading: 'います', romaji: 'imasu', english: 'Exist, be (animate)', bengali: 'থাকা (সজীব প্রাণী)', exampleJp: 'ねこ が います。', exampleBn: 'বিড়াল আছে।', type: 'VERB' },
      { word: 'いぬ', reading: 'いぬ', romaji: 'inu', english: 'Dog', bengali: 'কুকুর', exampleJp: 'しろい いぬ です。', exampleBn: 'সাদা কুকুর।', type: 'NOUN' },
      { word: 'ねこ', reading: 'ねこ', romaji: 'neko', english: 'Cat', bengali: 'বিড়াল', exampleJp: 'くろい ねこ が います。', exampleBn: 'কালো বিড়াল আছে।', type: 'NOUN' },
      { word: 'き', reading: 'き', romaji: 'ki', english: 'Tree, wood', bengali: 'গাছ', exampleJp: 'おおきい き です。', exampleBn: 'বড় গাছ।', type: 'NOUN' },
      { word: 'もの', reading: 'もの', romaji: 'mono', english: 'Thing, object', bengali: 'জিনিস / বস্তু', exampleJp: 'いろいろな もの が あります。', exampleBn: 'নানা ধরনের জিনিস আছে।', type: 'NOUN' },
      { word: 'はこ', reading: 'はこ', romaji: 'hako', english: 'Box', bengali: 'বাক্স', exampleJp: 'はこ の なか に いれます。', exampleBn: 'বাক্সের ভেতরে রাখি।', type: 'NOUN' },
      { word: 'れいぞうこ', reading: 'れいぞうこ', romaji: 'reizouko', english: 'Refrigerator', bengali: 'রেফ্রিজারেটর / ফ্রিজ', exampleJp: 'れいぞうこ に ぎゅうにゅう が あります。', exampleBn: 'ফ্রিজে দুধ আছে।', type: 'NOUN' },
      { word: 'ベッド', reading: 'ベッド', romaji: 'beddo', english: 'Bed', bengali: 'বিছানা', exampleJp: 'ベッド で ねます。', exampleBn: 'বিছানায় ঘুমাই।', type: 'NOUN' },
      { word: 'たな', reading: 'たな', romaji: 'tana', english: 'Shelf', bengali: 'তাক / শেলফ', exampleJp: 'ほん だな に ならべます。', exampleBn: 'বইয়ের তাকে সাজাই।', type: 'NOUN' },
      { word: 'ドア', reading: 'ドア', romaji: 'doa', english: 'Door', bengali: 'দরজা', exampleJp: 'ドア を あけます。', exampleBn: 'দরজা খুলি।', type: 'NOUN' },
      { word: 'まど', reading: 'まど', romaji: 'mado', english: 'Window', bengali: 'জানালা', exampleJp: 'まど を しめます。', exampleBn: 'জানালা বন্ধ করি।', type: 'NOUN' },
      { word: 'ビル', reading: 'ビル', romaji: 'biru', english: 'Building', bengali: 'দালান / ভবন', exampleJp: 'たかい ビル です。', exampleBn: 'উঁচু ভবন।', type: 'NOUN' },
      { word: 'コンビニ', reading: 'コンビニ', romaji: 'konbini', english: 'Convenience store', bengali: 'কনভেনিয়েন্স স্টোর', exampleJp: 'コンビニ へ いきます。', exampleBn: 'কনভেনিয়েন্সে যাই।', type: 'NOUN' },
      { word: 'うえ', reading: 'うえ', romaji: 'ue', english: 'Above, on top', bengali: 'উপরে', exampleJp: 'つくえ の うエ です。', exampleBn: 'টেবিলের উপরে।', type: 'NOUN' },
      { word: 'した', reading: 'した', romaji: 'shita', english: 'Under, below', bengali: 'নিচে', exampleJp: 'いす の した です。', exampleBn: 'চেয়ারের নিচে।', type: 'NOUN' },
      { word: 'まえ', reading: 'まえ', romaji: 'mae', english: 'In front, before', bengali: 'সামনে', exampleJp: 'えき の まえ で あいます。', exampleBn: 'স্টেশনের সামনে দেখা করব।', type: 'NOUN' },
      { word: 'うしろ', reading: 'うしろ', romaji: 'ushiro', english: 'Behind', bengali: 'পেছনে', exampleJp: 'ビル の うしろ です。', exampleBn: 'ভবনের পেছনে।', type: 'NOUN' },
      { word: 'みぎ', reading: 'みぎ', romaji: 'migi', english: 'Right side', bengali: 'ডান দিক', exampleJp: 'みぎ へ まがります。', exampleBn: 'ডানে ঘুরুন।', type: 'NOUN' },
      { word: 'ひだり', reading: 'ひだり', romaji: 'hidari', english: 'Left side', bengali: 'বাম দিক', exampleJp: 'ひだり に あります。', exampleBn: 'বামে আছে।', type: 'NOUN' },
      { word: 'なか', reading: 'なか', romaji: 'naka', english: 'Inside, middle', bengali: 'ভেতরে', exampleJp: 'かばん の なか です。', exampleBn: 'ব্যাগের ভেতরে।', type: 'NOUN' }
    ]
  }
];

// Combine all 25 lessons
for (let l = 11; l <= 25; l++) {
  // generate rich curriculum vocab for lessons 11 to 25
  const sampleItems = [];
  if (l === 11) {
    sampleItems.push(
      { word: 'いくつ', reading: 'いくつ', romaji: 'ikutsu', english: 'How many', bengali: 'কয়টি', exampleJp: 'りんご は いくつ ありますか。', exampleBn: 'আপেল কয়টি আছে?', type: 'NOUN' },
      { word: 'ひとつ', reading: 'ひとつ', romaji: 'hitotsu', english: 'One thing', bengali: 'একটি', exampleJp: 'みかん を ひとつ ください。', exampleBn: 'একটি কমলা দিন।', type: 'NOUN' },
      { word: 'ふたつ', reading: 'ふたつ', romaji: 'futatsu', english: 'Two things', bengali: 'দুটি', exampleJp: 'ふたつ かいました。', exampleBn: 'দুটি কিনেছি।', type: 'NOUN' },
      { word: 'みっつ', reading: 'みっつ', romaji: 'mittsu', english: 'Three things', bengali: 'তিনটি', exampleJp: 'みっつ あります。', exampleBn: 'তিনটি আছে।', type: 'NOUN' },
      { word: 'よっつ', reading: 'よっつ', romaji: 'yottsu', english: 'Four things', bengali: 'চারটি', exampleJp: 'パン を よっつ ください。', exampleBn: 'চারটি পাউরুটি দিন।', type: 'NOUN' },
      { word: 'いつつ', reading: 'いつつ', romaji: 'itsutsu', english: 'Five things', bengali: 'পাঁচটি', exampleJp: 'たまご を いつつ かいました。', exampleBn: 'পাঁচটি ডিম কিনেছি।', type: 'NOUN' },
      { word: 'むっつ', reading: 'むっつ', romaji: 'muttsu', english: 'Six things', bengali: 'ছয়টি', exampleJp: 'むっつ あります。', exampleBn: 'ছয়টি রয়েছে।', type: 'NOUN' },
      { word: 'ななつ', reading: 'ななつ', romaji: 'nanatsu', english: 'Seven things', bengali: 'সাতটি', exampleJp: 'ななつ ください。', exampleBn: 'সাতটি দিন।', type: 'NOUN' },
      { word: 'やっつ', reading: 'やっつ', romaji: 'yattsu', english: 'Eight things', bengali: 'আটটি', exampleJp: 'やっつ あります。', exampleBn: 'আটটি আছে।', type: 'NOUN' },
      { word: 'ここのつ', reading: 'ここのつ', romaji: 'kokonotsu', english: 'Nine things', bengali: 'নয়টি', exampleJp: 'ここのつ です。', exampleBn: 'নয়টি।', type: 'NOUN' },
      { word: 'とお', reading: 'とお', romaji: 'too', english: 'Ten things', bengali: 'দশটি', exampleJp: 'とお あります。', exampleBn: 'দশটি আছে।', type: 'NOUN' },
      { word: 'ひとり', reading: 'ひとり', romaji: 'hitori', english: 'One person', bengali: 'একজন মানুষ', exampleJp: 'ひとり で いきます。', exampleBn: 'একাকী যাব।', type: 'NOUN' },
      { word: 'ふたり', reading: 'ふたり', romaji: 'futari', english: 'Two people', bengali: 'দুইজন মানুষ', exampleJp: 'ふたり で はなします。', exampleBn: 'দুইজনে কথা বলি।', type: 'NOUN' },
      { word: 'きょうだい', reading: 'きょうだい', romaji: 'kyoudai', english: 'Brothers and sisters', bengali: 'ভাইবোন', exampleJp: 'きょうだい は なんにん ですか。', exampleBn: 'ভাইবোন কতজন?', type: 'NOUN' },
      { word: 'りょうしん', reading: 'りょうしん', romaji: 'ryoushin', english: 'Parents', bengali: 'পিতামাতা', exampleJp: 'りょうしん は げんき です。', exampleBn: 'পিতামাতা সুস্থ আছেন।', type: 'NOUN' }
    );
  } else if (l === 12) {
    sampleItems.push(
      { word: 'かんたんな', reading: 'かんたんな', romaji: 'kantan na', english: 'Easy, simple', bengali: 'সহজ / সাধারণ', exampleJp: 'かんたん な もんだい です。', exampleBn: 'সহজ প্রশ্ন।', type: 'ADJECTIVE' },
      { word: 'ちかい', reading: 'ちかい', romaji: 'chikai', english: 'Near, close', bengali: 'কাছে / নিকটবর্তী', exampleJp: 'えき から ちかい です。', exampleBn: 'স্টেশনের কাছে।', type: 'ADJECTIVE' },
      { word: 'とおい', reading: 'とおい', romaji: 'tooi', english: 'Far, distant', bengali: 'দূরে', exampleJp: 'うち から とおい です。', exampleBn: 'বাড়ি থেকে দূরে।', type: 'ADJECTIVE' },
      { word: 'はやい', reading: 'はやい', romaji: 'hayai', english: 'Fast, early', bengali: 'দ্রুত / সকালে', exampleJp: 'あし が はやい です。', exampleBn: 'দৌড়ে দ্রুত।', type: 'ADJECTIVE' },
      { word: 'おそい', reading: 'おそい', romaji: 'osoi', english: 'Slow, late', bengali: 'ধীর / দেরিতে', exampleJp: 'じかん が おそい です。', exampleBn: 'অনেক দেরি হয়েছে।', type: 'ADJECTIVE' },
      { word: 'すずしい', reading: 'すずしい', romaji: 'suzushii', english: 'Cool (weather)', bengali: 'মনোরম শীতল', exampleJp: 'あき は すずしい です。', exampleBn: 'শরতে মনোরম শীতল আবহাওয়া।', type: 'ADJECTIVE' },
      { word: 'あたたかい', reading: 'あたたかい', romaji: 'atatakai', english: 'Warm', bengali: 'উষ্ণ / মনোরম আরামদায়ক', exampleJp: 'はる は あたたかい です。', exampleBn: 'বসন্তকাল উষ্ণ।', type: 'ADJECTIVE' },
      { word: 'あまい', reading: 'あまい', romaji: 'amai', english: 'Sweet', bengali: 'মিষ্টি', exampleJp: 'ケーキ は あまい です。', exampleBn: 'কেক মিষ্টি।', type: 'ADJECTIVE' },
      { word: 'からい', reading: 'からい', romaji: 'karai', english: 'Spicy, hot', bengali: 'ঝাল / তিতা', exampleJp: 'カレー は からい です。', exampleBn: 'কারি ঝাল।', type: 'ADJECTIVE' },
      { word: 'きせつ', reading: 'きせつ', romaji: 'kisetsu', english: 'Season', bengali: 'ঋতু', exampleJp: 'どの きせつ が すき ですか。', exampleBn: 'কোন ঋতু পছন্দ?', type: 'NOUN' },
      { word: 'はる', reading: 'はる', romaji: 'haru', english: 'Spring', bengali: 'বসন্তকাল', exampleJp: 'はる に さくら が さきます。', exampleBn: 'বসন্তে চেরি ফোটে।', type: 'NOUN' },
      { word: 'なつ', reading: 'なつ', romaji: 'natsu', english: 'Summer', bengali: 'গ্রীষ্মকাল', exampleJp: 'なつ は うみ へ いきます。', exampleBn: 'গ্রীষ্মে সাগরে যাই।', type: 'NOUN' },
      { word: 'あき', reading: 'あき', romaji: 'aki', english: 'Autumn, fall', bengali: 'শরৎকাল / হেমন্ত', exampleJp: 'あき の もみじ です。', exampleBn: 'শরতের লাল পাতা।', type: 'NOUN' },
      { word: 'ふゆ', reading: 'ふゆ', romaji: 'fuyu', english: 'Winter', bengali: 'শীতকাল', exampleJp: 'ふゆ は ゆき が ふります。', exampleBn: 'শীতে তুষার পড়ে।', type: 'NOUN' }
    );
  } else if (l === 13) {
    sampleItems.push(
      { word: 'あそびます', reading: 'あそびます', romaji: 'asobimasu', english: 'Play, have fun', bengali: 'খেলা করা / আনন্দ করা', exampleJp: 'こうえん で あそびます。', exampleBn: 'পার্কে খেলি।', type: 'VERB' },
      { word: 'およぎます', reading: 'およぎます', romaji: 'oyogimasu', english: 'Swim', bengali: 'সাঁতার কাটা', exampleJp: 'プール で およぎます。', exampleBn: 'পুলে সাঁতার কাটি।', type: 'VERB' },
      { word: 'むかえます', reading: 'むかえます', romaji: 'mukaemasu', english: 'Welcome, meet someone', bengali: 'অভ্যর্থনা জানানো / এগিয়ে আনতে যাওয়া', exampleJp: 'ともだち を むかえます。', exampleBn: 'বন্ধুকে এগিয়ে আনতে যাই।', type: 'VERB' },
      { word: 'つかれます', reading: 'つかれます', romaji: 'tsukaremasu', english: 'Get tired', bengali: 'ক্লান্ত হওয়া', exampleJp: 'きょう は つかれました。', exampleBn: 'আজ ক্লান্ত হয়েছি।', type: 'VERB' },
      { word: 'ほしい', reading: 'ほしい', romaji: 'hoshii', english: 'Want (something)', bengali: 'চাওয়া / প্রত্যাশা করা', exampleJp: 'あたらしい くるま が ほしい です。', exampleBn: 'নতুন গাড়ি চাই।', type: 'ADJECTIVE' },
      { word: 'ひろい', reading: 'ひろい', romaji: 'hiroi', english: 'Wide, spacious', bengali: 'প্রশস্ত / বড়', exampleJp: 'ひろい へや です。', exampleBn: 'প্রশস্ত ঘর।', type: 'ADJECTIVE' },
      { word: 'せまい', reading: 'せまい', romaji: 'semai', english: 'Narrow, cramped', bengali: 'সংকীর্ণ / চাপা', exampleJp: 'せまい みち です。', exampleBn: 'সংকীর্ণ পথ।', type: 'ADJECTIVE' },
      { word: 'プール', reading: 'プール', romaji: 'puuru', english: 'Swimming pool', bengali: 'সুইমিং পুল', exampleJp: 'プール へ いきます。', exampleBn: 'সুইমিং পুলে যাচ্ছি।', type: 'NOUN' },
      { word: 'かわ', reading: 'かわ', romaji: 'kawa', english: 'River', bengali: 'নদী', exampleJp: 'かわ で つり を します。', exampleBn: 'নদীতে মাছ ধরি।', type: 'NOUN' },
      { word: 'びじゅつ', reading: 'びじゅつ', romaji: 'bijutsu', english: 'Fine arts', bengali: 'চারুকলা / শিল্পকলা', exampleJp: 'びじゅつかん へ いきます。', exampleBn: 'শিল্পকলা প্রদর্শনীতে যাই।', type: 'NOUN' }
    );
  } else if (l === 14) {
    sampleItems.push(
      { word: 'つけます', reading: 'つけます', romaji: 'tsukemasu', english: 'Turn on', bengali: 'চালু করা (লাইট/টিভি)', exampleJp: 'エアコン を つけます。', exampleBn: 'এসি চালু করি।', type: 'VERB' },
      { word: 'けします', reading: 'けします', romaji: 'keshimasu', english: 'Turn off, extinguish', bengali: 'নিভিয়ে ফেলা / বন্ধ করা', exampleJp: 'でんき を けします。', exampleBn: 'বাতি নিভিয়ে দিই।', type: 'VERB' },
      { word: 'あけます', reading: 'あけます', romaji: 'akemasu', english: 'Open', bengali: 'খোলা', exampleJp: 'ドア を あけて ください。', exampleBn: 'দরজা খুলুন।', type: 'VERB' },
      { word: 'しめます', reading: 'しめます', romaji: 'shimemasu', english: 'Close, shut', bengali: 'বন্ধ করা', exampleJp: 'まど を しめます。', exampleBn: 'জানালা বন্ধ করি।', type: 'VERB' },
      { word: 'いそぎます', reading: 'いそぎます', romaji: 'isogimasu', english: 'Hurry', bengali: 'তাড়াতাড়ি করা', exampleJp: 'じかん が ない から いそぎます。', exampleBn: 'সময় নেই তাই তাড়াতাড়ি করছি।', type: 'VERB' },
      { word: 'まちます', reading: 'まちます', romaji: 'machimasu', english: 'Wait', bengali: 'অপেক্ষা করা', exampleJp: 'ちょっと まって ください。', exampleBn: 'দয়া করে একটু অপেক্ষা করুন।', type: 'VERB' },
      { word: 'もちます', reading: 'もちます', romaji: 'mochimasu', english: 'Hold, carry', bengali: 'ধরা / বহন করা', exampleJp: 'にもつ を もちます。', exampleBn: 'মালামাল বহন করি।', type: 'VERB' },
      { word: 'てつだいます', reading: 'てつだいます', romaji: 'tetsudaimasu', english: 'Help, assist', bengali: 'সাহায্য করা', exampleJp: 'しごと を てつだいます。', exampleBn: 'কাজে সাহায্য করি।', type: 'VERB' },
      { word: 'よびます', reading: 'よびます', romaji: 'yobimasu', english: 'Call, invite', bengali: 'ডাকা', exampleJp: 'タクシー を よびます。', exampleBn: 'ট্যাক্সি ডাকি।', type: 'VERB' },
      { word: 'みせます', reading: 'みせます', romaji: 'misemasu', english: 'Show', bengali: 'দেখানো', exampleJp: 'パスポート を みせて ください。', exampleBn: 'পাসপোর্ট দেখান।', type: 'VERB' }
    );
  } else if (l === 15) {
    sampleItems.push(
      { word: 'すわります', reading: 'すわります', romaji: 'suwarimasu', english: 'Sit down', bengali: 'বসা', exampleJp: 'いす に すわって ください。', exampleBn: 'চেয়ারে বসুন।', type: 'VERB' },
      { word: 'たちます', reading: 'たちます', romaji: 'tachimasu', english: 'Stand up', bengali: 'দাঁড়ানো', exampleJp: 'どうぞ たって ください。', exampleBn: 'দয়া করে দাঁড়ান।', type: 'VERB' },
      { word: 'つかいます', reading: 'つかいます', romaji: 'tsukaimasu', english: 'Use', bengali: 'ব্যবহার করা', exampleJp: 'ペン を つかいます。', exampleBn: 'কলম ব্যবহার করি।', type: 'VERB' },
      { word: 'おきます', reading: 'おきます', romaji: 'okimasu', english: 'Put, place', bengali: 'রাখা (স্থান)', exampleJp: 'ここに おいて ください。', exampleBn: 'এখানে রাখুন।', type: 'VERB' },
      { word: 'つくります', reading: 'つくります', romaji: 'tsukurimasu', english: 'Make, produce', bengali: 'বানানো / তৈরি করা', exampleJp: 'りょうり を つくります。', exampleBn: 'খাবার তৈরি করি।', type: 'VERB' },
      { word: 'うります', reading: 'うります', romaji: 'urimasu', english: 'Sell', bengali: 'বিক্রি করা', exampleJp: 'パン を うっています。', exampleBn: 'পাউরুটি বিক্রি করছে।', type: 'VERB' },
      { word: 'しります', reading: 'しります', romaji: 'shirimasu', english: 'Know', bengali: 'জানা', exampleJp: 'あの ひと を しっていますか。', exampleBn: 'ঐ ব্যক্তিকে চেনেন?', type: 'VERB' },
      { word: 'すみます', reading: 'すみます', romaji: 'sumimasu', english: 'Live, reside', bengali: 'বাস করা', exampleJp: 'とうきょう に すんでいます。', exampleBn: 'টোকিওতে বাস করি।', type: 'VERB' },
      { word: 'はいしゃ', reading: 'はいしゃ', romaji: 'haisha', english: 'Dentist', bengali: 'দাঁতের ডাক্তার', exampleJp: 'はいしゃ へ いきます。', exampleBn: 'দাঁতের ডাক্তারের কাছে যাচ্ছি।', type: 'NOUN' },
      { word: 'どくしん', reading: 'どくしん', romaji: 'dokushin', english: 'Single, unmarried', bengali: 'অবিবাহিত', exampleJp: 'かれ は どくしん です。', exampleBn: 'সে অবিবাহিত।', type: 'NOUN' }
    );
  } else if (l === 16) {
    sampleItems.push(
      { word: 'のります', reading: 'のります', romaji: 'norimasu', english: 'Ride, get on', bengali: 'চড়া / ওঠা (যানবাহনে)', exampleJp: 'でんしゃ に のります。', exampleBn: 'ট্রেনে চড়ি।', type: 'VERB' },
      { word: 'おります', reading: 'おります', romaji: 'orimasu', english: 'Get off', bengali: 'নামা (যানবাহন থেকে)', exampleJp: 'えき で おります。', exampleBn: 'স্টেশনে নামি।', type: 'VERB' },
      { word: 'のりかえます', reading: 'のりかえます', romaji: 'norikaemasu', english: 'Change trains/buses', bengali: 'যানবাহন পরিবর্তন করা', exampleJp: 'しんじゅく で のりかえます。', exampleBn: 'শিঞ্জুকুতে ট্রেন বদল করব।', type: 'VERB' },
      { word: 'あびます', reading: 'あびます', romaji: 'abimasu', english: 'Take (a shower)', bengali: 'গোসল করা (শাওয়ার)', exampleJp: 'シャワー を あびます。', exampleBn: 'শাওয়ার নিই।', type: 'VERB' },
      { word: 'いれます', reading: 'いれます', romaji: 'iremasu', english: 'Put in, insert', bengali: 'ঢোকানো / রাখা', exampleJp: 'おかね を いれます。', exampleBn: 'টাকা ঢোকাই।', type: 'VERB' },
      { word: 'だします', reading: 'だします', romaji: 'dashimasu', english: 'Take out, hand in', bengali: 'বের করা / জমা দেওয়া', exampleJp: 'しゅくだい を だします。', exampleBn: 'হোমওয়ার্ক জমা দিই।', type: 'VERB' },
      { word: 'おろします', reading: 'おろします', romaji: 'oroshimasu', english: 'Withdraw (money)', bengali: 'টাকা তোলা (ব্যাংক থেকে)', exampleJp: 'ぎんこう で おかね を おろします。', exampleBn: 'ব্যাংক থেকে টাকা তুলি।', type: 'VERB' },
      { word: 'あたま', reading: 'あたま', romaji: 'atama', english: 'Head', bengali: 'মাথা', exampleJp: 'あたま が いたい です。', exampleBn: 'মাথা ব্যথা করছে।', type: 'NOUN' },
      { word: 'め', reading: 'め', romaji: 'me', english: 'Eye', bengali: 'চোখ', exampleJp: 'め が わるい です。', exampleBn: 'দৃষ্টিশক্তি দুর্বল।', type: 'NOUN' },
      { word: 'おなか', reading: 'おなか', romaji: 'onaka', english: 'Stomach, belly', bengali: 'পেট', exampleJp: 'おなか が すきました。', exampleBn: 'পেটে ক্ষুধা লেগেছে।', type: 'NOUN' }
    );
  } else if (l === 17) {
    sampleItems.push(
      { word: 'おぼえます', reading: 'おぼえます', romaji: 'oboemasu', english: 'Remember, memorize', bengali: 'মুখস্থ করা / মনে রাখা', exampleJp: 'たんご を おぼえます。', exampleBn: 'শব্দার্থ মুখস্থ করি।', type: 'VERB' },
      { word: 'わすれます', reading: 'わすれます', romaji: 'wasuremasu', english: 'Forget', bengali: 'ভুলে যাওয়া', exampleJp: 'かさを わすれました。', exampleBn: 'ছাতা ফেলে এসেছি।', type: 'VERB' },
      { word: 'なくします', reading: 'なくします', romaji: 'nakushimasu', english: 'Lose (something)', bengali: 'হারিয়ে ফেলা', exampleJp: 'さいふ を なくしました。', exampleBn: 'মানিব্যাগ হারিয়েছি।', type: 'VERB' },
      { word: 'はらいます', reading: 'はらいます', romaji: 'haraimasu', english: 'Pay', bengali: 'পরিশোধ করা', exampleJp: 'げんきん で はらいます。', exampleBn: 'নগদ টাকায় পরিশোধ করি।', type: 'VERB' },
      { word: 'かえします', reading: 'かえします', romaji: 'kaeshimasu', english: 'Return (things)', bengali: 'ফেরত দেওয়া', exampleJp: 'ほん を かえします。', exampleBn: 'বই ফেরত দিই।', type: 'VERB' },
      { word: 'ぬぎます', reading: 'ぬぎます', romaji: 'nugimasu', english: 'Take off (clothes/shoes)', bengali: 'পোশাক / জুতো খোলা', exampleJp: 'くつ を ぬいで ください。', exampleBn: 'জুতো খুলুন।', type: 'VERB' },
      { word: 'たいせつな', reading: 'たいせつな', romaji: 'taisetsu na', english: 'Important, precious', bengali: 'গুরুত্বপূর্ণ / মূল্যবান', exampleJp: 'たいせつ な しりょう です。', exampleBn: 'গুরুত্বপূর্ণ নথি।', type: 'ADJECTIVE' },
      { word: 'だいじょうぶな', reading: 'だいじょうぶな', romaji: 'daijoubu na', english: 'All right, OK', bengali: 'ঠিক আছে / নিরাপদ', exampleJp: 'だいじょうぶ ですよ。', exampleBn: 'কোনো সমস্যা নেই।', type: 'ADJECTIVE' },
      { word: 'あぶない', reading: 'あぶない', romaji: 'abunai', english: 'Dangerous', bengali: 'বিপজ্জনক', exampleJp: 'あぶない です から き を つけて。', exampleBn: 'বিপদজনক তাই সাবধানে।', type: 'ADJECTIVE' },
      { word: 'びょうき', reading: 'びょうき', romaji: 'byouki', english: 'Illness, sickness', bengali: 'অসুখ / রোগ', exampleJp: 'びょうき に なりました。', exampleBn: 'অসুস্থ হয়ে পড়েছি।', type: 'NOUN' }
    );
  } else if (l === 18) {
    sampleItems.push(
      { word: 'できます', reading: 'できます', romaji: 'dekimasu', english: 'Can do, be able to', bengali: 'পারদর্শী হওয়া / পারা', exampleJp: 'にほんご が できます。', exampleBn: 'জাপানি ভাষা পারি।', type: 'VERB' },
      { word: 'あらいます', reading: 'あらいます', romaji: 'araimasu', english: 'Wash', bengali: 'ধোয়া / পরিষ্কার করা', exampleJp: 'て を あらいます。', exampleBn: 'হাত ধুই।', type: 'VERB' },
      { word: 'ひきます', reading: 'ひきます', romaji: 'hikimasu', english: 'Play (string/piano)', bengali: 'বাজানো (বাদ্যযন্ত্র)', exampleJp: 'ピアノ を ひきます。', exampleBn: 'পিয়ানো বাজাই।', type: 'VERB' },
      { word: 'うたいます', reading: 'うたいます', romaji: 'utaimasu', english: 'Sing', bengali: 'গান গাওয়া', exampleJp: 'うた を うたいます。', exampleBn: 'গান গাইছি।', type: 'VERB' },
      { word: 'あつめます', reading: 'あつめます', romaji: 'atsumemasu', english: 'Collect, gather', bengali: 'সংগ্রহ করা', exampleJp: 'きって を あつめます。', exampleBn: 'ডাকটিকিট সংগ্রহ করি।', type: 'VERB' },
      { word: 'すてます', reading: 'すてます', romaji: 'sutemasu', english: 'Throw away, discard', bengali: 'ফেলে দেওয়া', exampleJp: 'ごみ を すてます。', exampleBn: 'ময়লা ফেলি।', type: 'VERB' },
      { word: 'うんてんします', reading: 'うんてんします', romaji: 'untenshimasu', english: 'Drive', bengali: 'গাড়ি চালানো', exampleJp: 'くるま を うんてんします。', exampleBn: 'গাড়ি চালাই।', type: 'VERB' },
      { word: 'よやくします', reading: 'よやくします', romaji: 'yoyakushimasu', english: 'Reserve, book', bengali: 'বুকিং দেওয়া / অগ্রিম সংরক্ষণ', exampleJp: 'ホテル を よやくします。', exampleBn: 'হোটেল বুকিং করি।', type: 'VERB' },
      { word: 'しゅみ', reading: 'しゅみ', romaji: 'shumi', english: 'Hobby', bengali: 'শখ', exampleJp: 'しゅみ は どくしょ です。', exampleBn: 'আমার শখ বই পড়া।', type: 'NOUN' },
      { word: 'げんきん', reading: 'げんきん', romaji: 'genkin', english: 'Cash', bengali: 'নগদ টাকা', exampleJp: 'げんきん で はらいます。', exampleBn: 'নগদ টাকায় দেব।', type: 'NOUN' }
    );
  } else if (l === 19) {
    sampleItems.push(
      { word: 'のぼります', reading: 'のぼります', romaji: 'noborimasu', english: 'Climb (mountain)', bengali: 'পাহাড়ে চড়া / ওঠা', exampleJp: 'ふじさん に のぼりました。', exampleBn: 'ফুজি পাহাড়ে উঠেছি।', type: 'VERB' },
      { word: 'とまります', reading: 'とまります', romaji: 'tomarimasu', english: 'Stay (at hotel)', bengali: 'থাকা (হোটেলে রাত্রিযাপন)', exampleJp: 'ホテル に とまります。', exampleBn: 'হোটেলে রাত কাটাই।', type: 'VERB' },
      { word: 'そうじします', reading: 'そうじします', romaji: 'soujishimasu', english: 'Clean (a room)', bengali: 'ঝাড়ু দেওয়া / ঘর পরিষ্কার করা', exampleJp: 'へや を そうじします。', exampleBn: 'ঘর পরিষ্কার করি।', type: 'VERB' },
      { word: 'せんたくします', reading: 'せんたくします', romaji: 'sentakushimasu', english: 'Wash clothes, do laundry', bengali: 'কাপড় ধোয়া', exampleJp: 'ふく を せんたくします。', exampleBn: 'কাপড় ধুই।', type: 'VERB' },
      { word: 'なります', reading: 'なります', romaji: 'narimasu', english: 'Become', bengali: 'হওয়া / পরিণত হওয়া', exampleJp: 'いしゃ に なりたい です。', exampleBn: 'ডাক্তার হতে চাই।', type: 'VERB' },
      { word: 'ねむい', reading: 'ねむい', romaji: 'nemui', english: 'Sleepy', bengali: 'ঘুম ঘুম ভাব / ক্লান্ত', exampleJp: 'きょう は ねむい です。', exampleBn: 'আজ ঘুম পাচ্ছে।', type: 'ADJECTIVE' },
      { word: 'つよい', reading: 'つよい', romaji: 'tsuyoi', english: 'Strong', bengali: 'শক্তিশালী', exampleJp: 'からだ が つよい です。', exampleBn: 'শরীর শক্তিশালী।', type: 'ADJECTIVE' },
      { word: 'よわい', reading: 'よわい', romaji: 'yowai', english: 'Weak', bengali: 'দুর্বল', exampleJp: 'からだ が よわい です。', exampleBn: 'শরীর দুর্বল।', type: 'ADJECTIVE' },
      { word: 'ちょうし', reading: 'ちょうし', romaji: 'choushi', english: 'Condition, tone', bengali: 'শারীরিক অবস্থা', exampleJp: 'ちょうし は どう ですか。', exampleBn: 'শরীর কেমন লাগছে?', type: 'NOUN' },
      { word: 'かんぱい', reading: 'かんぱい', romaji: 'kanpai', english: 'Cheers! (toast)', bengali: 'চিয়ার্স! / শুভকামনা পান', exampleJp: 'みなさん、かんぱい！', exampleBn: 'সবাই, চিয়ার্স!', type: 'EXPRESSION' }
    );
  } else if (l === 20) {
    sampleItems.push(
      { word: 'いります', reading: 'いります', romaji: 'irimasu', english: 'Need, require', bengali: 'প্রয়োজন হওয়া', exampleJp: 'ビザ が いります。', exampleBn: 'ভিসা দরকার।', type: 'VERB' },
      { word: 'しらべます', reading: 'しらべます', romaji: 'shirabemasu', english: 'Check, investigate', bengali: 'অনুসন্ধান করা / যাচাই করা', exampleJp: 'ネット で しらべます。', exampleBn: 'নেটে সার্চ করছি।', type: 'VERB' },
      { word: 'なおします', reading: 'なおします', romaji: 'naoshimasu', english: 'Repair, correct', bengali: 'মেরামত করা / সংশোধন করা', exampleJp: 'パソコン を なおします。', exampleBn: 'কম্পিউটার মেরামত করি।', type: 'VERB' },
      { word: 'ぼく', reading: 'ぼく', romaji: 'boku', english: 'I (used by males informally)', bengali: 'আমি (ছেলেদের ঘরোয়া রূপ)', exampleJp: 'ぼく は いく よ。', exampleBn: 'আমি যাব রে।', type: 'NOUN' },
      { word: 'きみ', reading: 'きみ', romaji: 'kimi', english: 'You (informal)', bengali: 'তুই / তুমি (ঘরোয়া রূপ)', exampleJp: 'きみ も いく？', exampleBn: 'তুইও যাবি?', type: 'NOUN' },
      { word: 'うん', reading: 'うん', romaji: 'un', english: 'Yes (casual)', bengali: 'হুম / হ্যাঁ', exampleJp: 'うん、いく よ。', exampleBn: 'হুম, যাব।', type: 'EXPRESSION' },
      { word: 'ううん', reading: 'ううん', romaji: 'uun', english: 'No (casual)', bengali: 'উঁহু / না', exampleJp: 'ううん、いかない。', exampleBn: 'নাহ, যাব না।', type: 'EXPRESSION' },
      { word: 'ことば', reading: 'ことば', romaji: 'kotoba', english: 'Word, language', bengali: 'কথা / ভাষা / শব্দ', exampleJp: 'にほん の ことば です。', exampleBn: 'জাপানের ভাষা।', type: 'NOUN' },
      { word: 'ビザ', reading: 'ビザ', romaji: 'biza', english: 'Visa', bengali: 'ভিসা', exampleJp: 'ビザ を とります。', exampleBn: 'ভিসা নেব।', type: 'NOUN' },
      { word: 'はじめ', reading: 'はじめ', romaji: 'hajime', english: 'Beginning, start', bengali: 'শুরু / সূচনা', exampleJp: 'はじめ に あいさつ します。', exampleBn: 'শুরুতে অভিবাদন জানাই।', type: 'NOUN' }
    );
  } else if (l === 21) {
    sampleItems.push(
      { word: 'おもいます', reading: 'おもいます', romaji: 'omoimasu', english: 'Think', bengali: 'মনে করা / চিন্তা করা', exampleJp: 'いい と おもいます。', exampleBn: 'ভালো বলে মনে করি।', type: 'VERB' },
      { word: 'いいます', reading: 'いいます', romaji: 'iimasu', english: 'Say, tell', bengali: 'বলা', exampleJp: 'せんせい が いいました。', exampleBn: 'শিক্ষক বলেছিলেন।', type: 'VERB' },
      { word: 'かちます', reading: 'かちます', romaji: 'kachimasu', english: 'Win', bengali: 'জেতা / জয়ী হওয়া', exampleJp: 'しあい に かちました。', exampleBn: 'ম্যাচে জিতেছি।', type: 'VERB' },
      { word: 'まけます', reading: 'まけます', romaji: 'makemasu', english: 'Lose (a game)', bengali: 'পরাজিত হওয়া / হারা', exampleJp: 'ゲーム に まけました。', exampleBn: 'খেলায় হেরে গেছি।', type: 'VERB' },
      { word: 'やくにたちます', reading: 'やくにたちます', romaji: 'yakunitachimasu', english: 'Be useful, helpful', bengali: 'উপকারে আসা / কাজে লাগা', exampleJp: 'とても やくにたちます。', exampleBn: 'খুব কাজে লাগে।', type: 'VERB' },
      { word: 'ふべんな', reading: 'ふべんな', romaji: 'fuben na', english: 'Inconvenient', bengali: 'অসুবিধাজনক', exampleJp: 'ここは ふべん です。', exampleBn: 'এখানটা বেশ অসুবিধাজনক।', type: 'ADJECTIVE' },
      { word: 'おなじ', reading: 'おなじ', romaji: 'onaji', english: 'Same', bengali: 'একই রকম', exampleJp: 'おなじ いけん です。', exampleBn: 'একই মতামত।', type: 'ADJECTIVE' },
      { word: 'ニュース', reading: 'ニュース', romaji: 'nyuusu', english: 'News', bengali: 'সংবাদ / খবর', exampleJp: 'テレビ で ニュース を みます。', exampleBn: 'টিভিতে খবর দেখি।', type: 'NOUN' },
      { word: 'しあい', reading: 'しあい', romaji: 'shiai', english: 'Match, game', bengali: 'ম্যাচ / প্রতিযোগিতা', exampleJp: 'サッカー の しあい です。', exampleBn: 'ফুটবল ম্যাচ।', type: 'NOUN' },
      { word: 'いけん', reading: 'いけん', romaji: 'iken', english: 'Opinion', bengali: 'মতামত', exampleJp: 'いけん を いってください。', exampleBn: 'আপনার মতামত বলুন।', type: 'NOUN' }
    );
  } else if (l === 22) {
    sampleItems.push(
      { word: 'きます', reading: 'きます', romaji: 'kimasu', english: 'Wear, put on (upper body)', bengali: 'পোশাক পরা (উপরের অংশের)', exampleJp: 'シャツ を きます。', exampleBn: 'শার্ট পরি।', type: 'VERB' },
      { word: 'はきます', reading: 'はきます', romaji: 'hakimasu', english: 'Put on (shoes/trousers)', bengali: 'জুতো / প্যান্ট পরা', exampleJp: 'ズボン を はきます。', exampleBn: 'প্যান্ট পরি।', type: 'VERB' },
      { word: 'かぶります', reading: 'かぶります', romaji: 'kaburimasu', english: 'Put on (hat/cap)', bengali: 'টুপি পরা', exampleJp: 'ぼうし を かぶります。', exampleBn: 'টুপি পরি।', type: 'VERB' },
      { word: 'かけます', reading: 'かけます', romaji: 'kakemasu', english: 'Put on (glasses)', bengali: 'চশমা পরা', exampleJp: 'めがね を かけます。', exampleBn: 'চশমা পরি।', type: 'VERB' },
      { word: 'うまれます', reading: 'うまれます', romaji: 'umaremasu', english: 'Be born', bengali: 'জন্মগ্রহণ করা', exampleJp: 'ダッカ で うまれました。', exampleBn: 'ঢাকায় জন্মগ্রহণ করেছি।', type: 'VERB' },
      { word: 'コート', reading: 'コート', romaji: 'kooto', english: 'Coat', bengali: 'কোট / ওভারকোট', exampleJp: 'あたたかい コート です。', exampleBn: 'উষ্ণ কোট।', type: 'NOUN' },
      { word: 'セーター', reading: 'セーター', romaji: 'seetaa', english: 'Sweater', bengali: 'সোয়েটার', exampleJp: 'セーター を あみます。', exampleBn: 'সোয়েটার বুনি।', type: 'NOUN' },
      { word: 'スーツ', reading: 'スーツ', romaji: 'suutsu', english: 'Suit', bengali: 'স্যুট', exampleJp: 'くろい スーツ を きます。', exampleBn: 'কালো স্যুট পরি।', type: 'NOUN' },
      { word: 'ぼうし', reading: 'ぼうし', romaji: 'boushi', english: 'Hat, cap', bengali: 'টুপি', exampleJp: 'あおい ぼうし です。', exampleBn: 'নীল টুপি।', type: 'NOUN' },
      { word: 'めがね', reading: 'めがね', romaji: 'megane', english: 'Glasses, spectacles', bengali: 'চশমা', exampleJp: 'めがね を かけて います。', exampleBn: 'চশমা পরে আছি।', type: 'NOUN' }
    );
  } else if (l === 23) {
    sampleItems.push(
      { word: 'まわします', reading: 'まわします', romaji: 'mawashimasu', english: 'Turn, rotate', bengali: 'ঘোরানো / চক্রাকারে ঘোরানো', exampleJp: 'ハンドル を まわします。', exampleBn: 'হ্যান্ডেল ঘোরাই।', type: 'VERB' },
      { word: 'ひきます', reading: 'ひきます', romaji: 'hikimasu', english: 'Pull', bengali: 'টানা', exampleJp: 'ドア を ひきます。', exampleBn: 'দরজা টানি।', type: 'VERB' },
      { word: 'かえます', reading: 'かえます', romaji: 'kaemasu', english: 'Change', bengali: 'পরিবর্তন করা', exampleJp: 'おかね を かえます。', exampleBn: 'টাকা ভাঙাই।', type: 'VERB' },
      { word: 'さわります', reading: 'さわります', romaji: 'sawarimasu', english: 'Touch', bengali: 'স্পর্শ করা / হাত দেওয়া', exampleJp: 'きかい に さわらないで。', exampleBn: 'যন্ত্রপাতিতে হাত দেবেন না।', type: 'VERB' },
      { word: 'あるきます', reading: 'あるきます', romaji: 'arukimasu', english: 'Walk', bengali: 'হাঁটা', exampleJp: 'みち を あるきます。', exampleBn: 'রাস্তায় হাঁটি।', type: 'VERB' },
      { word: 'わたります', reading: 'わたります', romaji: 'watarimasu', english: 'Cross (bridge/road)', bengali: 'পার হওয়া (সেতু/রাস্তা)', exampleJp: 'はし を わたりました。', exampleBn: 'সেতু পার হয়েছি।', type: 'VERB' },
      { word: 'まがります', reading: 'まがります', romaji: 'magarimasu', english: 'Turn (direction)', bengali: 'মোড় নেওয়া / ঘোরা', exampleJp: 'みぎ へ まがります。', exampleBn: 'ডানে মোড় নিই।', type: 'VERB' },
      { word: 'こうさてん', reading: 'こうさてん', romaji: 'kousaten', english: 'Intersection, crossing', bengali: 'চার রাস্তার মোড় / ইন্টারসেকশন', exampleJp: 'こうさてん で とまります。', exampleBn: 'মোড়ে থামি।', type: 'NOUN' },
      { word: 'かど', reading: 'かど', romaji: 'kado', english: 'Corner', bengali: 'কোণা / বাঁক', exampleJp: 'つぎ の かど です。', exampleBn: 'পরের মোড়ে।', type: 'NOUN' },
      { word: 'はし', reading: 'はし', romaji: 'hashi', english: 'Bridge', bengali: 'সেতু / পুল', exampleJp: 'ながい はし です。', exampleBn: 'লম্বা ব্রিজ।', type: 'NOUN' }
    );
  } else if (l === 24) {
    sampleItems.push(
      { word: 'くれます', reading: 'くれます', romaji: 'kuremasu', english: 'Give (to me/my group)', bengali: 'আমাকে দেওয়া / দান করা', exampleJp: 'ともだち が ほん を くれました。', exampleBn: 'বন্ধু আমাকে একটি বই দিয়েছে।', type: 'VERB' },
      { word: 'つれていきます', reading: 'つれていきます', romaji: 'tsurete ikimasu', english: 'Take someone along', bengali: 'কাউকে সাথে নিয়ে যাওয়া', exampleJp: 'いもうと を つれていきます。', exampleBn: 'ছোট বোনকে সাথে নিয়ে যাব।', type: 'VERB' },
      { word: 'つれてきます', reading: 'つれてきます', romaji: 'tsurete kimasu', english: 'Bring someone along', bengali: 'কাউকে সাথে নিয়ে আসা', exampleJp: 'ともだち を つれてきました。', exampleBn: 'বন্ধুকে সাথে নিয়ে এসেছি।', type: 'VERB' },
      { word: 'しょうかいします', reading: 'しょうかいします', romaji: 'shoukaishimasu', english: 'Introduce', bengali: 'পরিচয় করিয়ে দেওয়া', exampleJp: 'ともだち を しょうかいします。', exampleBn: 'বন্ধুকে পরিচয় করিয়ে দিচ্ছি।', type: 'VERB' },
      { word: 'あんないします', reading: 'あんないします', romaji: 'annaishimasu', english: 'Guide, show around', bengali: 'পথ দেখানো / ঘুরিয়ে দেখানো', exampleJp: 'まち を あんないします。', exampleBn: 'শহরটি ঘুরিয়ে দেখাব।', type: 'VERB' },
      { word: 'せつめいします', reading: 'せつめいします', romaji: 'setsumeishimasu', english: 'Explain', bengali: 'ব্যাখ্যা করা', exampleJp: 'つかいかた を せつめいします。', exampleBn: 'ব্যবহারের নিয়ম বুঝিয়ে বলি।', type: 'VERB' },
      { word: 'おじいさん', reading: 'おじいさん', romaji: 'ojiisan', english: 'Grandfather, elderly man', bengali: 'দাদা / নানা / বৃদ্ধ লোক', exampleJp: 'おじいさん は やさしい です。', exampleBn: 'দাদা দয়ালু।', type: 'NOUN' },
      { word: 'おばあさん', reading: 'おばあさん', romaji: 'obaasan', english: 'Grandmother, elderly woman', bengali: 'দাদি / নানি / বৃদ্ধা মহিলা', exampleJp: 'おばあさん の りょうり です。', exampleBn: 'নানির হাতের রান্না।', type: 'NOUN' },
      { word: 'じゅんび', reading: 'じゅんび', romaji: 'junbi', english: 'Preparation', bengali: 'প্রস্তুতি', exampleJp: 'りょこう の じゅんび を します。', exampleBn: 'ভ্রমণের প্রস্তুতি নিচ্ছি।', type: 'NOUN' },
      { word: 'ひっこし', reading: 'ひっこし', romaji: 'hikkoshi', english: 'Moving house', bengali: 'বাড়ি বদলানো', exampleJp: 'らいしゅう ひっこし します。', exampleBn: 'পরের সপ্তাহে বাসা বদলাব।', type: 'NOUN' }
    );
  } else if (l === 25) {
    sampleItems.push(
      { word: 'かんがえます', reading: 'かんがえます', romaji: 'kangaemasu', english: 'Think, consider', bengali: 'ভাবা / বিবেচনা করা', exampleJp: 'よく かんがえて ください。', exampleBn: 'ভালো করে চিন্তা করুন।', type: 'VERB' },
      { word: 'つきます', reading: 'つきます', romaji: 'tsukimasu', english: 'Arrive', bengali: 'পৌঁছানো', exampleJp: 'えき に つきました。', exampleBn: 'স্টেশনে পৌঁছেছি।', type: 'VERB' },
      { word: 'たります', reading: 'たります', romaji: 'tarimasu', english: 'Be enough, sufficient', bengali: 'পর্যাপ্ত হওয়া / কুলালো', exampleJp: 'おかね が たります。', exampleBn: 'টাকা যথেষ্ট হয়েছে।', type: 'VERB' },
      { word: 'がんばります', reading: 'がんばります', romaji: 'ganbarimasu', english: 'Do one\'s best', bengali: 'সর্বাত্মক চেষ্টা করা', exampleJp: 'テスト、がんばります！', exampleBn: 'পরীক্ষায় সেরা চেষ্টা করব!', type: 'VERB' },
      { word: 'チャンス', reading: 'チャンス', romaji: 'chansu', english: 'Chance, opportunity', bengali: 'সুযোগ', exampleJp: 'いい チャンス です。', exampleBn: 'ভালো সুযোগ।', type: 'NOUN' },
      { word: 'いなか', reading: 'いなか', romaji: 'inaka', english: 'Countryside, hometown', bengali: 'গ্রামাঞ্চল / গ্রামের বাড়ি', exampleJp: 'いなか へ かえります。', exampleBn: 'গ্রামের বাড়ি যাব।', type: 'NOUN' },
      { word: 'たいしかん', reading: 'たいしかん', romaji: 'taishikan', english: 'Embassy', bengali: 'দূতাবাস', exampleJp: 'にほん たいしかん です。', exampleBn: 'জাপান দূতাবাস।', type: 'NOUN' },
      { word: 'グループ', reading: 'グループ', romaji: 'guruupu', english: 'Group', bengali: 'দল / গ্রুপ', exampleJp: 'グループ で べんきょうします。', exampleBn: 'গ্রুপে পড়াশোনা করি।', type: 'NOUN' },
      { word: 'もし', reading: 'もし', romaji: 'moshi', english: 'If (hypothetical)', bengali: 'যদি', exampleJp: 'もし あめ なら いきません。', exampleBn: 'যদি বৃষ্টি হয় তবে যাব না।', type: 'EXPRESSION' },
      { word: 'いくら', reading: 'いくら', romaji: 'ikura (temo)', english: 'How much ever (with -temo)', bengali: 'যতই হোক না কেন', exampleJp: 'いくら たかくても かいます。', exampleBn: 'যতই দাম হোক কিনব।', type: 'EXPRESSION' }
    );
  }
  remainingLessons.push({ lessonId: l, items: sampleItems });
}

// Compile all items with unique sequential IDs
const allVocabList = [];
let totalIdx = 1;

[...rawLessonsVocab, ...remainingLessons].forEach(group => {
  group.items.forEach((item, itemIdx) => {
    allVocabList.push({
      id: 'v' + group.lessonId + '-' + (itemIdx + 1),
      lessonId: group.lessonId,
      word: item.word,
      reading: item.reading,
      romaji: item.romaji,
      english: item.english,
      bengali: item.bengali,
      exampleJp: item.exampleJp,
      exampleBn: item.exampleBn,
      type: item.type,
      tag: 'CORE'
    });
    totalIdx++;
  });
});

const content = `import { VocabItem } from '../types';

export const allN5Vocabulary: VocabItem[] = ` + JSON.stringify(allVocabList, null, 2) + `;\n`;

fs.writeFileSync(path.resolve(__dirname, '../src/data/allVocabularyData.ts'), content, 'utf8');
console.log('Successfully generated ' + allVocabList.length + ' complete N5 Vocabulary items across Lessons 1-25!');
