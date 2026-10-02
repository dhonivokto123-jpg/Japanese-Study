import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  BookOpen,
  Languages,
  FileText,
  Target,
  Headphones,
  Award,
  Layers,
  ArrowRight,
  CheckCircle2,
  Trophy,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setActiveLessonId } = useApp();

  const packageFeatures = [
    {
      icon: '📕',
      title: '১,০০০+ N5 শব্দার্থ',
      subtitle: 'অডিও উচ্চারণ, অর্থ ও উদাহরণসহ',
      badge: 'শব্দভাণ্ডার',
      action: () => setActiveTab('vocab'),
    },
    {
      icon: '漢字',
      title: '১০৩+ N5 কানজি',
      subtitle: 'অর্থ, ওন-কুন রিডিং ও স্ট্রোক অঙ্কন বোর্ড',
      badge: 'কানজি মাস্টার',
      action: () => setActiveTab('kanji'),
    },
    {
      icon: '📝',
      title: '২৫টি লেসনের ব্যাকরণ',
      subtitle: 'নিয়ম, বাক্য গঠনের সূত্র ও বিস্তারিত উদাহরণ',
      badge: 'গ্রামার গাইড',
      action: () => setActiveTab('grammar'),
    },
    {
      icon: '🎧',
      title: 'ডায়ালগ ও লিসেনিং প্র্যাকটিস',
      subtitle: 'প্রতিদিনের জাপানি কথোপকথন ও বাস্তব উচ্চারণ',
      badge: 'স্পিকিং ও লিসেনিং',
      action: () => {
        setActiveLessonId(1);
        setActiveTab('lesson-detail');
      },
    },
    {
      icon: '🎯',
      title: '৪টি পূর্ণাঙ্গ মডেল টেস্ট',
      subtitle: 'পরীক্ষার টাইমার, তাৎক্ষণিক স্কোর ও ব্যাখ্যা',
      badge: 'JLPT N5 অনুরূপ',
      action: () => setActiveTab('exercises'),
    },
    {
      icon: '📖',
      title: 'রিডিং প্যাসেজ (পড়ার অনুচ্ছেদ)',
      subtitle: 'পড়ার সাবলীলতা ও বিষয়ভিত্তিক প্রশ্নের উত্তর',
      badge: 'রিডিং কম্প্রিহেনশন',
      action: () => {
        setActiveLessonId(1);
        setActiveTab('lesson-detail');
      },
    },
    {
      icon: '🃏',
      title: 'ইন্টারঅ্যাক্টিভ ফ্ল্যাশকার্ড ও কুইজ',
      subtitle: 'সহজে মনে রাখার জন্য মেমোরি কার্ড ও তাৎক্ষণিক ফিডব্যাক',
      badge: 'স্মার্ট লার্নিং',
      action: () => setActiveTab('vocab'),
    },
    {
      icon: '🏆',
      title: 'লিডারবোর্ড ও সামুরাই ব্যাজ',
      subtitle: 'XP অর্জন, দৈনিক স্ট্রিক ও লিগে প্রতিযোগিতা',
      badge: 'গ্যামিফিকেশন',
      action: () => setActiveTab('leaderboard'),
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-700 text-white shadow-2xl p-8 sm:p-12 lg:p-16">
        <div className="absolute -right-10 -bottom-10 opacity-10 text-[260px] font-serif pointer-events-none select-none">
          日本語
        </div>

        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>জাপানি ভাষা শেখার প্রিমিয়াম প্ল্যাটফর্ম</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            সহজ বাংলায় জাপানি ভাষা ও JLPT N5 এর পূর্ণ প্রস্তুতি
          </h1>

          <p className="text-sm sm:text-base text-red-100 leading-relaxed">
            মিন্না নো নিহোঙ্গো পাঠ্যক্রমের ২৫টি লেসন, ১০০০+ শব্দার্থ, অডিও উচ্চারণ, ১০৩টি কানজি লেখার ক্যানভাস, ব্যাকরণ ও ৪টি পূর্ণাঙ্গ মডেল টেস্ট নিয়ে সাজানো একটি স্বয়ংসম্পূর্ণ ইন্টারেক্টিভ একাডেমি।
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm shadow-xl shadow-black/10 transition-all flex items-center space-x-2"
            >
              <span>লার্নিং ড্যাশবোর্ডে যান</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setActiveLessonId(1);
                setActiveTab('lesson-detail');
              }}
              className="px-6 py-3.5 rounded-2xl bg-red-950/40 hover:bg-red-950/60 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all"
            >
              লেসন ১ থেকে শুরু করুন
            </button>
          </div>
        </div>
      </div>

      {/* "এই প্যাকেজে যা যা পাচ্ছো" (Exact Section from Screenshot 2) */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
            সম্পূর্ণ N5 পাঠ্যক্রম এক নজরে
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            এই প্ল্যাটফর্মে যা যা পাচ্ছো
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            অন্য কোনো বই বা আলাদা কোর্সের প্রয়োজন ছাড়াই ঘরে বসেই N5 ও NAT-TEST পাসের পূর্ণ রসদ।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {packageFeatures.map((item, index) => (
            <div
              key={index}
              onClick={item.action}
              className="p-5 rounded-3xl bg-white dark:bg-[#121826] border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-red-500/50 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/40">
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-red-600">
                <span>অনুশীলন করুন</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access to N5 Lessons Callout */}
      <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            লেসন ১ থেকে ২৫ পর্যন্ত সিলেবাস ব্রাউজ করুন
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg">
            মিন্না নো নিহোঙ্গো স্ট্যান্ডার্ড অনুযায়ী সাজানো পাঠ পরিকল্পনা যেখানে প্রতিটি বিষয়ের সাথে রয়েছে বাস্তবসম্মত প্রয়োগ।
          </p>
        </div>

        <button
          onClick={() => setActiveTab('lessons')}
          className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
        >
          সব ২৫টি লেসন দেখুন →
        </button>
      </div>
    </div>
  );
};
