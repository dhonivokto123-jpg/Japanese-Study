import fs from 'fs';
import path from 'path';

// Helper to escape XML
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// 20 sheets data corresponding to the 20 uploaded images
const sheets = [
  {
    id: 'particle-wa-guide-p1',
    filename: 'particle-wa-guide-p1.svg',
    pageNumber: '1',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        badge: 'は Particles',
        badgeColor: '#E11D48',
        formula: '• Sub + は + Obj(topic) + です。',
        explanation: 'は Particle হিসেবে সবসময় Subject এর পর বসে এবং বাক্যের Topic (বিষয়) কে নির্দেশ করে। যেমন:',
        examples: [
          { jp: 'わたし は がくせい です。', bn: '(আমি ছাত্র)', subnote: 'わたし (Subject) এবং がくせい (Topic), Subject এর পর は Particle বসে বাক্যের がくせい (Topic) কে নির্দেশ করেছে।' }
        ]
      },
      {
        formula: '• を / が = は + Negative Sentence',
        explanation: 'Negative Sentence বলার সময়, を এবং が Particles এর প্রতিচ্ছবি হিসেবে は Particle বসে। যেমন:',
        examples: [
          { jp: '1. わたし は くるま を もっています。', bn: '(আমার গাড়ি আছে) [Positive]' },
          { jp: '2. わたし は くるま は もっていません。', bn: '(আমার গাড়ি নেই) [Negative: を এর বদলে は]' },
          { jp: '3. はは は おんがく が すき です。', bn: '(মা গানবাজনা পছন্দ করে) [Positive]' },
          { jp: '   でも、クラシック は すき ではありません。', bn: '(কিন্তু ক্লাসিক্যাল সংগীত পছন্দ করেন না) [Negative: が এর বদলে は]' }
        ],
        subnote: 'এখানে, ১ম এবং ৩য় Positive Sentence এ নিয়ম অনুযায়ী を এবং が বসছে। কিন্তু Negative Sentence এ は Particle উপরের নিয়ম অনুযায়ী বসছে।'
      }
    ],
    footerNote: 'Note: は Particle হিসেবে যখন Subject এর পর বসে তখন "ওয়া" উচ্চারণ হয়।'
  },
  {
    id: 'particle-wa-guide-p2',
    filename: 'particle-wa-guide-p2.svg',
    pageNumber: '2',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        formula: '• [Subject は object が、Subject は object...] Contrastive Sentence (বিপরীত বাক্য)',
        explanation: 'Contrastive Sentence হচ্ছে বিপরীত বাক্য। দুটি বিপরীত বাক্য কে একসাথে বলার সময় object এর পর は particle বসে। বিপরীত বাক্যে একপক্ষ Positive হলে অন্য পক্ষ Negative হয়।',
        examples: [
          { jp: 'わたし は ぎゅうにく は すき です が、とりにく は きらい です。', bn: '(আমি গরুর মাংস পছন্দ করি কিন্তু মুরগীর মাংস অপছন্দ করি)' },
          { jp: 'ミラーさん は テニス は じょうず です が、サッカー は へた です。', bn: '(মি. মিলার টেনিস খেলায় পারদর্শী কিন্তু ফুটবল খেলায় অপারদর্শী)' }
        ]
      },
      {
        formula: '• に, で, へ, と, から + は (Compound Particles)',
        explanation: 'には, では, へは, とは, からは এরকম একসাথে 2 Particles এর মধ্যে は Particle পূর্বের শব্দকে বেশি হাইলাইটস করে। অর্থ একই থাকে। এগুলোর আগে অবশ্যই Noun/Time থাকবে। は Particle Noun & Time কে বেশি গুরুত্ব দিয়ে বলে থাকে।',
        examples: [
          { jp: '1: まいにち がっこう では 4じかんぐらい にほんご を べんきょうして います。', bn: '(প্রতিদিন স্কুলে প্রায় ৪ ঘণ্টা জাপানি ভাষা পড়ি)' },
          { jp: '2: にほん では なかなか うま を みる ことができません。', bn: '(জাপানে এতো সহজে ঘোড়া দেখা যায় না)' },
          { jp: '3: はは とは よく デパート へ いきます が、ちち とは あまり いきません。', bn: '(মায়ের সাথে প্রায়ই ডিপার্টমেন্টাল স্টোরে যাই কিন্তু বাবার সাথে তেমন যাই না)' }
        ]
      }
    ]
  },
  {
    id: 'particle-wa-ka-guide-p3',
    filename: 'particle-wa-ka-guide-p3.svg',
    pageNumber: '3',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        formula: '• Object থেকে Subject + は',
        explanation: 'বাক্যের Object যখন Subject হয়, তখন Subject এর পর は Particle বসে।',
        examples: [
          { jp: 'じむしょ に ミラーさん が います。', bn: '(অফিসে মি. মিলার আছে) [Subject: じむしょ, Object: ミラーさん]' },
          { jp: 'ミラーさん は じむしょ に います。', bn: '(মি. মিলার অফিসে আছে) [Subject: ミラーさん, Object: じむしょ]' }
        ]
      },
      {
        badge: 'か Particles',
        badgeColor: '#E11D48',
        formula: '• ...ですか。...ますか。(প্রশ্নবোধক বাক্য)',
        explanation: 'যেকোনো বাক্যের শেষে か Particle বসে বাক্যকে প্রশ্নবোধক বাক্য করা হয়। বাক্যের শেষে か Particle থাকা মানেই হচ্ছে প্রশ্নবোধক বাক্য। জাপানি ভাষায় প্রশ্নবোধক বাক্য চেনার এটাই সহজ এবং একমাত্র কৌশল।',
        examples: [
          { jp: 'あなた の なまえ は なん です か。', bn: '(আপনার নাম কী?)' },
          { jp: 'あなた は なんさい です か。', bn: '(আপনার বয়স কতো?)' },
          { jp: 'あなた は がくせい です か。', bn: '(আপনি কি ছাত্র?)' }
        ]
      },
      {
        formula: '• ...か...か... (একটি বিষয় নিয়ে একাধিক বিভ্রান্ত/বিকল্প)',
        explanation: 'আমার সামনে মলাট দেওয়া একটি বই আছে। এখন আমি বিভ্রান্তের মধ্যে আছি, এটা কি বই নাকি খাতা। এরকম একটা বিষয় নিয়ে একাধিক বিভ্রান্ত থাকলে প্রশ্ন করার সময় ...か...か... অর্থাৎ Double か, か ব্যবহার করা হয়।',
        examples: [
          { jp: 'これ は じしょ です か、ほん です か。', bn: '(এটা কি ডিকশনারি নাকি বই?)' },
          { jp: 'この かばん は あなた の です か、ミラーさん の です か。', bn: '(এই ব্যাগটা কি আপনার নাকি মি. মিলারের?)' },
          { jp: 'これ は [ 7 ] です か、[ 9 ] です か。', bn: '(এটা কি ৭ নাকি ৯?)' }
        ]
      }
    ]
  },
  {
    id: 'particle-ka-mo-guide-p4',
    filename: 'particle-ka-mo-guide-p4.svg',
    pageNumber: '4',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        formula: '• Noun か Noun (\'বা\' অর্থে)',
        explanation: 'দুটি Noun এর মাঝে か Particle \'বা\' অর্থে ব্যবহার হয়ে থাকে।',
        examples: [
          { jp: 'あした は あめ か ゆき が ふります。', bn: '(আগামীকাল বৃষ্টি বা তুষার পড়বে)' },
          { jp: 'りんご か みかん を たべます。', bn: '(আপেল বা কমলা খাবো)' },
          { jp: 'どようび か にちようび ともだち に あいます。', bn: '(শনিবার বা রবিবার বন্ধুর সাথে দেখা করবো)' }
        ]
      },
      {
        formula: '• なにか / どこか... (কিছু / কোথাও)',
        explanation: 'বাক্যে なにか (কিছু), どこか (কোথাও) অর্থে ব্যবহার হয়ে থাকে।',
        examples: [
          { jp: 'のど が かわきましたから、なに か のみませんか。', bn: '(তৃষ্ণা পেয়েছে সেজন্য কিছু পান করবেন নাকি?)' },
          { jp: 'なつやすみ は どこか へ いきますか。', bn: '(গ্রীষ্মের ছুটিতে কোথাও যাবেন কি?)' }
        ]
      },
      {
        badge: 'も Particles',
        badgeColor: '#E11D48',
        formula: '• Sub + は + Obj です、Sub + も + Obj です。',
        explanation: 'も Particle এর উচ্চারণ বাংলা \'ও\' এর মতো। দুটো বাক্যের Topic যদি এক রকম হয়, তাহলে প্রথম বাক্যের Subject এর পর は বসে এবং দ্বিতীয় বাক্যের Subject এর পর も Particle বসে।'
      }
    ]
  },
  {
    id: 'particle-mo-no-guide-p5',
    filename: 'particle-mo-no-guide-p5.svg',
    pageNumber: '5',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        formula: '• も Particle Example (একই Topic)',
        examples: [
          { jp: 'キムラさん は がくせい です、わたし も がくせい です。', bn: '(কিমুরা সান ছাত্র, আমিও ছাত্র)' }
        ],
        subnote: 'এখানে বাক্যের Topic がくせい। দুটো বাক্যের টপিক এক হওয়ায়, দ্বিতীয় বাক্যের Subject এর পর も বসছে।'
      },
      {
        formula: '• WH Question-এর পর も Particle + Negative Verb',
        explanation: 'Wh question বলতে なん、なに、だれ、どこ、いつ ইত্যাদি। এসবের পর যদি も Particle থাকে, তাহলে তার পরের Verb সব সময় Negative (ません/ませんでした) হবে।',
        examples: [
          { jp: 'なに も たべません。', bn: '(কিছুই খাবো না)' },
          { jp: 'どこ へ も いきませんでした。', bn: '(কোথাও গিয়েছিলাম না)' }
        ]
      },
      {
        badge: 'の Particles',
        badgeColor: '#E11D48',
        formula: '• の Particles (\'র\' বা \'এর\' অর্থে)',
        explanation: 'の Particle হিসেবে দুটি Noun এর মাঝে \'র\' বা \'এর\' অর্থে ব্যবহৃত হয়ে থাকে। আমা\'র\' বই, তোমা\'র\' খাতা, মিরা\'র\' বাড়ি ইত্যাদি ক্ষেত্রে ১ম Noun এর পর の তারপর ২য় Noun বসে।',
        examples: [
          { jp: 'わたし の ほん です。', bn: '(আমার বই)' },
          { jp: 'あなた の じしょ ですか。', bn: '(তোমার বই?)' },
          { jp: 'これ は にほん の ほん です。', bn: '(এটা জাপানের বই)' }
        ]
      }
    ]
  },
  {
    id: 'particle-ga-guide-p4',
    filename: 'particle-ga-guide-p4.svg',
    pageNumber: '4',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        badge: 'が Particles',
        badgeColor: '#E11D48',
        explanation: 'が একটি Subject Marker Particle. বাক্যে が Particle সবসময় Subject কে focus করে থাকে। が এর কোনো শাব্দিক অর্থ নেই। বিভিন্ন জায়গায় এর ব্যবহার রয়েছে।',
        formula: '• Person/Animals/Things が あります/います。',
        subnote: 'কোনো বস্তু বা প্রাণীর অবস্থান বোঝানোর ক্ষেত্রে います/あります ব্যবহার হয়। প্রাণী বা মানুষের ক্ষেত্রে います এবং বস্তুর ক্ষেত্রে あります। যে বস্তু বা প্রাণীর অবস্থান আছে/নাই বোঝায় তারপর が Particle বসে।',
        examples: [
          { jp: 'コンピューター が あります。', bn: '(কম্পিউটার আছে)' },
          { jp: 'くるま が ありません。', bn: '(গাড়ি নেই)' },
          { jp: 'おとこ の ひと が います。', bn: '(পুরুষ মানুষ আছে)' },
          { jp: 'かいぎしつ に きむらさん が います。', bn: '(কনফারেন্স রুমে মি. কিমুরা আছে)' },
          { jp: 'にほん に さくら が あります。', bn: '(জাপানে সাকুরা ফুল আছে)' }
        ]
      },
      {
        formula: '• Object が Adjective',
        explanation: 'বাক্যের Object এর পর যদি কোনো Adjective থাকে, তাহলে Adjective এর আগে Object এর পর が Particle বসে। (Note: বাক্যকে কি দ্বারা প্রশ্ন করলে Object পাওয়া যায়। Adjective: ১. な-Adjective ২. い-Adjective)',
        examples: [
          { jp: 'わたし は にほんのさくら が すき です。', bn: '(আমি জাপানের সাকুরা পছন্দ করি) [Sub: わたし, Obj: にほんのさくら, Adj: すき]' }
        ]
      }
    ]
  },
  {
    id: 'particle-ga-guide-p5',
    filename: 'particle-ga-guide-p5.svg',
    pageNumber: '5',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        formula: '• Object が Adjective (Continued)',
        examples: [
          { jp: 'わたし は とりにく が きらいです。', bn: '(আমি মুরগির মাংস অপছন্দ করি)' },
          { jp: 'ミラーさん は テニス が じょうず です。', bn: '(মি. মিলার টেনিস খেলায় পারদর্শী)' },
          { jp: 'にほんの やま の なかで ふじさん が いちばん たかい やまです。', bn: '(জাপানের পাহাড়ের মধ্যে ফুজি সান সবচেয়ে উঁচু পাহাড়)' }
        ]
      },
      {
        formula: '• N が わかります / わかりません。',
        explanation: 'যে জিনিস বুঝি বা বুঝি না তারপর が + わかります/わかりません বসে।',
        examples: [
          { jp: 'わたし は えいご が わかりません。', bn: '(আমি ইংরেজি ভাষা বুঝি না)' },
          { jp: 'わたし は にほんご が わかります。', bn: '(আমি জাপানি ভাষা বুঝি)' }
        ]
      },
      {
        formula: '• Person\'s/Animals/Things が ほしい。',
        explanation: 'ほしい অর্থ \'চাই\'। অর্থাৎ কোনো কিছু চাওয়ার ক্ষেত্রে যেটা চাই তারপর が Particle বসে। অন্যভাবে বলা যায়, ほしい এর আগে が Particle বসে।',
        examples: [
          { jp: 'わたし は くるま が ほしい です。', bn: '(আমি গাড়ি চাই)' },
          { jp: 'ミラーさん の つかった シャツ が ほしい です。', bn: '(মি. মিলারের ব্যবহার করা শার্ট চাই)' },
          { jp: 'にほんご の ほん が ほしいです。', bn: '(জাপানি ভাষার বই চাই)' },
          { jp: 'パソコン が ほしい です。', bn: '(পার্সোনাল কম্পিউটার চাই)' }
        ]
      }
    ]
  },
  {
    id: 'particle-to-guide-p6',
    filename: 'particle-to-guide-p6.svg',
    pageNumber: '6',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        badge: 'と Particles',
        badgeColor: '#E11D48',
        formula: '• Noun と Noun ... (\'এবং\' অর্থে)',
        explanation: 'দুটি নাউনকে একসাথে যুক্ত করার জন্য এবং অর্থে と বসে।',
        examples: [
          { jp: 'ぎんこう の やすみ は どようび と にちようび です。', bn: '(ব্যাংকের ছুটি শনিবার এবং রবিবার)' },
          { jp: 'わたし は すし と てんぷら が すき です。', bn: '(আমি সুশি এবং তেনপুরা পছন্দ করি)' }
        ]
      },
      {
        formula: '• Person/Animal と Verb... (\'সাথে\' অর্থে)',
        explanation: 'কোনো প্রাণী বা ব্যক্তির সাথে কোথাও যাওয়া-আসা হলে বা কোনো কাজ করলে যাকে নিয়ে কাজ করা হয় তার পরে と (সাথে) অর্থে বসে।',
        examples: [
          { jp: 'ともだち と テニス を します。', bn: '(বন্ধুর সাথে টেনিস খেলবো)' },
          { jp: 'かぞく と にほん へ いきます。', bn: '(পরিবারের সাথে জাপানে যাবো)' },
          { jp: 'こども と にわ で あそびました。', bn: '(বাচ্চার সাথে বাগানে খেলা করেছি)' }
        ],
        subnote: 'Note: একা একা কোথাও যাওয়া আসা হলে ひとり で বসে। যেমন: ひとり で にほん へ きました。(একা একা জাপানে এসেছি)'
      }
    ]
  },
  {
    id: 'particle-kara-made-ya-guide-p6',
    filename: 'particle-kara-made-ya-guide-p6.svg',
    pageNumber: '6',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        badge: 'から、まで Particle (থেকে, পর্যন্ত)',
        badgeColor: '#E11D48',
        formula: '• N1 から N2 まで',
        explanation: 'から অর্থ \'থেকে\' এবং まで অর্থ \'পর্যন্ত\'। ৩ ধরনের বাক্যে から、まで ব্যবহার হয়ে থাকে:',
        examples: [
          { jp: '1. 9じ から 3じ まで べんきょうします。', bn: '(৯টা থেকে ৩টা পর্যন্ত লেখাপড়া করি) [সময়]' },
          { jp: '   おおさか から とうきょう まで どのくらい かかりますか。', bn: '(ওসাকা থেকে টোকিও পর্যন্ত কতক্ষণ প্রয়োজন) [জায়গা]' },
          { jp: '2. がっこう は 10じ から はじまります。', bn: '(বিদ্যালয় ১০টা থেকে শুরু হয়) [আলাদা]' },
          { jp: '   がっこう は 1じ まで あきます。', bn: '(বিদ্যালয় ১টা পর্যন্ত খোলা)' },
          { jp: '3. がっこう は 10じ から 1じ まで です。', bn: '(বিদ্যালয় ১০টা থেকে ১টা পর্যন্ত) [শুরু ও শেষ]' },
          { jp: '   ひるやすみ は 12じ から 1じ まで です。', bn: '(দুপুরের বিরতি ১২টা থেকে ১টা পর্যন্ত)' }
        ]
      },
      {
        badge: 'や...など Particle (এবং...ইত্যাদি)',
        badgeColor: '#E11D48',
        explanation: '“আমি বাজার থেকে আসতেছিলাম। কেউ একজন বাজারের ব্যাগ দেখে জিজ্ঞেস করলো, কী কিনলেন? উত্তরে বললাম, রুই মাছ এবং ইলিশ মাছ ইত্যাদি কিনেছি”। একাধিক জিনিস নিয়ে কথা বলার পর শেষে \'ইত্যাদি\' বলার জন্যে や...など ব্যবহার হয়। や অর্থ এবং, など অর্থ ইত্যাদি। と এর সাথে など ব্যবহার করা যাবে না।',
        examples: [
          { jp: 'はこのなか に てがみ や しゃしん が あります。', bn: '(বাক্সের ভেতর চিঠি এবং ছবি আছে)' },
          { jp: 'はこのなか に てがみ や しゃしん など が あります。', bn: '(বাক্সের ভেতর চিঠি এবং ছবি ইত্যাদি আছে)' }
        ]
      }
    ]
  },
  {
    id: 'particle-de-guide-p1',
    filename: 'particle-de-guide-p1.svg',
    pageNumber: '1',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        badge: 'で Particles (দ্বারা / দিয়ে)',
        badgeColor: '#E11D48',
        formula: '• Vehicle で いきます/きます/かえります。',
        explanation: 'কোনো যানবাহনের মাধ্যমে কোথাও যাওয়া, আসা, ফিরে আসা বোঝানোর ক্ষেত্রে যানবাহনের পর で Particle বসে।',
        examples: [
          { jp: 'まいにち じてんしゃ で がっこう へ いきます。', bn: '(প্রতিদিন সাইকেল দিয়ে স্কুলে যাই)' },
          { jp: 'ひこうき で にほん へ きました。', bn: '(উড়োজাহাজ দিয়ে জাপান এসেছি)' },
          { jp: 'バス で うち へ かえりました。', bn: '(বাস দিয়ে বাড়ি ফিরে এসেছি)' }
        ]
      },
      {
        formula: '• Place で Verb (কাজের স্থান)',
        explanation: 'কোনো জায়গার মধ্যে, দিয়ে, হতে কোনো কার্য সম্পাদন করলে, যে জায়গায় কার্য সম্পাদন হয় তারপরে で Particle বসে।',
        examples: [
          { jp: 'えき で しんぶん を かいました。', bn: '(স্টেশন থেকে খবরের কাগজ কিনেছি)' },
          { jp: 'レストラン で ひるごはん を たべます。', bn: '(রেস্তোরাঁয় দুপুরের খাবার খাবো)' },
          { jp: 'デパート で かいもの に いきました。', bn: '(ডিপার্টমেন্টাল স্টোরে কেনাকাটা করার জন্য গিয়েছিলাম)' },
          { jp: 'えき の ちかく で ともだち に あいます。', bn: '(স্টেশনের কাছে বন্ধুর সাথে দেখা করবো)' }
        ]
      }
    ]
  },
  {
    id: 'particle-de-guide-p2',
    filename: 'particle-de-guide-p2.svg',
    pageNumber: '2',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        formula: '• N(Tool/Means) で Verb',
        explanation: 'কোনো বস্তু বা মাধ্যম দ্বারা কার্য সম্পাদন হলে, বস্তু বা মাধ্যমের পর で Particle বসে। এখানে মাধ্যম বলতে ভাষাকেও বোঝানো হয়েছে।',
        examples: [
          { jp: 'はし で ごはん を たべます。', bn: '(চপস্টিক দিয়ে ভাত খাবো)' },
          { jp: 'ボールペン で なまえ を かきました。', bn: '(বলপেন দিয়ে নাম লিখেছি)' },
          { jp: 'にほんご で てがみ を かきます。', bn: '(জাপানি ভাষায় চিঠি লিখবো) [মাধ্যম]' },
          { jp: 'かんじ で なまえ を かきます。', bn: '(কাঞ্জি দিয়ে নাম লিখুন)' }
        ]
      },
      {
        formula: '• ~で ~を つくります (উপকরণ / Material)',
        explanation: 'কোনো খাবার জাতীয় জিনিস অথবা ছোট ছোট আসবাবপত্র দিয়ে পূর্ণাঙ্গ খাবার বা বস্তু তৈরি করা হলে, কাঁচামাল বা উপকরণের পর で Particle বসে।',
        examples: [
          { jp: 'たまご と さとう で おかし を つくりました。', bn: '(ডিম এবং চিনি দিয়ে মিষ্টি জাতীয় খাবার তৈরি করেছি)' },
          { jp: 'にく と やさい で りょうり を つくりました。', bn: '(মাংস এবং শাকসবজি দিয়ে খাবার রান্না করেছিলাম)' },
          { jp: 'き で つくえ や いす を つくります。', bn: '(কাঠ দিয়ে টেবিল এবং চেয়ার তৈরি করবো)' }
        ]
      },
      {
        formula: '• な-Adjective [な] で... / Noun で... (এবং / সেজন্য)',
        explanation: 'একাধিক な-Adjective যোগ করে একটি বাক্য গঠন করার সময় な-Adjective এর な বাদ দিয়ে で (এবং/সেজন্য) অর্থে বসে।'
      }
    ]
  },
  {
    id: 'particle-de-guide-p3',
    filename: 'particle-de-guide-p3.svg',
    pageNumber: '3',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        formula: '• Adjective & Noun Conjunction with で Examples',
        examples: [
          { jp: 'ミラーさん は ハンサム で、しんせつ です。', bn: '(মি. মিলার সুদর্শন এবং দয়ালু)' },
          { jp: 'なら は しずか で、きれい な まち です。', bn: '(‘নারা’ শান্ত সেজন্য সুন্দর শহর)' }
        ],
        explanation: 'একাধিক Noun যোগ করে বাক্য গঠন করার সময় Noun এর সাথে (এবং/সেজন্য) অর্থে で Particle বসে।',
        subnote: 'カリナ さん は インドネシア じん で、ふじだいがく の りゅうがくせい です。(মিস কারিনা ইন্দোনেশিয়ার নাগরিক সেজন্য, ফুজি বিশ্ববিদ্যালয়ের বিদেশি স্টুডেন্ট)\nカリナ さん は がくせい で、マリアさん は しゅふ です。(মিস কারিনা স্টুডেন্ট এবং মিস মারিয়া গৃহিণী)'
      },
      {
        formula: '• りんご は 5つ で 400円 です (Quantity / Limit / Total)',
        explanation: 'বাজারে গেলে শুনি, আপেল ৩ কেজি ৪০০ টাকা বা ৫টি ১০০ টাকা। এরকম বাক্য বলার ক্ষেত্রে Count এর পর で particle বসে।',
        examples: [
          { jp: 'りんご は 1つ 100円 ですが、5つ で 400円 です。', bn: '(আপেল একটি ১০০ ইয়েন কিন্তু ৫টি ৪০০ ইয়েন)' },
          { jp: 'がくせい は みんな で 130人 です。', bn: '(ছাত্র-ছাত্রী সবাই মিলে ১৩০ জন)' }
        ]
      }
    ]
  },
  {
    id: 'particle-e-wo-guide-p1',
    filename: 'particle-e-wo-guide-p1.svg',
    pageNumber: '1',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        badge: '‘へ’ Particles',
        badgeColor: '#E11D48',
        formula: '• Place + へ (に) + いきます/きます/かえります。',
        explanation: 'কোনো স্থানে যাওয়া, আসা, ফিরে আসা বলার সময় স্থানের পর へ বা に Particle বসে। অর্থাৎ, いきます/きます/かえります Verb এর আগে যদি স্থান থাকে, তাহলে স্থানের পরে へ Particle বসতে পারে, に Particle ও বসতে পারে।',
        examples: [
          { jp: 'がっこう へ / に いきます。', bn: '(স্কুলে যাবো)' },
          { jp: 'にほん へ / に きました。', bn: '(জাপানে এসেছি)' },
          { jp: 'うち へ / に かえります。', bn: '(বাসায় ফিরে আসবো)' }
        ],
        subnote: 'Note: かえります Verb শুধু দেশে এবং বাসায় ফিরে আসার ক্ষেত্রে ব্যবহার হয়ে থাকে।'
      },
      {
        badge: 'を Particles',
        badgeColor: '#E11D48',
        formula: '• Noun を Verb (Transitive Direct Object)',
        explanation: 'Transitive Verb নিয়ে যখন বাক্য গঠন করা হয়, তখন Object এর পর を Particle বসে। Transitive Verb: ১. বাক্যে Sub + Obj + Verb তিনটাই থাকে। ২. ব্যক্তি বা প্রাণী কোনো বস্তু নিয়ে কাজ সম্পাদন করে।'
      }
    ]
  },
  {
    id: 'particle-wo-guide-p2',
    filename: 'particle-wo-guide-p2.svg',
    pageNumber: '2',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        formula: '• Transitive Verb ও উহ্য Subject এর নিয়ম',
        examples: [
          { jp: 'わたし は ごはん を たべます。', bn: '(আমি ভাত খাই) [Sub + Obj + Verb]' },
          { jp: 'ほん を よみます。', bn: '(বই পড়ি) [Subject উহ্য]' },
          { jp: 'テレビ を みます。', bn: '(টেলিভিশন দেখি) [Subject উহ্য]' }
        ],
        explanation: 'বাংলাতে আমরা সবসময় বলি না যে "আমি ভাত খাই", বরং বলি "ভাত খাই"। জাপানিতেও Subject উহ্য থাকলে ধরে নিতে হবে "আমি" কে Subject বলা হয়েছে।'
      },
      {
        formula: '• Noun を します (করা)',
        explanation: 'কোনো Noun কে Verb করার জন্য Noun এর সাথে を します যোগ করা হয়। খেলাধুলা, মিটিং, কাজ ইত্যাদি যেকোনো কিছু করার ক্ষেত্রে Noun を します দিয়ে বলা হয়।',
        examples: [
          { jp: 'テニス を します。', bn: '(টেনিস খেলা করি)' },
          { jp: 'パーティ を します。', bn: '(পার্টি করি)' },
          { jp: 'しゅくだい を します。', bn: '(বাড়ির কাজ করি)' },
          { jp: 'でんわ を します。', bn: '(টেলিফোন করি)' },
          { jp: 'しごと を します।', bn: '(কাজ করি)' }
        ]
      }
    ]
  },
  {
    id: 'particle-wo-guide-p3',
    filename: 'particle-wo-guide-p3.svg',
    pageNumber: '3',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        formula: '• Place を Motion Verb (গতিশীল কাজ)',
        explanation: 'কোনো স্থানে Motion Verb বা গতিশীল মূলক কাজ হলে স্থানের পর を Particle বসে। Motion Verbs: あるきます (হাঁটা), わたります (পার হওয়া), さんぽします (হাঁটাচলা করা), はしります (দৌড়ানো)।',
        examples: [
          { jp: 'まいあさ こうえん を はしります。', bn: '(প্রতি সকালে পার্কে দৌড়াই)' },
          { jp: 'みち を あるきます。', bn: '(রাস্তায় পায়ে হাঁটি)' },
          { jp: 'はし を わたり ます。', bn: '(ব্রিজ পারাপার করি)' }
        ]
      },
      {
        formula: '• Noun/Thing を External (Down) Verb (বের হওয়া / নামা)',
        explanation: 'কোনো স্থান বা বস্তু থেকে বের হওয়া বা নেমে আসার ক্ষেত্রে Noun বা স্থানের পর を Particle বসে। Down Verbs: でます (বের হওয়া), おります (নামা), くだります (নিচে নামা)।',
        examples: [
          { jp: '7じ に うち を でます。', bn: '(৭ টায় বাসা থেকে বের হই)' },
          { jp: 'うめだ で でんしゃ を おりました。', bn: '(উমেদা স্টেশনে ট্রেন থেকে নেমেছিলাম)' }
        ]
      }
    ]
  },
  {
    id: 'particle-ni-guide-p4',
    filename: 'particle-ni-guide-p4.svg',
    pageNumber: '4',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        badge: 'に Particles',
        badgeColor: '#E11D48',
        explanation: 'に Particle এর নির্দিষ্ট শাব্দিক অর্থ নেই; পরিস্থিতি অনুযায়ী বিভিন্ন জায়গায় বসে।',
        formula: '• N(Time) に Verb... (নির্দিষ্ট সময়)',
        subnote: 'Note: きょう, あした, きのう, けさ, こんばん, いま, まいにち, こんしゅう, ことし ইত্যাদি নির্দিষ্ট সময় নয়; এগুলোর পর に বসে না। けさ 9じ বললে তা নির্দিষ্ট সময় হয়।',
        examples: [
          { jp: 'けさ 6じ に おきました。', bn: '(আজ সকাল ৬টায় ঘুম থেকে উঠেছি)' },
          { jp: 'らいしゅう にちようび に えいが を みます。', bn: '(আগামী সপ্তাহের রবিবার মুভি দেখবো)' },
          { jp: '7月 2日 に にほん へ きました。', bn: '(জুলাই ২ তারিখ জাপান এসেছিলাম)' }
        ]
      },
      {
        formula: '• Person に লেনদেন (Give / Receive / Contact)',
        explanation: 'কাউকে কিছু দেওয়া, নেওয়া, ধার দেওয়া, শিক্ষা নেওয়া, ফোনে কথা বলা, চিঠি দেওয়া ইত্যাদিতে যার সাথে লেনদেন করবো তার পরে に Particle বসে।',
        subnote: 'Note: প্রতিষ্ঠান থেকে কোনো কিছু গ্রহণ বা ঋণ নিলে প্রতিষ্ঠানের পর から বসে। দেওয়ার ক্ষেত্রে আবার に বসবে।'
      }
    ]
  },
  {
    id: 'particle-ni-guide-p5',
    filename: 'particle-ni-guide-p5.svg',
    pageNumber: '5',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        formula: '• Transaction Examples with に',
        examples: [
          { jp: 'わたし は ともだち に はな を もらいました。', bn: '(আমি বন্ধুর কাছ থেকে ফুল পেয়েছি)' },
          { jp: 'ミラーさん に でんわ を かけます。', bn: '(মি. মিলারের সাথে ফোনে কথা বলবো)' },
          { jp: 'ぎんこう から お金 を おろしました。', bn: '(ব্যাংক থেকে টাকা উত্তোলন করেছি) [প্রতিষ্ঠান: から]' }
        ]
      },
      {
        formula: '• Noun / Thing に Internal (Up) Verb (প্রবেশ / আরোহণ)',
        explanation: 'কোথাও প্রবেশ বা আরোহণ করার ক্ষেত্রে যেখানে প্রবেশ বা আরোহণ করবো তার পরে に বসে। Up Verbs: はいります (প্রবেশ), のぼります (উঠা), すわります (বসা), つきます (পৌঁছা), のります (চড়া)।',
        examples: [
          { jp: 'ここ に はいってもいいですか。', bn: '(এখানে প্রবেশ করতে পারি কি?)' },
          { jp: 'ふじさん に のぼりました。', bn: '(ফুজি পর্বতে উঠেছিলাম)' },
          { jp: 'いす に すわってください。', bn: '(চেয়ারে বসুন দয়া করে)' },
          { jp: 'でんしゃ に のっています。', bn: '(ট্রেনে চড়তেছি)' }
        ]
      },
      {
        formula: '• Place に Person/Animal/Things が います/あります (অবস্থান)',
        explanation: 'কোনো স্থানে ব্যক্তি, বস্তু বা প্রাণীর অবস্থান বোঝালে স্থানের পর に Particle বসে। ব্যক্তি/প্রাণী হলে います, বস্তু হলে あります।'
      }
    ]
  },
  {
    id: 'particle-ni-guide-p6',
    filename: 'particle-ni-guide-p6.svg',
    pageNumber: '6',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        formula: '• Existence Examples with に',
        examples: [
          { jp: 'わたしの へや に つくえ が あります。', bn: '(আমার রুমে টেবিল আছে)' },
          { jp: 'じむしょ に ミラーさん が います。', bn: '(অফিসে মি. মিলার আছে)' },
          { jp: 'うけつけ に だれ が いますか。', bn: '(রিসিপশন ডেস্কে কে আছে?)' },
          { jp: 'ちか に なに が ありますか。', bn: '(মাটির নিচের তলায় কী আছে?)' }
        ]
      },
      {
        formula: '• Quantifier (Time Period) に + かい Verb (ফ্রিকোয়েন্সি)',
        explanation: 'কোনো সময়ের মধ্যে কতবার একটি কাজ করেছি বা করবো বলার ক্ষেত্রে Time period এর পর に Particle বসে।',
        examples: [
          { jp: 'いっかげつ に 4かい テニス を します。', bn: '(এক মাসের মধ্যে ৪ বার টেনিস খেলি)' },
          { jp: 'いっしゅうかん に 1かい テニス を します。', bn: '(এক সপ্তাহের মধ্যে ১ বার টেনিস খেলি)' }
        ]
      },
      {
        formula: '• Place + へ + Stem + に + いきます/きます/かえります (উদ্দেশ্য)',
        explanation: 'কোনো স্থানে কোনো কাজের জন্য যাওয়া, আসা, ফিরে আসা বলার ক্ষেত্রে যে কাজটি করতে যাবো তার Verb Stem + に Particle বসে। (Note: ます বাদ দিয়ে যা থাকে তাই Stem)',
        examples: [
          { jp: 'わたし は にほん へ べんきょうし に いきます。', bn: '(আমি জাপানে লেখাপড়া করতে যাবো)' },
          { jp: 'こうべ へ インド りょうり を たべ に きました。', bn: '(কোবেতে ভারতীয় খাবার খাওয়ার জন্য এসেছি)' }
        ]
      }
    ]
  },
  {
    id: 'particle-ni-yo-guide-p7',
    filename: 'particle-ni-yo-guide-p7.svg',
    pageNumber: '7',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        formula: '• Person に あいます (দেখা করা)',
        explanation: 'কারো সাথে দেখা করার ক্ষেত্রে যার সাথে দেখা করবে তার সাথে に Particle বসে।',
        examples: [
          { jp: 'ともだち に あいます。', bn: '(বন্ধুর সাথে দেখা করবো)' }
        ]
      },
      {
        formula: '• N1(location) に N2 を Verb (ফলাফলমূলক কাজ / স্থায়ী অবস্থান)',
        explanation: 'N2 দ্বারা কাজটি যদি কোনো ফলাফলমূলক কাজ হয় অর্থাৎ কাজটি সেখানেই শেষ বা স্থায়ীভাবে থাকবে বোঝায়, তাহলে N1 (location) এর পর に Particle বসে।',
        examples: [
          { jp: 'ここ に くるま を とめてください。', bn: '(এখানে গাড়ি পার্কিং করুন দয়া করে)' },
          { jp: 'ここ に じゅうしょ を かいてください。', bn: '(এখানে ঠিকানা লিখে দিন দয়া করে)' }
        ]
      },
      {
        badge: 'よ (Sentence Ending)',
        badgeColor: '#E11D48',
        explanation: 'よ কোনো সাধারণ Particle না, এটা বাক্যের শেষে ব্যবহার হয়। কোনো বাক্যের শেষে よ বসে বাক্যকে জোরালোভাবে বলা হয়। যে তথ্যটা আমি অন্যকে দিচ্ছি তা যে সত্যি ও নতুন তা নিশ্চিত করতে よ বসে।',
        examples: [
          { jp: 'A: この でんしゃ は こうしえん へ いきますか。', bn: '(এই ট্রেন কোওশিয়েন যাবে কি?)' },
          { jp: 'B: いいえ、いきません。つぎの でんしゃ ですよ。', bn: '(না যাবে না, পরবর্তী ট্রেন।)' },
          { jp: 'ほっかいどう に うま が たくさん いますよ。', bn: '(হোক্কাইডোতে অনেক ঘোড়া আছে।)' }
        ]
      }
    ]
  },
  {
    id: 'particle-san-chan-kun-o-go-guide-p7',
    filename: 'particle-san-chan-kun-o-go-guide-p7.svg',
    pageNumber: '7',
    headerTitle: 'Grammar Part 1 - Particles',
    watermark: 'MAKSUD ALAM',
    sections: [
      {
        badge: 'さん / ちゃん / くん (জনাব / জনাবা / সম্বোধন)',
        badgeColor: '#E11D48',
        explanation: 'সম্মানের স্বার্থে জাপানিজরা যেকোনো প্রাণী বা মানুষের নামের শেষে একটি উপাধি জুড়ে দেয়:',
        examples: [
          { jp: '• প্রাপ্তবয়স্ক মানুষের নামের শেষে:', bn: 'さん (যেমন: 田中さん)' },
          { jp: '• ছোট বাচ্চা বা বৃদ্ধা মানুষের নামের শেষে:', bn: 'ちゃん (যেমন: あいちゃん)' },
          { jp: '• বালক / বালিকার নামের শেষে:', bn: 'くん (যেমন: けんたくん)' }
        ]
      },
      {
        badge: 'お & ご Particles (Polite / Bikago Prefixes)',
        badgeColor: '#E11D48',
        explanation: 'お এবং ご যেকোনো শব্দের শুরুতে বসে শব্দকে Polite (মার্জিত) করে থাকে। সাধারণত জাপানিজ মূল শব্দের আগে お এবং কাঞ্জি/চীনা উৎসের শব্দের আগে ご বসে।',
        examples: [
          { jp: 'お金 が ほしい です。', bn: '(টাকা চাই) [かね -> お金]' },
          { jp: 'お水 を のみたい です。', bn: '(পানি পান করতে চাই) [みず -> お水]' },
          { jp: 'ごちゅうもん は？', bn: '(আপনার অর্ডার কী? / অর্ডার করতে পারি?) [ちゅうもん -> ご注文]' }
        ],
        subnote: 'এখানে かね, みず এবং ちゅうもん শব্দের শুরুতে お এবং ご বসিয়ে শব্দকে Polite করা হয়েছে।'
      }
    ]
  }
];

