import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { LessonDetailView } from './components/LessonDetailView';
import { LessonsCatalogView } from './components/LessonsCatalogView';
import { VocabularyView } from './components/VocabularyView';
import { KanjiMasterView } from './components/KanjiMasterView';
import { ParticlesResearchView } from './components/ParticlesResearchView';
import { VoicePracticeView } from './components/VoicePracticeView';
import { GrammarGuideView } from './components/GrammarGuideView';
import { ExercisesHubView } from './components/ExercisesHubView';
import { CharacterMasteryView } from './components/CharacterMasteryView';
import { CountersView } from './components/CountersView';
import { LeaderboardView } from './components/LeaderboardView';
import { AchievementsView } from './components/AchievementsView';
import { ProfileView } from './components/ProfileView';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardView />;
      case 'lessons':
        return <LessonsCatalogView />;
      case 'lesson-detail':
        return <LessonDetailView />;
      case 'vocab':
        return <VocabularyView />;
      case 'kanji':
        return <KanjiMasterView />;
      case 'particles':
        return <ParticlesResearchView />;
      case 'speaking':
        return <VoicePracticeView />;
      case 'grammar':
        return <GrammarGuideView />;
      case 'exercises':
        return <ExercisesHubView />;
      case 'characters':
        return <CharacterMasteryView />;
      case 'counters':
        return <CountersView />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'achievements':
        return <AchievementsView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/90 dark:bg-[#0b0e17] text-slate-800 dark:text-slate-100 flex flex-col md:flex-row relative transition-colors duration-300 font-sans selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:text-indigo-300">
      {/* Ambient Canvas Glow Mesh for authentic glass depth */}
      <div className="glass-bg-canvas">
        <div className="glass-orb-1" />
        <div className="glass-orb-2" />
        <div className="glass-orb-3" />
      </div>

      {/* Persistent Glass Sidebar */}
      <Sidebar
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onOpenAuth={openAuth}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Sticky Header */}
        <Header
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenAuth={openAuth}
        />

        {/* Page Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveView()}
        </main>

        {/* Footer - Glass Panel */}
        <footer className="glass-panel border-t border-slate-200/60 dark:border-white/5 py-6 px-6 text-center text-xs text-slate-500 dark:text-slate-400 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="flex items-center space-x-2 font-medium text-slate-700 dark:text-slate-300">
              <span className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-bold text-xs flex items-center justify-center font-serif shadow-xs">
                日
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                Nihonova Glassy
              </span>
              <span>— মিন্না নো নিহোঙ্গো ১-২৫ ও JLPT N5 পূর্ণাঙ্গ সিলেবাস</span>
            </p>
            <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              日本語学習プラットフォーム · {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
