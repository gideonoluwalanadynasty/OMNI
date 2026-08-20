import React, { useState } from 'react';
import {
  Zap,
  Plus,
  CheckCircle2,
  AlertCircle,
  Play,
  ArrowRight,
  Sparkles,
  Bot,
  UserCheck,
  Tag,
  Clock,
  ShieldAlert,
  Send,
  MessageSquare,
  Sliders,
  Check
} from 'lucide-react';
import { InboxAutomationRule, InboxAutomationTriggerType, InboxAutomationActionType } from '../../../types/omni_universal_inbox';

interface Props {
  rules: InboxAutomationRule[];
  onToggleRule: (ruleId: string) => void;
  onCreateRule: (rule: Partial<InboxAutomationRule>) => void;
  onExecuteSimulation: (ruleId: string) => Promise<{ success: boolean; trace: string[] }>;
}

export const OmniInboxAutomationsView: React.FC<Props> = ({
  rules,
  onToggleRule,
  onCreateRule,
  onExecuteSimulation
}) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(rules[0]?.id || '');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationTrace, setSimulationTrace] = useState<string[] | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTrigger, setNewTrigger] = useState<InboxAutomationTriggerType>('keyword_match');

  const selectedRule = rules.find(r => r.id === selectedRuleId) || rules[0];

  const handleSimulate = async (id: string) => {
    setIsSimulating(true);
    setSimulationTrace(null);
    try {
      const res = await onExecuteSimulation(id);
      setSimulationTrace(res.trace);
    } catch (e: any) {
      setSimulationTrace(['Simulation error: ' + e?.message]);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleCreateNew = () => {
    if (!newTitle.trim()) return;
    onCreateRule({
      title: newTitle.trim(),
      description: newDescription.trim() || 'Custom conversation automation playbook.',
      trigger: newTrigger,
      isActive: true,
      conditions: {},
      actions: [
        { type: 'assign_to_team', params: { team: 'VIP Concierge' } },
        { type: 'add_tags', params: { tags: ['Automated Rule'] } }
      ],
      executionCountTotal: 0
    });
    setShowCreateModal(false);
    setNewTitle('');
    setNewDescription('');
  };

  const getTriggerLabel = (trig: InboxAutomationTriggerType) => {
    switch (trig) {
      case 'vip_customer_contacted': return { label: 'VIP Customer Contacted', icon: Sparkles, color: 'text-amber-400 bg-amber-500/20' };
      case 'keyword_match': return { label: 'Keyword Match', icon: Tag, color: 'text-indigo-400 bg-indigo-500/20' };
      case 'after_hours_message': return { label: 'After-Hours Received', icon: Clock, color: 'text-blue-400 bg-blue-500/20' };
      case 'sla_breach_warning': return { label: 'SLA Breach Warning', icon: AlertCircle, color: 'text-rose-400 bg-rose-500/20' };
      case 'sentiment_negative': return { label: 'Negative Sentiment Intercept', icon: ShieldAlert, color: 'text-rose-400 bg-rose-500/20' };
      default: return { label: 'Inbound Message', icon: MessageSquare, color: 'text-emerald-400 bg-emerald-500/20' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                CONVERSATION AUTOMATION ENGINE
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Event-Driven Workflows
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Conversation Workflows & Rules</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed mt-1">
              Trigger automated triage, CRM lead generation, VIP routing, SLA escalations, and smart template receipts across all communication channels.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Automation Rule</span>
          </button>
        </div>
      </div>

      {/* Rules List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {rules.map(rule => {
            const trig = getTriggerLabel(rule.trigger);
            const TrigIcon = trig.icon;
            const isSelected = rule.id === selectedRuleId;

            return (
              <div
                key={rule.id}
                onClick={() => {
                  setSelectedRuleId(rule.id);
                  setSimulationTrace(null);
                }}
                className={`p-4 rounded-3xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-indigo-600/15 border-indigo-500 shadow-xl'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2.5 rounded-2xl ${trig.color}`}>
                      <TrigIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-extrabold text-white truncate">{rule.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{rule.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleRule(rule.id);
                    }}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors flex-shrink-0 ${
                      rule.isActive
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-500 border-slate-700'
                    }`}
                  >
                    {rule.isActive ? 'Active' : 'Paused'}
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <span className="font-mono text-indigo-300">{rule.executionCountTotal.toLocaleString()} executions</span>
                  <span className="text-[10px] text-slate-500">
                    Last: {rule.lastExecutedAt ? new Date(rule.lastExecutedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Never'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Pane (7 cols) */}
        {selectedRule && (
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white">{selectedRule.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedRule.description}</p>
              </div>

              <button
                onClick={() => handleSimulate(selectedRule.id)}
                disabled={isSimulating}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isSimulating ? 'Executing...' : 'Simulate Rule'}</span>
              </button>
            </div>

            {/* Visual Workflow Flowchart */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Workflow Pipeline</h4>

              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
                {/* Step 1: Trigger */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xs font-black">
                    1
                  </div>
                  <div className="flex-1 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase block">Event Trigger</span>
                    <strong className="text-white capitalize">{selectedRule.trigger.replace(/_/g, ' ')}</strong>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-1">
                  <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
                </div>

                {/* Step 2: Evaluation / Conditions */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs font-black">
                    2
                  </div>
                  <div className="flex-1 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs">
                    <span className="text-[10px] font-bold text-blue-400 uppercase block">Condition Filter</span>
                    <p className="text-slate-300">
                      {selectedRule.conditions.keywordContains?.length
                        ? `Matches keywords: ${selectedRule.conditions.keywordContains.join(', ')}`
                        : selectedRule.conditions.customerTierFilter?.length
                        ? `Customer Tier in: ${selectedRule.conditions.customerTierFilter.join(', ')}`
                        : 'Evaluates on all inbound channel payloads'}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center -my-1">
                  <ArrowRight className="w-4 h-4 text-slate-600 rotate-90" />
                </div>

                {/* Step 3: Executed Actions */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-black">
                    3
                  </div>
                  <div className="flex-1 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase block">Automated Actions</span>
                    {selectedRule.actions.map((act, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="font-medium capitalize">{act.type.replace(/_/g, ' ')}:</span>
                        <span className="text-indigo-300 font-mono text-[11px]">{JSON.stringify(act.params)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation Trace Output */}
            {simulationTrace && (
              <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Execution Trace Log</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  {simulationTrace.map((line, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Rule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Create New Automation Rule</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-bold uppercase block mb-1">Rule Title</label>
                <input
                  type="text"
                  placeholder="e.g. Inbound Spanish Leads Router"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold uppercase block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="What does this workflow automate?"
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold uppercase block mb-1">Trigger Event</label>
                <select
                  value={newTrigger}
                  onChange={e => setNewTrigger(e.target.value as InboxAutomationTriggerType)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none"
                >
                  <option value="new_inbound_message">New Inbound Message</option>
                  <option value="vip_customer_contacted">VIP Customer Contacted</option>
                  <option value="keyword_match">Keyword Match</option>
                  <option value="after_hours_message">After Hours Message</option>
                  <option value="sentiment_negative">Negative Sentiment Detected</option>
                  <option value="sla_breach_warning">SLA Breach Warning</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNew}
                disabled={!newTitle.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Save Automation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
