import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Flame,
  Inbox,
  Cpu,
  Compass,
  Brain,
  BarChart3,
  Lock,
  ShieldCheck,
  Plus,
  Sparkles
} from 'lucide-react';
import { ConnectProfile } from '../../../types/omni_connect';
import {
  CrmDeal,
  Customer360Profile,
  BusinessInboxConversation,
  BusinessAutomationWorkflow,
  CrmExecutiveAnalytics,
  DealPipelineStage
} from '../../../types/omni_crm';
import {
  MOCK_CUSTOMER_360_PROFILES,
  MOCK_CRM_DEALS,
  MOCK_BUSINESS_INBOX_CONVERSATIONS,
  MOCK_AUTOMATION_WORKFLOWS,
  MOCK_CRM_EXECUTIVE_ANALYTICS
} from '../../../data/omni_crm_seed';

import { OmniCrmPipelineView } from './OmniCrmPipelineView';
import { OmniCustomer360View } from './OmniCustomer360View';
import { OmniLeadManagementView } from './OmniLeadManagementView';
import { OmniBusinessInboxView } from './OmniBusinessInboxView';
import { OmniAutomationEngineView } from './OmniAutomationEngineView';
import { OmniCustomerJourneysView } from './OmniCustomerJourneysView';
import { OmniAiBusinessAssistantView } from './OmniAiBusinessAssistantView';
import { OmniCrmAnalyticsView } from './OmniCrmAnalyticsView';
import { OmniCrmAdminControlView } from './OmniCrmAdminControlView';
import { OmniCrmTestSuiteModal } from './OmniCrmTestSuiteModal';

export type CrmSubTab =
  | 'crm_pipeline'
  | 'customer_360'
  | 'lead_management'
  | 'business_inbox'
  | 'automation_builder'
  | 'customer_journeys'
  | 'ai_business_assistant'
  | 'crm_analytics'
  | 'admin_control';

interface Props {
  activeProfile: ConnectProfile;
  initialSubTab?: CrmSubTab;
  onOpenDirectChat?: (recipientId: string, recipientName: string) => void;
}

