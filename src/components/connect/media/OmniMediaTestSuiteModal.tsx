import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  XCircle,
  Play,
  Shield,
  Zap,
  Layers,
  Server,
  Clock,
  Radio,
  Sparkles,
  Lock
} from 'lucide-react';
import { OmniConnectEngine } from '../../../engine/omni_connect_engine';
import { MediaTestSuiteResult } from '../../../types/omni_media_meetings';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  engine: OmniConnectEngine;
}

export const OmniMediaTestSuiteModal: React.FC<Props> = ({ isOpen, onClose, engine }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<MediaTestSuiteResult | null>(null);

  if (!isOpen) return null;

  const handleRunTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      const result = engine.runMediaTestSuite();
      setTestResult(result);
      setIsRunning(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5 p-6 text-white font-sans animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">OMNI Media & Meeting Platform Test Suite</h2>
              <p className="text-xs text-slate-400">Automated Validation: SFU Mesh, NetEQ Jitter, SHA-256 Storage, 10k Broadcast</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>

        {/* Action Run Bar */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-200">Comprehensive 6-Scenario Automated Verification</div>
            <div className="text-[11px] text-slate-400">Executes real-time simulated network loss, SFU negotiation & crypto proofs</div>
          </div>

          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30 flex items-center gap-2"
          >
            {isRunning ? (
              <Zap className="w-4 h-4 animate-spin text-amber-300" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{isRunning ? 'Running Diagnostics...' : 'Execute Test Suite'}</span>
          </button>
        </div>

        {/* Results Overview */}
        {testResult && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-xs text-slate-400">Overall Status</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">
                  {testResult.passed ? 'ALL PASSED' : 'FAILED'}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-xs text-slate-400">Passed Tests</div>
                <div className="text-base font-bold text-white mt-0.5">
                  {testResult.totalPassed} / {testResult.totalTests}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-xs text-slate-400">Duration</div>
                <div className="text-base font-bold text-indigo-400 font-mono mt-0.5">
                  {testResult.benchmarkDurationMs} ms
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-xs text-slate-400">Security Standard</div>
                <div className="text-base font-bold text-violet-400 font-mono mt-0.5">
                  Kyber-1024
                </div>
              </div>
            </div>

            {/* Test Steps Detailed List */}
            <div className="space-y-3">
              {testResult.steps.map((step, idx) => (
                <div
                  key={step.stepId}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-1.5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {step.passed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                      <h4 className="text-xs font-bold text-white">
                        0{idx + 1}. {step.name}
                      </h4>
                    </div>

                    <span className="text-[10px] text-indigo-400 font-mono">
                      {step.executionTimeMs} ms
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 pl-7 leading-relaxed">
                    {step.details}
                  </p>

                  {step.extraProof && (
                    <div className="pl-7 pt-1">
                      <span className="text-[10px] text-slate-500 font-mono">
                        Proof: {step.extraProof}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
