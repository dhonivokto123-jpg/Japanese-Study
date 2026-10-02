import {
  DecisionTreeNode,
  AnalyzedSentenceItem,
  LabSentenceQuestion,
  TimeTimelineItem,
  ParticleVisualStory
} from '../types';

// Decision Tree Wizard Nodes
export const particleDecisionTrees: Record<string, DecisionTreeNode> = {
  start: {
    id: 'start',
    questionBn: 'আপনি আপনার বাক্যে কী ধরনের ভাব বা সম্পর্ক প্রকাশ করতে চান?',
    questionEn: 'What do you want to express in your sentence?',
    descriptionBn: 'নিচের অপশনগুলোর মধ্যে আপনার বাক্যের মূল বিষয়টি বেছে নিন:',
    options: [
      {
        labelBn: '📍 স্থান, অবস্থান বা গন্তব্য (Location / Place)',
        nextStepId: 'step_location'
      },
      {
        labelBn: '👤 বিষয়, আলোচ্য ব্যক্তি বা কর্তা (Topic / Subject)',
        nextStepId: 'step_subject'
      },
      {
        labelBn: '🎯 কোনো কাজ যার ওপর পড়ছে (Object / Target)',
        nextStepId: 'step_object'
      },
      {
        labelBn: '🤝 সঙ্গী বা একাধিক জিনিসের তালিকা (Companion / And)',
        nextStepId: 'step_companion'
      },
      {
        labelBn: '⏰ সময় বা সময়সীমা (Time / Period)',
        nextStepId: 'step_time'
      }
    ]
  },

  step_location: {
    id: 'step_location',
    questionBn: 'ঐ স্থানটিতে কী ঘটছে বা স্থানের সাথে কী সম্পর্ক?',
    questionEn: 'What is happening at that location?',
    descriptionBn: 'স্থানটিতে কোনো সক্রিয় কাজ হচ্ছে, নাকি স্রেফ আছেন, নাকি সেখানে যাচ্ছেন?',
    options: [
      {
        labelBn: '⚡ সেখানে কোনো সক্রিয় কাজ বা অ্যাকশন ঘটছে (যেমন: পড়াশোনা, খাওয়া, কাজ করা)',
        resultParticle: 'で (de)',
        explanationBn: 'কোনো স্থানে কোনো গতিশীল কাজ সম্পন্ন হলে সর্বদা で বসে।',
        exampleJp: '図書館で本を読みます。 (としょかんで ほんを よみます)',
        exampleBn: 'লাইব্রেরিতে বই পড়ছি।'
      },
      {
        labelBn: '🚶‍♂️ সেই স্থানের দিকে যাচ্ছি বা যাত্রা করছি (গন্তব্যস্থল)',
        nextStepId: 'step_destination'
      },
      {
        labelBn: '🛋️ সেখানে স্রেফ অবস্থান করছি বা কোনো কিছু আছে/থাকে (স্থির অস্তিত্ব)',
        resultParticle: 'に (ni)',
        explanationBn: 'অস্তিত্ব ক্রিয়া (いる, ある) বা স্থায়ী বসবাসের (住む) সাথে সর্বদা に বসে।',
        exampleJp: '部屋に猫がいます。 (へやに ねこが います)',
        exampleBn: 'ঘরে বিড়াল আছে।'
      },
      {
        labelBn: '🛫 সেই স্থান থেকে যাত্রা বা কাজ শুরু হচ্ছে (উৎস বিন্দু)',
        resultParticle: 'から (kara)',
        explanationBn: 'উৎপত্তি বা সূচনা স্থান বোঝাতে から বসে।',
        exampleJp: 'ダッカから来ました。 (ダッカから きました)',
        exampleBn: 'ঢাকা থেকে এসেছি।'
      }
    ]
  },

  step_destination: {
    id: 'step_destination',
    questionBn: 'গন্তব্যের ক্ষেত্রে আপনি কোনটির ওপর বেশি জোর দিচ্ছেন?',
    questionEn: 'What is the focus of your movement?',
    options: [
      {
        labelBn: '🎯 সুনির্দিষ্ট লক্ষ্যবিন্দু বা অন্তিম স্থানে পৌঁছানো (সবচেয়ে প্রচলিত)',
        resultParticle: 'に (ni)',
        explanationBn: 'চলাচল ক্রিয়ার চূড়ান্ত গন্তব্য নির্দেশ করতে に সবচেয়ে স্বাভাবিক ও নিয়মিত ব্যবহৃত হয়।',
        exampleJp: '学校に行きます。 (がっこうに いきます)',
        exampleBn: 'স্কুলে যাই।'
      },
      {
        labelBn: '🧭 চলার দিক বা অভিমুখ (Heading towards a direction)',
        resultParticle: 'へ (e)',
        explanationBn: 'কোনো অভিমুখে যাত্রা বা দিক প্রাধান্য দিলে へ বসে।',
        exampleJp: '日本へ行きます。 (にほんへ いきます)',
        exampleBn: 'জাপানের উদ্দেশ্যে রওনা দিচ্ছি।'
      }
    ]
  },

  step_subject: {
    id: 'step_subject',
    questionBn: 'আলোচ্য ব্যক্তি বা বিষয়টি কি শ্রোতার কাছে আগেই পরিচিত, নাকি একদম নতুন?',
    questionEn: 'Is the subject already known, or is it new/specific information?',
    options: [
      {
        labelBn: '🗣️ আগেই পরিচিত বিষয়—আমি শুধু তার সম্পর্কে একটি বিবরণ বা তথ্য দিচ্ছি (Topic)',
        resultParticle: 'は (wa)',
        explanationBn: 'বাক্যের সাধারণ বিষয়বস্তু বা টপিক নির্দেশ করতে は বসে। শ্রোতা ইতিমধ্যেই জানে কাকে নিয়ে কথা হচ্ছে।',
        exampleJp: '私はエンジニアです。 (わたしは エンジニアです)',
        exampleBn: 'আমি একজন প্রকৌশলী।'
      },
      {
        labelBn: '🔍 "কে কাজটি করল?" বা নতুন কাউকে নির্দিষ্ট করে শনাক্ত করছি (Identifier)',
        resultParticle: 'が (ga)',
        explanationBn: 'সুনির্দিষ্ট কাউকে শনাক্ত করতে বা প্রশ্নসূচক শব্দের (だれ, なに) উত্তরে が বসে।',
        exampleJp: '田中さんが来ました。 (たなかさんが きました)',
        exampleBn: 'তানাকা সাহেব এসেছেন (অন্য কেউ নয়, তিনিই এসেছেন)।'
      },
      {
        labelBn: '❤️ পছন্দ, অপছন্দ, দক্ষতা বা অনুভূতির বিষয় (যেমন: সুশি পছন্দ, জাপানি বুঝি)',
        resultParticle: 'が (ga)',
        explanationBn: '好き, 嫌い, 上手, 下手, 分かる, 欲しい ইত্যাদির বিষয়বস্তুর সাথে সর্বদা が বসে।',
        exampleJp: 'すしが好きです。 (すしが すきです)',
        exampleBn: 'সুশি পছন্দ করি।'
      },
      {
        labelBn: '➕ পূর্বের তথ্যের সাথে মিল রেখে "ইনিও / আমিও" বোঝাতে চাই (Inclusion)',
        resultParticle: 'も (mo)',
        explanationBn: 'পূর্বের তথ্যের সাথে সমরূপতা বা অন্তর্ভুক্তি প্রকাশ করতে も বসে।',
        exampleJp: '私も学生です。 (わたしも がくせい です)',
        exampleBn: 'আমিও একজন ছাত্র।'
      }
    ]
  },

  step_object: {
    id: 'step_object',
    questionBn: 'কাজটি সরাসরি কোন বস্তুর ওপর ঘটছে, নাকি কোনো ব্যক্তিকে দেওয়া/বলা হচ্ছে?',
    questionEn: 'Is it a physical direct object or an intended recipient/target?',
    options: [
      {
        labelBn: '🍎 কোনো সক্রিয় কাজের সরাসরি বস্তু (যেমন: আপেল খাওয়া, বই পড়া, গান শোনা)',
        resultParticle: 'を (o)',
        explanationBn: 'সক্রিয় ট্রানজিটিভ ক্রিয়ার সরাসরি অবজেক্ট চিহ্নিত করতে সর্বদা を বসে।',
        exampleJp: 'りんごを食べます。 (りんごを たべます)',
        exampleBn: 'আপেল খাচ্ছি।'
      },
      {
        labelBn: '📬 কোনো উদ্দিষ্ট ব্যক্তি যাকে কিছু দেওয়া, বলা বা ফোন করা হচ্ছে (Target Person)',
        resultParticle: 'に (ni)',
        explanationBn: 'কাজের প্রাপক বা উদ্দিষ্ট ব্যক্তি নির্দেশ করতে に বসে।',
        exampleJp: '友達にプレゼントをあげます。 (ともだちに プレゼントを あげます)',
        exampleBn: 'বন্ধুকে উপহার দেব।'
      },
      {
        labelBn: '🚗 যে বাহন বা উপকরণ দিয়ে কাজটি সম্পন্ন হচ্ছে (Means / Instrument)',
        resultParticle: 'で (de)',
        explanationBn: 'উপকরণ, বাহন, ভাষা বা মাধ্যম নির্দেশ করতে で বসে।',
        exampleJp: '箸でご飯を食べます。 (はしで ごはんを たべます)',
        exampleBn: 'চপস্টিক দিয়ে ভাত খাই।'
      }
    ]
  },

  step_companion: {
    id: 'step_companion',
    questionBn: 'আপনি কি কোনো ব্যক্তির সাথে কাজটি করছেন, নাকি জিনিসপত্রের তালিকা দিচ্ছেন?',
    questionEn: 'Are you doing action with a partner, or listing items?',
    options: [
      {
        labelBn: '👫 কোনো ব্যক্তির সাথে একসাথে কাজ করা ("With someone")',
        resultParticle: 'と (to)',
        explanationBn: 'কারো সাথে যৌথভাবে কোনো কাজ সম্পন্ন করা বোঝাতে と বসে।',
        exampleJp: '友達と映画を見ました。 (ともだちと えいがを みました)',
        exampleBn: 'বন্ধুর সাথে সিনেমা দেখেছি।'
      },
      {
        labelBn: '📝 সীমিত ও সম্পূর্ণ তালিকা ("A এবং B এবং অন্য কিছু নয়")',
        resultParticle: 'と (to)',
        explanationBn: 'তালিকায় থাকা সবকটি বস্তু নির্দিষ্টভাবে তুলে ধরতে と বসে।',
        exampleJp: 'パンと牛乳を買いました。 (パンと ぎゅうにゅうを かいました)',
        exampleBn: 'পাউরুটি এবং দুধ কিনেছি।'
      },
      {
        labelBn: '🧺 অসম্পূর্ণ উদাহরণ তালিকা ("A, B ইত্যাদি আরও অনেক কিছু")',
        resultParticle: 'や (ya)',
        explanationBn: 'উদাহরণ হিসেবে কয়েকটি তুলে ধরে আরও সামগ্রী ইঙ্গিত করতে や বসে।',
        exampleJp: 'ノートやペンを買いました。 (ノートや ペンを かいました)',
        exampleBn: 'খাতা, কলম (ইত্যাদি) কিনেছি।'
      }
    ]
  },

  step_time: {
    id: 'step_time',
    questionBn: 'সময়ের ক্ষেত্রে আপনি কী প্রকাশ করতে চাচ্ছেন?',
    questionEn: 'What aspect of time are you expressing?',
    options: [
      {
        labelBn: '⏰ নির্দিষ্ট সময়বিন্দু (যেমন: ৭টায়, রবিবারে, মে মাসে)',
        resultParticle: 'に (ni)',
        explanationBn: 'সংখ্যাবাচক নির্দিষ্ট সময়ের সাথে に বসে।',
        exampleJp: '７時に起きます。 (しちじに おきます)',
        exampleBn: '৭টায় ঘুম থেকে উঠি।'
      },
      {
        labelBn: '⏳ শুরুর সময় ("কখন থেকে")',
        resultParticle: 'から (kara)',
        explanationBn: 'কাজের সূচনা সময় নির্দেশ করতে から বসে।',
        exampleJp: '９時から始まります。 (くじから はじまります)',
        exampleBn: '৯টা থেকে শুরু হবে।'
      },
      {
        labelBn: '🛑 শেষ সময় ("কখন পর্যন্ত অব্যাহত")',
        resultParticle: 'まで (made)',
        explanationBn: 'কোনো কাজ যে সময় পর্যন্ত বিরতিহীনভাবে চলে তা বোঝাতে まで বসে।',
        exampleJp: '５時まで勉強します。 (ごじまで べんきょうします)',
        exampleBn: '৫টা পর্যন্ত পড়াশোনা করব।'
      },
      {
        labelBn: '📅 ডেডলাইন বা শেষ সময়সীমা ("এর পূর্বে জমা দিতে হবে")',
        resultParticle: 'までに (made ni)',
        explanationBn: 'কোনো নির্দিষ্ট সময়ের পূর্বে কাজটি সম্পন্ন করার নির্দেশ দিতে までに বসে।',
        exampleJp: '明日までに提出してください。 (あしたまでに ていしゅつして ください)',
        exampleBn: 'আগামীকালের মধ্যে জমা দিন।'
      }
    ]
  }
};

