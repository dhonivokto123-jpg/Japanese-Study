export interface CounterGroup {
  category: string;
  categoryBn: string;
  unit: string;
  descriptionBn: string;
  items: {
    count: string | number;
    japanese: string;
    reading: string;
    bengali: string;
    english: string;
    isIrregular?: boolean;
  }[];
}

export const countersData: CounterGroup[] = [
  {
    category: 'Basic Counting (1-100+)',
    categoryBn: 'মৌলিক গণনা / Basic Numbers',
    unit: 'নম্বর',
    descriptionBn: 'জাপানি সংখ্যার সাধারণ গণনা। ১ থেকে ১০০ পর্যন্ত।',
    items: [
      { count: 1, japanese: '一 (いち)', reading: 'ichi', bengali: 'ইচি (১)', english: 'One' },
      { count: 2, japanese: '二 (に)', reading: 'ni', bengali: 'নি (২)', english: 'Two' },
      { count: 3, japanese: '三 (さん)', reading: 'san', bengali: 'সান (৩)', english: 'Three' },
      { count: 4, japanese: '四 (よん / し)', reading: 'yon / shi', bengali: 'ইয়ন / শি (৪)', english: 'Four' },
      { count: 5, japanese: '五 (ご)', reading: 'go', bengali: 'গো (৫)', english: 'Five' },
      { count: 6, japanese: '六 (ろく)', reading: 'roku', bengali: 'রোকু (৬)', english: 'Six' },
      { count: 7, japanese: '七 (なな / しち)', reading: 'nana / shichi', bengali: 'নানা / শিচি (৭)', english: 'Seven' },
      { count: 8, japanese: '八 (はち)', reading: 'hachi', bengali: 'হাচি (৮)', english: 'Eight' },
      { count: 9, japanese: '九 (きゅう / く)', reading: 'kyuu / ku', bengali: 'কিউ / কু (৯)', english: 'Nine' },
      { count: 10, japanese: '十 (じゅう)', reading: 'juu', bengali: 'জু (১০)', english: 'Ten' },
      { count: 20, japanese: '二十 (にじゅう)', reading: 'ni-juu', bengali: 'নি-জু (২০)', english: 'Twenty' },
      { count: 30, japanese: '三十 (さんじゅう)', reading: 'san-juu', bengali: 'সান-জু (৩০)', english: 'Thirty' },
      { count: 100, japanese: '百 (ひゃく)', reading: 'hyaku', bengali: 'হিয়াকু (১০০)', english: 'Hundred' },
      { count: 1000, japanese: '千 (せん)', reading: 'sen', bengali: 'সেন (১০০০)', english: 'Thousand' },
      { count: 10000, japanese: '万 (まん)', reading: 'man', bengali: 'মান (১০,০০০)', english: 'Ten Thousand' },
    ],
  },
  {
    category: 'Days of the Month (にち)',
    categoryBn: 'তারিখ ও দিন / Dates of Month',
    unit: '日 (にち)',
    descriptionBn: '১ থেকে ১০, ১৪, ২০ ও ২৪ তারিখ ব্যতিক্রমী (Irregular)। এগুলো মুখস্থ রাখা আবশ্যক।',
    items: [
      { count: '1st', japanese: '1日 (ついたち)', reading: 'tsuitachi', bengali: '১ তারিখ (সুইতাচি)', english: '1st day', isIrregular: true },
      { count: '2nd', japanese: '2日 (ふつか)', reading: 'futsuka', bengali: '২ তারিখ (ফুতসুকা)', english: '2nd day', isIrregular: true },
      { count: '3rd', japanese: '3日 (みっか)', reading: 'mikka', bengali: '৩ তারিখ (মিক্কা)', english: '3rd day', isIrregular: true },
      { count: '4th', japanese: '4日 (よっか)', reading: 'yokka', bengali: '৪ তারিখ (ইয়োক্কা)', english: '4th day', isIrregular: true },
      { count: '5th', japanese: '5日 (いつか)', reading: 'itsuka', bengali: '৫ তারিখ (ইতসুকা)', english: '5th day', isIrregular: true },
      { count: '6th', japanese: '6日 (むいか)', reading: 'muika', bengali: '৬ তারিখ (মুইকা)', english: '6th day', isIrregular: true },
      { count: '7th', japanese: '7日 (なのか)', reading: 'nanoka', bengali: '৭ তারিখ (নানোকা)', english: '7th day', isIrregular: true },
      { count: '8th', japanese: '8日 (ようか)', reading: 'youka', bengali: '৮ তারিখ (ইয়ৌকা)', english: '8th day', isIrregular: true },
      { count: '9th', japanese: '9日 (ここのか)', reading: 'kokonoka', bengali: '৯ তারিখ (কোকোনোকা)', english: '9th day', isIrregular: true },
      { count: '10th', japanese: '10日 (とおか)', reading: 'tooka', bengali: '১০ তারিখ (তৌকা)', english: '10th day', isIrregular: true },
      { count: '14th', japanese: '14日 (じゅうよっか)', reading: 'juu-yokka', bengali: '১৪ তারিখ (জু ইয়োক্কা)', english: '14th day', isIrregular: true },
      { count: '20th', japanese: '20日 (はつか)', reading: 'hatsuka', bengali: '২০ তারিখ (হাতসুকা)', english: '20th day', isIrregular: true },
      { count: '24th', japanese: '24日 (にじゅうよっか)', reading: 'nijuu-yokka', bengali: '২৪ তারিখ (নিজু ইয়োক্কা)', english: '24th day', isIrregular: true },
      { count: 'Question', japanese: '何日 (なんにち)', reading: 'nan-nichi', bengali: 'কোন দিন / কত তারিখ?', english: 'What day / date?' },
    ],
  },
  {
    category: 'Days of the Week (ようび)',
    categoryBn: 'সপ্তাহের বার / Days of the Week',
    unit: '曜日 (ようび)',
    descriptionBn: 'জাপানে সপ্তাহ শুরু হয় সোমবার থেকে। প্রতি বারের শেষে ようび থাকে।',
    items: [
      { count: 'Mon', japanese: '月曜日 (げつようび)', reading: 'getsuyoubi', bengali: 'সোমবার (গেৎসুইয়োবি)', english: 'Monday' },
      { count: 'Tue', japanese: '火曜日 (かようび)', reading: 'kayoubi', bengali: 'মঙ্গলবার (কাইয়োবি)', english: 'Tuesday' },
      { count: 'Wed', japanese: '水曜日 (すいようび)', reading: 'suiyoubi', bengali: 'বুধবার (সুইয়োবি)', english: 'Wednesday' },
      { count: 'Thu', japanese: '木曜日 (もくようび)', reading: 'mokuyoubi', bengali: 'বৃহস্পতিবার (মোকুইয়োবি)', english: 'Thursday' },
      { count: 'Fri', japanese: '金曜日 (きんようび)', reading: 'kinyoubi', bengali: 'শুক্রবার (কিনয়োবি)', english: 'Friday' },
      { count: 'Sat', japanese: '土曜日 (どようび)', reading: 'doyoubi', bengali: 'শনিবার (দোইয়োবি)', english: 'Saturday' },
      { count: 'Sun', japanese: '日曜日 (にちようび)', reading: 'nichiyoubi', bengali: 'রবিবার (নিচিয়োবি)', english: 'Sunday' },
      { count: 'Ques', japanese: '何曜日 (なんようび)', reading: 'nan-youbi', bengali: 'কি বার / কোন বার?', english: 'What day of the week?' },
    ],
  },
  {
    category: 'Months of the Year (がつ)',
    categoryBn: 'মাসের নাম / Months',
    unit: '月 (がつ)',
    descriptionBn: 'সংখ্যা + がつ যোগ করে মাস বলা হয়। ৪, ৭, ৯ মাস উচ্চারণ ভিন্ন।',
    items: [
      { count: 'Jan', japanese: '1月 (いちがつ)', reading: 'ichigatsu', bengali: 'জানুয়ারি (ইচি গাৎসু)', english: 'January' },
      { count: 'Feb', japanese: '2月 (にがつ)', reading: 'nigatsu', bengali: 'ফেব্রুয়ারি (নি গাৎসু)', english: 'February' },
      { count: 'Mar', japanese: '3月 (さんがつ)', reading: 'sangatsu', bengali: 'মার্চ (সান গাৎসু)', english: 'March' },
      { count: 'Apr', japanese: '4月 (しがつ)', reading: 'shigatsu', bengali: 'এপ্রিল (শি গাৎসু)', english: 'April', isIrregular: true },
      { count: 'May', japanese: '5月 (ごがつ)', reading: 'gogatsu', bengali: 'মে (গো গাৎসু)', english: 'May' },
      { count: 'Jun', japanese: '6月 (ろくがつ)', reading: 'rokugatsu', bengali: 'জুন (রোকু গাৎসু)', english: 'June' },
      { count: 'Jul', japanese: '7月 (しちがつ)', reading: 'shichigatsu', bengali: 'জুলাই (শিচি গাৎসু)', english: 'July', isIrregular: true },
      { count: 'Aug', japanese: '8月 (はちがつ)', reading: 'hachigatsu', bengali: 'আগস্ট (হাচি গাৎসু)', english: 'August' },
      { count: 'Sep', japanese: '9月 (くがつ)', reading: 'kugatsu', bengali: 'সেপ্টেম্বর (কু গাৎসু)', english: 'September', isIrregular: true },
      { count: 'Oct', japanese: '10月 (じゅうがつ)', reading: 'juugatsu', bengali: 'অক্টোবর (জু গাৎসু)', english: 'October' },
      { count: 'Nov', japanese: '11月 (じゅういちがつ)', reading: 'juuichigatsu', bengali: 'নভেম্বর (জু ইচি গাৎসু)', english: 'November' },
      { count: 'Dec', japanese: '12月 (じゅうにがつ)', reading: 'juunigatsu', bengali: 'ডিসেম্বর (জু নি গাৎসু)', english: 'December' },
      { count: 'Ques', japanese: '何月 (なんがつ)', reading: 'nangatsu', bengali: 'কোন মাস?', english: 'What month?' },
    ],
  },
  {
    category: 'Time & Hours (じ & ぷん/ふん)',
    categoryBn: 'সময় ও মিনিট / Time & Minutes',
    unit: '時 (じ) / 分 (ふん・ぷん)',
    descriptionBn: 'ঘণ্টার ক্ষেত্রে ৪ (よじ), ৭ (しちじ), ৯ (くじ)। মিনিটে ১, ৩, ৪, ৬, ৮, ১০ হল ぷん (পুন), ২, ৫, ৭, ৯ হল ふん (ফুন)।',
    items: [
      { count: '1:00', japanese: '1時 (いちじ)', reading: 'ichiji', bengali: '১টা (ইচিজি)', english: '1 o\'clock' },
      { count: '4:00', japanese: '4時 (よじ)', reading: 'yoji', bengali: '৪টা (ইয়োজি)', english: '4 o\'clock', isIrregular: true },
      { count: '7:00', japanese: '7時 (しちじ)', reading: 'shichiji', bengali: '৭টা (শিচিজি)', english: '7 o\'clock', isIrregular: true },
      { count: '9:00', japanese: '9時 (くじ)', reading: 'kuji', bengali: '৯টা (কুজি)', english: '9 o\'clock', isIrregular: true },
      { count: '1 min', japanese: '1分 (いっぷん)', reading: 'ippun', bengali: '১ মিনিট (ইপ্পুন)', english: '1 minute', isIrregular: true },
      { count: '2 min', japanese: '2分 (にふん)', reading: 'nifun', bengali: '২ মিনিট (নিফুন)', english: '2 minutes' },
      { count: '3 min', japanese: '3分 (さんぷん)', reading: 'sanpun', bengali: '৩ মিনিট (সানপুন)', english: '3 minutes' },
      { count: '5 min', japanese: '5分 (ごふん)', reading: 'gofun', bengali: '৫ মিনিট (গোফুন)', english: '5 minutes' },
      { count: '10 min', japanese: '10分 (じゅっぷん)', reading: 'juppun', bengali: '১০ মিনিট (জুপ্পুন)', english: '10 minutes', isIrregular: true },
      { count: '30 min', japanese: '半 (はん)', reading: 'han', bengali: 'সাড়ে / আধা ঘণ্টা (হান)', english: 'Half (e.g. 7:30 = 7じはん)' },
    ],
  },
  {
    category: 'Counting Objects & People',
    categoryBn: 'বস্তু ও মানুষ গণনা / Things & People',
    unit: 'つ / 人 (にん) / 枚 (まい) / 台 (だい)',
    descriptionBn: 'সাধারণ জিনিস (ひとつ, ふたつ...), মানুষ (ひとり, ふたり...), পাতলা জিনিস (まい), ভারী মেশিন/গাড়ি (だい)।',
    items: [
      { count: '1 item', japanese: '1つ (ひとつ)', reading: 'hitotsu', bengali: '১টি সাধারণ জিনিস (হিতোৎসু)', english: '1 object' },
      { count: '2 items', japanese: '2つ (ふたつ)', reading: 'futatsu', bengali: '২টি সাধারণ জিনিস (ফুতাতসু)', english: '2 objects' },
      { count: '3 items', japanese: '3つ (みっつ)', reading: 'mittsu', bengali: '৩টি জিনিস (মিত্তসু)', english: '3 objects' },
      { count: '10 items', japanese: '10 (とお)', reading: 'too', bengali: '১০টি জিনিস (তৌ)', english: '10 objects' },
      { count: '1 person', japanese: '1人 (ひとり)', reading: 'hitori', bengali: '১ জন মানুষ (হিতোরি)', english: '1 person', isIrregular: true },
      { count: '2 people', japanese: '2人 (ふたり)', reading: 'futari', bengali: '২ জন মানুষ (ফুতায়ি)', english: '2 people', isIrregular: true },
      { count: '3 people', japanese: '3人 (さんにん)', reading: 'san-nin', bengali: '৩ জন মানুষ (সান-নিন)', english: '3 people' },
      { count: 'Flat 1', japanese: '1枚 (いちまい)', reading: 'ichimai', bengali: '১টি কাগজ/টিকেট/শার্ট (ইচিমাই)', english: '1 sheet/thin item' },
      { count: 'Car/PC 1', japanese: '1台 (いちだい)', reading: 'ichidai', bengali: '১টি গাড়ি/কম্পিউটার (ইচিদাই)', english: '1 machine/vehicle' },
    ],
  },
];
