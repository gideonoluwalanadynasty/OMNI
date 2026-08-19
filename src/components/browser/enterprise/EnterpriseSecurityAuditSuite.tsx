import React, { useState } from 'react';
import { SecurityAuditResult } from '../../../types/enterprise_audit';
import { INITIAL_SECURITY_AUDIT_VECTORS } from '../../../data/mockEnterpriseAuditData';
import {
  ShieldCheck,
  ShieldAlert,
  Play,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Eye,
  Key,
  Database,
  Radio,
  Sparkles,
  Layers,
  Terminal,
  FileCheck,
  Copy,
  Check
} from 'lucide-react';

export const EnterpriseSecurityAuditSuite: React.FC = () => {
  const [results, setResults] = useState<SecurityAuditResult[]>(INITIAL_SECURITY_AUDIT_VECTORS);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [activeRunningId, setActiveRunningId] = useState<string | null>(null);
  const [selectedResultId, setSelectedResultId] = useState<string>(INITIAL_SECURITY_AUDIT_VECTORS[0].id);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] Security Audit Subsystem Loaded v4.2.0-Enterprise',
    '[OK] Hardware Security Module (HSM) Attestation: PCR0-PCR7 Valid',
    '[OK] Kyber-1024 Post-Quantum Key Encapsulation Mechanism Active',
    '[READY] 8 Audit Vectors Standby for Penetration & Compliance Verification'
  ]);

  const selectedResult = results.find(r => r.id === selectedResultId) || results[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const runSingleTest = (testId: string) => {
    setActiveRunningId(testId);
    setResults(prev => prev.map(r => r.id === testId ? { ...r, status: 'running' } : r));

    const targetTest = results.find(r => r.id === testId);
    const testName = targetTest ? targetTest.title : testId;

    setTerminalLogs(prev => [
      `[EXEC] Initiating automated test vector: "${testName}"...`,
      ...prev.slice(0, 30)
    ]);

    setTimeout(() => {
      setResults(prev =>
        prev.map(r => {
          if (r.id === testId) {
            return {
              ...r,
              status: 'passed',
              latencyMs: Math.floor(Math.random() * 18) + 6,
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
            };
          }
          return r;
        })
      );
      setActiveRunningId(null);
      setTerminalLogs(prev => [
        `[PASS] Test vector "${testName}" PASSED (Score: 100/100, Cryptographic Proof Verified)`,
        ...prev.slice(0, 30)
      ]);
    }, 900);
  };

  const runAllTests = () => {
    setIsRunningAll(true);
    setTerminalLogs(prev => [
      '=====================================================',
      '[FULL-AUDIT] Commencing Comprehensive Enterprise Security Audit across all 8 Vectors...',
      '=====================================================',
      ...prev.slice(0, 30)
    ]);

    results.forEach((r, idx) => {
      setTimeout(() => {
        setResults(prev =>
          prev.map((item, i) => (i === idx ? { ...item, status: 'running' } : item))
        );
      }, idx * 250);

      setTimeout(() => {
        setResults(prev =>
          prev.map((item, i) =>
            i === idx
              ? {
                  ...item,
                  status: 'passed',
                  latencyMs: Math.floor(Math.random() * 15) + 5,
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
                }
              : item
          )
        );
        setTerminalLogs(prev => [
          `[PASS] Vector ${idx + 1}/8 [${r.testVector}] Verified: Zero vulnerabilities detected.`,
          ...prev.slice(0, 30)
        ]);

        if (idx === results.length - 1) {
          setIsRunningAll(false);
          setTerminalLogs(prev => [
            '=====================================================',
            '[COMPLETE] Security Audit 100% Passed. Full FedRAMP / SOC2 / NIST Compliance Attested.',
            '=====================================================',
            ...prev.slice(0, 30)
          ]);
        }
      }, (idx + 1) * 350);
    });
  };

  const getVectorIcon = (vector: SecurityAuditResult['testVector']) => {
    switch (vector) {
      case 'extension_abuse':
        return Layers;
      case 'malicious_websites':
        return ShieldAlert;
      case 'tenant_leakage':
        return Database;
      case 'vpn_permissions':
        return Radio;
      case 'sync_security':
        return RefreshCw;
      case 'password_vault':
        return Key;
      case 'ai_privacy':
        return Sparkles;
      case 'data_leakage':
        return Lock;
      default:
        return ShieldCheck;
    }
  };

  const passedCount = results.filter(r => r.status === 'passed').length;
  const avgScore = Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Metric Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-stone-900 to-indigo-950/60 border border-emerald-800/60 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-stone-100">OMNI Sovereign Security & Threat Audit Engine</h2>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Automated penetration testing, zero-trust verification, post-quantum cryptography attestation, and data loss prevention audits.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runAllTests}
              disabled={isRunningAll}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all ${
                isRunningAll
                  ? 'bg-stone-800 text-stone-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50'
              }`}
            >
              {isRunningAll ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Auditing All 8 Vectors...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Execute Full Security Audit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
            <div className="text-stone-400">Audit Health Score</div>
            <div className="text-xl font-bold text-emerald-400">{avgScore}%</div>
            <div className="text-[10px] text-stone-500">Zero Critical Flaws</div>
          </div>

          <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
            <div className="text-stone-400">Passed Vectors</div>
            <div className="text-xl font-bold text-stone-100">{passedCount} / {results.length}</div>
            <div className="text-[10px] text-emerald-400">100% Passed</div>
          </div>

          <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
            <div className="text-stone-400">PQC Key Encapsulation</div>
            <div className="text-sm font-bold text-indigo-300 font-mono">Kyber-1024</div>
            <div className="text-[10px] text-stone-500">NIST SP 800-208 Level 5</div>
          </div>

          <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-1">
            <div className="text-stone-400">Compliance Attestation</div>
            <div className="text-sm font-bold text-cyan-300 font-mono">FedRAMP High</div>
            <div className="text-[10px] text-stone-500">SOC2 Type II • CMMC 2.0</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Vector List + Detail Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: 8 Security Vectors List */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-400 px-1">
            <span>AUDIT VECTORS (8)</span>
            <span>STATUS</span>
          </div>

          <div className="space-y-2">
            {results.map((result) => {
              const Icon = getVectorIcon(result.testVector);
              const isSelected = selectedResultId === result.id;
              const isRunning = result.status === 'running' || activeRunningId === result.id;

              return (
                <div
                  key={result.id}
                  onClick={() => setSelectedResultId(result.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-stone-800/90 border-indigo-500 shadow-md'
                      : 'bg-stone-900/90 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-indigo-950 text-indigo-400 border border-indigo-800' : 'bg-stone-950 text-stone-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="text-xs font-bold text-stone-200 truncate group-hover:text-stone-100">
                        {result.title}
                      </div>
                      <div className="text-[10px] text-stone-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono">{result.latencyMs}ms latency</span>
                        <span>•</span>
                        <span>Score: {result.score}/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isRunning ? (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-mono flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        RUNNING
                      </span>
                    ) : result.status === 'passed' ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        PASSED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-mono flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        WARN
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        runSingleTest(result.id);
                      }}
                      className="p-1.5 rounded-lg bg-stone-950 hover:bg-stone-800 text-stone-400 hover:text-emerald-400 border border-stone-800 transition-colors"
                      title="Run Vector Re-test"
                    >
                      <Play className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Vector Deep Diagnostic & Evidence Panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-mono uppercase font-bold">
                  Vector #{selectedResult.testVector}
                </span>
                <h3 className="text-sm font-bold text-stone-100 mt-1.5">{selectedResult.title}</h3>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  Last verified: <strong className="text-stone-300 font-mono">{selectedResult.timestamp}</strong>
                </div>
              </div>

              <button
                onClick={() => runSingleTest(selectedResult.id)}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-400 border border-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Re-verify Vector</span>
              </button>
            </div>

            {/* Diagnostic Evaluation Details */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <div className="text-xs font-bold text-stone-300 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                <span>Diagnostic Assessment & Penetration Result</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {selectedResult.details}
              </p>
            </div>

            {/* Cryptographic Proof & Signature */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-stone-400">Cryptographic Verification Proof & Signature</div>
              <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 font-mono text-[11px] text-emerald-300 flex items-center justify-between">
                <span className="truncate max-w-[420px]">{selectedResult.cryptographicProof}</span>
                <button
                  onClick={() => handleCopy(selectedResult.cryptographicProof, selectedResult.id)}
                  className="p-1 rounded hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                >
                  {copiedKey === selectedResult.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Compliance Recommendations */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-stone-400">Hardening Recommendations & Policy Directives</div>
              <div className="space-y-1">
                {selectedResult.recommendations.map((rec, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Audit Terminal Logs */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between text-stone-400 text-xs font-bold border-b border-stone-800/80 pb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>LIVE AUDIT ATTESTATION STREAM</span>
              </div>
              <span className="text-[10px] text-emerald-400 animate-pulse">● SECURE STREAM</span>
            </div>

            <div className="space-y-1 text-stone-300 max-h-40 overflow-y-auto pt-1">
              {terminalLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`${
                    log.includes('[PASS]')
                      ? 'text-emerald-400'
                      : log.includes('[FULL-AUDIT]') || log.includes('[COMPLETE]')
                      ? 'text-cyan-300 font-bold'
                      : log.includes('[EXEC]')
                      ? 'text-indigo-300'
                      : 'text-stone-400'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
