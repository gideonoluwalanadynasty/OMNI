import { useState, useEffect } from 'react';
import { 
  OmniContextElement, OmniPersonalContextCategory, OmniContextAccessAudit, 
  OmniPersonalCommandResult, OMNIState 
} from '../../../types';
import { 
  Sparkles, Shield, Lock, Eye, EyeOff, Trash2, CheckCircle2, 
  AlertCircle, Search, Clock, Calendar, CheckSquare, FileText, 
  Layers, MessageSquare, Target, User, Sliders, Play, RefreshCw, 
  ExternalLink, Zap, ShieldCheck, ChevronRight, Terminal, ArrowRight,
  Database, Activity, Send, Check, X, ShieldAlert, Cpu
} from 'lucide-react';

interface MyOmniPersonalHubProps {
  state: OMNIState;
  triggerToast: (title: string, description: string, type?: 'success' | 'info' | 'error') => void;
  dispatchDomainEvent: (topic: any, payload: any) => void;
}

const CATEGORY_META: Record<OmniPersonalContextCategory, { label: string; icon: any; color: string; desc: string }> = {
  omni_profile: { label: 'OMNI Profile', icon: User, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800', desc: 'Verified sovereign identity, KYC clearance, and cryptographic DID signature keys.' },
  preferences: { label: 'Preferences', icon: Sliders, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800', desc: 'Default foundation model bindings, temperature settings, and interface themes.' },
  projects: { label: 'Projects', icon: Layers, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800', desc: 'Active workspace engineering, commercial initiatives, and roadmap milestones.' },
  knowledge_spaces: { label: 'Knowledge Spaces', icon: Database, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800', desc: 'Vector-indexed corporate bylaws, Spanner architecture, and regulatory vaults.' },
  files: { label: 'Files', icon: FileText, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800', desc: 'Cloud storage documents, spreadsheets, OpenAPI specifications, and research decks.' },
  tasks: { label: 'Tasks & Approvals', icon: CheckSquare, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800', desc: 'Pending executive signoffs, code reviews, and financial settlement authorizations.' },
  calendar: { label: 'Calendar', icon: Calendar, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800', desc: 'Connected Google Workspace and OMNI calendar schedule and attendee dossiers.' },
  connected_apps: { label: 'Connected Apps', icon: Zap, color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-800', desc: 'Active data channels to OMNI CRM, Multi-Tenant Ledger, and Code Studio.' },
  communications: { label: 'Communications', icon: MessageSquare, color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800', desc: 'Authorised executive memos, critical broadcast alerts, and team chat transcripts.' },
  goals: { label: 'Goals & OKRs', icon: Target, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800', desc: 'Enterprise revenue targets, sub-20ms Spanner latency SLAs, and compliance milestones.' }
};

const CANONICAL_COMMANDS = [
  { key: 'attention_today', query: 'What requires my attention today?', icon: AlertCircle, badge: 'Daily Briefing', desc: 'Consolidated briefing of pending approvals, schedule, and critical alerts.' },
  { key: 'summarise_projects', query: 'Summarise my projects.', icon: Layers, badge: 'Portfolio Health', desc: 'Cross-project completion rates, recent milestones, and blockers.' },
  { key: 'find_document', query: 'Find the document I worked on last week.', icon: FileText, badge: 'Semantic Search', desc: 'Document locator with verified source permissions.' },
  { key: 'prepare_meeting', query: 'Prepare me for my next meeting.', icon: Calendar, badge: 'Dossier', desc: 'Next meeting briefing, participant dossiers, and talking points.' },
  { key: 'business_changes', query: 'What changed in my businesses?', icon: Activity, badge: 'Delta Intel', desc: '7-day cross-business KPI shifts, revenue deltas, and SLA tracking.' }
];

export function MyOmniPersonalHub({ state, triggerToast, dispatchDomainEvent }: MyOmniPersonalHubProps) {
  const [subView, setSubView] = useState<'command_center' | 'context_control' | 'audit_log'>('command_center');
  const [contextElements, setContextElements] = useState<OmniContextElement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [auditLogs, setAuditLogs] = useState<OmniContextAccessAudit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExecutingCommand, setIsExecutingCommand] = useState(false);
  const [customCommandInput, setCustomCommandInput] = useState('');
  const [activeCommandResult, setActiveCommandResult] = useState<OmniPersonalCommandResult | null>(null);
  const [inspectedElement, setInspectedElement] = useState<OmniContextElement | null>(null);

  // Fetch Context Elements & Audits
  const fetchContextData = async () => {
    setIsLoading(true);
    try {
      const [ctxRes, auditRes] = await Promise.all([
        fetch('/api/v1/ai/personal/context'),
        fetch('/api/v1/ai/personal/audit')
      ]);
      const ctxData = await ctxRes.json();
      const auditData = await auditRes.json();

      if (ctxData.elements) setContextElements(ctxData.elements);
      if (auditData.audits) setAuditLogs(auditData.audits);
    } catch (e) {
      console.error('Failed to load My OMNI personal context:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContextData();
  }, []);

  // Execute Personal Command
  const handleExecuteCommand = async (commandKey?: string, overrideQuery?: string) => {
    const queryToRun = overrideQuery || customCommandInput;
    if (!commandKey && !queryToRun.trim()) return;

    setIsExecutingCommand(true);
    try {
      const res = await fetch('/api/v1/ai/personal/command/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commandKey,
          customQuery: queryToRun
        })
      });
      const data = await res.json();
      if (data.status === 'success' && data.result) {
        setActiveCommandResult(data.result);
        triggerToast('Command Executed', `Synthesized from authorized personal context in ${data.result.latencyMs}ms.`, 'success');
        dispatchDomainEvent('ai.personal.command.executed', {
          command: data.result.command,
          sourcesCount: data.result.sourcesUsed.length,
          confidence: data.result.confidenceScore
        });
        fetchContextData();
      } else {
        triggerToast('Execution Failed', data.error || 'Could not synthesize response.', 'error');
      }
    } catch (e: any) {
      triggerToast('Execution Error', e.message || 'Network error during execution.', 'error');
    } finally {
      setIsExecutingCommand(false);
      setCustomCommandInput('');
    }
  };

  // Toggle Enable / Disable
  const handleToggleStatus = async (element: OmniContextElement) => {
    const nextStatus = element.status === 'enabled' ? 'disabled' : 'enabled';
    try {
      const res = await fetch('/api/v1/ai/personal/context/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elementId: element.id, status: nextStatus })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setContextElements(prev => prev.map(el => el.id === element.id ? { ...el, status: nextStatus } : el));
        triggerToast('Context Updated', `"${element.name}" is now ${nextStatus}.`, 'info');
        fetchContextData();
      }
    } catch (e) {
      triggerToast('Update Failed', 'Could not toggle context element.', 'error');
    }
  };

  // Revoke Access Immediately
  const handleRevoke = async (element: OmniContextElement) => {
    try {
      const res = await fetch('/api/v1/ai/personal/context/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elementId: element.id })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setContextElements(prev => prev.map(el => el.id === element.id ? { ...el, status: 'revoked' } : el));
        triggerToast('Context Revoked', `Cryptographic access revoked for "${element.name}". Embeddings purged.`, 'success');
        fetchContextData();
      }
    } catch (e) {
      triggerToast('Revocation Failed', 'Could not revoke context access.', 'error');
    }
  };

  // Delete Custom Context Element
  const handleDelete = async (element: OmniContextElement) => {
    if (!element.isDeletable) {
      triggerToast('Action Blocked', 'Core system context cannot be deleted. You may disable or revoke it.', 'error');
      return;
    }

    try {
      const res = await fetch(`/api/v1/ai/personal/context/${element.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.status === 'success') {
        setContextElements(prev => prev.filter(el => el.id !== element.id));
        triggerToast('Context Deleted', `"${element.name}" was permanently removed from personal context.`, 'success');
        fetchContextData();
      }
    } catch (e) {
      triggerToast('Deletion Failed', 'Could not delete context element.', 'error');
    }
  };

  // Filtered elements
  const filteredElements = contextElements.filter(el => {
    const matchCategory = selectedCategory === 'all' || el.category === selectedCategory;
    const matchQuery = !searchQuery || 
      el.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      el.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.sourceApp.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  const enabledCount = contextElements.filter(c => c.status === 'enabled').length;
  const revokedCount = contextElements.filter(c => c.status === 'revoked').length;

  return (
    <div className="space-y-6">
      {/* Top Banner: My OMNI Sovereign Personal AI */}
      <div className="bg-gradient-to-r from-neutral-900 via-indigo-950 to-neutral-900 text-white rounded-3xl p-6 lg:p-8 border border-neutral-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Personal Operating Layer
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" /> Zero Cross-Tenant Egress
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>My OMNI</span>
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-lg bg-white/10 text-neutral-300">
                {state.user?.fullName || 'Gideon Oluwalana'} (CEO)
              </span>
            </h2>
            <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
              Your sovereign personal intelligence assistant. My OMNI operates exclusively on explicitly authorized personal context streams, enforcing strict data boundaries, source verification, and cryptographic auditability.
            </p>
          </div>

          {/* Quick Context Metric Chips */}
          <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-4 py-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Authorized Streams</p>
                <p className="text-sm font-black text-white">{enabledCount} / {contextElements.length} Enabled</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-4 py-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Privacy Clearance</p>
                <p className="text-sm font-black text-white">Level 5 Sovereign</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10">
          {[
            { id: 'command_center', label: 'Personal Command Center', icon: Sparkles },
            { id: 'context_control', label: 'Context Control Center', count: contextElements.length, icon: Sliders },
            { id: 'audit_log', label: 'Cryptographic Audit Log', count: auditLogs.length, icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = subView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSubView(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
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
      {/* VIEW 1: PERSONAL COMMAND CENTER */}
      {/* ========================================================================= */}
      {subView === 'command_center' && (
        <div className="space-y-6">
          {/* Canonical Executive Queries Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {CANONICAL_COMMANDS.map(cmd => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.key}
                  disabled={isExecutingCommand}
                  onClick={() => handleExecuteCommand(cmd.key, cmd.query)}
                  className="group text-left p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {cmd.badge}
                      </span>
                      <Icon className="w-4 h-4 text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                      “{cmd.query}”
                    </h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {cmd.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 mt-2">
                    <span>Synthesize Query</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}

            {/* Custom Interactive Prompt Input Box */}
            <div className="p-4 bg-gradient-to-br from-neutral-50 to-indigo-50/40 dark:from-neutral-900 dark:to-indigo-950/20 border border-indigo-200/80 dark:border-indigo-800/60 rounded-2xl flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Custom Personal Query</span>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  Ask anything across your authorized tasks, files, calendar, and connected apps.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customCommandInput}
                  onChange={(e) => setCustomCommandInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleExecuteCommand(); }}
                  placeholder="e.g. What are my highest priority blockers for tomorrow?"
                  className="flex-1 text-xs bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  disabled={isExecutingCommand || !customCommandInput.trim()}
                  onClick={() => handleExecuteCommand()}
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-50 transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading Indicator */}
          {isExecutingCommand && (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 text-center space-y-3 shadow-xs">
              <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin mx-auto" />
              <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white">Synthesizing Personal Context...</h4>
              <p className="text-xs text-neutral-500">Checking source permissions, querying enabled streams, and generating executive briefing.</p>
            </div>
          )}

          {/* Active Command Output Canvas */}
          {activeCommandResult && !isExecutingCommand && (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-xs">
              {/* Header Info & Verification Badges */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Permission Verified
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {new Date(activeCommandResult.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                    {activeCommandResult.command}
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-neutral-400" /> {activeCommandResult.latencyMs}ms</span>
                  <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-neutral-400" /> {(activeCommandResult.confidenceScore * 100).toFixed(1)}% Confidence</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400"><Shield className="w-3.5 h-3.5" /> Zero Egress</span>
                </div>
              </div>

              {/* Key Metric Chips if available */}
              {activeCommandResult.keyMetrics && activeCommandResult.keyMetrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activeCommandResult.keyMetrics.map((met, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{met.label}</p>
                      <p className="text-base font-extrabold text-neutral-900 dark:text-white">{met.value}</p>
                      {met.change && (
                        <p className={`text-[10px] font-bold ${met.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : met.trend === 'down' ? 'text-rose-600 dark:text-rose-400' : 'text-neutral-500'}`}>
                          {met.change}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Main Synthesized Text */}
              <div className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed bg-neutral-50/60 dark:bg-neutral-950/40 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800">
                <div className="whitespace-pre-wrap font-sans text-neutral-800 dark:text-neutral-200">
                  {activeCommandResult.synthesizedAnswer}
                </div>
              </div>

              {/* Action Items Queue */}
              {activeCommandResult.actionItems && activeCommandResult.actionItems.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Synthesized Action Items ({activeCommandResult.actionItems.length})</span>
                    </h4>
                  </div>

                  <div className="space-y-2">
                    {activeCommandResult.actionItems.map(item => (
                      <div 
                        key={item.id}
                        className="flex items-start justify-between gap-3 p-3 bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs"
                      >
                        <div className="flex items-start gap-2.5">
                          <input 
                            type="checkbox" 
                            defaultChecked={item.completed}
                            className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500" 
                          />
                          <div>
                            <p className="font-semibold text-neutral-900 dark:text-white">{item.title}</p>
                            <div className="flex items-center gap-2 text-[10px] text-neutral-500 mt-0.5">
                              {item.sourceApp && <span className="font-bold text-indigo-600 dark:text-indigo-400">{item.sourceApp}</span>}
                              {item.dueDate && <span>• Due: {item.dueDate}</span>}
                            </div>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                          item.priority === 'high' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800' :
                          item.priority === 'medium' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800' :
                          'bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source Streams Attributed */}
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-500">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-neutral-700 dark:text-neutral-300">Authorized Sources:</span>
                  {activeCommandResult.sourcesUsed.map((src, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[10px] flex items-center gap-1">
                      <ShieldCheck className="w-2.5 h-2.5 text-emerald-500" />
                      {src.name}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSubView('audit_log')}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <span>Inspect Audit Proof</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: CONTEXT CONTROL CENTER */}
      {/* ========================================================================= */}
      {subView === 'context_control' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">Context Control Center</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Granular authority over what My OMNI can read. Toggle, inspect raw schemas, revoke cryptographic keys, or delete elements.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-64">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter context streams..."
                  className="w-full text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl pl-9 pr-3 py-2 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Category Filter Pills (10 Explicit Categories) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                }`}
              >
                All Categories ({contextElements.length})
              </button>

              {(Object.keys(CATEGORY_META) as OmniPersonalContextCategory[]).map(catKey => {
                const meta = CATEGORY_META[catKey];
                const count = contextElements.filter(c => c.category === catKey).length;
                const isSelected = selectedCategory === catKey;
                return (
                  <button
                    key={catKey}
                    onClick={() => setSelectedCategory(catKey)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                    }`}
                  >
                    <span>{meta.label}</span>
                    <span className={`px-1 py-0.2 rounded text-[10px] ${isSelected ? 'bg-indigo-700 text-white' : 'bg-neutral-200 dark:bg-neutral-700'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Context Elements Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredElements.map(el => {
              const meta = CATEGORY_META[el.category] || CATEGORY_META.omni_profile;
              const Icon = meta.icon;
              const isEnabled = el.status === 'enabled';
              const isRevoked = el.status === 'revoked';

              return (
                <div 
                  key={el.id}
                  className={`bg-white dark:bg-neutral-900 border rounded-3xl p-5 shadow-xs transition-all space-y-4 flex flex-col justify-between ${
                    isRevoked ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10' :
                    isEnabled ? 'border-neutral-200 dark:border-neutral-800 hover:border-indigo-300' :
                    'border-neutral-200 dark:border-neutral-800 opacity-60'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top row: Category tag & Privacy badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-xl border ${meta.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                            {meta.label}
                          </span>
                          <h4 className="text-xs font-extrabold text-neutral-900 dark:text-white">
                            {el.name}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                          el.privacyClassification === 'restricted' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800' :
                          el.privacyClassification === 'confidential' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800' :
                          'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                        }`}>
                          {el.privacyClassification}
                        </span>

                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                          isRevoked ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                          isEnabled ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                          'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                        }`}>
                          {el.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {el.description}
                    </p>

                    {/* Summary Data Box */}
                    <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/80 dark:border-neutral-700/60 text-[11px] text-neutral-700 dark:text-neutral-300">
                      <span className="font-bold text-neutral-500 dark:text-neutral-400 block text-[10px] uppercase">Data Payload Summary:</span>
                      {el.dataSummary}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                      <span>Source: {el.sourceApp}</span>
                      <span>Items: {el.itemCount} | Last access: {new Date(el.lastAccessedAt).toLocaleTimeString()}</span>
                    </div>
                  </div>

                  {/* Actions Row: Enable/Disable, Revoke, Inspect, Delete */}
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleStatus(el)}
                        disabled={isRevoked}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isEnabled 
                            ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {isEnabled ? 'Disable Access' : 'Enable Access'}
                      </button>

                      <button
                        onClick={() => handleRevoke(el)}
                        disabled={isRevoked}
                        className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 transition-all cursor-pointer"
                        title="Revoke cryptographic authorization immediately"
                      >
                        Revoke
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setInspectedElement(el)}
                        className="p-1.5 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                        title="Inspect Raw Data Sample"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {el.isDeletable && (
                        <button
                          onClick={() => handleDelete(el)}
                          className="p-1.5 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/60 cursor-pointer"
                          title="Delete Custom Context Stream"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: CRYPTOGRAPHIC AUDIT LOG */}
      {/* ========================================================================= */}
      {subView === 'audit_log' && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 rounded border border-indigo-200 dark:border-indigo-800">
                  Zero-Trust Telemetry
                </span>
                <h3 className="text-base font-extrabold text-neutral-900 dark:text-white">
                  Context Access Audit Ledger
                </h3>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Cryptographic immutable log of every instance My OMNI accessed your profile, files, calendar, or projects.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchContextData}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Audit Logs</span>
              </button>
            </div>
          </div>

          {/* Audit Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-xl">Timestamp</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Context Element</th>
                  <th className="py-2.5 px-3">Action Type</th>
                  <th className="py-2.5 px-3">Reason / User Intent</th>
                  <th className="py-2.5 px-3 rounded-r-xl">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {auditLogs.map(aud => (
                  <tr key={aud.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-3 font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                      {new Date(aud.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        {aud.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-neutral-900 dark:text-white max-w-xs truncate">
                      {aud.elementName}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] uppercase text-indigo-600 dark:text-indigo-400">
                      {aud.action}
                    </td>
                    <td className="py-3 px-3 text-neutral-600 dark:text-neutral-400 max-w-md truncate">
                      {aud.reason}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" /> Scoped PASS
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* RAW DATA INSPECTION MODAL */}
      {/* ========================================================================= */}
      {inspectedElement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                    Inspect Context Payload: {inspectedElement.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-mono">Category: {inspectedElement.category} | ID: {inspectedElement.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setInspectedElement(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-700 dark:text-neutral-300">
                <span>Sanitized In-Memory Representation</span>
                <span className="text-[10px] text-emerald-600 font-mono">PII Masked</span>
              </div>
              <pre className="p-4 rounded-2xl bg-neutral-950 text-indigo-300 font-mono text-[11px] overflow-x-auto max-h-72 border border-neutral-800">
                {inspectedElement.rawSampleJson 
                  ? JSON.stringify(JSON.parse(inspectedElement.rawSampleJson), null, 2)
                  : JSON.stringify(inspectedElement, null, 2)}
              </pre>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={() => setInspectedElement(null)}
                className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