// Preset Sentences for the Sentence Analyzer
export const analyzerPresetSentences: AnalyzedSentenceItem[] = [
  {
    id: 'sent-1',
    sentenceJp: '私は学校で日本語を勉強します。',
    reading: 'わたし は がっこう で にほんご を べんきょう します。',
    romaji: 'Watashi wa gakkou de nihongo o benkyou shimasu.',
    meaningBn: 'আমি স্কুলে জাপানি ভাষা পড়ি।',
    meaningEn: 'I study Japanese at school.',
    tokens: [
      { text: '私', isParticle: false },
      {
        text: 'は',
        isParticle: true,
        particleSymbol: 'は',
        roleBn: 'টপিক মার্কার',
        roleEn: 'Topic Marker',
        explanationBn: 'বাক্যের প্রধান আলোচ্য বিষয় "আমি"-কে নির্ধারণ করছে।',
        color: 'rose'
      },
      { text: '学校', isParticle: false },
      {
        text: 'で',
        isParticle: true,
        particleSymbol: 'で',
        roleBn: 'কাজের স্থান',
        roleEn: 'Action Location',
        explanationBn: 'পড়াশোনার সক্রিয় কাজটি কোথায় ঘটছে (স্কুল) তা চিহ্নিত করছে।',
        color: 'indigo'
      },
      { text: '日本語', isParticle: false },
      {
        text: 'を',
        isParticle: true,
        particleSymbol: 'を',
        roleBn: 'সরাসরি কর্ম',
        roleEn: 'Direct Object',
        explanationBn: 'পড়ার কাজটি সরাসরি কিসের ওপর পতিত হচ্ছে (জাপানি ভাষা) তা চিহ্নিত করছে।',
        color: 'emerald'
      },
      { text: '勉強します。', isParticle: false }
    ]
  },
  {
    id: 'sent-2',
    sentenceJp: '毎朝７時に友達とバスで会社へ行きます。',
    reading: 'まいあさ しちじ に ともだち と バス で かいしゃ へ いきます。',
    romaji: 'Maiasa shichiji ni tomodachi to basu de kaisha e ikimasu.',
    meaningBn: 'প্রতিদিন সকাল ৭টায় বন্ধুর সাথে বাসে করে কোম্পানির উদ্দেশ্যে যাই।',
    meaningEn: 'Every morning at 7 o\'clock, I go to the company by bus with my friend.',
    tokens: [
      { text: '毎朝', isParticle: false },
      { text: '７時', isParticle: false },
      {
        text: 'に',
        isParticle: true,
        particleSymbol: 'に',
        roleBn: 'নির্দিষ্ট সময়',
        roleEn: 'Specific Time',
        explanationBn: 'সংখ্যাবাচক নির্দিষ্ট সময় (৭টা) নির্দেশ করছে।',
        color: 'amber'
      },
      { text: '友達', isParticle: false },
      {
        text: 'と',
        isParticle: true,
        particleSymbol: 'と',
        roleBn: 'সঙ্গী',
        roleEn: 'Companion (With)',
        explanationBn: 'যার সাথে কাজটি একত্রে করা হচ্ছে (বন্ধু)।',
        color: 'purple'
      },
      { text: 'バス', isParticle: false },
      {
        text: 'で',
        isParticle: true,
        particleSymbol: 'で',
        roleBn: 'যানবাহন / মাধ্যম',
        roleEn: 'Means / Vehicle',
        explanationBn: 'যাওয়ার মাধ্যম বা বাহন (বাস)।',
        color: 'indigo'
      },
      { text: '会社', isParticle: false },
      {
        text: 'へ',
        isParticle: true,
        particleSymbol: 'へ',
        roleBn: 'দিক / অভিমুখ',
        roleEn: 'Direction',
        explanationBn: 'যাত্রার অভিমুখ নির্দেশ করছে (কোম্পানির দিকে)।',
        color: 'cyan'
      },
      { text: '行きます。', isParticle: false }
    ]
  },
  {
    id: 'sent-3',
    sentenceJp: '部屋の中に猫が二匹いますね。',
    reading: 'へや の なか に ねこ が にひき います ね。',
    romaji: 'Heya no naka ni neko ga nihiki imasu ne.',
    meaningBn: 'ঘরের ভেতরে দুটি বিড়াল আছে, তাই না?',
    meaningEn: 'There are two cats inside the room, right?',
    tokens: [
      { text: '部屋', isParticle: false },
      {
        text: 'の',
        isParticle: true,
        particleSymbol: 'の',
        roleBn: 'সম্বন্ধ পদ',
        roleEn: 'Possessive / Modifier',
        explanationBn: 'ঘরের সাথে ভেতরের সম্পর্ক তৈরি করছে (ঘরের ভেতর)।',
        color: 'slate'
      },
      { text: '中', isParticle: false },
      {
        text: 'に',
        isParticle: true,
        particleSymbol: 'に',
        roleBn: 'অস্তিত্বের স্থান',
        roleEn: 'Location of Existence',
        explanationBn: 'বিড়াল দুটির উপস্থিতির স্থান নির্দেশ করছে (います-এর সাথে)।',
        color: 'amber'
      },
      { text: '猫', isParticle: false },
      {
        text: 'が',
        isParticle: true,
        particleSymbol: 'が',
        roleBn: 'অস্তিত্বের কর্তা',
        roleEn: 'Subject of Existence',
        explanationBn: 'যার অস্তিত্ব রয়েছে (বিড়াল) তাকে চিহ্নিত করছে।',
        color: 'rose'
      },
      { text: '二匹います', isParticle: false },
      {
        text: 'ね。',
        isParticle: true,
        particleSymbol: 'ね',
        roleBn: 'সম্মতিসূচক সমাপ্তি',
        roleEn: 'Sentence-Ending Agreement',
        explanationBn: 'শ্রোতার কাছ থেকে সম্মতি বা সমর্থন চাওয়া ("তাই না?")।',
        color: 'purple'
      }
    ]
  },
  {
    id: 'sent-4',
    sentenceJp: '田中さんはすしが好きですが、肉はあまり食べません。',
    reading: 'たなかさん は すし が すき です が、にく は あまり たべません。',
    romaji: 'Tanaka-san wa sushi ga suki desu ga, niku wa amari tabemasen.',
    meaningBn: 'তানাকা সাহেব সুশি পছন্দ করেন কিন্তু মাংস তেমন খান না।',
    meaningEn: 'Mr. Tanaka likes sushi, but he doesn\'t eat meat much.',
    tokens: [
      { text: '田中さん', isParticle: false },
      {
        text: 'は',
        isParticle: true,
        particleSymbol: 'は',
        roleBn: 'টপিক মার্কার',
        roleEn: 'Topic Marker',
        explanationBn: 'তানাকা সাহেবকে আলোচনার প্রধান বিষয় হিসেবে উপস্থাপন করছে।',
        color: 'rose'
      },
      { text: 'すし', isParticle: false },
      {
        text: 'が',
        isParticle: true,
        particleSymbol: 'が',
        roleBn: 'পছন্দের লক্ষ্য',
        roleEn: 'Object of Like (Suki)',
        explanationBn: '好きです এর আগে পছন্দের বস্তু সুশি চিহ্নিত করতে が বসেছে।',
        color: 'emerald'
      },
      { text: '好きです', isParticle: false },
      {
        text: 'が、',
        isParticle: true,
        particleSymbol: 'が',
        roleBn: 'সংযোজক (কিন্তু)',
        roleEn: 'Conjunction (But)',
        explanationBn: 'দুটি পরস্পরবিরোধী বাক্যকে যুক্ত করছে ("কিন্তু")।',
        color: 'amber'
      },
      { text: '肉', isParticle: false },
      {
        text: 'は',
        isParticle: true,
        particleSymbol: 'は',
        roleBn: 'বৈসাদৃশ্য মার্কার',
        roleEn: 'Contrast Marker',
        explanationBn: 'সুশির বিপরীতভাবে মাংসের ক্ষেত্রে কী ঘটে তা বৈসাদৃশ্য দিয়ে তুলে ধরছে।',
        color: 'rose'
      },
      { text: 'あまり食べません。', isParticle: false }
    ]
  }
];

