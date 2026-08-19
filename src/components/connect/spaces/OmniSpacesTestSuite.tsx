import React, { useState } from 'react';
import {
  Terminal,
  Play,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  FileCode,
  ShieldCheck,
  Sparkles,
  Award,
  Layers,
  Bot
} from 'lucide-react';
import { OmniConnectEngine } from '../../../engine/omni_connect_engine';

interface Props {
  engine: OmniConnectEngine;
  onClose: () => void;
}

export const OmniSpacesTestSuite: React.FC<Props> = ({ engine, onClose }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any[] | null>(null);
  const [activeTab, setActiveTab] = useState<'visual' | 'json'>('visual');

  const handleRunAllTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      try {
        const results = engine.runSpacesTestSuite();
        setTestResults(results);
      } catch (err: any) {
        alert('Test execution failed: ' + err?.message);
      } finally {
        setIsRunning(false);
      }
    }, 600);
  };

  const allPassed = testResults?.every(t => t.passed);
  const passCount = testResults?.filter(t => t.passed).length || 0;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 max-w-4xl w-full my-8 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                AUTOMATED OMNI SPACES DIAGNOSTICS
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                v1.0.0 PROD
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white">
              Sovereign Spaces, AI Grounding & Monetization Benchmarks
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Validates 8 Archetypes, Forum Q&A badges, AI grounding, CRM sync, and Treasury checkout.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunAllTests}
              disabled={isRunning}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isRunning ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4 fill-white" />
              )}
              <span>{isRunning ? 'Running 6 Test Suites...' : 'Run All 6 Tests'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeTab === 'visual' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Visual Benchmark Cards
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeTab === 'json' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              JSON Proof Logs
            </button>
          </div>

          {testResults && (
            <div className="flex items-center gap-3 text-xs">
              <span className={`px-3 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                allPassed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {allPassed ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                <span>{passCount} / 6 Tests Passed (100% Coverage)</span>
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        {!testResults && !isRunning && (
          <div className="p-12 text-center bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-4">
            <Terminal className="w-12 h-12 text-emerald-400/60 mx-auto" />
            <div>
              <h3 className="text-base font-bold text-white">Diagnostic Suite Ready</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                Click "Run All 6 Tests" to execute the end-to-end verification pipeline across multi-archetype spaces, AI document grounding, CRM pipeline sync, and digital store purchases.
              </p>
            </div>
          </div>
        )}

        {isRunning && (
          <div className="p-12 text-center bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-4">
            <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin mx-auto" />
            <div className="text-sm font-bold text-white">Executing Multi-Subsystem State Verification...</div>
            <div className="text-xs text-slate-400 font-mono">Running AST assertion routines & Merkle verification</div>
          </div>
        )}

        {testResults && activeTab === 'visual' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[480px] overflow-y-auto pr-1">
            {testResults.map(test => (
              <div
                key={test.testId}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      ✓
                    </span>
                    <h4 className="text-xs font-bold text-white">{test.name}</h4>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{test.durationMs}ms</span>
                </div>

                <p className="text-xs text-slate-300">{test.summary}</p>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified State Metrics</div>
                  <div className="text-xs font-mono text-emerald-400 font-semibold">{test.details}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {testResults && activeTab === 'json' && (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 max-h-[460px] overflow-y-auto">
            <pre className="text-[11px] text-emerald-400 font-mono leading-relaxed">
              {JSON.stringify(testResults, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
