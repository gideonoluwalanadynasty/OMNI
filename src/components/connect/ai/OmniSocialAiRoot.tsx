import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Network,
  Briefcase,
  Headphones,
  Video,
  Compass,
  ShieldAlert,
  Globe,
  Lock,
  Sliders,
  Terminal,
  Activity,
  CheckCircle,
  Zap,
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { omniSocialAiEngine } from '../../../engine/omni_social_ai_engine';
import { OmniAiAgentDescriptor } from '../../../types/omni_social_ai';

// Subviews
import { OmniPersonalSocialAssistantView } from './OmniPersonalSocialAssistantView';
import { OmniRelationshipAiView } from './OmniRelationshipAiView';
import { OmniCommunityAiView } from './OmniCommunityAiView';
import { OmniBusinessAiView } from './OmniBusinessAiView';
import { OmniCustomerServiceAiView } from './OmniCustomerServiceAiView';
import { OmniCreatorAiStudioView } from './OmniCreatorAiStudioView';
import { OmniContentIntelligenceView } from './OmniContentIntelligenceView';
import { OmniAiModerationView } from './OmniAiModerationView';
import { OmniAiTranslationView } from './OmniAiTranslationView';
import { OmniAiPrivacyControlView } from './OmniAiPrivacyControlView';
import { OmniAiAdminControlView } from './OmniAiAdminControlView';
import { OmniSocialAiTestSuiteModal } from './OmniSocialAiTestSuiteModal';

export type OmniSocialAiTab =
  | 'overview'
  | 'personal'
  | 'relationship'
  | 'community'
  | 'business'
  | 'customer_service'
  | 'creator_studio'
  | 'content_intel'
  | 'moderation'
  | 'translation'
  | 'privacy'
  | 'admin';

export const OmniSocialAiRoot: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OmniSocialAiTab>('overview');
  const [agents, setAgents] = useState<OmniAiAgentDescriptor[]>(omniSocialAiEngine.getAgents());
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [instantRecap, setInstantRecap] = useState<string | null>(null);

  const handleTriggerInstantRecap = () => {
    const summary = omniSocialAiEngine.getDailySummary();
    setInstantRecap(
      `Executive Daily Recap: ${summary.headline} • You have ${summary.highPriorityMessages.length} priority messages from VIP contacts and 2 upcoming Spaces townhalls.`
    );
  };

  const navTabs = [
    { id: 'overview', label: 'AI Command Center', icon: Activity },
    { id: 'personal', label: 'Personal Social AI', icon: Sparkles },
    { id: 'relationship', label: 'Relationship Graph AI', icon: Network },
    { id: 'community', label: 'Community & Spaces AI', icon: Users },
    { id: 'business', label: 'Business & CRM AI', icon: Briefcase },
    { id: 'customer_service', label: 'Customer Service AI', icon: Headphones },
    { id: 'creator_studio', label: '1-to-N Creator Studio', icon: Video },
    { id: 'content_intel', label: 'Content Trends & Intel', icon: Compass },
    { id: 'moderation', label: 'AI Moderation Shield', icon: ShieldAlert },
    { id: 'translation', label: 'Global Translation', icon: Globe },
    { id: 'privacy', label: 'Privacy & Memory', icon: Lock },
    { id: 'admin', label: 'Super Admin Governance', icon: Sliders },
  ];

  return (
    <div className="space-y-6">
      {/* Top Hero Ribbon */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-600/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-tight">OMNI Social Intelligence Layer</h1>
                <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ACTIVE BY DEFAULT
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Unified relationship intelligence connecting People, Relationships, Communities, Businesses, Content, Commerce & Global Communication.
              </p>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleTriggerInstantRecap}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              "What did I miss today?"
            </button>

            <button
              onClick={() => setIsTestModalOpen(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-all"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              Diagnostics (8/8 Verified)
            </button>
          </div>
        </div>

        {/* Instant Recap Dropdown if Triggered */}
        {instantRecap && (
          <div className="mt-4 p-4 bg-indigo-950/80 border border-indigo-500/40 rounded-xl text-sm text-indigo-100 flex items-start justify-between gap-4 animate-fade-in">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
              <p className="font-medium leading-relaxed">{instantRecap}</p>
            </div>
            <button
              onClick={() => setInstantRecap(null)}
              className="text-xs text-indigo-300 hover:text-white font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Specialized Agents Active</div>
            <div className="text-lg font-black text-white mt-0.5">9 Agents Online</div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Inference Latency (p99)</div>
            <div className="text-lg font-black text-emerald-400 mt-0.5">&lt; 38ms Streaming</div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Privacy & Memory Shield</div>
            <div className="text-lg font-black text-indigo-400 mt-0.5">Zero Model Training</div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Multilingual Real-Time</div>
            <div className="text-lg font-black text-purple-400 mt-0.5">45+ Dialects Live</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin border-b border-slate-800">
        {navTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as OmniSocialAiTab)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview Command Center */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Specialized OMNI Connect AI Agent Roster</h3>
            <span className="text-xs text-emerald-400 font-semibold">9/9 Agents Ready & Configured</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map(agent => (
              <div
                key={agent.agentId}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{agent.icon}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {agent.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">{agent.name}</h4>
                  <p className="text-xs text-slate-400 mb-3">{agent.description}</p>

                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 mb-3">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Architecture Hook</div>
                    <p className="text-[11px] text-slate-300 font-mono">{agent.integrationPoint}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-indigo-400 uppercase">Core Capabilities</div>
                    {agent.capabilities.map((cap, cIdx) => (
                      <div key={cIdx} className="text-xs text-slate-300 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-indigo-400" />
                        {cap}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">Latency: {agent.latencyMs}ms</span>
                  <button
                    onClick={() => {
                      if (agent.agentId === 'personal_assistant') setActiveTab('personal');
                      else if (agent.agentId === 'relationship_assistant') setActiveTab('relationship');
                      else if (agent.agentId === 'community_assistant') setActiveTab('community');
                      else if (agent.agentId === 'business_assistant') setActiveTab('business');
                      else if (agent.agentId === 'customer_service_assistant') setActiveTab('customer_service');
                      else if (agent.agentId === 'creator_assistant') setActiveTab('creator_studio');
                      else if (agent.agentId === 'content_assistant') setActiveTab('content_intel');
                      else if (agent.agentId === 'moderation_assistant') setActiveTab('moderation');
                      else if (agent.agentId === 'translation_assistant') setActiveTab('translation');
                    }}
                    className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                  >
                    Open View <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-views */}
      {activeTab === 'personal' && <OmniPersonalSocialAssistantView />}
      {activeTab === 'relationship' && <OmniRelationshipAiView />}
      {activeTab === 'community' && <OmniCommunityAiView />}
      {activeTab === 'business' && <OmniBusinessAiView />}
      {activeTab === 'customer_service' && <OmniCustomerServiceAiView />}
      {activeTab === 'creator_studio' && <OmniCreatorAiStudioView />}
      {activeTab === 'content_intel' && <OmniContentIntelligenceView />}
      {activeTab === 'moderation' && <OmniAiModerationView />}
      {activeTab === 'translation' && <OmniAiTranslationView />}
      {activeTab === 'privacy' && <OmniAiPrivacyControlView />}
      {activeTab === 'admin' && <OmniAiAdminControlView />}

      {/* Diagnostics Modal */}
      <OmniSocialAiTestSuiteModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
      />
    </div>
  );
};
