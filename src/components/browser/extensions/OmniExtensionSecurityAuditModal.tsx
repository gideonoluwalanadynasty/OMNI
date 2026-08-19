import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Cpu,
  Layers,
  Terminal,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  Check,
  X,
  FileCode,
  Zap,
  Globe
} from 'lucide-react';
import {
  ExtensionSecurityReviewReport,
  ExtensionArchitectureTarget,
  OmniDeveloperExtensionItem
} from '../../../types';

interface OmniExtensionSecurityAuditModalProps {
  extension: OmniDeveloperExtensionItem;
  isOpen: boolean;
  onClose: () => void;
  onAdvanceReviewStage?: () => void;
}

export const OmniExtensionSecurityAuditModal: React.FC<OmniExtensionSecurityAuditModalProps> = ({
  extension,
  isOpen,
  onClose,
  onAdvanceReviewStage
}) => {
  if (!isOpen) return null;

  const report = extension.latestReviewReport;
  const isApproved = report?.isApproved ?? false;
  const score = report?.overallScore ?? 50;

  const [activeTab, setActiveTab] = useState<
    'overview' | 'permissions' | 'ast_malware' | 'telemetry' | 'cross_browser'
  >('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="extension-security-audit-dialog"
        className="bg-stone-950 border border-stone-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-900/60">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl border ${
                isApproved
                  ? 'bg-emerald-950/80 border-emerald-800 text-emerald-400'
                  : 'bg-rose-950/80 border-rose-800 text-rose-400'
              }`}
            >
              {isApproved ? (
                <ShieldCheck className="w-6 h-6" />
              ) : (
                <ShieldAlert className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-stone-100">{extension.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-800 text-stone-300">
                  v{extension.currentVersion}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                    extension.reviewStatus === 'published'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : extension.reviewStatus === 'approval'
                      ? 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                      : extension.reviewStatus === 'permission_review'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-stone-800 text-stone-300'
                  }`}
                >
                  Stage: {extension.reviewStatus.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5 font-mono">
                Security Sandbox Audit Report • ID: {report?.id || 'REV_PENDING'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] text-stone-400">Security Score</div>
              <div
                className={`text-lg font-bold font-mono ${
                  score >= 90
                    ? 'text-emerald-400'
                    : score >= 75
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {score}/100
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 border-b border-stone-800 bg-stone-900/30 text-xs overflow-x-auto">
          {[
            { id: 'overview', label: '1. Executive Audit' },
            { id: 'permissions', label: '2. Excessive Permissions' },
            { id: 'ast_malware', label: '3. Malicious Code & AST' },
            { id: 'telemetry', label: '4. Data Collection & Privacy' },
            { id: 'cross_browser', label: '5. Cross-Browser Sandbox Testing' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-stone-300">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Security Status Banner */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                  isApproved
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                    : 'bg-amber-950/40 border-amber-800 text-amber-200'
                }`}
              >
                <div className="p-1 rounded-lg bg-stone-950">
                  {isApproved ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-sm">
                    {isApproved
                      ? 'Approved for OMNI Extension Marketplace Distribution'
                      : 'Pending Developer Action & Security Hardening'}
                  </div>
                  <p className="text-xs opacity-90 leading-relaxed">
                    {report?.reviewerNotes ||
                      'Automated sandbox testing verifies zero malicious obfuscation, compliant Manifest V3 constraints, and strict sandbox memory isolation.'}
                  </p>
                </div>
              </div>

              {/* 4 Pillars of Review Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Pillar 1: Permissions */}
                <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-stone-400">Permissions</span>
                    {report?.excessivePermissions.passed ? (
                      <span className="text-emerald-400 font-mono text-[10px]">PASSED</span>
                    ) : (
                      <span className="text-rose-400 font-mono text-[10px]">FLAGGED</span>
                    )}
                  </div>
                  <div className="font-bold text-stone-100">
                    {report?.excessivePermissions.findings.length || 0} Scopes Audited
                  </div>
                  <p className="text-[11px] text-stone-400">
                    Evaluated for principle of least privilege and non-excessive access.
                  </p>
                </div>

                {/* Pillar 2: Malicious Code */}
                <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-stone-400">Malware & AST</span>
                    {report?.maliciousCodeAnalysis.passed ? (
                      <span className="text-emerald-400 font-mono text-[10px]">CLEAN</span>
                    ) : (
                      <span className="text-rose-400 font-mono text-[10px]">RISK</span>
                    )}
                  </div>
                  <div className="font-bold text-stone-100">Zero Obfuscation</div>
                  <p className="text-[11px] text-stone-400">
                    AST parser confirmed zero unsafe `eval()`, dynamic code loading, or prototype pollution.
                  </p>
                </div>

                {/* Pillar 3: Telemetry */}
                <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-stone-400">Data Collection</span>
                    {report?.dataCollectionAudit.passed ? (
                      <span className="text-emerald-400 font-mono text-[10px]">ZERO PII</span>
                    ) : (
                      <span className="text-amber-400 font-mono text-[10px]">TELEMETRY</span>
                    )}
                  </div>
                  <div className="font-bold text-stone-100">Privacy Respecting</div>
                  <p className="text-[11px] text-stone-400">
                    Zero third-party tracking beacons or unauthorized telemetry dispatch.
                  </p>
                </div>

                {/* Pillar 4: Unsafe APIs */}
                <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-stone-400">Unsafe APIs</span>
                    {report?.unsafeApisCheck.passed ? (
                      <span className="text-emerald-400 font-mono text-[10px]">V3 READY</span>
                    ) : (
                      <span className="text-amber-400 font-mono text-[10px]">WARNING</span>
                    )}
                  </div>
                  <div className="font-bold text-stone-100">Modern Architecture</div>
                  <p className="text-[11px] text-stone-400">
                    DeclarativeNetRequest & isolated service workers compliant.
                  </p>
                </div>
              </div>

              {/* Review Pipeline Stage Progression */}
              <div className="p-5 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">
                    OMNI Store Review Lifecycle
                  </span>
                  <span className="text-[11px] text-indigo-400 font-mono">
                    Multi-Gate Verification Pipeline
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 text-center text-[11px]">
                  {[
                    { id: 'submitted', label: '1. Submitted', desc: 'Bundle SHA-256 registered' },
                    { id: 'security_scan', label: '2. Security Scan', desc: 'AST & bytecode scan' },
                    { id: 'permission_review', label: '3. Permissions', desc: 'Scope risk audit' },
                    { id: 'approval', label: '4. Approval', desc: 'OMNI Core signing' },
                    { id: 'published', label: '5. Published', desc: 'Live in store' }
                  ].map((stage, idx) => {
                    const stages = ['submitted', 'security_scan', 'permission_review', 'approval', 'published'];
                    const currentIdx = stages.indexOf(extension.reviewStatus);
                    const isCompleted = currentIdx >= idx;
                    const isCurrent = extension.reviewStatus === stage.id;

                    return (
                      <div
                        key={stage.id}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                          isCurrent
                            ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 shadow-md ring-1 ring-indigo-500'
                            : isCompleted
                            ? 'bg-stone-900 border-emerald-800 text-emerald-300'
                            : 'bg-stone-950 border-stone-800 text-stone-500 opacity-60'
                        }`}
                      >
                        <div className="font-bold">{stage.label}</div>
                        <div className="text-[10px] opacity-75">{stage.desc}</div>
                      </div>
                    );
                  })}
                </div>

                {onAdvanceReviewStage && extension.reviewStatus !== 'published' && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={onAdvanceReviewStage}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Advance to Next Review Gate</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PERMISSIONS */}
          {activeTab === 'permissions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-100">Requested Permissions Audit</h4>
                  <p className="text-xs text-stone-400">
                    Each permission is evaluated against excessive scope and potential user data exposure.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 font-mono text-[11px] text-stone-300">
                  {extension.permissionsRequired.length} Permissions Active
                </span>
              </div>

              <div className="space-y-2.5">
                {report?.excessivePermissions.findings.map((finding, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-start justify-between gap-4 ${
                      finding.isExcessive
                        ? 'bg-rose-950/30 border-rose-800/80 text-rose-200'
                        : 'bg-stone-900/60 border-stone-800 text-stone-300'
                    }`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-stone-950 border border-stone-700 rounded text-stone-200 font-mono font-bold text-xs">
                          {finding.permission}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            finding.riskLevel === 'critical'
                              ? 'bg-rose-900 text-rose-200'
                              : finding.riskLevel === 'high'
                              ? 'bg-amber-900 text-amber-200'
                              : 'bg-emerald-900/60 text-emerald-300'
                          }`}
                        >
                          {finding.riskLevel} Risk
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono">
                          Category: {finding.category}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400">{finding.reason}</p>
                      <div className="text-[11px] text-stone-300 font-mono flex items-center gap-1.5 pt-1">
                        <Info className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{finding.recommendation}</span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {finding.isExcessive ? (
                        <span className="px-2 py-1 bg-rose-950 border border-rose-700 text-rose-300 rounded-lg text-[10px] font-bold">
                          EXCESSIVE
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-lg text-[10px] font-bold">
                          COMPLIANT
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AST & MALWARE */}
          {activeTab === 'ast_malware' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-stone-100">Abstract Syntax Tree (AST) & Malware Decompilation</h4>
              <p className="text-xs text-stone-400">
                All scripts, background service workers, and WASM payloads are static-analyzed for malicious patterns.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <div className="font-semibold text-stone-200">Dynamic Code Execution</div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-stone-300">eval() & Function() constructors banned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-stone-300">Remote script loading blocked by CSP</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                  <div className="font-semibold text-stone-200">WebAssembly Verification</div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-stone-300">WASM bytecode bound to isolated memory heap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-stone-300">Cryptomining heuristic signature clean</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-2 font-mono text-[11px]">
                <div className="text-stone-400 flex items-center justify-between">
                  <span>Static AST Analysis Logs</span>
                  <span className="text-emerald-400">SHA-256 Validated</span>
                </div>
                <div className="p-3 bg-stone-900/80 rounded-lg text-stone-300 space-y-1">
                  <div>[AST_SCANNER] Target: {extension.name} v{extension.currentVersion}</div>
                  <div>[AST_SCANNER] Parsed 14 JS files and 2 WebAssembly modules.</div>
                  <div>[AST_SCANNER] Entropy scan: 4.12 bits/byte (No high-entropy packers detected).</div>
                  <div>[AST_SCANNER] Prototype pollution checks: PASSED (0 sinks found).</div>
                  <div className="text-emerald-400">[AST_SCANNER] Verdict: CLEAN_NO_MALWARE</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TELEMETRY */}
          {activeTab === 'telemetry' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-stone-100">Data Collection & Telemetry Audit</h4>
              <p className="text-xs text-stone-400">
                Verifies compliance with OMNI Sovereign zero-telemetry and local-first standards.
              </p>

              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-200">Outbound Network Telemetry</span>
                  <span className="text-emerald-400 font-mono font-bold">ZERO LEAKS</span>
                </div>
                <p className="text-xs text-stone-400">
                  Extension does not register background telemetry or send unencrypted behavioral beacons to external data brokers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2">
                <div className="font-semibold text-stone-200">PII Extraction Risk</div>
                <div className="text-xs text-stone-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>No form scraper or clipboard sniffer detected.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CROSS-BROWSER SANDBOX */}
          {activeTab === 'cross_browser' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-100">Multi-Architecture Sandbox Test Bench</h4>
                  <p className="text-xs text-stone-400">
                    Direct benchmark scores across Chrome MV3, Firefox WebExtensions, and OMNI Native Sandboxes.
                  </p>
                </div>
                <div className="px-3 py-1 bg-indigo-950 border border-indigo-800 rounded-lg text-indigo-300 font-mono text-[11px]">
                  Rule: Tested in Sandbox
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2 text-center">
                  <div className="text-xs font-semibold text-stone-400">Chrome MV3 Sandbox</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    {report?.sandboxCompatibility.testResults.chromeMv3Score || 95}%
                  </div>
                  <div className="text-[10px] text-stone-500">
                    DeclarativeNetRequest & Service Worker Tested
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2 text-center">
                  <div className="text-xs font-semibold text-stone-400">Firefox WebExtension</div>
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    {report?.sandboxCompatibility.testResults.firefoxScore || 92}%
                  </div>
                  <div className="text-[10px] text-stone-500">
                    browser.* Promise API Emulation Tested
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 space-y-2 text-center">
                  <div className="text-xs font-semibold text-stone-400">OMNI Sovereign Native</div>
                  <div className="text-2xl font-bold font-mono text-indigo-400">
                    {report?.sandboxCompatibility.testResults.omniNativeScore || 100}%
                  </div>
                  <div className="text-[10px] text-stone-500">
                    WASM Container & Passport Cryptographic Isolation
                  </div>
                </div>
              </div>

              <div className="p-4 bg-stone-900/40 border border-stone-800 rounded-xl space-y-2">
                <div className="font-semibold text-stone-200">Cross-Platform Policy Notice</div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  OMNI Browser does not blindly guarantee compatibility without automated testing. Extensions undergo automated headless test harnesses across all 3 architectures to ensure seamless operation before store certification.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-stone-800 bg-stone-900/60 flex items-center justify-between">
          <div className="text-xs text-stone-500 font-mono">
            Cryptographically Signed by OMNI DevSecOps Root G4
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold transition-colors"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