export const OmniCrmRoot: React.FC<Props> = ({
  activeProfile,
  initialSubTab = 'crm_pipeline',
  onOpenDirectChat
}) => {
  const [currentTab, setCurrentTab] = useState<CrmSubTab>(initialSubTab);

  // CRM State
  const [deals, setDeals] = useState<CrmDeal[]>(MOCK_CRM_DEALS);
  const [profiles, setProfiles] = useState<Customer360Profile[]>(MOCK_CUSTOMER_360_PROFILES);
  const [inboxConversations, setInboxConversations] = useState<BusinessInboxConversation[]>(
    MOCK_BUSINESS_INBOX_CONVERSATIONS
  );
  const [workflows, setWorkflows] = useState<BusinessAutomationWorkflow[]>(
    MOCK_AUTOMATION_WORKFLOWS
  );
  const [analytics, setAnalytics] = useState<CrmExecutiveAnalytics>(
    MOCK_CRM_EXECUTIVE_ANALYTICS
  );

  const [selectedCustomerIdFor360, setSelectedCustomerIdFor360] = useState<string>(
    MOCK_CUSTOMER_360_PROFILES[0]?.id
  );
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);

  // Deal Stage Update Handler
  const handleUpdateDealStage = (dealId: string, stage: DealPipelineStage) => {
    setDeals(prev =>
      prev.map(d => {
        if (d.id === dealId) {
          const probability =
            stage === 'won'
              ? 100
              : stage === 'lost'
              ? 0
              : stage === 'negotiation'
              ? 85
              : stage === 'proposal'
              ? 65
              : stage === 'qualified'
              ? 45
              : stage === 'contacted'
              ? 25
              : 10;
          return {
            ...d,
            stage,
            probabilityPercent: probability,
            lastActivityAt: new Date().toISOString()
          };
        }
        return d;
      })
    );
  };

  // Create Deal Handler
  const handleCreateDeal = (newDeal: CrmDeal) => {
    setDeals(prev => [newDeal, ...prev]);
  };

  // Switch to 360 Profile
  const handleOpenCustomer360 = (customerId: string) => {
    setSelectedCustomerIdFor360(customerId);
    setCurrentTab('customer_360');
  };

  // Convert Lead to Deal Handler
  const handleConvertLeadToDeal = (profile: Customer360Profile) => {
    const convertedDeal: CrmDeal = {
      id: `deal-conv-${Date.now()}`,
      title: `${profile.companyName || profile.displayName} — Enterprise Engagement`,
      companyName: profile.companyName,
      contactId: profile.id,
      contactName: profile.displayName,
      contactAvatar: profile.avatarUrl,
      valueUsd: 75000,
      stage: 'qualified',
      probabilityPercent: 50,
      expectedCloseDate: '2026-10-31',
      leadSource: 'omni_messages',
      assignedRepId: activeProfile.id,
      assignedRepName: activeProfile.displayName,
      assignedRepAvatar: activeProfile.avatarUrl,
      productsInterested: ['OMNI Enterprise Communications & CRM'],
      notesCount: 1,
      tasksCount: 1,
      lastActivityAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    setDeals(prev => [convertedDeal, ...prev]);
    setCurrentTab('crm_pipeline');
  };

  // Send Message in Business Inbox
  const handleSendMessage = (
    conversationId: string,
    content: string,
    isInternalNote: boolean
  ) => {
    setInboxConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            conversationId,
            senderId: activeProfile.id,
            senderName: activeProfile.displayName,
            senderType: 'agent' as const,
            content,
            isInternalNote,
            timestamp: new Date().toISOString()
          };

          return {
            ...c,
            messages: [...c.messages, newMsg],
            lastMessagePreview: isInternalNote ? c.lastMessagePreview : content,
            lastMessageAt: new Date().toISOString(),
            unreadCount: 0
          };
        }
        return c;
      })
    );
  };

  // Assign Conversation
  const handleAssignConversation = (
    conversationId: string,
    agentId: string,
    agentName: string
  ) => {
    setInboxConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            assignedAgentId: agentId,
            assignedAgentName: agentName
          };
        }
        return c;
      })
    );
  };

  // Update Conversation Status
  const handleUpdateStatus = (
    conversationId: string,
    status: 'open' | 'pending' | 'resolved' | 'closed'
  ) => {
    setInboxConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return { ...c, status };
        }
        return c;
      })
    );
  };

  // Toggle Workflow Active
  const handleToggleWorkflow = (workflowId: string) => {
    setWorkflows(prev =>
      prev.map(w => {
        if (w.id === workflowId) {
          return { ...w, isActive: !w.isActive };
        }
        return w;
      })
    );
  };

  // Create Workflow
  const handleCreateWorkflow = (newWorkflow: BusinessAutomationWorkflow) => {
    setWorkflows(prev => [newWorkflow, ...prev]);
  };

  // Test Run Workflow
  const handleExecuteWorkflowTest = (workflowId: string) => {
    setWorkflows(prev =>
      prev.map(w => {
        if (w.id === workflowId) {
          return {
            ...w,
            executionCount: w.executionCount + 1,
            lastExecutedAt: new Date().toISOString()
          };
        }
        return w;
      })
    );
  };

  const navItems = [
    { id: 'crm_pipeline' as CrmSubTab, label: 'Pipeline & Deals', icon: Briefcase, badge: deals.length },
    { id: 'customer_360' as CrmSubTab, label: 'Customer 360', icon: Users, badge: profiles.length },
    { id: 'lead_management' as CrmSubTab, label: 'AI Lead Scoring', icon: Flame },
    { id: 'business_inbox' as CrmSubTab, label: 'Business Inbox', icon: Inbox, badge: inboxConversations.length },
    { id: 'automation_builder' as CrmSubTab, label: 'Automation Engine', icon: Cpu },
    { id: 'customer_journeys' as CrmSubTab, label: 'Customer Journeys', icon: Compass },
    { id: 'ai_business_assistant' as CrmSubTab, label: 'AI Sales Copilot', icon: Brain },
    { id: 'crm_analytics' as CrmSubTab, label: 'Executive Analytics', icon: BarChart3 },
    { id: 'admin_control' as CrmSubTab, label: 'Super Admin', icon: Lock }
  ];

  return (
    <div id="omni-crm-root-container" className="space-y-6">
      {/* Top CRM Sub-Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-1 md:pb-0">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-indigo-900/80 text-indigo-200' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Tools: Diagnostic Suite Button */}
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => setIsDiagnosticModalOpen(true)}
            className="px-3.5 py-1.5 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Diagnostics (8/8)</span>
          </button>
        </div>
      </div>

      {/* Render Active CRM View */}
      {currentTab === 'crm_pipeline' && (
        <OmniCrmPipelineView
          deals={deals}
          onUpdateDealStage={handleUpdateDealStage}
          onCreateDeal={handleCreateDeal}
          onOpenCustomer360={handleOpenCustomer360}
          activeProfile={activeProfile}
        />
      )}

      {currentTab === 'customer_360' && (
        <OmniCustomer360View
          profiles={profiles}
          selectedProfileId={selectedCustomerIdFor360}
          onSelectProfile={id => setSelectedCustomerIdFor360(id)}
          onOpenDirectChat={onOpenDirectChat}
        />
      )}

      {currentTab === 'lead_management' && (
        <OmniLeadManagementView
          profiles={profiles}
          onOpenCustomer360={handleOpenCustomer360}
          onConvertToDeal={handleConvertLeadToDeal}
        />
      )}

      {currentTab === 'business_inbox' && (
        <OmniBusinessInboxView
          conversations={inboxConversations}
          activeProfile={activeProfile}
          onOpenCustomer360={handleOpenCustomer360}
          onSendMessage={handleSendMessage}
          onAssignConversation={handleAssignConversation}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {currentTab === 'automation_builder' && (
        <OmniAutomationEngineView
          workflows={workflows}
          onToggleWorkflow={handleToggleWorkflow}
          onCreateWorkflow={handleCreateWorkflow}
          onExecuteWorkflowTest={handleExecuteWorkflowTest}
        />
      )}

      {currentTab === 'customer_journeys' && (
        <OmniCustomerJourneysView profiles={profiles} />
      )}

      {currentTab === 'ai_business_assistant' && (
        <OmniAiBusinessAssistantView
          profiles={profiles}
          deals={deals}
          activeProfile={activeProfile}
          onOpenCustomer360={handleOpenCustomer360}
        />
      )}

      {currentTab === 'crm_analytics' && (
        <OmniCrmAnalyticsView
          analytics={analytics}
          deals={deals}
          profiles={profiles}
        />
      )}

      {currentTab === 'admin_control' && (
        <OmniCrmAdminControlView />
      )}

      {/* 8-Point Diagnostic Test Suite Modal */}
      <OmniCrmTestSuiteModal
        isOpen={isDiagnosticModalOpen}
        onClose={() => setIsDiagnosticModalOpen(false)}
      />
    </div>
  );
};
