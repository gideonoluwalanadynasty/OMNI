import React, { useState } from 'react';
import {
  MessageSquare,
  Users,
  Briefcase,
  Compass,
  ShoppingBag,
  Sparkles,
  Calendar,
  Sliders,
  Shield,
  Home,
  CheckCircle2,
  Building,
  GraduationCap,
  Globe,
  Radio,
  FileText,
  UserCheck,
  CreditCard,
  Search,
  Bell,
  Lock,
  ChevronRight,
  ChevronDown,
  Check,
  TrendingUp,
  Video,
  Layers,
  ShieldCheck,
  Terminal,
  Network,
  UserPlus,
  Flame,
  ShieldAlert,
  HardDrive
} from 'lucide-react';
import {
  ConnectDashboardMode,
  ConnectNavigationTab,
  ConnectModuleId
} from '../../types/omni_connect';
import {
  SEED_CONNECT_MODULES,
  SEED_CONNECT_PROFILES,
  SEED_CONNECT_POSTS,
  SEED_CONNECT_CONVERSATIONS,
  SEED_CONNECT_MESSAGES,
  SEED_CONNECT_COMMUNITIES,
  SEED_CONNECT_EVENTS,
  SEED_CONNECT_CONTACTS,
  SEED_CONNECT_DEALS,
  SEED_COMMERCE_PRODUCTS,
  SEED_CREATOR_STATS,
  SEED_MEETING_ROOM,
  SEED_CONNECT_AUDIT_LOGS
} from '../../data/omni_connect_seed';
import { OmniConnectEngine } from '../../engine/omni_connect_engine';
import { OmniConnectFeatureControlCenter } from './OmniConnectFeatureControlCenter';
import { OmniConnectMessagingView } from './OmniConnectMessagingView';
import { OmniConnectFeedView } from './OmniConnectFeedView';
import { OmniMomentsView } from './OmniMomentsView';
import { OmniModerationCenterView } from './OmniModerationCenterView';
import { OmniSocialTestSuite } from './OmniSocialTestSuite';
import { OmniCreatorStudioView } from './OmniCreatorStudioView';
import { OmniConnectCommunityView } from './OmniConnectCommunityView';
import { OmniConnectCrmView } from './OmniConnectCrmView';
import { OmniConnectMeetingView } from './OmniConnectMeetingView';
import { OmniConnectCreatorView } from './OmniConnectCreatorView';
import { OmniConnectMarketplaceView } from './OmniConnectMarketplaceView';
import { OmniIdentityHub } from './OmniIdentityHub';
import { OmniPageBuilder } from './OmniPageBuilder';
import { OmniCustomDomainManager } from './OmniCustomDomainManager';
import { OmniVerificationCenter } from './OmniVerificationCenter';
import { OmniIdentityTestSuite } from './OmniIdentityTestSuite';
import { OmniRelationshipGraphView } from './relationships/OmniRelationshipGraphView';
import { OmniContactsManager } from './relationships/OmniContactsManager';
import { OmniCirclesManager } from './relationships/OmniCirclesManager';
import { OmniRelationshipTestSuite } from './relationships/OmniRelationshipTestSuite';
import { OmniCallingModal } from './media/OmniCallingModal';
import { OmniMeetingsDashboard } from './media/OmniMeetingsDashboard';
import { OmniWebinarHub } from './media/OmniWebinarHub';
import { OmniClassroomView } from './media/OmniClassroomView';
import { OmniRecordingsVault } from './media/OmniRecordingsVault';
import { OmniMediaAdminModal } from './media/OmniMediaAdminModal';
import { OmniMediaTestSuiteModal } from './media/OmniMediaTestSuiteModal';
import { OmniSpacesHub } from './spaces/OmniSpacesHub';
import { OmniGroupsManager } from './spaces/OmniGroupsManager';
import { OmniChannelsBroadcastView } from './spaces/OmniChannelsBroadcastView';
import { OmniSpacesTestSuite } from './spaces/OmniSpacesTestSuite';
import { OmniCreateSpaceModal } from './spaces/OmniCreateSpaceModal';

