import React, { useState } from 'react';
import {
  Shield,
  Users,
  FileCheck,
  CreditCard,
  Lock,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Download,
  Clock,
  Key,
  Database,
  Cpu,
  Layers,
  FileText,
  DollarSign
} from 'lucide-react';
import {
  WhiteLabelTenant,
  EnterpriseMember,
  TenantAuditLog,
  TenantBillingConfig
} from '../../../types/omni_white_label';
import {
  SEED_ENTERPRISE_MEMBERS,
  SEED_TENANT_AUDIT_LOGS
} from '../../../data/omni_white_label_seed';

interface OmniEnterpriseAdminPortalProps {
  tenant: WhiteLabelTenant;
  onUpdateTenant: (updated: WhiteLabelTenant) => void;
}

export const OmniEnterpriseAdminPortal: React.FC<OmniEnterpriseAdminPortalProps> = ({
  tenant,
  onUpdateTenant,
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'moderation' | 'audit' | 'billing'>('users');
  const [members, setMembers] = useState<EnterpriseMember[]>(SEED_ENTERPRISE_MEMBERS);
  const [auditLogs, setAuditLogs] = useState<TenantAuditLog[]>(SEED_TENANT_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const [dlpEnabled, setDlpEnabled] = useState(true);
  const [retentionDays, setRetentionDays] = useState(tenant.securityCompliance.dataRetentionDays);

  const handleRoleChange = (memberId: string, newRole: EnterpriseMember['role']) => {
    setMembers(prev =>
      prev.map(m => (m.id === memberId ? { ...m, role: newRole } : m))
    );
  };

  const handleToggleStatus = (memberId: string) => {
    setMembers(prev =>
      prev.map(m =>
        m.id === memberId
          ? { ...m, status: m.status === 'active' ? 'suspended' : 'active' }
          : m
      )
    );
  };

  const exportAuditLogs = () => {
    const jsonStr = JSON.stringify(auditLogs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omni-audit-log-${tenant.slug}-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Portal Top Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">Enterprise Governance & Admin Portal</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-500/20 text-indigo-300">
                  {tenant.branding.brandName}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Manage organizational RBAC roles, compliance policies, cryptographic audit trails, and billing meters.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportAuditLogs}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
            >
              <Download className="w-4 h-4" />
              Export Cryptographic Audit
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          {[
            { id: 'users', label: 'User Directory & RBAC', icon: Users, count: members.length },
            { id: 'moderation', label: 'Content Policies & DLP', icon: FileCheck },
            { id: 'audit', label: 'Immutable Audit Trail', icon: Lock, count: auditLogs.length },
            { id: 'billing', label: 'Billing, Usage & Reseller', icon: CreditCard },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-1 px-1.5 py-0.2 bg-slate-800 rounded-full text-[10px] font-mono text-slate-300">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. USERS & RBAC */}
      {activeTab === 'users' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              Role-Based Access Control & Member Roster
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or role..."
                className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 w-64"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
            {members
              .filter(m =>
                m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.email.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(mem => (
                <div key={mem.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={mem.avatarUrl} alt={mem.fullName} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{mem.fullName}</span>
                        {mem.twoFactorEnabled && (
                          <span className="px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-mono">
                            2FA ACTIVE
                          </span>
                        )}
                        {mem.status === 'suspended' && (
                          <span className="px-1.5 py-0.2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded text-[9px] font-mono">
                            SUSPENDED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{mem.title} • <span className="font-mono text-slate-500">{mem.email}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    <select
                      value={mem.role}
                      onChange={e => handleRoleChange(mem.id, e.target.value as any)}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                    >
                      <option value="tenant_owner">Tenant Owner</option>
                      <option value="dept_admin">Department Admin</option>
                      <option value="moderator">Moderator</option>
                      <option value="member">Employee Member</option>
                      <option value="external_partner">External Partner</option>
                      <option value="guest">Guest</option>
                    </select>

                    <button
                      onClick={() => handleToggleStatus(mem.id)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                        mem.status === 'active'
                          ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {mem.status === 'active' ? 'Suspend' : 'Reactivate'}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 2. POLICIES & DLP */}
      {activeTab === 'moderation' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-indigo-400" />
              Automated Data Loss Prevention (DLP) & Moderation Rules
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Automated Secret & Key Redaction</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Automatically redact credit card numbers, private keys, and ITAR identifiers before messages are saved to disk.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={dlpEnabled}
                  onChange={e => setDlpEnabled(e.target.checked)}
                  className="w-5 h-5 rounded text-indigo-600 bg-slate-900 border-slate-800"
                />
              </div>

              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Data Retention Policy (Days)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ephemeral retention period for chat messages and direct voice clips.
                  </p>
                </div>
                <input
                  type="number"
                  value={retentionDays}
                  onChange={e => setRetentionDays(Number(e.target.value))}
                  className="w-24 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
                <h4 className="text-sm font-bold text-white">Blocked External SaaS Endpoints</h4>
                <p className="text-xs text-slate-400">
                  Unapproved LLMs or third-party webhooks are blocked at the sovereign reverse proxy.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                  <span className="px-2.5 py-1 bg-rose-500/10 text-rose-300 border border-rose-500/20 rounded-lg">
                    *.unapproved-ai.com (BLOCKED)
                  </span>
                  <span className="px-2.5 py-1 bg-rose-500/10 text-rose-300 border border-rose-500/20 rounded-lg">
                    *.pastebin.com (BLOCKED)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. IMMUTABLE AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-400" />
              Cryptographic Audit Log Trail (SHA-256 Verified)
            </h2>
            <span className="text-xs text-slate-500 font-mono">SOC2 & ITAR COMPLIANT</span>
          </div>

          <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60 font-mono text-xs">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3.5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'success'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {log.status.toUpperCase()}
                    </span>
                    <span className="text-white font-bold">{log.action}</span>
                  </div>
                  <span className="text-slate-500 text-[11px]">{log.timestamp}</span>
                </div>

                <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-3">
                  <span>Actor: <span className="text-slate-200">{log.actorEmail}</span></span>
                  <span>•</span>
                  <span>Target: <span className="text-indigo-300">{log.targetResource}</span></span>
                  <span>•</span>
                  <span>IP: <span className="text-slate-400">{log.ipAddress}</span></span>
                </div>

                <div className="text-[10px] text-slate-500 truncate flex items-center gap-2">
                  <span className="text-slate-600">HASH:</span>
                  <span className="text-slate-400 truncate">{log.cryptographicHash}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. BILLING & USAGE */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-xs text-slate-400">Current Plan</span>
              <h3 className="text-lg font-bold text-white">{tenant.billing.planName}</h3>
              <p className="text-xs text-indigo-400 font-mono">${tenant.billing.monthlyBaseFee}/month</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-xs text-slate-400">Active Seats</span>
              <h3 className="text-lg font-bold text-white font-mono">
                {tenant.billing.usageMeters.activeUsersCount} / {tenant.billing.usageMeters.userLimit}
              </h3>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full"
                  style={{ width: `${(tenant.billing.usageMeters.activeUsersCount / tenant.billing.usageMeters.userLimit) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-xs text-slate-400">Storage Used</span>
              <h3 className="text-lg font-bold text-white font-mono">
                {tenant.billing.usageMeters.storageUsedGb} GB / {tenant.billing.usageMeters.storageLimitGb} GB
              </h3>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-sky-500 h-full rounded-full"
                  style={{ width: `${(tenant.billing.usageMeters.storageUsedGb / tenant.billing.usageMeters.storageLimitGb) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-xs text-slate-400">AI Tokens Meter</span>
              <h3 className="text-lg font-bold text-white font-mono">
                {(tenant.billing.usageMeters.aiTokensUsed / 1000000).toFixed(1)}M / {(tenant.billing.usageMeters.aiTokenLimit / 1000000).toFixed(0)}M
              </h3>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${(tenant.billing.usageMeters.aiTokensUsed / tenant.billing.usageMeters.aiTokenLimit) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Invoices List */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-400" />
              Settlement History & Invoices
            </h3>

            <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
              {tenant.billing.invoices.map(inv => (
                <div key={inv.id} className="p-4 flex items-center justify-between gap-4 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="text-white font-bold block">{inv.id}</span>
                      <span className="text-slate-500">{inv.period}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-white font-bold">${inv.amountDue.toLocaleString()}</span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px]">
                      PAID
                    </span>
                    <button className="text-indigo-400 hover:text-indigo-300 transition">
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
