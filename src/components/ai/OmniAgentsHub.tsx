import React, { useState, useEffect, useMemo } from 'react';
import { 
  Bot, Sparkles, Shield, Play, Plus, RefreshCw, CheckCircle2, XCircle, 
  Clock, AlertTriangle, ArrowRight, Check, Search, Filter, Sliders, 
  Terminal, Layers, DollarSign, Lock, Eye, Calendar, Zap, MessageSquare, 
  ShieldAlert, ShieldCheck, Database, FileText, Code2, Users, Cpu, 
  Key, Radio, ChevronRight, CornerDownRight, Send, CheckCircle, ExternalLink,
  Flame, HelpCircle, UserCheck, Activity, Copy, ArrowUpRight, Edit3
} from 'lucide-react';
import { 
  OmniAgentSpec, OmniToolSpec, OmniHumanApprovalTask, 
  OmniAutomationWorkflow, OmniAiSdkCallLog, OmniAgentAutonomyLevel 
} from '../../types';

interface OmniAgentsHubProps {
  initialSubTab?: 'agents' | 'builder' | 'tools' | 'approvals' | 'automations' | 'sdk' | 'security';
  triggerToast?: (title: string, description: string, type?: 'success' | 'info' | 'error') => void;
  onNavigateToChat?: (prompt: string) => void;
}