export const OmniConnectRoot: React.FC = () => {
  // Initialize Engine
  const [engine] = useState(() => new OmniConnectEngine(
    SEED_CONNECT_MODULES,
    SEED_CONNECT_PROFILES,
    SEED_CONNECT_POSTS,
    SEED_CONNECT_CONVERSATIONS,
    SEED_CONNECT_MESSAGES,
    SEED_CONNECT_COMMUNITIES,
    SEED_CONNECT_EVENTS,
    SEED_CONNECT_CONTACTS,
    SEED_CONNECT_DEALS,
    SEED_COMMERCE_PRODUCTS,
    SEED_CONNECT_AUDIT_LOGS
  ));

  // State
  const [dashboardMode, setDashboardMode] = useState<ConnectDashboardMode>('personal');
  const [activeTab, setActiveTab] = useState<ConnectNavigationTab>('home');
  const [activeProfileId, setActiveProfileId] = useState<string>('prof_usr_001');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [modules, setModules] = useState(() => engine.getModules());
  const [posts, setPosts] = useState(() => engine.getFeed('all'));
  const [activeMeetingRoom, setActiveMeetingRoom] = useState<typeof SEED_MEETING_ROOM | null>(null);
  const [creatorStats] = useState(SEED_CREATOR_STATS);
  const [deals, setDeals] = useState(() => engine.getCrmDeals());
  const [contacts] = useState(() => engine.getCrmContacts());
  const [products, setProducts] = useState(() => engine.getProducts());
  const [auditLogs, setAuditLogs] = useState(() => engine.getAuditLogs());

  // Universal Identity System State
  const [universalProfiles, setUniversalProfiles] = useState(() => engine.getAllUniversalProfiles());
  const [domains, setDomains] = useState(() => engine.getCustomDomains());
  const [verificationApps, setVerificationApps] = useState(() => engine.getVerificationApplications());
  const [pageConfigs, setPageConfigs] = useState(() => engine.getAllPageConfigs());

  // Relationship Intelligence Graph State
  const [graphNodes, setGraphNodes] = useState(() => engine.getGraphNodes());
  const [graphEdges, setGraphEdges] = useState(() => engine.getGraphEdges());
  const [universalContacts, setUniversalContacts] = useState(() => engine.getUniversalContacts());
  const [circles, setCircles] = useState(() => engine.getCircles());
  const [recommendations, setRecommendations] = useState(() => engine.getAiRelationshipRecommendations());
  const [followUps, setFollowUps] = useState(() => engine.getAiFollowUpSignals());
  const [opportunities, setOpportunities] = useState(() => engine.getAiOpportunitySignals());
  const [engagementPatterns, setEngagementPatterns] = useState(() => engine.getAiEngagementPatterns());

  // Social Content Engine State (Prompt 4)
  const [socialPosts, setSocialPosts] = useState(() => engine.getSocialPosts(activeProfileId));
  const [moments, setMoments] = useState(() => engine.getMoments());
  const [statusTray, setStatusTray] = useState(() => engine.getStatusTray(activeProfileId));
  const [algoConfig, setAlgoConfig] = useState(() => engine.getFeedAlgorithmConfig());
  const [moderationReports, setModerationReports] = useState(() => engine.getModerationReports());
  const [creatorAnalytics, setCreatorAnalytics] = useState(() => engine.getCreatorAnalytics(activeProfileId));
  const [cloudQuota, setCloudQuota] = useState(() => engine.getCloudStorageQuota(activeProfileId));
  const [mediaFiles, setMediaFiles] = useState(() => engine.getCloudMediaFiles(activeProfileId));

  // Voice, Video, Meetings & Media State
  const [activeCallState, setActiveCallState] = useState<{
    isOpen: boolean;
    callType: 'one_to_one_voice' | 'one_to_one_video' | 'group_voice' | 'group_video';
    targetId: string;
    title: string;
  } | null>(null);
  const [showMediaAdminModal, setShowMediaAdminModal] = useState(false);
  const [showMediaTestSuiteModal, setShowMediaTestSuiteModal] = useState(false);
  const [showCreateSpaceModal, setShowCreateSpaceModal] = useState(false);
  const [showSpacesTestSuiteModal, setShowSpacesTestSuiteModal] = useState(false);

  const activeProfile = engine.getProfile(activeProfileId) || SEED_CONNECT_PROFILES[0];
  const activeUniversalProfile = engine.getUniversalProfile(activeProfileId) || universalProfiles[0];
  const activePageConfig = engine.getPageConfig(activeProfileId) || pageConfigs[0];
  const privacySettings = engine.getPrivacySettings(activeProfileId);

  // Refresh Social State
  const refreshSocialState = () => {
    setSocialPosts(engine.getSocialPosts(activeProfileId));
    setMoments(engine.getMoments());
    setStatusTray(engine.getStatusTray(activeProfileId));
    setAlgoConfig(engine.getFeedAlgorithmConfig());
    setModerationReports(engine.getModerationReports());
    setCreatorAnalytics(engine.getCreatorAnalytics(activeProfileId));
    setCloudQuota(engine.getCloudStorageQuota(activeProfileId));
    setMediaFiles(engine.getCloudMediaFiles(activeProfileId));
    setAuditLogs(engine.getAuditLogs());
  };

  // Refresh Relationship State
  const refreshRelationshipState = () => {
    setGraphNodes(engine.getGraphNodes());
    setGraphEdges(engine.getGraphEdges());
    setUniversalContacts(engine.getUniversalContacts());
    setCircles(engine.getCircles());
    setRecommendations(engine.getAiRelationshipRecommendations());
    setFollowUps(engine.getAiFollowUpSignals());
    setOpportunities(engine.getAiOpportunitySignals());
    setEngagementPatterns(engine.getAiEngagementPatterns());
    setAuditLogs(engine.getAuditLogs());
  };

  // Relationship Graph Handlers
  const handleAddRelationship = (edge: any) => {
    engine.addRelationship(edge);
    refreshRelationshipState();
  };

  const handleAddUniversalContact = (contact: any) => {
    engine.addUniversalContact(contact);
    refreshRelationshipState();
  };

  const handleUpdateUniversalContact = (contactId: string, updates: any) => {
    engine.updateUniversalContact(contactId, updates);
    refreshRelationshipState();
  };

  const handleDeleteUniversalContact = (contactId: string) => {
    engine.deleteUniversalContact(contactId);
    refreshRelationshipState();
  };

  const handleImportContacts = (rawContacts: any[], source: any) => {
    const res = engine.importUniversalContacts(rawContacts, source);
    refreshRelationshipState();
    return res;
  };

  const handleConvertLifecycle = (contactId: string, newStage: any) => {
    const deal = engine.convertContactLifecycle(contactId, newStage);
    setDeals(engine.getCrmDeals());
    refreshRelationshipState();
    return deal;
  };

  const handleLogInteraction = (contactId: string, interaction: any) => {
    engine.logContactInteraction(contactId, interaction);
    refreshRelationshipState();
  };

  const handleCreateCircle = (circle: any) => {
    engine.createCircle(circle);
    refreshRelationshipState();
  };

  const handleUpdateCircle = (circleId: string, updates: any) => {
    engine.updateCircle(circleId, updates);
    refreshRelationshipState();
  };

  const handleDeleteCircle = (circleId: string) => {
    engine.deleteCircle(circleId);
    refreshRelationshipState();
  };

  const handleAddContactToCircle = (circleId: string, contactId: string) => {
    engine.addContactToCircle(circleId, contactId);
    refreshRelationshipState();
  };

  const handleRemoveContactFromCircle = (circleId: string, contactId: string) => {
    engine.removeContactFromCircle(circleId, contactId);
    refreshRelationshipState();
  };

  // Identity Handlers
  const handleChangeUsername = (profileId: string, newUsername: string) => {
    engine.changeUsername(profileId, newUsername);
    setUniversalProfiles(engine.getAllUniversalProfiles());
    setAuditLogs(engine.getAuditLogs());
  };

  const handleUpdateUniversalProfile = (profileId: string, updates: any) => {
    engine.updateUniversalProfile(profileId, updates);
    setUniversalProfiles(engine.getAllUniversalProfiles());
    setAuditLogs(engine.getAuditLogs());
  };

  const handleUpdatePrivacy = (profileId: string, settings: any) => {
    engine.updatePrivacySettings(profileId, settings);
    setAuditLogs(engine.getAuditLogs());
  };

  const handleUpdatePageConfig = (pageId: string, updates: any) => {
    engine.updatePageConfig(pageId, updates);
    setPageConfigs(engine.getAllPageConfigs());
    setAuditLogs(engine.getAuditLogs());
  };

  const handlePublishPage = (pageId: string, isPublished: boolean) => {
    engine.publishOmniPage(pageId, isPublished);
    setPageConfigs(engine.getAllPageConfigs());
    setAuditLogs(engine.getAuditLogs());
  };

  const handleAddDomain = (profileId: string, domain: string) => {
    const res = engine.addCustomDomain(profileId, domain);
    setDomains(engine.getCustomDomains());
    setAuditLogs(engine.getAuditLogs());
    return res;
  };

  const handleVerifyDomain = (domainId: string) => {
    const res = engine.verifyCustomDomainDns(domainId);
    setDomains(engine.getCustomDomains());
    setAuditLogs(engine.getAuditLogs());
    return res;
  };

  const handleSubmitVerification = (data: any) => {
    engine.submitVerificationApplication(data);
    setVerificationApps(engine.getVerificationApplications());
    setAuditLogs(engine.getAuditLogs());
  };

  const handleReviewVerification = (appId: string, decision: any, notes: string, badge?: any) => {
    engine.reviewVerificationApplication(appId, decision, notes, badge);
    setVerificationApps(engine.getVerificationApplications());
    setUniversalProfiles(engine.getAllUniversalProfiles());
    setAuditLogs(engine.getAuditLogs());
  };

  // Handlers
  const handleToggleModule = (id: ConnectModuleId, status: 'ACTIVE' | 'INACTIVE' | 'RESTRICTED') => {
    engine.toggleModuleStatus(id, status);
    setModules(engine.getModules());
    setAuditLogs(engine.getAuditLogs());
  };

  const handleUpdateConfig = (id: ConnectModuleId, updates: any) => {
    engine.updateModuleConfig(id, updates);
    setModules(engine.getModules());
    setAuditLogs(engine.getAuditLogs());
  };

  const handleCreatePost = (newPost: any) => {
    const post = engine.createPost(newPost);
    setPosts(engine.getFeed('all'));
    setAuditLogs(engine.getAuditLogs());
  };

  const handleReact = (postId: string, reaction: any) => {
    engine.reactToPost(postId, reaction);
    setPosts(engine.getFeed('all'));
  };

  const handleSendMessage = (conversationId: string, content: string, kind?: any, voiceSec?: number, payRequest?: any) => {
    engine.sendMessage(
      conversationId,
      activeProfile.id,
      activeProfile.displayName,
      activeProfile.avatarUrl,
      content,
      kind,
      voiceSec,
      payRequest
    );
    setAuditLogs(engine.getAuditLogs());
  };

  const handlePurchaseProduct = (productId: string) => {
    engine.purchaseProduct(productId, activeProfile.id);
    setProducts(engine.getProducts());
    setAuditLogs(engine.getAuditLogs());
  };

  const handleUpdateDealStage = (dealId: string, stage: any) => {
    engine.updateDealStage(dealId, stage);
    setDeals(engine.getCrmDeals());
    setAuditLogs(engine.getAuditLogs());
  };

  // Social Content Engine Handlers (Prompt 4)
  const handleCreateSocialPost = (newPostData: any) => {
    engine.createSocialPost({
      ...newPostData,
      authorProfileId: activeProfile.id,
      authorHandle: `@${activeProfile.username}`,
      authorName: activeProfile.displayName,
      authorAvatar: activeProfile.avatarUrl,
      authorBadge: activeProfile.verificationBadge
    });
    refreshSocialState();
  };

  const handleReactSocialPost = (postId: string, reaction: any) => {
    engine.reactToSocialPost(postId, reaction, activeProfile.id);
    refreshSocialState();
  };

  const handleAddSocialComment = (postId: string, commentText: string) => {
    engine.addSocialComment(
      postId,
      activeProfile.id,
      activeProfile.displayName,
      `@${activeProfile.username}`,
      activeProfile.avatarUrl,
      commentText
    );
    refreshSocialState();
  };

  const handleShareSocialPost = (postId: string) => {
    engine.shareSocialPost(postId, activeProfile.id);
    refreshSocialState();
  };

  const handleSaveSocialPost = (postId: string) => {
    engine.saveSocialPost(postId, activeProfile.id);
    refreshSocialState();
  };

  const handleVotePoll = (postId: string, optionId: string) => {
    engine.votePoll(postId, optionId, activeProfile.id);
    refreshSocialState();
  };

  const handleRsvpEvent = (postId: string) => {
    engine.rsvpEvent(postId, activeProfile.id);
    refreshSocialState();
  };

  const handleCreateMoment = (momentData: any) => {
    engine.createMoment(momentData);
    refreshSocialState();
  };

  const handleLikeMoment = (momentId: string) => {
    engine.likeMoment(momentId, activeProfile.id);
    refreshSocialState();
  };

  const handleSaveMoment = (momentId: string) => {
    engine.saveMoment(momentId, activeProfile.id);
    refreshSocialState();
  };

  const handleCreateStatusItem = (statusData: any) => {
    engine.createStatusItem(statusData);
    refreshSocialState();
  };

  const handleViewStatusItem = (statusId: string) => {
    engine.viewStatusItem(statusId, activeProfile.id);
    refreshSocialState();
  };

  const handleReactStatusItem = (statusId: string, emoji: string) => {
    engine.reactStatusItem(statusId, activeProfile.id, emoji);
    refreshSocialState();
  };

  const handleUpdateAlgoConfig = (updates: any) => {
    engine.updateFeedAlgorithmConfig(updates);
    refreshSocialState();
  };

  const handleMuteTopic = (topic: string) => {
    engine.muteTopic(topic);
    refreshSocialState();
  };

  const handleUnmuteTopic = (topic: string) => {
    engine.unmuteTopic(topic);
    refreshSocialState();
  };

  const handleMuteUser = (handle: string) => {
    engine.muteUser(handle);
    refreshSocialState();
  };

  const handleUnmuteUser = (handle: string) => {
    engine.unmuteUser(handle);
    refreshSocialState();
  };

  const handleReviewModerationReport = (reportId: string, decision: any, notes: string) => {
    engine.reviewModerationReport(reportId, decision, notes);
    refreshSocialState();
  };

  const handleScanContent = (text: string, mediaUrls?: string[]) => {
    return engine.scanContentSafety(text, mediaUrls);
  };

  const handleUploadCloudMedia = (file: any) => {
    engine.uploadCloudMedia(activeProfile.id, file);
    refreshSocialState();
  };

  const handleDeleteCloudMedia = (fileId: string) => {
    engine.deleteCloudMedia(fileId, activeProfile.id);
    refreshSocialState();
  };

  const aiTools = {
    generateCaption: (prompt: string, tone: string) => engine.aiGenerateCaption(prompt, tone),
    improveWriting: (text: string, tone: any) => engine.aiImproveWriting(text, tone),
    generateHashtags: (text: string) => engine.aiGenerateHashtags(text),
    translateText: (text: string, lang: string) => engine.aiTranslateText(text, lang),
    generateVisualConcept: (desc: string) => engine.aiGenerateVisualConcept(desc)
  };

  const navItems: { tab: ConnectNavigationTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { tab: 'home', label: 'Home Overview', icon: Home },
    { tab: 'feed', label: 'Social Feed & Status', icon: Globe, badge: 'Live' },
    { tab: 'moments', label: 'Moments Reels', icon: Flame, badge: 'Viral' },
    { tab: 'creator_studio', label: 'Creator Studio & CDN', icon: Sparkles, badge: 'Monetize' },
    { tab: 'moderation_center', label: 'Content Safety & AI', icon: ShieldAlert, badge: 'Automated' },
    { tab: 'social_test_suite', label: 'Social Test Suite', icon: Terminal, badge: '6 Tests' },
    { tab: 'identity_profiles', label: 'Digital Identity Hub', icon: UserCheck, badge: 'Passport' },
    { tab: 'relationship_graph', label: 'Relationship Graph', icon: Network, badge: 'Neural AI' },
    { tab: 'contacts', label: 'Universal Contacts', icon: Users, badge: 'CRM' },
    { tab: 'circles', label: 'Sovereign Circles', icon: Layers, badge: 'Privacy' },
    { tab: 'page_builder', label: 'Omni Page Builder', icon: Layers, badge: '9 Templates' },
    { tab: 'custom_domains', label: 'Custom Domains & DNS', icon: Globe },
    { tab: 'verification_center', label: 'Verification & Badging', icon: ShieldCheck, badge: 'Trust' },
    { tab: 'relationship_test_suite', label: 'Relationship Test Suite', icon: Terminal, badge: '5 Tests' },
    { tab: 'identity_test_suite', label: 'Identity Test Suite', icon: Terminal, badge: '5 Tests' },
    { tab: 'messages', label: 'Messages & Voice', icon: MessageSquare, badge: '3' },
    { tab: 'meetings', label: 'HD Video Meetings', icon: Video, badge: 'SFU Active' },
    { tab: 'webinars', label: 'Webinars & Townhalls', icon: Radio, badge: '10k Live' },
    { tab: 'classroom', label: 'Virtual Classrooms', icon: GraduationCap, badge: 'Learn' },
    { tab: 'recordings', label: 'Cloud Recordings', icon: HardDrive, badge: 'SHA-256' },
    { tab: 'media_test_suite', label: 'Media Test Suite', icon: Terminal, badge: '6 Tests' },
    { tab: 'media_admin', label: 'Media Super Admin', icon: ShieldAlert, badge: 'Edge Mesh' },
    { tab: 'communities', label: 'OMNI Spaces & Hubs', icon: Users, badge: 'Flagship' },
    { tab: 'groups', label: 'Special Groups', icon: Users, badge: 'Circles' },
    { tab: 'channels', label: 'Broadcast Channels', icon: Radio, badge: '1-to-Many' },
    { tab: 'spaces_test_suite', label: 'Spaces Test Suite', icon: Terminal, badge: '6 Tests' },
    { tab: 'discover', label: 'Discover & Explore', icon: Compass },
    { tab: 'marketplace', label: 'Social Storefront', icon: ShoppingBag },
    { tab: 'business', label: 'Business & CRM', icon: Briefcase },
    { tab: 'events', label: 'Events & HD Video', icon: Calendar },
    { tab: 'ai_assistant', label: 'OMNI AI Copilot', icon: Sparkles },
    { tab: 'feature_control', label: 'Feature Control Centre', icon: Sliders, badge: 'Super Admin' },
    { tab: 'settings', label: 'Security & Audit', icon: Shield }
  ];

  return (
    <div id="omni-connect-root" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Universal App Header */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & App Tag */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">OMNI Connect</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  v1.0.0 NATIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                AI-Powered Social, Communication, Community, Commerce & Business Super-App
              </p>
            </div>
          </div>

          {/* Archetype Dashboard Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => { setDashboardMode('personal'); setActiveTab('feed'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                dashboardMode === 'personal'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Personal</span>
            </button>
            <button
              onClick={() => { setDashboardMode('business'); setActiveTab('business'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                dashboardMode === 'business'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Business</span>
            </button>
            <button
              onClick={() => { setDashboardMode('organisation'); setActiveTab('communities'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                dashboardMode === 'organisation'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Faith & Org</span>
            </button>
            <button
              onClick={() => { setDashboardMode('enterprise'); setActiveTab('events'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                dashboardMode === 'enterprise'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Enterprise</span>
            </button>
          </div>

          {/* Active Passport Profile Dropdown & Switcher */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-800 cursor-pointer"
            >
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white flex items-center justify-end gap-1.5">
                  <span>{activeProfile.displayName}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-[10px] text-indigo-400 font-mono">{activeProfile.headline?.slice(0, 32)}...</div>
              </div>
              <img
                src={activeProfile.avatarUrl}
                alt={activeProfile.displayName}
                className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500/60"
              />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 border-b border-slate-800">
                  Switch OMNI Passport Identity
                </div>
                <div className="space-y-1">
                  {SEED_CONNECT_PROFILES.map(prof => {
                    const isCurrent = prof.id === activeProfile.id;
                    return (
                      <button
                        key={prof.id}
                        onClick={() => {
                          setActiveProfileId(prof.id);
                          setProfileDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors ${
                          isCurrent ? 'bg-indigo-600/20 border border-indigo-500/40 text-white' : 'hover:bg-slate-800/60 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={prof.avatarUrl} alt={prof.displayName} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate">{prof.displayName}</div>
                            <div className="text-[10px] text-slate-400 capitalize truncate">{prof.profileType} • @{prof.username}</div>
                          </div>
                        </div>
                        {isCurrent && <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 lg:p-6 gap-6">
        {/* Left Navigation Bar */}
        <aside className="w-64 flex-shrink-0 hidden md:flex flex-col gap-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 py-2">
            Navigation Menu
          </div>
          {navItems.map(item => {
            const isSelected = activeTab === item.tab;
            const Icon = item.icon;

            return (
              <button
                key={item.tab}
                id={`nav-item-${item.tab}`}
                onClick={() => {
                  setActiveMeetingRoom(null);
                  setActiveTab(item.tab);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : item.badge === 'Super Admin'
                        ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Core Integration Info Box */}
          <div className="mt-auto pt-4 border-t border-slate-800/80">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> OMNI Core Sovereign
              </div>
              <p>Reusing Passport SSO, Finance OS ledger & Gemini AI mesh without duplication.</p>
            </div>
          </div>
        </aside>

        {/* Center Content Viewport */}
        <main className="flex-1 min-w-0">
          {/* HD Video Meeting Mode Overlay */}
          {activeMeetingRoom ? (
            <OmniConnectMeetingView
              meetingRoom={activeMeetingRoom}
              onLeaveMeeting={() => setActiveMeetingRoom(null)}
            />
          ) : (
            <>
              {/* HOME VIEW */}
              {activeTab === 'home' && (
                <div className="space-y-6">
                  {/* Hero Welcome Banner */}
                  <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        OMNI RELATIONSHIP & COMMUNICATION LAYER
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
                      Welcome to OMNI Connect, {activeProfile.displayName}
                    </h2>
                    <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                      Your sovereign super-app uniting high-concurrency encrypted messaging, social feeds, community hubs, omni-channel business CRM, and creator monetization on top of OMNI Core.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setActiveTab('feed')}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Explore Social Feed</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Open Messages (E2EE)</span>
                      </button>
                      <button
                        onClick={() => setActiveMeetingRoom(SEED_MEETING_ROOM)}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-lg"
                      >
                        <Video className="w-4 h-4" />
                        <span>Launch HD Video Room</span>
                      </button>
                    </div>
                  </div>

                  {/* 4 Dashboard Archetype Feature Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div
                      onClick={() => { setDashboardMode('personal'); setActiveTab('feed'); }}
                      className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-5 cursor-pointer transition-all space-y-2 group shadow-xl"
                    >
                      <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl w-fit group-hover:scale-110 transition-transform">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-white">1. Personal Social</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Algorithm-free feed, encrypted private chats, voice notes, and family groups.
                      </p>
                    </div>

                    <div
                      onClick={() => { setDashboardMode('business'); setActiveTab('business'); }}
                      className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-5 cursor-pointer transition-all space-y-2 group shadow-xl"
                    >
                      <div className="p-2.5 bg-emerald-600/20 text-emerald-400 rounded-xl w-fit group-hover:scale-110 transition-transform">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-white">2. Business CRM</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Omni-channel customer inbox, visual lead pipelines, and storefront products.
                      </p>
                    </div>

                    <div
                      onClick={() => { setDashboardMode('organisation'); setActiveTab('communities'); }}
                      className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-5 cursor-pointer transition-all space-y-2 group shadow-xl"
                    >
                      <div className="p-2.5 bg-amber-600/20 text-amber-400 rounded-xl w-fit group-hover:scale-110 transition-transform">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-white">3. Faith & Org Hub</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Church multi-branch fellowship, student campus networks, and announcements.
                      </p>
                    </div>

                    <div
                      onClick={() => { setDashboardMode('enterprise'); setActiveTab('feature_control'); }}
                      className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-5 cursor-pointer transition-all space-y-2 group shadow-xl"
                    >
                      <div className="p-2.5 bg-purple-600/20 text-purple-400 rounded-xl w-fit group-hover:scale-110 transition-transform">
                        <Sliders className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-white">4. Super Admin Control</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Active-by-default feature switchboard, rate limits, and audit logs.
                      </p>
                    </div>
                  </div>

                  {/* Feed Preview */}
                  <OmniConnectFeedView
                    posts={socialPosts.slice(0, 3)}
                    moments={moments}
                    statusTray={statusTray}
                    activeProfile={activeProfile}
                    algoConfig={algoConfig}
                    onReact={handleReactSocialPost}
                    onComment={handleAddSocialComment}
                    onShare={handleShareSocialPost}
                    onSave={handleSaveSocialPost}
                    onVotePoll={handleVotePoll}
                    onRsvpEvent={handleRsvpEvent}
                    onTranslatePost={(postId, lang) => engine.translatePost(postId, lang)}
                    onSummarizePost={(postId) => engine.summarizePost(postId)}
                    onCreatePost={handleCreateSocialPost}
                    onCreateStatus={handleCreateStatusItem}
                    onViewStatusItem={handleViewStatusItem}
                    onReactStatusItem={handleReactStatusItem}
                    onUpdateAlgoConfig={handleUpdateAlgoConfig}
                    onMuteTopic={handleMuteTopic}
                    onUnmuteTopic={handleUnmuteTopic}
                    onMuteUser={handleMuteUser}
                    onUnmuteUser={handleUnmuteUser}
                    onNavigateTab={(tab) => setActiveTab(tab as any)}
                    aiTools={aiTools}
                  />
                </div>
              )}

              {/* DIGITAL IDENTITY & USERNAME REGISTRY VIEW */}
              {activeTab === 'identity_profiles' && (
                <OmniIdentityHub
                  activeProfile={activeUniversalProfile}
                  allProfiles={universalProfiles}
                  rules={engine.getUsernameRules()}
                  onSelectProfile={(id) => {
                    setActiveProfileId(id);
                  }}
                  onCheckAvailability={(un) => engine.checkUsernameAvailability(un)}
                  onChangeUsername={handleChangeUsername}
                  onUpdateProfile={handleUpdateUniversalProfile}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                  privacySettings={privacySettings}
                  onUpdatePrivacySettings={handleUpdatePrivacy}
                />
              )}

              {/* RELATIONSHIP INTELLIGENCE GRAPH VIEW */}
              {activeTab === 'relationship_graph' && (
                <OmniRelationshipGraphView
                  nodes={graphNodes}
                  edges={graphEdges}
                  activeProfileId={activeProfile.id}
                  recommendations={recommendations}
                  followUps={followUps}
                  opportunities={opportunities}
                  engagementPatterns={engagementPatterns}
                  onAddRelationship={handleAddRelationship}
                  onAcceptRecommendation={(rec) => {
                    handleAddRelationship({
                      tenantId: 'tenant_primary_001',
                      sourceProfileId: rec.sourceProfileId,
                      targetProfileId: rec.targetProfileId,
                      relationshipType: rec.suggestedType,
                      strengthScore: 80,
                      visibility: 'mutual_only',
                      interactionCount: 1,
                      isConsentGranted: true
                    });
                  }}
                  onActionFollowUp={(fu) => {
                    handleLogInteraction(fu.contactId, {
                      interactionType: fu.suggestedChannel as any,
                      direction: 'outbound',
                      summary: `Follow-up action: ${fu.reason}`
                    });
                  }}
                />
              )}

              {/* UNIVERSAL CONTACTS & CRM LIFECYCLE VIEW */}
              {activeTab === 'contacts' && (
                <OmniContactsManager
                  contacts={universalContacts}
                  circles={circles}
                  onAddContact={handleAddUniversalContact}
                  onUpdateContact={handleUpdateUniversalContact}
                  onDeleteContact={handleDeleteUniversalContact}
                  onImportContacts={handleImportContacts}
                  onConvertLifecycle={handleConvertLifecycle}
                  onLogInteraction={handleLogInteraction}
                />
              )}

              {/* SOVEREIGN CIRCLES & TARGETED PRIVACY VIEW */}
              {activeTab === 'circles' && (
                <OmniCirclesManager
                  circles={circles}
                  contacts={universalContacts}
                  onCreateCircle={handleCreateCircle}
                  onUpdateCircle={handleUpdateCircle}
                  onDeleteCircle={handleDeleteCircle}
                  onAddContactToCircle={handleAddContactToCircle}
                  onRemoveContactFromCircle={handleRemoveContactFromCircle}
                />
              )}

              {/* RELATIONSHIP GRAPH TEST SUITE VIEW */}
              {activeTab === 'relationship_test_suite' && (
                <OmniRelationshipTestSuite
                  engine={engine}
                />
              )}

              {/* OMNI PAGE BUILDER VIEW */}
              {activeTab === 'page_builder' && (
                <OmniPageBuilder
                  pageConfig={activePageConfig}
                  activeProfile={activeUniversalProfile}
                  onUpdatePage={handleUpdatePageConfig}
                  onPublishPage={handlePublishPage}
                />
              )}

              {/* CUSTOM DOMAINS & DNS ROUTING VIEW */}
              {activeTab === 'custom_domains' && (
                <OmniCustomDomainManager
                  domains={domains}
                  activeProfile={activeUniversalProfile}
                  onAddDomain={handleAddDomain}
                  onVerifyDomain={handleVerifyDomain}
                />
              )}

              {/* VERIFICATION & TRUST CENTER VIEW */}
              {activeTab === 'verification_center' && (
                <OmniVerificationCenter
                  applications={verificationApps}
                  activeProfile={activeUniversalProfile}
                  onSubmitApplication={handleSubmitVerification}
                  onReviewApplication={handleReviewVerification}
                />
              )}

              {/* IDENTITY AUTOMATED TEST SUITE VIEW */}
              {activeTab === 'identity_test_suite' && (
                <OmniIdentityTestSuite
                  engine={engine}
                />
              )}

              {/* FEED VIEW (PROMPT 4) */}
              {activeTab === 'feed' && (
                <OmniConnectFeedView
                  posts={socialPosts}
                  moments={moments}
                  statusTray={statusTray}
                  activeProfile={activeProfile}
                  algoConfig={algoConfig}
                  onReact={handleReactSocialPost}
                  onComment={handleAddSocialComment}
                  onShare={handleShareSocialPost}
                  onSave={handleSaveSocialPost}
                  onVotePoll={handleVotePoll}
                  onRsvpEvent={handleRsvpEvent}
                  onTranslatePost={(postId, lang) => engine.translatePost(postId, lang)}
                  onSummarizePost={(postId) => engine.summarizePost(postId)}
                  onCreatePost={handleCreateSocialPost}
                  onCreateStatus={handleCreateStatusItem}
                  onViewStatusItem={handleViewStatusItem}
                  onReactStatusItem={handleReactStatusItem}
                  onUpdateAlgoConfig={handleUpdateAlgoConfig}
                  onMuteTopic={handleMuteTopic}
                  onUnmuteTopic={handleUnmuteTopic}
                  onMuteUser={handleMuteUser}
                  onUnmuteUser={handleUnmuteUser}
                  onNavigateTab={(tab) => setActiveTab(tab as any)}
                  aiTools={aiTools}
                />
              )}

              {/* MOMENTS REELS VIEW (PROMPT 4) */}
              {activeTab === 'moments' && (
                <OmniMomentsView
                  moments={moments}
                  activeProfile={activeProfile}
                  onLikeMoment={handleLikeMoment}
                  onSaveMoment={handleSaveMoment}
                  onCreateMoment={handleCreateMoment}
                />
              )}

              {/* CREATOR STUDIO & CDN VIEW (PROMPT 4) */}
              {activeTab === 'creator_studio' && (
                <OmniCreatorStudioView
                  analytics={creatorAnalytics}
                  quota={cloudQuota}
                  mediaFiles={mediaFiles}
                  activeProfile={activeProfile}
                  onOpenComposer={() => setActiveTab('feed')}
                  onUploadMedia={handleUploadCloudMedia}
                  onDeleteMedia={handleDeleteCloudMedia}
                />
              )}

              {/* CONTENT MODERATION CENTER (PROMPT 4) */}
              {activeTab === 'moderation_center' && (
                <OmniModerationCenterView
                  reports={moderationReports}
                  onReviewReport={handleReviewModerationReport}
                  onScanContent={handleScanContent}
                />
              )}

              {/* SOCIAL ENGINE TEST SUITE (PROMPT 4) */}
              {activeTab === 'social_test_suite' && (
                <OmniSocialTestSuite
                  engine={engine}
                />
              )}

              {/* MESSAGES VIEW */}
              {activeTab === 'messages' && (
                <OmniConnectMessagingView
                  activeProfile={activeProfile}
                  engine={engine}
                  onOpenMeeting={() => setActiveMeetingRoom(SEED_MEETING_ROOM)}
                />
              )}

              {/* HD VIDEO MEETINGS VIEW (PROMPT 6) */}
              {activeTab === 'meetings' && (
                <OmniMeetingsDashboard
                  engine={engine}
                  currentProfileId={activeProfile.id}
                  onStartInstantCall={(type, title) =>
                    setActiveCallState({
                      isOpen: true,
                      callType: type,
                      targetId: 'call_inst_' + Date.now(),
                      title
                    })
                  }
                />
              )}

              {/* WEBINARS & BROADCASTS VIEW (PROMPT 6) */}
              {activeTab === 'webinars' && (
                <OmniWebinarHub
                  engine={engine}
                  currentProfileId={activeProfile.id}
                />
              )}

              {/* VIRTUAL CLASSROOMS VIEW (PROMPT 6) */}
              {activeTab === 'classroom' && (
                <OmniClassroomView
                  engine={engine}
                  currentProfileId={activeProfile.id}
                />
              )}

              {/* CLOUD RECORDINGS VAULT (PROMPT 6) */}
              {activeTab === 'recordings' && (
                <OmniRecordingsVault
                  engine={engine}
                  currentProfileId={activeProfile.id}
                />
              )}

              {/* MEDIA TEST SUITE VIEW (PROMPT 6) */}
              {activeTab === 'media_test_suite' && (
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        OMNI MEDIA & WEBRTC TEST SUITE
                      </span>
                    </div>
                    <h2 className="text-xl lg:text-2xl font-extrabold text-white">
                      Automated Voice, Video, Meetings & Broadcast Diagnostics
                    </h2>
                    <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                      Run automated verification tests covering SFU mesh concurrency, NetEQ jitter buffer packet loss recovery, SHA-256 cloud recording provenance, dual-stream screen share, waiting room quarantine, and 10k audience scale.
                    </p>

                    <button
                      onClick={() => setShowMediaTestSuiteModal(true)}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2"
                    >
                      <Terminal className="w-4 h-4" />
                      <span>Launch Interactive Media Diagnostic Runner</span>
                    </button>
                  </div>
                </div>
              )}

              {/* MEDIA SUPER ADMIN VIEW (PROMPT 6) */}
              {activeTab === 'media_admin' && (
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                        MEDIA PLATFORM SUPER ADMIN
                      </span>
                    </div>
                    <h2 className="text-xl lg:text-2xl font-extrabold text-white">
                      Enterprise SFU Mesh Routing & Watermark Governance
                    </h2>
                    <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                      Manage global edge node topology, participant capacity limits, DLP forensic watermark injection, retention lifecycle, and real-time AI transcription policies.
                    </p>

                    <button
                      onClick={() => setShowMediaAdminModal(true)}
                      className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      <span>Configure Media Policies & Edge Nodes</span>
                    </button>
                  </div>
                </div>
              )}

              {/* OMNI SPACES & COMMUNITIES VIEW (FLAGSHIP) */}
              {(activeTab === 'communities' || activeTab === 'spaces') && (
                <OmniSpacesHub
                  engine={engine}
                  currentProfileId={activeProfile.id}
                  onOpenCreateSpaceModal={() => setShowCreateSpaceModal(true)}
                  onOpenGroups={() => setActiveTab('groups')}
                  onOpenChannels={() => setActiveTab('channels')}
                  onOpenTestSuite={() => setShowSpacesTestSuiteModal(true)}
                />
              )}

              {/* SPECIAL GROUPS & SQUADS VIEW */}
              {activeTab === 'groups' && (
                <OmniGroupsManager
                  engine={engine}
                  currentProfileId={activeProfile.id}
                  onBackToSpaces={() => setActiveTab('communities')}
                />
              )}

              {/* ONE-TO-MANY BROADCAST CHANNELS VIEW */}
              {activeTab === 'channels' && (
                <OmniChannelsBroadcastView
                  engine={engine}
                  currentProfileId={activeProfile.id}
                  onBackToSpaces={() => setActiveTab('communities')}
                />
              )}

              {/* SPACES AUTOMATED DIAGNOSTICS VIEW */}
              {activeTab === 'spaces_test_suite' && (
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                        OMNI SPACES & COMMUNITY TEST SUITE
                      </span>
                    </div>
                    <h2 className="text-xl lg:text-2xl font-extrabold text-white">
                      Automated Spaces, Q&A Proofs, Grounded AI & Monetization Diagnostics
                    </h2>
                    <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                      Run automated verification tests covering multi-archetype spaces, member directory role matrices, AI document grounding, CRM pipeline sync, and digital store checkout.
                    </p>

                    <button
                      onClick={() => setShowSpacesTestSuiteModal(true)}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2"
                    >
                      <Terminal className="w-4 h-4" />
                      <span>Launch Interactive Spaces Test Runner (6 Tests)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* DISCOVER VIEW */}
              {activeTab === 'discover' && (
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Compass className="w-5 h-5 text-indigo-400" />
                      Discover Verified Creators & Communities
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Explore trending sovereign channels, developer projects, and verified organisations across the global network.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SEED_CONNECT_PROFILES.map(prof => (
                      <div key={prof.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4">
                        <img src={prof.avatarUrl} alt={prof.displayName} className="w-12 h-12 rounded-full object-cover border border-slate-700" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-bold text-white truncate">{prof.displayName}</h4>
                            <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded font-semibold">
                              {prof.profileType}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 font-mono">@{prof.username}</p>
                          <p className="text-xs text-slate-300 line-clamp-2 mt-1.5">{prof.bio}</p>
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                            <span>{prof.stats.followersCount.toLocaleString()} followers</span>
                            <button
                              onClick={() => engine.followProfile(activeProfile.id, prof.id)}
                              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold"
                            >
                              Follow
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MARKETPLACE VIEW */}
              {activeTab === 'marketplace' && (
                <OmniConnectMarketplaceView
                  products={products}
                  activeProfile={activeProfile}
                  onPurchase={handlePurchaseProduct}
                />
              )}

              {/* BUSINESS & CRM VIEW */}
              {activeTab === 'business' && (
                <OmniConnectCrmView
                  contacts={contacts}
                  deals={deals}
                  onUpdateDealStage={handleUpdateDealStage}
                />
              )}

              {/* EVENTS & MEETINGS VIEW */}
              {activeTab === 'events' && (
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-indigo-400" />
                        Sovereign Events & Live HD Video Rooms
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Host global hybrid conferences, faith fellowship streams, and enterprise HD video meetings with AI transcription.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveMeetingRoom(SEED_MEETING_ROOM)}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      <Video className="w-4 h-4" />
                      <span>Start Instant Video Room</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SEED_CONNECT_EVENTS.map(evt => (
                      <div key={evt.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                        <div>
                          <img src={evt.bannerUrl} alt={evt.title} className="w-full h-44 object-cover" />
                          <div className="p-5 space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded">
                              {evt.format.replace('_', ' ')}
                            </span>
                            <h4 className="text-base font-bold text-white leading-snug">{evt.title}</h4>
                            <p className="text-xs text-slate-300">{evt.description}</p>
                            <div className="text-xs text-slate-400 pt-2">
                              📅 {new Date(evt.startDateTime).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800 pt-3">
                          <span className="text-xs text-emerald-400 font-semibold">{evt.rsvpCount} Attending</span>
                          <button
                            onClick={() => setActiveMeetingRoom(SEED_MEETING_ROOM)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                          >
                            Join / RSVP
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI ASSISTANT VIEW */}
              {activeTab === 'ai_assistant' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 max-w-3xl mx-auto">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">OMNI Connect AI Copilot (Gemini 2.5)</h3>
                      <p className="text-xs text-slate-400">Universal communication assistant for drafting, live 100+ language translation, and automated meeting summarization.</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-indigo-400 font-bold uppercase text-[10px]">Real-Time Multilingual Translation</span>
                      <p className="text-slate-300">
                        OMNI Connect automatically translates incoming messages and community posts into your preferred native language (Supports English, Spanish, French, German, Japanese, Arabic, Yoruba, Hausa, Swahili, and 90+ others).
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-emerald-400 font-bold uppercase text-[10px]">AI Content Moderation Shield</span>
                      <p className="text-slate-300">
                        Zero data retention (ZDR) safety scans scan in real-time to prevent phishing attacks, malicious links, harassment, and spam before delivery.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* FEATURE CONTROL CENTRE VIEW (SUPER ADMIN) */}
              {activeTab === 'feature_control' && (
                <OmniConnectFeatureControlCenter
                  modules={modules}
                  onToggleModule={handleToggleModule}
                  onUpdateConfig={handleUpdateConfig}
                />
              )}

              {/* SETTINGS & AUDIT TRAIL VIEW */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-emerald-400" />
                      Cryptographic Audit Trail & Sovereign Security
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Every OMNI Connect state transition, message transmission, and administrative feature toggle is cryptographically stamped with SHA-256 Merkle proofs.
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                        <tr>
                          <th className="p-4">Timestamp</th>
                          <th className="p-4">Actor</th>
                          <th className="p-4">Action</th>
                          <th className="p-4">Target Type</th>
                          <th className="p-4">Merkle Proof</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {(auditLogs || []).map(log => (
                          <tr key={log.id} className="hover:bg-slate-800/40 font-mono text-[11px]">
                            <td className="p-4 text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                            <td className="p-4 font-sans font-semibold text-white">{log.actorName}</td>
                            <td className="p-4 text-indigo-400">{log.action}</td>
                            <td className="p-4 uppercase text-[10px]">{log.targetType}</td>
                            <td className="p-4 text-slate-500 truncate max-w-xs">{log.merkleHashProof}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Global Interactive Calling Modal */}
      {activeCallState && (
        <OmniCallingModal
          isOpen={activeCallState.isOpen}
          callType={activeCallState.callType}
          title={activeCallState.title}
          onClose={() => setActiveCallState(null)}
          engine={engine}
        />
      )}

      {/* Super Admin Media Policies Modal */}
      <OmniMediaAdminModal
        isOpen={showMediaAdminModal}
        onClose={() => setShowMediaAdminModal(false)}
        engine={engine}
      />

      {/* Media & WebRTC Automated Test Suite Modal */}
      <OmniMediaTestSuiteModal
        isOpen={showMediaTestSuiteModal}
        onClose={() => setShowMediaTestSuiteModal(false)}
        engine={engine}
      />

      {/* Flagship OMNI Space Creation Modal */}
      <OmniCreateSpaceModal
        isOpen={showCreateSpaceModal}
        onClose={() => setShowCreateSpaceModal(false)}
        engine={engine}
        currentProfileId={activeProfile.id}
        onSpaceCreated={(spaceId) => {
          setActiveTab('communities');
        }}
      />

      {/* Spaces Automated Diagnostic Test Suite Modal */}
      {showSpacesTestSuiteModal && (
        <OmniSpacesTestSuite
          engine={engine}
          onClose={() => setShowSpacesTestSuiteModal(false)}
        />
      )}
    </div>
  );
};
