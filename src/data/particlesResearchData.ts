import { DetailedParticle, ParticleItem } from '../types';

export const detailedParticlesList: DetailedParticle[] = [
  // 1. は (WA)
  {
    id: 'particle-wa',
    symbol: 'は',
    hiragana: 'は',
    romaji: 'wa',
    bengaliPronunciation: 'ওয়া',
    level: 'N5',
    nameBn: 'টপিক মার্কার পার্টিকেল (Topic Marker)',
    nameEn: 'Topic Marker Particle',
    primaryFunctionBn: 'বাক্যের মূল বিষয়বস্তু বা টপিক নির্ধারণ',
    summaryBn: 'এই পার্টিকেল বাক্যের টপিক বা আমরা কোন বিষয় নিয়ে কথা বলছি তা নির্দেশ করে। এটি লিখিত হয় \'は (হা)\' কিন্তু উচ্চারিত হয় \'ওয়া (wa)\'।',
    simpleMeaningBn: 'বাংলায় এর নির্দিষ্ট কোনো শব্দরূপ নেই; এর ভাবার্থ হলো: "এ বিষয়ে..." বা "...সম্পর্কে বলতে গেলে"।',
    realFunctionBn: 'শ্রোতা ও বক্তার মাঝে একটি পরিচিত প্রসঙ্গ বা ফ্রেমওয়ার্ক তৈরি করে, যার ওপর ভিত্তি করে প্রেডিকেটে নতুন তথ্য প্রদান করা হয়। এছাড়া এটি দুটি বিষয়ের মাঝে বৈসাদৃশ্য (Contrast) প্রকাশ করতেও ব্যবহৃত হয়।',
    whenToUse: [
      'যখন বাক্যের মূল বিষয়বস্তু শ্রোতা আগেই জানে বা প্রসঙ্গক্রমে এসেছে।',
      'নিজের বা অন্যের নাম, জাতীয়তা, পেশা বা সাধারণ পরিচয় দেওয়ার সময় (A は B です)।',
      'সাধারণ সত্য বা চিরন্তন সত্য বর্ণনায় (যেমন: সূর্য পূর্ব দিকে ওঠে)।',
      'বৈসাদৃশ্য (Contrast) বোঝাতে: "চা খাই, কিন্তু কফি খাই না" (お茶は飲みますが、コーヒーは...)।'
    ],
    whenNotToUse: [
      'প্রশ্নবোধক শব্দের পর কখনই は বসে না (যেমন: だれは ❌ -> だれが ✅)।',
      'হঠাৎ ঘটে যাওয়া কোনো ঘটনা বা প্রাকৃতিক দৃশ্য প্রথমবার দেখে বর্ণনা করলে は বসে না, が বসে (যেমন: あ、雨が降ってきた！)।',
      'পছন্দ, অপছন্দ, ক্ষমতা বা অস্তিত্বের কাঙ্ক্ষিত বিষয়ের সাথে は বসে না (যেমন: すしが 好きです)।'
    ],
    importantNotesBn: 'মনে রাখবেন: は মানেই সর্বদা ইংরেজি "is/am/are" নয়! は কেবল টপিক মার্কার, এটি কোনো সাহায্যকারী ক্রিয়া নয়। বাক্যের শেষে থাকা です বা ক্রিয়াপদ মূলত অর্থ সমাপ্ত করে।',
    patternFormula: '[ টপিক / বিষয় ] + は + [ নতুন তথ্য / প্রেডিকেট ]',
    structureBreakdown: [
      { token: 'わたし', roleEn: 'Topic', roleBn: 'টপিক / বিষয়', color: 'indigo' },
      { token: 'は', roleEn: 'Topic Marker', roleBn: 'টপিক মার্কার', color: 'rose' },
      { token: 'がくせい', roleEn: 'Information', roleBn: 'তথ্য / প্রেডিকেট', color: 'emerald' },
      { token: 'です', roleEn: 'Polite Ending', roleBn: 'ভদ্র সমাপ্তি', color: 'slate' }
    ],
    structureExplanationBn: 'এখানে "わたし" হলো আলোচ্য বিষয়, "は" নির্দেশ করছে যে আমরা আমাকে নিয়ে কথা বলছি, এবং "がくせい です" হলো আমাকে কেন্দ্র করে দেওয়া মূল তথ্য।',
    functionBranches: [
      {
        id: 'wa-topic',
        titleEn: 'Main Sentence Topic',
        titleBn: 'বাক্যের মূল বিষয়বস্তু নির্ধারণ',
        formula: '[Topic] + は + [Description]',
        descriptionBn: 'কথোপকথনে সবার দৃষ্টি একটি নির্দিষ্ট বিষয়ের ওপর কেন্দ্রীভূত করতে বসে।',
        sampleSentence: '田中さんは親切な人です。',
        sampleReading: 'たなかさん は しんせつ な ひと です。',
        sampleBn: 'তানাকা সাহেব একজন দয়ালু মানুষ।'
      },
      {
        id: 'wa-contrast',
        titleEn: 'Contrast Marker',
        titleBn: 'দুটি বিষয়ের বৈসাদৃশ্য বা পার্থক্য',
        formula: '[A] + は + [Positive], [B] + は + [Negative]',
        descriptionBn: 'একটি বিষয় করি কিন্তু অন্যটি করি না—এমন বৈপরীত্য স্পষ্ট করতে বসে।',
        sampleSentence: '肉は食べますが、魚は食べません。',
        sampleReading: 'にく は たべます が、さかな は たべません。',
        sampleBn: 'মাংস খাই, কিন্তু মাছ খাই না।'
      },
      {
        id: 'wa-general-fact',
        titleEn: 'General / Universal Truth',
        titleBn: 'সাধারণ বা চিরন্তন সত্য',
        formula: '[Subject] + は + [General Fact]',
        descriptionBn: 'বিজ্ঞানসম্মত বা সাধারণভাবে স্বীকৃত সত্য প্রকাশে।',
        sampleSentence: '地球は丸いです。',
        sampleReading: 'ちきゅう は まるい です。',
        sampleBn: 'পৃথিবী গোল।'
      }
    ],
    beginnerExamples: [
      {
        jp: '私は学生です。',
        hiragana: 'わたし は がくせい です。',
        romaji: 'Watashi wa gakusei desu.',
        bn: 'আমি একজন ছাত্র।',
        en: 'I am a student.',
        breakdown: [
          { word: '私', meaningBn: 'আমি', roleBn: 'টপিক' },
          { word: 'は', meaningBn: 'টপিক মার্কার', roleBn: 'পার্টিকেল' },
          { word: '学生', meaningBn: 'ছাত্র', roleBn: 'বিশেষ্য' },
          { word: 'です', meaningBn: 'হয় / আছি', roleBn: 'সমাপিকা' }
        ],
        particleFunctionNote: 'আমিকে বাক্যের মূল বিষয়বস্তু হিসেবে চিহ্নিত করছে।',
        category: 'beginner'
      },
      {
        jp: 'これは日本語の本です。',
        hiragana: 'これ は にほんご の ほん です。',
        romaji: 'Kore wa nihongo no hon desu.',
        bn: 'এটি জাপানি ভাষার বই।',
        en: 'This is a Japanese language book.',
        breakdown: [
          { word: 'これ', meaningBn: 'এটি', roleBn: 'নির্দেশক সর্বনাম' },
          { word: 'は', meaningBn: 'টপিক মার্কার', roleBn: 'পার্টিকেল' },
          { word: '日本語の本', meaningBn: 'জাপানি ভাষার বই', roleBn: 'তথ্য' }
        ],
        particleFunctionNote: 'হাতে থাকা বস্তুটি (これ) আলোচনার প্রধান বিষয়।',
        category: 'beginner'
      },
      {
        jp: '今日は月曜日です。',
        hiragana: 'きょう は げつようび です。',
        romaji: 'Kyou wa getsuyoubi desu.',
        bn: 'আজ সোমবার।',
        en: 'Today is Monday.',
        breakdown: [
          { word: '今日', meaningBn: 'আজ', roleBn: 'সময়বাচক টপিক' },
          { word: 'は', meaningBn: 'টপিক মার্কার', roleBn: 'পার্টিকেল' },
          { word: '月曜日', meaningBn: 'সোমবার', roleBn: 'বার' }
        ],
        particleFunctionNote: 'আজকের দিনটিকে টপিক ধরে তার নাম দেওয়া হচ্ছে।',
        category: 'beginner'
      },
      {
        jp: '田中さんは日本人です。',
        hiragana: 'たなかさん は にほんじん です。',
        romaji: 'Tanaka-san wa nihonjin desu.',
        bn: 'তানাকা সাহেব একজন জাপানি।',
        en: 'Mr. Tanaka is Japanese.',
        breakdown: [
          { word: '田中さん', meaningBn: 'তানাকা সাহেব', roleBn: 'টপিক' },
          { word: '日本人', meaningBn: 'জাপানি ব্যক্তি', roleBn: 'তথ্য' }
        ],
        particleFunctionNote: 'তানাকা সাহেবের জাতীয়তা পরিচয় তুলে ধরা হচ্ছে।',
        category: 'beginner'
      },
      {
        jp: '私の部屋は広いです。',
        hiragana: 'わたし の へや は ひろい です。',
        romaji: 'Watashi no heya wa hiroi desu.',
        bn: 'আমার ঘরটি প্রশস্ত।',
        en: 'My room is spacious.',
        breakdown: [
          { word: '私の部屋', meaningBn: 'আমার ঘর', roleBn: 'টপিক' },
          { word: '広い', meaningBn: 'প্রশস্ত / বড়', roleBn: 'ই-বিশেষণ' }
        ],
        particleFunctionNote: 'ঘরটির বৈশিষ্ট্য বর্ণনায় ঘরকে টপিক করা হয়েছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '明日、私は暇です。',
        hiragana: 'あした、わたし は ひま です。',
        romaji: 'Ashita, watashi wa hima desu.',
        bn: 'আগামীকাল আমি ফ্রি বা অবসর আছি।',
        en: 'Tomorrow, I am free.',
        breakdown: [
          { word: '明日', meaningBn: 'আগামীকাল', roleBn: 'সময়' },
          { word: '私', meaningBn: 'আমি', roleBn: 'টপিক' },
          { word: '暇', meaningBn: 'অবসর / ফাঁকা', roleBn: 'না-বিশেষণ' }
        ],
        particleFunctionNote: 'আগামীকাল অন্য কারোর ব্যস্ততা থাকলেও "আমার" অবস্থা ফ্রি—তা তুলে ধরছে।',
        category: 'daily'
      },
      {
        jp: '日本語の勉強はとても面白いです。',
        hiragana: 'にほんご の べんきょう は とても おもしろい です。',
        romaji: 'Nihongo no benkyou wa totemo omoshiroi desu.',
        bn: 'জাপানি ভাষার পড়াশোনা খুবই আকর্ষণীয়।',
        en: 'Studying Japanese is very interesting.',
        breakdown: [
          { word: '日本語の勉強', meaningBn: 'জাপানি ভাষার পড়াশোনা', roleBn: 'টপিক' },
          { word: '面白い', meaningBn: 'আকর্ষণীয় / মজাদার', roleBn: 'বিশেষণ' }
        ],
        particleFunctionNote: 'পড়াশোনার কাজটিকে টপিক বানিয়ে মতামত দেওয়া হচ্ছে।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '平日は忙しいですが、週末はゆっくり休みます。',
        hiragana: 'へいじつ は いそがしい です が、しゅうまつ は ゆっくり やすみます。',
        romaji: 'Heijitsu wa isogashii desu ga, shuumatsu wa yukkuri yasumimasu.',
        bn: 'কাজের দিনগুলোতে ব্যস্ত থাকি, তবে সাপ্তাহিক ছুটির দিনে আরাম করে বিশ্রাম নিই।',
        en: 'On weekdays I am busy, but on weekends I rest comfortably.',
        breakdown: [
          { word: '平日', meaningBn: 'কাজের দিনগুলো', roleBn: 'টপিক ১' },
          { word: '週末', meaningBn: 'ছুটির দিন', roleBn: 'টপিক ২ (Contrast)' }
        ],
        particleFunctionNote: 'কাজের দিন ও ছুটির দিনের চমৎকার বৈসাদৃশ্য প্রকাশ করছে は।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ だれは来ましたか。',
        correctJp: '✅ だれが来ましたか。',
        whyIncorrectBn: 'だれ (কে) একটি অজানা প্রশ্নশব্দ। অজানা বিষয়ের সাথে পরিচিত টপিক মার্কার は বসতে পারে না।',
        correctReasonBn: 'অজ্ঞাত কর্তাকে শনাক্ত করতে সর্বদা が বসে।'
      },
      {
        incorrectJp: '❌ 私はすしは好きです。',
        correctJp: '✅ 私はすしが好きです。',
        whyIncorrectBn: 'পছন্দ (好き) বা অপছন্দ (嫌い)-এর মূল লক্ষ্যবস্তু কখনো は দিয়ে চিহ্নিত হয় না (যদি না বৈসাদৃশ্য থাকে)।',
        correctReasonBn: 'পছন্দের বিষয় সবসময় が দিয়ে চিহ্নিত হয়।'
      }
    ],
    visualStory: {
      titleBn: 'স্পটলাইটের আলো 🔦',
      metaphor: 'একটি থিয়েটার মঞ্চে যার ওপর স্পটলাইট ফেলা হয়, সে হলো "টপিক"।',
      diagram: '🔦 ───> [ わたし ] は [ がくせい です ]',
      explanationBn: 'は আলো ফেলে শ্রোতাকে বলে: "এখন এর দিকে মনোযোগ দিন, এর সম্পর্কে খবর শুনুন!"'
    },
    quickQuestions: [
      {
        questionJp: '田中さん（　）先生です。',
        questionBn: 'তানাকা সাহেব একজন শিক্ষক। বন্ধনীতে কোন পার্টিকেল বসবে?',
        options: ['は', 'を', 'に', 'で'],
        correctAnswer: 'は',
        explanationBn: 'তানাকা সাহেব বাক্যের টপিক বা আলোচনার বিষয়, তাই টপিক মার্কার は বসবে।'
      }
    ]
  },

  // 2. が (GA)
  {
    id: 'particle-ga',
    symbol: 'が',
    hiragana: 'が',
    romaji: 'ga',
    bengaliPronunciation: 'গা',
    level: 'N5',
    nameBn: 'সাবজেক্ট / আইডেন্টিফায়ার মার্কার (Subject / Identifier)',
    nameEn: 'Subject / Identifier Particle',
    primaryFunctionBn: 'ব্যাকরণগত আসল কর্তা ও অনুভূতির বিষয় নির্দেশ',
    summaryBn: 'ব্যাকরণগত কর্তা (Subject), নতুন অজ্ঞাত তথ্য, পঞ্চেন্দ্রিয় দিয়ে প্রত্যক্ষ ঘটনা, এবং পছন্দ/দক্ষতা/অস্তিত্বের বিষয় নির্দেশ করে।',
    simpleMeaningBn: 'বাংলায় সরাসরি অর্থ: "ই" বা নির্দিষ্ট করে বলা (যেমন: "তিনিই করেছেন", "বৃষ্টি পড়ছে")।',
    realFunctionBn: 'একটি কাজের আসল নিষ্পাদনকারী কে তা নির্দিষ্ট করে চিহ্নিত করে। এছাড়া স্ট্যাটিভ প্রেডিকেট (যেমন: 好き, わかる, できる, あります, います)-এর ক্ষেত্রে সরাসরি অবজেক্টের মতো কাজ করে।',
    whenToUse: [
      'প্রশ্নসূচক শব্দ (だれ/なに/どれ) বাক্যের শুরুতে থাকলে (যেমন: だれが)。',
      'প্রাকৃতিক ঘটনা বা হঠাৎ দেখা নতুন কোনো দৃশ্য বর্ণনায় (যেমন: 雨が降っています)。',
      'অস্তিত্বের ক্রিয়া (あります, います) এর আগে (যেমন: ねこがいます)。',
      'পছন্দ/অপছন্দ (好き, 嫌い), দক্ষতা (上手, 下手), বোধগম্যতা (分かる) ও সামর্থ্যে (できる)।'
    ],
    whenNotToUse: [
      'যখন কোনো জানা বিষয় নিয়ে কেবল সাধারণ বিবরণ দেওয়া হচ্ছে, তখন が ব্যবহার করলে অতিরিক্ত অতিরঞ্জিত জোর পড়ে।',
      'ট্রানজিটিভ অ্যাকশন ক্রিয়ার সক্রিয় অবজেক্টে が বসে না (যেমন: ごはんが食べます ❌ -> ごはんを食べます ✅)।'
    ],
    importantNotesBn: 'বিদেশি শিক্ষার্থীদের সবচেয়ে বড় বিভ্রান্তি হয় 好き এবং 分かる নিয়ে। বাংলায় বলি "সুশি পছন্দ করি", তাই অনেকে を বসাতে চায়। কিন্তু জাপানিতে এটি কোনো কাজ নয়, তাই সর্বদা が বসে!',
    patternFormula: '[ কর্তা / বস্তু ] + が + [ ক্রিয়া / অস্তিত্ব / অনুভূতি ]',
    structureBreakdown: [
      { token: 'つくえのうえに', roleEn: 'Location', roleBn: 'স্থান', color: 'indigo' },
      { token: 'ほん', roleEn: 'Subject', roleBn: 'অস্তিত্বশীল বস্তু', color: 'emerald' },
      { token: 'が', roleEn: 'Subject Marker', roleBn: 'সাবজেক্ট মার্কার', color: 'rose' },
      { token: 'あります', roleEn: 'Existence Verb', roleBn: 'অস্তিত্ব ক্রিয়া', color: 'slate' }
    ],
    structureExplanationBn: 'এখানে "ほん" হলো সেই বস্তু যার অস্তিত্ব আছে, এবং "が" তা নির্দেশ করছে।',
    functionBranches: [
      {
        id: 'ga-identifier',
        titleEn: 'Identifier / Focus on Subject',
        titleBn: 'সুনির্দিষ্ট কর্তা শনাক্তকরণ',
        formula: '[Question Word / Specific Person] + が + [Action]',
        descriptionBn: '"কে করল?" প্রশ্নের উত্তরে নির্দিষ্ট ব্যক্তিকে তুলে ধরতে বসে।',
        sampleSentence: '田中さんが来ました。',
        sampleReading: 'たなかさん が きました。',
        sampleBn: 'তানাকা সাহেব এসেছেন (অন্য কেউ নয়, তিনিই)।'
      },
      {
        id: 'ga-state',
        titleEn: 'Preference & Ability Target',
        titleBn: 'পছন্দ, অপছন্দ ও দক্ষতার বিষয়',
        formula: '[Object of Desire / Skill] + が + [すき / わかる / できる]',
        descriptionBn: 'মনের অনুভূতি বা ক্ষমতার লক্ষ্য নির্দেশ করে।',
        sampleSentence: '私は日本語が分かります。',
        sampleReading: 'わたし は にほんご が わかります。',
        sampleBn: 'আমি জাপানি ভাষা বুঝি।'
      },
      {
        id: 'ga-existence',
        titleEn: 'Existence of People & Things',
        titleBn: 'মানুষ, প্রাণী ও বস্তুর অস্তিত্ব',
        formula: '[Item] + が + [あります / います]',
        descriptionBn: 'কোনো কিছু থাকা নির্দেশ করতে।',
        sampleSentence: '公園に子供がいます。',
        sampleReading: 'こうえん に こども が います。',
        sampleBn: 'পার্কে শিশুরা আছে।'
      }
    ],
    beginnerExamples: [
      {
        jp: '机の上に本があります。',
        hiragana: 'つくえ の うえ に ほん が あります。',
        romaji: 'Tsukue no ue ni hon ga arimasu.',
        bn: 'টেবিলের ওপর বই আছে।',
        en: 'There is a book on the desk.',
        breakdown: [
          { word: '机の上', meaningBn: 'টেবিলের ওপর', roleBn: 'স্থান' },
          { word: '本', meaningBn: 'বই', roleBn: 'বস্তু' },
          { word: 'が', meaningBn: 'সাবজেক্ট মার্কার', roleBn: 'পার্টিকেল' },
          { word: 'あります', meaningBn: 'আছে', roleBn: 'অস্তিত্ব' }
        ],
        particleFunctionNote: 'অচেতন বস্তুর অস্তিত্ব (あります)-এর সাথে が বসেছে।',
        category: 'beginner'
      },
      {
        jp: '私はすしが好きです。',
        hiragana: 'わたし は すし が すき です。',
        romaji: 'Watashi wa sushi ga suki desu.',
        bn: 'আমি সুশি পছন্দ করি।',
        en: 'I like sushi.',
        breakdown: [
          { word: '私', meaningBn: 'আমি', roleBn: 'টপিক' },
          { word: 'すし', meaningBn: 'সুশি', roleBn: 'পছন্দের বস্তু' },
          { word: '好き', meaningBn: 'পছন্দ', roleBn: 'না-বিশেষণ' }
        ],
        particleFunctionNote: 'পছন্দ (好き)-এর কাঙ্ক্ষিত বস্তু নির্দেশ করছে が।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '誰がこのケーキを作りましたか。',
        hiragana: 'だれ が この ケーキ を つくりました か。',
        romaji: 'Dare ga kono keeki o tsukurimashita ka.',
        bn: 'কে এই কেকটি তৈরি করেছে?',
        en: 'Who made this cake?',
        breakdown: [
          { word: '誰', meaningBn: 'কে', roleBn: 'প্রশ্নকর্তা' },
          { word: 'が', meaningBn: 'সাবজেক্ট মার্কার', roleBn: 'পার্টিকেল' },
          { word: 'ケーキ', meaningBn: 'কেক', roleBn: 'অবজেক্ট' }
        ],
        particleFunctionNote: 'প্রশ্নসূচক শব্দ だれ এর পর সর্বদা が বসে।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '窓を開けると、涼しい風が入ってきました。',
        hiragana: 'まど を あけると、すずしい かぜ が はいって きました。',
        romaji: 'Mado o akeru to, suzushii kaze ga haitte kimashita.',
        bn: 'জানালা খুলতেই শীতল বাতাস ভেতরে এলো।',
        en: 'When I opened the window, a cool breeze came in.',
        breakdown: [
          { word: '涼しい風', meaningBn: 'শীতল বাতাস', roleBn: 'কর্তা' },
          { word: '入ってきました', meaningBn: 'ভেতরে এলো', roleBn: 'ক্রিয়া' }
        ],
        particleFunctionNote: 'প্রাকৃতিক ঘটনার স্বতঃস্ফূর্ত আগমন বর্ণনায় が বসেছে।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ 日本語を分かります。',
        correctJp: '✅ 日本語が分かります。',
        whyIncorrectBn: '分かる কোনো সক্রিয় অ্যাকশন ভার্ব নয়, এটি একটি বোধশক্তি।',
        correctReasonBn: 'মানসিক সামর্থ্য ও বোধগম্যতায় সর্বদা が বসে।'
      }
    ],
    visualStory: {
      titleBn: 'লেজার পয়েন্টার 🎯',
      metaphor: 'ভিড়ের মধ্য থেকে সুনির্দিষ্ট একজনকে আঙুল দিয়ে পয়েন্ট করা।',
      diagram: '🎯 ───> [ たなかさん ] が きました',
      explanationBn: 'が একদম পিনপয়েন্ট করে চিহ্নিত করে কে আসল কর্তা।'
    },
    quickQuestions: [
      {
        questionJp: '部屋に猫（　）います。',
        questionBn: 'ঘরে বিড়াল আছে। বন্ধনীতে কী বসবে?',
        options: ['が', 'を', 'で', 'へ'],
        correctAnswer: 'が',
        explanationBn: 'সজীব প্রাণীর অস্তিত্ব (います) এর আগে সর্বদা が বসে।'
      }
    ]
  },

  // 3. を (O)
  {
    id: 'particle-o',
    symbol: 'を',
    hiragana: 'を',
    romaji: 'o (wo)',
    bengaliPronunciation: 'ও (বা মৃদু ওও)',
    level: 'N5',
    nameBn: 'অবজেক্ট মার্কার পার্টিকেল (Object Marker)',
    nameEn: 'Direct Object Particle',
    primaryFunctionBn: 'ক্রিয়ার সরাসরি কর্ম (Direct Object) বা অতিক্রমণের স্থান',
    summaryBn: 'কোনো সক্রিয় ট্রানজিটিভ ক্রিয়া সরাসরি যার ওপর প্রযুক্ত হয়, সেই কর্মপদকে চিহ্নিত করে। এছাড়া স্থান অতিক্রমের ক্ষেত্রেও বসে।',
    simpleMeaningBn: 'বাংলায় সাধারণত "-কে" বা কর্মপদ (যেমন: ভাত খাওয়া, পানি পান করা, চিঠি লেখা)।',
    realFunctionBn: '১. সক্রিয় ট্রানজিটিভ ভার্ব (他動詞)-এর সরাসরি কর্ম। ২. হাঁটা, ওড়া বা পার হওয়ার স্থান (যেমন: ব্রিজ পার হওয়া, আকাশে ওড়া)।',
    whenToUse: [
      'যেকোনো সকর্মক ক্রিয়ার কর্মের সাথে (যেমন: 本を読む, 水を飲む, テレビを見る)।',
      'কোনো স্থান ত্যাগ করা বা সেখান থেকে বের হওয়া (যেমন: 電車を降りる, 部屋を出る)।',
      'কোনো পথ বা স্থানের মধ্য দিয়ে চলাচল করা (যেমন: 道を渡る, 空を飛ぶ)।'
    ],
    whenNotToUse: [
      'অকর্মক ক্রিয়া (自動詞) বা স্থির অবস্থার ক্ষেত্রে を বসে না।',
      'পছন্দ (好き), অপছন্দ (嫌い), বোধগম্যতা (分かる) বা অস্তিত্বে (ある/いる) を বসে না।'
    ],
    importantNotesBn: 'হাঁটা (歩く) বা ওড়া (飛ぶ) মূলত অকর্মক ক্রিয়া হলেও, যখন একটি সুনির্দিষ্ট পথ বা আকাশ অতিক্রম করে, তখন সেই স্থানের পর を বসে!',
    patternFormula: '[ কর্ম / অবজেক্ট ] + を + [ সকর্মক ক্রিয়াপদ ]',
    structureBreakdown: [
      { token: 'わたしは', roleEn: 'Topic', roleBn: 'টপিক', color: 'indigo' },
      { token: 'りんご', roleEn: 'Object', roleBn: 'কর্ম / বস্তু', color: 'emerald' },
      { token: 'を', roleEn: 'Object Marker', roleBn: 'অবজেক্ট মার্কার', color: 'rose' },
      { token: 'たべます', roleEn: 'Action Verb', roleBn: 'সক্রিয় কাজ', color: 'slate' }
    ],
    structureExplanationBn: 'খাওয়ার কাজটি সরাসরি আপেলের ওপর প্রযুক্ত হচ্ছে, তাই আপেল を পেয়েছে।',
    functionBranches: [
      {
        id: 'o-direct-object',
        titleEn: 'Direct Object',
        titleBn: 'কাজের সরাসরি কর্মবস্তু',
        formula: '[Noun] + を + [Transitive Verb]',
        descriptionBn: 'ক্রিয়াপদের ফলাফল যা ভোগ করে।',
        sampleSentence: '毎日水を２リットル飲みます。',
        sampleReading: 'まいにち みず を にリットル のみます。',
        sampleBn: 'প্রতিদিন ২ লিটার পানি পান করি।'
      },
      {
        id: 'o-passing-through',
        titleEn: 'Passing Through Space',
        titleBn: 'স্থান বা পথ অতিক্রম করা',
        formula: '[Path / Space] + を + [Walk / Fly / Cross]',
        descriptionBn: 'কোনো স্থান ভেদ করে বা পার হয়ে চলা।',
        sampleSentence: '橋を渡って駅へ行きます。',
        sampleReading: 'はし を わたって えき へ いきます。',
        sampleBn: 'ব্রিজ পার হয়ে স্টেশনে যাই।'
      }
    ],
    beginnerExamples: [
      {
        jp: 'ご飯を食べます。',
        hiragana: 'ごはん を たべます。',
        romaji: 'Gohan o tabemasu.',
        bn: 'ভাত খাচ্ছি।',
        en: 'I eat rice / a meal.',
        breakdown: [
          { word: 'ご飯', meaningBn: 'ভাত / খাবার', roleBn: 'অবজেক্ট' },
          { word: 'を', meaningBn: 'অবজেক্ট মার্কার', roleBn: 'পার্টিকেল' },
          { word: '食べます', meaningBn: 'খাই', roleBn: 'ক্রিয়া' }
        ],
        particleFunctionNote: 'খাওয়ার সক্রিয় কাজটি ভাতের ওপর পড়ছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '毎朝コーヒーを一杯飲みます。',
        hiragana: 'まいあさ コーヒー を いっぱい のみます。',
        romaji: 'Maiasa koohii o ippai nomimasu.',
        bn: 'প্রতিদিন সকালে এক কাপ কফি পান করি।',
        en: 'I drink a cup of coffee every morning.',
        breakdown: [
          { word: 'コーヒー', meaningBn: 'কফি', roleBn: 'অবজেক্ট' },
          { word: '飲みます', meaningBn: 'পান করি', roleBn: 'ক্রিয়া' }
        ],
        particleFunctionNote: 'পান করার সরাসরি অবজেক্ট হলো কফি।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '鳥たちが青空を気持ちよさそうに飛んでいます。',
        hiragana: 'とりたち が あおぞら を きもちよさそう に とんでいます。',
        romaji: 'Toritachi ga aozora o kimochiyosasou ni tonde imasu.',
        bn: 'পাখিরা নীল আকাশে মনের সুখে উড়ে বেড়াচ্ছে।',
        en: 'Birds are flying pleasantly through the blue sky.',
        breakdown: [
          { word: '青空', meaningBn: 'নীল আকাশ', roleBn: 'অতিক্রমণের স্থান' },
          { word: '飛んでいます', meaningBn: 'উড়ছে', roleBn: 'ক্রিয়া' }
        ],
        particleFunctionNote: 'আকাশের মধ্য দিয়ে ওড়ার বিস্তৃতি বোঝাতে を বসেছে।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ すしを食べたいですから、すしを食べます（正常）。でも「すしを好きです」は間違い。',
        correctJp: '✅ すしが好きです。',
        whyIncorrectBn: 'পছন্দ কোনো অ্যাকশন নয়, এটি মানসিক ভাব।',
        correctReasonBn: 'অনুভূতির প্রকাশে が বাধ্যতামূলক।'
      }
    ],
    visualStory: {
      titleBn: 'কাজের লক্ষ্যবস্তু 🏹🍎',
      metaphor: 'তীর ছুড়লে তা সরাসরি গিয়ে আপেলকে বিদ্ধ করে।',
      diagram: '[ たべる ] 🏹 ───> 🍎 [ りんご ] を',
      explanationBn: 'যেকোনো কাজের প্রভাব যার ওপর পড়ে, তাকে চিহ্নিত করে を।'
    },
    quickQuestions: [
      {
        questionJp: 'テレビ（　）見ます。',
        questionBn: 'টেলিভিশন দেখছি। বন্ধনীতে কী বসবে?',
        options: ['を', 'が', 'に', 'で'],
        correctAnswer: 'を',
        explanationBn: 'টেলিভিশন দেখার সক্রিয় অবজেক্ট, তাই を বসবে।'
      }
    ]
  },

  // 4. に (NI)
  {
    id: 'particle-ni',
    symbol: 'に',
    hiragana: 'に',
    romaji: 'ni',
    bengaliPronunciation: 'নি',
    level: 'N5',
    nameBn: 'টার্গেট, সময় ও গন্তব্য পার্টিকেল (Target / Time / Location)',
    nameEn: 'Time, Destination & Target Particle',
    primaryFunctionBn: 'নির্দিষ্ট সময়, গন্তব্যের শেষ বিন্দু, স্থির অস্তিত্ব এবং কাজের প্রাপক নির্দেশ',
    summaryBn: 'জাপানি ভাষার অন্যতম বহুবিধ ব্যবহৃত পার্টিকেল। এটি নির্দিষ্ট সময়, গন্তব্য, অস্তিত্বের স্থান, কাজের প্রাপক এবং কাজের উদ্দেশ্য প্রকাশ করে।',
    simpleMeaningBn: 'বাংলায় সাধারণত "-এ", "-তে", "-য়", বা "-কে" (যেমন: স্কুলে, ৭টায়, টেবিলে, বন্ধুকে)।',
    realFunctionBn: '১. ঘড়ির কাঁটায় নির্দিষ্ট সময়বিন্দু। ২. চলাচল ক্রিয়ার অন্তিম গন্তব্য। ৩. স্থির অস্তিত্বের স্থান (いる/ある)। ৪. উদ্দিষ্ট ব্যক্তি বা প্রাপক (কাউকে কিছু দেওয়া)। ৫. কাজের উদ্দেশ্য (Verb stem + に行く)।',
    whenToUse: [
      'সংখ্যাবাচক নির্দিষ্ট সময়ের পর (যেমন: 7時に, 5月に, 日曜日に)।',
      'চলাচল ক্রিয়া (行く, 来る, 帰る) এর গন্তব্যের সাথে (যেমন: 学校に行く)।',
      'অস্তিত্বের স্থান (ある, いる, 住む) এর সাথে (যেমন: 部屋にいる)।',
      'কাউকে কিছু দেওয়া, বলা বা ফোন করার টার্গেটে (যেমন: 友達に電話する)।',
      'উদ্দেশ্য বোঝাতে ভার্ব স্টেমের পর (যেমন: 買いに行く)।'
    ],
    whenNotToUse: [
      'সাধারণ আপেক্ষিক সময়ের সাথে に বসে না (যেমন: 今日, 明日, 毎日, 毎朝 に ❌)।',
      'সক্রিয় কর্মের স্থানে に বসে না (সেখানে で বসে)।'
    ],
    importantNotesBn: 'সবচেয়ে বড় ভুল: "আজকে", "কালকে", "প্রতিদিন"-এর সাথে に বসানো যাবে না! 今日 (আজ), 明日 (কাল), 毎日 (প্রতিদিন)-এগুলো নিজেই ক্রিয়া-বিশেষণ, এদের পর に বসে না।',
    patternFormula: '[ স্থান / সময় / প্রাপক ] + に + [ ক্রিয়া / অবস্থা ]',
    structureBreakdown: [
      { token: 'わたしは', roleEn: 'Topic', roleBn: 'টপিক', color: 'indigo' },
      { token: '７じ', roleEn: 'Specific Time', roleBn: 'নির্দিষ্ট সময়', color: 'amber' },
      { token: 'に', roleEn: 'Time Marker', roleBn: 'সময় মার্কার', color: 'rose' },
      { token: 'おきます', roleEn: 'Verb', roleBn: 'ক্রিয়াপদ', color: 'slate' }
    ],
    structureExplanationBn: '৭টা একটি নির্দিষ্ট ঘড়ির সময়, তাই তার সাথে に বসেছে।',
    functionBranches: [
      {
        id: 'ni-time',
        titleEn: 'Specific Point in Time',
        titleBn: 'নির্দিষ্ট সময়বিন্দু',
        formula: 'Time (with numbers) + に',
        descriptionBn: 'নির্দিষ্ট ক্ষণ নির্দেশ করে।',
        sampleSentence: '毎朝６時半に起きます。',
        sampleReading: 'まいあさ ろくじはん に おきます。',
        sampleBn: 'প্রতিদিন সকাল সাড়ে ৬টায় ঘুম থেকে উঠি।'
      },
      {
        id: 'ni-dest',
        titleEn: 'Target Destination',
        titleBn: 'গন্তব্যের শেষ বিন্দু',
        formula: 'Destination + に + [行く / 来る / 帰る]',
        descriptionBn: 'যেখানে গিয়ে পৌঁছানো হচ্ছে।',
        sampleSentence: '来週日本に行きます。',
        sampleReading: 'らいしゅう にほん に いきます。',
        sampleBn: 'আগামী সপ্তাহে জাপানে যাব।'
      },
      {
        id: 'ni-exist',
        titleEn: 'Location of Existence',
        titleBn: 'স্থির অস্তিত্বের স্থান',
        formula: 'Place + に + [いる / ある / 住む]',
        descriptionBn: 'কোনো ব্যক্তি বা বস্তুর অবস্থান।',
        sampleSentence: '庭に犬がいます。',
        sampleReading: 'にわ に いぬ が います。',
        sampleBn: 'বাগানে একটি কুকুর আছে।'
      },
      {
        id: 'ni-target-person',
        titleEn: 'Recipient / Target Person',
        titleBn: 'উদ্দিষ্ট প্রাপক ব্যক্তি',
        formula: 'Person + に + [あげる / 言う / かける]',
        descriptionBn: 'যাকে কেন্দ্র করে কাজটি করা হচ্ছে।',
        sampleSentence: '母に花をプレゼントしました。',
        sampleReading: 'はは に はな を プレゼントしました。',
        sampleBn: 'মাকে ফুল উপহার দিয়েছি।'
      }
    ],
    beginnerExamples: [
      {
        jp: '学校に行きます。',
        hiragana: 'がっこう に いきます。',
        romaji: 'Gakkou ni ikimasu.',
        bn: 'স্কুলে যাচ্ছি।',
        en: 'I go to school.',
        breakdown: [
          { word: '学校', meaningBn: 'স্কুল', roleBn: 'গন্তব্য' },
          { word: 'に', meaningBn: 'গন্তব্য মার্কার', roleBn: 'পার্টিকেল' },
          { word: '行きます', meaningBn: 'যাই', roleBn: 'ক্রিয়া' }
        ],
        particleFunctionNote: 'চলাচল ক্রিয়ার গন্তব্য নির্দেশ করছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '週末、デパートへ服を買いに行きます。',
        hiragana: 'しゅうまつ、デパート へ ふく を かい に いきます。',
        romaji: 'Shuumatsu, depaato e fuku o kai ni ikimasu.',
        bn: 'সাপ্তাহিক ছুটির দিনে ডিপার্টমেন্টাল স্টোরে জামাকাপড় কিনতে যাই।',
        en: 'On the weekend, I go to the department store to buy clothes.',
        breakdown: [
          { word: '服を買い', meaningBn: 'পোশাক কেনা', roleBn: 'উদ্দেশ্য' },
          { word: 'に', meaningBn: 'উদ্দেশ্য মার্কার', roleBn: 'পার্টিকেল' }
        ],
        particleFunctionNote: 'যাওয়ার উদ্দেশ্য (কেনাকাটা) নির্দেশ করতে ভার্ব স্টেমের পর に বসেছে।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '困った時は、いつでも先生に相談してください。',
        hiragana: 'こまった とき は、いつでも せんせい に そうだんして ください。',
        romaji: 'Komatta toki wa, itsudemo sensei ni soudan shite kudasai.',
        bn: 'সমস্যায় পড়লে যেকোনো সময় শিক্ষকের সাথে পরামর্শ করুন।',
        en: 'When you are in trouble, please consult with the teacher anytime.',
        breakdown: [
          { word: '先生', meaningBn: 'শিক্ষক', roleBn: 'টার্গেট ব্যক্তি' },
          { word: 'に', meaningBn: 'পরামর্শের টার্গেট', roleBn: 'পার্টিকেল' }
        ],
        particleFunctionNote: 'পরামর্শের উদ্দিষ্ট ব্যক্তি হিসেবে に বসেছে।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ 明日に学校に行きます。',
        correctJp: '✅ 明日学校に行きます。',
        whyIncorrectBn: '明日 (আগামীকাল) আপেক্ষিক সময়। সংখ্যাবিহীন আপেক্ষিক সময়ে に বসে না।',
        correctReasonBn: 'শুধু সংখ্যাবাচক নির্দিষ্ট সময়ে (যেমন: 7時に) に বসে।'
      },
      {
        incorrectJp: '❌ 図書館に勉強します。',
        correctJp: '✅ 図書館で勉強します。',
        whyIncorrectBn: 'পড়াশোনা একটি সক্রিয় কাজ। সক্রিয় কাজের স্থান প্রকাশে で বসে, に নয়।',
        correctReasonBn: 'সক্রিয় কাজের স্থান সর্বদা で পায়।'
      }
    ],
    visualStory: {
      titleBn: 'পিন বা মার্কার 📍',
      metaphor: 'মানচিত্রে পিন মেরে সুনির্দিষ্ট লক্ষ্য বা ঘড়ির কাঁটায় কাঁটা বসানো।',
      diagram: '🏠 ────────✈️───────> 📍 [ がっこう ] に',
      explanationBn: 'নির্ধারিত বিন্দু বা লক্ষ্য ছোঁয়ার প্রতীক হলো に।'
    },
    quickQuestions: [
      {
        questionJp: '７時（　）起きます。',
        questionBn: '৭টায় ঘুম থেকে উঠি। বন্ধনীতে কী বসবে?',
        options: ['に', 'で', 'を', 'へ'],
        correctAnswer: 'に',
        explanationBn: 'নির্দিষ্ট সময়বিন্দুর সাথে に বসে।'
      }
    ]
  },

  // 5. で (DE)
  {
    id: 'particle-de',
    symbol: 'で',
    hiragana: 'で',
    romaji: 'de',
    bengaliPronunciation: 'দে',
    level: 'N5',
    nameBn: 'কাজের স্থান, মাধ্যম ও উপায় (Location of Action / Means)',
    nameEn: 'Location of Action, Means & Instrument Particle',
    primaryFunctionBn: 'যেখানে সক্রিয় কাজ ঘটে, যে মাধ্যমে বা বাহনে কাজ করা হয়, এবং কারণ নির্দেশ',
    summaryBn: 'কাজের স্থান (Action Location), উপকরণ বা মাধ্যম (By/With), যোগাযোগের ভাষা, পরিবহন এবং কারণ বা কারণগত অবস্থা নির্দেশ করে।',
    simpleMeaningBn: 'বাংলায় "-এ", "-তে", "-দিয়ে", "-দ্বারা", বা "-করে" (যেমন: বাসে করে, কলম দিয়ে, জাপানি ভাষায়)।',
    realFunctionBn: '১. কোনো স্থানে সক্রিয় গতিশীল কাজ সম্পাদন করা। ২. উপকরণ, যন্ত্র বা মাধ্যম (কাঁচি দিয়ে, বাসে চড়ে)। ৩. ভাষা বা প্রকাশমাধ্যম। ৪. উপাদান (কাঠ দিয়ে তৈরি)। ৫. কারণ বা প্রাকৃতিক দুর্যোগ (জ্বরে, টাইফুনে)।',
    whenToUse: [
      'যে স্থানে খাওয়া, পড়া, খেলা বা কাজ করার মতো কাজ ঘটছে (যেমন: 図書館で勉強する)।',
      'যানবাহন বা চলাচলের বাহন বোঝাতে (যেমন: バスで行く, 新幹線で)।',
      'কোনো যন্ত্র বা উপকরণ দিয়ে কাজ করতে (যেমন: はしで食べる, ペンで書く)।',
      'ভাষা বা মাধ্যম বোঝাতে (যেমন: 日本語で話す)।'
    ],
    whenNotToUse: [
      'স্রেফ থাকার ক্ষেত্রে (いる/ある) で বসে না, に বসে।',
      'পায়ে হেঁটে গেলে で বসে না (歩いて行く - 歩いて自体ই মাধ্যম)।'
    ],
    importantNotesBn: 'মনে রাখবেন: "পায়ে হেঁটে যাওয়া"-র ক্ষেত্রে কখনো 歩きで行く বা 歩いてで行く বলবেন না। পায়ে হেঁটে যাওয়া হলো 歩いて行きます (কোনো で নেই)।',
    patternFormula: '[ স্থান / মাধ্যম / উপকরণ ] + で + [ ক্রিয়া ]',
    structureBreakdown: [
      { token: 'としょかん', roleEn: 'Location', roleBn: 'কাজের স্থান', color: 'indigo' },
      { token: 'で', roleEn: 'Action Location Marker', roleBn: 'স্থানের মার্কার', color: 'rose' },
      { token: 'ほんを', roleEn: 'Object', roleBn: 'বই (অবজেক্ট)', color: 'emerald' },
      { token: 'よみます', roleEn: 'Action Verb', roleBn: 'পড়ার কাজ', color: 'slate' }
    ],
    structureExplanationBn: 'বই পড়ার কাজটি লাইব্রেরিতে সম্পন্ন হচ্ছে, তাই で বসেছে।',
    functionBranches: [
      {
        id: 'de-action-place',
        titleEn: 'Location of Dynamic Action',
        titleBn: 'কাজের স্থান',
        formula: 'Place + で + [Action Verb]',
        descriptionBn: 'যেখানে কোনো কাজ সক্রিয়ভাবে ঘটছে।',
        sampleSentence: 'レストランで美味しいパスタを食べました。',
        sampleReading: 'レストラン で おいしい パスタ を たべました。',
        sampleBn: 'রেস্তোরাঁয় সুস্বাদু পাস্তা খেয়েছি।'
      },
      {
        id: 'de-means',
        titleEn: 'Means / Instrument / Vehicle',
        titleBn: 'উপকরণ, বাহন বা মাধ্যম',
        formula: 'Tool / Vehicle / Language + で',
        descriptionBn: 'যা ব্যবহার করে কাজটি সমাধা করা হয়।',
        sampleSentence: '箸でご飯を食べます。',
        sampleReading: 'はし で ごはん を たべます。',
        sampleBn: 'চপস্টিক দিয়ে ভাত খাই।'
      }
    ],
    beginnerExamples: [
      {
        jp: 'バスで行きます。',
        hiragana: 'バス で いきます。',
        romaji: 'Basu de ikimasu.',
        bn: 'বাসে করে যাব।',
        en: 'I will go by bus.',
        breakdown: [
          { word: 'バス', meaningBn: 'বাস', roleBn: 'বাহন' },
          { word: 'で', meaningBn: 'মাধ্যম মার্কার', roleBn: 'পার্টিকেল' },
          { word: '行きます', meaningBn: 'যাব', roleBn: 'ক্রিয়া' }
        ],
        particleFunctionNote: 'যাতায়াতের বাহন হিসেবে বাসের পর で বসেছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '日本語で自己紹介をしてください。',
        hiragana: 'にほんご で じこしょうかい を して ください。',
        romaji: 'Nihongo de jikoshoukai o shite kudasai.',
        bn: 'জাপানি ভাষায় নিজের পরিচয় দিন।',
        en: 'Please introduce yourself in Japanese.',
        breakdown: [
          { word: '日本語', meaningBn: 'জাপানি ভাষা', roleBn: 'ভাষা/মাধ্যম' },
          { word: '自己紹介', meaningBn: 'আত্মপরিচয়', roleBn: 'অবজেক্ট' }
        ],
        particleFunctionNote: 'যোগাযোগের মাধ্যম ভাষা নির্দেশ করছে で।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '台風で電車が止まってしまいました。',
        hiragana: 'たいふう で でんしゃ が とまって しまいました。',
        romaji: 'Taifuu de densha ga tomatte shimaimashita.',
        bn: 'টাইফুনের কারণে ট্রেন চলাচল বন্ধ হয়ে গেছে।',
        en: 'The trains have stopped due to the typhoon.',
        breakdown: [
          { word: '台風', meaningBn: 'ঘূর্ণিঝড়/টাইফুন', roleBn: 'প্রাকৃতিক কারণ' },
          { word: '電車', meaningBn: 'ট্রেন', roleBn: 'সাবজেক্ট' }
        ],
        particleFunctionNote: 'প্রাকৃতিক দুর্যোগজনিত কারণ নির্দেশ করতে で বসেছে।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ 歩きで行きます。',
        correctJp: '✅ 歩いて行きます。',
        whyIncorrectBn: 'পায়ে হেঁটে চলা একটি শারীরিক ক্রিয়া, কোনো যান্ত্রিক বাহন নয়।',
        correctReasonBn: 'পায়ে হাঁটার ক্ষেত্রে で বসে না।'
      }
    ],
    visualStory: {
      titleBn: 'কর্মশালা বা মঞ্চ 🎪🔨',
      metaphor: 'একটি কর্মমুখর ঘর বা স্টেজ যেখানে নানা কর্মকাণ্ড চলছে।',
      diagram: '🎪 [ としょかん で 📖 べんきょう します ]',
      explanationBn: 'যে স্থানের ভেতরে কোনো হাত-পায়ের সক্রিয় কাজ চলছে, তাকে চিহ্নিত করে で।'
    },
    quickQuestions: [
      {
        questionJp: '図書館（　）本を読みます。',
        questionBn: 'লাইব্রেরিতে বই পড়ছি। বন্ধনীতে কী বসবে?',
        options: ['で', 'に', 'を', 'へ'],
        correctAnswer: 'で',
        explanationBn: 'পড়াশোনার কাজ সংঘটিত হওয়ার স্থান, তাই で বসবে।'
      }
    ]
  },

  // 6. へ (E)
  {
    id: 'particle-e',
    symbol: 'へ',
    hiragana: 'へ',
    romaji: 'e',
    bengaliPronunciation: 'এ',
    level: 'N5',
    nameBn: 'দিক ও অভিমুখ পার্টিকেল (Direction Particle)',
    nameEn: 'Direction / Heading Particle',
    primaryFunctionBn: 'চলাচলের দিক, অভিমুখ বা চিঠির সম্বোধন',
    summaryBn: 'কোনো গন্তব্যের দিকে অগ্রসর হওয়া বা যাত্রার অভিমুখ প্রকাশ করে। লিখিত হয় \'へ (হে)\' কিন্তু উচ্চারিত হয় \'এ (e)\'।',
    simpleMeaningBn: 'বাংলায় "-র দিকে", "-র উদ্দেশ্যে" বা চিঠির ক্ষেত্রে "প্রতি" (যেমন: জাপানের উদ্দেশ্যে, বন্ধুদের প্রতি)।',
    realFunctionBn: '১. ভ্রমণের দিক ও গতিমুখ। ২. চিঠিপত্র বা বার্তার প্রাপক সম্বোধনে (To someone)।',
    whenToUse: [
      'চলাচল ক্রিয়ার সাথে গন্তব্যের দিকে যাত্রার মানসিক অনুভূতি প্রকাশে (যেমন: 日本へ行く)。',
      'চিঠি, ইমেইল বা উপহারের কার্ডের প্রাপকের নামের পর (যেমন: 田中さんへ)。'
    ],
    whenNotToUse: [
      'স্থির অস্তিত্বের স্থানে へ বসে না (যেমন: 部屋へいる ❌ -> 部屋にいる ✅)।',
      'সময়ের সাথে へ বসে না।'
    ],
    importantNotesBn: 'চিঠির শুরুতে খামের ওপরে সর্বদা へ বসে, に বসে না (যেমন: 母へ - মায়ের প্রতি)।',
    patternFormula: '[ দিক / গন্তব্য / প্রাপক ] + へ + [ ক্রিয়া / বার্তা ]',
    structureBreakdown: [
      { token: 'にほん', roleEn: 'Direction', roleBn: 'যাত্রার দিক', color: 'indigo' },
      { token: 'へ', roleEn: 'Direction Marker', roleBn: 'দিক মার্কার', color: 'cyan' },
      { token: 'いきます', roleEn: 'Movement Verb', roleBn: 'চলাচল ক্রিয়া', color: 'slate' }
    ],
    structureExplanationBn: 'জাপানের উদ্দেশ্যে যাত্রা প্রকাশ করছে।',
    functionBranches: [
      {
        id: 'e-direction',
        titleEn: 'Direction of Movement',
        titleBn: 'চলাচলের অভিমুখ',
        formula: 'Direction + へ + [行く / 来る / 帰る]',
        descriptionBn: 'কোনো দিকে যাত্রা শুরু করা।',
        sampleSentence: '西へ向かって進みます。',
        sampleReading: 'にし へ むかって すすみます。',
        sampleBn: 'পশ্চিমের দিকে অগ্রসর হচ্ছি।'
      },
      {
        id: 'e-letter',
        titleEn: 'Letter / Message Recipient',
        titleBn: 'চিঠি বা বার্তার প্রাপক',
        formula: 'Recipient + へ',
        descriptionBn: 'কার উদ্দেশ্যে বার্তাটি লেখা।',
        sampleSentence: '先生へ：いつもありがとうございます。',
        sampleReading: 'せんせい へ：いつも ありがとうございます。',
        sampleBn: 'শিক্ষকের প্রতি: আপনার প্রতি অশেষ কৃতজ্ঞতা।'
      }
    ],
    beginnerExamples: [
      {
        jp: '日本へ行きます。',
        hiragana: 'にほん へ いきます。',
        romaji: 'Nihon e ikimasu.',
        bn: 'জাপানের উদ্দেশ্যে যাব।',
        en: 'I head to Japan.',
        breakdown: [
          { word: '日本', meaningBn: 'জাপান', roleBn: 'অভিমুখ' },
          { word: 'へ', meaningBn: 'দিক মার্কার', roleBn: 'পার্টিকেল' }
        ],
        particleFunctionNote: 'জাপানের দিকে যাত্রা নির্দেশ করছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '友達へメールを送りました。',
        hiragana: 'ともだち へ メール を おくりました。',
        romaji: 'Tomodachi e meeru o okurimashita.',
        bn: 'বন্ধুর উদ্দেশ্যে ইমেইল পাঠিয়েছি।',
        en: 'I sent an email to my friend.',
        breakdown: [
          { word: '友達', meaningBn: 'বন্ধু', roleBn: 'প্রাপক' },
          { word: 'メール', meaningBn: 'ইমেইল', roleBn: 'অবজেক্ট' }
        ],
        particleFunctionNote: 'বার্তা প্রেরণের প্রাপক নির্দেশ করছে।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '未来への第一歩を踏み出しましょう。',
        hiragana: 'みらい への だいいっぽ を ふみだしましょう。',
        romaji: 'Mirai e no daiippo o fumidashimashou.',
        bn: 'চলুন ভবিষ্যতের পানে প্রথম পদক্ষেপ ফেলি।',
        en: 'Let us take the first step towards the future.',
        breakdown: [
          { word: '未来への', meaningBn: 'ভবিষ্যতের পানে', roleBn: 'দিক নির্দেশক' },
          { word: '第一歩', meaningBn: 'প্রথম পদক্ষেপ', roleBn: 'অবজেক্ট' }
        ],
        particleFunctionNote: 'へ の যৌগিক রূপ হিসেবে "ভবিষ্যতের উদ্দেশ্যে" প্রকাশ করছে।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ 家へいます。',
        correctJp: '✅ 家にいます。',
        whyIncorrectBn: 'থাকা (いる) স্থির অস্তিত্ব, কোনো চলাচল বা দিক নয়।',
        correctReasonBn: 'স্থির অবস্থানে সর্বদা に বসে।'
      }
    ],
    visualStory: {
      titleBn: 'দিকসূচক তীর 🧭',
      metaphor: 'একটি কম্পাস যা দূর দিগন্তের যাত্রাপথ নির্দেশ করছে।',
      diagram: '🧭 ───────> ───> [ とうきょう ] へ',
      explanationBn: 'চূড়ান্ত লক্ষ্য স্পর্শ করার চেয়ে যাত্রার পথকে ভালোবাসে へ।'
    },
    quickQuestions: [
      {
        questionJp: '母（　）手紙を書きました。タイトルは「お母さん（　）」',
        questionBn: 'চিঠির শিরোনামে "মায়ের প্রতি" লিখতে কী বসবে?',
        options: ['へ', 'で', 'を', 'が'],
        correctAnswer: 'へ',
        explanationBn: 'চিঠি বা বার্তার প্রাপক সম্বোধনে সর্বদা へ বসে।'
      }
    ]
  },

  // 7. と (TO)
  {
    id: 'particle-to',
    symbol: 'と',
    hiragana: 'と',
    romaji: 'to',
    bengaliPronunciation: 'তো',
    level: 'N5',
    nameBn: 'সঙ্গী ও সম্পূর্ণ তালিকা ("এবং / সাথে")',
    nameEn: 'Complete Listing & Companion Particle',
    primaryFunctionBn: 'কারো সাথে যৌথভাবে কাজ করা এবং সম্পূর্ণ ও সীমাবদ্ধ তালিকা তৈরি',
    summaryBn: 'ব্যক্তির সাথে "একসাথে কাজ করা" (With) এবং জিনিসপত্রের ক্ষেত্রে নিশ্চিত ও সম্পূর্ণ তালিকা (Exhaustive And) নির্দেশ করে।',
    simpleMeaningBn: 'বাংলায় "এবং", "ও", অথবা "সাথে" (যেমন: আমার এবং তোমার, বন্ধুর সাথে)।',
    realFunctionBn: '১. যৌথ কর্মকাণ্ডের অংশীদার (Partner in action)। ২. সম্পূর্ণ তালিকা—অর্থাৎ যা উল্লেখ করা হয়েছে তার বাইরে কিছু নেই। ৩. উক্তি উদ্ধৃতি (Quotation: ...と言いました)।',
    whenToUse: [
      'কারো সাথে মিলে কোনো কাজ করতে (যেমন: 友達と映画を見る)।',
      'নির্দিষ্ট ও সীমিত জিনিসের সবকটি উল্লেখ করতে (যেমন: りんごとバナナ - আপেল এবং কলা, আর কিছু নয়)।',
      'কারো কথা বা চিন্তাভাবনা হুবহু উদ্ধৃত করতে (যেমন: と思う, と言う)।'
    ],
    whenNotToUse: [
      'অনেক জিনিস থেকে মাত্র দুই-একটি উদাহরণ দিতে と বসবে না (সেখানে や বসবে)।'
    ],
    importantNotesBn: 'যদি আপনি বলেন "りんごとみかんを買いました", এর অর্থ আপনি শুধুই আপেল আর কমলা কিনেছেন। কিন্তু যদি আরও ফল কিনে থাকেন, তবে と এর বদলে や ব্যবহার করতে হবে।',
    patternFormula: '[ ব্যক্তি / বস্তু ] + と + [ সঙ্গী / পরবর্তী বস্তু ]',
    structureBreakdown: [
      { token: 'ともだち', roleEn: 'Companion', roleBn: 'সঙ্গী ব্যক্তি', color: 'indigo' },
      { token: 'と', roleEn: 'With Marker', roleBn: 'সাথে মার্কার', color: 'purple' },
      { token: 'えいがを', roleEn: 'Object', roleBn: 'সিনেমা', color: 'emerald' },
      { token: 'みます', roleEn: 'Verb', roleBn: 'দেখা', color: 'slate' }
    ],
    structureExplanationBn: 'বন্ধুর সাথে সিনেমা দেখার কাজটি যৌথভাবে হচ্ছে।',
    functionBranches: [
      {
        id: 'to-companion',
        titleEn: 'Companion in Action',
        titleBn: 'যৌথ কাজের সঙ্গী (With)',
        formula: 'Person + と + [Action]',
        descriptionBn: 'একসাথে কোনো কাজ সম্পন্ন করা।',
        sampleSentence: '家族と旅行に行きました。',
        sampleReading: 'かぞく と りょこう に いきました。',
        sampleBn: 'পরিবারের সাথে ভ্রমণে গিয়েছিলাম।'
      },
      {
        id: 'to-listing',
        titleEn: 'Exhaustive Listing',
        titleBn: 'সম্পূর্ণ তালিকা (And)',
        formula: '[Noun A] + と + [Noun B]',
        descriptionBn: 'তালিকার সব কটি আইটেমের সমাহার।',
        sampleSentence: 'ペンとノートを買いました。',
        sampleReading: 'ペン と ノート を かいました。',
        sampleBn: 'কলম এবং খাতা কিনেছি (শুধুই এই দুটি)।'
      }
    ],
    beginnerExamples: [
      {
        jp: '友達と話します。',
        hiragana: 'ともだち と はなします。',
        romaji: 'Tomodachi to hanashimasu.',
        bn: 'বন্ধুর সাথে কথা বলব।',
        en: 'I talk with a friend.',
        breakdown: [
          { word: '友達', meaningBn: 'বন্ধু', roleBn: 'সঙ্গী' },
          { word: 'と', meaningBn: 'সাথে মার্কার', roleBn: 'পার্টিকেল' }
        ],
        particleFunctionNote: 'কথা বলার কাজের অংশীদার নির্দেশ করছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '朝ご飯はパンと卵でした。',
        hiragana: 'あさごはん は パン と たまご でした。',
        romaji: 'Asagohan wa pan to tamago deshita.',
        bn: 'সকালের নাস্তা ছিল পাউরুটি এবং ডিম।',
        en: 'Breakfast was bread and eggs.',
        breakdown: [
          { word: 'パン', meaningBn: 'পাউরুটি', roleBn: 'আইটেম ১' },
          { word: '卵', meaningBn: 'ডিম', roleBn: 'আইটেম ২' }
        ],
        particleFunctionNote: 'নাস্তার সম্পূর্ণ মেনু নিশ্চিত করছে と।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '先生は「明日はテストです」と言いました。',
        hiragana: 'せんせい は 「あした は テスト です」 と いいました。',
        romaji: 'Sensei wa "Ashita wa tesuto desu" to iimashita.',
        bn: 'শিক্ষক বলেছিলেন "আগামীকাল পরীক্ষা।" ',
        en: 'The teacher said, "Tomorrow is the test."',
        breakdown: [
          { word: 'と', meaningBn: 'উদ্ধৃতি মার্কার', roleBn: 'পার্টিকেল' },
          { word: '言いました', meaningBn: 'বলেছিলেন', roleBn: 'ক্রিয়া' }
        ],
        particleFunctionNote: 'উদ্ধৃতি বা হুবহু কথা প্রকাশের মার্কার হিসেবে と বসেছে।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ かばんに本とペンなどがあります。',
        correctJp: '✅ かばんに本やペンなどがあります。',
        whyIncorrectBn: 'など (ইত্যাদি) অসম্পূর্ণ তালিকা নির্দেশ করে, কিন্তু と সম্পূর্ণ তালিকা।',
        correctReasonBn: 'অসম্পূর্ণ তালিকায় や বসে।'
      }
    ],
    visualStory: {
      titleBn: 'হাত মেলানো 🤝',
      metaphor: 'দুজন মানুষ একসাথে হাত ধরে পথ চলছে।',
      diagram: '👤 🤝 👤 [ ともだち と いっしょに ]',
      explanationBn: 'একসাথে কোনো কাজ ভাগ করে নেওয়ার চিরন্তন চিহ্ন と।'
    },
    quickQuestions: [
      {
        questionJp: '田中さん（　）一緒に昼ご飯を食べました。',
        questionBn: 'তানাকা সাহেবের সাথে একসাথে দুপুরের খাবার খেয়েছি। বন্ধনীতে কী বসবে?',
        options: ['と', 'を', 'に', 'で'],
        correctAnswer: 'と',
        explanationBn: 'কারো সাথে যৌথভাবে কোনো কাজ সম্পন্ন করতে と বসে।'
      }
    ]
  },

  // 8. も (MO)
  {
    id: 'particle-mo',
    symbol: 'も',
    hiragana: 'も',
    romaji: 'mo',
    bengaliPronunciation: 'মো',
    level: 'N5',
    nameBn: 'অন্তর্ভুক্তি মার্কার ("ও / আরও / Too")',
    nameEn: 'Inclusion / Also Particle',
    primaryFunctionBn: 'পূর্ববর্তী তথ্যের সাথে সমরূপতা বা অন্তর্ভুক্তি নির্দেশ',
    summaryBn: 'আগের বিষয়ের মতোই এটিও প্রযোজ্য বোঝাতে ব্যবহৃত হয়। গুরুত্বপূর্ণ নিয়ম: এটি は, が এবং を-কে সরিয়ে তাদের স্থান দখল করে।',
    simpleMeaningBn: 'বাংলায় "-ও" (যেমন: আমিও, এটিও, কালকেও)।',
    realFunctionBn: '১. অন্তর্ভুক্তি বা সমজাতীয়তা (Too / Also)। ২. না-বোধক বাক্যে সর্বাত্মক অস্বীকৃতি (যেমন: 何も食べません - কিছুই খাইনি)। ৩. সংখ্যার আধিক্য বোঝাতে (যেমন: 10回も - দশ-দশ বার!)।',
    whenToUse: [
      'অন্য কারো মতো একই বৈশিষ্ট্য বোঝাতে (যেমন: 私も学生です)।',
      'প্রশ্নবোধক শব্দের সাথে না-বোধক বাক্য জুড়ে দিয়ে পূর্ণ অস্বীকৃতিতে (যেমন: 誰もいない, 何もない)।',
      'একাধিক জিনিসের একই অবস্থা তুলে ধরতে (A も B も)।'
    ],
    whenNotToUse: [
      'は, が বা を এর সাথে জোড়া লাগিয়ে はも বা をも লেখা যায় না! も বসলে তারা বিলুপ্ত হয়।'
    ],
    importantNotesBn: 'সতর্কতা: 私はも ❌ বা 水をも ❌ লেখা যাবে না। শুধু 私も এবং 水も হবে!',
    patternFormula: '[ বিশেষ্য ] + も + [ সমরূপ তথ্য ]',
    structureBreakdown: [
      { token: 'わたし', roleEn: 'Noun', roleBn: 'ব্যক্তি', color: 'indigo' },
      { token: 'も', roleEn: 'Also Marker', roleBn: 'অন্তর্ভুক্তি মার্কার', color: 'purple' },
      { token: 'がくせい', roleEn: 'Information', roleBn: 'তথ্য', color: 'emerald' },
      { token: 'です', roleEn: 'Ending', roleBn: 'সমাপ্তি', color: 'slate' }
    ],
    structureExplanationBn: 'অন্য কেউ ছাত্র, এবং "আমিও" একজন ছাত্র।',
    functionBranches: [
      {
        id: 'mo-also',
        titleEn: 'Inclusion (Also / Too)',
        titleBn: 'অন্তর্ভুক্তি ("ও")',
        formula: 'Noun + も',
        descriptionBn: 'আগের তথ্যের সাথে মিল প্রকাশে।',
        sampleSentence: 'ジョンさんも来ます。',
        sampleReading: 'ジョンさん も きます。',
        sampleBn: 'জন সাহেবও আসবেন।'
      },
      {
        id: 'mo-complete-negation',
        titleEn: 'Complete Negative with Question Words',
        titleBn: 'সম্পূর্ণ অস্বীকৃতি ("কিছুই না")',
        formula: '[Question Word] + も + [Negative Verb]',
        descriptionBn: 'একটিও নয় এমন ভাব প্রকাশ।',
        sampleSentence: '昨日は何もしませんでした。',
        sampleReading: 'きのう は なにも しませんでした。',
        sampleBn: 'গতকাল কিছুই করিনি।'
      }
    ],
    beginnerExamples: [
      {
        jp: '私もそう思います。',
        hiragana: 'わたし も そう おもいます。',
        romaji: 'Watashi mo sou omoimasu.',
        bn: 'আমিও তা-ই মনে করি।',
        en: 'I think so too.',
        breakdown: [
          { word: '私', meaningBn: 'আমি', roleBn: 'ব্যক্তি' },
          { word: 'も', meaningBn: 'অন্তর্ভুক্তি মার্কার', roleBn: 'পার্টিকেল' }
        ],
        particleFunctionNote: 'অন্যের মতামতের সাথে নিজের মতের মিল নির্দেশ করছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '冷蔵庫には何もありません。',
        hiragana: 'れいぞうこ に は なに も ありません。',
        romaji: 'Reizouko ni wa nani mo arimasen.',
        bn: 'ফ্রিজে কিছুই নেই।',
        en: 'There is nothing in the refrigerator.',
        breakdown: [
          { word: '何', meaningBn: 'কী', roleBn: 'প্রশ্নশব্দ' },
          { word: 'も', meaningBn: 'অস্বীকৃতি', roleBn: 'পার্টিকেল' },
          { word: 'ありません', meaningBn: 'নেই', roleBn: 'না-বোধক' }
        ],
        particleFunctionNote: 'প্রশ্নশব্দের সাথে যুক্ত হয়ে পূর্ণ শূন্যতা নির্দেশ করছে।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '彼は１日に５時間も日本語を勉強しています。',
        hiragana: 'かれ は いちにち に ごじかん も にほんご を べんきょう しています。',
        romaji: 'Kare wa ichinichi ni gojikan mo nihongo o benkyou shite imasu.',
        bn: 'তিনি দিনে ৫-৫ ঘণ্টা ধরে জাপানি ভাষা পড়েন!',
        en: 'He studies Japanese for as much as 5 hours a day!',
        breakdown: [
          { word: '５時間も', meaningBn: '৫ ঘণ্টা পর্যন্ত (বিশাল সময়)', roleBn: 'আধিক্য' }
        ],
        particleFunctionNote: 'সময়ের বিশালতা দেখে বক্তার বিস্ময় প্রকাশ করছে も।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ 水をも飲みました。',
        correctJp: '✅ 水も飲みました。',
        whyIncorrectBn: 'も সরাসরি を-কে প্রতিস্থাপন করে। দুটি একসাথে বসতে পারে না।',
        correctReasonBn: 'শুধু 水も বসবে।'
      }
    ],
    visualStory: {
      titleBn: 'প্লাস চিহ্ন বা আয়না ➕🪞',
      metaphor: 'আগের ছবির পাশে আরেকটি একই ছবি যোগ করা।',
      diagram: '👤 ➕ 👤 [ わたし も ]',
      explanationBn: 'আগের তথ্যের পুনরাবৃত্তি ও মিল প্রকাশ করার অলঙ্কার も।'
    },
    quickQuestions: [
      {
        questionJp: '田中さんは学生です。マイクさん（　）学生です。',
        questionBn: 'তানাকা সাহেব ছাত্র। মাইক সাহেবও ছাত্র। বন্ধনীতে কী বসবে?',
        options: ['も', 'は', 'を', 'が'],
        correctAnswer: 'も',
        explanationBn: 'একই পরিচয় অন্তর্ভুক্ত করতে も বসে।'
      }
    ]
  },

  // 9. の (NO)
  {
    id: 'particle-no',
    symbol: 'の',
    hiragana: 'の',
    romaji: 'no',
    bengaliPronunciation: 'নো',
    level: 'N5',
    nameBn: 'সম্বন্ধ পদ ও মডিফায়ার ("র / এর")',
    nameEn: 'Possessive & Modifying Particle',
    primaryFunctionBn: 'মালিকানা, সম্বন্ধ এবং দুটি বিশেষ্যকে পরস্পর সংযুক্ত করা',
    summaryBn: 'মালিকানা (Possessive), কারো সাথে সম্পর্ক, কোনো দেশের তৈরি বা উপাদান, এবং দুটি বিশেষ্যকে একসাথে বাঁধতে ব্যবহৃত হয়।',
    simpleMeaningBn: 'বাংলায় "-র" বা "-এর" (যেমন: আমার বই, জাপানের গাড়ি, কাঠের টেবিল)।',
    realFunctionBn: '১. মালিকানা (Possession)। ২. উৎপত্তি বা ব্র্যান্ড (Made in / Origin)। ৩. উপাদান (Material)। ৪. পূর্ববর্তী বিশেষ্যকে দিয়ে পরবর্তী বিশেষ্যকে বিশেষায়িত করা (Modifier)। ৫. সর্বনামীয় রূপ (যেমন: 私の - আমারটি)।',
    whenToUse: [
      'মালিকানা প্রকাশে: 私の本 (আমার বই)।',
      'উৎস বা ব্র্যান্ড: 日本の車 (জাপানি গাড়ি)।',
      'উপাদান: 木の机 (কাঠের টেবিল)।',
      'অবস্থান সম্পর্ক: 机の上 (টেবিলের ওপর)।'
    ],
    whenNotToUse: [
      'ই-বিশেষণের সাথে の বসে না (যেমন: 高いの本 ❌ -> 高い本 ✅)।'
    ],
    importantNotesBn: 'জাপানিতে দুটি বিশেষ্য পাশাপাশি বসতে পারে না, মাঝে অবশ্যই の লাগে (যেমন: ঢাকা ইউনিভার্সিটি = ダッカの大学)।',
    patternFormula: '[ বিশেষ্য A ] + の + [ বিশেষ্য B ]',
    structureBreakdown: [
      { token: 'わたし', roleEn: 'Owner', roleBn: 'মালিক', color: 'indigo' },
      { token: 'の', roleEn: 'Possessive Marker', roleBn: 'সম্বন্ধ মার্কার', color: 'rose' },
      { token: 'かばん', roleEn: 'Item', roleBn: 'বস্তু', color: 'emerald' }
    ],
    structureExplanationBn: 'আমার সাথে ব্যাগের মালিকানা সম্বন্ধ নির্দেশ করছে।',
    functionBranches: [
      {
        id: 'no-possess',
        titleEn: 'Possession & Ownership',
        titleBn: 'মালিকানা ("আমার / তোমার")',
        formula: 'Owner + の + Item',
        descriptionBn: 'কার জিনিস তা বোঝাতে।',
        sampleSentence: 'これは誰の傘ですか。',
        sampleReading: 'これ は だれ の かさ です か。',
        sampleBn: 'এটি কার ছাতা?'
      },
      {
        id: 'no-origin',
        titleEn: 'Origin / Organization / Affiliation',
        titleBn: 'সংস্থা বা দেশের সাথে সম্পর্ক',
        formula: 'Country / Company + の + Item',
        descriptionBn: 'কোথাকার জিনিস বা কোন প্রতিষ্ঠানের কর্মী।',
        sampleSentence: '私はIMCの社員です。',
        sampleReading: 'わたし は IMC の しゃいん です。',
        sampleBn: 'আমি আইএমসি কোম্পানির কর্মী।'
      }
    ],
    beginnerExamples: [
      {
        jp: '私の本です。',
        hiragana: 'わたし の ほん です。',
        romaji: 'Watashi no hon desu.',
        bn: 'আমার বই।',
        en: 'It is my book.',
        breakdown: [
          { word: '私', meaningBn: 'আমি', roleBn: 'মালিক' },
          { word: 'の', meaningBn: 'এর মার্কার', roleBn: 'পার্টিকেল' },
          { word: '本', meaningBn: 'বই', roleBn: 'বস্তু' }
        ],
        particleFunctionNote: 'মালিকানা সম্পর্ক তৈরি করছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '日本の桜は本当に綺麗ですね。',
        hiragana: 'にほん の さくら は ほんとうに きれい です ね。',
        romaji: 'Nihon no sakura wa hontouni kirei desu ne.',
        bn: 'জাপানের চেরি ফুল সত্যিই চমৎকার, তাই না?',
        en: 'Japan\'s cherry blossoms are truly beautiful, aren\'t they?',
        breakdown: [
          { word: '日本の桜', meaningBn: 'জাপানের চেরি ফুল', roleBn: 'সম্পর্ক' }
        ],
        particleFunctionNote: 'দেশ ও চেরি ফুলের সম্পর্ক স্থাপন করেছে の।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: 'どれがあなたの傘ですか。この黒いのが私のです。',
        hiragana: 'どれ が あなた の かさ です か。この くろい の が わたし の です。',
        romaji: 'Dore ga anata no kasa desu ka. Kono kuroi no ga watashi no desu.',
        bn: 'কোনটি আপনার ছাতা? এই কালোটা আমার।',
        en: 'Which one is your umbrella? This black one is mine.',
        breakdown: [
          { word: '黒いの', meaningBn: 'কালোটি', roleBn: 'বস্তুর বিকল্প の' },
          { word: '私のです', meaningBn: 'আমারটি', roleBn: 'সর্বনামীয় の' }
        ],
        particleFunctionNote: 'ছাতা শব্দটি বারবার না বলে の দিয়ে ছাতাকে প্রতিস্থাপন করেছে।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ 赤いの車を買いました。',
        correctJp: '✅ 赤い車を買いました。',
        whyIncorrectBn: '赤い একটি ই-বিশেষণ। ই-বিশেষণের পর সরাসরি বিশেষ্য বসে, の বসে না।',
        correctReasonBn: 'শুধু বিশেষ্য + の + বিশেষ্য বসে।'
      }
    ],
    visualStory: {
      titleBn: 'সংযোজক সুতো 🧵',
      metaphor: 'একটি অদৃশ্য সুতো যা দুটি বিশেষ্যকে শক্ত করে গিঁট দিয়ে বেঁধে রাখে।',
      diagram: '[ わたし ] ───🧵 の ───> [ ほん ]',
      explanationBn: 'মালিকানা ও সম্পর্কের সংযোগকারী সেতু の।'
    },
    quickQuestions: [
      {
        questionJp: 'これ（　）田中さん（　）鞄です。',
        questionBn: 'এটি তানাকা সাহেবের ব্যাগ। যথাক্রমে কোন পার্টিকেল বসবে?',
        options: ['は / の', 'の / は', 'を / の', 'に / は'],
        correctAnswer: 'は / の',
        explanationBn: 'এটি বাক্যের টপিক (は) এবং তানাকা সাহেবের ব্যাগ (の)।'
      }
    ]
  },

  // 10. から (KARA)
  {
    id: 'particle-kara',
    symbol: 'から',
    hiragana: 'から',
    romaji: 'kara',
    bengaliPronunciation: 'কারা',
    level: 'N5',
    nameBn: 'উৎস, সূচনা ও কারণ ("হতে / থেকে / যেহেতু")',
    nameEn: 'Starting Point & Reason Particle',
    primaryFunctionBn: 'সময় বা স্থানের সূচনাবিন্দু এবং বাক্যের কারণ নির্দেশ',
    summaryBn: 'কোনো স্থান বা সময়ের সূচনা (From) এবং কারণ প্রকাশের ক্ষেত্রে "যেহেতু / কারণ" (Because) হিসেবে ব্যবহৃত হয়।',
    simpleMeaningBn: 'বাংলায় "থেকে", "হতে", বা "যেহেতু / কারণ" (যেমন: ৯টা থেকে, ঢাকা থেকে, গরম লাগছে বলে)।',
    realFunctionBn: '১. স্থানের প্রারম্ভিক বিন্দু (Origin)। ২. সময়ের সূচনা (Starting Time)। ৩. উপকরণ (কাঁচামাল)। ৪. কারণ বা যুক্তি (Reason conjunction)।',
    whenToUse: [
      'সময় শুরুর নির্দেশনায় (যেমন: 9時から)।',
      'স্থান থেকে আগমন নির্দেশনায় (যেমন: バングラデシュから来ました)。',
      'কারণ জানিয়ে অনুরোধ বা পরিণতি বলতে (যেমন: 暑いですから、窓を開けてください)。'
    ],
    whenNotToUse: [
      'সমাপ্তি বিন্দু নির্দেশ করতে বসে না (সেখানে まで বসে)।'
    ],
    importantNotesBn: 'বাক্যের শেষে から বসলে তা "কারণ বা যেহেতু" অর্থ দেয় (যেমন: 雨ですから = যেহেতু বৃষ্টি হচ্ছে)।',
    patternFormula: '[ স্থান / সময় / কারণ ] + から + [ ক্রিয়া / বাক্য ]',
    structureBreakdown: [
      { token: 'くじ', roleEn: 'Start Time', roleBn: 'শুরুর সময়', color: 'amber' },
      { token: 'から', roleEn: 'From Marker', roleBn: 'থেকে মার্কার', color: 'rose' },
      { token: 'はたらきます', roleEn: 'Verb', roleBn: 'কাজ করা', color: 'slate' }
    ],
    structureExplanationBn: '৯টায় কাজ শুরুর মুহূর্তটি নির্দেশ করছে から।',
    functionBranches: [
      {
        id: 'kara-time-place',
        titleEn: 'Starting Point in Time / Space',
        titleBn: 'সময় বা স্থানের সূচনা (From)',
        formula: 'Time / Place + から',
        descriptionBn: 'কোথা থেকে বা কখন থেকে শুরু।',
        sampleSentence: 'ダッカから飛行機に乗りました。',
        sampleReading: 'ダッカ から ひこうき に のりました。',
        sampleBn: 'ঢাকা থেকে বিমানে চড়েছি।'
      },
      {
        id: 'kara-reason',
        titleEn: 'Reason / Cause (Because)',
        titleBn: 'কারণ বা যুক্তি ("যেহেতু")',
        formula: 'Sentence + から',
        descriptionBn: 'কোনো কাজের প্রেক্ষাপট ব্যাখ্যা করতে।',
        sampleSentence: '時間がありませんから、急ぎましょう。',
        sampleReading: 'じかん が ありません から、いそぎましょう。',
        sampleBn: 'যেহেতু সময় নেই, তাই চলুন তাড়াহুড়ো করি।'
      }
    ],
    beginnerExamples: [
      {
        jp: 'バングラデシュから来ました。',
        hiragana: 'バングラデシュ から きました。',
        romaji: 'Banguradeshu kara kimashita.',
        bn: 'বাংলাদেশ থেকে এসেছি।',
        en: 'I came from Bangladesh.',
        breakdown: [
          { word: 'バングラデシュ', meaningBn: 'বাংলাদেশ', roleBn: 'উৎস স্থান' },
          { word: 'から', meaningBn: 'থেকে', roleBn: 'পার্টিকেল' }
        ],
        particleFunctionNote: 'উৎপত্তিস্থল বা দেশের প্রারম্ভবিন্দু নির্দেশ করছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '映画は７時から始まります。',
        hiragana: 'えいが は しちじ から はじまります。',
        romaji: 'Eiga wa shichiji kara hajimarimasu.',
        bn: 'সিনেমা ৭টা থেকে শুরু হবে।',
        en: 'The movie starts from 7 o\'clock.',
        breakdown: [
          { word: '７時', meaningBn: '৭টা', roleBn: 'শুরুর সময়' }
        ],
        particleFunctionNote: 'সিনেমা শুরুর সময়সূচি প্রকাশ করছে।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '失敗から多くのことを学びました。',
        hiragana: 'しっぱい から おおく の こと を まなびました。',
        romaji: 'Shippai kara ooku no koto o manabimashita.',
        bn: 'ব্যর্থতা থেকেই অনেক কিছু শিখেছি।',
        en: 'I learned many things from my failures.',
        breakdown: [
          { word: '失敗', meaningBn: 'ব্যর্থতা', roleBn: 'উৎস' }
        ],
        particleFunctionNote: 'অভিজ্ঞতার উৎস বা পাঠের সূচনা প্রকাশ করছে から।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ ５時から終わります。',
        correctJp: '✅ ５時に終わります。 / ５時までです。',
        whyIncorrectBn: 'শেষ হওয়া কোনো সূচনাবিন্দু নয়, তাই から বসবে না।',
        correctReasonBn: 'শেষ মুহূর্ত নির্দিষ্ট করতে に বা まで বসে।'
      }
    ],
    visualStory: {
      titleBn: 'উৎস বা উৎক্ষেপণ প্যাড 🚀',
      metaphor: 'একটি রকেট যেখান থেকে আকাশের দিকে উড়াল দেয়।',
      diagram: '🚀 [ ダッカ から ───> とうきょう へ ]',
      explanationBn: 'যেকোনো গতি বা সময়ের প্রথম কদম হলো から।'
    },
    quickQuestions: [
      {
        questionJp: '会社は朝９時（　）です。',
        questionBn: 'কোম্পানি সকাল ৯টা থেকে। বন্ধনীতে কী বসবে?',
        options: ['から', 'まで', 'に', 'で'],
        correctAnswer: 'から',
        explanationBn: 'শুরুর সময় নির্দেশ করতে から বসে।'
      }
    ]
  },

  // 11. まで (MADE)
  {
    id: 'particle-made',
    symbol: 'まで',
    hiragana: 'まで',
    romaji: 'made',
    bengaliPronunciation: 'মাদে',
    level: 'N5',
    nameBn: 'সমাপ্তি ও পরিধি মার্কার ("পর্যন্ত / Until")',
    nameEn: 'Limit & Endpoint Particle',
    primaryFunctionBn: 'সময়, স্থান বা পরিধির চূড়ান্ত সমাপ্তি নির্দেশ',
    summaryBn: 'কোনো কাজ যে সময় বা স্থান পর্যন্ত অবিরাম চলতে থাকে তা নির্দেশ করে। から এর সাথে জোড়া বেঁধে "XからYまで" বহুল ব্যবহৃত।',
    simpleMeaningBn: 'বাংলায় "পর্যন্ত", "অবধি" বা "সীমা পর্যন্ত" (যেমন: ৫টা পর্যন্ত, স্টেশন পর্যন্ত)।',
    realFunctionBn: '১. সময়ের শেষ সীমা (Until a point in time)। ২. স্থানের শেষ সীমা (As far as / To a destination)। ৩. ব্যাপ্তি বা পরিধি।',
    whenToUse: [
      'সময় যতক্ষণ পর্যন্ত চলে তা বোঝাতে (যেমন: 5時まで働く)。',
      'হাঁটার বা ভ্রমণের দূরত্বসীমা বোঝাতে (যেমন: 駅まで歩く)。',
      'X から Y まで (X থেকে Y পর্যন্ত) গঠনে।'
    ],
    whenNotToUse: [
      'কোনো নির্দিষ্ট ডেডলাইনের পূর্বে কাজ শেষ করার ক্ষেত্রে まで নয়, までに বসে।'
    ],
    importantNotesBn: 'পার্থক্য মনে রাখুন: まで মানে হলো ঐ সময় পর্যন্ত কাজ চলতে থাকবে (যেমন: ৫টা পর্যন্ত পড়ব)। আর までに মানে হলো ঐ সময়ের পূর্বেই কাজটি সম্পন্ন করে ফেলতে হবে (যেমন: ৫টার মধ্যে জমা দিন)।',
    patternFormula: '[ স্থান / সময় ] + まで + [ ক্রিয়া ]',
    structureBreakdown: [
      { token: 'ごじ', roleEn: 'End Time', roleBn: 'শেষ সময়', color: 'amber' },
      { token: 'まで', roleEn: 'Until Marker', roleBn: 'পর্যন্ত মার্কার', color: 'rose' },
      { token: 'べんきょうします', roleEn: 'Verb', roleBn: 'পড়াশোনা করা', color: 'slate' }
    ],
    structureExplanationBn: '৫টা পর্যন্ত নিরবচ্ছিন্নভাবে পড়ার কাজ চলার সীমা প্রকাশ করছে।',
    functionBranches: [
      {
        id: 'made-endpoint',
        titleEn: 'Time & Space Endpoint',
        titleBn: 'সময় বা স্থানের শেষ সীমা',
        formula: 'Time / Place + まで',
        descriptionBn: 'যে বিন্দু পর্যন্ত কাজ পৌঁছায়।',
        sampleSentence: '駅まで一緒に歩きましょう。',
        sampleReading: 'えき まで いっしょに あるきましょう。',
        sampleBn: 'চলুন স্টেশন পর্যন্ত একসাথে হাঁটি।'
      }
    ],
    beginnerExamples: [
      {
        jp: '５時まで勉強します。',
        hiragana: 'ごじ まで べんきょう します。',
        romaji: 'Goji made benkyou shimasu.',
        bn: '৫টা পর্যন্ত পড়াশোনা করব।',
        en: 'I will study until 5 o\'clock.',
        breakdown: [
          { word: '５時', meaningBn: '৫টা', roleBn: 'শেষ সময়' },
          { word: 'まで', meaningBn: 'পর্যন্ত', roleBn: 'পার্টিকেল' }
        ],
        particleFunctionNote: 'পড়াশোনার সময়কালের সমাপ্তি নির্দেশ করছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '銀行は何時まで開いていますか。',
        hiragana: 'ぎんこう は なんじ まで あいています か。',
        romaji: 'Ginkou wa nanji made aite imasu ka.',
        bn: 'ব্যাংক কয়টা পর্যন্ত খোলা থাকে?',
        en: 'Until what time is the bank open?',
        breakdown: [
          { word: '何時', meaningBn: 'কয়টা', roleBn: 'প্রশ্নসময়' },
          { word: '開いています', meaningBn: 'খোলা থাকে', roleBn: 'অবস্থা' }
        ],
        particleFunctionNote: 'খোলা থাকার শেষ সময় জানার প্রশ্ন।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '最後まで諦めないで頑張ってください。',
        hiragana: 'さいご まで あきらめないで がんばって ください。',
        romaji: 'Saigo made akiramenaide ganbatte kudasai.',
        bn: 'শেষ পর্যন্ত হাল না ছেড়ে চেষ্টা চালিয়ে যান।',
        en: 'Please keep doing your best without giving up until the very end.',
        breakdown: [
          { word: '最後', meaningBn: 'সর্বশেষ', roleBn: 'চূড়ান্ত সীমা' }
        ],
        particleFunctionNote: 'চূড়ান্ত মুহূর্ত পর্যন্ত অবিচলতা প্রকাশ করছে まで।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ 明日までに勉強します（５時間連続で）。',
        correctJp: '✅ 明日まで勉強します。',
        whyIncorrectBn: 'কাজের অবিরাম ব্যাপ্তি বোঝাতে まで বসে, までに নয়।',
        correctReasonBn: 'নিরবচ্ছিন্ন কাজের ক্ষেত্রে まで সঠিক।'
      }
    ],
    visualStory: {
      titleBn: 'ফিনিশ লাইন 🏁',
      metaphor: 'দৌড় প্রতিযোগিতার শেষ প্রান্ত বা ফিনিশিং রশি।',
      diagram: '[ ９じ から ─────── 🏃‍♂️ ───────> 🏁 ５じ まで ]',
      explanationBn: 'কাজের অবিরাম যাত্রার চূড়ান্ত সমাপ্তির রেখা হলো まで।'
    },
    quickQuestions: [
      {
        questionJp: '家（　）学校（　）歩いて行きます。',
        questionBn: 'বাড়ি থেকে স্কুল পর্যন্ত হেঁটে যাই। যথাক্রমে কী বসবে?',
        options: ['から / まで', 'まで / から', 'に / で', 'で / まで'],
        correctAnswer: 'から / まで',
        explanationBn: 'সূচনা から এবং সমাপ্তি まで।'
      }
    ]
  },

  // 12. や (YA)
  {
    id: 'particle-ya',
    symbol: 'や',
    hiragana: 'や',
    romaji: 'ya',
    bengaliPronunciation: 'ইয়া',
    level: 'N5',
    nameBn: 'অসম্পূর্ণ উদাহরণ তালিকা ("A, B ইত্যাদি")',
    nameEn: 'Non-Exhaustive Listing Particle',
    primaryFunctionBn: 'নমুনা বা উদাহরণ হিসেবে কয়েকটি জিনিস তুলে ধরে আরও জিনিসের অস্তিত্ব ইঙ্গিত করা',
    summaryBn: 'কোনো দীর্ঘ তালিকার সবকিছু উল্লেখ না করে উদাহরণস্বরূপ দু-একটি নাম বলতে や বসে। প্রায়ই শেষে など (ইত্যাদি) যোগ করা হয়।',
    simpleMeaningBn: 'বাংলায় "যেমন: A, B ইত্যাদি" বা "A এবং B (আরও অনেক কিছু সহ)"।',
    realFunctionBn: 'অসম্পূর্ণ বা প্রতিনিধি তালিকা (Representative list)। と এর মতো সবকিছু সীমিত করে দেয় না, বরং আরও থাকার ইঙ্গিত দেয়।',
    whenToUse: [
      'দোকানে অনেক জিনিস কিনেছেন কিন্তু দু-একটির নাম বলতে চান (যেমন: パンや牛乳を買いました)。',
      'ব্যাগে অনেক কিছুর মাঝে প্রধান দুটির নাম দিতে (যেমন: 机の上に本やペンがあります)。',
      'や ... など (ইত্যাদি) যৌথ গঠনে।'
    ],
    whenNotToUse: [
      'যদি মাত্র দুটি জিনিসই থাকে এবং আর কোনো কিছু না থাকে, তবে や বসানো ভুল; সেখানে と বসবে।'
    ],
    importantNotesBn: 'と বনাম や: দুটি জিনিসের বেশি থাকলে এবং আরও ইঙ্গিত করতে চাইলে নির্দ্বিধায় や বেছে নিন।',
    patternFormula: '[ বিশেষ্য A ] + や + [ বিশেষ্য B ] + (など)',
    structureBreakdown: [
      { token: 'ほん', roleEn: 'Item A', roleBn: 'বই (নমুনা ১)', color: 'indigo' },
      { token: 'や', roleEn: 'Non-exhaustive And', roleBn: 'উদাহরণ মার্কার', color: 'rose' },
      { token: 'ペン', roleEn: 'Item B', roleBn: 'কলম (নমুনা ২)', color: 'emerald' },
      { token: 'など', roleEn: 'Etc.', roleBn: 'ইত্যাদি', color: 'slate' }
    ],
    structureExplanationBn: 'বই ও কলমের পাশাপাশি আরও স্টেশনারি জিনিস আছে তা ইঙ্গিত করছে।',
    functionBranches: [
      {
        id: 'ya-sample',
        titleEn: 'Sample Listing',
        titleBn: 'নমুনা তালিকা',
        formula: 'A + や + B + (など)',
        descriptionBn: 'প্রতিনিধিত্বমূলক আইটেম তুলে ধরা।',
        sampleSentence: '店で野菜や果物を買いました。',
        sampleReading: 'みせ で やさい や くだもの を かいました。',
        sampleBn: 'দোকান থেকে শাকসবজি, ফলমূল (ইত্যাদি) কিনেছি।'
      }
    ],
    beginnerExamples: [
      {
        jp: '机の上に本やノートがあります。',
        hiragana: 'つくえ の うえ に ほん や ノート が あります。',
        romaji: 'Tsukue no ue ni hon ya nooto ga arimasu.',
        bn: 'টেবিলের ওপর বই, খাতা (ইত্যাদি) আছে।',
        en: 'There are books, notebooks, etc. on the desk.',
        breakdown: [
          { word: '本', meaningBn: 'বই', roleBn: 'নমুনা ১' },
          { word: 'や', meaningBn: 'ইত্যাদি উদাহরণ', roleBn: 'পার্টিকেল' },
          { word: 'ノート', meaningBn: 'খাতা', roleBn: 'নমুনা ২' }
        ],
        particleFunctionNote: 'টেবিলে আরও জিনিস আছে তা বুঝাতে や বসেছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '休日は映画を見たり、本や漫画を読んだりします。',
        hiragana: 'きゅうじつ は えいが を みたり、ほん や まんが を よんだり します。',
        romaji: 'Kyuujitsu wa eiga o mitari, hon ya manga o yondari shimasu.',
        bn: 'ছুটির দিনে সিনেমা দেখি, আর বই ও মাঙ্গা পড়ি।',
        en: 'On holidays I watch movies, read books, manga, etc.',
        breakdown: [
          { word: '本や漫画', meaningBn: 'বই ও মাঙ্গার মতো নানা কিছু', roleBn: 'তালিকা' }
        ],
        particleFunctionNote: 'পড়ার সামগ্রীর উদাহরণ দিচ্ছে।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '京都には神社や寺など、歴史的な建物がたくさんあります。',
        hiragana: 'きょうと に は じんじゃ や てら など、れきしてき な たてもの が たくさん あります。',
        romaji: 'Kyouto ni wa jinja ya tera nado, rekishiteki na tatemono ga takusan arimasu.',
        bn: 'কিয়োটোতে শিন্টো মাজার, বৌদ্ধ মন্দিরসহ আরও অনেক ঐতিহাসিক স্থাপত্য রয়েছে।',
        en: 'Kyoto has many historical buildings such as shrines and temples.',
        breakdown: [
          { word: '神社や寺など', meaningBn: 'মাজার, মন্দির ইত্যাদি', roleBn: 'প্রতিনিধিত্ব' }
        ],
        particleFunctionNote: 'ঐতিহাসিক স্থাপত্যের প্রতিনিধিত্বমূলক উদাহরণ হিসেবে や ... など ব্যবহৃত হয়েছে।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ 財布の中に１００円や２００円だけあります。',
        correctJp: '✅ 財布の中に１００円と２００円があります。',
        whyIncorrectBn: 'যদি শুধুই নির্দিষ্ট এই পরিমাণ থাকে, তবে অসম্পূর্ণ তালিকা や হবে না।',
        correctReasonBn: 'সীমিত পূর্ণাঙ্গ তালিকায় と বসে।'
      }
    ],
    visualStory: {
      titleBn: 'উপচে পড়া ঝুড়ি 🧺',
      metaphor: 'একটি ঝুড়িতে অনেক ফল আছে, আপনি কেবল ওপরের দুটি নাম বললেন।',
      diagram: '🧺 [ りんご や 🍊 みかん や ... など ]',
      explanationBn: 'আরও অনেক কিছু লুকিয়ে আছে বোঝাতে বসে や।'
    },
    quickQuestions: [
      {
        questionJp: 'かばんの中にペン（　）ノートなどがあります。',
        questionBn: 'ব্যাগে কলম, খাতা ইত্যাদি নানা জিনিস আছে। বন্ধনীতে কী বসবে?',
        options: ['や', 'と', 'も', 'で'],
        correctAnswer: 'や',
        explanationBn: 'など সহ অসম্পূর্ণ উদাহরণ তালিকায় や বসে।'
      }
    ]
  },

  // 13. か (KA)
  {
    id: 'particle-ka',
    symbol: 'か',
    hiragana: 'か',
    romaji: 'ka',
    bengaliPronunciation: 'কা',
    level: 'N5',
    nameBn: 'প্রশ্নবোধক ও বিকল্প পার্টিকেল ("কিনা / অথবা / ?")',
    nameEn: 'Question & Alternative Particle',
    primaryFunctionBn: 'বাক্যের শেষে প্রশ্ন তৈরি করা এবং শব্দের মাঝে "অথবা" বোঝানো',
    summaryBn: 'বাক্যের শেষে বসে জাপানি প্রশ্নবোধক চিহ্ন (?) হিসেবে কাজ করে। এছাড়া দুটি শব্দের মাঝে বসে "অথবা / বা" (Or) নির্দেশ করে।',
    simpleMeaningBn: 'বাক্যের শেষে "?" এবং শব্দের মাঝে "বা / অথবা" (যেমন: যাবেন কি? চা অথবা কফি)।',
    realFunctionBn: '১. ভদ্র প্রশ্নবোধক চিহ্ন (Question marker)। ২. বিকল্প নির্দেশ (A or B)। ৩. প্রশ্নশব্দের সাথে অনির্দিষ্টতা তৈরি (যেমন: いつか - কোনো একদিন, だれか - কেউ একজন, なにか - কিছু একটা)।',
    whenToUse: [
      'যেকোনো ভদ্র বাক্যের শেষে প্রশ্ন করতে (যেমন: 行きますか)。',
      'বিকল্প দুটি জিনিসের মধ্যে বাছতে (जैसे: コーヒーか紅茶)。',
      'অনির্দিষ্টতা প্রকাশে (जैसे: 何か食べたい - কিছু একটা খেতে চাই)।'
    ],
    whenNotToUse: [
      'বন্ধুমহলে ঘরোয়া ক্যাজুয়াল কথায় অতিরিক্ত か ব্যবহার করলে তা রূঢ় শোনাতে পারে।'
    ],
    importantNotesBn: 'জাপানি ব্যাকরণে সাধারণত ইংরেজি প্রশ্নবোধক চিহ্নের (?) প্রয়োজন হয় না, কারণ か নিজেই প্রশ্নের কাজ সম্পন্ন করে।',
    patternFormula: '[ বাক্য ] + か？ / [ বিশেষ্য A ] + か + [ বিশেষ্য B ]',
    structureBreakdown: [
      { token: 'これ', roleEn: 'Item', roleBn: 'এটি', color: 'indigo' },
      { token: 'は', roleEn: 'Topic', roleBn: 'টপিক', color: 'rose' },
      { token: 'なんですか', roleEn: 'Question', roleBn: 'কী?', color: 'emerald' }
    ],
    structureExplanationBn: 'か বাক্যের শেষে বসে একে প্রশ্নে রূপান্তরিত করেছে।',
    functionBranches: [
      {
        id: 'ka-question',
        titleEn: 'Sentence-Ending Question Marker',
        titleBn: 'প্রশ্ন তৈরির সমাপিকা (?)',
        formula: 'Sentence + か',
        descriptionBn: 'শ্রোতার কাছ থেকে উত্তর পাওয়ার জন্য।',
        sampleSentence: 'お元気ですか。',
        sampleReading: 'おげんき です か。',
        sampleBn: 'আপনি কেমন আছেন?'
      },
      {
        id: 'ka-alternative',
        titleEn: 'Alternative / Choice (Or)',
        titleBn: 'বিকল্প নির্বাচন ("বা / অথবা")',
        formula: '[Noun A] + か + [Noun B]',
        descriptionBn: 'যেকোনো একটিকে বাছাই করতে।',
        sampleSentence: 'お茶かコーヒーはいかがですか。',
        sampleReading: 'おちゃ か コーヒー は いかが です か。',
        sampleBn: 'চা অথবা কফি—কিছু কি নেবেন?'
      }
    ],
    beginnerExamples: [
      {
        jp: '日本語が話せますか。',
        hiragana: 'にほんご が はなせます か。',
        romaji: 'Nihongo ga hanasemasu ka.',
        bn: 'আপনি কি জাপানি বলতে পারেন?',
        en: 'Can you speak Japanese?',
        breakdown: [
          { word: '日本語が', meaningBn: 'জাপানি ভাষা', roleBn: 'দক্ষতা' },
          { word: '話せます', meaningBn: 'বলতে পারেন', roleBn: 'ক্রিয়া' },
          { word: 'か', meaningBn: 'প্রশ্ন মার্কার', roleBn: 'পার্টিকেল' }
        ],
        particleFunctionNote: 'বাক্যটিকে প্রশ্নে রূপান্তর করেছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '明日、映画を見るか買い物をしましょう。',
        hiragana: 'あした、えいが を みる か かいもの を しましょう。',
        romaji: 'Ashita, eiga o miru ka kaimono o shimashou.',
        bn: 'আগামীকাল সিনেমা দেখি অথবা কেনাকাটা করি।',
        en: 'Tomorrow let\'s watch a movie or go shopping.',
        breakdown: [
          { word: '見るか', meaningBn: 'দেখব অথবা', roleBn: 'বিকল্প' }
        ],
        particleFunctionNote: 'দুটি কর্মকাণ্ডের বিকল্প নির্দেশ করছে か।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '誰か部屋の中にいますか。',
        hiragana: 'だれか へや の なか に います か。',
        romaji: 'Dareka heya no naka ni imasu ka.',
        bn: 'ঘরের ভেতরে কেউ কি আছে?',
        en: 'Is there somebody inside the room?',
        breakdown: [
          { word: '誰か', meaningBn: 'কেউ একজন (অনির্দিষ্ট)', roleBn: 'সর্বনাম' }
        ],
        particleFunctionNote: 'だれ + か মিলে "কেউ একজন" অনির্দিষ্ট সত্ত্বা প্রকাশ করেছে।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ これは何ですか？（正式な日本語では「？」は不要）',
        correctJp: '✅ これは何ですか。',
        whyIncorrectBn: 'চিরায়ত জাপানি মুদ্রণে か থাকলেই পূর্ণচ্ছেদ (。) বসে, প্রশ্নবোধক চিহ্নের দরকার হয় না।',
        correctReasonBn: 'か নিজেই প্রশ্নচিহ্ন।'
      }
    ],
    visualStory: {
      titleBn: 'প্রশ্নচিহ্ন ও দ্বিধাদ্বন্দ্ব ❓🔀',
      metaphor: 'একটি পথ দুই ভাগে ভাগ হয়ে যাওয়া—কোন দিকে যাবেন?',
      diagram: '[ コーヒー ] 🔀 か 🔀 [ おちゃ ]',
      explanationBn: 'জিজ্ঞাসা বা পছন্দের দোলাচল প্রকাশ করে か।'
    },
    quickQuestions: [
      {
        questionJp: '明日暇です（　）。',
        questionBn: 'আগামীকাল আপনি ফ্রি কি? বন্ধনীতে কী বসবে?',
        options: ['か', 'を', 'に', 'で'],
        correctAnswer: 'か',
        explanationBn: 'প্রশ্ন করতে বাক্যের শেষে か বসে।'
      }
    ]
  },

  // 14. ね (NE)
  {
    id: 'particle-ne',
    symbol: 'ね',
    hiragana: 'ね',
    romaji: 'ne',
    bengaliPronunciation: 'নে',
    level: 'N5',
    nameBn: 'সম্মতি ও সহমর্মিতা মার্কার ("তাই না? / তাই তো!")',
    nameEn: 'Agreement & Confirmation Particle',
    primaryFunctionBn: 'শ্রোতার কাছ থেকে সমর্থন, সহানুভূতি বা সম্মতি চাওয়া',
    summaryBn: 'বাক্যের শেষে বসে শ্রোতার সাথে একাত্মতা প্রকাশ করে ("তাই না বলুন?") এবং বক্তা ও শ্রোতার পারস্পরিক সম্পর্ককে মধুর করে তোলে।',
    simpleMeaningBn: 'বাংলায় "তাই না?", "না কি বলেন?", "সত্যিই তো!" (যেমন: আজ খুব ঠান্ডা, তাই না?)।',
    realFunctionBn: 'উভয়ের জানা তথ্যে সম্মতি নিশ্চিত করা (Seeking confirmation and softening tone)।',
    whenToUse: [
      'উভয়েই প্রত্যক্ষ করছে এমন বিষয় বর্ণনায় (যেমন: 今日は暑いですね - আজ গরম, তাই না?)।',
      'কথাকে ভদ্র ও মধুর করে তুলতে।'
    ],
    whenNotToUse: [
      'যে তথ্য শুধু বক্তা একাই জানে আর শ্রোতা জানে না, সেখানে ね ব্যবহার করলে অদ্ভুত শোনায় (সেখানে よ বসে)।'
    ],
    importantNotesBn: 'ね হলো বন্ধুভাবাপন্ন জাপানি কথোপকথনের প্রাণ! এটি ব্যবহারের মাধ্যমে আপনি বোঝান যে আপনি শ্রোতার অনুভূতিকে সম্মান করছেন।',
    patternFormula: '[ বাক্য ] + ね',
    structureBreakdown: [
      { token: 'きょうは', roleEn: 'Topic', roleBn: 'আজকে', color: 'indigo' },
      { token: 'いいてんきですね', roleEn: 'Observation', roleBn: 'সুন্দর আবহাওয়া, তাই না?', color: 'emerald' }
    ],
    structureExplanationBn: 'শ্রোতার কাছ থেকে আবহাওয়ার বিষয়ে সম্মতি চাওয়া হচ্ছে।',
    functionBranches: [
      {
        id: 'ne-agreement',
        titleEn: 'Seeking Agreement',
        titleBn: 'সম্মতি বা সহমর্মিতা চাওয়া',
        formula: 'Sentence + ね',
        descriptionBn: 'উভয়ের পরিচিত বিষয়ে একমত হওয়া।',
        sampleSentence: 'この料理、とても美味しいですね。',
        sampleReading: 'この りょうり、とても おいしい です ね。',
        sampleBn: 'এই খাবারটা সত্যিই খুব মজার, তাই না?'
      }
    ],
    beginnerExamples: [
      {
        jp: 'いい天気ですね。',
        hiragana: 'いい てんき です ね。',
        romaji: 'Ii tenki desu ne.',
        bn: 'সুন্দর আবহাওয়া, তাই না?',
        en: 'Nice weather, isn\'t it?',
        breakdown: [
          { word: 'いい天気', meaningBn: 'সুন্দর আবহাওয়া', roleBn: 'তথ্য' },
          { word: 'ね', meaningBn: 'সম্মতি মার্কার', roleBn: 'পার্টিকেল' }
        ],
        particleFunctionNote: 'শ্রোতার একাত্মতা প্রকাশ করছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '明日のテスト、難しそうですね。',
        hiragana: 'あした の テスト、むずかしそう です ね。',
        romaji: 'Ashita no tesuto, muzukashisou desu ne.',
        bn: 'আগামীকালের পরীক্ষাটা বেশ কঠিন মনে হচ্ছে, তাই না?',
        en: 'Tomorrow\'s test seems quite difficult, doesn\'t it?',
        breakdown: [
          { word: '難しそう', meaningBn: 'কঠিন মনে হওয়া', roleBn: 'অনুমান' }
        ],
        particleFunctionNote: 'সহপাঠীর সাথে উদ্বেগে সহমর্মিতা ভাগাভাগি করছে ね।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '日本での生活にはもう慣れましたか。はい、とても楽しいですね。',
        hiragana: 'にほん での せいかつ に は もう なれました か。はい、とても たのしい です ね。',
        romaji: 'Nihon deno seikatsu ni wa mou naremashita ka. Hai, totemo tanoshii desu ne.',
        bn: 'জাপানের জীবনে কি অভ্যস্ত হয়েছেন? হ্যাঁ, সত্যিই খুব আনন্দদায়ক!',
        en: 'Have you gotten used to life in Japan? Yes, it is very enjoyable indeed.',
        breakdown: [
          { word: '楽しいですね', meaningBn: 'মজার, নিশ্চিতভাবেই!', roleBn: 'অনুভূতি' }
        ],
        particleFunctionNote: 'উষ্ণ আনন্দময় অনুভূতি প্রকাশ করতে ね ব্যবহৃত হয়েছে।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ 私の誕生日は明日ですね。（聞き手が知らない情報）',
        correctJp: '✅ 私の誕生日は明日ですよ。',
        whyIncorrectBn: 'শ্রোতা যদি তথ্যটি আগে না জেনে থাকে, তবে তার কাছ থেকে সম্মতি চাওয়া যায় না।',
        correctReasonBn: 'নতুন তথ্য দিতে よ বসে।'
      }
    ],
    visualStory: {
      titleBn: 'মাথা নাড়ানো বা সম্মতি 🤝😊',
      metaphor: 'কথা বলার সময় মৃদু হেসে মাথা নাড়িয়ে সমর্থন দেওয়া।',
      diagram: '[ ほんとうに おいしい です ] 🤝 ね 😊',
      explanationBn: 'বক্তা ও শ্রোতার মনকে এক সুতোয় বাঁধে ね।'
    },
    quickQuestions: [
      {
        questionJp: '今日は寒いですね。ええ、本当（　）寒いですね。',
        questionBn: 'আজকে ঠান্ডা, তাই না? হ্যাঁ, সত্যি（　）ঠান্ডা। বন্ধনীতে কী বসবে?',
        options: ['に', 'で', 'を', 'が'],
        correctAnswer: 'に',
        explanationBn: '本当に (সত্যিই) একটি সুনির্দিষ্ট ক্রিয়া-বিশেষণ।'
      }
    ]
  },

  // 15. よ (YO)
  {
    id: 'particle-yo',
    symbol: 'よ',
    hiragana: 'よ',
    romaji: 'yo',
    bengaliPronunciation: 'ইয়ো',
    level: 'N5',
    nameBn: 'নতুন তথ্য ও নিশ্চয়তা মার্কার ("মনে রাখবেন / কিন্তু / বলছি")',
    nameEn: 'Information Sharing & Assertion Particle',
    primaryFunctionBn: 'শ্রোতার অজানা নতুন তথ্য জানানো বা নিশ্চিতভাবে সতর্ক করা',
    summaryBn: 'বক্তা যখন এমন কোনো তথ্য দেয় যা শ্রোতার জানা নেই, অথবা কোনো বিষয়ে জোর দিয়ে সতর্ক করে, তখন বাক্যের শেষে よ বসে।',
    simpleMeaningBn: 'বাংলায় "মনে রাখবেন কিন্তু", "বলছি তো", বা "নিশ্চিত থাকুন" (যেমন: কাল কিন্তু বন্ধ!)।',
    realFunctionBn: 'নতুন তথ্য সরবরাহ (Informing the listener of new knowledge) এবং আত্মবিশ্বাসী নিশ্চয়তা।',
    whenToUse: [
      'শ্রোতা জানে না এমন তথ্য জানাতে (যেমন: この映画、面白いですよ - এই সিনেমাটি কিন্তু খুব মজার!)।',
      'সতর্ক বা আশ্বস্ত করতে (যেমন: 大丈夫ですよ - কোনো চিন্তা নেই কিন্তু)।'
    ],
    whenNotToUse: [
      'শ্রোতা আগে থেকেই জানে এমন তথ্যে বারবার よ বললে অহংকারী বা উপদেশমূলক শোনাতে পারে।'
    ],
    importantNotesBn: 'ね বনাম よ: যা দুজনই জানে তা ね; যা কেবল আপনি জানেন কিন্তু শ্রোতা জানে না তা হলো よ!',
    patternFormula: '[ নতুন তথ্য সংবলিত বাক্য ] + よ',
    structureBreakdown: [
      { token: 'あしたは', roleEn: 'Topic', roleBn: 'আগামীকাল', color: 'indigo' },
      { token: 'やすみですよ', roleEn: 'New Information', roleBn: 'ছুটি কিন্তু!', color: 'rose' }
    ],
    structureExplanationBn: 'শ্রোতা হয়তো ছুটির কথা জানত না, তাকে নিশ্চিতভাবে জানানো হচ্ছে।',
    functionBranches: [
      {
        id: 'yo-new-info',
        titleEn: 'Providing New Information',
        titleBn: 'অজানা নতুন তথ্য প্রদান',
        formula: 'Sentence + よ',
        descriptionBn: 'শ্রোতাকে অবগত করা।',
        sampleSentence: 'あそこに美味しいラーメン屋がありますよ。',
        sampleReading: 'あそこ に おいしい ラーメンや が あります よ。',
        sampleBn: 'ঐ যে ওখানে কিন্তু চমৎকার রামেন রেস্তোরাঁ আছে!'
      }
    ],
    beginnerExamples: [
      {
        jp: 'これは私の本ですよ。',
        hiragana: 'これ は わたし の ほん です よ。',
        romaji: 'Kore wa watashi no hon desu yo.',
        bn: 'এটি আমার বই কিন্তু! (জেনে রাখুন)',
        en: 'This is my book, you know!',
        breakdown: [
          { word: '私の本', meaningBn: 'আমার বই', roleBn: 'তথ্য' },
          { word: 'よ', meaningBn: 'নিশ্চয়তা মার্কার', roleBn: 'পার্টিকেল' }
        ],
        particleFunctionNote: 'ভুল বোঝাবুঝি দূর করতে নিশ্চিত তথ্য দিচ্ছে।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '無理をしないでください。体調が一番大切ですよ。',
        hiragana: 'むり を しないで ください。たいちょう が いちばん たいせつ です よ。',
        romaji: 'Muri o shinaide kudasai. Taichou ga ichiban taisetsu desu yo.',
        bn: 'অতিরিক্ত চাপ নেবেন না। শরীরটাই কিন্তু সবচেয়ে গুরুত্বপূর্ণ!',
        en: 'Don\'t push yourself too hard. Your health is the most important, you know!',
        breakdown: [
          { word: '一番大切ですよ', meaningBn: 'সবচেয়ে জরুরি কিন্তু', roleBn: 'আশ্বাস' }
        ],
        particleFunctionNote: 'গুরুত্বপূর্ণ সত্য মনে করিয়ে দিতে よ ব্যবহৃত হয়েছে।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '電車の時間が変わったから、気をつけてね。もうすぐ来るよ。',
        hiragana: 'でんしゃ の じかん が かわった から、きをつけて ね。もうすぐ くる よ。',
        romaji: 'Densha no jikan ga kawatta kara, ki o tsukete ne. Mousugu kuru yo.',
        bn: 'ট্রেনের সময় বদলেছে তাই সাবধানে থেকো। ট্রেন এখনই আসছে কিন্তু!',
        en: 'Train schedule changed, so be careful. It\'s coming right now!',
        breakdown: [
          { word: '来るよ', meaningBn: 'আসছে কিন্তু!', roleBn: 'সতর্কবার্তা' }
        ],
        particleFunctionNote: 'তাৎক্ষণিক আগমন সম্পর্কে সতর্ক করছে よ।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ 外は雨ですね。（自分が窓の外を見て、相手が気づいていない時）',
        correctJp: '✅ 外は雨ですよ。',
        whyIncorrectBn: 'শ্রোতা যেহেতু বাইরে বৃষ্টি হওয়ার কথা জানে না, তাই তার সম্মতি চাওয়া অর্থহীন।',
        correctReasonBn: 'অজানা তথ্য জানাতে よ বসে।'
      }
    ],
    visualStory: {
      titleBn: 'মেগাফোন বা নোটিশবোর্ড 📢',
      metaphor: 'শ্রোতাকে ডেকে বলা: "এই শুনুন, একটি গুরুত্বপূর্ণ খবর জানুন!"',
      diagram: '[ じょうほう ] 📢 ───> よ 👂',
      explanationBn: 'অজানা সত্য উপহার দেওয়ার আত্মবিশ্বাসী কণ্ঠস্বর よ।'
    },
    quickQuestions: [
      {
        questionJp: '会議は２時から始まります（　）。（相手が知らない時）',
        questionBn: 'মিটিং ২টায় শুরু হবে কিন্তু! (শ্রোতা যখন জানে না)—কী বসবে?',
        options: ['よ', 'ね', 'か', 'を'],
        correctAnswer: 'よ',
        explanationBn: 'শ্রোতার অজানা তথ্য জানাতে বাক্যের শেষে よ বসে।'
      }
    ]
  },

  // 16. より (YORI)
  {
    id: 'particle-yori',
    symbol: 'より',
    hiragana: 'より',
    romaji: 'yori',
    bengaliPronunciation: 'ইয়োরি',
    level: 'N5',
    nameBn: 'তুলনা মার্কার ("চেয়ে / তুলনায় / Than")',
    nameEn: 'Comparison Particle',
    primaryFunctionBn: 'দুটি বস্তু বা ব্যক্তির মধ্যে তুলনামূলক তারতম্য প্রকাশ',
    summaryBn: 'কোনো কিছুর চেয়ে বেশি বা বড় বোঝাতে তুলনার ভিত্তি হিসেবে ব্যবহৃত হয়। [A は B より 大きい] = A, B-এর চেয়ে বড়।',
    simpleMeaningBn: 'বাংলায় "-র চেয়ে", "-র তুলনায়" (যেমন: ট্রেনের চেয়ে প্লেন দ্রুত)।',
    realFunctionBn: 'তুলনামূলক মানদণ্ড (Standard of comparison)। কার চেয়ে তা নির্দিষ্ট করে।',
    whenToUse: [
      'যেকোনো তুলনামূলক বাক্য গঠনে (যেমন: 新幹線より飛行機のほうが速い)।',
      'কাউকে কারো চেয়ে প্রাধান্য দিতে।'
    ],
    whenNotToUse: [
      'সরাসরি সমান বোঝাতে より বসে না।'
    ],
    importantNotesBn: 'মনে রাখার নিয়ম: より সবসময় সেই শব্দের পরে বসে যার সাথে তুলনা করা হচ্ছে (যার চেয়ে কম বা বেশি)।',
    patternFormula: '[ A ] は [ B ] より [ বিশেষণ ] です',
    structureBreakdown: [
      { token: 'ひこうきは', roleEn: 'Subject A', roleBn: 'উড়োজাহাজ', color: 'indigo' },
      { token: 'でんしゃ', roleEn: 'Baseline B', roleBn: 'ট্রেন', color: 'amber' },
      { token: 'より', roleEn: 'Than Marker', roleBn: 'চেয়ে মার্কার', color: 'rose' },
      { token: 'はやいです', roleEn: 'Adjective', roleBn: 'দ্রুতগামী', color: 'slate' }
    ],
    structureExplanationBn: 'ট্রেনের তুলনায় উড়োজাহাজের গতি বেশি তা তুলে ধরছে।',
    functionBranches: [
      {
        id: 'yori-comparison',
        titleEn: 'Comparison Standard',
        titleBn: 'তুলনামূলক ভিত্তি ("চেয়ে")',
        formula: 'A は B より [Adjective]',
        descriptionBn: 'কার তুলনায় কতটুকু বেশি।',
        sampleSentence: '富士山は他の山より高いです。',
        sampleReading: 'ふじさん は ほか の やま より たかい です。',
        sampleBn: 'ফুজি পর্বত অন্যান্য পর্বতের চেয়ে উঁচু।'
      }
    ],
    beginnerExamples: [
      {
        jp: '日本語は英語より難しいですか。',
        hiragana: 'にほんご は えいご より むずかしい です か。',
        romaji: 'Nihongo wa eigo yori muzukashii desu ka.',
        bn: 'জাপানি ভাষা কি ইংরেজির চেয়ে কঠিন?',
        en: 'Is Japanese more difficult than English?',
        breakdown: [
          { word: '日本語は', meaningBn: 'জাপানি ভাষা', roleBn: 'বিষয়' },
          { word: '英語より', meaningBn: 'ইংরেজির চেয়ে', roleBn: 'তুলনা' },
          { word: '難しい', meaningBn: 'কঠিন', roleBn: 'বিশেষণ' }
        ],
        particleFunctionNote: 'ইংরেজির সাথে তুলনামূলক পরিমাপ নির্দেশ করছে より।',
        category: 'beginner'
      }
    ],
    dailyExamples: [
      {
        jp: '言葉より行動のほうが大切です。',
        hiragana: 'ことば より こうどう の ほう が たいせつ です。',
        romaji: 'Kotoba yori koudou no hou ga taisetsu desu.',
        bn: 'কথার চেয়ে কাজ বেশি গুরুত্বপূর্ণ।',
        en: 'Actions are more important than words.',
        breakdown: [
          { word: '言葉より', meaningBn: 'কথার চেয়ে', roleBn: 'মানদণ্ড' },
          { word: '行動のほうが', meaningBn: 'কাজের দিকটি', roleBn: 'প্রাধান্য' }
        ],
        particleFunctionNote: 'নৈতিক মূল্যবোধের তুলনামূলক বিচার।',
        category: 'daily'
      }
    ],
    naturalExamples: [
      {
        jp: '思っていたよりずっと簡単でした。',
        hiragana: 'おもっていた より ずっと かんたん でした。',
        romaji: 'Omotte ita yori zutto kantan deshita.',
        bn: 'ভাবার চেয়েও অনেক বেশি সহজ ছিল।',
        en: 'It was much easier than I thought.',
        breakdown: [
          { word: '思っていたより', meaningBn: 'যা ভেবেছিলাম তার চেয়ে', roleBn: 'তুলনা' }
        ],
        particleFunctionNote: 'পূর্বধারণার চেয়ে বাস্তবের তুলনা প্রকাশ করছে 보다/より।',
        category: 'natural'
      }
    ],
    commonMistakes: [
      {
        incorrectJp: '❌ 飛行機より電車は速いです。（飛行機のほうが速いのに逆になる）',
        correctJp: '✅ 電車より飛行機のほうが速いです。',
        whyIncorrectBn: 'যার চেয়ে বেশি, より ঠিক তার পরে বসবে। উল্টো বসালে অর্থ বদলে যাবে।',
        correctReasonBn: 'সঠিক তুলনামূলক কাঠামো রক্ষা করতে হবে।'
      }
    ],
    visualStory: {
      titleBn: 'দাঁড়িপাল্লা বা উচ্চতার স্কেল ⚖️',
      metaphor: 'দুটো বস্তুকে স্কেলের ওপর মাপা—কোনটি ওপরে উঠেছে।',
      diagram: '[ ひこうき ] ───> ⚖️ [ でんしゃ より たかい ]',
      explanationBn: 'কার সাথে মাপজোখ হচ্ছে তা ঠিক করে দেয় より।'
    },
    quickQuestions: [
      {
        questionJp: '夏は冬（　）暑いです。',
        questionBn: 'গ্রীষ্মকাল শীতকালের চেয়ে গরম। বন্ধনীতে কী বসবে?',
        options: ['より', 'から', 'まで', 'で'],
        correctAnswer: 'より',
        explanationBn: 'তুলনায় কার চেয়ে তা বোঝাতে 冬の পর より বসবে।'
      }
    ]
  }
];

// Re-export or adapt as legacy ParticleItem for backward compatibility
export const particlesList: ParticleItem[] = detailedParticlesList.map((p) => ({
  id: p.id,
  symbol: p.symbol,
  romaji: `${p.romaji} (উচ্চারণ '${p.bengaliPronunciation}')`,
  nameBn: p.nameBn,
  nameEn: p.nameEn,
  summaryBn: p.summaryBn,
  coreUsageBn: p.realFunctionBn,
  structure: p.patternFormula,
  examples: p.beginnerExamples.map((ex) => ({
    jp: ex.jp,
    reading: ex.hiragana,
    bn: ex.bn,
    en: ex.en,
    breakdownBn: ex.breakdown.map((b) => `${b.word} (${b.meaningBn})`).join(' + ')
  })),
  notesBn: p.importantNotesBn,
  commonMistakesBn: p.commonMistakes[0]?.whyIncorrectBn || '',
  practiceQuestions: p.quickQuestions
}));