// Interactive Lab Sentence Questions with WHY explanation for every choice
export const labSentenceQuestions: LabSentenceQuestion[] = [
  {
    id: 'lab-1',
    sentencePre: '私は図書館',
    sentencePost: '本を読みます。',
    readingPre: 'わたしは としょかん',
    readingPost: 'ほんを よみます。',
    meaningBn: 'আমি লাইব্রেরিতে বই পড়ি।',
    correctParticle: 'で',
    options: ['で', 'に', 'を', 'へ'],
    explanations: {
      'で': {
        isCorrect: true,
        reasonBn: 'সঠিক! 読みます (পড়া) একটি সক্রিয় গতিশীল কাজ। কোনো স্থানে কোনো কাজ সম্পন্ন হলে সেই স্থানের পর সর্বদা で বসে।'
      },
      'に': {
        isCorrect: false,
        reasonBn: 'ভুল! に বসে কোনো স্থানে স্রেফ থাকা (いる/ある) অথবা গন্তব্যে যাওয়ার (行く) ক্ষেত্রে। বই পড়ার মতো সক্রিয় কাজে に বসে না।',
        alteredMeaningBn: 'লাইব্রেরিতে থাকার বা যাওয়ার বিভ্রান্তি তৈরি করে।'
      },
      'を': {
        isCorrect: false,
        reasonBn: 'ভুল! を বসে কাজের সরাসরি অবজেক্টের পর (যেমন: 本を)। স্থান নিজে কখনো পড়ার অবজেক্ট হতে পারে না।',
        alteredMeaningBn: 'অর্থ দাঁড়িয়ে যাবে "লাইব্রেরিকে পাঠ করি", যা অযৌক্তিক!'
      },
      'へ': {
        isCorrect: false,
        reasonBn: 'ভুল! へ কেবল চলার দিক নির্দেশ করে (যেমন: 図書館へ行く)। পড়ার কাজের স্থানে へ বসে না।'
      }
    }
  },
  {
    id: 'lab-2',
    sentencePre: '田中さん',
    sentencePost: '日本語がとても上手です。',
    readingPre: 'たなかさん',
    readingPost: 'にほんごが とても じょうずです。',
    meaningBn: 'তানাকা সাহেব জাপানি ভাষায় খুব দক্ষ।',
    correctParticle: 'は',
    options: ['は', 'を', 'に', 'で'],
    explanations: {
      'は': {
        isCorrect: true,
        reasonBn: 'সঠিক! তানাকা সাহেব হলেন এই বাক্যের সাধারণ টপিক বা আলোচনার বিষয়। টপিকের পর は বসে।'
      },
      'を': {
        isCorrect: false,
        reasonBn: 'ভুল! 上手 (দক্ষতা) একটি না-বিশেষণ, কোনো সক্রিয় ক্রিয়া নয়। বিশেষণের আগে ব্যক্তির ওপর を বসতে পারে না।'
      },
      'に': {
        isCorrect: false,
        reasonBn: 'ভুল! に বসালে তানাকা সাহেবের প্রতি কোনো কাজ প্রেরণের মতো অর্থ হয়ে যায়।'
      },
      'で': {
        isCorrect: false,
        reasonBn: 'ভুল! で বসালে তানাকা সাহেবকে কোনো মাধ্যম বা স্থান মনে হবে।'
      }
    }
  },
  {
    id: 'lab-3',
    sentencePre: '私はすし',
    sentencePost: '大好きです。',
    readingPre: 'わたしは すし',
    readingPost: 'だいすき です。',
    meaningBn: 'আমি সুশি খুব পছন্দ করি।',
    correctParticle: 'が',
    options: ['が', 'を', 'に', 'で'],
    explanations: {
      'が': {
        isCorrect: true,
        reasonBn: 'সঠিক! পছন্দ (好き / 大好き), অপছন্দ (嫌い), সামর্থ্য (できる) এবং বোধগম্যতার (分かる) কাঙ্ক্ষিত বিষয়ের সাথে সর্বদা が বসে।'
      },
      'を': {
        isCorrect: false,
        reasonBn: 'ভুল! এটি বিদেশি শিক্ষার্থীদের সবচেয়ে সাধারণ ভুল! বাংলায় "সুশি পছন্দ করি" বললেও জাপানিতে 好き কোনো কাজ নয়, বরং একটি গুণ বা অবস্থা। তাই を নয়, が বসে।',
        alteredMeaningBn: 'ব্যাকরণগতভাবে ভুল জাপানি বাক্য তৈরি করে।'
      },
      'に': {
        isCorrect: false,
        reasonBn: 'ভুল! に পছন্দ প্রকাশের ক্ষেত্রে প্রযোজ্য নয়।'
      },
      'で': {
        isCorrect: false,
        reasonBn: 'ভুল! で স্থান বা মাধ্যম বোঝায়, পছন্দের অনুভূতি নয়।'
      }
    }
  },
  {
    id: 'lab-4',
    sentencePre: '会議は９時',
    sentencePost: '５時までです。',
    readingPre: 'かいぎは くじ',
    readingPost: 'ごじ まで です。',
    meaningBn: 'মিটিং ৯টা থেকে ৫টা পর্যন্ত।',
    correctParticle: 'から',
    options: ['から', 'まで', 'に', 'で'],
    explanations: {
      'から': {
        isCorrect: true,
        reasonBn: 'সঠিক! ৯টা হলো মিটিং শুরুর সময়। শুরুর সময় বা স্থান নির্দেশ করতে から বসে।'
      },
      'まで': {
        isCorrect: false,
        reasonBn: 'ভুল! ৯টা এবং ৫টা দুটিই যদি まで হয়, তবে শুরুর কোনো বিন্দু থাকে না।'
      },
      'に': {
        isCorrect: false,
        reasonBn: 'ভুল! ９時に ৫時まで ব্যাকরণগতভাবে সামঞ্জস্যপূর্ণ নয়।'
      },
      'で': {
        isCorrect: false,
        reasonBn: 'ভুল! ৯টায় সময়ব্যপ্তি হিসেবে で প্রযোজ্য নয়।'
      }
    }
  },
  {
    id: 'lab-5',
    sentencePre: '明日の朝７時',
    sentencePost: '駅で会いましょう。',
    readingPre: 'あしたの あさ しちじ',
    readingPost: 'えきで あいましょう。',
    meaningBn: 'আগামীকাল সকাল ৭টায় স্টেশনে দেখা করি।',
    correctParticle: 'に',
    options: ['に', 'で', 'を', 'へ'],
    explanations: {
      'に': {
        isCorrect: true,
        reasonBn: 'সঠিক! ৭টা একটি নির্দিষ্ট সংখ্যাবাচক সময়বিন্দু। নির্দিষ্ট সময়ের পর সর্বদা に বসে।'
      },
      'で': {
        isCorrect: false,
        reasonBn: 'ভুল! で স্থানে বসে (যেমন: 駅で), কিন্তু নির্দিষ্ট সময়ের সাথে に বসে।'
      },
      'を': {
        isCorrect: false,
        reasonBn: 'ভুল! সময় কখনো ক্রিয়ার অবজেক্ট হয় না।'
      },
      'へ': {
        isCorrect: false,
        reasonBn: 'ভুল! へ কেবল দিক বা অভিমুখে বসে, সময়ে নয়।'
      }
    }
  }
];