// Generate an SVG for a sheet
function generateSvg(sheet) {
  const width = 800;
  const height = 1120;

  let y = 130;
  let sectionXml = '';

  sheet.sections.forEach((sec, idx) => {
    // Badge if present
    if (sec.badge) {
      sectionXml += `
        <g transform="translate(48, ${y})">
          <circle cx="10" cy="10" r="7" fill="${sec.badgeColor || '#E11D48'}" />
          <text x="26" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" fill="#0F172A">${escapeXml(sec.badge)}</text>
        </g>
      `;
      y += 36;
    }

    // Formula Box if present
    if (sec.formula) {
      sectionXml += `
        <g transform="translate(48, ${y})">
          <rect width="704" height="42" rx="10" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5"/>
          <circle cx="20" cy="21" r="4" fill="#6366F1" />
          <text x="34" y="27" font-family="'Courier New', monospace, sans-serif" font-size="16" font-weight="bold" fill="#1E293B">${escapeXml(sec.formula)}</text>
        </g>
      `;
      y += 54;
    }

    // Explanation
    if (sec.explanation) {
      // Split long text into lines
      const words = sec.explanation.split(' ');
      let currentLine = '';
      const lines = [];
      for (const w of words) {
        if ((currentLine + ' ' + w).length > 68) {
          lines.push(currentLine);
          currentLine = w;
        } else {
          currentLine = currentLine ? currentLine + ' ' + w : w;
        }
      }
      if (currentLine) lines.push(currentLine);

      lines.forEach((line) => {
        sectionXml += `
          <text x="52" y="${y}" font-family="'SolaimanLipi', 'Kalpurush', 'Hind Siliguri', sans-serif" font-size="15" fill="#334155" font-weight="500">${escapeXml(line)}</text>
        `;
        y += 24;
      });
      y += 6;
    }

    // Examples
    if (sec.examples && sec.examples.length > 0) {
      sec.examples.forEach((ex) => {
        sectionXml += `
          <g transform="translate(52, ${y})">
            <rect width="696" height="52" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
            <text x="14" y="24" font-family="'Noto Sans JP', 'Hiragino Sans', sans-serif" font-size="15" font-weight="bold" fill="#0F172A">${escapeXml(ex.jp)}</text>
            <text x="14" y="44" font-family="'SolaimanLipi', 'Kalpurush', 'Hind Siliguri', sans-serif" font-size="13" fill="#475569">${escapeXml(ex.bn)}</text>
          </g>
        `;
        y += 60;
      });
      y += 6;
    }

    // Subnote if present
    if (sec.subnote) {
      const subLines = sec.subnote.split('\n');
      subLines.forEach((sline) => {
        sectionXml += `
          <text x="54" y="${y}" font-family="'SolaimanLipi', 'Kalpurush', 'Hind Siliguri', sans-serif" font-size="13.5" fill="#64748B" font-style="italic">${escapeXml(sline)}</text>
        `;
        y += 22;
      });
      y += 8;
    }

    y += 18;
  });

  // Footer note
  let footerXml = '';
  if (sheet.footerNote) {
    footerXml = `
      <g transform="translate(48, ${height - 70})">
        <rect width="704" height="38" rx="8" fill="#FEF3C7" stroke="#FDE68A" stroke-width="1"/>
        <text x="16" y="24" font-family="'SolaimanLipi', 'Kalpurush', sans-serif" font-size="14" font-weight="bold" fill="#92400E">${escapeXml(sheet.footerNote)}</text>
      </g>
    `;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#0F172A" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Clean Paper Sheet Background -->
  <rect width="${width}" height="${height}" fill="#F8FAFC" />
  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" filter="url(#card-shadow)" />

  <!-- Sheet Header Bar -->
  <g transform="translate(48, 52)">
    <!-- Page Number Badge -->
    <rect x="0" y="0" width="38" height="38" rx="10" fill="#0F172A" />
    <text x="19" y="26" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF">${escapeXml(sheet.pageNumber)}</text>
    
    <!-- Title -->
    <text x="54" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900" fill="#0F172A" letter-spacing="0.5">${escapeXml(sheet.headerTitle)}</text>
    
    <!-- Red Accent Line -->
    <line x1="0" y1="48" x2="704" y2="48" stroke="#E2E8F0" stroke-width="1.5" />
    <circle cx="700" cy="24" r="5" fill="#E11D48" />
  </g>

  <!-- Diagonal Authentic Watermark -->
  <g transform="translate(400, 560) rotate(-35)" opacity="0.06">
    <text text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="96" font-weight="bold" fill="#0F172A" letter-spacing="8">${escapeXml(sheet.watermark)}</text>
  </g>

  <!-- Content Sections -->
  ${sectionXml}

  <!-- Footer Note (if any) -->
  ${footerXml}

  <!-- Bottom Page Mark -->
  <g transform="translate(48, ${height - 30})">
    <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" fill="#94A3B8">Nihonova Academy · Japanese Particle Research Center · 助詞学習ガイド</text>
    <text x="704" y="0" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="bold" fill="#64748B">Page ${escapeXml(sheet.pageNumber)} of 7</text>
  </g>
</svg>
`;
}

// Generate all SVGs
const outDir = path.resolve('public/guides');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

sheets.forEach((sheet) => {
  const svg = generateSvg(sheet);
  const filePath = path.join(outDir, sheet.filename);
  fs.writeFileSync(filePath, svg, 'utf-8');
  console.log(`Generated: ${sheet.filename}`);
});

console.log(`Successfully generated all ${sheets.length} guide SVGs in ${outDir}`);
