import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  ShieldAlert,
  BookOpen,
  ShoppingBag,
  Users,
  MessageSquare,
  FileText,
  Video,
  Award,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  Download,
  Lock,
  Globe,
  Share2,
  ThumbsUp,
  AlertTriangle,
  Flame,
  Search,
  Filter,
  Plus,
  Compass,
  ArrowRight,
  ExternalLink,
  Bot,
  Languages,
  Check,
  Building,
  GraduationCap,
  Heart,
  Briefcase
} from 'lucide-react';
import {
  OmniSpace,
  OmniSpaceTab,
  OmniSpaceType,
  OmniSpaceMember,
  OmniSpaceDiscussionTopic,
  OmniSpaceCourseModule,
  OmniSpaceStoreItem,
  OmniSpaceResourceDoc,
  OmniSpaceMediaItem,
  OmniMemberRole
} from '../../../types/omni_community_spaces';
import { OmniConnectEngine } from '../../../engine/omni_connect_engine';

interface Props {
  engine: OmniConnectEngine;
  currentProfileId: string;
  onOpenCreateSpaceModal: () => void;
  onOpenGroups: () => void;
  onOpenChannels: () => void;
  onOpenTestSuite: () => void;
}

export const OmniSpacesHub: React.FC<Props> = ({
  engine,
  currentProfileId,
  onOpenCreateSpaceModal,
  onOpenGroups,
  onOpenChannels,
  onOpenTestSuite
}) => {
  const [spaces, setSpaces] = useState<OmniSpace[]>(() => engine.getOmniSpaces());
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>(() => spaces[0]?.id || 'space_tech_founders');
  const [activeTab, setActiveTab] = useState<OmniSpaceTab>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Space-specific sub-states
  const [aiQueryInput, setAiQueryInput] = useState<string>('');
  const [aiLanguage, setAiLanguage] = useState<string>('English');
  const [aiChatHistory, setAiChatHistory] = useState<{ sender: 'user' | 'assistant'; text: string; citations?: string[]; isFlagged?: boolean }[]>([
    {
      sender: 'assistant',
      text: 'Hello! I am your resident AI Assistant for this Space. Ask me anything grounded in our architecture documents, courses, and community rules.',
      citations: ['OMNI Sovereign Protocol Specification v4.2']
    }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // New discussion modal state
  const [showNewDiscussionModal, setShowNewDiscussionModal] = useState(false);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionCategory, setNewDiscussionCategory] = useState('System Architecture');
  const [newDiscussionContent, setNewDiscussionContent] = useState('');

  // Store purchase feedback
  const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState<string | null>(null);

  // Active space derivation
  const currentSpace = spaces.find(s => s.id === selectedSpaceId) || spaces[0];

  // Refresh lists
  const refreshSpaceData = () => {
    setSpaces(engine.getOmniSpaces());
  };

  const members: OmniSpaceMember[] = currentSpace ? engine.getSpaceMembers(currentSpace.id) : [];
  const discussions: OmniSpaceDiscussionTopic[] = currentSpace ? engine.getSpaceDiscussions(currentSpace.id) : [];
  const courses: OmniSpaceCourseModule[] = currentSpace ? engine.getSpaceCourses(currentSpace.id) : [];
  const storeItems: OmniSpaceStoreItem[] = currentSpace ? engine.getSpaceStoreItems(currentSpace.id) : [];
  const resources: OmniSpaceResourceDoc[] = currentSpace ? engine.getSpaceResources(currentSpace.id) : [];
  const mediaItems: OmniSpaceMediaItem[] = currentSpace ? engine.getSpaceMedia(currentSpace.id) : [];
  const reports = currentSpace ? engine.getCommunityReports(currentSpace.id) : [];
  const analytics = currentSpace ? engine.getCommunityAnalytics(currentSpace.id) : null;

  // Filtered spaces
  const filteredSpaces = spaces.filter(space => {
    const matchesSearch =
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'all' || space.category === selectedCategoryFilter;
    const matchesType = selectedTypeFilter === 'all' || space.spaceType === selectedTypeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  // AI Assistant Query Handler
  const handleSendAiQuery = () => {
    if (!aiQueryInput.trim() || !currentSpace) return;
    const query = aiQueryInput.trim();
    setAiChatHistory(prev => [...prev, { sender: 'user', text: query }]);
    setAiQueryInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      const response = engine.querySpaceAiAssistant(currentSpace.id, query, aiLanguage);
      setAiChatHistory(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: response.answer,
          citations: response.groundedResources,
          isFlagged: response.toxicFlagged
        }
      ]);
      setIsAiThinking(false);
    }, 600);
  };

  // Join Space Handler
  const handleJoinSpace = () => {
    if (!currentSpace) return;
    engine.joinOmniSpace(currentSpace.id, {
      profileId: currentProfileId,
      displayName: 'Gideon Oluwalana',
      username: 'gideon',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      role: 'member',
      membershipTier: currentSpace.membershipTier,
      badges: ['Active Pioneer'],
      joinedAt: new Date().toISOString(),
      reputationPoints: 100,
      lastActive: 'Just now'
    });
    refreshSpaceData();
  };

  // Upvote Discussion
  const handleToggleUpvote = (topicId: string) => {
    if (!currentSpace) return;
    engine.toggleUpvoteDiscussion(currentSpace.id, topicId, currentProfileId);
    refreshSpaceData();
  };

  // Create Discussion
  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscussionTitle.trim() || !currentSpace) return;
    engine.createSpaceDiscussion(currentSpace.id, {
      title: newDiscussionTitle.trim(),
      category: newDiscussionCategory,
      content: newDiscussionContent.trim(),
      authorProfileId: currentProfileId,
      authorName: 'Gideon Oluwalana',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      tags: [newDiscussionCategory]
    });
    setNewDiscussionTitle('');
    setNewDiscussionContent('');
    setShowNewDiscussionModal(false);
    refreshSpaceData();
  };

  // Purchase Store Item
  const handlePurchaseItem = (itemId: string, method: 'fiat_usd' | 'omni_coins') => {
    if (!currentSpace) return;
    try {
      const res = engine.purchaseStoreItem(currentSpace.id, itemId, currentProfileId, method);
      setPurchaseSuccessMessage(`Successfully purchased "${res.itemTitle}"! Tx: ${res.transactionId}`);
      setTimeout(() => setPurchaseSuccessMessage(null), 6000);
      refreshSpaceData();
    } catch (err: any) {
      alert(err?.message || 'Purchase failed');
    }
  };

  // Sync to CRM
  const handleSyncCrm = () => {
    if (!currentSpace) return;
    const res = engine.syncCommunityToCrm(currentSpace.id);
    alert(`CRM Synchronization Complete: ${res.syncedCount} new member records synced to pipeline "${res.leadPipelineStage}".`);
    refreshSpaceData();
  };

  return (
    <div id="omni-spaces-hub" className="space-y-6">
      {/* Top Header & Fast Navigation Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-8 backdrop-blur-md shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                FLAGSHIP OMNI SPACES
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                8 Space Archetypes Active
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              OMNI Community, Groups & Sovereign Spaces
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              The social organization layer of OMNI: Unified communities, custom websites, forum discussions, courses, digital storefronts, CRM pipelines and grounded AI assistants.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenCreateSpaceModal}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create OMNI Space</span>
            </button>
            <button
              onClick={onOpenGroups}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>Special Groups</span>
            </button>
            <button
              onClick={onOpenChannels}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Broadcast Channels</span>
            </button>
            <button
              onClick={onOpenTestSuite}
              className="px-3.5 py-2 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 rounded-xl text-xs font-bold border border-emerald-800/60 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Spaces Diagnostics (6 Tests)</span>
            </button>
          </div>
        </div>

        {/* Search & Quick Filter Pills */}
        <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-slate-800/80">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search spaces by interest, brand, enterprise, school or faith..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold whitespace-nowrap">Filter Type:</span>
            {[
              { id: 'all', label: 'All Spaces' },
              { id: 'public', label: 'Public' },
              { id: 'enterprise', label: 'Enterprise' },
              { id: 'learning', label: 'Learning' },
              { id: 'creator', label: 'Creator VIP' },
              { id: 'organisation', label: 'Faith & Org' },
              { id: 'family', label: 'Family' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedTypeFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedTypeFilter === f.id
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Spaces Exploration Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {filteredSpaces.map(space => {
          const isSelected = space.id === selectedSpaceId;
          return (
            <button
              key={space.id}
              onClick={() => {
                setSelectedSpaceId(space.id);
                setActiveTab('home');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-indigo-950/60 to-slate-900 border-indigo-500/80 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/50'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <img
                  src={space.avatarUrl}
                  alt={space.name}
                  className="w-8 h-8 rounded-lg object-cover border border-slate-700"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{space.name}</div>
                  <div className="text-[10px] text-indigo-400 capitalize truncate">{space.spaceType} Space</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/60">
                <span>{space.totalMembersCount.toLocaleString()} members</span>
                {space.membershipTier === 'paid' && (
                  <span className="text-amber-400 font-bold">${space.subscriptionPriceMonthlyUsd}/mo</span>
                )}
                {space.membershipTier === 'free' && (
                  <span className="text-emerald-400 font-semibold">Free</span>
                )}
                {space.membershipTier === 'approval' && (
                  <span className="text-purple-400 font-semibold">Approval</span>
                )}
                {space.membershipTier === 'invitation' && (
                  <span className="text-cyan-400 font-semibold">Invite</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Space Detail View */}
      {currentSpace && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Space Hero Banner with Custom Website Style */}
          <div className="relative h-60 md:h-72 w-full bg-slate-950 overflow-hidden">
            <img
              src={currentSpace.bannerUrl}
              alt={currentSpace.name}
              className="w-full h-full object-cover opacity-60 filter saturate-150"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

            {/* Space Branding Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <img
                  src={currentSpace.avatarUrl}
                  alt={currentSpace.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-4 border-slate-900 shadow-2xl"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl md:text-2xl font-extrabold text-white">{currentSpace.name}</h2>
                    {currentSpace.isVerified && (
                      <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-[10px] font-bold border border-indigo-500/30">
                        Verified Space
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-indigo-200 mt-1 max-w-xl line-clamp-1">{currentSpace.tagline}</p>
                  {currentSpace.customDomain && (
                    <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono mt-1">
                      <Globe className="w-3 h-3" />
                      <span>{currentSpace.customDomain}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Top CTA & Stats */}
              <div className="flex items-center gap-3">
                <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 text-right hidden sm:block">
                  <div className="text-xs font-bold text-white">{currentSpace.activeOnlineCount} Online</div>
                  <div className="text-[10px] text-slate-400">{currentSpace.totalMembersCount.toLocaleString()} Total Members</div>
                </div>

                <button
                  onClick={handleJoinSpace}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Users className="w-4 h-4" />
                  <span>Join Space</span>
                </button>

                {currentSpace.crmIntegration?.enabled && (
                  <button
                    onClick={handleSyncCrm}
                    className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
                    title="Synchronize community members with OMNI CRM Pipeline"
                  >
                    <Building className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Sync CRM</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Space Navigation Tabs */}
          <div className="flex items-center gap-1 px-6 py-3 border-b border-slate-800 overflow-x-auto bg-slate-950/60 text-xs">
            {[
              { id: 'home', label: 'Home (Website)', icon: Globe },
              { id: 'feed', label: 'Feed & Updates', icon: MessageSquare },
              { id: 'discussion', label: 'Forums & Q&A', icon: Award, count: (discussions || []).length },
              { id: 'chat', label: 'Space Chat', icon: MessageSquare },
              { id: 'members', label: 'Members', icon: Users, count: (members || []).length },
              { id: 'events', label: 'Events & Meetups', icon: Clock },
              { id: 'resources', label: 'Resources & Docs', icon: FileText, count: (resources || []).length },
              { id: 'courses', label: 'Courses', icon: GraduationCap, count: (courses || []).length },
              { id: 'store', label: 'Digital Store', icon: ShoppingBag, count: (storeItems || []).length },
              { id: 'media', label: 'Media Vault', icon: Video, count: (mediaItems || []).length },
              { id: 'ai_assistant', label: `${currentSpace?.aiAssistant?.assistantName || 'Space AI'}`, icon: Bot, isAi: true },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'moderation', label: 'Moderation', icon: ShieldAlert, count: (reports || []).length }
            ].map(t => {
              const isActive = activeTab === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as OmniSpaceTab)}
                  className={`px-3.5 py-2 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                    isActive
                      ? t.isAi
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                  {t.count !== undefined && (
                    <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div className="p-6 lg:p-8 min-h-[480px]">
            {/* Purchase Toast Message */}
            {purchaseSuccessMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{purchaseSuccessMessage}</span>
              </div>
            )}

            {/* TAB 1: HOME (WEBSITE LAYOUT) */}
            {activeTab === 'home' && (
              <div className="space-y-8">
                {/* Mission & Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 space-y-4">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        About {currentSpace.name}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{currentSpace.description}</p>

                      <div className="pt-4 border-t border-slate-800/80">
                        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Space Code of Conduct & Rules</h4>
                        <ul className="space-y-1.5">
                          {(currentSpace?.rules || []).map((rule, idx) => (
                            <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                              <span className="text-indigo-400 font-bold">•</span>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Featured Resources Preview */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-indigo-400" />
                          Featured Blueprints & Documents
                        </h3>
                        <button
                          onClick={() => setActiveTab('resources')}
                          className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                        >
                          <span>View All ({(resources || []).length})</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(resources || []).slice(0, 2).map(doc => (
                          <div key={doc.id} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-white truncate">{doc.title}</div>
                              <div className="text-[10px] text-slate-400 mt-1">{doc.category} • {(doc.fileSizeBytes / 1024 / 1024).toFixed(1)} MB</div>
                            </div>
                            <button className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] font-semibold flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              <span>Download</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Stats & Resident AI Widget */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-b from-purple-950/40 to-slate-950 border border-purple-800/40 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={currentSpace.aiAssistant.avatarUrl}
                          alt={currentSpace.aiAssistant.assistantName}
                          className="w-10 h-10 rounded-xl object-cover border border-purple-500/50"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{currentSpace.aiAssistant.assistantName}</div>
                          <div className="text-[10px] text-purple-300">Space Resident AI Agent</div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 italic">
                        "{currentSpace.aiAssistant.welcomeMessageTemplate.replace('{{name}}', 'Builder')}"
                      </p>

                      <button
                        onClick={() => setActiveTab('ai_assistant')}
                        className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span>Chat with Resident AI</span>
                      </button>
                    </div>

                    {/* Quick Financial Snapshot */}
                    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Treasury & Community Support</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                          <div className="text-[10px] text-slate-400">Total Volume</div>
                          <div className="text-sm font-extrabold text-white">${currentSpace.totalRevenueUsd.toLocaleString()}</div>
                        </div>
                        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                          <div className="text-[10px] text-slate-400">Donations Raised</div>
                          <div className="text-sm font-extrabold text-emerald-400">${currentSpace.donationsTotalUsd.toLocaleString()}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const amount = prompt('Enter donation amount in USD:', '50');
                          if (amount && !isNaN(Number(amount))) {
                            engine.donateToSpace(currentSpace.id, Number(amount), 'Community Supporter');
                            refreshSpaceData();
                            alert(`Thank you for contributing $${amount} to ${currentSpace.name}!`);
                          }
                        }}
                        className="w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Heart className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Support Space with Donation</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FEED & UPDATES */}
            {activeTab === 'feed' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
                    alt="You"
                    className="w-9 h-9 rounded-full object-cover border border-slate-700"
                  />
                  <input
                    type="text"
                    placeholder={`Post a high-signal update to ${currentSpace.name}...`}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">
                    Post
                  </button>
                </div>

                {/* Sample Community Posts */}
                <div className="space-y-4">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
                          alt="Gideon"
                          className="w-10 h-10 rounded-full object-cover border border-indigo-500/60"
                        />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>Gideon Oluwalana</span>
                            <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded text-[9px] font-bold">FOUNDER</span>
                          </div>
                          <div className="text-[10px] text-slate-400">Published 2 hours ago • Verified Sovereign Node</div>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded font-bold">PINNED</span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">
                      We have deployed the latest OMNI Spaces release. Every space now features its own localized resident AI Assistant grounded in your uploaded blueprints, an encrypted member directory, and direct CRM lead pipeline synchronization.
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-3 border-t border-slate-800">
                      <button className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>142 Likes</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-white">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>38 Comments</span>
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-white">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DISCUSSIONS & Q&A FORUMS */}
            {activeTab === 'discussion' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-indigo-400" />
                      Forum Discussions & Solved Q&A
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Peer-reviewed technical inquiries, accepted solution badges, and upvoting.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowNewDiscussionModal(true)}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2 self-start cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Start Discussion</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {discussions.map(topic => (
                    <div
                      key={topic.id}
                      className={`bg-slate-950/80 border rounded-2xl p-6 space-y-4 transition-all ${
                        topic.isSolved ? 'border-emerald-500/40 bg-slate-950/90' : 'border-slate-800'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            {topic.isPinned && (
                              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded text-[9px] font-bold">
                                PINNED
                              </span>
                            )}
                            {topic.isSolved && (
                              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold flex items-center gap-1 border border-emerald-500/30">
                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                                SOLVED & VERIFIED
                              </span>
                            )}
                            <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-medium">
                              {topic.category}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-white hover:text-indigo-300 transition-colors cursor-pointer">
                            {topic.title}
                          </h4>

                          <p className="text-xs text-slate-300 leading-relaxed">{topic.content}</p>

                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            {(topic.tags || []).map((tag, idx) => (
                              <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-900 border border-slate-800 text-indigo-400 rounded-md font-mono">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Upvote Box */}
                        <button
                          onClick={() => handleToggleUpvote(topic.id)}
                          className="flex flex-col items-center justify-center p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl min-w-[64px] transition-colors"
                        >
                          <ThumbsUp className={`w-4 h-4 ${(topic.upvotedBy || []).includes(currentProfileId) ? 'text-indigo-400' : 'text-slate-400'}`} />
                          <span className="text-xs font-bold text-white mt-1">{topic.upvotesCount || 0}</span>
                          <span className="text-[9px] text-slate-500">Votes</span>
                        </button>
                      </div>

                      {/* Verified Solution Box */}
                      {topic.solutionComment && (
                        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1.5">
                          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                            <Check className="w-3.5 h-3.5" />
                            <span>Accepted Solution by {topic.solutionComment.authorName}</span>
                          </div>
                          <p className="text-xs text-slate-200">{topic.solutionComment.content}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <img src={topic.authorAvatar} alt={topic.authorName} className="w-5 h-5 rounded-full object-cover" />
                          <span>Posted by <strong className="text-slate-200">{topic.authorName}</strong></span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span>{topic.repliesCount} replies</span>
                          <span>•</span>
                          <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: CHAT */}
            {activeTab === 'chat' && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 h-[440px] flex flex-col justify-between">
                <div className="space-y-4 overflow-y-auto pr-2">
                  <div className="p-3 bg-indigo-950/30 border border-indigo-500/30 rounded-xl text-xs text-indigo-300 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Real-time End-to-End Encrypted Space Channel. State replicated via WebRTC mesh.</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200" alt="Elena" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Elena Rostova</span>
                        <span className="text-[10px] text-slate-400 font-normal">14:02</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        Has anyone tested the latest multi-agent coordinator script under heavy concurrency?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="Gideon" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Gideon Oluwalana</span>
                        <span className="text-[10px] text-slate-400 font-normal">14:05</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        Yes! Verified across 500 nodes with &lt;15ms latency. Check the specification in the Resources tab.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder={`Message #${currentSpace.slug}...`}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: MEMBERS DIRECTORY */}
            {activeTab === 'members' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    Verified Member Directory ({(members || []).length})
                  </h3>
                  <span className="text-xs text-slate-400">Role-based Access & Reputation Ledgers</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {members.map(member => (
                    <div key={member.profileId} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <img src={member.avatarUrl} alt={member.displayName} className="w-11 h-11 rounded-full object-cover border border-slate-700" />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                            <span>{member.displayName}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">@{member.username}</div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                              member.role === 'owner' ? 'bg-indigo-500/20 text-indigo-300' :
                              member.role === 'admin' ? 'bg-purple-500/20 text-purple-300' :
                              member.role === 'vip' ? 'bg-amber-500/20 text-amber-300' :
                              member.role === 'moderator' ? 'bg-cyan-500/20 text-cyan-300' :
                              'bg-slate-800 text-slate-400'
                            }`}>
                              {member.role}
                            </span>
                            {(member.badges || []).map((b, idx) => (
                              <span key={idx} className="text-[9px] px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-xs font-extrabold text-indigo-400">{member.reputationPoints} XP</div>
                        <div className="text-[9px] text-slate-500 mt-1">{member.lastActive}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: COURSES */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-indigo-400" />
                      Structured Syllabus & Mastery Tracks
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Complete lessons to earn cryptographic proof-of-knowledge credentials.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map(course => (
                    <div key={course.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded">
                            {course.lessonCount} LESSONS • {course.durationMinutes} MINS
                          </span>
                          <h4 className="text-sm font-bold text-white">{course.title}</h4>
                        </div>
                        <span className="text-xs font-bold text-amber-400">+{course.xpReward} XP</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-indigo-400 font-bold">{course.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: `${course.progressPercent}%` }} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                        <div className="flex items-center gap-2 text-slate-400">
                          <img src={course.instructorAvatar} alt={course.instructorName} className="w-6 h-6 rounded-full object-cover" />
                          <span>{course.instructorName}</span>
                        </div>

                        <button
                          onClick={() => {
                            engine.completeCourseModule(currentSpace.id, course.id);
                            refreshSpaceData();
                          }}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                        >
                          {course.progressPercent === 100 ? 'Review Module' : 'Resume Lesson'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: DIGITAL STORE */}
            {activeTab === 'store' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-indigo-400" />
                      Space Storefront & VIP Passes
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Pay via USD Stripe integration or sovereign OMNI Coins.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {storeItems.map(item => (
                    <div key={item.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                      <div>
                        <img src={item.imageUrl} alt={item.title} className="w-full h-44 object-cover" />
                        <div className="p-5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded">
                              {item.itemType.replace('_', ' ')}
                            </span>
                            <span className="text-xs text-amber-400 font-bold">★ {item.rating}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
                          <p className="text-xs text-slate-300 line-clamp-2">{item.description}</p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 space-y-3">
                        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                          <div>
                            <div className="text-sm font-extrabold text-white">${item.priceUsd.toFixed(2)}</div>
                            <div className="text-[10px] text-indigo-400 font-mono">{item.priceOmniCoins} OMNI Coins</div>
                          </div>
                          <span className="text-[10px] text-slate-500">{item.salesCount} sold</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handlePurchaseItem(item.id, 'fiat_usd')}
                            className="py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors text-center"
                          >
                            Pay USD
                          </button>
                          <button
                            onClick={() => handlePurchaseItem(item.id, 'omni_coins')}
                            className="py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-bold transition-colors text-center"
                          >
                            OMNI Coin
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: RESOURCES & DOCUMENTS */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-400" />
                      Verified Knowledge Base & Specifications
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Blueprints, schemas, source archives and token models.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources.map(doc => (
                    <div key={doc.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-300 rounded uppercase">
                            {doc.fileType}
                          </span>
                          {doc.isEnterpriseLocked && (
                            <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded font-bold flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              LOCKED
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-white">{doc.title}</h4>
                        <div className="text-[10px] text-slate-400 font-mono">{doc.fileName}</div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                        <span>{doc.downloadsCount} downloads</span>
                        <button className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5">
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 9: AI ASSISTANT (RESIDENT AGENT) */}
            {activeTab === 'ai_assistant' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-800/40 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={currentSpace.aiAssistant.avatarUrl}
                      alt={currentSpace.aiAssistant.assistantName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500 shadow-xl"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-extrabold text-white">{currentSpace.aiAssistant.assistantName}</h3>
                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-[10px] font-bold border border-purple-500/30">
                          GROUNDED IN SPACE SPECS
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 max-w-xl">{currentSpace.aiAssistant.systemPrompt}</p>
                    </div>
                  </div>

                  {/* Language Selector */}
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-purple-400" />
                    <select
                      value={aiLanguage}
                      onChange={e => setAiLanguage(e.target.value)}
                      className="bg-slate-950 border border-purple-800/60 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                    >
                      {(currentSpace?.aiAssistant?.supportedLanguages || ['English', 'Spanish', 'French', 'Yoruba', 'Japanese', 'German', 'Mandarin']).map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* AI Chat Stream */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 h-[420px] overflow-y-auto space-y-4">
                  {aiChatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-purple-600 text-white'
                      }`}>
                        {msg.sender === 'user' ? 'U' : <Bot className="w-4 h-4" />}
                      </div>

                      <div className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : msg.isFlagged
                          ? 'bg-rose-950/60 border border-rose-500/50 text-rose-200 rounded-tl-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}>
                        <p>{msg.text}</p>
                        {msg.citations && msg.citations.length > 0 && (
                          <div className="pt-2 border-t border-slate-800/80 text-[10px] text-purple-300 font-mono">
                            📚 Grounded in: {msg.citations.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="flex items-center gap-3 text-xs text-purple-400">
                      <div className="w-8 h-8 rounded-xl bg-purple-600/30 flex items-center justify-center animate-pulse">
                        <Bot className="w-4 h-4 text-purple-300" />
                      </div>
                      <span>{currentSpace.aiAssistant.assistantName} is indexing space blueprints...</span>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={aiQueryInput}
                    onChange={e => setAiQueryInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendAiQuery()}
                    placeholder={`Ask ${currentSpace.aiAssistant.assistantName} about architecture, rules, tokenomics...`}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={handleSendAiQuery}
                    className="px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>Ask AI</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 10: ANALYTICS */}
            {activeTab === 'analytics' && analytics && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-400" />
                      Community Metrics & Revenue Ledger
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">30-day engagement, retention, MRR and top contributors.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5">
                    <div className="text-xs text-slate-400 font-medium">Total Members</div>
                    <div className="text-xl font-extrabold text-white mt-1">{analytics.totalMembers.toLocaleString()}</div>
                    <div className="text-[10px] text-emerald-400 mt-1 font-bold">+{analytics.memberGrowth30d}% this month</div>
                  </div>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5">
                    <div className="text-xs text-slate-400 font-medium">Daily Active Members</div>
                    <div className="text-xl font-extrabold text-white mt-1">{analytics.activeDailyMembers.toLocaleString()}</div>
                    <div className="text-[10px] text-indigo-400 mt-1 font-bold">Score: {analytics.engagementScore}/100</div>
                  </div>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5">
                    <div className="text-xs text-slate-400 font-medium">Monthly Recurring Rev (MRR)</div>
                    <div className="text-xl font-extrabold text-emerald-400 mt-1">${analytics.mrrUsd.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Retention: {analytics.retentionRatePercent}%</div>
                  </div>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5">
                    <div className="text-xs text-slate-400 font-medium">Discussions Solved</div>
                    <div className="text-xl font-extrabold text-cyan-400 mt-1">{analytics.totalDiscussionsSolved}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{analytics.totalPostsThisMonth} posts logged</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 11: MODERATION & REPORTS */}
            {activeTab === 'moderation' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-rose-400" />
                      Moderation Queue & Safety Governance
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Automated AI toxicity scanning, member restrictions and incident triage.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {reports.map(rep => (
                    <div key={rep.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                            rep.status === 'pending' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                          }`}>
                            {rep.status}
                          </span>
                          <span className="text-xs font-bold text-white">Reason: {rep.reason}</span>
                          <span className="text-[10px] text-rose-400 font-mono font-bold">AI Toxicity Score: {(rep.aiToxicityScore * 100).toFixed(0)}%</span>
                        </div>
                        <p className="text-xs text-slate-300">{rep.notes || 'Reported by community member.'}</p>
                      </div>

                      {rep.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              engine.resolveCommunityReport(rep.id, 'resolved_removed');
                              refreshSpaceData();
                            }}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold"
                          >
                            Remove Content
                          </button>
                          <button
                            onClick={() => {
                              engine.resolveCommunityReport(rep.id, 'resolved_dismissed');
                              refreshSpaceData();
                            }}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
                          >
                            Dismiss
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* NEW DISCUSSION MODAL */}
      {showNewDiscussionModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 max-w-xl w-full space-y-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Start New Forum Discussion</h3>
            <form onSubmit={handleCreateDiscussion} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Topic Title</label>
                <input
                  type="text"
                  value={newDiscussionTitle}
                  onChange={e => setNewDiscussionTitle(e.target.value)}
                  placeholder="e.g. Best practices for WebRTC state sync"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                <select
                  value={newDiscussionCategory}
                  onChange={e => setNewDiscussionCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="System Architecture">System Architecture</option>
                  <option value="Cryptography & Security">Cryptography & Security</option>
                  <option value="Venture & Economics">Venture & Economics</option>
                  <option value="General Q&A">General Q&A</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Content / Question Details</label>
                <textarea
                  rows={4}
                  value={newDiscussionContent}
                  onChange={e => setNewDiscussionContent(e.target.value)}
                  placeholder="Describe your architecture question or proposal in detail..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewDiscussionModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Publish Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