// 60-Second Challenge Rapid Questions Pool
export const challengeQuestionsPool = [
  {
    id: 'c-1',
    promptJp: '学校（　）行きます。',
    promptBn: 'স্কুলে যাচ্ছি।',
    options: ['に', 'で', 'を', 'は'],
    correct: 'に',
    tip: 'গন্তব্যের শেষ বিন্দু = に'
  },
  {
    id: 'c-2',
    promptJp: 'バス（　）来ました。',
    promptBn: 'বাসে করে এসেছি।',
    options: ['で', 'に', 'を', 'へ'],
    correct: 'で',
    tip: 'যানবাহন / মাধ্যম = で'
  },
  {
    id: 'c-3',
    promptJp: 'パン（　）食べます。',
    promptBn: 'পাউরুটি খাচ্ছি।',
    options: ['を', 'が', 'に', 'で'],
    correct: 'を',
    tip: 'সরাসরি অবজেক্ট = を'
  },
  {
    id: 'c-4',
    promptJp: '犬（　）好きです。',
    promptBn: 'কুকুর পছন্দ করি।',
    options: ['が', 'を', 'に', 'は'],
    correct: 'が',
    tip: 'পছন্দ (好き) = が'
  },
  {
    id: 'c-5',
    promptJp: '友達（　）話します。',
    promptBn: 'বন্ধুর সাথে কথা বলব।',
    options: ['と', 'で', 'を', 'へ'],
    correct: 'と',
    tip: 'সঙ্গী (With) = と'
  },
  {
    id: 'c-6',
    promptJp: '公園（　）走ります。',
    promptBn: 'পার্কে দৌড়াচ্ছি।',
    options: ['で', 'に', 'へ', 'と'],
    correct: 'で',
    tip: 'কাজের স্থান = で'
  },
  {
    id: 'c-7',
    promptJp: '部屋（　）猫がいます。',
    promptBn: 'ঘরে বিড়াল আছে।',
    options: ['に', 'で', 'を', 'と'],
    correct: 'に',
    tip: 'অস্তিত্বের স্থান (いる) = に'
  },
  {
    id: 'c-8',
    promptJp: 'わたし（　）田中です。',
    promptBn: 'আমি তানাকা।',
    options: ['は', 'が', 'を', 'に'],
    correct: 'は',
    tip: 'টপিক মার্কার = は'
  },
  {
    id: 'c-9',
    promptJp: 'だれ（　）来ましたか。',
    promptBn: 'কে এসেছে?',
    options: ['が', 'は', 'を', 'に'],
    correct: 'が',
    tip: 'প্রশ্নশব্দ だれ = が'
  },
  {
    id: 'c-10',
    promptJp: 'これ（　）私の本です。',
    promptBn: 'এটি আমার বই।',
    options: ['は', 'が', 'に', 'で'],
    correct: 'は',
    tip: 'টপিক = は'
  },
  {
    id: 'c-11',
    promptJp: '日本（　）行きたいです。',
    promptBn: 'জাপানে যেতে চাই।',
    options: ['に', 'で', 'を', 'と'],
    correct: 'に',
    tip: 'গন্তব্য = に'
  },
  {
    id: 'c-12',
    promptJp: '日本語（　）分かります。',
    promptBn: 'জাপানি ভাষা বুঝি।',
    options: ['が', 'を', 'で', 'に'],
    correct: 'が',
    tip: 'বোঝা (分かる) = が'
  },
  {
    id: 'c-13',
    promptJp: '東京（　）京都まで。',
    promptBn: 'টোকিও থেকে কিয়োটো পর্যন্ত।',
    options: ['から', 'まで', 'に', 'で'],
    correct: 'から',
    tip: 'শুরুর স্থান = から'
  },
  {
    id: 'c-14',
    promptJp: 'りんご（　）買いました。',
    promptBn: 'আপেল কিনেছি।',
    options: ['を', 'が', 'で', 'に'],
    correct: 'を',
    tip: 'কেনার অবজেক্ট = を'
  },
  {
    id: 'c-15',
    promptJp: '彼（　）親切ですね。',
    promptBn: 'তিনি দয়ালু, তাই না?',
    options: ['は', 'が', 'を', 'で'],
    correct: 'は',
    tip: 'টপিক = は'
  },
  {
    id: 'c-16',
    promptJp: '５時（　）会いましょう。',
    promptBn: '৫টায় দেখা করব।',
    options: ['に', 'で', 'を', 'へ'],
    correct: 'に',
    tip: 'নির্দিষ্ট সময় = に'
  }
];

