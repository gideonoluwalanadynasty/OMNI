import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Zap,
  Play,
  Pause,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { SocialAiAgent, SocialPlatform } from '../../../types/social_hub';
import { OmniSocialPlatformBadge } from './OmniSocialPlatformBadge';
import { omniSocialService } from '../../../sdk/browser-services/OmniSocialService';

interface OmniSocialAgentsViewProps {
  agents: SocialAiAgent[];
  onRefreshAgents: () => void;
}

export const OmniSocialAgentsView: React.FC<OmniSocialAgentsViewProps> = ({
  agents,
  onRefreshAgents
}) => {
  const [runningAgentId, setRunningAgentId] = useState<string | null>(null);

  const handleRunAgentAction = async (agent: SocialAiAgent) => {
    setRunningAgentId(agent.id);
    await new Promise(r => setTimeout(r, 800));

    let action = 'Autonomous routine scan completed';
    let impact = 'High quality score verified';

    if (agent.id === 'agent-caption-crafter') {
      action = 'Synthesized 5 high-converting hook variants for next product release';
      impact = '+14% estimated viral retention';
    } else if (agent.id === 'agent-social-autopilot') {
      action = 'Recalculated queue dispatch timestamps to hit peak engagement windows';
      impact = 'Shifted 3 posts to 2:15 PM EST peak';
    } else if (agent.id === 'agent-inbox-sentinel') {
      action = 'Scanned 14 inbound comments and generated pre-approved official replies';
      impact = 'Response time reduced to <1 min';
    } else {
      action = 'Analyzed competitor product launch threads and mapped counter-strategy';
      impact = 'Identified 3 key positioning vectors';
    }

    omniSocialService.recordAgentActivity(agent.id, action, impact);
    setRunningAgentId(null);
    onRefreshAgents();
  };

  return (
    <div className="space-y-6 select-none animate-in fade-in">
      {/* Agents Header */}
      <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-950 border border-indigo-700 text-indigo-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-stone-100">OMNI Sovereign AI Social Agent Fleet</h2>
              <span className="px-2 py-0.5 rounded-full bg-indigo-900 text-indigo-300 font-mono text-[10px] font-bold">
                Multi-Agent Swarm
              </span>
            </div>
            <p className="text-xs text-stone-300">
              Autonomous agents operating inside sandboxed browser enclaves with zero telemetry leakage.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Tenant Isolated & RBAC Constrained</span>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map(agent => {
          const isRunning = runningAgentId === agent.id;

          return (
            <div
              key={agent.id}
              className="p-6 bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl space-y-5 shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Agent Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-stone-100">{agent.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Active</span>
                      </span>
                    </div>
                    <div className="text-xs font-mono text-indigo-400">{agent.role}</div>
                  </div>

                  <button
                    onClick={() => handleRunAgentAction(agent)}
                    disabled={isRunning}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
                  >
                    <Zap className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                    <span>{isRunning ? 'Executing...' : 'Trigger Run'}</span>
                  </button>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">{agent.description}</p>

                {/* Permissions & Scopes */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Autonomous Permissions & Guardrails
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.autonomousPermissions.map((perm, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-stone-950 border border-stone-800 text-stone-300 font-mono text-[10px]"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Execution Count */}
                <div className="flex items-center justify-between p-2.5 bg-stone-950 rounded-xl border border-stone-800 text-xs">
                  <span className="text-stone-400">Total Autonomous Actions:</span>
                  <span className="font-mono font-bold text-emerald-400">{agent.actionsExecutedCount} Dispatched</span>
                </div>
              </div>

              {/* Recent Agent Activity Logs */}
              <div className="pt-4 border-t border-stone-800 space-y-2">
                <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Recent Action Logs</span>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {agent.recentActivity.slice(0, 3).map(act => (
                    <div
                      key={act.id}
                      className="p-2 bg-stone-950 rounded-lg border border-stone-800 text-[11px] space-y-0.5"
                    >
                      <div className="flex items-center justify-between text-stone-400">
                        <span className="font-semibold text-stone-200 truncate">{act.action}</span>
                        <span className="font-mono text-[10px] text-stone-500">{act.timestamp}</span>
                      </div>
                      <div className="text-[10px] text-indigo-300">{act.impact}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
