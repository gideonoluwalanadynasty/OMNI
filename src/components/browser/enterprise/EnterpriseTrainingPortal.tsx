import React, { useState } from 'react';
import { EnterpriseTrainingModule } from '../../../types/enterprise_audit';
import { INITIAL_TRAINING_MODULES } from '../../../data/mockEnterpriseAuditData';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Play,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Clock,
  ExternalLink
} from 'lucide-react';

export const EnterpriseTrainingPortal: React.FC = () => {
  const [modules, setModules] = useState<EnterpriseTrainingModule[]>(INITIAL_TRAINING_MODULES);
  const [activeDrillModal, setActiveDrillModal] = useState<EnterpriseTrainingModule | null>(null);
  const [drillCompleted, setDrillCompleted] = useState(false);

  const handleStartDrill = (mod: EnterpriseTrainingModule) => {
    setActiveDrillModal(mod);
    setDrillCompleted(false);
  };

  const handleCompleteDrill = () => {
    if (!activeDrillModal) return;
    setModules(prev =>
      prev.map(m => (m.id === activeDrillModal.id ? { ...m, status: 'passed', score: 100, completionRate: 100 } : m))
    );
    setDrillCompleted(true);
    setTimeout(() => {
      setActiveDrillModal(null);
      setDrillCompleted(false);
    }, 1800);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-stone-100">Enterprise Security Training & Phishing Drills</h2>
          <p className="text-xs text-stone-400">
            Interactive employee defense simulations, AI prompt injection audits, and NIST/FedRAMP verifiable certifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            94% Fleet Completion Rate
          </span>
        </div>
      </div>

      {/* Grid of Training Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-mono uppercase font-bold">
                  {mod.category.replace('_', ' ')}
                </span>
                <span className="text-[11px] text-stone-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {mod.durationMinutes} mins
                </span>
              </div>

              <div>
                <h3 className="font-bold text-stone-100 text-sm">{mod.title}</h3>
                <p className="text-stone-400 text-xs mt-1 leading-relaxed">{mod.description}</p>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-stone-800/80">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-stone-400">STATUS:</span>
                <span className={`font-bold ${mod.status === 'passed' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {mod.status === 'passed' ? `PASSED (${mod.score}%)` : 'IN PROGRESS'}
                </span>
              </div>

              <button
                onClick={() => handleStartDrill(mod)}
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{mod.status === 'passed' ? 'Retake Defense Drill' : 'Start Simulation'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Drill Simulation Modal */}
      {activeDrillModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 text-xs text-stone-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm text-stone-100">Live Defense Drill: {activeDrillModal.title}</span>
              </div>
              <button
                onClick={() => setActiveDrillModal(null)}
                className="text-stone-400 hover:text-stone-100 font-mono text-sm"
              >
                ✕
              </button>
            </div>

            {drillCompleted ? (
              <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-stone-100 text-sm">Drill Successfully Passed!</h4>
                <p className="text-emerald-300 text-xs">Cryptographic certificate issued and recorded to employee passport ledger.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                  <div className="font-bold text-amber-300 text-xs">Simulated Threat Scenario:</div>
                  <p className="text-stone-300 leading-relaxed text-xs">
                    An incoming urgent email from &quot;security-gateway@omni-defense.internal.org&quot; requests your immediate authorization to copy API keys to an un-isolated testing sandbox. What is the mandatory action?
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCompleteDrill}
                    className="w-full text-left p-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-xs font-semibold text-emerald-300 hover:border-emerald-700 transition-colors flex items-center justify-between"
                  >
                    <span>1. Report suspicious email to SIEM & Quarantine using Browser DLP Guard.</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </button>

                  <button
                    onClick={handleCompleteDrill}
                    className="w-full text-left p-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-xs text-stone-400 hover:text-stone-200 transition-colors"
                  >
                    2. Reply with redacted test credentials only.
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