// Timeline for time particles
export const timeParticlesTimeline: TimeTimelineItem[] = [
  {
    timeLabel: '৯:০০ (Point in Time)',
    particle: 'に (ni)',
    particleBn: 'নির্দিষ্ট সময়বিন্দু',
    usageBn: 'ঘড়ির কাঁটায় নির্দিষ্ট কোনো মুহূর্তে একটি ঘটনা ঘটলে に বসে।',
    exampleJp: '毎朝９時に始まります。',
    exampleBn: 'প্রতিদিন সকাল ৯টায় শুরু হয়।',
    nuanceBn: 'একক কোনো সময় নির্দেশ করে।'
  },
  {
    timeLabel: '৯:০০ ─────────────>',
    particle: 'から (kara)',
    particleBn: 'শুরুর সময় (From)',
    usageBn: 'কোনো কাজ বা পরিস্থিতির সূচনাবিন্দু চিহ্নিত করতে から বসে।',
    exampleJp: '９時から働きます。',
    exampleBn: '৯টা থেকে কাজ করব।',
    nuanceBn: 'কাজের শুভ সূচনা প্রকাশ করে।'
  },
  {
    timeLabel: '─────────────> ৫:০০',
    particle: 'まで (made)',
    particleBn: 'সমাপ্তি পর্যন্ত (Until)',
    usageBn: 'কোনো কাজ যে সময় পর্যন্ত বিরতিহীনভাবে চলতে থাকে তাকে বোঝায়।',
    exampleJp: '５時まで働きます。',
    exampleBn: '৫টা পর্যন্ত কাজ করব।',
    nuanceBn: 'পুরো সময়কাল জুড়ে কাজটির ব্যাপ্তি বোঝায়।'
  },
  {
    timeLabel: '─────── [ ৫:০০ এর পূর্বে ] ⏰',
    particle: 'までに (made ni)',
    particleBn: 'ডেডলাইন / সময়সীমার মধ্যে (By)',
    usageBn: 'ঐ নির্দিষ্ট সময় বা তার পূর্বেই কাজটি সম্পূর্ণ করতে হবে—এমন শেষ সীমা নির্দেশ করে।',
    exampleJp: '５時までにレポートを出してください。',
    exampleBn: '৫টার মধ্যে রিপোর্টটি জমা দিন।',
    nuanceBn: 'অবিরাম কাজ নয়, বরং শেষ মুহূর্তের পূর্বেই ফলাফল চাওয়া।'
  }
];

