import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Briefcase, 
  Megaphone, 
  Cpu, 
  CodeXml, 
  MessageSquare, 
  Truck, 
  GraduationCap, 
  TrendingUp, 
  Settings, 
  Shield, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Sliders, 
  Database, 
  Key, 
  Send, 
  FileText, 
  Globe, 
  RefreshCw, 
  BarChart3, 
  DollarSign,
  ChevronRight,
  User,
  Activity,
  History,
  Lock,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiOperatingSystemPageProps {
  useOmniHook: any;
}

export default function AiOperatingSystemPage({ useOmniHook }: AiOperatingSystemPageProps) {
  const { 
    state, 
    triggerToast,
    toggleProviderStatus,
    updateModelStatus,
    updateAgentConfig,
    updateAutonomyRule,
    addKnowledgeSource,
    deleteKnowledgeSource,
    updateBudgetLimit,
    approveApprovalTask,
    rejectApprovalTask,
    sendAgentChatMessage,
    clearChatHistory
  } = useOmniHook;

  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'autonomy' | 'approvals' | 'rag' | 'providers' | 'playground'>('overview');
  const [selectedAgentId, setSelectedAgentId] = useState<string>('agent_omni_assistant');
  const [chatPrompt, setChatPrompt] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Form states for RAG registration
  const [ragName, setRagName] = useState('');
  const [ragType, setRagType] = useState<'document' | 'database' | 'website' | 'cloud_storage' | 'app_record'>('document');
  const [ragSize, setRagSize] = useState('240');
  const [ragPath, setRagPath] = useState('');

  // Form states for Autonomy limits
  const [autoScopeType, setAutoScopeType] = useState<'tenant' | 'app' | 'agent' | 'tool'>('tenant');
  const [autoScopeId, setAutoScopeId] = useState('');
  const [autoLevel, setAutoLevel] = useState(2);
  const [autoNotes, setAutoNotes] = useState('');

  // Resolves the icon based on agent avatar metadata
  const getAgentIcon = (avatarName: string) => {
    switch (avatarName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-indigo-600" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-amber-600" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-sky-600" />;
      case 'Megaphone': return <Megaphone className="w-5 h-5 text-rose-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-600" />;
      case 'CodeXml': return <CodeXml className="w-5 h-5 text-teal-600" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-emerald-600" />;
      case 'Truck': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-violet-600" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-orange-600" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-600" />;
    }
  };

  // Resolve current active Org and Budget details
  const activeOrg = useMemo(() => {
    return state.organizations?.find((o: any) => o.id === state.currentOrgId) || state.organizations?.[0] || {
      id: 'org_dynasty',
      name: 'Dynasty Global Holdings',
      slug: 'dynasty',
      tenantId: 'tenant_dynasty_99',
      status: 'active',
      orgType: 'company',
      billingPlan: 'enterprise',
      walletBalance: 4280550.00,
      apiKey: 'omni_live_api_dyn_k8s_9v02l4k1a7s90f8',
      webhookUrl: 'https://api.dynastyholdings.com/omni-webhook',
      subdomains: ['dynasty.omni.io'],
      createdAt: '2026-01-05T00:00:00Z',
      kybVerified: true
    };
  }, [state.organizations, state.currentOrgId]);

  const activeBudget = useMemo(() => {
    return state.aiBudgets?.find((b: any) => b.organizationId === activeOrg?.id) || {
      id: 'b_temp',
      organizationId: activeOrg?.id,
      monthlyLimit: 150,
      currentSpent: 42.85,
      alertThreshold: 80,
      alertsTriggered: false
    };
  }, [state.aiBudgets, activeOrg]);

  // Handle active agent configuration edit
  const currentAgent = useMemo(() => {
    return state.aiAgents?.find((a: any) => a.id === selectedAgentId) || state.aiAgents?.[0] || null;
  }, [state.aiAgents, selectedAgentId]);

  // Handle chat history resolution
  const activeConversation = useMemo(() => {
    return state.aiConversations.find(
      (c: any) => c.agentId === selectedAgentId && c.organizationId === activeOrg?.id
    ) || { messages: [] };
  }, [state.aiConversations, selectedAgentId, activeOrg]);

  // Handlers
  const handleChatSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatPrompt.trim() || isSendingChat) return;
    setIsSendingChat(true);
    const textToSend = chatPrompt;
    setChatPrompt('');
    await sendAgentChatMessage(selectedAgentId, textToSend);
    setIsSendingChat(false);
  };

  const handleRagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ragName) return;
    addKnowledgeSource(ragName, ragType, parseInt(ragSize) || 100, ragPath || `/data/rag/${ragName}`);
    setRagName('');
    setRagPath('');
    triggerToast('Indexing Queue Started', 'Knowledge indexer pipeline initiated successfully.', 'info');
  };

  const handleAutonomySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!autoScopeId) {
      triggerToast('Validation Error', 'Please select or provide a scope ID.', 'error');
      return;
    }
    updateAutonomyRule(autoScopeType, autoScopeId, autoLevel, autoNotes);
    setAutoScopeId('');
    setAutoNotes('');
  };

  // Filter approval tasks for active tenant
  const activeApprovalTasks = useMemo(() => {
    return state.aiApprovalTasks.filter((t: any) => t.organizationId === activeOrg?.id);
  }, [state.aiApprovalTasks, activeOrg]);

  // Filter audit logs for active tenant
  const activeAuditLogs = useMemo(() => {
    return state.aiAuditLogs.filter((l: any) => l.organizationId === activeOrg?.id);
  }, [state.aiAuditLogs, activeOrg]);

  // Filter cost records for active tenant
  const totalCostComputed = useMemo(() => {
    const orgRecords = state.aiCostRecords.filter((r: any) => r.organizationId === activeOrg?.id);
    return orgRecords.reduce((acc: number, r: any) => acc + r.estimatedCost, 0);
  }, [state.aiCostRecords, activeOrg]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8" id="ai-operating-system-container">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-200 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-100 uppercase tracking-wider">
              Central Intelligence Layer
            </span>
          </div>
          <h1 className="text-3xl font-display font-bold text-zinc-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
            OMNI Intelligence Layer
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Unified multi-tenant AI Orchestration platform, provider registries, compliance guardrails, and secure tool execution.
          </p>
        </div>

        {/* Workspace Quick-State */}
        <div className="flex items-center gap-4 bg-zinc-50 border border-zinc-200 rounded-xl p-3.5">
          <div className="text-right">
            <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Active Tenant</div>
            <div className="text-sm font-semibold text-zinc-800">{activeOrg?.name}</div>
          </div>
          <div className="h-8 w-px bg-zinc-200" />
          <div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">AI Budget</div>
            <div className="text-sm font-bold text-zinc-950 flex items-center gap-1.5">
              <span className={activeBudget.currentSpent >= activeBudget.monthlyLimit ? "text-rose-600" : activeBudget.alertsTriggered ? "text-amber-500" : "text-emerald-600"}>
                ${activeBudget.currentSpent.toFixed(2)}
              </span>
              <span className="text-zinc-400 font-normal">/ ${activeBudget.monthlyLimit.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-zinc-200 overflow-x-auto mb-8 whitespace-nowrap scrollbar-none gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-4 px-4 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'overview'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Overview & Metrics
          </div>
        </button>
        <button
          onClick={() => setActiveTab('playground')}
          className={`pb-4 px-4 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'playground'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Agent Playground
          </div>
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          className={`pb-4 px-4 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'agents'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            Agent Registry
          </div>
        </button>
        <button
          onClick={() => setActiveTab('autonomy')}
          className={`pb-4 px-4 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'autonomy'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Autonomy & Policies
          </div>
        </button>
        <button
          onClick={() => setActiveTab('approvals')}
          className={`pb-4 px-4 text-sm font-medium border-b-2 transition-all relative ${
            activeTab === 'approvals'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Approval Center
            {activeApprovalTasks.filter((t: any) => t.status === 'pending').length > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1.5 -translate-y-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                {activeApprovalTasks.filter((t: any) => t.status === 'pending').length}
              </span>
            )}
          </div>
        </button>
        <button
          onClick={() => setActiveTab('rag')}
          className={`pb-4 px-4 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'rag'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            RAG Knowledge Base
          </div>
        </button>
        <button
          onClick={() => setActiveTab('providers')}
          className={`pb-4 px-4 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'providers'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            Models & Providers
          </div>
        </button>
      </div>

      {/* Main Tab Views */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >

          {/* 1. OVERVIEW & METRICS TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Top Banner Warning if Budget Threshold Met */}
              {activeBudget.alertsTriggered && (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Tenant Spend Cap Threshold Exceeded!</h4>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Your current OMNI spend of <strong>${activeBudget.currentSpent.toFixed(2)}</strong> has crossed your designated threshold of {activeBudget.alertThreshold}% of the ${activeBudget.monthlyLimit.toFixed(2)} budget. Background AI services can be enqueued, but high-tier models will fail when budget ceiling is exceeded.
                    </p>
                  </div>
                </div>
              )}

              {/* Status Metric Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Monthly AI Spend</span>
                    <DollarSign className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-2xl font-bold text-zinc-950">${activeBudget.currentSpent.toFixed(2)}</div>
                  <div className="mt-3">
                    <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${activeBudget.currentSpent >= activeBudget.monthlyLimit ? 'bg-rose-500' : 'bg-indigo-600'}`}
                        style={{ width: `${Math.min(100, (activeBudget.currentSpent / activeBudget.monthlyLimit) * 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                      <span>Limit: ${activeBudget.monthlyLimit.toFixed(2)}</span>
                      <span>{((activeBudget.currentSpent / activeBudget.monthlyLimit) * 100).toFixed(0)}% Used</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total API Transactions</span>
                    <BarChart3 className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-2xl font-bold text-zinc-950">
                    {state.aiCostRecords.filter((r: any) => r.organizationId === activeOrg?.id).reduce((acc: number, r: any) => acc + r.requestCount, 0)}
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-3">Evaluated across all 10 specialized micro-agents.</p>
                </div>

                <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Pending Approvals</span>
                    <Clock className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="text-2xl font-bold text-rose-600">
                    {activeApprovalTasks.filter((t: any) => t.status === 'pending').length}
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-3">Elevated tasks requiring multi-factor operator confirm.</p>
                </div>

                <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">RAG Sources Indexed</span>
                    <Database className="w-4 h-4 text-teal-500" />
                  </div>
                  <div className="text-2xl font-bold text-zinc-950">
                    {state.aiKnowledgeSources.filter((s: any) => s.orgId === activeOrg?.id).length}
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-3">Documents, catalogs, and databases synced into vector base.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Models Status */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-indigo-600" />
                      Active AI Models & Host Status
                    </h3>
                    <div className="divide-y divide-zinc-100">
                      {state.aiModels.map((model: any) => {
                        const provider = state.aiProviders.find((p: any) => p.id === model.providerId);
                        return (
                          <div key={model.id} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                            <div>
                              <div className="font-semibold text-sm text-zinc-800 flex items-center gap-2">
                                {model.name}
                                {model.isLocal && (
                                  <span className="bg-zinc-100 text-zinc-600 text-[10px] font-bold px-2 py-0.5 rounded border border-zinc-200 uppercase">
                                    Local Node
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-zinc-400 mt-0.5">
                                Provider: <strong className="text-zinc-600 capitalize">{provider?.name || model.providerId}</strong> • Context: {model.contextLength ? `${(model.contextLength/1000).toLocaleString()}k` : 'N/A'} tokens
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-xs font-semibold text-zinc-700">
                                  ${(model.costPer1kInput * 1000).toFixed(4)} / 1M Input
                                </div>
                                <div className="text-[10px] text-zinc-400">
                                  Output multiplier: {(model.costPer1kOutput / (model.costPer1kInput || 1)).toFixed(1)}x
                                </div>
                              </div>
                              <div>
                                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold border ${
                                  model.status === 'active' && provider?.status === 'connected'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                    : 'bg-zinc-100 text-zinc-500 border-zinc-200'
                                }`}>
                                  <span className={`w-2 h-2 rounded-full ${model.status === 'active' && provider?.status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`} />
                                  {model.status === 'active' && provider?.status === 'connected' ? 'Operational' : 'Host Offline'}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Modifier Console */}
                  <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-zinc-900 mb-2 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-indigo-600" />
                      Configure Tenant AI Spend Bounds
                    </h3>
                    <p className="text-xs text-zinc-400 mb-6">
                      Adjust spend constraints for Dynasty Global Holdings organization. Alerts dispatch immediately upon breach.
                    </p>
                    <div className="flex flex-col md:flex-row items-center gap-8 bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                      <div className="w-full md:w-2/3 space-y-2">
                        <div className="flex justify-between text-sm font-semibold text-zinc-700">
                          <span>Spend Cap Limit</span>
                          <span className="font-bold text-indigo-600">${activeBudget.monthlyLimit.toFixed(2)} / mo</span>
                        </div>
                        <input 
                          type="range" 
                          min="20" 
                          max="2000" 
                          step="10"
                          value={activeBudget.monthlyLimit}
                          onChange={(e) => updateBudgetLimit(parseFloat(e.target.value))}
                          className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between text-[10px] text-zinc-400">
                          <span>$20.00 Min</span>
                          <span>Alert triggers at {activeBudget.alertThreshold}% usage (${(activeBudget.monthlyLimit * (activeBudget.alertThreshold/100)).toFixed(2)})</span>
                          <span>$2,000.00 Max</span>
                        </div>
                      </div>

                      <div className="w-full md:w-1/3 text-center md:border-l md:border-zinc-200 md:pl-6 space-y-1">
                        <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Estimated Monthly Projections</div>
                        <div className="text-2xl font-black text-indigo-950">
                          ${(activeBudget.currentSpent * 2.1).toFixed(2)}
                        </div>
                        <div className="text-[10px] text-zinc-400">Based on past 15-day ledger velocity.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Audit Logs / Policy Decisions Log */}
                <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm flex flex-col h-full">
                  <h3 className="text-lg font-bold text-zinc-900 mb-2 flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-600" />
                    AI Intelligence Audit Log
                  </h3>
                  <p className="text-xs text-zinc-400 mb-4">
                    Secure trace ledger. Full policy decision trails with zero user PII leaks.
                  </p>

                  <div className="space-y-4 overflow-y-auto max-h-[380px] pr-2 flex-grow">
                    {activeAuditLogs.length === 0 ? (
                      <div className="text-center py-8 text-zinc-400 text-sm">No transaction audit history log available.</div>
                    ) : (
                      activeAuditLogs.map((log: any) => (
                        <div key={log.id} className="border-b border-zinc-100 pb-3 last:border-0 last:pb-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                                {log.agentName}
                                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold border ${
                                  log.status === 'success' 
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                    : log.status === 'blocked'
                                    ? 'bg-rose-50 text-rose-700 border-rose-100'
                                    : 'bg-amber-50 text-amber-700 border-amber-100'
                                }`}>
                                  {log.status === 'success' ? 'Auto-Approved' : log.status === 'blocked' ? 'Blocked' : 'Enqueued'}
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-500 font-mono mt-1 leading-relaxed">
                                {log.resultSummary}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-1">
                                <span>Tool: <strong className="text-zinc-600">{log.toolName}</strong></span>
                                <span>•</span>
                                <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                              </div>
                            </div>
                            {log.estimatedCost > 0 && (
                              <div className="text-right text-[10px] font-semibold text-zinc-500 font-mono">
                                +${log.estimatedCost.toFixed(5)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* 2. AGENT REGISTRY TAB */}
          {activeTab === 'agents' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side: Agent List */}
              <div className="lg:col-span-1 bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2">Central AI Agent Fleet (10)</h3>
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {state.aiAgents.map((agent: any) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgentId(agent.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                        selectedAgentId === agent.id
                          ? 'bg-indigo-50/50 border-indigo-600 shadow-sm'
                          : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200'
                      }`}
                    >
                      <div className="p-2.5 bg-white border border-zinc-200 rounded-lg shadow-sm">
                        {getAgentIcon(agent.avatar)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-zinc-800 flex items-center gap-1.5">
                          {agent.name}
                          {agent.id === 'agent_omni_assistant' && (
                            <span className="bg-indigo-100 text-indigo-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded">Core</span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5 truncate">{agent.description}</p>
                        <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-semibold text-zinc-500">
                          <span>Autonomy Level: {agent.autonomyLevel}</span>
                          <span>•</span>
                          <span>Limit: ${agent.maxMonetaryLimit}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side: Active Agent Configurer */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl shadow-sm">
                        {getAgentIcon(currentAgent.avatar)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-zinc-900">{currentAgent.name}</h3>
                        <p className="text-xs text-zinc-400">Specialist Core Type: <strong className="text-zinc-600">{currentAgent.type}</strong></p>
                      </div>
                    </div>
                    <div>
                      <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100 px-3 py-1 rounded-full">
                        Agent ID: {currentAgent.id}
                      </span>
                    </div>
                  </div>

                  {/* Settings Input Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Model selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Primary Reasoning Model</label>
                      <select
                        value={currentAgent.defaultModelId}
                        onChange={(e) => updateAgentConfig(currentAgent.id, { defaultModelId: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-sm font-semibold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {state.aiModels.map((m: any) => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Autonomy slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Agent Autonomy Level</label>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                          Level {currentAgent.autonomyLevel}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={currentAgent.autonomyLevel}
                        onChange={(e) => updateAgentConfig(currentAgent.id, { autonomyLevel: parseInt(e.target.value) })}
                        className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
                      />
                      <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                        <span>L0 (Informational)</span>
                        <span>L5 (Absolute Autonomy)</span>
                      </div>
                    </div>

                    {/* Single Transaction limit */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Single Transaction Limit (USD)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-zinc-400 text-sm font-semibold">$</span>
                        <input
                          type="number"
                          value={currentAgent.maxMonetaryLimit}
                          onChange={(e) => updateAgentConfig(currentAgent.id, { maxMonetaryLimit: parseFloat(e.target.value) || 0 })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-8 pr-4 text-sm font-semibold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <p className="text-[10px] text-zinc-400">Total fund deployment enqueuing threshold.</p>
                    </div>

                    {/* Approval threshold */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Elevated Approval Threshold (USD)</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-zinc-400 text-sm font-semibold">$</span>
                        <input
                          type="number"
                          value={currentAgent.approvalRequiredAbove}
                          onChange={(e) => updateAgentConfig(currentAgent.id, { approvalRequiredAbove: parseFloat(e.target.value) || 0 })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-8 pr-4 text-sm font-semibold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <p className="text-[10px] text-zinc-400">Amounts above this instantly enqueue in Human Approval Center.</p>
                    </div>
                  </div>

                  {/* Scopes and permissions */}
                  <div className="space-y-2 border-t border-zinc-100 pt-5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-indigo-500" />
                      Inherited Scopes & App Restrictions
                    </label>
                    <p className="text-xs text-zinc-400 mb-3">
                      This agent operates with user-delegated authorization. Scopes determine active ledger constraints.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentAgent.requiredScopes.map((scope: string) => (
                        <span key={scope} className="bg-zinc-100 text-zinc-700 text-xs font-semibold px-3 py-1 rounded-full border border-zinc-200 font-mono">
                          {scope}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Allowed tools */}
                  <div className="space-y-2 border-t border-zinc-100 pt-5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Settings className="w-4 h-4 text-indigo-500" />
                      Allowed Operations / Callable Tools
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {state.aiTools.map((tool: any) => {
                        const isAllowed = currentAgent.allowedTools.includes(tool.id);
                        return (
                          <div 
                            key={tool.id} 
                            onClick={() => {
                              const newTools = isAllowed 
                                ? currentAgent.allowedTools.filter((id: string) => id !== tool.id)
                                : [...currentAgent.allowedTools, tool.id];
                              updateAgentConfig(currentAgent.id, { allowedTools: newTools });
                            }}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                              isAllowed 
                                ? 'bg-indigo-50/20 border-indigo-200 hover:bg-indigo-50/40' 
                                : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-400'
                            }`}
                          >
                            <input 
                              type="checkbox" 
                              checked={isAllowed} 
                              onChange={() => {}} // handled by click
                              className="mt-1 accent-indigo-600 shrink-0"
                            />
                            <div>
                              <div className={`font-bold text-xs ${isAllowed ? 'text-zinc-800' : 'text-zinc-400'}`}>{tool.name}</div>
                              <p className="text-[10px] text-zinc-400 mt-0.5 leading-normal">{tool.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Base prompt configuration */}
                  <div className="space-y-1.5 border-t border-zinc-100 pt-5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">System System Instruction Template (Base Prompt)</label>
                    <textarea
                      value={currentAgent.basePrompt}
                      rows={4}
                      onChange={(e) => updateAgentConfig(currentAgent.id, { basePrompt: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs font-mono leading-relaxed text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* 3. AUTONOMY & POLICIES TAB */}
          {activeTab === 'autonomy' && (
            <div className="space-y-8">
              {/* Autonomy Level Explanation */}
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-zinc-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  OMNI Autonomy Scale (Levels 0-5)
                </h3>
                <p className="text-xs text-zinc-400 mb-6">
                  Autonomy policy defines how callable tools evaluate enqueuing rules and human-in-the-loop triggers.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-600 mx-auto text-sm">L0</div>
                    <div className="font-bold text-xs text-zinc-800 mt-2">Informational</div>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">No tool execution allowed. Read-only responses.</p>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center font-bold text-rose-600 mx-auto border border-rose-100 text-sm">L1</div>
                    <div className="font-bold text-xs text-zinc-800 mt-2">Human Loop</div>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">ALL tool calls require operator sign-off first.</p>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 mx-auto border border-indigo-100 text-sm">L2</div>
                    <div className="font-bold text-xs text-zinc-800 mt-2">Controlled</div>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">High-Risk tools require sign-off. Low-Risk runs immediately.</p>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-indigo-600 mx-auto border border-indigo-100 text-sm">L3</div>
                    <div className="font-bold text-xs text-zinc-800 mt-2">Supervised</div>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">Same as L2, but dispatches audit notifications on run.</p>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center font-bold text-emerald-600 mx-auto border border-emerald-100 text-sm">L4</div>
                    <div className="font-bold text-xs text-zinc-800 mt-2">Autonomous</div>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">Auto-approved below monetary limits.</p>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center font-bold text-amber-600 mx-auto border border-amber-100 text-sm">L5</div>
                    <div className="font-bold text-xs text-zinc-800 mt-2">Absolute</div>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">Full trust. Auto-executes any tool instantly.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Custom Rules Setup Form */}
                <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm h-fit">
                  <h3 className="text-md font-bold text-zinc-900 mb-2">Create Policy Constraint Rule</h3>
                  <p className="text-xs text-zinc-400 mb-4">Set maximum autonomy overrides for specific scope boundaries.</p>

                  <form onSubmit={handleAutonomySubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Policy Scope Context</label>
                      <select 
                        value={autoScopeType} 
                        onChange={(e: any) => {
                          setAutoScopeType(e.target.value);
                          setAutoScopeId('');
                        }}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="tenant">Tenant/Organization Scope</option>
                        <option value="app">Micro-Application Scope</option>
                        <option value="agent">Specialist Agent Scope</option>
                        <option value="tool">Individual Tool Scope</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Target identifier ID</label>
                      {autoScopeType === 'tenant' ? (
                        <select 
                          value={autoScopeId} 
                          onChange={(e) => setAutoScopeId(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="">-- Select Organization --</option>
                          {state.organizations.map((org: any) => (
                            <option key={org.id} value={org.id}>{org.name} ({org.id})</option>
                          ))}
                        </select>
                      ) : autoScopeType === 'app' ? (
                        <select 
                          value={autoScopeId} 
                          onChange={(e) => setAutoScopeId(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="">-- Select App --</option>
                          {state.apps.map((app: any) => (
                            <option key={app.id} value={app.id}>{app.name} ({app.id})</option>
                          ))}
                        </select>
                      ) : autoScopeType === 'agent' ? (
                        <select 
                          value={autoScopeId} 
                          onChange={(e) => setAutoScopeId(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="">-- Select Agent --</option>
                          {state.aiAgents.map((ag: any) => (
                            <option key={ag.id} value={ag.id}>{ag.name}</option>
                          ))}
                        </select>
                      ) : (
                        <select 
                          value={autoScopeId} 
                          onChange={(e) => setAutoScopeId(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="">-- Select Tool --</option>
                          {state.aiTools.map((t: any) => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Capped Autonomy Level</label>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          Level {autoLevel}
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="5" 
                        step="1"
                        value={autoLevel}
                        onChange={(e) => setAutoLevel(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Compliance Notes</label>
                      <input 
                        type="text" 
                        placeholder="Regulatory constraint details..."
                        value={autoNotes}
                        onChange={(e) => setAutoNotes(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-sm"
                    >
                      Enforce Policy Override
                    </button>
                  </form>
                </div>

                {/* Policy Rules Registry */}
                <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-md font-bold text-zinc-900 mb-2">Active Policy Overrides & Compliance Guardrails</h3>
                  <p className="text-xs text-zinc-400 mb-6">These rules execute during every tool-parsing invocation before Gemini API completion.</p>

                  <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-400 font-bold uppercase tracking-wider">
                          <th className="p-3.5">Scope Category</th>
                          <th className="p-3.5">Scope ID Target</th>
                          <th className="p-3.5">Max Level Allowed</th>
                          <th className="p-3.5">Compliance Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {state.aiAutonomyRules.map((rule: any) => (
                          <tr key={rule.id} className="hover:bg-zinc-50">
                            <td className="p-3.5 capitalize font-semibold text-zinc-700">{rule.scopeType} level</td>
                            <td className="p-3.5 font-mono text-indigo-600 font-semibold">{rule.scopeId}</td>
                            <td className="p-3.5">
                              <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded border border-indigo-100">
                                Level {rule.maxAutonomyLevel}
                              </span>
                            </td>
                            <td className="p-3.5 text-zinc-500 italic">{rule.notes || 'Default policy constraint'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* 4. APPROVAL CENTER TAB */}
          {activeTab === 'approvals' && (
            <div className="space-y-8">
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-zinc-900 mb-1 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  OMNI Human Approval Ledger
                </h3>
                <p className="text-xs text-zinc-400 mb-6">
                  High-risk and monetary operations enqueued by agents pending dual-factor operator sign-off.
                </p>

                <div className="space-y-6">
                  {activeApprovalTasks.length === 0 ? (
                    <div className="text-center py-12 text-zinc-400 text-sm bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
                      No enqueued verification tasks pending operator action.
                    </div>
                  ) : (
                    activeApprovalTasks.map((task: any) => (
                      <div 
                        key={task.id} 
                        className={`border rounded-xl shadow-sm overflow-hidden ${
                          task.status === 'pending' 
                            ? 'border-indigo-200 bg-indigo-50/5' 
                            : task.status === 'approved' 
                            ? 'border-emerald-200 bg-emerald-50/5' 
                            : 'border-zinc-200 bg-zinc-50/10'
                        }`}
                      >
                        {/* Task Header */}
                        <div className="bg-zinc-50/50 border-b border-zinc-200 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="bg-zinc-100 text-zinc-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                                Task ID: {task.id}
                              </span>
                              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase ${
                                task.status === 'pending'
                                  ? 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'
                                  : task.status === 'approved'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                  : 'bg-rose-50 text-rose-700 border-rose-100'
                              }`}>
                                {task.status}
                              </span>
                            </div>
                            <h4 className="font-bold text-zinc-800 text-sm mt-1.5 flex items-center gap-1.5">
                              Agent <strong>{task.agentName}</strong> enqueued action <strong>{task.toolName}</strong>
                            </h4>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs text-zinc-400">Request Date</div>
                            <div className="text-xs font-semibold text-zinc-700">{new Date(task.requestDate).toLocaleString()}</div>
                          </div>
                        </div>

                        {/* Task Content */}
                        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2 space-y-4">
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Arguments formulated by AI</span>
                              <pre className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-mono text-zinc-700 overflow-x-auto leading-relaxed">
                                {JSON.stringify(task.arguments, null, 2)}
                              </pre>
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Policy Engine Diagnostics</span>
                              <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-3.5 text-xs text-rose-900 flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="font-semibold text-rose-950">Reason: </strong>
                                  {task.policyCheckSummary}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col justify-between h-full gap-4">
                            <div className="space-y-3">
                              <div>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Estimated completion cost</span>
                                <div className="text-xl font-bold text-zinc-950 font-mono">${task.estimatedCost.toFixed(3)}</div>
                              </div>
                              {task.arguments.bidAmountUsd && (
                                <div>
                                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Ledger Impact</span>
                                  <div className="text-xl font-bold text-rose-600 font-mono">-${task.arguments.bidAmountUsd.toLocaleString()}.00</div>
                                </div>
                              )}
                              {task.decisionDate && (
                                <div className="border-t border-zinc-200 pt-3 text-[10px] text-zinc-400 space-y-0.5">
                                  <div>Operator Signed: <strong className="text-zinc-600">Gideon Oluwalana</strong></div>
                                  <div>Timestamp: <strong className="text-zinc-600">{new Date(task.decisionDate).toLocaleTimeString()}</strong></div>
                                </div>
                              )}
                            </div>

                            {task.status === 'pending' && (
                              <div className="space-y-2">
                                <button
                                  onClick={() => approveApprovalTask(task.id)}
                                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Approve & Post Action
                                </button>
                                <button
                                  onClick={() => rejectApprovalTask(task.id)}
                                  className="w-full bg-white hover:bg-zinc-100 text-zinc-700 font-semibold text-xs py-2.5 rounded-xl border border-zinc-200 transition-all flex items-center justify-center gap-1.5"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Reject & Block Call
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}


          {/* 5. RAG KNOWLEDGE BASE TAB */}
          {activeTab === 'rag' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add RAG Source Form */}
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm h-fit">
                <h3 className="text-md font-bold text-zinc-900 mb-2 flex items-center gap-1.5">
                  <Plus className="w-5 h-5 text-indigo-500" />
                  Index RAG Data Source
                </h3>
                <p className="text-xs text-zinc-400 mb-6">Register databases, documents, and web links to embed into RAG scopes.</p>

                <form onSubmit={handleRagSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Source Label / File Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. dynasty_ops_2026.pdf"
                      value={ragName}
                      onChange={(e) => setRagName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Data Pipeline Source Type</label>
                    <select 
                      value={ragType}
                      onChange={(e: any) => setRagType(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="document">PDF / Markdown Document</option>
                      <option value="database">PostgreSQL / Spanner Database Query</option>
                      <option value="website">Synchronized Public Website (URL)</option>
                      <option value="cloud_storage">Cloud Object Storage Bucket</option>
                      <option value="app_record">Unified App Transaction Ledger</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Approx Size (KB)</label>
                    <input 
                      type="number" 
                      placeholder="Size in KB"
                      value={ragSize}
                      onChange={(e) => setRagSize(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Path or URL Target</label>
                    <input 
                      type="text" 
                      placeholder="e.g., https://omni.io/docs/manual"
                      value={ragPath}
                      onChange={(e) => setRagPath(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-3 rounded-xl transition-all shadow-sm"
                  >
                    Trigger Vectorizer Sync
                  </button>
                </form>
              </div>

              {/* RAG Sources Registry */}
              <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-md font-bold text-zinc-900 mb-2">Synchronized Knowledge Vectors</h3>
                <p className="text-xs text-zinc-400 mb-6">These segmented vector spaces are consulted during model inference to avoid hallucinations.</p>

                <div className="space-y-4">
                  {state.aiKnowledgeSources.filter((s: any) => s.orgId === activeOrg?.id).map((source: any) => (
                    <div key={source.id} className="border border-zinc-200 hover:border-zinc-300 rounded-xl p-4 transition-all flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg shrink-0">
                          {source.type === 'document' ? (
                            <FileText className="w-5 h-5 text-indigo-500" />
                          ) : source.type === 'database' ? (
                            <Database className="w-5 h-5 text-teal-500" />
                          ) : (
                            <Globe className="w-5 h-5 text-sky-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-zinc-800">{source.name}</div>
                          <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                            <span className="capitalize font-semibold text-zinc-500">{source.type}</span>
                            <span>•</span>
                            <span>{source.sizeKb} KB</span>
                            <span>•</span>
                            <span>{source.chunkCount} vector chunks</span>
                          </div>
                          <p className="text-[10px] text-zinc-500 font-mono mt-1">{source.urlOrPath}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${
                          source.status === 'indexed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            : 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${source.status === 'indexed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {source.status}
                        </span>
                        
                        <button
                          onClick={() => deleteKnowledgeSource(source.id)}
                          className="text-zinc-400 hover:text-rose-600 p-1.5 hover:bg-zinc-100 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {/* 6. PROVIDERS & PROMPT REGISTRIES TAB */}
          {activeTab === 'providers' && (
            <div className="space-y-8">
              {/* Providers Status */}
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-zinc-900 mb-2 flex items-center gap-2">
                  <Key className="w-5 h-5 text-indigo-600" />
                  Provider Registry & Integrations
                </h3>
                <p className="text-xs text-zinc-400 mb-6">
                  Provider neutral adapter layers. Easily swap reasoning backends from local clusters to global APIs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {state.aiProviders.map((prov: any) => (
                    <div key={prov.id} className="border border-zinc-200 rounded-xl p-5 bg-zinc-50 flex flex-col justify-between h-44 gap-4">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sm text-zinc-800">{prov.name}</span>
                          <span className={`w-2.5 h-2.5 rounded-full ${prov.status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'}`} />
                        </div>
                        <p className="text-[11px] text-zinc-400 font-mono mt-1.5 truncate">{prov.endpointUrl}</p>
                        <div className="mt-3 text-[10px] flex items-center gap-1 text-zinc-500">
                          <Shield className="w-3.5 h-3.5 text-indigo-500" />
                          {prov.apiKeyConfigured ? 'Credential loaded' : 'Key not configured'}
                        </div>
                      </div>

                      <button
                        onClick={() => toggleProviderStatus(prov.id)}
                        className={`w-full text-center py-2 rounded-lg font-semibold text-xs border transition-all ${
                          prov.status === 'connected'
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200'
                            : 'bg-white text-zinc-800 hover:bg-zinc-100 border-zinc-200'
                        }`}
                      >
                        {prov.status === 'connected' ? 'Disconnect' : 'Connect Adapter'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Prompt Registry */}
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-zinc-900 mb-1 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  Prompt Templates Registry
                </h3>
                <p className="text-xs text-zinc-400 mb-6">Shared versioned templates mapped across application category contexts.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {state.aiPrompts.map((p: any) => (
                    <div key={p.id} className="border border-zinc-200 rounded-xl p-4 bg-zinc-50/50 flex flex-col justify-between h-56 gap-3">
                      <div>
                        <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                          <span className="font-bold text-xs text-zinc-800">{p.name}</span>
                          <span className="bg-zinc-100 text-zinc-600 text-[9px] font-bold px-2 py-0.5 rounded border border-zinc-200 font-mono">
                            v{p.version}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 capitalize font-semibold mt-1">Scope: {p.category.replace('_', ' ')}</p>
                        <p className="text-xs text-zinc-500 italic mt-2 leading-relaxed line-clamp-3">
                          "{p.template}"
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 border-t border-zinc-100 pt-3">
                        {p.variables.map((v: string) => (
                          <span key={v} className="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full border border-indigo-100 font-mono">
                            {'{' + v + '}'}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {/* 7. INTERACTIVE AGENT PLAYGROUND TAB */}
          {activeTab === 'playground' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[650px]">
              {/* Agent selector list */}
              <div className="lg:col-span-1 bg-white border border-zinc-200 rounded-xl p-4 shadow-sm flex flex-col justify-between gap-4">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Select Acting Agent</h3>
                  <div className="space-y-2 overflow-y-auto max-h-[480px] pr-1">
                    {state.aiAgents.map((ag: any) => (
                      <button
                        key={ag.id}
                        onClick={() => setSelectedAgentId(ag.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${
                          selectedAgentId === ag.id
                            ? 'bg-indigo-50/30 border-indigo-600 font-semibold'
                            : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200'
                        }`}
                      >
                        <div className="p-1.5 bg-white border border-zinc-200 rounded-lg shadow-sm">
                          {getAgentIcon(ag.avatar)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-zinc-800 truncate">{ag.name}</div>
                          <div className="text-[10px] text-zinc-400 mt-0.5 truncate">Lvl {ag.autonomyLevel} autonomy</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => clearChatHistory(selectedAgentId)}
                  className="w-full bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 py-2.5 rounded-xl text-xs font-bold transition-all"
                >
                  Reset Conversational State
                </button>
              </div>

              {/* Chat Thread */}
              <div className="lg:col-span-3 bg-white border border-zinc-200 rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
                {/* Agent Header info */}
                <div className="bg-zinc-50 border-b border-zinc-200 px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white border border-zinc-200 rounded-lg">
                      {getAgentIcon(currentAgent.avatar)}
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-800 text-sm">{currentAgent.name} Playground</h4>
                      <p className="text-[11px] text-zinc-400">{currentAgent.description}</p>
                    </div>
                  </div>
                  <div>
                    <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-indigo-100 font-mono">
                      Autonomy: Level {currentAgent.autonomyLevel}
                    </span>
                  </div>
                </div>

                {/* Messages Body */}
                <div className="flex-grow overflow-y-auto p-5 space-y-4">
                  {activeConversation.messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-zinc-400 gap-3">
                      <Sparkles className="w-10 h-10 text-indigo-400 shrink-0" />
                      <div>
                        <h4 className="font-bold text-zinc-700 text-sm">Sandbox Conversational Interface</h4>
                        <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                          Enter operational commands. Try typing <strong>"search copper wrapping"</strong> to call tools, or <strong>"create ad campaign with budget 100"</strong> to evaluate policy thresholds.
                        </p>
                      </div>
                    </div>
                  ) : (
                    activeConversation.messages.map((msg: any) => (
                      <div 
                        key={msg.id} 
                        className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role !== 'user' && (
                          <div className="p-1.5 bg-zinc-50 border border-zinc-200 rounded-lg shadow-sm">
                            {getAgentIcon(currentAgent.avatar)}
                          </div>
                        )}
                        <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed border ${
                          msg.role === 'user'
                            ? 'bg-indigo-600 text-white border-indigo-600 rounded-tr-none'
                            : 'bg-zinc-50 text-zinc-800 border-zinc-200 rounded-tl-none space-y-3'
                        }`}>
                          <div className="whitespace-pre-line font-medium">{msg.content}</div>
                          
                          {/* Render Tool Calling badges if relevant */}
                          {msg.toolName && (
                            <div className="flex items-center gap-2 mt-3 border-t border-zinc-200 pt-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                              {msg.toolStatus === 'needs_approval' ? (
                                <span className="text-amber-600 flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" /> Enqueued for Approval: {msg.toolName}
                                </span>
                              ) : msg.toolStatus === 'completed' ? (
                                <span className="text-emerald-600 flex items-center gap-1">
                                  <CheckCircle className="w-3.5 h-3.5" /> Executed tool: {msg.toolName}
                                </span>
                              ) : (
                                <span className="text-rose-600 flex items-center gap-1">
                                  <XCircle className="w-3.5 h-3.5" /> Blocked Tool: {msg.toolName}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        {msg.role === 'user' && (
                          <div className="p-1.5 bg-indigo-50 border border-indigo-200 rounded-lg shadow-sm">
                            <User className="w-4 h-4 text-indigo-600" />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Input Tray */}
                <form onSubmit={handleChatSend} className="bg-zinc-50 border-t border-zinc-200 p-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Describe transaction details, trigger RAG catalog queries..."
                    value={chatPrompt}
                    onChange={(e) => setChatPrompt(e.target.value)}
                    disabled={isSendingChat}
                    className="flex-grow bg-white border border-zinc-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    disabled={isSendingChat || !chatPrompt.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-all shadow-sm flex items-center justify-center shrink-0 disabled:opacity-50"
                  >
                    {isSendingChat ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
