import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  Lock,
  Database,
  Layers,
  Network,
  Terminal,
  FileCheck,
  AlertTriangle
} from 'lucide-react';
import { OmniConnectEngine } from '../../../engine/omni_connect_engine';

interface OmniRelationshipTestSuiteProps {
  engine: OmniConnectEngine;
}

interface TestResultItem {
  id: string;
  name: string;
  status: 'passed' | 'failed';
  description: string;
  durationMs: number;
  details: string;
  proofHash: string;
}

export const OmniRelationshipTestSuite: React.FC<OmniRelationshipTestSuiteProps> = ({ engine }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResultItem[]>([]);
  const [lastExecuted, setLastExecuted] = useState<string | null>(null);

  const runAllTests = async () => {
    setIsRunning(true);
    try {
      const suiteResults = await engine.runRelationshipTestSuite();
      setResults(suiteResults);
      setLastExecuted(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Test suite error:', err);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    runAllTests();
  }, []);

  const totalPassed = results.filter(r => r.status === 'passed').length;
  const totalFailed = results.filter(r => r.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Automated Integrity & Privacy Guardrails
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 font-mono">
              5 Verification Tests
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Relationship Graph Security & Privacy Verification Suite
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Automated cryptographic testing framework ensuring strict compliance with zero data leakage, explicit consent validation, seamless CRM synchronization, and multi-tenant partitioning barriers.
          </p>
        </div>

        <button
          onClick={runAllTests}
          disabled={isRunning}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20"
        >
          {isRunning ? (
            <>
              <RotateCcw className="w-4 h-4 animate-spin" />
              <span>Executing Tests...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Rerun 5 Verification Scenarios</span>
            </>
          )}
        </button>
      </div>

      {/* Summary Metrics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Total Scenarios</span>
            <div className="text-2xl font-extrabold text-white font-mono">{results.length}</div>
          </div>
          <Terminal className="w-8 h-8 text-slate-600" />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Passed Checks</span>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">{totalPassed}</div>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500/40" />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Failed Checks</span>
            <div className="text-2xl font-extrabold text-rose-400 font-mono">{totalFailed}</div>
          </div>
          <XCircle className="w-8 h-8 text-rose-500/40" />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold">Last Verified</span>
            <div className="text-xs font-mono text-indigo-300 font-semibold mt-1">
              {lastExecuted || 'Pending execution'}
            </div>
          </div>
          <Clock className="w-8 h-8 text-indigo-500/40" />
        </div>
      </div>

      {/* Test Scenarios Details */}
      <div className="space-y-4">
        {results.map((test, index) => {
          const isPassed = test.status === 'passed';
          return (
            <div
              key={test.id}
              className={`bg-slate-900 border rounded-2xl p-6 shadow-xl space-y-4 transition-all ${
                isPassed ? 'border-slate-800 hover:border-emerald-500/50' : 'border-rose-900/50 bg-rose-950/20'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs font-mono ${
                    isPassed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <span>{test.name}</span>
                      {isPassed ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                          Passed
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                          Failed
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{test.description}</p>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-400 font-mono shrink-0">
                  <span>Execution: <strong>{test.durationMs}ms</strong></span>
                </div>
              </div>

              {/* Execution Details & Merkle Proof */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200">{test.details}</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Cryptographic Proof Hash:</span>
                  <span className="text-indigo-400 truncate max-w-xs">{test.proofHash}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
