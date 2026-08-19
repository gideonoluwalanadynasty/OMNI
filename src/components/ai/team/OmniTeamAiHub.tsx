import { useState, useEffect } from 'react';
import { 
  OmniDepartmentalAssistant, OmniTeamSharedPrompt, 
  OmniEnterpriseAiPolicy, OmniTeamDepartment, OMNIState 
} from '../../../types';
import { 
  Users, Bot, Shield, Sliders, Play, RefreshCw, CheckCircle2, 
  AlertCircle, ArrowRight, Share2, Sparkles, Database, Plus,
  Layers, Lock, Cpu, DollarSign, ShieldAlert, Zap, Send, FileText,
  ChevronRight, Building2, Briefcase, BarChart3, HelpCircle, Code,
  BookOpen, Truck, Landmark, Palette, Settings2, SlidersHorizontal
} from 'lucide-react';

interface OmniTeamAiHubProps {
  state: OMNIState;
  triggerToast: (title: string, description: string, type?: 'success' | 'info' | 'error') => void;
  dispatchDomainEvent: (topic: any, payload: any) => void;
}

const DEPT_ICONS: Record<string, any> = {
  all: Building2,
  company_core: Building2,
  executive: Briefcase,
  sales: BarChart3,
  marketing: Palette,
  finance: Landmark,
  support: HelpCircle,
  operations: Truck,
  hr: Users,
  legal_compliance: Shield
};

