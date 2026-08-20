import React, { useState } from 'react';
import {
  Inbox,
  Sliders,
  Zap,
  Send,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  Plus
} from 'lucide-react';
import {
  UniversalConversation,
  UniversalMessage,
  ChannelAdapterConfig,
  InboxTeamAgent,
  InboxAutomationRule,
  BroadcastCampaign,
  UniversalInboxAnalytics,
  GatewaySecurityPolicy,
  GatewayAuditLog,
  ConversationStatus,
  ConversationPriority
} from '../../../types/omni_universal_inbox';
import { ConnectProfile } from '../../../types/omni_connect';
import {
  SEED_UNIVERSAL_CONVERSATIONS,
  SEED_UNIVERSAL_MESSAGES,
  SEED_CHANNEL_ADAPTERS,
  SEED_INBOX_TEAM_AGENTS,
  SEED_INBOX_AUTOMATION_RULES,
  SEED_BROADCAST_CAMPAIGNS,
  SEED_INBOX_ANALYTICS,
  SEED_GATEWAY_SECURITY_POLICY,
  SEED_GATEWAY_AUDIT_LOGS
} from '../../../data/omni_universal_inbox_seed';

import { OmniUniversalInboxView } from './OmniUniversalInboxView';
import { OmniChannelAdaptersManager } from './OmniChannelAdaptersManager';
import { OmniInboxAutomationsView } from './OmniInboxAutomationsView';
import { OmniBroadcastCampaignsView } from './OmniBroadcastCampaignsView';
import { OmniInboxAnalyticsView } from './OmniInboxAnalyticsView';
import { OmniInboxSecurityControl } from './OmniInboxSecurityControl';
import { OmniInboxTestSuiteModal } from './OmniInboxTestSuiteModal';

interface Props {
  activeProfile: ConnectProfile;
}

export type InboxSubTab =
  | 'inbox'
  | 'gateways'
  | 'automations'
  | 'broadcasts'
  | 'analytics'
  | 'security';

