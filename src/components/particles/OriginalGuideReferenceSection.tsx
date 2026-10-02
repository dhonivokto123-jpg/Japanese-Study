import React, { useState } from 'react';
import { ComprehensiveGuideSheet, getGuideSheetsForParticle } from '../../data/particleGuidesMap';
import { OriginalGuideModal } from './OriginalGuideModal';
import { playJapaneseAudio, soundFx } from '../../utils/audio';
import {
  FileText,
  Maximize2,
  Volume2,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight,
  Eye
} from 'lucide-react';

interface Props {
  particleId: string;
  particleSymbol: string;
}

export const OriginalGuideReferenceSection: React.FC<Props> = ({
  particleId,
  particleSymbol
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSheetIndex, setSelectedSheetIndex] = useState(0);

  const sheets = getGuideSheetsForParticle(particleId);

  if (sheets.length === 0) return null;

  const handleOpenModal = (index: number = 0) => {
    setSelectedSheetIndex(index);
    setModalOpen(true);
    soundFx.playClick();
  };

  return (
    <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>মূল গাইড শিট রেফারেন্স (Original Learning Guide)</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                {sheets.length}টি শিট
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              মাকসুদ আলমের "Grammar Part 1 - Particles" হস্তলিখিত শিক্ষণ পদ্ধতির সরাসরি পৃষ্ঠা
            </p>
          </div>
        </div>

        <button
          onClick={() => handleOpenModal(0)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>🖼 পূর্ণ শিট ভিউ করুন (Click to Enlarge)</span>
        </button>
      </div>

      {/* Grid of Sheet Thumbnails */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sheets.map((sheet, index) => (
          <div
            key={sheet.id}
            className="group glass-card rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col shadow-xs hover:shadow-lg"
          >
            {/* Sheet Preview Image Area */}
            <div
              onClick={() => handleOpenModal(index)}
              className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-900 cursor-pointer overflow-hidden border-b border-slate-200 dark:border-slate-800"
            >
              <img
                src={sheet.imageUrl}
                alt={sheet.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-bold shadow-lg flex items-center gap-1.5 backdrop-blur-xs">
                  <Eye className="w-3.5 h-3.5 text-indigo-500" />
                  <span>বড় করে দেখুন</span>
                </div>
              </div>

              {/* Page Number Badge */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-xs">
                Page {sheet.pageNumber}
              </div>
            </div>

            {/* Sheet Summary Content */}
            <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {sheet.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {sheet.keyBengaliRules[0] || sheet.captionBn}
                </p>
              </div>

              {/* Quick Topic Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {sheet.summaryTopics.slice(0, 2).map((top, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400 truncate max-w-full"
                  >
                    {top}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleOpenModal(index)}
                className="w-full mt-2 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800/80 dark:hover:bg-indigo-950/40 text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>শিট বিস্তারিত ও অডিও শুনুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal */}
      <OriginalGuideModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        sheets={sheets}
        initialSheetIndex={selectedSheetIndex}
      />
    </div>
  );
};
