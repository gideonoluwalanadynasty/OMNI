import React, { useState, useEffect } from 'react';
import {
  Share2,
  LayoutDashboard,
  Users,
  PenTool,
  Calendar,
  MessageSquare,
  BarChart3,
  Target,
  Bot,
  Sparkles,
  ShieldCheck,
  Plus,
  RefreshCw
} from 'lucide-react';
import {
  SocialAccount,
  SocialPost,
  SocialComment,
  SocialCompetitor,
  SocialAiAgent,
  SocialPlatformMetrics,
  SocialPlatform
} from '../../../types/social_hub';
import { omniSocialService } from '../../../sdk/browser-services/OmniSocialService';
import { OmniSocialDashboardView } from './OmniSocialDashboardView';
import { OmniSocialAccountsView } from './OmniSocialAccountsView';
import { OmniSocialComposerView } from './OmniSocialComposerView';
import { OmniSocialCalendarView } from './OmniSocialCalendarView';
import { OmniSocialInboxView } from './OmniSocialInboxView';
import { OmniSocialAnalyticsView } from './OmniSocialAnalyticsView';
import { OmniSocialCompetitorsView } from './OmniSocialCompetitorsView';
import { OmniSocialAgentsView } from './OmniSocialAgentsView';
import { OmniSocialAiCaptionModal } from './OmniSocialAiCaptionModal';

type SocialTab =
  | 'dashboard'
  | 'accounts'
  | 'composer'
  | 'calendar'
  | 'inbox'
  | 'analytics'
  | 'competitors'
  | 'agents';

export const OmniSocialHubRoot: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SocialTab>('dashboard');
  const [selectedBrand, setSelectedBrand] = useState('OMNI Global Ecosystem');

  // Live Service State
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [comments, setComments] = useState<SocialComment[]>([]);
  const [competitors, setCompetitors] = useState<SocialCompetitor[]>([]);
  const [agents, setAgents] = useState<SocialAiAgent[]>([]);
  const [metrics, setMetrics] = useState<SocialPlatformMetrics[]>([]);

  // AI Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const refreshAll = () => {
    setAccounts(omniSocialService.getAccounts());
    setPosts(omniSocialService.getPosts());
    setComments(omniSocialService.getComments());
    setCompetitors(omniSocialService.getCompetitors());
    setAgents(omniSocialService.getAgents());
    setMetrics(omniSocialService.getPlatformMetrics());
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const handleQuickPublishPost = (postId: string) => {
    omniSocialService.publishPostNow(postId);
    refreshAll();
  };

  const handleQuickAiReply = (comment: SocialComment) => {
    if (comment.suggestedAiReply) {
      omniSocialService.addReplyToComment(comment.id, comment.suggestedAiReply, true);
      refreshAll();
    }
  };

  const handleUseHookInComposer = (hook: string) => {
    setActiveTab('composer');
  };

  const tabs: { id: SocialTab; label: string; icon: React.FC<{ className?: string }>; badge?: number | string }[] = [
    { id: 'dashboard', label: 'Command Centre', icon: LayoutDashboard },
    { id: 'accounts', label: '11 Accounts', icon: Users, badge: accounts.length },
    { id: 'composer', label: 'Composer', icon: PenTool },
    { id: 'calendar', label: 'Content Calendar', icon: Calendar, badge: posts.filter(p => p.status === 'scheduled').length },
    { id: 'inbox', label: 'Unified Inbox', icon: MessageSquare, badge: comments.filter(c => c.status === 'unread').length || undefined },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'competitors', label: 'Competitor Insights', icon: Target },
    { id: 'agents', label: 'OMNI AI Agents', icon: Bot, badge: '4 Active' }
  ];

  return (
    <div className="flex flex-col h-full bg-stone-950 text-stone-100 overflow-y-auto select-none">
      {/* Top Header Strip */}
      <div className="sticky top-0 z-30 bg-stone-950/95 backdrop-blur border-b border-stone-800/80 px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg shadow-indigo-600/30">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-stone-100 tracking-tight">OMNI Social Hub</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-800">
                11 Official Connectors
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Cross-Platform Social Command Centre & AI Agent Dispatch
            </p>
          </div>
        </div>

        {/* Workspace Brand Selector & Quick Actions */}
        <div className="flex items-center gap-2.5">
          <select
            value={selectedBrand}
            onChange={e => setSelectedBrand(e.target.value)}
            className="px-3 py-1.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 font-semibold focus:outline-none focus:border-indigo-500"
          >
            <option value="OMNI Global Ecosystem">OMNI Global Ecosystem</option>
            <option value="OMNI Labs Research">OMNI Labs Research</option>
            <option value="OMNI Developer Network">OMNI Developer Network</option>
          </select>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Hook Crafter</span>
          </button>

          <button
            onClick={() => setActiveTab('composer')}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-stone-950 border-b border-stone-800/80 px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-stone-900 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                    isActive ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main View Area */}
      <div className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {activeTab === 'dashboard' && (
          <OmniSocialDashboardView
            accounts={accounts}
            posts={posts}
            comments={comments}
            agents={agents}
            onNavigateTab={setActiveTab}
            onQuickPublishPost={handleQuickPublishPost}
            onQuickAiReply={handleQuickAiReply}
          />
        )}

        {activeTab === 'accounts' && (
          <OmniSocialAccountsView accounts={accounts} onRefreshAccounts={refreshAll} />
        )}

        {activeTab === 'composer' && (
          <OmniSocialComposerView accounts={accounts} onPostCreated={refreshAll} />
        )}

        {activeTab === 'calendar' && (
          <OmniSocialCalendarView
            posts={posts}
            onOpenComposer={() => setActiveTab('composer')}
            onRefreshPosts={refreshAll}
          />
        )}

        {activeTab === 'inbox' && (
          <OmniSocialInboxView comments={comments} onRefreshComments={refreshAll} />
        )}

        {activeTab === 'analytics' && (
          <OmniSocialAnalyticsView metrics={metrics} posts={posts} />
        )}

        {activeTab === 'competitors' && (
          <OmniSocialCompetitorsView
            competitors={competitors}
            onRefreshCompetitors={refreshAll}
            onUseHookInComposer={handleUseHookInComposer}
          />
        )}

        {activeTab === 'agents' && (
          <OmniSocialAgentsView agents={agents} onRefreshAgents={refreshAll} />
        )}
      </div>

      {/* AI Caption Crafter Modal */}
      <OmniSocialAiCaptionModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectVariation={() => {
          setActiveTab('composer');
        }}
      />
    </div>
  );
};