export function OmniTeamAiHub({ state, triggerToast, dispatchDomainEvent }: OmniTeamAiHubProps) {
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'runner_handoff' | 'shared_prompts' | 'enterprise_policy'>('hierarchy');
  const [assistants, setAssistants] = useState<OmniDepartmentalAssistant[]>([]);
  const [sharedPrompts, setSharedPrompts] = useState<OmniTeamSharedPrompt[]>([]);
  const [policy, setPolicy] = useState<OmniEnterpriseAiPolicy | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');

  // Runner & Handoff Studio State
  const [selectedAssistant, setSelectedAssistant] = useState<OmniDepartmentalAssistant | null>(null);
  const [runnerInput, setRunnerInput] = useState('');
  const [isExecutingRun, setIsExecutingRun] = useState(false);
  const [runLog, setRunLog] = useState<{ id: string; sender: string; text: string; time: string; isHandoff?: boolean; handoffTarget?: string }[]>([]);
  const [handoffTargetId, setHandoffTargetId] = useState<string>('');

  // Shared Prompt Runner State
  const [activePromptModal, setActivePromptModal] = useState<OmniTeamSharedPrompt | null>(null);
  const [promptVariables, setPromptVariables] = useState<Record<string, string>>({});
  const [isCreatingPrompt, setIsCreatingPrompt] = useState(false);
  const [newPromptForm, setNewPromptForm] = useState({
    title: '',
    department: 'sales' as OmniTeamDepartment,
    description: '',
    template: 'Analyze quarterly performance for {{client_name}} across the {{region}} region.',
    tags: 'sales, quarterly, audit'
  });

  // Fetch initial Team AI data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [asstRes, promptsRes, policyRes] = await Promise.all([
        fetch('/api/v1/ai/team/assistants'),
        fetch('/api/v1/ai/team/prompts'),
        fetch('/api/v1/ai/enterprise/policy')
      ]);
      const asstData = await asstRes.json();
      const promptsData = await promptsRes.json();
      const policyData = await policyRes.json();

      if (asstData.assistants) {
        setAssistants(asstData.assistants);
        if (!selectedAssistant && asstData.assistants.length > 0) {
          setSelectedAssistant(asstData.assistants[0]);
        }
      }
      if (promptsData.prompts) setSharedPrompts(promptsData.prompts);
      if (policyData.policy) setPolicy(policyData.policy);
    } catch (e) {
      console.error('Failed to load Team AI state:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered assistants
  const filteredAssistants = assistants.filter(a => 
    selectedDeptFilter === 'all' || a.department === selectedDeptFilter
  );

  // Execute Department Assistant Run
  const handleExecuteAssistant = async () => {
    if (!selectedAssistant || !runnerInput.trim()) return;

    const userMessage = {
      id: `msg_${Date.now()}`,
      sender: state.user?.fullName || 'Gideon Oluwalana (CEO)',
      text: runnerInput,
      time: new Date().toLocaleTimeString()
    };

    setRunLog(prev => [...prev, userMessage]);
    setRunnerInput('');
    setIsExecutingRun(true);

    try {
      const res = await fetch(`/api/v1/ai/team/assistants/${selectedAssistant.id}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: runnerInput })
      });
      const data = await res.json();
      if (data.status === 'success' && data.execution) {
        setRunLog(prev => [
          ...prev,
          {
            id: `resp_${Date.now()}`,
            sender: selectedAssistant.name,
            text: data.execution.output,
            time: new Date().toLocaleTimeString()
          }
        ]);
        triggerToast('Response Synthesized', `${selectedAssistant.name} completed run under enterprise budget check.`, 'success');
        dispatchDomainEvent('ai.team.assistant.executed', {
          assistantId: selectedAssistant.id,
          costUsd: data.execution.costUsd
        });
      }
    } catch (e) {
      triggerToast('Run Failed', 'Error communicating with assistant.', 'error');
    } finally {
      setIsExecutingRun(false);
    }
  };

  // Initiate Multi-Agent Handoff
  const handleInitiateHandoff = async () => {
    if (!selectedAssistant || !handoffTargetId) return;
    const targetAsst = assistants.find(a => a.id === handoffTargetId);
    if (!targetAsst) return;

    setIsExecutingRun(true);
    const handoffMessage = {
      id: `handoff_${Date.now()}`,
      sender: 'OMNI Multi-Agent Orchestrator',
      text: `Initiating context-preserving handoff from [${selectedAssistant.name}] to [${targetAsst.name}]...`,
      time: new Date().toLocaleTimeString(),
      isHandoff: true,
      handoffTarget: targetAsst.name
    };
    setRunLog(prev => [...prev, handoffMessage]);

    try {
      const res = await fetch('/api/v1/ai/team/assistants/handoff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceAssistantId: selectedAssistant.id,
          targetAssistantId: targetAsst.id,
          contextSummary: `Forwarding active session task state from ${selectedAssistant.name} to ${targetAsst.name}`
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setSelectedAssistant(targetAsst);
        setRunLog(prev => [
          ...prev,
          {
            id: `handoff_resp_${Date.now()}`,
            sender: targetAsst.name,
            text: `Handoff received. I have inherited the verified context from ${selectedAssistant.name} and am ready to execute departmental actions under ${targetAsst.department} scope.`,
            time: new Date().toLocaleTimeString()
          }
        ]);
        triggerToast('Agent Handoff Complete', `Transferred task context to ${targetAsst.name}.`, 'success');
      }
    } catch (e) {
      triggerToast('Handoff Failed', 'Could not coordinate agent handoff.', 'error');
    } finally {
      setIsExecutingRun(false);
      setHandoffTargetId('');
    }
  };

  // Create Shared Prompt Pack
  const handleCreatePrompt = async () => {
    if (!newPromptForm.title || !newPromptForm.template) return;

    try {
      const res = await fetch('/api/v1/ai/team/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPromptForm.title,
          department: newPromptForm.department,
          description: newPromptForm.description,
          template: newPromptForm.template,
          tags: newPromptForm.tags.split(',').map(t => t.trim())
        })
      });
      const data = await res.json();
      if (data.status === 'success' && data.prompt) {
        setSharedPrompts(prev => [data.prompt, ...prev]);
        setIsCreatingPrompt(false);
        setNewPromptForm({ title: '', department: 'sales', description: '', template: '', tags: '' });
        triggerToast('Shared Prompt Created', 'Added to enterprise library.', 'success');
      }
    } catch (e) {
      triggerToast('Creation Failed', 'Could not create shared prompt.', 'error');
    }
  };

  // Run Shared Prompt with Dynamic Variables
  const handleExecutePromptTemplate = (prompt: OmniTeamSharedPrompt) => {
    let filledText = prompt.template;
    prompt.variables.forEach(v => {
      const val = promptVariables[v.name] || v.placeholder || `[${v.label}]`;
      filledText = filledText.replace(new RegExp(`{{${v.name}}}`, 'g'), val);
    });

    const targetAsst = assistants.find(a => a.department === prompt.department) || assistants[0];
    if (targetAsst) {
      setSelectedAssistant(targetAsst);
      setActiveTab('runner_handoff');
      setRunnerInput(filledText);
      setActivePromptModal(null);
      triggerToast('Prompt Injected', `Loaded template into ${targetAsst.name}. Press Send to run.`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: OMNI Team AI */}
      <div className="bg-gradient-to-r from-neutral-900 via-indigo-950 to-neutral-900 text-white rounded-3xl p-6 lg:p-8 border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Departmental AI Architecture
              </span>
              <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-bold">
                <Users className="w-3.5 h-3.5" /> Multi-Agent Handoff Enabled
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>OMNI Team AI</span>
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-lg bg-white/10 text-neutral-300">
                Dynasty Global Group
              </span>
            </h2>
            <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
              Specialized departmental AI assistants (Executive, Sales, Marketing, Customer Support, Finance, Developer, Learning, Logistics) with explicit scopes, shared prompt libraries, multi-agent handoffs, and enterprise sovereign governance.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-4 py-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Active Assistants</p>
                <p className="text-sm font-black text-white">{assistants.length} Departmental AIs</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-4 py-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Enterprise Policy</p>
                <p className="text-sm font-black text-white">L4 Guardrails Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10 overflow-x-auto">
          {[
            { id: 'hierarchy', label: 'Departmental Hierarchy', icon: Building2, count: assistants.length },
            { id: 'runner_handoff', label: 'Assistant Runner & Handoff', icon: Sparkles },
            { id: 'shared_prompts', label: 'Shared Prompt Library', icon: Share2, count: sharedPrompts.length },
            { id: 'enterprise_policy', label: 'Enterprise Governance Policy', icon: SlidersHorizontal }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'bg-white text-neutral-900 shadow-md' 
                    : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : ''}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${isActive ? 'bg-indigo-100 text-indigo-900' : 'bg-white/10 text-neutral-300'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: DEPARTMENTAL HIERARCHY */}
      {/* ========================================================================= */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Filter Department:</span>
              <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                {['all', 'company_core', 'executive', 'sales', 'marketing', 'finance', 'support', 'operations', 'hr', 'legal_compliance'].map(dept => {
                  const Icon = DEPT_ICONS[dept] || Building2;
                  const isSel = selectedDeptFilter === dept;
                  return (
                    <button
                      key={dept}
                      onClick={() => setSelectedDeptFilter(dept)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                        isSel
                          ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{dept.replace('_', ' ')}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                if (assistants.length > 0) {
                  setSelectedAssistant(assistants[0]);
                  setActiveTab('runner_handoff');
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Multi-Agent Studio</span>
            </button>
          </div>

          {/* Assistants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssistants.map(asst => {
              const Icon = DEPT_ICONS[asst.department] || Bot;
              const isCompanyLead = asst.department === 'company_core';

              return (
                <div 
                  key={asst.id}
                  className={`bg-white dark:bg-neutral-900 border rounded-3xl p-5 shadow-xs transition-all flex flex-col justify-between space-y-4 ${
                    isCompanyLead 
                      ? 'border-indigo-400 dark:border-indigo-600 bg-gradient-to-b from-indigo-50/20 to-transparent dark:from-indigo-950/20' 
                      : 'border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header: Avatar, Name, Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-2xl ${
                          isCompanyLead ? 'bg-indigo-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-indigo-600 dark:text-indigo-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">
                              {asst.name}
                            </h4>
                            {isCompanyLead && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                                ROOT
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
                            {asst.department.replace('_', ' ')} • Autonomy L{asst.autonomyLevel}
                          </p>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {asst.status}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                      {asst.description}
                    </p>

                    {/* Meta Specs: Budget, Allowed Tools, Success Rate */}
                    <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 space-y-2 text-[11px]">
                      <div className="flex items-center justify-between text-neutral-500">
                        <span>Success Rate:</span>
                        <span className="font-bold text-neutral-900 dark:text-white font-mono text-[10px]">{(asst.successRate * 100).toFixed(1)}%</span>
                      </div>

                      <div className="flex items-center justify-between text-neutral-500">
                        <span>Monthly Spend:</span>
                        <span className="font-mono text-neutral-900 dark:text-white">
                          ${asst.currentSpendUsd} / ${asst.monthlyBudgetUsd}
                        </span>
                      </div>

                      {/* Spend Progress Bar */}
                      <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${Math.min(100, (asst.currentSpendUsd / asst.monthlyBudgetUsd) * 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-1">
                        <span>Tools ({asst.allowedToolIds.length}): <strong className="text-neutral-700 dark:text-neutral-300">{asst.allowedToolIds.slice(0, 2).join(', ')}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action */}
                  <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-400">
                      Tasks: {asst.totalTasksExecuted} completed
                    </span>

                    <button
                      onClick={() => {
                        setSelectedAssistant(asst);
                        setActiveTab('runner_handoff');
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      <span>Prompt Assistant</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: RUNNER & MULTI-AGENT HANDOFF STUDIO */}
      {/* ========================================================================= */}
      {activeTab === 'runner_handoff' && selectedAssistant && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Active Assistant Spec & Handoff Controls */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-neutral-900 dark:text-white">
                      {selectedAssistant.name}
                    </h3>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                      {selectedAssistant.department.replace('_', ' ')} • L{selectedAssistant.autonomyLevel}
                    </p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  Online
                </span>
              </div>

              {/* System Instructions Summary */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Bound System Prompt</p>
                <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed max-h-36 overflow-y-auto">
                  {selectedAssistant.systemPrompt}
                </div>
              </div>

              {/* Linked Tools */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Authorized Capabilities ({selectedAssistant.allowedToolIds.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAssistant.allowedToolIds.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Switch Assistant Dropdown */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Switch Active Department:</label>
                <select
                  value={selectedAssistant.id}
                  onChange={(e) => {
                    const found = assistants.find(a => a.id === e.target.value);
                    if (found) setSelectedAssistant(found);
                  }}
                  className="w-full text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
                >
                  {assistants.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.department})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Multi-Agent Handoff Module */}
            <div className="bg-gradient-to-br from-indigo-50/50 to-neutral-50 dark:from-indigo-950/20 dark:to-neutral-900 border border-indigo-200 dark:border-indigo-800 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs">
                <Share2 className="w-4 h-4" />
                <span>Multi-Agent Task Handoff</span>
              </div>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Transfer active task state and verified artifacts from {selectedAssistant.name} to another departmental AI.
              </p>

              <div className="space-y-2">
                <select
                  value={handoffTargetId}
                  onChange={(e) => setHandoffTargetId(e.target.value)}
                  className="w-full text-xs bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
                >
                  <option value="">Select Target Department...</option>
                  {assistants.filter(a => a.id !== selectedAssistant.id).map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.department})</option>
                  ))}
                </select>

                <button
                  disabled={!handoffTargetId || isExecutingRun}
                  onClick={handleInitiateHandoff}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Initiate Context Handoff</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (2 cols): Interactive Chat / Action Runner */}
          <div className="lg:col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between h-[600px]">
            {/* Run Log Canvas */}
            <div className="space-y-3 overflow-y-auto pr-2 flex-1">
              {runLog.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                  <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                    Ready to Execute with {selectedAssistant.name}
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-sm">
                    Enter instructions or queries tailored to {selectedAssistant.department} operations. All queries check enterprise spend caps.
                  </p>
                </div>
              ) : (
                runLog.map(msg => (
                  <div 
                    key={msg.id}
                    className={`p-4 rounded-2xl text-xs space-y-1.5 ${
                      msg.isHandoff 
                        ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800' 
                        : msg.sender.includes('Gideon') 
                        ? 'bg-neutral-100 dark:bg-neutral-800/80 ml-8' 
                        : 'bg-indigo-50/40 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-neutral-500">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed text-neutral-800 dark:text-neutral-200">
                      {msg.text}
                    </div>
                  </div>
                ))
              )}

              {isExecutingRun && (
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 text-xs flex items-center gap-2 text-neutral-500">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                  <span>{selectedAssistant.name} is executing scoped departmental workflow...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
              <input
                type="text"
                value={runnerInput}
                onChange={(e) => setRunnerInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleExecuteAssistant(); }}
                placeholder={`Prompt ${selectedAssistant.name}...`}
                className="flex-1 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                disabled={isExecutingRun || !runnerInput.trim()}
                onClick={handleExecuteAssistant}
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-50 transition-all cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: SHARED PROMPT LIBRARY */}
      {/* ========================================================================= */}
      {activeTab === 'shared_prompts' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">Shared Prompt Packs & Workflows</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Standardized enterprise prompts with dynamic variable injection for sales decks, logistics audits, and legal compliance.
              </p>
            </div>

            <button
              onClick={() => setIsCreatingPrompt(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Shared Prompt</span>
            </button>
          </div>

          {/* Prompts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sharedPrompts.map(prompt => {
              const Icon = DEPT_ICONS[prompt.department] || Share2;
              return (
                <div 
                  key={prompt.id}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          {prompt.department.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {prompt.usageCount} Runs
                      </span>
                    </div>

                    <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">
                      {prompt.title}
                    </h4>

                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {prompt.description}
                    </p>

                    {/* Template Snippet */}
                    <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 text-[11px] font-mono text-neutral-700 dark:text-neutral-300 line-clamp-3">
                      {prompt.template}
                    </div>

                    {/* Variables Count */}
                    <div className="flex flex-wrap gap-1">
                      {prompt.variables.map(v => (
                        <span key={v.name} className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 text-[10px] font-mono">
                          {`{{${v.name}}}`}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400">Created by {prompt.authorName}</span>
                    <button
                      onClick={() => {
                        setActivePromptModal(prompt);
                        setPromptVariables({});
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      <Play className="w-3 h-3" />
                      <span>Run Workflow</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 4: ENTERPRISE GOVERNANCE POLICY */}
      {/* ========================================================================= */}
      {activeTab === 'enterprise_policy' && policy && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 rounded border border-indigo-200 dark:border-indigo-800">
                  Org Admin Policy
                </span>
                <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                  Enterprise AI Governance & Guardrails
                </h3>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Enforce tenant-wide models, DLP redaction, retention ceilings, external connector policies, and budget controls.
              </p>
            </div>

            <button
              onClick={() => triggerToast('Policy Saved', 'Updated enterprise guardrail bindings.', 'success')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all cursor-pointer"
            >
              Save Policy Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Policy Section 1: Allowed Models */}
            <div className="p-5 rounded-3xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span>Authorized AI Models & Providers</span>
              </div>
              <p className="text-[11px] text-neutral-500">Select foundation models permissible across departmental assistants:</p>
              
              <div className="space-y-2">
                {policy.allowedModels.map(model => (
                  <div key={model.modelId} className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs">
                    <span className="font-mono text-neutral-800 dark:text-neutral-200">{model.name} ({model.provider})</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Policy Section 2: Data Retention & DLP */}
            <div className="p-5 rounded-3xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Data Retention & DLP Redaction</span>
              </div>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <span>Context Retention Limit</span>
                  <span className="font-bold text-indigo-600">{policy.dataRetentionPolicy?.retentionDays || 30} Days</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <span>Automatic PII Scrubbing</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {policy.dataRetentionPolicy?.autoScrubPii ? 'ENFORCED' : 'DISABLED'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <span>Zero-Retention Mode</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">
                    {policy.dataRetentionPolicy?.zeroDataRetentionEnforced ? 'ACTIVE' : 'OFF'}
                  </span>
                </div>
              </div>
            </div>

            {/* Policy Section 3: Monthly Department Budgets */}
            <div className="p-5 rounded-3xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white">
                <DollarSign className="w-4 h-4 text-amber-600" />
                <span>Departmental Budget Caps</span>
              </div>

              <div className="space-y-2">
                {policy.budgetCeilings?.map(b => (
                  <div key={b.department} className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs">
                    <span className="uppercase font-bold text-neutral-700 dark:text-neutral-300">{b.department.replace('_', ' ')}</span>
                    <span className="font-mono font-bold text-indigo-600">${b.monthlyCapUsd}/mo</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policy Section 4: External Connectors */}
            <div className="p-5 rounded-3xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white">
                <Zap className="w-4 h-4 text-purple-600" />
                <span>Permitted External Connectors</span>
              </div>

              <div className="space-y-2">
                {policy.externalConnectors?.map(conn => (
                  <div key={conn.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs">
                    <div>
                      <span className="font-bold text-neutral-800 dark:text-neutral-200 uppercase">{conn.name}</span>
                      <p className="text-[10px] text-neutral-400">Scopes: {conn.allowedScopes.join(', ')}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {conn.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* RUN PROMPT TEMPLATE MODAL */}
      {/* ========================================================================= */}
      {activePromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                  <Play className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                    Execute: {activePromptModal.title}
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-mono">Department: {activePromptModal.department}</p>
                </div>
              </div>
              <button 
                onClick={() => setActivePromptModal(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-neutral-500">
                Fill in the workflow variables below to generate the structured prompt:
              </p>

              {activePromptModal.variables.map(v => (
                <div key={v.name} className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    {v.label} <span className="font-mono text-[10px] text-neutral-400">({`{{${v.name}}}`})</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={v.placeholder}
                    onChange={(e) => setPromptVariables(prev => ({ ...prev, [v.name]: e.target.value }))}
                    placeholder={`e.g. ${v.placeholder || 'Enter value...'}`}
                    className="w-full text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <button
                onClick={() => setActivePromptModal(null)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleExecutePromptTemplate(activePromptModal)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
              >
                Inject into Assistant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CREATE SHARED PROMPT MODAL */}
      {/* ========================================================================= */}
      {isCreatingPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                Create Shared Prompt Pack
              </h3>
              <button 
                onClick={() => setIsCreatingPrompt(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Prompt Title</label>
                <input
                  type="text"
                  value={newPromptForm.title}
                  onChange={(e) => setNewPromptForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Quarterly Strategic Client Review"
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Target Department</label>
                <select
                  value={newPromptForm.department}
                  onChange={(e) => setNewPromptForm(prev => ({ ...prev, department: e.target.value as OmniTeamDepartment }))}
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
                >
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="support">Customer Support</option>
                  <option value="operations">Operations & Logistics</option>
                  <option value="hr">Human Resources</option>
                  <option value="legal_compliance">Legal & Compliance</option>
                  <option value="executive">Executive</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Description</label>
                <input
                  type="text"
                  value={newPromptForm.description}
                  onChange={(e) => setNewPromptForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief summary of what this workflow accomplishes"
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Prompt Template (use {`{{variable}}`})</label>
                <textarea
                  rows={4}
                  value={newPromptForm.template}
                  onChange={(e) => setNewPromptForm(prev => ({ ...prev, template: e.target.value }))}
                  placeholder="Write prompt template with {{variables}}..."
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-3 font-mono text-neutral-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-700 dark:text-neutral-300">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newPromptForm.tags}
                  onChange={(e) => setNewPromptForm(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="sales, audit, enterprise"
                  className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <button
                onClick={() => setIsCreatingPrompt(false)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePrompt}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
              >
                Save to Library
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