export const OmniUniversalInboxRoot: React.FC<Props> = ({ activeProfile }) => {
  const [activeTab, setActiveTab] = useState<InboxSubTab>('inbox');
  const [conversations, setConversations] = useState<UniversalConversation[]>(SEED_UNIVERSAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, UniversalMessage[]>>(SEED_UNIVERSAL_MESSAGES);
  const [adapters, setAdapters] = useState<ChannelAdapterConfig[]>(SEED_CHANNEL_ADAPTERS);
  const [teamAgents, setTeamAgents] = useState<InboxTeamAgent[]>(SEED_INBOX_TEAM_AGENTS);
  const [rules, setRules] = useState<InboxAutomationRule[]>(SEED_INBOX_AUTOMATION_RULES);
  const [campaigns, setCampaigns] = useState<BroadcastCampaign[]>(SEED_BROADCAST_CAMPAIGNS);
  const [analytics, setAnalytics] = useState<UniversalInboxAnalytics>(SEED_INBOX_ANALYTICS);
  const [securityPolicy, setSecurityPolicy] = useState<GatewaySecurityPolicy>(SEED_GATEWAY_SECURITY_POLICY);
  const [auditLogs, setAuditLogs] = useState<GatewayAuditLog[]>(SEED_GATEWAY_AUDIT_LOGS);

  const [isTestSuiteOpen, setIsTestSuiteOpen] = useState(false);

  // Handlers
  const handleSendMessage = (conversationId: string, text: string, useAiDraft?: boolean) => {
    const newMsg: UniversalMessage = {
      id: `msg_out_${Date.now()}`,
      conversationId,
      sourceChannel: conversations.find(c => c.id === conversationId)?.sourceChannel || 'whatsapp',
      direction: 'outbound',
      senderType: 'agent',
      senderId: activeProfile.id,
      senderName: activeProfile.displayName,
      body: text,
      aiApprovalRequired: useAiDraft || false,
      approvedByAgentName: useAiDraft ? activeProfile.displayName : undefined,
      deliveryStatus: 'sent',
      createdAt: new Date().toISOString()
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessageSnippet: text,
          lastMessageAt: new Date().toISOString(),
          unreadCount: 0
        };
      }
      return c;
    }));
  };

  const handleUpdateStatus = (conversationId: string, status: ConversationStatus) => {
    setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, status } : c));
  };

  const handleUpdatePriority = (conversationId: string, priority: ConversationPriority) => {
    setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, priority } : c));
  };

  const handleAssignAgent = (conversationId: string, agentId: string, agentName: string) => {
    setConversations(prev => prev.map(c => c.id === conversationId ? { ...c, assignedAgentId: agentId, assignedAgentName: agentName } : c));
  };

  const handleAddInternalNote = (conversationId: string, noteText: string) => {
    const newNote = {
      id: `note_${Date.now()}`,
      authorId: activeProfile.id,
      authorName: activeProfile.displayName,
      note: noteText,
      createdAt: new Date().toISOString()
    };

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          internalNotes: [...c.internalNotes, newNote]
        };
      }
      return c;
    }));
  };

  const handleToggleAdapter = (adapterId: string) => {
    setAdapters(prev => prev.map(a => a.id === adapterId ? { ...a, isActive: !a.isActive } : a));
  };

  const handleUpdateCredentials = (adapterId: string, updated: Partial<ChannelAdapterConfig['credentials']>) => {
    setAdapters(prev => prev.map(a => a.id === adapterId ? { ...a, credentials: { ...a.credentials, ...updated } } : a));
  };

  const handleTestPingWebhook = async (adapterId: string) => {
    await new Promise(r => setTimeout(r, 450));
    return {
      success: true,
      latencyMs: Math.floor(Math.random() * 25) + 15,
      message: 'Verified webhook handshake. HTTP 200 OK signature valid.'
    };
  };

  const handleToggleRule = (ruleId: string) => {
    setRules(prev => prev.map(r => r.id === ruleId ? { ...r, isActive: !r.isActive } : r));
  };

  const handleCreateRule = (rule: Partial<InboxAutomationRule>) => {
    const newRule: InboxAutomationRule = {
      id: `rule_${Date.now()}`,
      title: rule.title || 'Untitled Automation',
      description: rule.description || '',
      trigger: rule.trigger || 'new_inbound_message',
      isActive: true,
      conditions: rule.conditions || {},
      actions: rule.actions || [],
      executionCountTotal: 0
    };
    setRules(prev => [newRule, ...prev]);
  };

  const handleExecuteSimulation = async (ruleId: string) => {
    await new Promise(r => setTimeout(r, 600));
    return {
      success: true,
      trace: [
        '1. Evaluating trigger payload (WhatsApp incoming lead)',
        '2. Condition matched: customerTier is "Enterprise"',
        '3. Executing action: Assign to team "VIP Concierge"',
        '4. Executing action: Create CRM Opportunity stage "Proposal"',
        '5. Completed with 0 errors in 18ms'
      ]
    };
  };

  const handleCreateCampaign = (camp: Partial<BroadcastCampaign>) => {
    const newCamp: BroadcastCampaign = {
      id: `camp_${Date.now()}`,
      title: camp.title || 'Untitled Campaign',
      targetChannel: camp.targetChannel || 'whatsapp',
      templateName: camp.templateName || 'standard_notice',
      messageContent: camp.messageContent || '',
      status: 'scheduled',
      scheduledAt: new Date(Date.now() + 3600000).toISOString(),
      audienceFilter: camp.audienceFilter || { verifiedOptInOnly: true },
      metrics: {
        targetedRecipients: 4200,
        sentCount: 0,
        deliveredCount: 0,
        readCount: 0,
        clickedCount: 0,
        optOutCount: 0
      },
      consentEnforced: true
    };
    setCampaigns(prev => [newCamp, ...prev]);
  };

  const handleSendCampaign = (campId: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === campId) {
        return {
          ...c,
          status: 'completed',
          metrics: {
            ...c.metrics,
            sentCount: c.metrics.targetedRecipients,
            deliveredCount: Math.floor(c.metrics.targetedRecipients * 0.98),
            readCount: Math.floor(c.metrics.targetedRecipients * 0.84),
            clickedCount: Math.floor(c.metrics.targetedRecipients * 0.42),
            optOutCount: 3
          }
        };
      }
      return c;
    }));
  };

  const handleUpdatePolicy = (updated: Partial<GatewaySecurityPolicy>) => {
    setSecurityPolicy(prev => ({ ...prev, ...updated }));
  };

  return (
    <div className="space-y-6">
      {/* Top Universal Navigation Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-2 shadow-xl backdrop-blur-md flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'inbox'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Universal Inbox</span>
            {conversations.some(c => c.unreadCount > 0) && (
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-400 text-slate-950 text-[10px] font-black">
                {conversations.reduce((acc, c) => acc + c.unreadCount, 0)}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('gateways')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'gateways'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Channel Gateways</span>
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              8 Active
            </span>
          </button>

          <button
            onClick={() => setActiveTab('automations')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'automations'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Workflows & Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('broadcasts')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'broadcasts'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Broadcasts</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'security'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Super Admin & Security</span>
          </button>
        </div>

        <div className="flex items-center gap-2 pr-2">
          <button
            onClick={() => setIsTestSuiteOpen(true)}
            className="px-3.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Run Test Suite</span>
          </button>
        </div>
      </div>

      {/* Main Tab Render */}
      {activeTab === 'inbox' && (
        <OmniUniversalInboxView
          conversations={conversations}
          messages={messages}
          teamAgents={teamAgents}
          activeProfile={activeProfile}
          onSendMessage={handleSendMessage}
          onUpdateConversationStatus={handleUpdateStatus}
          onUpdatePriority={handleUpdatePriority}
          onAssignAgent={handleAssignAgent}
          onAddInternalNote={handleAddInternalNote}
          onOpenGateways={() => setActiveTab('gateways')}
          onOpenAutomations={() => setActiveTab('automations')}
          onOpenTestSuite={() => setIsTestSuiteOpen(true)}
        />
      )}

      {activeTab === 'gateways' && (
        <OmniChannelAdaptersManager
          adapters={adapters}
          onToggleAdapter={handleToggleAdapter}
          onUpdateCredentials={handleUpdateCredentials}
          onTestPingWebhook={handleTestPingWebhook}
        />
      )}

      {activeTab === 'automations' && (
        <OmniInboxAutomationsView
          rules={rules}
          onToggleRule={handleToggleRule}
          onCreateRule={handleCreateRule}
          onExecuteSimulation={handleExecuteSimulation}
        />
      )}

      {activeTab === 'broadcasts' && (
        <OmniBroadcastCampaignsView
          campaigns={campaigns}
          onCreateCampaign={handleCreateCampaign}
          onSendCampaign={handleSendCampaign}
        />
      )}

      {activeTab === 'analytics' && (
        <OmniInboxAnalyticsView
          analytics={analytics}
          teamAgents={teamAgents}
        />
      )}

      {activeTab === 'security' && (
        <OmniInboxSecurityControl
          policy={securityPolicy}
          auditLogs={auditLogs}
          onUpdatePolicy={handleUpdatePolicy}
        />
      )}

      {/* Diagnostic Test Runner Modal */}
      <OmniInboxTestSuiteModal
        isOpen={isTestSuiteOpen}
        onClose={() => setIsTestSuiteOpen(false)}
      />
    </div>
  );
};
