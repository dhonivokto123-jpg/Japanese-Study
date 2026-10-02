const fs = require('fs');
const path = require('path');

const kanji103 = [
  {
    id: 'kanji-1', lessonId: 1, kanji: '日', meaningEn: 'Sun, Day', meaningBn: 'সূর্য, দিন, তারিখ',
    onyomi: 'ニチ, ジツ (nichi, jitsu)', kunyomi: 'ひ, -び, -か (hi, bi, ka)', strokes: 4,
    examples: [
      { word: '日曜日', reading: 'にちようび', meaningBn: 'রবিবার', meaningEn: 'Sunday' },
      { word: '日本', reading: 'にほん', meaningBn: 'জাপান', meaningEn: 'Japan' },
      { word: '今日', reading: 'きょう', meaningBn: 'আজ', meaningEn: 'Today' },
      { word: '毎日', reading: 'まいにち', meaningBn: 'প্রতিদিন', meaningEn: 'Every day' }
    ],
    exampleSentenceJp: 'きょう は にちようび です。', exampleSentenceBn: 'আজ রবিবার।'
  },
  {
    id: 'kanji-2', lessonId: 1, kanji: '一', meaningEn: 'One', meaningBn: 'এক',
    onyomi: 'イチ, イツ (ichi, itsu)', kunyomi: 'ひと, ひと.つ (hito, hito.tsu)', strokes: 1,
    examples: [
      { word: '一つ', reading: 'ひとつ', meaningBn: 'একটি', meaningEn: 'One thing' },
      { word: '一人', reading: 'ひとり', meaningBn: 'একাকী, একজন', meaningEn: 'One person' },
      { word: '一月', reading: 'いちがつ', meaningBn: 'জানুয়ারি', meaningEn: 'January' },
      { word: '一日', reading: 'ついたち', meaningBn: 'মাসের ১ তারিখ', meaningEn: '1st of month' }
    ],
    exampleSentenceJp: 'りんご を ひとつ ください。', exampleSentenceBn: 'একটি আপেল দিন।'
  },
  {
    id: 'kanji-3', lessonId: 1, kanji: '国', meaningEn: 'Country, Nation', meaningBn: 'দেশ, রাষ্ট্র',
    onyomi: 'コク (koku)', kunyomi: 'くに (kuni)', strokes: 8,
    examples: [
      { word: '外国', reading: 'がいこく', meaningBn: 'বিদেশ', meaningEn: 'Foreign country' },
      { word: '国', reading: 'くに', meaningBn: 'দেশ', meaningEn: 'Country' },
      { word: '外国人', reading: 'がいこくじん', meaningBn: 'বিদেশি ব্যক্তি', meaningEn: 'Foreigner' }
    ],
    exampleSentenceJp: 'おくに は どちら ですか。', exampleSentenceBn: 'আপনার দেশ কোথায়?'
  },
  {
    id: 'kanji-4', lessonId: 1, kanji: '会', meaningEn: 'Meet, Society, Association', meaningBn: 'দেখা করা, সভা, সমিতি',
    onyomi: 'カイ, エ (kai, e)', kunyomi: 'あ.う (a.u)', strokes: 6,
    examples: [
      { word: '会います', reading: 'あいます', meaningBn: 'দেখা করা', meaningEn: 'To meet' },
      { word: '会社', reading: 'かいしゃ', meaningBn: 'কোম্পানি', meaningEn: 'Company' },
      { word: '会話', reading: 'かいわ', meaningBn: 'কথোপকথন', meaningEn: 'Conversation' }
    ],
    exampleSentenceJp: 'あした ともだち に あいます。', exampleSentenceBn: 'আগামীকাল বন্ধুর সাথে দেখা করব।'
  },
  {
    id: 'kanji-5', lessonId: 1, kanji: '人', meaningEn: 'Person, Human', meaningBn: 'মানুষ, ব্যক্তি',
    onyomi: 'ジン, ニン (jin, nin)', kunyomi: 'ひと (hito)', strokes: 2,
    examples: [
      { word: '人', reading: 'ひと', meaningBn: 'মানুষ', meaningEn: 'Person' },
      { word: '日本人', reading: 'にほんじん', meaningBn: 'জাপানি ব্যক্তি', meaningEn: 'Japanese person' },
      { word: '三人', reading: 'さんにん', meaningBn: 'তিন জন', meaningEn: 'Three people' },
      { word: '大人', reading: 'おとな', meaningBn: 'প্রাপ্তবয়স্ক', meaningEn: 'Adult' }
    ],
    exampleSentenceJp: 'あの ひと は だれ ですか。', exampleSentenceBn: 'ঐ ব্যক্তি কে?'
  },
  {
    id: 'kanji-6', lessonId: 1, kanji: '年', meaningEn: 'Year', meaningBn: 'বছর, সাল',
    onyomi: 'ネン (nen)', kunyomi: 'とし (toshi)', strokes: 6,
    examples: [
      { word: '今年', reading: 'ことし', meaningBn: 'এই বছর', meaningEn: 'This year' },
      { word: '来年', reading: 'らいねん', meaningBn: 'আগামী বছর', meaningEn: 'Next year' },
      { word: '去年', reading: 'きょねん', meaningBn: 'গত বছর', meaningEn: 'Last year' }
    ],
    exampleSentenceJp: 'らいねん にほん へ いきます。', exampleSentenceBn: 'আগামী বছর জাপান যাব।'
  },
  {
    id: 'kanji-7', lessonId: 2, kanji: '大', meaningEn: 'Big, Large, Great', meaningBn: 'বড়, বিশাল',
    onyomi: 'ダイ, タイ (dai, tai)', kunyomi: 'おお-, おお.きい (oo-, oo.kii)', strokes: 3,
    examples: [
      { word: '大きい', reading: 'おおきい', meaningBn: 'বড়', meaningEn: 'Big' },
      { word: '大学', reading: 'だいがく', meaningBn: 'বিশ্ববিদ্যালয়', meaningEn: 'University' },
      { word: '大人', reading: 'おとな', meaningBn: 'প্রাপ্তবয়স্ক', meaningEn: 'Adult' }
    ],
    exampleSentenceJp: 'この いえ は おおきい です。', exampleSentenceBn: 'এই বাড়িটি বড়।'
  },
  {
    id: 'kanji-8', lessonId: 2, kanji: '十', meaningEn: 'Ten', meaningBn: 'দশ',
    onyomi: 'ジュウ, ジッ (juu, ji)', kunyomi: 'とお, と (too, to)', strokes: 2,
    examples: [
      { word: '十', reading: 'じゅう', meaningBn: 'দশ', meaningEn: 'Ten' },
      { word: '十月', reading: 'じゅうがつ', meaningBn: 'অক্টোবর', meaningEn: 'October' },
      { word: '十日', reading: 'とおか', meaningBn: '১০ তারিখ', meaningEn: '10th day' }
    ],
    exampleSentenceJp: 'じゅうにん の がくせい が います。', exampleSentenceBn: 'দশজন ছাত্র রয়েছে।'
  },
  {
    id: 'kanji-9', lessonId: 2, kanji: '二', meaningEn: 'Two', meaningBn: 'দুই',
    onyomi: 'ニ, ジ (ni, ji)', kunyomi: 'ふた, ふた.つ (futa, futa.tsu)', strokes: 2,
    examples: [
      { word: '二つ', reading: 'ふたつ', meaningBn: 'দুটি', meaningEn: 'Two things' },
      { word: '二人', reading: 'ふたり', meaningBn: 'দুইজন', meaningEn: 'Two people' },
      { word: '二月', reading: 'にがつ', meaningBn: 'ফেব্রুয়ারি', meaningEn: 'February' }
    ],
    exampleSentenceJp: 'ふたり で えいが を みました。', exampleSentenceBn: 'দুইজনে মিলে সিনেমা দেখেছি।'
  },
  {
    id: 'kanji-10', lessonId: 2, kanji: '本', meaningEn: 'Book, Origin, Root', meaningBn: 'বই, মূল, উৎস',
    onyomi: 'ホン (hon)', kunyomi: 'もと (moto)', strokes: 5,
    examples: [
      { word: '本', reading: 'ほん', meaningBn: 'বই', meaningEn: 'Book' },
      { word: '日本', reading: 'にほん', meaningBn: 'জাপান', meaningEn: 'Japan' },
      { word: '本屋', reading: 'ほんや', meaningBn: 'বইয়ের দোকান', meaningEn: 'Bookstore' }
    ],
    exampleSentenceJp: 'にほんご の ほん を よみます。', exampleSentenceBn: 'জাপানি ভাষার বই পড়ি।'
  },
  {
    id: 'kanji-11', lessonId: 2, kanji: '中', meaningEn: 'Middle, Inside, Center', meaningBn: 'ভেতরে, মাঝখানে',
    onyomi: 'チュウ (chuu)', kunyomi: 'なか (naka)', strokes: 4,
    examples: [
      { word: '中', reading: 'なか', meaningBn: 'ভেতরে', meaningEn: 'Inside' },
      { word: '中国', reading: 'ちゅうごく', meaningBn: 'চীন', meaningEn: 'China' },
      { word: '一日中', reading: 'いちにちじゅう', meaningBn: 'সারাদিন ধরে', meaningEn: 'All day long' }
    ],
    exampleSentenceJp: 'へや の なか に だれ も いません。', exampleSentenceBn: 'ঘরের ভেতরে কেউ নেই।'
  },
  {
    id: 'kanji-12', lessonId: 3, kanji: '長', meaningEn: 'Long, Leader', meaningBn: 'লম্বা, দীর্ঘ, প্রধান',
    onyomi: 'チョウ (chou)', kunyomi: 'なが.い (naga.i)', strokes: 8,
    examples: [
      { word: '長い', reading: 'ながい', meaningBn: 'লম্বা', meaningEn: 'Long' },
      { word: '社長', reading: 'しゃちょう', meaningBn: 'কোম্পানির প্রেসিডেন্ট / প্রধান', meaningEn: 'Company president' },
      { word: '校長', reading: 'こうちょう', meaningBn: 'অধ্যক্ষ / হেডমাস্টার', meaningEn: 'School principal' }
    ],
    exampleSentenceJp: 'この みち は ながい です。', exampleSentenceBn: 'এই পথটি লম্বা।'
  },
  {
    id: 'kanji-13', lessonId: 3, kanji: '出', meaningEn: 'Exit, Leave, Go out', meaningBn: 'বের হওয়া, প্রস্থান',
    onyomi: 'シュツ, スイ (shutsu, sui)', kunyomi: 'で.る, だ.す (de.ru, da.su)', strokes: 5,
    examples: [
      { word: '出ます', reading: 'でます', meaningBn: 'বের হওয়া', meaningEn: 'To go out / exit' },
      { word: '出口', reading: 'でぐち', meaningBn: 'বহির্গমন পথ', meaningEn: 'Exit' },
      { word: '出します', reading: 'だします', meaningBn: 'জমা দেওয়া / বের করা', meaningEn: 'To submit / take out' }
    ],
    exampleSentenceJp: 'まいあさ ７じ に いえ を でます。', exampleSentenceBn: 'প্রতিদিন সকাল ৭টায় বাড়ি থেকে বের হই।'
  },
  {
    id: 'kanji-14', lessonId: 3, kanji: '三', meaningEn: 'Three', meaningBn: 'তিন',
    onyomi: 'サン (san)', kunyomi: 'み, み.つ (mi, mi.tsu)', strokes: 3,
    examples: [
      { word: '三', reading: 'さん', meaningBn: 'তিন', meaningEn: 'Three' },
      { word: '三つ', reading: 'みっつ', meaningBn: 'তিনটি', meaningEn: 'Three things' },
      { word: '三月', reading: 'さんがつ', meaningBn: 'মার্চ মাস', meaningEn: 'March' }
    ],
    exampleSentenceJp: 'みかん を みっつ かいました。', exampleSentenceBn: 'তিনটি কমলা কিনেছি।'
  },
  {
    id: 'kanji-15', lessonId: 3, kanji: '同', meaningEn: 'Same, Agree', meaningBn: 'একই, সমান',
    onyomi: 'ドウ (dou)', kunyomi: 'おな.じ (ona.ji)', strokes: 6,
    examples: [
      { word: '同じ', reading: 'おなじ', meaningBn: 'একই', meaningEn: 'Same' },
      { word: '同時に', reading: 'どうじに', meaningBn: 'একই সময়ে', meaningEn: 'Simultaneously' }
    ],
    exampleSentenceJp: 'わたし と かれ は おなじ とし です。', exampleSentenceBn: 'আমি এবং সে একই বয়সের।'
  },
  {
    id: 'kanji-16', lessonId: 4, kanji: '時', meaningEn: 'Time, Hour', meaningBn: 'সময়, ঘণ্টা',
    onyomi: 'ジ (ji)', kunyomi: 'とき (toki)', strokes: 10,
    examples: [
      { word: '時間', reading: 'じかん', meaningBn: 'সময়', meaningEn: 'Time' },
      { word: '時', reading: 'とき', meaningBn: 'যখন / সময়', meaningEn: 'When / at that time' },
      { word: '時計', reading: 'とけい', meaningBn: 'ঘড়ি', meaningEn: 'Clock / Watch' }
    ],
    exampleSentenceJp: 'いま なんじ ですか。', exampleSentenceBn: 'এখন কয়টা বাজে?'
  },
  {
    id: 'kanji-17', lessonId: 4, kanji: '行', meaningEn: 'Go, Act, Conduct', meaningBn: 'যাওয়া, গমন',
    onyomi: 'コウ, ギョウ (kou, gyou)', kunyomi: 'い.く, ゆ.く, おこな.う (i.ku, okona.u)', strokes: 6,
    examples: [
      { word: '行きます', reading: 'いきます', meaningBn: 'যাওয়া', meaningEn: 'To go' },
      { word: '旅行', reading: 'りょこう', meaningBn: 'ভ্রমণ', meaningEn: 'Travel' },
      { word: '銀行', reading: 'ぎんこう', meaningBn: 'ব্যাংক', meaningEn: 'Bank' }
    ],
    exampleSentenceJp: 'とうきょう へ いきます。', exampleSentenceBn: 'টোকিওতে যাব।'
  },
  {
    id: 'kanji-18', lessonId: 4, kanji: '見', meaningEn: 'See, Look, View', meaningBn: 'দেখা, দর্শন',
    onyomi: 'ケン (ken)', kunyomi: 'み.る, み.える, み.せる (mi.ru, mi.seru)', strokes: 7,
    examples: [
      { word: '見ます', reading: 'みます', meaningBn: 'দেখা', meaningEn: 'To see / watch' },
      { word: '見せます', reading: 'みせます', meaningBn: 'দেখানো', meaningEn: 'To show' },
      { word: '意見', reading: 'いけん', meaningBn: 'মতামত', meaningEn: 'Opinion' }
    ],
    exampleSentenceJp: 'えいが を みました。', exampleSentenceBn: 'সিনেমা দেখেছি।'
  },
  {
    id: 'kanji-19', lessonId: 4, kanji: '月', meaningEn: 'Moon, Month', meaningBn: 'চাঁদ, মাস',
    onyomi: 'ゲツ, ガツ (getsu, gatsu)', kunyomi: 'つき (tsuki)', strokes: 4,
    examples: [
      { word: '月曜日', reading: 'げつようび', meaningBn: 'সোমবার', meaningEn: 'Monday' },
      { word: '今月', reading: 'こんげつ', meaningBn: 'চলতি মাস', meaningEn: 'This month' },
      { word: '月', reading: 'つき', meaningBn: 'চাঁদ', meaningEn: 'Moon' }
    ],
    exampleSentenceJp: 'こんげつ は いそがしい です。', exampleSentenceBn: 'এই মাসে আমি ব্যস্ত।'
  },
  {
    id: 'kanji-20', lessonId: 4, kanji: '分', meaningEn: 'Minute, Part, Understand', meaningBn: 'মিনিট, অংশ, বোঝা',
    onyomi: 'ブン, フン, ブ (bun, fun, bu)', kunyomi: 'わ.かる, わ.ける (wa.karu, wa.keru)', strokes: 4,
    examples: [
      { word: '分かります', reading: 'わかります', meaningBn: 'বোঝা', meaningEn: 'To understand' },
      { word: '五分', reading: 'ごふん', meaningBn: 'পাঁচ মিনিট', meaningEn: 'Five minutes' },
      { word: '半分', reading: 'はんぶん', meaningBn: 'অর্ধেক', meaningEn: 'Half' }
    ],
    exampleSentenceJp: 'にほんご が わかります。', exampleSentenceBn: 'জাপানি ভাষা বুঝি।'
  },
  {
    id: 'kanji-21', lessonId: 5, kanji: '後', meaningEn: 'After, Behind, Later', meaningBn: 'পরে, পেছনে, পরবর্তীতে',
    onyomi: 'ゴ, コウ (go, kou)', kunyomi: 'のち, うし.ろ, あと (nochi, ushiro, ato)', strokes: 9,
    examples: [
      { word: '後ろ', reading: 'うしろ', meaningBn: 'পেছনে', meaningEn: 'Behind' },
      { word: '午後', reading: 'ごご', meaningBn: 'অপরাহ্ন (PM)', meaningEn: 'Afternoon / PM' },
      { word: '後で', reading: 'あとで', meaningBn: 'পরে', meaningEn: 'Later' }
    ],
    exampleSentenceJp: 'ごはん の あとで おちゃ を のみます。', exampleSentenceBn: 'খাবারের পরে চা পান করব।'
  },
  {
    id: 'kanji-22', lessonId: 5, kanji: '前', meaningEn: 'Before, Front, In advance', meaningBn: 'আগে, সামনে',
    onyomi: 'ゼン (zen)', kunyomi: 'まえ (mae)', strokes: 9,
    examples: [
      { word: '前', reading: 'まえ', meaningBn: 'সামনে / পূর্বে', meaningEn: 'Front / before' },
      { word: '午前', reading: 'ごぜん', meaningBn: 'পূর্বাহ্ন (AM)', meaningEn: 'Morning / AM' },
      { word: '名前', reading: 'なまえ', meaningBn: 'নাম', meaningEn: 'Name' }
    ],
    exampleSentenceJp: 'えき の まえ で まちます。', exampleSentenceBn: 'স্টেশনের সামনে অপেক্ষা করব।'
  },
  {
    id: 'kanji-23', lessonId: 5, kanji: '生', meaningEn: 'Life, Birth, Student', meaningBn: 'জীবন, জন্ম, শিক্ষার্থী',
    onyomi: 'セイ, ショウ (sei, shou)', kunyomi: 'い.きる, う.まれる, なま (i.kiru, u.mareru, nama)', strokes: 5,
    examples: [
      { word: '学生', reading: 'がくせい', meaningBn: 'ছাত্র / শিক্ষার্থী', meaningEn: 'Student' },
      { word: '先生', reading: 'せんせい', meaningBn: 'শিক্ষক', meaningEn: 'Teacher' },
      { word: '生まれます', reading: 'うまれます', meaningBn: 'জন্মগ্রহণ করা', meaningEn: 'To be born' }
    ],
    exampleSentenceJp: 'わたし は がくせい です。', exampleSentenceBn: 'আমি একজন ছাত্র।'
  },
  {
    id: 'kanji-24', lessonId: 5, kanji: '五', meaningEn: 'Five', meaningBn: 'পাঁচ',
    onyomi: 'ゴ (go)', kunyomi: 'いつ, いつ.つ (itsu, itsu.tsu)', strokes: 4,
    examples: [
      { word: '五', reading: 'ご', meaningBn: 'পাঁচ', meaningEn: 'Five' },
      { word: '五つ', reading: 'いつつ', meaningBn: 'পাঁচটি', meaningEn: 'Five things' },
      { word: '五月', reading: 'ごがつ', meaningBn: 'মে মাস', meaningEn: 'May' }
    ],
    exampleSentenceJp: '５じ に おきます。', exampleSentenceBn: '৫টায় ঘুম থেকে উঠি।'
  },
  {
    id: 'kanji-25', lessonId: 6, kanji: '間', meaningEn: 'Interval, Between, Space', meaningBn: 'ব্যবধান, মধ্যবর্তী স্থান/সময়',
    onyomi: 'カン, ケン (kan, ken)', kunyomi: 'あいだ, ま (aida, ma)', strokes: 12,
    examples: [
      { word: '間', reading: 'あいだ', meaningBn: 'মাঝখানে', meaningEn: 'Between / interval' },
      { word: '時間', reading: 'じかん', meaningBn: 'সময়', meaningEn: 'Time / hours' },
      { word: '一週間', reading: 'いっしゅうかん', meaningBn: 'এক সপ্তাহ', meaningEn: 'One week' }
    ],
    exampleSentenceJp: 'つくえ と ベッド の あいだ に あります。', exampleSentenceBn: 'টেবিল ও বিছানার মাঝখানে আছে।'
  },
  {
    id: 'kanji-26', lessonId: 6, kanji: '上', meaningEn: 'Above, Up, Top', meaningBn: 'উপরে',
    onyomi: 'ジョウ, ショウ (jou, shou)', kunyomi: 'うえ, あ.がる, のぼ.る (ue, a.garu)', strokes: 3,
    examples: [
      { word: '上', reading: 'うえ', meaningBn: 'উপরে', meaningEn: 'Above / on' },
      { word: '上手', reading: 'じょうず', meaningBn: 'দক্ষ, পারদর্শী', meaningEn: 'Skillful' },
      { word: '上がります', reading: 'あがります', meaningBn: 'উপরে ওঠা', meaningEn: 'To go up' }
    ],
    exampleSentenceJp: 'つくえ の うえ に ほん が あります。', exampleSentenceBn: 'টেবিলের উপরে বই আছে।'
  },
  {
    id: 'kanji-27', lessonId: 6, kanji: '東', meaningEn: 'East', meaningBn: 'পূর্ব দিক',
    onyomi: 'トウ (tou)', kunyomi: 'ひがし (higashi)', strokes: 8,
    examples: [
      { word: '東', reading: 'ひがし', meaningBn: 'পূর্ব দিক', meaningEn: 'East' },
      { word: '東京', reading: 'とうきょう', meaningBn: 'টোকিও', meaningEn: 'Tokyo' },
      { word: '東口', reading: 'ひがしぐち', meaningBn: 'পূর্ব ফটক', meaningEn: 'East exit' }
    ],
    exampleSentenceJp: 'とうきょう に すんでいます。', exampleSentenceBn: 'টোকিওতে বাস করি।'
  },
  {
    id: 'kanji-28', lessonId: 6, kanji: '四', meaningEn: 'Four', meaningBn: 'চার',
    onyomi: 'シ (shi)', kunyomi: 'よ, よ.つ, よん (yo, yo.tsu, yon)', strokes: 5,
    examples: [
      { word: '四', reading: 'よん / し', meaningBn: 'চার', meaningEn: 'Four' },
      { word: '四つ', reading: 'よっつ', meaningBn: 'চারটি', meaningEn: 'Four things' },
      { word: '四月', reading: 'しがつ', meaningBn: 'এপ্রিল মাস', meaningEn: 'April' }
    ],
    exampleSentenceJp: 'りんご が よっつ あります。', exampleSentenceBn: 'চারটি আপেল আছে।'
  },
  {
    id: 'kanji-29', lessonId: 7, kanji: '今', meaningEn: 'Now', meaningBn: 'এখন, বর্তমান',
    onyomi: 'コン, キン (kon, kin)', kunyomi: 'いま (ima)', strokes: 4,
    examples: [
      { word: '今', reading: 'いま', meaningBn: 'এখন', meaningEn: 'Now' },
      { word: '今日', reading: 'きょう', meaningBn: 'আজ', meaningEn: 'Today' },
      { word: '今週', reading: 'こんしゅう', meaningBn: 'চলতি সপ্তাহ', meaningEn: 'This week' }
    ],
    exampleSentenceJp: 'いま なんじ ですか。', exampleSentenceBn: 'এখন কয়টা বাজে?'
  },
  {
    id: 'kanji-30', lessonId: 7, kanji: '金', meaningEn: 'Gold, Money', meaningBn: 'টাকা, অর্থ, স্বর্ণ',
    onyomi: 'キン, コン (kin, kon)', kunyomi: 'かね, かな- (kane)', strokes: 8,
    examples: [
      { word: 'お金', reading: 'おかね', meaningBn: 'টাকা / অর্থ', meaningEn: 'Money' },
      { word: '金曜日', reading: 'きんようび', meaningBn: 'শুক্রবার', meaningEn: 'Friday' },
      { word: '料金', reading: 'りょうきん', meaningBn: 'ফি / ভাড়া', meaningEn: 'Fee / fare' }
    ],
    exampleSentenceJp: 'おかね が ありません。', exampleSentenceBn: 'টাকা নেই।'
  },
  {
    id: 'kanji-31', lessonId: 7, kanji: '九', meaningEn: 'Nine', meaningBn: 'নয়',
    onyomi: 'キュウ, ク (kyuu, ku)', kunyomi: 'ここの, ここの.つ (kokono, kokono.tsu)', strokes: 2,
    examples: [
      { word: '九', reading: 'きゅう / く', meaningBn: 'নয়', meaningEn: 'Nine' },
      { word: '九つ', reading: 'ここのつ', meaningBn: 'নয়টি', meaningEn: 'Nine things' },
      { word: '九月', reading: 'くがつ', meaningBn: 'সেপ্টেম্বর', meaningEn: 'September' }
    ],
    exampleSentenceJp: 'くじ に ねます。', exampleSentenceBn: '৯টায় ঘুমাই।'
  },
  {
    id: 'kanji-32', lessonId: 7, kanji: '入', meaningEn: 'Enter, Insert', meaningBn: 'প্রবেশ করা, ঢোকা',
    onyomi: 'ニュウ (nyuu)', kunyomi: 'はい.る, い.れる (hai.ru, i.reru)', strokes: 2,
    examples: [
      { word: '入ります', reading: 'はいります', meaningBn: 'প্রবেশ করা', meaningEn: 'To enter' },
      { word: '入口', reading: 'いりぐち', meaningBn: 'প্রবেশদ্বার', meaningEn: 'Entrance' },
      { word: '入れます', reading: 'いれます', meaningBn: 'ঢোকানো', meaningEn: 'To put in' }
    ],
    exampleSentenceJp: 'へや に はいります。', exampleSentenceBn: 'ঘরে প্রবেশ করছি।'
  },
  {
    id: 'kanji-33', lessonId: 8, kanji: '学', meaningEn: 'Study, Learn, Science', meaningBn: 'পড়াশোনা, শিক্ষা',
    onyomi: 'ガク (gaku)', kunyomi: 'まな.ぶ (mana.bu)', strokes: 8,
    examples: [
      { word: '学校', reading: 'がっこう', meaningBn: 'স্কুল', meaningEn: 'School' },
      { word: '学生', reading: 'がくせい', meaningBn: 'ছাত্র', meaningEn: 'Student' },
      { word: '大学', reading: 'だいがく', meaningBn: 'বিশ্ববিদ্যালয়', meaningEn: 'University' }
    ],
    exampleSentenceJp: 'がっこう へ いきます。', exampleSentenceBn: 'স্কুলে যাচ্ছি।'
  },
  {
    id: 'kanji-34', lessonId: 8, kanji: '高', meaningEn: 'High, Expensive, Tall', meaningBn: 'উঁচু, দামি',
    onyomi: 'コウ (kou)', kunyomi: 'たか.い, たか (taka.i)', strokes: 10,
    examples: [
      { word: '高い', reading: 'たかい', meaningBn: 'দামি / উঁচু', meaningEn: 'High / expensive' },
      { word: '高校', reading: 'こうこう', meaningBn: 'উচ্চ বিদ্যালয়', meaningEn: 'High school' },
      { word: '最高', reading: 'さいこう', meaningBn: 'সেরা / সর্বোচ্চ', meaningEn: 'Best / highest' }
    ],
    exampleSentenceJp: 'この とけい は たかい です。', exampleSentenceBn: 'এই ঘড়িটি দামি।'
  },
  {
    id: 'kanji-35', lessonId: 8, kanji: '円', meaningEn: 'Yen, Circle, Round', meaningBn: 'জাপানি মুদ্রা (ইয়েন), বৃত্ত',
    onyomi: 'エン (en)', kunyomi: 'まる.い (maru.i)', strokes: 4,
    examples: [
      { word: '百円', reading: 'ひゃくえん', meaningBn: '১০০ ইয়েন', meaningEn: '100 yen' },
      { word: '円', reading: 'えん', meaningBn: 'ইয়েন', meaningEn: 'Yen' },
      { word: '円い', reading: 'まるい', meaningBn: 'গোলাকার', meaningEn: 'Round' }
    ],
    exampleSentenceJp: 'これ は ひゃくえん です。', exampleSentenceBn: 'এটি ১০০ ইয়েন।'
  },
  {
    id: 'kanji-36', lessonId: 8, kanji: '子', meaningEn: 'Child', meaningBn: 'সন্তান, শিশু',
    onyomi: 'シ, ス (shi, su)', kunyomi: 'こ (ko)', strokes: 3,
    examples: [
      { word: '子ども', reading: 'こども', meaningBn: 'শিশু / সন্তান', meaningEn: 'Child' },
      { word: '女の子', reading: 'おんなのこ', meaningBn: 'মেয়ে শিশু', meaningEn: 'Girl' },
      { word: '男の子', reading: 'おとこのこ', meaningBn: 'ছেলে শিশু', meaningEn: 'Boy' }
    ],
    exampleSentenceJp: 'こうえん に こども が います。', exampleSentenceBn: 'পার্কে শিশুরা আছে।'
  },
  {
    id: 'kanji-37', lessonId: 9, kanji: '外', meaningEn: 'Outside, Foreign', meaningBn: 'বাইরে, বহিঃস্থ',
    onyomi: 'ガイ, ゲ (gai, ge)', kunyomi: 'そと, ほか (soto, hoka)', strokes: 5,
    examples: [
      { word: '外', reading: 'そと', meaningBn: 'বাইরে', meaningEn: 'Outside' },
      { word: '外国', reading: 'がいこく', meaningBn: 'বিদেশ', meaningEn: 'Foreign country' },
      { word: '外国人', reading: 'がいこくじん', meaningBn: 'বিদেশি নাগরিক', meaningEn: 'Foreigner' }
    ],
    exampleSentenceJp: 'そと は さむい です。', exampleSentenceBn: 'বাইরে ঠান্ডা।'
  },
  {
    id: 'kanji-38', lessonId: 9, kanji: '八', meaningEn: 'Eight', meaningBn: 'আট',
    onyomi: 'ハチ (hachi)', kunyomi: 'や, や.つ, よう (ya, ya.tsu, you)', strokes: 2,
    examples: [
      { word: '八', reading: 'はち', meaningBn: 'আট', meaningEn: 'Eight' },
      { word: '八つ', reading: 'やっつ', meaningBn: 'আটটি', meaningEn: 'Eight things' },
      { word: '八月', reading: 'はちがつ', meaningBn: 'আগস্ট মাস', meaningEn: 'August' }
    ],
    exampleSentenceJp: 'はちじ に はじまります。', exampleSentenceBn: '৮টায় শুরু হবে।'
  },
  {
    id: 'kanji-39', lessonId: 9, kanji: '六', meaningEn: 'Six', meaningBn: 'ছয়',
    onyomi: 'ロク (roku)', kunyomi: 'む, む.つ (mu, mu.tsu)', strokes: 4,
    examples: [
      { word: '六', reading: 'ろく', meaningBn: 'ছয়', meaningEn: 'Six' },
      { word: '六つ', reading: 'むっつ', meaningBn: 'ছয়টি', meaningEn: 'Six things' },
      { word: '六月', reading: 'ろくがつ', meaningBn: 'জুন মাস', meaningEn: 'June' }
    ],
    exampleSentenceJp: 'ろくじ に かえります。', exampleSentenceBn: '৬টায় বাড়ি ফিরব।'
  },
  {
    id: 'kanji-40', lessonId: 9, kanji: '下', meaningEn: 'Below, Down, Under', meaningBn: 'নিচে, নিম্ন',
    onyomi: 'カ, ゲ (ka, ge)', kunyomi: 'した, さ.がる, くだ.る (shita, sa.garu)', strokes: 3,
    examples: [
      { word: '下', reading: 'した', meaningBn: 'নিচে', meaningEn: 'Under / below' },
      { word: '地下鉄', reading: 'ちかてつ', meaningBn: 'পাতালরেল (মেট্রো)', meaningEn: 'Subway' },
      { word: '下手', reading: 'へた', meaningBn: 'অদক্ষ, অপটু', meaningEn: 'Unskillful' }
    ],
    exampleSentenceJp: 'つくえ の した に ねこ が います。', exampleSentenceBn: 'টেবিলের নিচে বিড়াল আছে।'
  },
  {
    id: 'kanji-41', lessonId: 10, kanji: '来', meaningEn: 'Come, Next', meaningBn: 'আসা, আগামী',
    onyomi: 'ライ (rai)', kunyomi: 'く.る, きた.る (ku.ru, kita.ru)', strokes: 7,
    examples: [
      { word: '来ます', reading: 'きます', meaningBn: 'আসা', meaningEn: 'To come' },
      { word: '来年', reading: 'らいねん', meaningBn: 'আগামী বছর', meaningEn: 'Next year' },
      { word: '来週', reading: 'らいしゅう', meaningBn: 'আগামী সপ্তাহ', meaningEn: 'Next week' }
    ],
    exampleSentenceJp: 'あした ともだち が きます。', exampleSentenceBn: 'আগামীকাল বন্ধু আসবে।'
  },
  {
    id: 'kanji-42', lessonId: 10, kanji: '気', meaningEn: 'Spirit, Mind, Air', meaningBn: 'মন, মেজাজ, বাতাস',
    onyomi: 'キ, ケ (ki, ke)', kunyomi: 'いき (iki)', strokes: 6,
    examples: [
      { word: '元気', reading: 'げんき', meaningBn: 'সুস্থ / ভালো থাকা', meaningEn: 'Healthy / energetic' },
      { word: '天気', reading: 'てんき', meaningBn: 'আবহাওয়া', meaningEn: 'Weather' },
      { word: '電気', reading: 'でんき', meaningBn: 'বিদ্যুৎ / বাতি', meaningEn: 'Electricity / light' }
    ],
    exampleSentenceJp: 'おげんき ですか。', exampleSentenceBn: 'আপনি কেমন আছেন?'
  },
  {
    id: 'kanji-43', lessonId: 10, kanji: '小', meaningEn: 'Small, Little', meaningBn: 'ছোট',
    onyomi: 'ショウ (shou)', kunyomi: 'ちい.さい, こ- (chii.sai)', strokes: 3,
    examples: [
      { word: '小さい', reading: 'ちいさい', meaningBn: 'ছোট', meaningEn: 'Small' },
      { word: '小学校', reading: 'しょうがっこう', meaningBn: 'প্রাথমিক বিদ্যালয়', meaningEn: 'Elementary school' },
      { word: '小川', reading: 'おがわ', meaningBn: 'ছোট নদী / খাল', meaningEn: 'Brook / stream' }
    ],
    exampleSentenceJp: 'この くつ は ちいさい です。', exampleSentenceBn: 'এই জুতোটি ছোট।'
  },
  {
    id: 'kanji-44', lessonId: 10, kanji: '七', meaningEn: 'Seven', meaningBn: 'সাত',
    onyomi: 'シチ (shichi)', kunyomi: 'なな, なな.つ (nana, nana.tsu)', strokes: 2,
    examples: [
      { word: '七', reading: 'なな / しち', meaningBn: 'সাত', meaningEn: 'Seven' },
      { word: '七つ', reading: 'ななつ', meaningBn: 'সাতটি', meaningEn: 'Seven things' },
      { word: '七月', reading: 'しちがつ', meaningBn: 'জুলাই মাস', meaningEn: 'July' }
    ],
    exampleSentenceJp: 'しちじ に あさごはん を たべます。', exampleSentenceBn: '৭টায় সকালের নাস্তা খাই।'
  },
  {
    id: 'kanji-45', lessonId: 11, kanji: '山', meaningEn: 'Mountain', meaningBn: 'পাহাড়, পর্বত',
    onyomi: 'サン, セン (san, sen)', kunyomi: 'やま (yama)', strokes: 3,
    examples: [
      { word: '山', reading: 'やま', meaningBn: 'পাহাড়', meaningEn: 'Mountain' },
      { word: '富士山', reading: 'ふじさん', meaningBn: 'ফুজি পর্বত', meaningEn: 'Mt. Fuji' },
      { word: '登山', reading: 'とざん', meaningBn: 'পর্বতারোহণ', meaningEn: 'Mountain climbing' }
    ],
    exampleSentenceJp: 'ふじさん に のぼりたい です。', exampleSentenceBn: 'ফুজি পাহাড়ে উঠতে চাই।'
  },
  {
    id: 'kanji-46', lessonId: 11, kanji: '話', meaningEn: 'Speak, Talk, Story', meaningBn: 'কথা বলা, গল্প',
    onyomi: 'ワ (wa)', kunyomi: 'はな.す, はなし (hana.su, hanashi)', strokes: 13,
    examples: [
      { word: '話します', reading: 'はなします', meaningBn: 'কথা বলা', meaningEn: 'To talk / speak' },
      { word: '電話', reading: 'でんわ', meaningBn: 'টেলিফোন', meaningEn: 'Telephone' },
      { word: '会話', reading: 'かいわ', meaningBn: 'কথোপকথন', meaningEn: 'Conversation' }
    ],
    exampleSentenceJp: 'せんせい と はなしました。', exampleSentenceBn: 'শিক্ষকের সাথে কথা বলেছি।'
  },
  {
    id: 'kanji-47', lessonId: 11, kanji: '女', meaningEn: 'Woman, Female', meaningBn: 'নারী, মহিলা',
    onyomi: 'ジョ, ニョ (jo, nyo)', kunyomi: 'おんな, め (onna)', strokes: 3,
    examples: [
      { word: '女の人', reading: 'おんなのひと', meaningBn: 'মহিলা', meaningEn: 'Woman' },
      { word: '女の子', reading: 'おんなのこ', meaningBn: 'মেয়ে শিশু', meaningEn: 'Girl' },
      { word: '女性', reading: 'じょせい', meaningBn: 'নারী জাতি / মহিলা', meaningEn: 'Female / woman' }
    ],
    exampleSentenceJp: 'あの おんなのひと は だれ ですか。', exampleSentenceBn: 'ঐ মহিলা কে?'
  },
  {
    id: 'kanji-48', lessonId: 11, kanji: '北', meaningEn: 'North', meaningBn: 'উত্তর দিক',
    onyomi: 'ホク (hoku)', kunyomi: 'きた (kita)', strokes: 5,
    examples: [
      { word: '北', reading: 'きた', meaningBn: 'উত্তর দিক', meaningEn: 'North' },
      { word: '北海道', reading: 'ほっかいどう', meaningBn: 'হোক্কাইদো (জাপানের উত্তরাঞ্চল)', meaningEn: 'Hokkaido' },
      { word: '北口', reading: 'きたぐち', meaningBn: 'উত্তর বহির্গমন ফটক', meaningEn: 'North exit' }
    ],
    exampleSentenceJp: 'ほっかいどう は きた に あります。', exampleSentenceBn: 'হোক্কাইদো উত্তরে অবস্থিত।'
  },
  {
    id: 'kanji-49', lessonId: 12, kanji: '午', meaningEn: 'Noon, Sign of the horse', meaningBn: 'দুপুর',
    onyomi: 'ゴ (go)', kunyomi: 'うま (uma)', strokes: 4,
    examples: [
      { word: '午前', reading: 'ごぜん', meaningBn: 'সকাল / পূর্বাহ্ন (AM)', meaningEn: 'Morning / AM' },
      { word: '午後', reading: 'ごご', meaningBn: 'বিকেল / অপরাহ্ন (PM)', meaningEn: 'Afternoon / PM' },
      { word: '正午', reading: 'しょうご', meaningBn: 'ঠিক দুপুর ১২টা', meaningEn: 'Exact noon' }
    ],
    exampleSentenceJp: 'ごご ３じ に あいましょう。', exampleSentenceBn: 'বিকাল ৩টায় দেখা করা যাক।'
  },
  {
    id: 'kanji-50', lessonId: 12, kanji: '百', meaningEn: 'Hundred', meaningBn: 'শত, একশ',
    onyomi: 'ヒャク (hyaku)', kunyomi: 'もも (momo)', strokes: 6,
    examples: [
      { word: '百', reading: 'ひゃく', meaningBn: 'একশ', meaningEn: 'Hundred' },
      { word: '三百', reading: 'さんびゃく', meaningBn: 'তিনশ', meaningEn: 'Three hundred' },
      { word: '六百', reading: 'ろっぴゃく', meaningBn: 'ছয়শ', meaningEn: 'Six hundred' }
    ],
    exampleSentenceJp: 'りんご は ひゃくえん です。', exampleSentenceBn: 'আপেলের দাম ১০০ ইয়েন।'
  },
  {
    id: 'kanji-51', lessonId: 12, kanji: '書', meaningEn: 'Write, Document, Book', meaningBn: 'লেখা, দলিল',
    onyomi: 'ショ (sho)', kunyomi: 'か.く (ka.ku)', strokes: 10,
    examples: [
      { word: '書きます', reading: 'かきます', meaningBn: 'লেখা', meaningEn: 'To write' },
      { word: '辞書', reading: 'じしょ', meaningBn: 'অভিধান', meaningEn: 'Dictionary' },
      { word: '読書', reading: 'どくしょ', meaningBn: 'বই পড়া', meaningEn: 'Reading books' }
    ],
    exampleSentenceJp: 'てがみ を かきました。', exampleSentenceBn: 'চিঠি লিখেছি।'
  },
  {
    id: 'kanji-52', lessonId: 12, kanji: '先', meaningEn: 'Previous, Ahead, Priority', meaningBn: 'আগে, পূর্ববর্তী',
    onyomi: 'セン (sen)', kunyomi: 'さき, ま.ず (saki)', strokes: 6,
    examples: [
      { word: '先生', reading: 'せんせい', meaningBn: 'শিক্ষক', meaningEn: 'Teacher' },
      { word: '先週', reading: 'せんしゅう', meaningBn: 'গত সপ্তাহ', meaningEn: 'Last week' },
      { word: 'お先に', reading: 'おさきに', meaningBn: 'আপনার আগে যাচ্ছি', meaningEn: 'Before you / excused' }
    ],
    exampleSentenceJp: 'せんせい、おはようございます。', exampleSentenceBn: 'শুভ সকাল, শিক্ষক।'
  },
  {
    id: 'kanji-53', lessonId: 13, kanji: '名', meaningEn: 'Name, Reputation', meaningBn: 'নাম, সুখ্যাতি',
    onyomi: 'メイ, ミョウ (mei, myou)', kunyomi: 'な (na)', strokes: 6,
    examples: [
      { word: '名前', reading: 'なまえ', meaningBn: 'নাম', meaningEn: 'Name' },
      { word: '有名', reading: 'ゆうめい', meaningBn: 'বিখ্যাত', meaningEn: 'Famous' },
      { word: '名字', reading: 'みょうじ', meaningBn: 'বংশনাম / পদবী', meaningEn: 'Surname' }
    ],
    exampleSentenceJp: 'おなまえ は なん ですか。', exampleSentenceBn: 'আপনার নাম কী?'
  },
  {
    id: 'kanji-54', lessonId: 13, kanji: '川', meaningEn: 'River, Stream', meaningBn: 'নদী',
    onyomi: 'セン (sen)', kunyomi: 'かわ (kawa)', strokes: 3,
    examples: [
      { word: '川', reading: 'かわ', meaningBn: 'নদী', meaningEn: 'River' },
      { word: '小川', reading: 'おがわ', meaningBn: 'ছোট নদী', meaningEn: 'Stream' },
      { word: '河川', reading: 'かせん', meaningBn: 'নদ-নদী', meaningEn: 'Rivers' }
    ],
    exampleSentenceJp: 'かわ で およぎました。', exampleSentenceBn: 'নদীতে সাঁতার কেটেছি।'
  },
  {
    id: 'kanji-55', lessonId: 13, kanji: '千', meaningEn: 'Thousand', meaningBn: 'হাজার',
    onyomi: 'セン (sen)', kunyomi: 'ち (chi)', strokes: 3,
    examples: [
      { word: '千', reading: 'せん', meaningBn: 'এক হাজার', meaningEn: 'Thousand' },
      { word: '三千', reading: 'さんぜん', meaningBn: 'তিন হাজার', meaningEn: 'Three thousand' },
      { word: '千円', reading: 'せんえん', meaningBn: 'এক হাজার ইয়েন', meaningEn: '1,000 yen' }
    ],
    exampleSentenceJp: 'これ は せんえん です。', exampleSentenceBn: 'এটি ১০০০ ইয়েন।'
  },
  {
    id: 'kanji-56', lessonId: 13, kanji: '水', meaningEn: 'Water', meaningBn: 'পানি, জল',
    onyomi: 'スイ (sui)', kunyomi: 'みず (mizu)', strokes: 4,
    examples: [
      { word: '水', reading: 'みず', meaningBn: 'পানি', meaningEn: 'Water' },
      { word: '水曜日', reading: 'すいようび', meaningBn: 'বুধবার', meaningEn: 'Wednesday' },
      { word: '水泳', reading: 'すいえい', meaningBn: 'সাঁতার', meaningEn: 'Swimming' }
    ],
    exampleSentenceJp: 'おみず を ください。', exampleSentenceBn: 'দয়া করে পানি দিন।'
  },
  {
    id: 'kanji-57', lessonId: 14, kanji: '半', meaningEn: 'Half, Middle', meaningBn: 'অর্ধেক, সাড়ে',
    onyomi: 'ハン (han)', kunyomi: 'なか.ば (naka.ba)', strokes: 5,
    examples: [
      { word: '半分', reading: 'はんぶん', meaningBn: 'অর্ধেক', meaningEn: 'Half' },
      { word: '一時半', reading: 'いちじはん', meaningBn: 'দেড়টা (১:৩০)', meaningEn: '1:30' },
      { word: '半年', reading: 'はんとし / はんねん', meaningBn: 'অর্ধবছর / ৬ মাস', meaningEn: 'Half year' }
    ],
    exampleSentenceJp: 'いま にじはん です。', exampleSentenceBn: 'এখন আড়াইটা (২:৩০) বাজে।'
  },
  {
    id: 'kanji-58', lessonId: 14, kanji: '男', meaningEn: 'Man, Male', meaningBn: 'পুরুষ, ছেলে',
    onyomi: 'ダン, ナン (dan, nan)', kunyomi: 'おとこ, お (otoko)', strokes: 7,
    examples: [
      { word: '男の人', reading: 'おとこのひと', meaningBn: 'পুরুষ ব্যক্তি', meaningEn: 'Man' },
      { word: '男の子', reading: 'おとこのこ', meaningBn: 'ছেলে শিশু', meaningEn: 'Boy' },
      { word: '男性', reading: 'だんせい', meaningBn: 'পুরুষ / নর', meaningEn: 'Male' }
    ],
    exampleSentenceJp: 'あの おとこのひと は かれ の おとうと です。', exampleSentenceBn: 'ঐ পুরুষটি ওর ছোট ভাই।'
  },
  {
    id: 'kanji-59', lessonId: 14, kanji: '西', meaningEn: 'West', meaningBn: 'পশ্চিম দিক',
    onyomi: 'セイ, サイ (sei, sai)', kunyomi: 'にし (nishi)', strokes: 6,
    examples: [
      { word: '西', reading: 'にし', meaningBn: 'পশ্চিম', meaningEn: 'West' },
      { word: '西口', reading: 'にしぐち', meaningBn: 'পশ্চিম ফটক', meaningEn: 'West exit' },
      { word: '関西', reading: 'かんさい', meaningBn: 'কানসাই অঞ্চল', meaningEn: 'Kansai region' }
    ],
    exampleSentenceJp: 'にし の そら が あかい です。', exampleSentenceBn: 'পশ্চিমের আকাশ লাল।'
  },
  {
    id: 'kanji-60', lessonId: 14, kanji: '電', meaningEn: 'Electricity, Electric', meaningBn: 'বিদ্যুৎ',
    onyomi: 'デン (den)', kunyomi: '', strokes: 13,
    examples: [
      { word: '電車', reading: 'でんしゃ', meaningBn: 'বৈদ্যুতিক ট্রেন', meaningEn: 'Train' },
      { word: '電気', reading: 'でんき', meaningBn: 'বিদ্যুৎ / বাতি', meaningEn: 'Electricity' },
      { word: '電話', reading: 'でんわ', meaningBn: 'টেলিফোন', meaningEn: 'Phone' }
    ],
    exampleSentenceJp: 'でんしゃ で かいしゃ へ いきます。', exampleSentenceBn: 'ট্রেনে করে অফিসে যাই।'
  },
  {
    id: 'kanji-61', lessonId: 15, kanji: '校', meaningEn: 'School, Exam', meaningBn: 'বিদ্যালয়',
    onyomi: 'コウ (kou)', kunyomi: '', strokes: 10,
    examples: [
      { word: '学校', reading: 'がっこう', meaningBn: 'স্কুল', meaningEn: 'School' },
      { word: '高校', reading: 'こうこう', meaningBn: 'উচ্চ বিদ্যালয়', meaningEn: 'High school' },
      { word: '校長', reading: 'こうちょう', meaningBn: 'প্রধান শিক্ষক', meaningEn: 'Principal' }
    ],
    exampleSentenceJp: 'がっこう は やすみ です。', exampleSentenceBn: 'স্কুল বন্ধ রয়েছে।'
  },
  {
    id: 'kanji-62', lessonId: 15, kanji: '語', meaningEn: 'Word, Speech, Language', meaningBn: 'ভাষা, শব্দ',
    onyomi: 'ゴ (go)', kunyomi: 'かた.る, かた.らう (kata.ru)', strokes: 14,
    examples: [
      { word: '日本語', reading: 'にほんご', meaningBn: 'জাপানি ভাষা', meaningEn: 'Japanese language' },
      { word: '英語', reading: 'えいご', meaningBn: 'ইংরেজি ভাষা', meaningEn: 'English language' },
      { word: '単語', reading: 'たんご', meaningBn: 'শব্দভাণ্ডার', meaningEn: 'Vocabulary' }
    ],
    exampleSentenceJp: 'にほんご を べんきょう します。', exampleSentenceBn: 'জাপানি ভাষা শিখছি।'
  },
  {
    id: 'kanji-63', lessonId: 15, kanji: '土', meaningEn: 'Earth, Soil, Ground', meaningBn: 'মাটি, ভূখণ্ড',
    onyomi: 'ド, ト (do, to)', kunyomi: 'つち (tsuchi)', strokes: 3,
    examples: [
      { word: '土曜日', reading: 'どようび', meaningBn: 'শনিবার', meaningEn: 'Saturday' },
      { word: '土', reading: 'つち', meaningBn: 'মাটি', meaningEn: 'Soil / Earth' },
      { word: '土地', reading: 'とち', meaningBn: 'জমি', meaningEn: 'Land / plot' }
    ],
    exampleSentenceJp: 'どようび は はたらきません。', exampleSentenceBn: 'শনিবারে কাজ করি না।'
  },
  {
    id: 'kanji-64', lessonId: 15, kanji: '木', meaningEn: 'Tree, Wood', meaningBn: 'গাছ, কাঠ',
    onyomi: 'ボク, モク (boku, moku)', kunyomi: 'き, こ- (ki)', strokes: 4,
    examples: [
      { word: '木', reading: 'き', meaningBn: 'গাছ', meaningEn: 'Tree' },
      { word: '木曜日', reading: 'もくようび', meaningBn: 'বৃহস্পতিবার', meaningEn: 'Thursday' },
      { word: '木造', reading: 'もくぞう', meaningBn: 'কাঠের তৈরি', meaningEn: 'Wooden' }
    ],
    exampleSentenceJp: 'にわ に おおきい き が あります。', exampleSentenceBn: 'বাগানে বড় গাছ আছে।'
  },
  {
    id: 'kanji-65', lessonId: 16, kanji: '聞', meaningEn: 'Hear, Listen, Ask', meaningBn: 'শোনা, শোনা ও জানা',
    onyomi: 'ブン, モン (bun, mon)', kunyomi: 'き.く, き.こえる (ki.ku, ki.koeru)', strokes: 14,
    examples: [
      { word: '聞きます', reading: 'ききます', meaningBn: 'শোনা / জিজ্ঞাসা করা', meaningEn: 'To listen / hear / ask' },
      { word: '新聞', reading: 'しんぶん', meaningBn: 'সংবাদপত্র', meaningEn: 'Newspaper' },
      { word: '聞こえます', reading: 'きこえます', meaningBn: 'শোনা যাওয়া', meaningEn: 'To be heard' }
    ],
    exampleSentenceJp: 'おんがく を ききます。', exampleSentenceBn: 'গান শুনছি।'
  },
  {
    id: 'kanji-66', lessonId: 16, kanji: '食', meaningEn: 'Eat, Food', meaningBn: 'খাওয়া, খাবার',
    onyomi: 'ショク, ジキ (shoku, jiki)', kunyomi: 'た.べる, く.う (ta.beru)', strokes: 9,
    examples: [
      { word: '食べます', reading: 'たべます', meaningBn: 'খাওয়া', meaningEn: 'To eat' },
      { word: '食べ物', reading: 'たべもの', meaningBn: 'খাবার', meaningEn: 'Food' },
      { word: '食堂', reading: 'しょくどう', meaningBn: 'ক্যান্টিন / খাবার ঘর', meaningEn: 'Cafeteria / Dining hall' }
    ],
    exampleSentenceJp: 'あさごはん を たべました。', exampleSentenceBn: 'সকালের খাবার খেয়েছি।'
  },
  {
    id: 'kanji-67', lessonId: 16, kanji: '車', meaningEn: 'Car, Vehicle, Wheel', meaningBn: 'গাড়ি, চাকা',
    onyomi: 'シャ (sha)', kunyomi: 'くるま (kuruma)', strokes: 7,
    examples: [
      { word: '車', reading: 'くるま', meaningBn: 'গাড়ি', meaningEn: 'Car' },
      { word: '電車', reading: 'でんしゃ', meaningBn: 'ট্রেন', meaningEn: 'Train' },
      { word: '自転車', reading: 'じてんしゃ', meaningBn: 'সাইকেল', meaningEn: 'Bicycle' }
    ],
    exampleSentenceJp: 'くるま を うんてん します。', exampleSentenceBn: 'গাড়ি চালাচ্ছি।'
  },
  {
    id: 'kanji-68', lessonId: 16, kanji: '何', meaningEn: 'What', meaningBn: 'কী, কি',
    onyomi: 'カ (ka)', kunyomi: 'なに, なん (nani, nan)', strokes: 7,
    examples: [
      { word: '何', reading: 'なに / なん', meaningBn: 'কী', meaningEn: 'What' },
      { word: '何時', reading: 'なんじ', meaningBn: 'কয়টা (বাজে)', meaningEn: 'What time' },
      { word: '何人', reading: 'なんにん', meaningBn: 'কতজন', meaningEn: 'How many people' }
    ],
    exampleSentenceJp: 'これ は なん ですか。', exampleSentenceBn: 'এটি কী?'
  },
  {
    id: 'kanji-69', lessonId: 17, kanji: '南', meaningEn: 'South', meaningBn: 'দক্ষিণ দিক',
    onyomi: 'ナン, ナ (nan, na)', kunyomi: 'みなみ (minami)', strokes: 9,
    examples: [
      { word: '南', reading: 'みなみ', meaningBn: 'দক্ষিণ', meaningEn: 'South' },
      { word: '南口', reading: 'みなみぐち', meaningBn: 'দক্ষিণ ফটক', meaningEn: 'South exit' },
      { word: '東南アジア', reading: 'とうなんアジア', meaningBn: 'দক্ষিণ-পূর্ব এশিয়া', meaningEn: 'Southeast Asia' }
    ],
    exampleSentenceJp: 'えき の みなみぐち で あいましょう。', exampleSentenceBn: 'স্টেশনের দক্ষিণ গেটে দেখা করি।'
  },
  {
    id: 'kanji-70', lessonId: 17, kanji: '万', meaningEn: 'Ten Thousand', meaningBn: 'দশ হাজার',
    onyomi: 'マン, バン (man, ban)', kunyomi: 'よろず (yorozu)', strokes: 3,
    examples: [
      { word: '一万', reading: 'いちまん', meaningBn: 'দশ হাজার (১ মান)', meaningEn: '10,000' },
      { word: '万年筆', reading: 'まんねんひつ', meaningBn: 'ফাউন্টেন পেন', meaningEn: 'Fountain pen' }
    ],
    exampleSentenceJp: 'この パソコン は じゅうまん えん です。', exampleSentenceBn: 'এই কম্পিউটারের দাম ১ লাখ (১০ মান) ইয়েন।'
  },
  {
    id: 'kanji-71', lessonId: 17, kanji: '毎', meaningEn: 'Every', meaningBn: 'প্রতি, প্রতিবার',
    onyomi: 'マイ (mai)', kunyomi: 'ごと (goto)', strokes: 6,
    examples: [
      { word: '毎日', reading: 'まいにち', meaningBn: 'প্রতিদিন', meaningEn: 'Every day' },
      { word: '毎週', reading: 'まいしゅう', meaningBn: 'প্রতি সপ্তাহ', meaningEn: 'Every week' },
      { word: '毎月', reading: 'まいつき', meaningBn: 'প্রতি মাস', meaningEn: 'Every month' }
    ],
    exampleSentenceJp: 'まいにち にほんご を べんきょう します。', exampleSentenceBn: 'প্রতিদিন জাপানি ভাষা পড়ি।'
  },
  {
    id: 'kanji-72', lessonId: 17, kanji: '白', meaningEn: 'White', meaningBn: 'সাদা',
    onyomi: 'ハク, ビャク (haku, byaku)', kunyomi: 'しろ, しろ.い (shiro, shiro.i)', strokes: 5,
    examples: [
      { word: '白い', reading: 'しろい', meaningBn: 'সাদা রঙের', meaningEn: 'White' },
      { word: '白', reading: 'しろ', meaningBn: 'সাদা রঙ', meaningEn: 'White color' },
      { word: '面白', reading: 'おもしろい', meaningBn: 'মজার / আকর্ষণীয়', meaningEn: 'Interesting' }
    ],
    exampleSentenceJp: 'しろい シャツ を きました。', exampleSentenceBn: 'সাদা শার্ট পরেছি।'
  },
  {
    id: 'kanji-73', lessonId: 18, kanji: '天', meaningEn: 'Heaven, Sky, Celestial', meaningBn: 'আকাশ, স্বর্গ',
    onyomi: 'テン (ten)', kunyomi: 'あまつ, あめ (ama)', strokes: 4,
    examples: [
      { word: '天気', reading: 'てんき', meaningBn: 'আবহাওয়া', meaningEn: 'Weather' },
      { word: '天国', reading: 'てんごく', meaningBn: 'স্বর্গ', meaningEn: 'Heaven' },
      { word: '天才', reading: 'てんさい', meaningBn: 'প্রতিভাধর / জিনিয়াস', meaningEn: 'Genius' }
    ],
    exampleSentenceJp: 'きょう は いい てんき です。', exampleSentenceBn: 'আজকের আবহাওয়া সুন্দর।'
  },
  {
    id: 'kanji-74', lessonId: 18, kanji: '母', meaningEn: 'Mother', meaningBn: 'মা, মাতা',
    onyomi: 'ボ (bo)', kunyomi: 'はは, かあ (haha, kaa)', strokes: 5,
    examples: [
      { word: '母', reading: 'はは', meaningBn: 'আমার মা', meaningEn: 'My mother' },
      { word: 'お母さん', reading: 'おかあさん', meaningBn: 'অন্যের মা / মা', meaningEn: 'Mother' },
      { word: '母国', reading: 'ぼこく', meaningBn: 'মাতৃভূমি', meaningEn: 'Motherland' }
    ],
    exampleSentenceJp: 'はは は りょうり が じょうず です。', exampleSentenceBn: 'আমার মা রান্নায় দক্ষ।'
  },
  {
    id: 'kanji-75', lessonId: 18, kanji: '火', meaningEn: 'Fire', meaningBn: 'আগুন',
    onyomi: 'カ (ka)', kunyomi: 'ひ, ほ (hi, ho)', strokes: 4,
    examples: [
      { word: '火曜日', reading: 'かようび', meaningBn: 'মঙ্গলবার', meaningEn: 'Tuesday' },
      { word: '火', reading: 'ひ', meaningBn: 'আগুন', meaningEn: 'Fire' },
      { word: '花火', reading: 'はなび', meaningBn: 'আতশবাজি', meaningEn: 'Fireworks' }
    ],
    exampleSentenceJp: 'かようび に テスト が あります。', exampleSentenceBn: 'মঙ্গলবারে পরীক্ষা আছে।'
  },
  {
    id: 'kanji-76', lessonId: 18, kanji: '右', meaningEn: 'Right (direction)', meaningBn: 'ডান দিক',
    onyomi: 'ウ, ユウ (u, yuu)', kunyomi: 'みぎ (migi)', strokes: 5,
    examples: [
      { word: '右', reading: 'みぎ', meaningBn: 'ডান', meaningEn: 'Right' },
      { word: '右手', reading: 'みぎて', meaningBn: 'ডান হাত', meaningEn: 'Right hand' },
      { word: '右側', reading: 'みぎがわ', meaningBn: 'ডান পাশ', meaningEn: 'Right side' }
    ],
    exampleSentenceJp: 'みぎ へ まがって ください。', exampleSentenceBn: 'ডান দিকে ঘুরুন।'
  },
  {
    id: 'kanji-77', lessonId: 19, kanji: '読', meaningEn: 'Read', meaningBn: 'পড়া, পাঠ',
    onyomi: 'ドク, トク (doku, toku)', kunyomi: 'よ.む (yo.mu)', strokes: 14,
    examples: [
      { word: '読みます', reading: 'よみます', meaningBn: 'পড়া', meaningEn: 'To read' },
      { word: '読書', reading: 'どくしょ', meaningBn: 'বই পাঠ', meaningEn: 'Reading' },
      { word: '読み方', reading: 'よみかた', meaningBn: 'পড়ার নিয়ম / উচ্চারণ', meaningEn: 'Way of reading' }
    ],
    exampleSentenceJp: 'ほん を よみます。', exampleSentenceBn: 'বই পড়ছি।'
  },
  {
    id: 'kanji-78', lessonId: 19, kanji: '友', meaningEn: 'Friend', meaningBn: 'বন্ধু',
    onyomi: 'ユウ (yuu)', kunyomi: 'とも (tomo)', strokes: 4,
    examples: [
      { word: '友達', reading: 'ともだち', meaningBn: 'বন্ধু', meaningEn: 'Friend' },
      { word: '友人', reading: 'ゆうじん', meaningBn: 'বন্ধু (মার্জিত)', meaningEn: 'Friend (formal)' },
      { word: '友情', reading: 'ゆうじょう', meaningBn: 'বন্ধুত্ব', meaningEn: 'Friendship' }
    ],
    exampleSentenceJp: 'ともだち と あそびました。', exampleSentenceBn: 'বন্ধুর সাথে ঘুরেছি/খেলেছি।'
  },
  {
    id: 'kanji-79', lessonId: 19, kanji: '左', meaningEn: 'Left (direction)', meaningBn: 'বাম দিক',
    onyomi: 'サ, シャ (sa, sha)', kunyomi: 'ひだり (hidari)', strokes: 5,
    examples: [
      { word: '左', reading: 'ひだり', meaningBn: 'বাম', meaningEn: 'Left' },
      { word: '左手', reading: 'ひだりて', meaningBn: 'বাম হাত', meaningEn: 'Left hand' },
      { word: '左側', reading: 'ひだりがわ', meaningBn: 'বাম পাশ', meaningEn: 'Left side' }
    ],
    exampleSentenceJp: 'ひだり に ぎんこう が あります。', exampleSentenceBn: 'বামে ব্যাংক আছে।'
  },
  {
    id: 'kanji-80', lessonId: 19, kanji: '休', meaningEn: 'Rest, Day off, Retire', meaningBn: 'বিশ্রাম, ছুটি',
    onyomi: 'キュウ (kyuu)', kunyomi: 'やす.む, やす.まる (yasu.mu)', strokes: 6,
    examples: [
      { word: '休みます', reading: 'やすみます', meaningBn: 'বিশ্রাম নেওয়া / ছুটি কাটানো', meaningEn: 'To rest' },
      { word: '休み', reading: 'やすみ', meaningBn: 'ছুটি / অবকাশ', meaningEn: 'Holiday / Break' },
      { word: '夏休み', reading: 'なつやすみ', meaningBn: 'গ্রীষ্মের ছুটি', meaningEn: 'Summer vacation' }
    ],
    exampleSentenceJp: 'きょう は やすみ です。', exampleSentenceBn: 'আজ ছুটি।'
  },
  {
    id: 'kanji-81', lessonId: 20, kanji: '父', meaningEn: 'Father', meaningBn: 'বাবা, পিতা',
    onyomi: 'フ (fu)', kunyomi: 'ちち, とう (chichi, tou)', strokes: 4,
    examples: [
      { word: '父', reading: 'ちち', meaningBn: 'আমার বাবা', meaningEn: 'My father' },
      { word: 'お父さん', reading: 'おとうさん', meaningBn: 'অন্যের বাবা / পিতা', meaningEn: 'Father' },
      { word: '父母', reading: 'ふぼ', meaningBn: 'পিতা-মাতা', meaningEn: 'Parents' }
    ],
    exampleSentenceJp: 'ちち は かいしゃいん です。', exampleSentenceBn: 'আমার বাবা চাকরিজীবী।'
  },
  {
    id: 'kanji-82', lessonId: 20, kanji: '雨', meaningEn: 'Rain', meaningBn: 'বৃষ্টি',
    onyomi: 'ウ (u)', kunyomi: 'あめ, あま- (ame)', strokes: 8,
    examples: [
      { word: '雨', reading: 'あめ', meaningBn: 'বৃষ্টি', meaningEn: 'Rain' },
      { word: '大雨', reading: 'おおあめ', meaningBn: 'ভারী বৃষ্টিপাত', meaningEn: 'Heavy rain' },
      { word: '雨期', reading: 'うき', meaningBn: 'বর্ষাকাল', meaningEn: 'Rainy season' }
    ],
    exampleSentenceJp: 'あめ が ふっています。', exampleSentenceBn: 'বৃষ্টি পড়ছে।'
  },
  {
    id: 'kanji-83', lessonId: 20, kanji: '買', meaningEn: 'Buy', meaningBn: 'কেনা, ক্রয়',
    onyomi: 'バイ (bai)', kunyomi: 'か.う (ka.u)', strokes: 12,
    examples: [
      { word: '買います', reading: 'かいます', meaningBn: 'কেনা', meaningEn: 'To buy' },
      { word: '買い物', reading: 'かいもの', meaningBn: 'কেনাকাটা', meaningEn: 'Shopping' }
    ],
    exampleSentenceJp: 'スーパー で やさい を かいました。', exampleSentenceBn: 'সুপারশপ থেকে সবজি কিনেছি।'
  },
  {
    id: 'kanji-84', lessonId: 20, kanji: '新', meaningEn: 'New, Fresh', meaningBn: 'নতুন',
    onyomi: 'シン (shin)', kunyomi: 'あたら.しい, あら.た (atara.shii)', strokes: 13,
    examples: [
      { word: '新しい', reading: 'あたらしい', meaningBn: 'নতুন', meaningEn: 'New' },
      { word: '新聞', reading: 'しんぶん', meaningBn: 'সংবাদপত্র', meaningEn: 'Newspaper' },
      { word: '新年', reading: 'しんねん', meaningBn: 'নতুন বছর', meaningEn: 'New year' }
    ],
    exampleSentenceJp: 'あたらしい くるま を かいました。', exampleSentenceBn: 'নতুন গাড়ি কিনেছি।'
  },
  {
    id: 'kanji-85', lessonId: 21, kanji: '古', meaningEn: 'Old (things)', meaningBn: 'পুরাতন',
    onyomi: 'コ (ko)', kunyomi: 'ふる.い, ふる- (furu.i)', strokes: 5,
    examples: [
      { word: '古い', reading: 'ふるい', meaningBn: 'পুরাতন', meaningEn: 'Old' },
      { word: '中古', reading: 'ちゅうこ', meaningBn: 'ব্যবহৃত / সেকেন্ড হ্যান্ড', meaningEn: 'Used / second-hand' },
      { word: '古代', reading: 'こだい', meaningBn: 'প্রাচীন কাল', meaningEn: 'Ancient times' }
    ],
    exampleSentenceJp: 'この ほん は ふるい です。', exampleSentenceBn: 'এই বইটি পুরোনো।'
  },
  {
    id: 'kanji-86', lessonId: 21, kanji: '少', meaningEn: 'Few, Little', meaningBn: 'কম, সামান্য',
    onyomi: 'ショウ (shou)', kunyomi: 'すく.ない, すこ.し (suku.nai, suko.shi)', strokes: 4,
    examples: [
      { word: '少し', reading: 'すこし', meaningBn: 'কিছুটা / অল্প', meaningEn: 'A little' },
      { word: '少ない', reading: 'すくない', meaningBn: 'অল্প / কম', meaningEn: 'Few / rare' },
      { word: '少年', reading: 'しょうねん', meaningBn: 'কিশোর', meaningEn: 'Boy / youth' }
    ],
    exampleSentenceJp: 'すこし つかれました。', exampleSentenceBn: 'একটু ক্লান্ত হয়েছি।'
  },
  {
    id: 'kanji-87', lessonId: 21, kanji: '多', meaningEn: 'Many, Frequent, Much', meaningBn: 'অনেক, বেশি',
    onyomi: 'タ (ta)', kunyomi: 'おお.い (oo.i)', strokes: 6,
    examples: [
      { word: '多い', reading: 'おおい', meaningBn: 'অনেক / বেশি', meaningEn: 'Many / much' },
      { word: '多分', reading: 'たぶん', meaningBn: 'সম্ভবত', meaningEn: 'Probably' },
      { word: '多数', reading: 'たすう', meaningBn: 'বিপুল সংখ্যক', meaningEn: 'Great number' }
    ],
    exampleSentenceJp: 'ひと が おおい です。', exampleSentenceBn: 'মানুষ অনেক বেশি।'
  },
  {
    id: 'kanji-88', lessonId: 21, kanji: '店', meaningEn: 'Store, Shop', meaningBn: 'দোকান',
    onyomi: 'テン (ten)', kunyomi: 'みせ, たな (mise)', strokes: 8,
    examples: [
      { word: '店', reading: 'みせ', meaningBn: 'দোকান', meaningEn: 'Shop / Store' },
      { word: '店員', reading: 'てんいん', meaningBn: 'দোকানের কর্মী / সেলসম্যান', meaningEn: 'Clerk' },
      { word: '書店', reading: 'しょてん', meaningBn: 'বইয়ের দোকান', meaningEn: 'Bookshop' }
    ],
    exampleSentenceJp: 'あそこの みせ で たべましょう。', exampleSentenceBn: 'ঐ দোকানে গিয়ে খাওয়া যাক।'
  },
  {
    id: 'kanji-89', lessonId: 22, kanji: '道', meaningEn: 'Road, Street, Way, Path', meaningBn: 'রাস্তা, পথ',
    onyomi: 'ドウ, トウ (dou, tou)', kunyomi: 'みち (michi)', strokes: 12,
    examples: [
      { word: '道', reading: 'みち', meaningBn: 'রাস্তা / পথ', meaningEn: 'Road / way' },
      { word: '水道', reading: 'すいどう', meaningBn: 'পানির পাইপলাইন', meaningEn: 'Water supply' },
      { word: '北海道', reading: 'ほっかいどう', meaningBn: 'হোক্কাইদো', meaningEn: 'Hokkaido' }
    ],
    exampleSentenceJp: 'みち に まよいました。', exampleSentenceBn: 'রাস্তা হারিয়ে ফেলেছি।'
  },
  {
    id: 'kanji-90', lessonId: 22, kanji: '社', meaningEn: 'Company, Firm, Shrine', meaningBn: 'প্রতিষ্ঠান, সমিতি, উপাসনালয়',
    onyomi: 'シャ (sha)', kunyomi: 'やしろ (yashiro)', strokes: 7,
    examples: [
      { word: '会社', reading: 'かいしゃ', meaningBn: 'কোম্পানি', meaningEn: 'Company' },
      { word: '社長', reading: 'しゃちょう', meaningBn: 'কোম্পানির প্রেসিডেন্ট', meaningEn: 'Company president' },
      { word: '神社', reading: 'じんじゃ', meaningBn: 'শিন্তো উপাসনালয়', meaningEn: 'Shinto shrine' }
    ],
    exampleSentenceJp: 'かいしゃ で はたらきます。', exampleSentenceBn: 'কোম্পানিতে কাজ করি।'
  },
  {
    id: 'kanji-91', lessonId: 22, kanji: '魚', meaningEn: 'Fish', meaningBn: 'মাছ',
    onyomi: 'ギョ (gyo)', kunyomi: 'うお, さかな (sakana)', strokes: 11,
    examples: [
      { word: '魚', reading: 'さかな', meaningBn: 'মাছ', meaningEn: 'Fish' },
      { word: '金魚', reading: 'きんぎょ', meaningBn: 'গোল্ডফিশ', meaningEn: 'Goldfish' },
      { word: '魚屋', reading: 'さかなや', meaningBn: 'মাছের দোকান', meaningEn: 'Fish store' }
    ],
    exampleSentenceJp: 'さかな を たべます。', exampleSentenceBn: 'মাছ খাব।'
  },
  {
    id: 'kanji-92', lessonId: 23, kanji: '手', meaningEn: 'Hand', meaningBn: 'হাত',
    onyomi: 'シュ, ズ (shu, zu)', kunyomi: 'て, た- (te)', strokes: 4,
    examples: [
      { word: '手', reading: 'て', meaningBn: 'হাত', meaningEn: 'Hand' },
      { word: '上手', reading: 'じょうず', meaningBn: 'দক্ষ', meaningEn: 'Skillful' },
      { word: '下手', reading: 'へた', meaningBn: 'অদক্ষ', meaningEn: 'Unskillful' },
      { word: '手紙', reading: 'てがみ', meaningBn: 'চিঠি', meaningEn: 'Letter' }
    ],
    exampleSentenceJp: 'て を あらいました。', exampleSentenceBn: 'হাত ধুয়েছি।'
  },
  {
    id: 'kanji-93', lessonId: 23, kanji: '足', meaningEn: 'Leg, Foot, Sufficient', meaningBn: 'পা, পর্যাপ্ত হওয়া',
    onyomi: 'ソク (soku)', kunyomi: 'あし, た.りる, た.す (ashi, ta.riru)', strokes: 7,
    examples: [
      { word: '足', reading: 'あし', meaningBn: 'পা', meaningEn: 'Leg / foot' },
      { word: '足ります', reading: 'たります', meaningBn: 'পর্যাপ্ত হওয়া', meaningEn: 'To be sufficient' },
      { word: '遠足', reading: 'えんそく', meaningBn: 'পিকনিক / পদব্রজে ভ্রমণ', meaningEn: 'Excursion' }
    ],
    exampleSentenceJp: 'あし が いたいです。', exampleSentenceBn: 'পায়ে ব্যথা করছে।'
  },
  {
    id: 'kanji-94', lessonId: 23, kanji: '目', meaningEn: 'Eye, Class, Look', meaningBn: 'চোখ, দৃষ্টি',
    onyomi: 'モク, ボク (moku, boku)', kunyomi: 'め, ま- (me)', strokes: 5,
    examples: [
      { word: '目', reading: 'め', meaningBn: 'চোখ', meaningEn: 'Eye' },
      { word: '目的', reading: 'もくてき', meaningBn: 'উদ্দেশ্য', meaningEn: 'Purpose' },
      { word: '一日目', reading: 'いちにちめ', meaningBn: 'প্রথম দিন', meaningEn: 'First day' }
    ],
    exampleSentenceJp: 'め を とじて ください。', exampleSentenceBn: 'চোখ বন্ধ করুন।'
  },
  {
    id: 'kanji-95', lessonId: 24, kanji: '耳', meaningEn: 'Ear', meaningBn: 'কান',
    onyomi: 'ジ (ji)', kunyomi: 'みみ (mimi)', strokes: 6,
    examples: [
      { word: '耳', reading: 'みみ', meaningBn: 'কান', meaningEn: 'Ear' },
      { word: '初耳', reading: 'はつみみ', meaningBn: 'প্রথমবার শোনা কথা', meaningEn: 'First time hearing' }
    ],
    exampleSentenceJp: 'みみ が いたい です。', exampleSentenceBn: 'কানে ব্যথা করছে।'
  },
  {
    id: 'kanji-96', lessonId: 24, kanji: '口', meaningEn: 'Mouth, Opening', meaningBn: 'মুখ, প্রবেশপথ',
    onyomi: 'コウ, ク (kou, ku)', kunyomi: 'くち (kuchi)', strokes: 3,
    examples: [
      { word: '口', reading: 'くち', meaningBn: 'মুখ', meaningEn: 'Mouth' },
      { word: '入口', reading: 'いりぐち', meaningBn: 'প্রবেশদ্বার', meaningEn: 'Entrance' },
      { word: '出口', reading: 'でぐち', meaningBn: 'বহির্গমন পথ', meaningEn: 'Exit' }
    ],
    exampleSentenceJp: 'くち を あけて ください。', exampleSentenceBn: 'মুখ খুলুন।'
  },
  {
    id: 'kanji-97', lessonId: 24, kanji: '空', meaningEn: 'Sky, Empty, Air', meaningBn: 'আকাশ, শূন্য',
    onyomi: 'クウ (kuu)', kunyomi: 'そら, あ.く, から (sora, a.ku, kara)', strokes: 8,
    examples: [
      { word: '空', reading: 'そら', meaningBn: 'আকাশ', meaningEn: 'Sky' },
      { word: '空気', reading: 'くうき', meaningBn: 'বাতাস / বায়ু', meaningEn: 'Air' },
      { word: '空港', reading: 'くうこう', meaningBn: 'বিমানবন্দর', meaningEn: 'Airport' }
    ],
    exampleSentenceJp: 'あおい そら が きれい です。', exampleSentenceBn: 'নীল আকাশ সুন্দর।'
  },
  {
    id: 'kanji-98', lessonId: 24, kanji: '駅', meaningEn: 'Station', meaningBn: 'রেলওয়ে স্টেশন',
    onyomi: 'エキ (eki)', kunyomi: '', strokes: 14,
    examples: [
      { word: '駅', reading: 'えき', meaningBn: 'স্টেশন', meaningEn: 'Station' },
      { word: '駅員', reading: 'えきいん', meaningBn: 'স্টেশন কর্মী', meaningEn: 'Station staff' },
      { word: '東京駅', reading: 'とうきょうえき', meaningBn: 'টোকিও স্টেশন', meaningEn: 'Tokyo station' }
    ],
    exampleSentenceJp: 'えき まで あるきます。', exampleSentenceBn: 'স্টেশন পর্যন্ত হেঁটে যাই।'
  },
  {
    id: 'kanji-99', lessonId: 25, kanji: '花', meaningEn: 'Flower', meaningBn: 'ফুল',
    onyomi: 'カ, ケ (ka, ke)', kunyomi: 'はな (hana)', strokes: 7,
    examples: [
      { word: '花', reading: 'はな', meaningBn: 'ফুল', meaningEn: 'Flower' },
      { word: '花見', reading: 'はなみ', meaningBn: 'চেরি ফুল দর্শন উৎসব', meaningEn: 'Cherry blossom viewing' },
      { word: '花火', reading: 'はなび', meaningBn: 'আতশবাজি', meaningEn: 'Fireworks' }
    ],
    exampleSentenceJp: 'きれい な はな が さきました。', exampleSentenceBn: 'সুন্দর ফুল ফুটেছে।'
  },
  {
    id: 'kanji-100', lessonId: 25, kanji: '犬', meaningEn: 'Dog', meaningBn: 'কুকুর',
    onyomi: 'ケン (ken)', kunyomi: 'いぬ (inu)', strokes: 4,
    examples: [
      { word: '犬', reading: 'いぬ', meaningBn: 'কুকুর', meaningEn: 'Dog' },
      { word: '子犬', reading: 'こいぬ', meaningBn: 'কুকুরছানা', meaningEn: 'Puppy' },
      { word: '番犬', reading: 'ばんけん', meaningBn: 'পাহাড়াদার কুকুর', meaningEn: 'Watchdog' }
    ],
    exampleSentenceJp: 'しろい いぬ を かっています。', exampleSentenceBn: 'একটি সাদা কুকুর পুষি।'
  },
  {
    id: 'kanji-101', lessonId: 25, kanji: '飲', meaningEn: 'Drink, Beverage', meaningBn: 'পান করা, পানীয়',
    onyomi: 'イン (in)', kunyomi: 'の.む (no.mu)', strokes: 12,
    examples: [
      { word: '飲みます', reading: 'のみます', meaningBn: 'পান করা', meaningEn: 'To drink' },
      { word: '飲み物', reading: 'のみもの', meaningBn: 'পানীয়', meaningEn: 'Beverage' },
      { word: '飲食店', reading: 'いんしょくてん', meaningBn: 'রেস্তোরাঁ', meaningEn: 'Restaurant' }
    ],
    exampleSentenceJp: 'みず を のみます。', exampleSentenceBn: 'পানি পান করব।'
  },
  {
    id: 'kanji-102', lessonId: 25, kanji: '立', meaningEn: 'Stand, Establish', meaningBn: 'দাঁড়ানো, প্রতিষ্ঠা',
    onyomi: 'リツ, リュウ (ritsu, ryuu)', kunyomi: 'た.つ, た.てる (ta.tsu, ta.teru)', strokes: 5,
    examples: [
      { word: '立ちます', reading: 'たちます', meaningBn: 'দাঁড়ানো', meaningEn: 'To stand up' },
      { word: '立てます', reading: 'たてます', meaningBn: 'খাড়া করা / স্থাপন করা', meaningEn: 'To erect' },
      { word: '国立', reading: 'こくりつ', meaningBn: 'জাতীয় / সরকার পরিচালিত', meaningEn: 'National' }
    ],
    exampleSentenceJp: 'どうぞ たって ください。', exampleSentenceBn: 'দয়া করে দাঁড়ান।'
  },
  {
    id: 'kanji-103', lessonId: 25, kanji: '週', meaningEn: 'Week', meaningBn: 'সপ্তাহ',
    onyomi: 'シュウ (shuu)', kunyomi: '', strokes: 11,
    examples: [
      { word: '今週', reading: 'こんしゅう', meaningBn: 'চলতি সপ্তাহ', meaningEn: 'This week' },
      { word: '来週', reading: 'らいしゅう', meaningBn: 'আগামী সপ্তাহ', meaningEn: 'Next week' },
      { word: '先週', reading: 'せんしゅう', meaningBn: 'গত সপ্তাহ', meaningEn: 'Last week' },
      { word: '一週間', reading: 'いっしゅうかん', meaningBn: 'এক সপ্তাহ ধরে', meaningEn: 'For one week' }
    ],
    exampleSentenceJp: 'らいしゅう の どようび に あいましょう。', exampleSentenceBn: 'আগামী সপ্তাহের শনিবারে দেখা করব।'
  }
];

const fileContent = `import { KanjiItem } from '../types';

export const n5KanjiList: KanjiItem[] = ` + JSON.stringify(kanji103, null, 2) + `;\n`;

fs.writeFileSync(path.resolve(__dirname, '../src/data/kanjiList.ts'), fileContent, 'utf8');
console.log('Successfully generated all ' + kanji103.length + ' Kanji!');