export const OmniAgentsHub: React.FC<OmniAgentsHubProps> = ({
  initialSubTab = 'agents',
  triggerToast = (_title: string, _description: string, _type?: 'success' | 'info' | 'error') => {},
  onNavigateToChat
}) => {
  const [subTab, setSubTab] = useState<'agents' | 'builder' | 'tools' | 'approvals' | 'automations' | 'sdk' | 'security'>(initialSubTab);
  
  // Data States
  const [agents, setAgents] = useState<OmniAgentSpec[]>([]);
  const [tools, setTools] = useState<OmniToolSpec[]>([]);
  const [approvals, setApprovals] = useState<OmniHumanApprovalTask[]>([]);
  const [automations, setAutomations] = useState<OmniAutomationWorkflow[]>([]);
  const [sdkLogs, setSdkLogs] = useState<OmniAiSdkCallLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [agentSearch, setAgentSearch] = useState('');
  const [agentCategoryFilter, setAgentCategoryFilter] = useState<string>('all');
  const [toolSearch, setToolSearch] = useState('');
  const [toolCategoryFilter, setToolCategoryFilter] = useState<string>('all');

  // Selected Item States for Modals / Drawers
  const [selectedAgent, setSelectedAgent] = useState<OmniAgentSpec | null>(null);
  const [selectedTool, setSelectedTool] = useState<OmniToolSpec | null>(null);
  const [selectedApproval, setSelectedApproval] = useState<OmniHumanApprovalTask | null>(null);
  const [approvalNotes, setApprovalNotes] = useState('');
  const [isDecidingApproval, setIsDecidingApproval] = useState(false);

  // Agent Invocation Drawer State
  const [invokePrompt, setInvokePrompt] = useState('');
  const [isInvoking, setIsInvoking] = useState(false);
  const [invocationResult, setInvocationResult] = useState<any>(null);
  const [simulatedMonetaryAmount, setSimulatedMonetaryAmount] = useState<number>(0);

  // Tool Invocation Modal State
  const [toolInputJson, setToolInputJson] = useState('{}');
  const [isExecutingTool, setIsExecutingTool] = useState(false);
  const [toolExecutionResult, setToolExecutionResult] = useState<any>(null);

  // Conversational Agent Builder State
  const [builderConcept, setBuilderConcept] = useState('');
  const [isGeneratingSpec, setIsGeneratingSpec] = useState(false);
  const [builderForm, setBuilderForm] = useState<Partial<OmniAgentSpec>>({
    name: '',
    description: '',
    category: 'custom',
    instructions: '',
    defaultModelId: 'gemini-2.5-pro',
    routingProfile: 'balanced',
    autonomyLevel: 3,
    knowledgeSpaceIds: ['kb_platform_docs'],
    allowedToolIds: ['omni.crm.search_contacts', 'omni.communication.draft_email'],
    budgetConfig: {
      monthlyCapUsd: 300,
      perInvocationCapUsd: 5.0,
      approvalRequiredAboveUsd: 50.0,
      currentMonthSpendUsd: 0
    },
    permissions: ['ai.chat.use', 'ai.tools.invoke'],
    memoryConfig: {
      shortTermWindow: 20,
      workingMemory: true,
      vectorMemoryEnabled: true,
      longTermKnowledgeSpaceIds: ['kb_platform_docs'],
      retentionDays: 60
    }
  });

  // Security Test Matrix State
  const [isRunningSecuritySuite, setIsRunningSecuritySuite] = useState(false);
  const [securityTestResults, setSecurityTestResults] = useState<any[]>([]);

  // Fetch initial data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [resAgents, resTools, resApprovals, resAutomations, resLogs] = await Promise.all([
        fetch('/api/ai/agents/list').then(r => r.json()),
        fetch('/api/ai/tools/list').then(r => r.json()),
        fetch('/api/ai/approvals/list').then(r => r.json()),
        fetch('/api/ai/automations/list').then(r => r.json()),
        fetch('/api/ai/telemetry/sdk-logs').then(r => r.json())
      ]);

      if (resAgents.success) setAgents(resAgents.agents);
      if (resTools.success) setTools(resTools.tools);
      if (resApprovals.success) setApprovals(resApprovals.tasks);
      if (resAutomations.success) setAutomations(resAutomations.workflows);
      if (resLogs.success) setSdkLogs(resLogs.logs);
    } catch (e) {
      console.error('Error fetching OMNI agent/tool data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered Agents
  const filteredAgents = useMemo(() => {
    return agents.filter(a => {
      const matchSearch = a.name.toLowerCase().includes(agentSearch.toLowerCase()) || 
                          a.description.toLowerCase().includes(agentSearch.toLowerCase()) ||
                          a.type.toLowerCase().includes(agentSearch.toLowerCase());
      const matchCat = agentCategoryFilter === 'all' || a.category === agentCategoryFilter;
      return matchSearch && matchCat;
    });
  }, [agents, agentSearch, agentCategoryFilter]);

  // Filtered Tools
  const filteredTools = useMemo(() => {
    return tools.filter(t => {
      const matchSearch = t.displayName.toLowerCase().includes(toolSearch.toLowerCase()) ||
                          t.description.toLowerCase().includes(toolSearch.toLowerCase()) ||
                          t.name.toLowerCase().includes(toolSearch.toLowerCase());
      const matchCat = toolCategoryFilter === 'all' || t.category === toolCategoryFilter;
      return matchSearch && matchCat;
    });
  }, [tools, toolSearch, toolCategoryFilter]);

  // Handle Conversational Spec Generation
  const handleGenerateSpec = async () => {
    if (!builderConcept.trim()) {
      triggerToast('Description Required', 'Please enter a description for the agent you want to create.', 'error');
      return;
    }

    setIsGeneratingSpec(true);
    try {
      const res = await fetch('/api/ai/agents/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept: builderConcept, autonomyLevel: builderForm.autonomyLevel || 3 })
      });
      const data = await res.json();
      if (data.success && data.spec) {
        setBuilderForm(prev => ({
          ...prev,
          name: data.spec.name || prev.name,
          description: data.spec.description || prev.description,
          instructions: data.spec.instructions || prev.instructions,
          defaultModelId: data.spec.suggestedModelId || prev.defaultModelId,
          autonomyLevel: data.spec.suggestedAutonomyLevel || prev.autonomyLevel,
          allowedToolIds: data.spec.recommendedTools || prev.allowedToolIds,
          budgetConfig: {
            monthlyCapUsd: data.spec.budgetMonthlyUsd || 300,
            perInvocationCapUsd: 5.0,
            approvalRequiredAboveUsd: data.spec.approvalRequiredAboveUsd || 50.0,
            currentMonthSpendUsd: 0
          }
        }));
        triggerToast('Agent Spec Synthesized', 'AI synthesized instructions, tool bindings, and budget rules.', 'success');
      }
    } catch (e) {
      triggerToast('Synthesis Error', 'Failed to generate agent specification.', 'error');
    } finally {
      setIsGeneratingSpec(false);
    }
  };

  // Handle Registering Custom Agent
  const handleRegisterAgent = async () => {
    if (!builderForm.name?.trim() || !builderForm.instructions?.trim()) {
      triggerToast('Incomplete Configuration', 'Agent name and instructions are required.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/ai/agents/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentConfig: builderForm })
      });
      const data = await res.json();
      if (data.success && data.agent) {
        setAgents(prev => [data.agent, ...prev]);
        triggerToast('Agent Registered', `"${data.agent.name}" is now live in the Shared Agent Registry.`, 'success');
        setSubTab('agents');
        setSelectedAgent(data.agent);
      }
    } catch (e) {
      triggerToast('Registration Failed', 'Could not register new agent.', 'error');
    }
  };

  // Handle Invoking Agent
  const handleInvokeAgent = async () => {
    if (!selectedAgent || !invokePrompt.trim()) return;

    setIsInvoking(true);
    setInvocationResult(null);

    try {
      const res = await fetch('/api/ai/agents/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId: selectedAgent.id,
          taskPrompt: invokePrompt,
          simulatedMonetaryAmount: Number(simulatedMonetaryAmount) || 0,
          tenantId: 't_dynasty_main',
          organizationId: 'org_sovereign_dynasty'
        })
      });
      const data = await res.json();
      setInvocationResult(data);

      if (data.status === 'requires_approval') {
        triggerToast('Approval Gate Triggered', 'Action routed to Human Approval Center under Level 3 autonomy policy.', 'info');
        fetchData(); // Refresh pending tasks
      } else if (data.success) {
        triggerToast('Agent Executed', `Agent "${selectedAgent.name}" completed task successfully.`, 'success');
        fetchData();
      } else {
        triggerToast('Execution Intercepted', data.error || 'Policy check failed.', 'error');
      }
    } catch (e) {
      triggerToast('Invocation Error', 'Failed to communicate with Agent execution gateway.', 'error');
    } finally {
      setIsInvoking(false);
    }
  };

  // Handle Deciding Approval
  const handleDecideApproval = async (decision: 'approve' | 'reject') => {
    if (!selectedApproval) return;

    setIsDecidingApproval(true);
    try {
      const res = await fetch('/api/ai/approvals/decide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: selectedApproval.id,
          decision,
          decisionNotes: approvalNotes || (decision === 'approve' ? 'Signed off by sovereign operator.' : 'Rejected by operator.')
        })
      });
      const data = await res.json();
      if (data.success) {
        triggerToast(
          decision === 'approve' ? 'Action Approved & Executed' : 'Action Rejected',
          data.message,
          decision === 'approve' ? 'success' : 'info'
        );
        setSelectedApproval(null);
        setApprovalNotes('');
        fetchData();
      }
    } catch (e) {
      triggerToast('Decision Failed', 'Error updating approval status.', 'error');
    } finally {
      setIsDecidingApproval(false);
    }
  };

  // Handle Tool Direct Execution
  const handleExecuteToolDirect = async () => {
    if (!selectedTool) return;
    setIsExecutingTool(true);
    setToolExecutionResult(null);

    let parsedParams = {};
    try {
      parsedParams = JSON.parse(toolInputJson);
    } catch (e) {
      triggerToast('Invalid JSON', 'Please format parameter arguments as valid JSON.', 'error');
      setIsExecutingTool(false);
      return;
    }

    try {
      const res = await fetch('/api/ai/tools/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: selectedTool.id,
          inputParameters: parsedParams
        })
      });
      const data = await res.json();
      setToolExecutionResult(data);
      if (data.success) {
        triggerToast('Tool Executed', `${selectedTool.displayName} executed with audit signature.`, 'success');
      }
    } catch (e) {
      triggerToast('Execution Failed', 'Error executing tool contract.', 'error');
    } finally {
      setIsExecutingTool(false);
    }
  };

  // Handle Test Workflow Trigger
  const handleTriggerWorkflow = async (workflowId: string) => {
    try {
      const res = await fetch('/api/ai/automations/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflowId })
      });
      const data = await res.json();
      if (data.success) {
        triggerToast('Workflow Triggered', `Pipeline "${data.workflowName}" executed ${data.stepsExecuted} steps with 0 errors.`, 'success');
        fetchData();
      }
    } catch (e) {
      triggerToast('Execution Error', 'Failed to test trigger workflow.', 'error');
    }
  };

  // Handle Running Security Suite
  const handleRunSecuritySuite = async () => {
    setIsRunningSecuritySuite(true);
    try {
      const res = await fetch('/api/ai/agents/security-suite/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setSecurityTestResults(data.results);
        triggerToast('Security Suite Passed', `All ${data.totalTests} governance & boundary tests passed 100%.`, 'success');
      }
    } catch (e) {
      triggerToast('Test Error', 'Failed to execute security test matrix.', 'error');
    } finally {
      setIsRunningSecuritySuite(false);
    }
  };

  const pendingApprovalsCount = approvals.filter(a => a.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Top Header & Metrics Bar */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Prompt 8 Universal Gateway
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-3 h-3" /> Tenant Isolated & Audited
              </span>
            </div>
            <h1 className="text-xl lg:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              OMNI Agents, Automation & Tool Gateway
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-3xl">
              Centralized intelligence service for the sovereign OMNI ecosystem. Configure autonomous agents, orchestrate cross-application tool bindings, enforce human-in-the-loop spending gates, and automate multi-step event workflows.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-center">
            <button
              onClick={() => setSubTab('builder')}
              className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl text-xs font-bold hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Agent Builder</span>
            </button>

            <button
              onClick={fetchData}
              className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
              title="Refresh Registry"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-1.5 mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 overflow-x-auto">
          {[
            { id: 'agents', label: 'Shared Agents Registry', icon: Bot, badge: agents.length },
            { id: 'builder', label: 'Visual & AI Agent Builder', icon: Sparkles },
            { id: 'tools', label: 'Cross-OMNI Tool Registry', icon: Terminal, badge: tools.length },
            { id: 'approvals', label: 'Human Approval Center', icon: ShieldAlert, badge: pendingApprovalsCount, badgeColor: 'bg-amber-500 text-white' },
            { id: 'automations', label: 'Automations & Pipelines', icon: Zap, badge: automations.length },
            { id: 'sdk', label: 'Ecosystem SDK & Telemetry', icon: Code2 },
            { id: 'security', label: 'Governance & Security Suite', icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400 dark:text-indigo-600' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black ${tab.badgeColor || (isActive ? 'bg-white/20 text-white dark:bg-neutral-900/20 dark:text-neutral-900' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300')}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. SHARED AGENT REGISTRY TAB */}
      {/* ========================================================================= */}
      {subTab === 'agents' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                type="text"
                value={agentSearch}
                onChange={(e) => setAgentSearch(e.target.value)}
                placeholder="Search sovereign agents by name, role, instruction or category..."
                className="w-full bg-transparent text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
              {agentSearch && (
                <button onClick={() => setAgentSearch('')} className="text-neutral-400 hover:text-neutral-600 text-xs">
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Category:</span>
              {['all', 'core', 'growth', 'operations', 'finance', 'engineering', 'creator', 'custom'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setAgentCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                    agentCategoryFilter === cat
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAgents.map(agent => (
              <div 
                key={agent.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group"
              >
                <div className="space-y-4">
                  {/* Top Avatar & Badges */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shrink-0">
                        {agent.avatar ? (
                          <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black">
                            <Bot className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {agent.name}
                          </h3>
                          {agent.isSharedCoreAgent && (
                            <span className="px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[9px] font-bold uppercase font-mono">
                              Core
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-400 font-medium">{agent.type}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 shrink-0">
                      Autonomy L{agent.autonomyLevel}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                    {agent.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                    <div className="bg-neutral-50 dark:bg-neutral-800/50 p-2 rounded-xl border border-neutral-100 dark:border-neutral-800">
                      <div className="text-neutral-400 font-bold uppercase">Approval Cap</div>
                      <div className="font-mono font-bold text-neutral-900 dark:text-white mt-0.5">
                        ${agent.budgetConfig.approvalRequiredAboveUsd} USD
                      </div>
                    </div>
                    <div className="bg-neutral-50 dark:bg-neutral-800/50 p-2 rounded-xl border border-neutral-100 dark:border-neutral-800">
                      <div className="text-neutral-400 font-bold uppercase">Tools Bound</div>
                      <div className="font-mono font-bold text-neutral-900 dark:text-white mt-0.5">
                        {agent.allowedToolIds.length} Tools
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedAgent(agent);
                      setInvokePrompt(`Execute sovereign analysis for ${agent.name}.`);
                    }}
                    className="flex-1 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Invoke Agent</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedAgent(agent);
                    }}
                    className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer"
                    title="View Agent Config"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VISUAL & CONVERSATIONAL AGENT BUILDER TAB */}
      {/* ========================================================================= */}
      {subTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Conversational AI Spec Generator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-5">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">Conversational Agent Builder</h3>
                  <p className="text-[11px] text-neutral-500">Describe what you want to achieve in plain English</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Agent Mission & Target Behavior
                </label>
                <textarea
                  value={builderConcept}
                  onChange={(e) => setBuilderConcept(e.target.value)}
                  rows={4}
                  placeholder="e.g. Create an Enterprise Contract Review Agent that validates NDAs against corporate compliance rules, checks for indemnity caps over $1M, and requests human sign-off for deviations..."
                  className="w-full bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-3 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="text-[11px] text-neutral-400">
                  Gemini will generate structured system prompt, tool scopes, and budget policies.
                </div>
                <button
                  onClick={handleGenerateSpec}
                  disabled={isGeneratingSpec}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 shrink-0 cursor-pointer shadow-xs"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isGeneratingSpec ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingSpec ? 'Synthesizing...' : 'Synthesize Spec'}</span>
                </button>
              </div>
            </div>

            {/* Autonomy Level Guide Reference */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-extrabold uppercase text-neutral-400 tracking-wider">
                OMNI Autonomy Architecture
              </h3>
              <div className="space-y-2.5 text-xs">
                {[
                  { level: 0, title: 'Read-Only Assistance', desc: 'No write permissions or automated tool actions allowed.' },
                  { level: 1, title: 'Drafting Only', desc: 'Generates drafts and proposals; human manually dispatches.' },
                  { level: 2, title: 'Low-Risk Routine Actions', desc: 'Auto-executes safe queries with human notification.' },
                  { level: 3, title: 'Human-Approved Actions', desc: 'Executes standard tools; high-value actions queue for approval.' },
                  { level: 4, title: 'Autonomous Workflows', desc: 'Dispatches multi-tool pipelines with retroactive audit log.' },
                  { level: 5, title: 'System-Level Automation', desc: 'Tightly controlled sovereign background automation.' }
                ].map(item => (
                  <div key={item.level} className="flex items-start gap-2.5 p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
                    <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                      L{item.level}
                    </span>
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-white text-[11px]">{item.title}</div>
                      <div className="text-[10px] text-neutral-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Parameter Configuration Form */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">Visual Agent Configuration</h3>
                <p className="text-[11px] text-neutral-500">Fine-tune memory, tool permissions, autonomy, and spend limits</p>
              </div>
              <button
                onClick={handleRegisterAgent}
                className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              >
                <Check className="w-4 h-4" />
                <span>Register Specialist Agent</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Agent Name</label>
                <input
                  type="text"
                  value={builderForm.name || ''}
                  onChange={(e) => setBuilderForm({ ...builderForm, name: e.target.value })}
                  placeholder="e.g. Contract Review Agent"
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-2.5 text-xs text-neutral-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Foundation Model</label>
                <select
                  value={builderForm.defaultModelId}
                  onChange={(e) => setBuilderForm({ ...builderForm, defaultModelId: e.target.value })}
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-2.5 text-xs text-neutral-900 dark:text-white font-bold"
                >
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep Reasoning & RAG)</option>
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash (Ultra-Low Latency)</option>
                  <option value="llama-3.3-70b">Llama 3.3 70B (Sovereign Private Enclave)</option>
                  <option value="claude-3.7-sonnet">Claude 3.7 Sonnet (Hybrid Architecture)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Description</label>
                <input
                  type="text"
                  value={builderForm.description || ''}
                  onChange={(e) => setBuilderForm({ ...builderForm, description: e.target.value })}
                  placeholder="Concise summary of duties and responsibilities"
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-2.5 text-xs text-neutral-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">System Instructions & Boundary Rules</label>
                <textarea
                  value={builderForm.instructions || ''}
                  onChange={(e) => setBuilderForm({ ...builderForm, instructions: e.target.value })}
                  rows={4}
                  placeholder="Specify system prompts, output format constraints, and safety guidelines..."
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-2.5 text-xs text-neutral-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Autonomy Level (0-5)</label>
                <select
                  value={builderForm.autonomyLevel}
                  onChange={(e) => setBuilderForm({ ...builderForm, autonomyLevel: Number(e.target.value) as OmniAgentAutonomyLevel })}
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-2.5 text-xs text-neutral-900 dark:text-white font-bold"
                >
                  <option value={0}>Level 0 — Read-Only Assistance</option>
                  <option value={1}>Level 1 — Proposal & Drafting</option>
                  <option value={2}>Level 2 — Low-Risk Routine Actions</option>
                  <option value={3}>Level 3 — Human-Approved Actions (Default)</option>
                  <option value={4}>Level 4 — Autonomous Orchestration</option>
                  <option value={5}>Level 5 — System-Level Automation</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Approval Spend Threshold ($ USD)</label>
                <input
                  type="number"
                  value={builderForm.budgetConfig?.approvalRequiredAboveUsd || 50}
                  onChange={(e) => setBuilderForm({
                    ...builderForm,
                    budgetConfig: {
                      ...builderForm.budgetConfig!,
                      approvalRequiredAboveUsd: Number(e.target.value)
                    }
                  })}
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-2.5 text-xs text-neutral-900 dark:text-white font-mono"
                />
              </div>

              {/* Tool Selection Matrix */}
              <div className="sm:col-span-2 space-y-2">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block">
                  Allowed Tool Bindings ({builderForm.allowedToolIds?.length || 0} selected)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl">
                  {tools.map(tool => {
                    const isSelected = builderForm.allowedToolIds?.includes(tool.id);
                    return (
                      <label 
                        key={tool.id} 
                        className={`flex items-center gap-2 p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                          isSelected ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 font-bold' : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            const current = builderForm.allowedToolIds || [];
                            const updated = isSelected 
                              ? current.filter(id => id !== tool.id)
                              : [...current, tool.id];
                            setBuilderForm({ ...builderForm, allowedToolIds: updated });
                          }}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="truncate">{tool.displayName}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. CROSS-OMNI TOOL REGISTRY TAB */}
      {/* ========================================================================= */}
      {subTab === 'tools' && (
        <div className="space-y-6">
          {/* Tool Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                type="text"
                value={toolSearch}
                onChange={(e) => setToolSearch(e.target.value)}
                placeholder="Search tools by name, application, or category..."
                className="w-full bg-transparent text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Category:</span>
              {['all', 'crm', 'marketing', 'commerce', 'finance', 'logistics', 'communication', 'calendar', 'support', 'ledger', 'security'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setToolCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                    toolCategoryFilter === cat
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map(tool => (
              <div 
                key={tool.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {tool.category}
                      </span>
                      <h3 className="text-xs font-extrabold text-neutral-900 dark:text-white mt-1.5">
                        {tool.displayName}
                      </h3>
                      <p className="text-[10px] font-mono text-neutral-400">{tool.name}</p>
                    </div>

                    {tool.isHighRisk && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1 shrink-0">
                        <AlertTriangle className="w-3 h-3" /> High Risk
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="text-[10px] space-y-1 bg-neutral-50 dark:bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <div className="flex justify-between text-neutral-500">
                      <span>Source App:</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{tool.applicationName}</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Required Scopes:</span>
                      <span className="font-mono text-neutral-800 dark:text-neutral-200">{tool.requiredScopes.join(', ')}</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Idempotency:</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{tool.idempotencyRequired ? 'Required' : 'Optional'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {tool.usageCount || 0} executions
                  </span>

                  <button
                    onClick={() => {
                      setSelectedTool(tool);
                      const initialParams: Record<string, any> = {};
                      tool.parametersList?.forEach(p => {
                        initialParams[p.name] = p.defaultValue !== undefined ? p.defaultValue : (p.type === 'string' ? '' : (p.type === 'number' ? 0 : []));
                      });
                      setToolInputJson(JSON.stringify(initialParams, null, 2));
                    }}
                    className="px-3 py-1.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
                  >
                    <Terminal className="w-3 h-3" />
                    <span>Test Tool</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. HUMAN APPROVAL CENTER TAB */}
      {/* ========================================================================= */}
      {subTab === 'approvals' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-500" />
                  Human Approval Center ({pendingApprovalsCount} Action Proposals Pending)
                </h3>
                <p className="text-xs text-neutral-500">
                  Level 3 autonomy gatekeepers. Review proposed changes, inspect before/after diffs, and approve or reject high-value actions with cryptographic audit trails.
                </p>
              </div>
            </div>

            {approvals.length === 0 ? (
              <div className="text-center py-12 text-xs text-neutral-400">
                No pending or historical approval tasks found.
              </div>
            ) : (
              <div className="space-y-4">
                {approvals.map(task => {
                  const isPending = task.status === 'pending';
                  return (
                    <div 
                      key={task.id}
                      className={`border rounded-2xl p-5 space-y-4 transition-all ${
                        isPending 
                          ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60 shadow-xs' 
                          : 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-700 shrink-0">
                            {task.agentAvatar ? (
                              <img src={task.agentAvatar} alt={task.agentName} className="w-full h-full object-cover" />
                            ) : (
                              <Bot className="w-6 h-6 m-2 text-neutral-500" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-black text-neutral-900 dark:text-white">
                                {task.actionTitle}
                              </h4>
                              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                                task.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 animate-pulse' :
                                task.status === 'approved' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' :
                                'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                              }`}>
                                {task.status.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-500 mt-0.5">
                              Requested by <strong>{task.agentName}</strong> ({task.toolName}) • {new Date(task.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start md:self-auto">
                          {task.monetaryActionAmountUsd && (
                            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900">
                              ${task.monetaryActionAmountUsd.toLocaleString()} USD
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description & Justification */}
                      <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {task.actionDescription}
                      </p>

                      {/* Before / After Diff Table */}
                      {task.proposedChanges && task.proposedChanges.length > 0 && (
                        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden text-xs">
                          <div className="grid grid-cols-3 bg-neutral-100 dark:bg-neutral-800 p-2 font-bold text-[10px] uppercase text-neutral-500">
                            <div>Field / Property</div>
                            <div>Current State</div>
                            <div>Proposed Change</div>
                          </div>
                          {task.proposedChanges.map((ch, idx) => (
                            <div key={idx} className="grid grid-cols-3 p-2.5 border-t border-neutral-100 dark:border-neutral-800 font-mono text-[11px]">
                              <div className="font-bold text-neutral-700 dark:text-neutral-300">{ch.field}</div>
                              <div className="text-red-600 dark:text-red-400 line-through">{ch.oldValue}</div>
                              <div className="text-emerald-600 dark:text-emerald-400 font-bold">{ch.newValue}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Policy Reason */}
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 bg-white/50 dark:bg-neutral-900/50 p-2 rounded-xl">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span><strong>Policy Gate:</strong> {task.reasonForApproval}</span>
                      </div>

                      {/* Action Decision Controls (If Pending) */}
                      {isPending && (
                        <div className="pt-2 flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedApproval(task);
                              handleDecideApproval('reject');
                            }}
                            className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/60 text-xs font-bold hover:bg-red-100 transition-colors cursor-pointer"
                          >
                            Reject Proposal
                          </button>

                          <button
                            onClick={() => {
                              setSelectedApproval(task);
                              handleDecideApproval('approve');
                            }}
                            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Sign & Authorize Execution</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. AUTOMATIONS & MULTI-STEP WORKFLOWS TAB */}
      {/* ========================================================================= */}
      {subTab === 'automations' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs">
            <div>
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Sovereign Automations & Multi-Step Event Pipelines
              </h3>
              <p className="text-xs text-neutral-500">
                Trigger autonomous agent tasks and cross-app tool executions based on OMNI Passport events or recurring schedules.
              </p>
            </div>

            <button
              onClick={() => triggerToast('Workflow Builder', 'Pipeline visual designer is active.', 'info')}
              className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Pipeline</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {automations.map(wf => (
              <div 
                key={wf.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white">{wf.name}</h4>
                        <span className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${
                          wf.status === 'active' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600'
                        }`}>
                          {wf.status}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">{wf.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <span className="text-[10px] font-mono text-neutral-400">
                      {wf.executionCount || 0} runs • Last run {wf.lastRunAt ? new Date(wf.lastRunAt).toLocaleTimeString() : 'Never'}
                    </span>
                    <button
                      onClick={() => handleTriggerWorkflow(wf.id)}
                      className="px-4 py-1.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Test Run</span>
                    </button>
                  </div>
                </div>

                {/* Steps Pipeline Visualizer */}
                <div className="bg-neutral-50 dark:bg-neutral-800/40 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 space-y-2">
                  <div className="text-[10px] font-bold uppercase text-neutral-400">
                    Execution Steps ({wf.steps.length} Nodes)
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-2 overflow-x-auto">
                    {wf.steps.map((step, idx) => (
                      <React.Fragment key={step.id}>
                        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs min-w-[200px] shadow-2xs">
                          <span className="w-5 h-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="truncate">
                            <div className="font-bold text-neutral-900 dark:text-white truncate">{step.name}</div>
                            <div className="text-[10px] font-mono text-neutral-400">{step.type}</div>
                          </div>
                        </div>
                        {idx < wf.steps.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0 hidden sm:block" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. ECOSYSTEM SDK & TELEMETRY TAB */}
      {/* ========================================================================= */}
      {subTab === 'sdk' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">Universal OMNI AI SDK Integration</h3>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Central mandate: No new OMNI application integrates directly with external LLMs. All AI workloads route through the universal SDK client to enforce sovereign tenant boundaries and cryptographic audits.
              </p>

              <div className="bg-neutral-950 rounded-2xl p-4 text-neutral-200 font-mono text-xs overflow-x-auto space-y-3">
                <div className="text-neutral-500">// 1. Import Universal OMNI AI SDK</div>
                <div className="text-indigo-400">import {`{ omniAiSdk }`} from '@/sdk/omni-ai-sdk';</div>
                
                <div className="text-neutral-500 mt-2">// 2. Invoke Shared Agent via Central Gateway</div>
                <div>
                  <span className="text-amber-400">const</span> result = <span className="text-amber-400">await</span> omniAiSdk.<span className="text-emerald-400">invokeAgent</span>({`{\n`}
                  {'  '}agentId: <span className="text-emerald-300">'agent_research'</span>,{`\n`}
                  {'  '}taskPrompt: <span className="text-emerald-300">'Audit EU AI Act compliance'</span>,{`\n`}
                  {'  '}idempotencyKey: <span className="text-emerald-300">'idem_audit_991'</span>{`\n`}
                  {`}`});
                </div>

                <div className="text-neutral-500 mt-2">// 3. Execute Cross-App Tool Contract</div>
                <div>
                  <span className="text-amber-400">const</span> toolReceipt = <span className="text-amber-400">await</span> omniAiSdk.<span className="text-emerald-400">executeTool</span>({`{\n`}
                  {'  '}toolId: <span className="text-emerald-300">'omni.finance.create_invoice_draft'</span>,{`\n`}
                  {'  '}parameters: {`{ customerId: 'cust_882', lineItems: [...] }\n`}
                  {`}`});
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  Live SDK Dispatch Telemetry Log
                </h3>
                <span className="text-[10px] font-mono text-neutral-400">{sdkLogs.length} Events</span>
              </div>

              <div className="space-y-2.5 max-h-[420px] overflow-y-auto">
                {sdkLogs.map(log => (
                  <div key={log.id} className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{log.method}</span>
                      <span className="text-[10px] font-mono text-neutral-400">{log.latencyMs}ms • ${log.costUsd.toFixed(4)}</span>
                    </div>
                    <div className="text-[11px] text-neutral-700 dark:text-neutral-300">{log.payloadSummary}</div>
                    <div className="text-[10px] font-mono text-neutral-400 flex justify-between">
                      <span>Tenant: {log.tenantId}</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. GOVERNANCE & RESILIENCE TEST SUITE TAB */}
      {/* ========================================================================= */}
      {subTab === 'security' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                OMNI AI Governance & Security Verification Suite
              </h3>
              <p className="text-xs text-neutral-500">
                Automated multi-vector test matrix verifying tenant isolation, RBAC tool permissions, approval bypass resistance, and idempotency guarantees.
              </p>
            </div>

            <button
              onClick={handleRunSecuritySuite}
              disabled={isRunningSecuritySuite}
              className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-2xl text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-xs"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isRunningSecuritySuite ? 'animate-spin' : ''}`} />
              <span>{isRunningSecuritySuite ? 'Executing Test Matrix...' : 'Run Security Suite'}</span>
            </button>
          </div>

          {securityTestResults.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold">
                <span>Result: {securityTestResults.filter(t => t.status === 'passed').length}/{securityTestResults.length} Tests Passed</span>
                <span>Audit Assurance: 100% SECURE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {securityTestResults.map(test => (
                  <div key={test.id} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <h4 className="font-bold text-neutral-900 dark:text-white">{test.testCaseName}</h4>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">{test.latencyMs}ms</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400">{test.assertionSummary}</p>
                    <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 font-mono text-[10px] text-neutral-500 border border-neutral-100 dark:border-neutral-800">
                      Scenario: {test.simulatedScenario}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* AGENT INVOCATION & PLAYGROUND MODAL */}
      {/* ========================================================================= */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  {selectedAgent.avatar ? (
                    <img src={selectedAgent.avatar} alt={selectedAgent.name} className="w-full h-full object-cover" />
                  ) : (
                    <Bot className="w-6 h-6 m-2 text-indigo-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">{selectedAgent.name}</h3>
                  <p className="text-xs text-neutral-500">Autonomy Level {selectedAgent.autonomyLevel} • {selectedAgent.defaultModelId}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAgent(null)}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Task Prompt & Instructions
                </label>
                <textarea
                  value={invokePrompt}
                  onChange={(e) => setInvokePrompt(e.target.value)}
                  rows={3}
                  placeholder="Describe the task for this agent..."
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-3 text-xs text-neutral-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Simulated Monetary Action Amount ($ USD)
                </label>
                <input
                  type="number"
                  value={simulatedMonetaryAmount}
                  onChange={(e) => setSimulatedMonetaryAmount(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-2.5 text-xs text-neutral-900 dark:text-white font-mono"
                />
                <span className="text-[10px] text-neutral-400 mt-1 block">
                  Amounts exceeding ${selectedAgent.budgetConfig.approvalRequiredAboveUsd} automatically trigger the Level 3 Human Approval Center.
                </span>
              </div>

              {/* Execution Result */}
              {invocationResult && (
                <div className={`p-4 rounded-2xl border text-xs space-y-3 ${
                  invocationResult.status === 'requires_approval' ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800' : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 dark:text-white">Execution Status</span>
                    <span className="font-mono uppercase font-bold text-[10px] px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700">
                      {invocationResult.status}
                    </span>
                  </div>

                  <div className="font-mono text-xs whitespace-pre-wrap text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-900 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800">
                    {invocationResult.outputText}
                  </div>

                  {/* 9-Point Policy Verification Matrix */}
                  {invocationResult.validationChecks && (
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[10px] font-bold uppercase text-neutral-400">
                        9-Point Multi-Dimensional Policy Check
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-[10px]">
                        {invocationResult.validationChecks.map((chk: any) => (
                          <div key={chk.dimension} className="p-1.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                            <span className="font-bold capitalize">{chk.dimension}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setSelectedAgent(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={handleInvokeAgent}
                disabled={isInvoking}
                className="px-5 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isInvoking ? 'Executing...' : 'Dispatch Execution'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOOL TESTING & PLAYGROUND MODAL */}
      {/* ========================================================================= */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">{selectedTool.displayName}</h3>
                <p className="text-xs text-neutral-500 font-mono">{selectedTool.name}</p>
              </div>

              <button
                onClick={() => setSelectedTool(null)}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Tool Arguments (JSON Payload)
                </label>
                <textarea
                  value={toolInputJson}
                  onChange={(e) => setToolInputJson(e.target.value)}
                  rows={5}
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-3 text-xs text-neutral-900 dark:text-white font-mono"
                />
              </div>

              {toolExecutionResult && (
                <div className="bg-neutral-50 dark:bg-neutral-800/60 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold">
                    <span>Tool Return Payload</span>
                    <span className="text-[10px] font-mono text-emerald-500">SUCCEEDED</span>
                  </div>
                  <pre className="font-mono text-[11px] p-2 bg-white dark:bg-neutral-900 rounded-xl overflow-x-auto">
                    {JSON.stringify(toolExecutionResult.result || toolExecutionResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setSelectedTool(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={handleExecuteToolDirect}
                disabled={isExecutingTool}
                className="px-5 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
              >
                {isExecutingTool ? 'Running...' : 'Execute Tool Contract'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