// Visual particle stories / metaphors
export const visualParticleStories: Record<string, ParticleVisualStory> = {
  'wa': {
    titleBn: 'は: স্পটলাইটের আলো 🔦',
    metaphor: 'একটি অন্ধকার মঞ্চে যে চরিত্রের ওপর স্পটলাইট ফেলা হয়, সে হলো "টপিক"।',
    diagram: '🔦 ───> [ わたし ] は [ がくせい です ]',
    explanationBn: 'は মূলত বলে: "সবাই শুনুন, এখন আমরা এই মানুষটি বা বিষয়টি নিয়ে কথা বলব।"'
  },
  'ga': {
    titleBn: 'が: লেজার পয়েন্টার 🎯',
    metaphor: 'ভিড়ের মধ্য থেকে নির্দিষ্ট একজনকে আঙুল দিয়ে দেখিয়ে দেওয়া: "ঐ যে সে!"',
    diagram: '🎯 ───> [ たなかさん ] が [ きました ]',
    explanationBn: 'が নতুন তথ্য বা প্রশ্নের উত্তরে সুনির্দিষ্ট কাউকে চিহ্নিত করে।'
  },
  'o': {
    titleBn: 'を: কাজের লক্ষ্যবস্তু 🍎🏹',
    metaphor: 'তীর বা কাজ গিয়ে যার বুকে আঘাত করে, সে হলো অবজেক্ট।',
    diagram: '[ たべる ] 🏹 ───> 🍎 [ りんご ] を',
    explanationBn: 'খাওয়ার কাজ সরাসরি আপেলের ওপর পড়ছে, তাই আপেলটি を পায়।'
  },
  'ni': {
    titleBn: 'に: পিন বা মার্কার 📍',
    metaphor: 'মানচিত্রে পিন মেরে একটি নির্দিষ্ট লক্ষ্য বা গন্তব্য আঁকা।',
    diagram: '🏠 ────────✈️───────> 📍 [ がっこう ] に',
    explanationBn: 'গন্তব্যের শেষ বিন্দু বা ঘড়ির কাটার কাঁটায় নির্দিষ্ট সময়বিন্দুতে に বসে।'
  },
  'de': {
    titleBn: 'で: কর্মক্ষেত্র বা মঞ্চ 🎪🔨',
    metaphor: 'একটি কর্মমুখর তাঁবু বা স্টেজ যার ভেতর নানা কর্মকাণ্ড বা হাতুড়ি পেটানো চলছে।',
    diagram: '🎪 [ としょかん で 📖 べんきょう します ]',
    explanationBn: 'যে জায়গার সীমানার ভেতরে কোনো সক্রিয় কাজ হচ্ছে তা হলো で।'
  },
  'to': {
    titleBn: 'と: হাত মেলানো 🤝',
    metaphor: 'দুজন বন্ধু একসাথে হাত ধরে হেঁটে যাচ্ছে।',
    diagram: '👤 🤝 👤 [ ともだち と ]',
    explanationBn: 'কোনো কাজ একত্রে ভাগ করে নেওয়া বা সম্পূর্ণ তালিকা তৈরি করতে と বসে।'
  }
};
