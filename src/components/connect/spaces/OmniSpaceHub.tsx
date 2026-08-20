import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Globe,
  Lock,
  Building,
  GraduationCap,
  Sparkles,
  Briefcase,
  Heart,
  Calendar,
  FolderDown,
  ShoppingBag,
  Video,
  Shield,
  Search,
  Plus,
  Radio,
  CheckCircle2,
  Bell,
  Send,
  ThumbsUp,
  Share2,
  BookOpen,
  DollarSign,
  HelpCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Layers,
  Flame,
  Star,
  Download,
  Play,
  Award,
  Check,
  ChevronRight,
  AlertTriangle,
  FileText,
  CreditCard,
  MessageCircle,
  Eye,
  Sliders,
  Compass
} from 'lucide-react';
import {
  OmniSpace,
  OmniSpaceModuleKey,
  OmniSpaceType,
  OmniSpaceCategory,
  OmniSpaceMember,
  OmniDiscussionTopic,
  OmniSpaceCourse,
  OmniSpaceStoreItem,
  OmniSpaceDocument,
  OmniSpaceEvent,
  OmniSpaceMediaItem
} from '../../../types/omni_spaces';
import {
  SEED_OMNI_SPACES,
  SEED_SPACE_DISCUSSIONS,
  SEED_SPACE_COURSES,
  SEED_SPACE_STORE_ITEMS,
  SEED_SPACE_DOCUMENTS,
  SEED_SPACE_EVENTS,
  SEED_SPACE_MEMBERS
} from '../../../data/omni_spaces_seed';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  spaces?: OmniSpace[];
  activeProfile: ConnectProfile;
  onOpenCreateSpace?: () => void;
  onNavigateSuperAdmin?: () => void;
  onOpenTestSuite?: () => void;
}

