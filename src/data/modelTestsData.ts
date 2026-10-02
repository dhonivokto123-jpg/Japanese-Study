export interface ExamQuestion {
  id: number;
  section: 'Vocabulary' | 'Grammar' | 'Reading';
  subSection: string; // e.g. "もんだい 1", "もんだい 2"
  questionText: string;
  underlinedWord?: string;
  contextText?: string;
  options: { key: string; text: string }[];
  correctAnswer: string; // 'a' | 'b' | 'c' | 'd'
  explanationBn: string;
}

export interface ModelTest {
  id: string;
  title: string;
  titleBn: string;
  level: 'N5';
  totalMarks: number;
  timeMinutes: number;
  questions: ExamQuestion[];
}

export const modelTestsData: ModelTest[] = [
  {
    id: 'n5-test-1',
    title: 'JLPT N5 Model Test 1 - Vocabulary & Kanji',
    titleBn: 'মডেল টেস্ট ১ — শব্দার্থ ও কানজি (N5)',
    level: 'N5',
    totalMarks: 30,
    timeMinutes: 25,
    questions: [
      {
        id: 1,
        section: 'Vocabulary',
        subSection: 'もんだい 1 (Reading)',
        questionText: 'くつに [石] が 入っていました。',
        underlinedWord: '石',
        options: [
          { key: 'a', text: 'いし (পাথর)' },
          { key: 'b', text: 'すな (বালু)' },
          { key: 'c', text: 'くさ (ঘাস)' },
          { key: 'd', text: 'えだ (ডাল)' },
        ],
        correctAnswer: 'a',
        explanationBn: '石 (いし) অর্থ পাথর। জুতার ভেতর পাথর ঢুকেছিল।',
      },
      {
        id: 2,
        section: 'Vocabulary',
        subSection: 'もんだい 1 (Reading)',
        questionText: 'きょう は [土曜日] です。',
        underlinedWord: '土曜日',
        options: [
          { key: 'a', text: 'にちようび' },
          { key: 'b', text: 'どようび' },
          { key: 'c', text: 'かようび' },
          { key: 'd', text: 'きんようび' },
        ],
        correctAnswer: 'b',
        explanationBn: '土曜日 (どようび) অর্থ শনিবার।',
      },
      {
        id: 3,
        section: 'Vocabulary',
        subSection: 'もんだい 1 (Reading)',
        questionText: 'Coxsbazar へ [川] を みに いきます。',
        underlinedWord: '川',
        options: [
          { key: 'a', text: 'かわ' },
          { key: 'b', text: 'かわさん' },
          { key: 'c', text: 'やまかわ' },
          { key: 'd', text: 'やま' },
        ],
        correctAnswer: 'a',
        explanationBn: '川 (かわ) অর্থ নদী।',
      },
      {
        id: 4,
        section: 'Vocabulary',
        subSection: 'もんだい 1 (Reading)',
        questionText: 'きょう は [何曜日] ですか。',
        underlinedWord: '何曜日',
        options: [
          { key: 'a', text: 'なんようび' },
          { key: 'b', text: 'なんがい' },
          { key: 'c', text: 'なんにち' },
          { key: 'd', text: 'なんがつ' },
        ],
        correctAnswer: 'a',
        explanationBn: '何曜日 (なんようび) অর্থ কি বার / সপ্তাহের কোন দিন?',
      },
      {
        id: 5,
        section: 'Vocabulary',
        subSection: 'もんだい 1 (Reading)',
        questionText: '[来年] の 7 月に にほん へ いきます。',
        underlinedWord: '来年',
        options: [
          { key: 'a', text: 'さらいねん' },
          { key: 'b', text: 'らいねん' },
          { key: 'c', text: 'こよし' },
          { key: 'd', text: 'こんげつ' },
        ],
        correctAnswer: 'b',
        explanationBn: '来年 (らいねん) অর্থ আগামী বছর।',
      },
      {
        id: 6,
        section: 'Vocabulary',
        subSection: 'もんだい 2 (Kanji writing)',
        questionText: 'たなかさん は きのう どこ も [いきませんでした]。',
        underlinedWord: 'いきませんでした',
        options: [
          { key: 'a', text: '行きませんでした' },
          { key: 'b', text: '来ませんでした' },
          { key: 'c', text: 'かえりませんでした' },
          { key: 'd', text: '生きます' },
        ],
        correctAnswer: 'a',
        explanationBn: '「いきます」এর কানজি হচ্ছে「行きます」，অতএব নেগেটিভ পাস্ট「行きませんでした」。',
      },
      {
        id: 7,
        section: 'Vocabulary',
        subSection: 'もんだい 2 (Kanji writing)',
        questionText: 'きのう [わたし] は ひとりで デパトで やさい を かいました。',
        underlinedWord: 'わたし',
        options: [
          { key: 'a', text: '山田さん' },
          { key: 'b', text: 'あなた' },
          { key: 'c', text: '私' },
          { key: 'd', text: 'たなか' },
        ],
        correctAnswer: 'c',
        explanationBn: 'わたし (আমি) এর কানজি রূপ হলো 私।',
      },
      {
        id: 8,
        section: 'Vocabulary',
        subSection: 'もんだい 3 (Context fill)',
        questionText: 'エレベーター で いきますか、（　）で いきますか。',
        options: [
          { key: 'a', text: 'かいだん (সিঁড়ি)' },
          { key: 'b', text: 'げんかん (প্রবেশদ্বার)' },
          { key: 'c', text: 'さんぽ (হাঁটাহাঁটি)' },
          { key: 'd', text: 'だいどころ (রান্নাঘর)' },
        ],
        correctAnswer: 'a',
        explanationBn: 'লিফটে যাবেন নাকি সিঁড়ি (かいだん) দিয়ে যাবেন?',
      },
      {
        id: 9,
        section: 'Vocabulary',
        subSection: 'もんだい 3 (Context fill)',
        questionText: '（　）を かぶります。',
        options: [
          { key: 'a', text: 'うわぎ' },
          { key: 'b', text: 'ズボン' },
          { key: 'c', text: 'ぼうし (টুপি)' },
          { key: 'd', text: 'くつ' },
        ],
        correctAnswer: 'c',
        explanationBn: 'মাথায় টুপি পরিধান করার ক্রিয়া হলো かぶります (ぼうしを かぶります)।',
      },
      {
        id: 10,
        section: 'Vocabulary',
        subSection: 'もんだい 4 (Paraphrase)',
        questionText: 'わたし は りょうり が へたです。',
        options: [
          { key: 'a', text: 'わたし は りょうり が じょうずです。' },
          { key: 'b', text: 'わたし は りょうり が じょうずではありません。' },
          { key: 'c', text: 'わたし は りょうり が すきです。' },
          { key: 'd', text: 'わたし は りょうり が すきではありません。' },
        ],
        correctAnswer: 'b',
        explanationBn: 'へた (অদক্ষ) মানে じょうずではありません (দক্ষ নয়)।',
      },
    ],
  },
  {
    id: 'n5-test-2',
    title: 'JLPT N5 Model Test 2 - Grammar & Particles',
    titleBn: 'মডেল টেস্ট ২ — ব্যাকরণ ও পার্টিকেল (N5)',
    level: 'N5',
    totalMarks: 30,
    timeMinutes: 25,
    questions: [
      {
        id: 1,
        section: 'Grammar',
        subSection: 'もんだい 1 (Particles)',
        questionText: 'それ は わたし（　）かさ です。',
        options: [
          { key: 'a', text: 'を' },
          { key: 'b', text: 'が' },
          { key: 'c', text: 'の' },
          { key: 'd', text: 'も' },
        ],
        correctAnswer: 'c',
        explanationBn: 'মালিকানা বোঝাতে の বসে: 「わたしの かさ」(আমার ছাতা)।',
      },
      {
        id: 2,
        section: 'Grammar',
        subSection: 'もんだい 1 (Particles)',
        questionText: 'じてんしゃ（　）学校へ行きます。',
        options: [
          { key: 'a', text: 'で' },
          { key: 'b', text: 'に' },
          { key: 'c', text: 'が' },
          { key: 'd', text: 'の' },
        ],
        correctAnswer: 'a',
        explanationBn: 'যানবাহন বা মাধ্যম বোঝাতে で বসে: じてんしゃで (সাইকেল দিয়ে)।',
      },
      {
        id: 3,
        section: 'Grammar',
        subSection: 'もんだい 1 (Particles)',
        questionText: '母 は りょうり（　）じょうず です。',
        options: [
          { key: 'a', text: 'を' },
          { key: 'b', text: 'が' },
          { key: 'c', text: 'で' },
          { key: 'd', text: 'に' },
        ],
        correctAnswer: 'b',
        explanationBn: 'じょうず, すき, わかります ইত্যাদির পূর্বে অবজেক্টে が পার্টিকেল বসে।',
      },
      {
        id: 4,
        section: 'Grammar',
        subSection: 'もんだい 1 (Particles)',
        questionText: 'きょうしつ に は だれ（　）いませんでした。',
        options: [
          { key: 'a', text: 'に' },
          { key: 'b', text: 'は' },
          { key: 'c', text: 'も' },
          { key: 'd', text: 'が' },
        ],
        correctAnswer: 'c',
        explanationBn: 'প্রশ্নবোধক শব্দ + も + নেগেটিভ = কেউ-ই না (だれも いませんでした)।',
      },
      {
        id: 5,
        section: 'Grammar',
        subSection: 'もんだい 1 (Particles)',
        questionText: 'あたらしい じしょ（　）ほしい です。',
        options: [
          { key: 'a', text: 'を' },
          { key: 'b', text: 'に' },
          { key: 'c', text: 'が' },
          { key: 'd', text: 'で' },
        ],
        correctAnswer: 'c',
        explanationBn: 'কিছু চাওয়া বোঝাতে Noun + が ほしいです বসে।',
      },
      {
        id: 6,
        section: 'Grammar',
        subSection: 'もんだい 1 (Particles)',
        questionText: 'わたし は いしゃ（　）なりたい です。',
        options: [
          { key: 'a', text: 'に' },
          { key: 'b', text: 'が' },
          { key: 'c', text: 'を' },
          { key: 'd', text: 'も' },
        ],
        correctAnswer: 'a',
        explanationBn: 'হওয়া বা Become বোঝাতে Noun + に なります / に なりたいです বসে।',
      },
      {
        id: 7,
        section: 'Grammar',
        subSection: 'もんだい 2 (Sentence Structure)',
        questionText: '子ども「いただきます。」\n母「あ、食べる（　）手 を あらいましょう。」',
        options: [
          { key: 'a', text: 'まえに' },
          { key: 'b', text: 'のまえに' },
          { key: 'c', text: 'あとに' },
          { key: 'd', text: 'のあとに' },
        ],
        correctAnswer: 'a',
        explanationBn: 'Verb এর ডিকশনারি ফর্মের পর সরাসরি まえに বসে: 「食べる まえに」(খাওয়ার পূর্বে)।',
      },
      {
        id: 8,
        section: 'Grammar',
        subSection: 'もんだい 3 (Verb Forms)',
        questionText: 'ここで くつ を（　）ください。',
        options: [
          { key: 'a', text: 'きて' },
          { key: 'b', text: 'はって' },
          { key: 'c', text: 'はしって' },
          { key: 'd', text: 'ぬいで' },
        ],
        correctAnswer: 'd',
        explanationBn: 'জুতা বা কাপড় খোলা হলো ぬぎます, যার て-Form হলো ぬいで (ぬいで ください)।',
      },
    ],
  },
];
