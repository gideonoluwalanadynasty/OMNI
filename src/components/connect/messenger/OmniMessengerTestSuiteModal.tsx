import React, { useState } from 'react';
import {
  X,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  ShieldCheck,
  Cpu,
  Clock,
  Download
} from 'lucide-react';
import { MessengerTestSuiteResult } from '../../../types/omni_messenger';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRunTestSuite: () => Promise<MessengerTestSuiteResult>;
}

export const OmniMessengerTestSuiteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onRunTestSuite
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<MessengerTestSuiteResult | null>(null);

  if (!isOpen) return null;

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await onRunTestSuite();
      setResults(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">OMNI Messenger Real-Time Test Suite</h3>
              <p className="text-xs text-slate-400">End-to-End Encryption, Multi-Device Sync, AI Audio & CRM Benchmarks</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Header */}
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Automated Protocol & Integration Verification
            </div>
            <p className="text-[11px] text-slate-400">
              Executes full cryptographic and multi-tenant delivery verification cycles in-memory.
            </p>
          </div>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow ${
              isRunning
                ? 'bg-amber-600/50 text-amber-200 cursor-wait'
                : 'bg-amber-500 hover:bg-amber-400 text-black font-extrabold'
            }`}
          >
            {isRunning ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                Run Suite
              </>
            )}
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto space-y-3 py-1">
          {results ? (
            <div className="space-y-3 text-xs">
              {/* Top Summary Banner */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                results.passed
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}>
                <div className="flex items-center gap-2 font-bold">
                  {results.passed ? (
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                  )}
                  <span>
                    {results.passed ? 'All Protocol Tests Passed 100%' : 'Some Tests Failed'}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span>Passed: {results.totalPassed} / {results.totalTests}</span>
                  <span>Duration: {results.benchmarkDurationMs}ms</span>
                </div>
              </div>

              {/* Individual Steps */}
              <div className="space-y-2">
                {results.steps.map(step => (
                  <div
                    key={step.stepId}
                    className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <h4 className="font-bold text-white">{step.name}</h4>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">
                        {step.executionTimeMs}ms
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 pl-6">{step.details}</p>
                    {step.extraProof && (
                      <div className="ml-6 p-2 bg-slate-900 rounded font-mono text-[10px] text-slate-400 break-all border border-slate-800">
                        {step.extraProof}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              Click <strong className="text-amber-400">"Run Suite"</strong> to initiate end-to-end encryption and real-time protocol benchmarks.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-800">
          <span className="text-[10px] text-slate-500 font-mono">
            Engine Version: OMNI-MESSENGER-V5.2-RELEASE
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
