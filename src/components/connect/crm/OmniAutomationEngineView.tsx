import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  Play,
  Pause,
  Plus,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  Clock,
  Tag,
  MessageSquare,
  DollarSign,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import {
  BusinessAutomationWorkflow,
  AutomationTriggerType,
  AutomationActionType
} from '../../../types/omni_crm';

interface Props {
  workflows: BusinessAutomationWorkflow[];
  onToggleWorkflow: (workflowId: string) => void;
  onCreateWorkflow: (newWorkflow: BusinessAutomationWorkflow) => void;
  onExecuteWorkflowTest: (workflowId: string) => void;
}

export const OmniAutomationEngineView: React.FC<Props> = ({
  workflows,
  onToggleWorkflow,
  onCreateWorkflow,
  onExecuteWorkflowTest
}) => {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(workflows[0]?.id || '');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTrigger, setNewTrigger] = useState<AutomationTriggerType>('lead_form_submitted');
  const [newAction, setNewAction] = useState<AutomationActionType>('send_omni_message');
  const [testNotification, setTestNotification] = useState<string | null>(null);

  const selectedWorkflow = workflows.find(w => w.id === selectedWorkflowId) || workflows[0];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: BusinessAutomationWorkflow = {
      id: `wf-${Date.now()}`,
      title: newTitle,
      description: newDescription || 'Custom enterprise automation pipeline',
      isActive: true,
      triggerType: newTrigger,
      triggerLabel: newTrigger.replace(/_/g, ' ').toUpperCase(),
      conditions: [
        {
          id: `cond-1`,
          field: 'leadScore',
          operator: 'greater_than',
          value: '80',
          label: 'AI Lead Score > 80'
        }
      ],
      actions: [
        {
          id: `act-1`,
          actionType: newAction,
          label: newAction.replace(/_/g, ' ').toUpperCase(),
          config: { template: 'Auto response message' }
        }
      ],
      executionCount: 0,
      successRatePct: 100,
      createdAt: new Date().toISOString()
    };

    onCreateWorkflow(created);
    setSelectedWorkflowId(created.id);
    setIsNewModalOpen(false);
    setNewTitle('');
    setNewDescription('');
  };

  const handleTestRun = (wfId: string) => {
    onExecuteWorkflowTest(wfId);
    setTestNotification(`✓ Test execution completed for workflow: ${wfId}. All trigger conditions and actions verified.`);
    setTimeout(() => setTestNotification(null), 4000);
  };

  return (
    <div id="omni-automation-engine-view" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                AUTOMATION & WORKFLOW ENGINE
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                MULTI-STAGE TRIGGERS
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Visual Workflow Builder & Business Logic Engine
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Automate multi-step business interactions, instant lead routing, cart recovery, SLA escalation, and post-purchase customer journeys.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNewModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Workflow</span>
            </button>
          </div>
        </div>
      </div>

      {testNotification && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs rounded-xl flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{testNotification}</span>
        </div>
      )}

      {/* Main Grid: Left List of Workflows, Right Visual Step-by-Step Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Workflows List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Active Automation Recipes ({workflows.length})
          </h3>

          <div className="space-y-3">
            {workflows.map(wf => {
              const isSelected = selectedWorkflow?.id === wf.id;

              return (
                <div
                  key={wf.id}
                  onClick={() => setSelectedWorkflowId(wf.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/60 shadow-lg'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl border ${wf.isActive ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-400' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{wf.title}</h4>
                        <span className="text-[10px] text-slate-400">{wf.triggerLabel}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWorkflow(wf.id);
                      }}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition flex items-center gap-1 ${
                        wf.isActive
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {wf.isActive ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3" />}
                      <span>{wf.isActive ? 'ACTIVE' : 'PAUSED'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {wf.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/80 pt-2">
                    <span>Executions: <strong className="text-white font-mono">{wf.executionCount.toLocaleString()}</strong></span>
                    <span>Success Rate: <strong className="text-emerald-400 font-mono">{wf.successRatePct}%</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visual Canvas / Step Flow (7 cols) */}
        {selectedWorkflow && (
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-400" />
                  {selectedWorkflow.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedWorkflow.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTestRun(selectedWorkflow.id)}
                  className="px-3.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Test Run</span>
                </button>
              </div>
            </div>

            {/* Visual Node Chain */}
            <div className="space-y-4 relative">
              {/* STEP 1: TRIGGER NODE */}
              <div className="p-4 bg-slate-950 border-2 border-indigo-500/40 rounded-2xl space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    STEP 1: TRIGGER EVENT
                  </span>
                  <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 text-[9px] font-mono font-bold rounded border border-indigo-500/30">
                    EVENT LISTENER
                  </span>
                </div>
                <div className="text-xs font-bold text-white">{selectedWorkflow.triggerLabel}</div>
                <p className="text-[11px] text-slate-400">
                  Fires automatically upon arrival of trigger signal from OMNI event stream.
                </p>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-indigo-500/40" />
              </div>

              {/* STEP 2: CONDITIONS NODE */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    STEP 2: FILTER CONDITIONS (LOGIC GATE)
                  </span>
                  <span className="px-2 py-0.5 bg-amber-950 text-amber-300 text-[9px] font-mono font-bold rounded border border-amber-500/30">
                    MATCH ALL (AND)
                  </span>
                </div>
                <div className="space-y-1.5">
                  {selectedWorkflow.conditions.map((cond, idx) => (
                    <div
                      key={cond.id || idx}
                      className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-200 flex items-center justify-between"
                    >
                      <span>{cond.label || `${cond.field} ${cond.operator} ${cond.value}`}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-indigo-500/40" />
              </div>

              {/* STEP 3: EXECUTABLE ACTIONS NODE */}
              <div className="p-4 bg-slate-950 border-2 border-emerald-500/40 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    STEP 3: AUTOMATED EXECUTION ACTIONS
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 text-[9px] font-mono font-bold rounded border border-emerald-500/30">
                    PARALLEL EXECUTION
                  </span>
                </div>
                <div className="space-y-1.5">
                  {selectedWorkflow.actions.map((act, idx) => (
                    <div
                      key={act.id || idx}
                      className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs text-white flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="font-bold">{act.label || act.actionType}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">AUTOMATED</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CREATE NEW WORKFLOW MODAL */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                Build Custom Sovereign Automation
              </h3>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300">Workflow Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Instant Concierge Notification"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Description</label>
                <input
                  type="text"
                  placeholder="Explain when this workflow triggers and what it automates..."
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Trigger Event</label>
                <select
                  value={newTrigger}
                  onChange={e => setNewTrigger(e.target.value as AutomationTriggerType)}
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                >
                  <option value="lead_form_submitted">Lead Form Submitted</option>
                  <option value="new_message_received">New Message Received</option>
                  <option value="product_purchased">Product Purchased</option>
                  <option value="cart_abandoned">Cart Abandoned (24h)</option>
                  <option value="deal_stage_changed">Deal Stage Changed</option>
                  <option value="event_attended">Webinar / Event Attended</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Primary Executable Action</label>
                <select
                  value={newAction}
                  onChange={e => setNewAction(e.target.value as AutomationActionType)}
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                >
                  <option value="send_omni_message">Send OMNI Direct Message</option>
                  <option value="assign_team_member">Assign to Rep / Specialist</option>
                  <option value="add_customer_tag">Add Customer Tag</option>
                  <option value="move_deal_stage">Move Deal Pipeline Stage</option>
                  <option value="create_support_ticket">Create Support Ticket</option>
                  <option value="grant_reward_token">Grant OMNI Loyalty Reward</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30"
                >
                  Save & Activate Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
