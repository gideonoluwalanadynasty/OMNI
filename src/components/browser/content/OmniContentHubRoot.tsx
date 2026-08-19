import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  Sparkles,
  DollarSign,
  PenTool,
  ArrowLeft,
  Share2,
  Bookmark,
  Bell
} from 'lucide-react';
import { OmniDiscoverFeedView } from './OmniDiscoverFeedView';
import { OmniAiMagazineView } from './OmniAiMagazineView';
import { OmniCreatorStudioView } from './OmniCreatorStudioView';
import { OmniMonetizationView } from './OmniMonetizationView';

interface OmniContentHubRootProps {
  initialTab?: 'discover' | 'magazine' | 'creator' | 'monetize';
  onClose?: () => void;
}

export const OmniContentHubRoot: React.FC<OmniContentHubRootProps> = ({
  initialTab = 'discover',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'discover' | 'magazine' | 'creator' | 'monetize'>(initialTab);

  return (
    <div id="omni-content-hub-root" className="min-h-full bg-stone-950 text-stone-100 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Main Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800/80">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors"
              title="Return to Browser"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-600/20">
              <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-stone-100 tracking-tight">OMNI Content Ecosystem</h1>
                <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-mono">
                  v5.4 Sovereign
                </span>
              </div>
              <p className="text-[11px] text-stone-400">Discover • AI Magazine • Creator Studio • Monetisation</p>
            </div>
          </div>
        </div>

        {/* Pillar Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-stone-900/90 border border-stone-800 p-1.5 rounded-2xl shrink-0 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'discover', label: 'Discover', icon: <Compass className="w-3.5 h-3.5" />, accent: 'text-indigo-400' },
            { id: 'magazine', label: 'AI Magazine (10)', icon: <BookOpen className="w-3.5 h-3.5" />, accent: 'text-blue-400' },
            { id: 'creator', label: 'Creator Studio', icon: <PenTool className="w-3.5 h-3.5" />, accent: 'text-purple-400' },
            { id: 'monetize', label: 'Monetisation', icon: <DollarSign className="w-3.5 h-3.5" />, accent: 'text-emerald-400' }
          ].map(tab => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 ${
                  isSelected
                    ? 'bg-stone-100 text-stone-900 shadow-md font-black'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
              >
                <span className={isSelected ? 'text-stone-900' : tab.accent}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected View */}
      {activeTab === 'discover' && (
        <OmniDiscoverFeedView onOpenCreatorStudio={() => setActiveTab('creator')} />
      )}

      {activeTab === 'magazine' && <OmniAiMagazineView />}

      {activeTab === 'creator' && <OmniCreatorStudioView />}

      {activeTab === 'monetize' && <OmniMonetizationView />}
    </div>
  );
};
