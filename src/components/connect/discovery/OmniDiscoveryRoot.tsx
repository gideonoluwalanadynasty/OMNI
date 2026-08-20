import React, { useState } from 'react';
import {
  Search,
  Compass,
  Briefcase,
  BarChart3,
  Brain,
  Sliders,
  Terminal,
  ShieldCheck,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { OmniUniversalSearch } from './OmniUniversalSearch';
import { OmniDiscoveryFeed } from './OmniDiscoveryFeed';
import { OmniBusinessDiscovery } from './OmniBusinessDiscovery';
import { OmniConnectAnalytics } from './OmniConnectAnalytics';
import { OmniAiAnalyticsAssistant } from './OmniAiAnalyticsAssistant';
import { OmniRecommendationSettingsModal } from './OmniRecommendationSettingsModal';
import { OmniDiscoveryTestSuite } from './OmniDiscoveryTestSuite';
import { OmniRecommendationPrivacyConsent } from '../../../types/omni_discovery';
import { DEFAULT_PRIVACY_CONSENT } from './discoveryData';

export type OmniDiscoveryTab =
  | 'omni_search'
  | 'omni_discovery'
  | 'business_discovery'
  | 'omni_analytics'
  | 'ai_analytics_assistant'
  | 'discovery_test_suite';

interface OmniDiscoveryRootProps {
  initialTab?: OmniDiscoveryTab;
  onNavigateToBusiness?: () => void;
}

export const OmniDiscoveryRoot: React.FC<OmniDiscoveryRootProps> = ({
  initialTab = 'omni_discovery',
  onNavigateToBusiness
}) => {
  const [activeTab, setActiveTab] = useState<OmniDiscoveryTab>(initialTab);
  const [privacyConsent, setPrivacyConsent] = useState<OmniRecommendationPrivacyConsent>(DEFAULT_PRIVACY_CONSENT);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);

  const navTabs: { id: OmniDiscoveryTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'omni_discovery', label: 'Discovery Feed', icon: Compass, badge: '8 Signals' },
    { id: 'omni_search', label: 'Universal Search', icon: Search, badge: '11 Indices' },
    { id: 'business_discovery', label: 'Business Directory', icon: Briefcase, badge: 'Escrow' },
    { id: 'omni_analytics', label: 'Analytics Suite', icon: BarChart3, badge: '5 Tiers' },
    { id: 'ai_analytics_assistant', label: 'AI Analytics Copilot', icon: Brain, badge: 'Gemini 2.5' },
    { id: 'discovery_test_suite', label: 'Test Matrix', icon: Terminal, badge: '8/8 Pass' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6" id="omni-discovery-root-wrapper">
      {/* Platform Level Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-5 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white">OMNI Discovery Intelligence Platform</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PROMPT 14 LIVE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Universal Search • 8-Signal Recommendations • 5-Tier Analytics • Sovereign Privacy
            </p>
          </div>
        </div>

        {/* Global Action & Privacy Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsPrivacyModalOpen(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-200 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sovereign Privacy Settings</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {navTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`omni-discovery-nav-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 border transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/25'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                  isActive ? 'bg-black/30 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main View Display */}
      <div className="space-y-6">
        {activeTab === 'omni_discovery' && (
          <OmniDiscoveryFeed
            privacyConsent={privacyConsent}
            onOpenSearchCategory={(cat) => {
              setActiveTab('omni_search');
            }}
            onOpenPrivacySettings={() => setIsPrivacyModalOpen(true)}
            onNavigateToBusiness={() => setActiveTab('business_discovery')}
          />
        )}

        {activeTab === 'omni_search' && (
          <OmniUniversalSearch
            privacyConsent={privacyConsent}
            onNavigateToBusiness={() => setActiveTab('business_discovery')}
          />
        )}

        {activeTab === 'business_discovery' && (
          <OmniBusinessDiscovery />
        )}

        {activeTab === 'omni_analytics' && (
          <OmniConnectAnalytics
            onOpenAiAssistant={() => setActiveTab('ai_analytics_assistant')}
          />
        )}

        {activeTab === 'ai_analytics_assistant' && (
          <OmniAiAnalyticsAssistant />
        )}

        {activeTab === 'discovery_test_suite' && (
          <OmniDiscoveryTestSuite />
        )}
      </div>

      {/* Privacy Settings Modal */}
      <OmniRecommendationSettingsModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        consent={privacyConsent}
        onUpdateConsent={(updated) => setPrivacyConsent(updated)}
      />
    </div>
  );
};