export const OmniSpaceHub: React.FC<Props> = ({
  spaces = SEED_OMNI_SPACES,
  activeProfile,
  onOpenCreateSpace,
  onNavigateSuperAdmin,
  onOpenTestSuite
}) => {
  const [allSpaces, setAllSpaces] = useState<OmniSpace[]>(spaces);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>(spaces[0]?.id || 'space_dev_sovereign');
  const [activeModule, setActiveModule] = useState<OmniSpaceModuleKey>('home');
  const [spaceTypeFilter, setSpaceTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [joinedSpaceIds, setJoinedSpaceIds] = useState<string[]>(['space_dev_sovereign', 'space_grace_ministry']);

  // Feed State
  const [feedPosts, setFeedPosts] = useState<{ id: string; author: string; avatar: string; role: string; content: string; time: string; likes: number; comments: number; isPinned?: boolean; tags: string[] }[]>([
    {
      id: 'fp_1',
      author: 'Gideon Oluwalana',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Owner & Chief Architect',
      content: '🚀 OMNI Spaces v1.0 is now live across all sovereign nodes. Every Space unites Community, Website, Chat, Feed, Courses, Store, Events, Documents, Members, and Gemini AI Assistant under one sovereign umbrella.',
      time: '10 mins ago',
      likes: 142,
      comments: 28,
      isPinned: true,
      tags: ['SovereignOS', 'OmniSpaces', 'Announcement']
    },
    {
      id: 'fp_2',
      author: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'Treasury Admin',
      content: 'Double-entry settlement ledger APIs are now linked with Space Stores. All digital downloads, course passes, and membership subscriptions settle automatically with sub-second ledger immutability.',
      time: '45 mins ago',
      likes: 89,
      comments: 14,
      isPinned: false,
      tags: ['FinanceOS', 'Ledger', 'ISO20022']
    }
  ]);
  const [newPostText, setNewPostText] = useState('');

  // Discussions State
  const [discussions, setDiscussions] = useState<OmniDiscussionTopic[]>(SEED_SPACE_DISCUSSIONS);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');
  const [showTopicModal, setShowTopicModal] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<{ id: string; sender: string; avatar: string; text: string; time: string; isAi?: boolean }[]>([
    { id: 'c1', sender: 'Gideon Oluwalana', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', text: 'Welcome everyone to the Space live chat room! Feel free to ask technical questions or test our AI Copilot.', time: '14:20' },
    { id: 'c2', sender: 'Klaus Reinhardt', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', text: 'Confirmed. Real-time message synchronization is running smoothly across the WebRTC SFU mesh.', time: '14:22' },
    { id: 'c3', sender: 'Sovereign Dev Bot', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80', text: '👋 Greetings Klaus! I am your Space AI Assistant. Let me know if you need code snippets for the OMNI SDK.', time: '14:23', isAi: true }
  ]);
  const [chatInput, setChatInput] = useState('');

  // AI Copilot Interactive State
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [aiConversation, setAiConversation] = useState<{ sender: 'user' | 'assistant'; text: string; time: string }[]>([
    { sender: 'assistant', text: 'Hello! I am the dedicated AI Assistant for this Space. I can answer questions grounded on our documents, summarize chat threads, welcome new members, translate messages into 100+ languages, or check moderation compliance. How may I assist you today?', time: 'Just now' }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Store Checkout Modal State
  const [activePurchaseItem, setActivePurchaseItem] = useState<OmniSpaceStoreItem | null>(null);
  const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState<string | null>(null);

  // Filter Spaces
  const filteredSpaces = allSpaces.filter(space => {
    const matchesType = spaceTypeFilter === 'all' || space.spaceType === spaceTypeFilter;
    const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const activeSpace = allSpaces.find(s => s.id === selectedSpaceId) || allSpaces[0];
  const isJoined = joinedSpaceIds.includes(activeSpace.id);

  const handleJoinToggle = (spaceId: string) => {
    if (joinedSpaceIds.includes(spaceId)) {
      setJoinedSpaceIds(prev => prev.filter(id => id !== spaceId));
    } else {
      setJoinedSpaceIds(prev => [...prev, spaceId]);
    }
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = {
      id: `chat_${Date.now()}`,
      sender: activeProfile.displayName,
      avatar: activeProfile.avatarUrl,
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // If message mentions AI or bot, auto-reply
    if (chatInput.toLowerCase().includes('ai') || chatInput.toLowerCase().includes('bot') || chatInput.toLowerCase().includes('help')) {
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            id: `chat_ai_${Date.now()}`,
            sender: activeSpace.aiAssistantConfig.assistantName,
            avatar: activeSpace.aiAssistantConfig.avatarUrl,
            text: `[Space AI Response]: I noticed your query in ${activeSpace.name}. For comprehensive guidance, please check our Resources tab or consult the official syllabus.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isAi: true
          }
        ]);
      }, 1000);
    }
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newPost = {
      id: `fp_${Date.now()}`,
      author: activeProfile.displayName,
      avatar: activeProfile.avatarUrl,
      role: 'Member',
      content: newPostText.trim(),
      time: 'Just now',
      likes: 0,
      comments: 0,
      tags: ['CommunityPost']
    };
    setFeedPosts(prev => [newPost, ...prev]);
    setNewPostText('');
  };

  const handleCreateDiscussionTopic = () => {
    if (!newTopicTitle.trim() || !newTopicContent.trim()) return;
    const newTopic: OmniDiscussionTopic = {
      id: `disc_${Date.now()}`,
      spaceId: activeSpace.id,
      authorProfileId: activeProfile.id,
      authorName: activeProfile.displayName,
      authorAvatar: activeProfile.avatarUrl,
      authorRole: 'member',
      title: newTopicTitle.trim(),
      content: newTopicContent.trim(),
      category: 'General Discussion',
      tags: ['CommunityQ&A'],
      upvotesCount: 1,
      upvotedBy: [activeProfile.id],
      repliesCount: 0,
      isPinned: false,
      isSolved: false,
      replies: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setDiscussions(prev => [newTopic, ...prev]);
    setNewTopicTitle('');
    setNewTopicContent('');
    setShowTopicModal(false);
  };

  const handleAiAsk = (customText?: string) => {
    const q = customText || aiPromptInput;
    if (!q.trim()) return;

    setAiConversation(prev => [
      ...prev,
      { sender: 'user', text: q, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setAiPromptInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      let reply = `Based on the official ${activeSpace.name} documentation, our sovereign operating system uses cryptographic Merkle leaves for zero-loss ledger audits and WebRTC SFU mesh for ultra-low latency audio/video.`;
      if (q.toLowerCase().includes('welcome')) {
        reply = `${activeSpace.aiAssistantConfig.welcomeMessageTemplate} We are delighted to have you join our sovereign ecosystem!`;
      } else if (q.toLowerCase().includes('summarize')) {
        reply = `Summary of recent discussions in ${activeSpace.name}: 1) Zero-downtime Merkle ledger migrations are confirmed stable; 2) WebRTC SFU Mesh bandwidth allocation optimizations are underway; 3) OMNI Finance Storefront integration has settled over $485,000 in ecosystem transactions.`;
      } else if (q.toLowerCase().includes('translate')) {
        reply = `[OMNI 100+ Multilingual AI Engine]: "Bienvenido a nuestro Espacio soberano. Todos los servicios de pago y chat están completamente operativos." (Translated to Spanish)`;
      }

      setAiConversation(prev => [
        ...prev,
        { sender: 'assistant', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setIsAiThinking(false);
    }, 1200);
  };

  const handleSimulatePurchase = (item: OmniSpaceStoreItem) => {
    setActivePurchaseItem(item);
    setPurchaseSuccessMessage(null);
  };

  const handleConfirmPurchase = () => {
    if (!activePurchaseItem) return;
    setPurchaseSuccessMessage(`Payment of $${activePurchaseItem.priceUsd.toFixed(2)} USD successfully settled via OMNI Finance Multi-Currency Ledger! Merkle Tx ID: tx_ledger_${Date.now().toString(16)}`);
    setTimeout(() => {
      setActivePurchaseItem(null);
      setPurchaseSuccessMessage(null);
    }, 3000);
  };

  const moduleTabs: { key: OmniSpaceModuleKey; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'home', label: 'Home Overview', icon: Globe },
    { key: 'feed', label: 'Feed & Updates', icon: Flame },
    { key: 'discussion', label: 'Discussions & Q&A', icon: HelpCircle },
    { key: 'chat', label: 'Live Chat & Voice', icon: MessageSquare },
    { key: 'members', label: 'Members Directory', icon: Users },
    { key: 'events', label: 'Events & Calendar', icon: Calendar },
    { key: 'resources', label: 'Resources & Vault', icon: FolderDown },
    { key: 'courses', label: 'Courses & LMS', icon: GraduationCap },
    { key: 'store', label: 'Store & Finance', icon: ShoppingBag },
    { key: 'media', label: 'Media Streams', icon: Video },
    { key: 'ai_assistant', label: 'Space AI Copilot', icon: Sparkles }
  ];

  const spaceTypeBadges: Record<OmniSpaceType, { label: string; bg: string; text: string; icon: any }> = {
    public_space: { label: 'Public Space', bg: 'bg-emerald-500/20 border-emerald-500/30', text: 'text-emerald-400', icon: Globe },
    private_space: { label: 'Private Space', bg: 'bg-slate-500/20 border-slate-500/30', text: 'text-slate-300', icon: Lock },
    enterprise_space: { label: 'Enterprise Space', bg: 'bg-blue-500/20 border-blue-500/30', text: 'text-blue-400', icon: Building },
    learning_space: { label: 'Learning Space', bg: 'bg-amber-500/20 border-amber-500/30', text: 'text-amber-400', icon: GraduationCap },
    business_space: { label: 'Business Space', bg: 'bg-purple-500/20 border-purple-500/30', text: 'text-purple-400', icon: Briefcase },
    creator_space: { label: 'Creator Space', bg: 'bg-rose-500/20 border-rose-500/30', text: 'text-rose-400', icon: Sparkles },
    family_space: { label: 'Family Space', bg: 'bg-pink-500/20 border-pink-500/30', text: 'text-pink-400', icon: Heart },
    organisation_space: { label: 'Organisation Space', bg: 'bg-indigo-500/20 border-indigo-500/30', text: 'text-indigo-400', icon: Layers }
  };

  return (
    <div id="omni-space-hub" className="space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                OMNI SPACES PLATFORM
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                STATUS: ACTIVE
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                OMNI FINANCE INTEGRATED
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              Sovereign Communities, Groups, Channels & OMNI Spaces
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Organize seamlessly around Interests, Businesses, Schools, Churches, Families, Brands, Courses, Events, and Professional Networks. Every OMNI Space combines Community, Website, Chat, Feed, Courses, Store, Events, Documents, Members, and Gemini AI Assistant.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenCreateSpace && (
              <button
                onClick={onOpenCreateSpace}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Space</span>
              </button>
            )}
            {onOpenTestSuite && (
              <button
                onClick={onOpenTestSuite}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Spaces Test Suite</span>
              </button>
            )}
            {onNavigateSuperAdmin && (
              <button
                onClick={onNavigateSuperAdmin}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
              >
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>Super Admin</span>
              </button>
            )}
          </div>
        </div>

        {/* Space Type Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-slate-800/80 mt-6 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Space Archetypes:
          </span>
          {[
            { id: 'all', label: 'All Spaces (8)' },
            { id: 'public_space', label: 'Public Space' },
            { id: 'private_space', label: 'Private Space' },
            { id: 'enterprise_space', label: 'Enterprise Space' },
            { id: 'learning_space', label: 'Learning Space' },
            { id: 'business_space', label: 'Business Space' },
            { id: 'creator_space', label: 'Creator Space' },
            { id: 'family_space', label: 'Family Space' },
            { id: 'organisation_space', label: 'Organisation Space' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSpaceTypeFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                spaceTypeFilter === f.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Spaces Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Space Navigation Drawer (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search spaces by name, tags, or topics..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Spaces Card List */}
          <div className="space-y-3 max-h-[780px] overflow-y-auto pr-1">
            {filteredSpaces.map(sp => {
              const isSelected = sp.id === selectedSpaceId;
              const typeMeta = spaceTypeBadges[sp.spaceType];
              const isJoinedThis = joinedSpaceIds.includes(sp.id);

              return (
                <div
                  key={sp.id}
                  onClick={() => setSelectedSpaceId(sp.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/80 shadow-lg shadow-indigo-950/50'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={sp.avatarUrl}
                      alt={sp.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-sm font-bold text-white truncate flex items-center gap-1.5">
                          {sp.name}
                          {sp.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 inline" />}
                        </h4>
                        {isJoinedThis && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            JOINED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{sp.tagline}</p>

                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border flex items-center gap-1 ${typeMeta.bg} ${typeMeta.text}`}>
                          <typeMeta.icon className="w-3 h-3" />
                          {typeMeta.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          👥 {sp.membersCount.toLocaleString()}
                        </span>
                        {sp.membershipType === 'paid_subscription' && (
                          <span className="text-[10px] font-bold text-amber-400">
                            ${sp.membershipPriceUsd}/mo
                          </span>
                        )}
                        {sp.crmConnected && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-500/20 text-blue-300">
                            CRM SYNC
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Space Container (Col 8) */}
        {activeSpace && (
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[780px]">
            {/* Space Hero Banner Header */}
            <div className="relative h-48 bg-slate-950 overflow-hidden">
              <img
                src={activeSpace.bannerUrl}
                alt={activeSpace.name}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

              {/* Banner Top Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${spaceTypeBadges[activeSpace.spaceType].bg} ${spaceTypeBadges[activeSpace.spaceType].text}`}>
                    {spaceTypeBadges[activeSpace.spaceType].label}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/70 border border-slate-700 text-slate-300 backdrop-blur-md">
                    Category: {activeSpace.category.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleJoinToggle(activeSpace.id)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
                      isJoined
                        ? 'bg-emerald-600/90 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {isJoined ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{isJoined ? 'Member (Active)' : 'Join Space'}</span>
                  </button>
                </div>
              </div>

              {/* Banner Bottom Profile Overlay */}
              <div className="absolute bottom-4 left-6 right-6 flex items-end gap-4">
                <img
                  src={activeSpace.avatarUrl}
                  alt={activeSpace.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-xl bg-slate-900"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-extrabold text-white truncate flex items-center gap-2">
                    {activeSpace.name}
                    {activeSpace.isVerified && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                  </h2>
                  <p className="text-xs text-slate-300 truncate">{activeSpace.tagline}</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-right">
                  <div>
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-end">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {activeSpace.onlineCount.toLocaleString()} online
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {activeSpace.membersCount.toLocaleString()} members
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 11-Module Navigation Bar */}
            <div className="border-b border-slate-800 bg-slate-950/70 px-4 flex items-center gap-1 overflow-x-auto scrollbar-none">
              {moduleTabs.map(mod => {
                const isActive = activeModule === mod.key;
                return (
                  <button
                    key={mod.key}
                    onClick={() => setActiveModule(mod.key)}
                    className={`px-3 py-3 text-xs font-bold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-indigo-400 border-indigo-500 bg-indigo-500/10'
                        : 'text-slate-400 border-transparent hover:text-slate-200'
                    }`}
                  >
                    <mod.icon className="w-3.5 h-3.5" />
                    <span>{mod.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Module Sub-Views */}
            <div className="p-6 flex-1 overflow-y-auto">
              {/* 1. HOME MODULE */}
              {activeModule === 'home' && (
                <div className="space-y-6">
                  {/* Space Vision & Quick Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-1">
                      <div className="text-xs font-semibold text-slate-400">Membership Model</div>
                      <div className="text-sm font-bold text-white capitalize flex items-center gap-1.5">
                        {activeSpace.membershipType.replace('_', ' ')}
                        {activeSpace.membershipPriceUsd && (
                          <span className="text-emerald-400 font-extrabold">(${activeSpace.membershipPriceUsd}/mo)</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-1">
                      <div className="text-xs font-semibold text-slate-400">AI Assistant Grounding</div>
                      <div className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        {activeSpace.aiAssistantConfig.assistantName} ({activeSpace.aiAssistantConfig.qaGroundingDocsCount} docs)
                      </div>
                    </div>
                    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-1">
                      <div className="text-xs font-semibold text-slate-400">Owner & Governance</div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        {activeSpace.ownerName}
                      </div>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 space-y-3">
                    <h3 className="text-sm font-bold text-white">About this OMNI Space</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{activeSpace.description}</p>
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      {activeSpace.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-800 text-indigo-300 border border-slate-700">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Community Rules Matrix */}
                  <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 space-y-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Shield className="w-4 h-4 text-amber-400" />
                      Community Rules & Covenant
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {activeSpace.rules.map((rule, idx) => (
                        <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-indigo-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick CTAs to other Modules */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                      onClick={() => setActiveModule('feed')}
                      className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 transition-colors flex flex-col items-center gap-1.5"
                    >
                      <Flame className="w-4 h-4 text-rose-400" />
                      <span>Community Feed</span>
                    </button>
                    <button
                      onClick={() => setActiveModule('chat')}
                      className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 transition-colors flex flex-col items-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4 text-indigo-400" />
                      <span>Live Chat Room</span>
                    </button>
                    <button
                      onClick={() => setActiveModule('courses')}
                      className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 transition-colors flex flex-col items-center gap-1.5"
                    >
                      <GraduationCap className="w-4 h-4 text-amber-400" />
                      <span>Academy Courses</span>
                    </button>
                    <button
                      onClick={() => setActiveModule('ai_assistant')}
                      className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 transition-colors flex flex-col items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Space AI Copilot</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 2. FEED MODULE */}
              {activeModule === 'feed' && (
                <div className="space-y-5">
                  {/* Create Post Input */}
                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={activeProfile.avatarUrl}
                        alt={activeProfile.displayName}
                        className="w-9 h-9 rounded-xl object-cover"
                      />
                      <input
                        type="text"
                        value={newPostText}
                        onChange={e => setNewPostText(e.target.value)}
                        placeholder={`Share an update or announcement in ${activeSpace.name}...`}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        onKeyDown={e => e.key === 'Enter' && handleCreatePost()}
                      />
                      <button
                        onClick={handleCreatePost}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post</span>
                      </button>
                    </div>
                  </div>

                  {/* Feed Stream */}
                  <div className="space-y-4">
                    {feedPosts.map(post => (
                      <div key={post.id} className="bg-slate-950/50 border border-slate-800 rounded-2xl p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-xl object-cover" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">{post.author}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                                  {post.role}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-500">{post.time}</span>
                            </div>
                          </div>
                          {post.isPinned && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              📌 PINNED
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-200 leading-relaxed">{post.content}</p>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {post.tags.map(t => (
                            <span key={t} className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                              #{t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                          <button
                            onClick={() => {
                              setFeedPosts(prev => prev.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p));
                            }}
                            className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors">
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{post.comments} comments</span>
                          </button>
                          <button className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors ml-auto">
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. DISCUSSION MODULE */}
              {activeModule === 'discussion' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Structured Q&A & Technical Forums</h3>
                      <p className="text-xs text-slate-400">Ask questions, share research, and upvote accepted solutions.</p>
                    </div>
                    <button
                      onClick={() => setShowTopicModal(true)}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Discussion</span>
                    </button>
                  </div>

                  {showTopicModal && (
                    <div className="bg-slate-950 border border-indigo-500/50 rounded-2xl p-4 space-y-3">
                      <h4 className="text-xs font-bold text-white">Create New Discussion Topic</h4>
                      <input
                        type="text"
                        value={newTopicTitle}
                        onChange={e => setNewTopicTitle(e.target.value)}
                        placeholder="Topic Title (e.g. How to shard double-entry ledger partitions?)"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                      <textarea
                        value={newTopicContent}
                        onChange={e => setNewTopicContent(e.target.value)}
                        placeholder="Provide details, code snippets, or background..."
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setShowTopicModal(false)}
                          className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleCreateDiscussionTopic}
                          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
                        >
                          Publish Topic
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {discussions.map(disc => (
                      <div key={disc.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <img src={disc.authorAvatar} alt={disc.authorName} className="w-9 h-9 rounded-xl object-cover" />
                            <div>
                              <h4 className="text-sm font-bold text-white hover:text-indigo-400 cursor-pointer">{disc.title}</h4>
                              <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{disc.content}</p>
                              <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                                <span>By {disc.authorName}</span>
                                <span>•</span>
                                <span className="text-indigo-400 font-semibold">{disc.category}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center p-2 bg-slate-900 border border-slate-800 rounded-xl min-w-[54px]">
                            <button
                              onClick={() => {
                                setDiscussions(prev => prev.map(d => d.id === disc.id ? { ...d, upvotesCount: d.upvotesCount + 1 } : d));
                              }}
                              className="text-xs font-bold text-indigo-400 hover:scale-110 transition-transform"
                            >
                              ▲
                            </button>
                            <span className="text-xs font-bold text-white">{disc.upvotesCount}</span>
                          </div>
                        </div>

                        {disc.isSolved && disc.replies[0] && (
                          <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-1">
                            <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Accepted Solution by {disc.replies[0].authorName}
                            </div>
                            <p className="text-xs text-slate-300">{disc.replies[0].content}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. CHAT MODULE */}
              {activeModule === 'chat' && (
                <div className="h-[520px] flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                  {/* Chat Header */}
                  <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold text-white"># general-chat</span>
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        WebRTC SFU Connected
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">{activeSpace.onlineCount} online</span>
                  </div>

                  {/* Messages Feed */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className={`flex items-start gap-3 ${msg.isAi ? 'bg-indigo-950/30 p-2.5 rounded-xl border border-indigo-500/30' : ''}`}>
                        <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{msg.sender}</span>
                            {msg.isAi && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-500 text-white">
                                AI COPILOT
                              </span>
                            )}
                            <span className="text-[10px] text-slate-500">{msg.time}</span>
                          </div>
                          <p className="text-xs text-slate-200 mt-0.5">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      placeholder={`Send a message in #${activeSpace.name} (type 'ai' for Space Bot)...`}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                    />
                    <button
                      onClick={handleSendChat}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 5. MEMBERS DIRECTORY */}
              {activeModule === 'members' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Space Member Roster & Role Clearance</h3>
                    <span className="text-xs text-slate-400">Total: {SEED_SPACE_MEMBERS.length} active verified members</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {SEED_SPACE_MEMBERS.map(member => (
                      <div key={member.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img src={member.avatarUrl} alt={member.displayName} className="w-10 h-10 rounded-xl object-cover" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white">{member.displayName}</span>
                              <span className="text-[10px] text-slate-400">{member.handle}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-1 mt-1">
                              <span className="px-2 py-0.2 rounded text-[9px] font-bold bg-indigo-500/20 text-indigo-300 capitalize">
                                {member.role}
                              </span>
                              {member.badges.map(b => (
                                <span key={b} className="px-1.5 py-0.2 rounded text-[9px] bg-slate-800 text-slate-300">
                                  {b}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-emerald-400">
                          ⭐ {member.reputationPoints} pts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. EVENTS MODULE */}
              {activeModule === 'events' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Upcoming Space Events, Live Streams & Services</h3>
                      <p className="text-xs text-slate-400">Join real-time broadcasts or RSVP for hybrid gatherings.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SEED_SPACE_EVENTS.map(ev => (
                      <div key={ev.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden shadow-lg space-y-3">
                        <div className="h-32 bg-slate-900 relative">
                          <img src={ev.bannerUrl} alt={ev.title} className="w-full h-full object-cover opacity-70" />
                          {ev.isLiveNow && (
                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-600 text-white animate-pulse flex items-center gap-1">
                              <Radio className="w-3 h-3" />
                              LIVE NOW
                            </span>
                          )}
                          <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-md">
                            👥 {ev.rsvpCount} RSVPs
                          </span>
                        </div>
                        <div className="p-4 space-y-2">
                          <h4 className="text-sm font-bold text-white">{ev.title}</h4>
                          <p className="text-xs text-slate-400 line-clamp-2">{ev.description}</p>
                          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                            <span className="text-indigo-400 font-semibold">📅 {new Date(ev.startDateTime).toLocaleDateString()}</span>
                            <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold">
                              {ev.isLiveNow ? 'Join Broadcast' : 'RSVP Free'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. RESOURCES & VAULT */}
              {activeModule === 'resources' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Sovereign Document Vault & Resources</h3>
                      <p className="text-xs text-slate-400">Cryptographically verifiable PDFs, slides, and syllabus files.</p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {SEED_SPACE_DOCUMENTS.map(doc => (
                      <div key={doc.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-black text-xs">
                            {doc.fileType.toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{doc.title}</h4>
                            <p className="text-[11px] text-slate-400">{doc.description}</p>
                            <span className="text-[10px] text-slate-500">{(doc.fileSizeBytes / (1024 * 1024)).toFixed(2)} MB • {doc.downloadCount} downloads</span>
                          </div>
                        </div>
                        <button
                          onClick={() => alert(`Downloading verified sovereign resource: ${doc.title}`)}
                          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. COURSES & LMS */}
              {activeModule === 'courses' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Space Academy & Learning Curriculum</h3>
                      <p className="text-xs text-slate-400">Interactive modules, quizzes, and verified certification exams.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SEED_SPACE_COURSES.map(course => (
                      <div key={course.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden shadow-lg space-y-3">
                        <div className="h-32 bg-slate-900 relative">
                          <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover opacity-75" />
                          <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white">
                            {course.isFree ? 'FREE ACCESS' : `$${course.priceUsd}`}
                          </span>
                        </div>
                        <div className="p-4 space-y-2.5">
                          <h4 className="text-sm font-bold text-white">{course.title}</h4>
                          <p className="text-xs text-slate-400 line-clamp-2">{course.description}</p>
                          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                            <span>👨‍🏫 {course.instructorName}</span>
                            <span className="text-emerald-400 font-semibold">⭐ {course.rating} ({course.enrollmentCount} students)</span>
                          </div>
                          <div className="space-y-1.5 pt-1">
                            {course.curriculumModules.map((m, idx) => (
                              <div key={m.id} className="text-[11px] text-slate-300 flex items-center justify-between bg-slate-900/60 px-2.5 py-1 rounded-lg">
                                <span className="truncate">{idx + 1}. {m.title}</span>
                                <span className="text-slate-500 whitespace-nowrap">{m.durationMinutes}m</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 9. STORE & FINANCE */}
              {activeModule === 'store' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">OMNI Finance Integrated Storefront</h3>
                      <p className="text-xs text-slate-400">Merch, digital stems, certification passes, and donation pledges.</p>
                    </div>
                  </div>

                  {purchaseSuccessMessage && (
                    <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{purchaseSuccessMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SEED_SPACE_STORE_ITEMS.map(item => (
                      <div key={item.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex gap-4">
                        <img src={item.imageUrl} alt={item.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                        <div className="flex-1 space-y-1.5 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-sm font-black text-emerald-400">
                              ${item.priceUsd.toFixed(2)} {item.currency}
                            </span>
                            <button
                              onClick={() => handleSimulatePurchase(item)}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>Buy Now</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Purchase Confirmation Modal */}
                  {activePurchaseItem && (
                    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                        <h3 className="text-base font-bold text-white">Confirm OMNI Finance Checkout</h3>
                        <p className="text-xs text-slate-300">
                          You are purchasing <strong className="text-white">{activePurchaseItem.name}</strong> from <strong className="text-indigo-400">{activeSpace.name}</strong>.
                        </p>
                        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Item Price:</span>
                            <span className="text-white font-bold">${activePurchaseItem.priceUsd.toFixed(2)} USD</span>
                          </div>
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Network Fee (2.5%):</span>
                            <span className="text-white font-bold">${(activePurchaseItem.priceUsd * 0.025).toFixed(2)} USD</span>
                          </div>
                          <div className="flex justify-between text-xs text-emerald-400 border-t border-slate-800 pt-2 font-bold">
                            <span>Total Settlement:</span>
                            <span>${(activePurchaseItem.priceUsd * 1.025).toFixed(2)} USD</span>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                          <button
                            onClick={() => setActivePurchaseItem(null)}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleConfirmPurchase}
                            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
                          >
                            Confirm & Settle via Ledger
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 10. MEDIA STREAMS */}
              {activeModule === 'media' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white">Live Broadcast Archives & Media Streams</h3>
                      <p className="text-xs text-slate-400">High-definition audio/video CDN streams.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden space-y-3">
                      <div className="h-40 bg-slate-900 relative group flex items-center justify-center">
                        <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80" alt="Video" className="w-full h-full object-cover opacity-70" />
                        <button className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5" />
                        </button>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="text-xs font-bold text-white">Official Space Keynote & Architecture Walkthrough</h4>
                        <p className="text-[11px] text-slate-400">Duration: 42:15 • 18,400 views</p>
                      </div>
                    </div>

                    <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden space-y-3">
                      <div className="h-40 bg-slate-900 relative group flex items-center justify-center">
                        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80" alt="Video" className="w-full h-full object-cover opacity-70" />
                        <button className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5" />
                        </button>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="text-xs font-bold text-white">Live Engineering AMA: WASM & High-Throughput Memory Rings</h4>
                        <p className="text-[11px] text-slate-400">Duration: 1:12:00 • 34,200 views</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 11. SPACE AI COPILOT */}
              {activeModule === 'ai_assistant' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/40 rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={activeSpace.aiAssistantConfig.avatarUrl}
                        alt={activeSpace.aiAssistantConfig.assistantName}
                        className="w-12 h-12 rounded-2xl object-cover border border-indigo-500/50"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{activeSpace.aiAssistantConfig.assistantName}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500 text-white">
                            GEMINI 2.5 NATIVE
                          </span>
                        </div>
                        <p className="text-xs text-indigo-300">
                          {activeSpace.aiAssistantConfig.personalityPrompt}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-slate-400">
                      <div>Grounding: <strong>{activeSpace.aiAssistantConfig.qaGroundingDocsCount} verified docs</strong></div>
                      <div>Languages: <strong>{activeSpace.aiAssistantConfig.supportedLanguages.length}+ supported</strong></div>
                    </div>
                  </div>

                  {/* AI Quick Prompts */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleAiAsk("Generate official onboarding welcome guidance for a new member")}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-medium"
                    >
                      👋 Generate Welcome Message
                    </button>
                    <button
                      onClick={() => handleAiAsk("Summarize the top discussion threads and decisions made this week")}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-medium"
                    >
                      📝 Summarize Discussions
                    </button>
                    <button
                      onClick={() => handleAiAsk("Translate Space guidelines into Spanish and French")}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-medium"
                    >
                      🌐 Translate Guidelines
                    </button>
                  </div>

                  {/* AI Chat Window */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 h-80 overflow-y-auto space-y-3">
                    {aiConversation.map((c, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 text-xs ${
                          c.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {c.sender === 'assistant' && (
                          <img
                            src={activeSpace.aiAssistantConfig.avatarUrl}
                            alt="AI"
                            className="w-7 h-7 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div
                          className={`max-w-xl p-3 rounded-2xl ${
                            c.sender === 'user'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-900 text-slate-200 border border-slate-800'
                          }`}
                        >
                          <p className="leading-relaxed">{c.text}</p>
                          <span className="text-[9px] opacity-70 block mt-1 text-right">{c.time}</span>
                        </div>
                      </div>
                    ))}
                    {isAiThinking && (
                      <div className="flex items-center gap-2 text-xs text-indigo-400">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>AI Assistant is analyzing space knowledge base...</span>
                      </div>
                    )}
                  </div>

                  {/* AI Input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={aiPromptInput}
                      onChange={e => setAiPromptInput(e.target.value)}
                      placeholder={`Ask ${activeSpace.aiAssistantConfig.assistantName} any question about ${activeSpace.name}...`}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      onKeyDown={e => e.key === 'Enter' && handleAiAsk()}
                    />
                    <button
                      onClick={() => handleAiAsk()}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ask AI</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
