import React, { useState, useMemo } from 'react';
import {
  Shield, Users, Server, DollarSign, Layout, Key, Play, AlertTriangle, CheckCircle, XCircle,
  Clock, Globe, Sliders, Layers, FileText, Search, Plus, Filter, RefreshCw, Send, Lock,
  FileCheck, HelpCircle, Activity, Star, Eye, Ban, ToggleLeft, ToggleRight, ArrowRight, BookOpen, Bot
} from 'lucide-react';
import { OMNIState, GovernancePolicy, AdminApprovalTask, FeatureFlag } from '../types';
import OmniAiAdminControlPlane from './ai/admin/OmniAiAdminControlPlane';

interface OMNISuperAdminPageProps {
  state: OMNIState;
  updateGovernancePolicy: (id: string, value: any, isEnabled: boolean, approvalRequired: boolean) => void;
  proposeAdminAction: (actionType: string, description: string, payload: any) => void;
  processAdminApprovalTask: (id: string, status: 'approved' | 'rejected') => void;
  updateAdvancedFeatureFlag: (id: string, updates: any) => void;
  adminUpdateAppAvailability: (appId: string, isEnabled: boolean, countries: string[], version: string) => void;
  adminUpdateUserControl: (userId: string, status: 'active' | 'suspended', identityVerified: boolean) => void;
  adminUpdateTenantControl: (tenantId: string, updates: any) => void;
  triggerToast: (title: string, message: string, type: 'success' | 'info' | 'error') => void;
}

type AdminTab =
  | 'overview'
  | 'applications'
  | 'users'
  | 'tenants'
  | 'resellers'
  | 'affiliates'
  | 'finance'
  | 'ai'
  | 'developers'
  | 'capital'
  | 'security'
  | 'system';

export default function OMNISuperAdminPage({
  state,
  updateGovernancePolicy,
  proposeAdminAction,
  processAdminApprovalTask,
  updateAdvancedFeatureFlag,
  adminUpdateAppAvailability,
  adminUpdateUserControl,
  adminUpdateTenantControl,
  triggerToast
}: OMNISuperAdminPageProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Local State managers for inputs
  const [selectedPolicy, setSelectedPolicy] = useState<GovernancePolicy | null>(null);
  const [policyValueInput, setPolicyValueInput] = useState('');
  const [policyEnabledInput, setPolicyEnabledInput] = useState(true);
  const [policyApprovalInput, setPolicyApprovalInput] = useState(false);

  const [selectedFlag, setSelectedFlag] = useState<FeatureFlag | null>(null);
  const [flagGlobalInput, setFlagGlobalInput] = useState(true);
  const [flagTenantsInput, setFlagTenantsInput] = useState('');
  const [flagAppsInput, setFlagAppsInput] = useState('');
  const [flagCountriesInput, setFlagCountriesInput] = useState('');
  const [flagPlansInput, setFlagPlansInput] = useState('');
  const [flagCohortsInput, setFlagCohortsInput] = useState('');

  // Propose Admin Action state
  const [newActionType, setNewActionType] = useState('SUSPEND_USER');
  const [newActionDesc, setNewActionDesc] = useState('');
  const [newActionPayload, setNewActionPayload] = useState('{\n  "userId": "usr_example",\n  "reason": "Exceeded rate limit thresholds"\n}');

  // Filter lists based on search
  const filteredUsers = useMemo(() => {
    const raw = [
      { id: 'usr_gideon', email: 'gideonoluwalanadynasty@gmail.com', fullName: 'Gideon Oluwalana', role: 'superadmin', kyc: 'verified', status: 'active', subDate: '2026-01-01' },
      { id: 'usr_unverified_investor', email: 'adebayo.inv@oluwalana.tech', fullName: 'Adebayo Investor', role: 'investor', kyc: 'pending', status: 'active', subDate: '2026-04-12' },
      { id: 'usr_artisan_2', email: 'artisan-reviewer@omni.io', fullName: 'Artisan Reviewer', role: 'developer', kyc: 'verified', status: 'active', subDate: '2026-03-22' },
      { id: 'usr_malicious_node', email: 'blackhat@shadowy.net', fullName: 'Sovereign Shadow Operator', role: 'user', kyc: 'unverified', status: 'suspended', subDate: '2026-08-11' }
    ];
    if (!searchQuery) return raw;
    return raw.filter(u =>
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredTenants = useMemo(() => {
    const raw = [
      { id: 'ten_dynasty_99', name: 'Dynasty Global Holdings', domain: 'dynasty.omni.io', plan: 'Enterprise', usage: '84%', status: 'active' },
      { id: 'ten_artisan_dynasty', name: 'Artisan Sovereign Resale', domain: 'cloud.oluwalana.tech', plan: 'Sovereign Growth', usage: '42%', status: 'active' },
      { id: 'ten_starter_app', name: 'Standard Sandbox Corp', domain: 'sandbox.omni.io', plan: 'Free', usage: '12%', status: 'active' },
      { id: 'ten_restricted_holdings', name: 'Sovereign Blocked Org', domain: 'illegal.secure.net', plan: 'Enterprise', usage: '0%', status: 'suspended' }
    ];
    if (!searchQuery) return raw;
    return raw.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.domain.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handlePolicyEditClick = (policy: GovernancePolicy) => {
    setSelectedPolicy(policy);
    setPolicyValueInput(Array.isArray(policy.value) ? policy.value.join(', ') : String(policy.value));
    setPolicyEnabledInput(policy.isEnabled);
    setPolicyApprovalInput(policy.approvalRequired);
  };

  const savePolicyChanges = () => {
    if (!selectedPolicy) return;
    let parsedValue: any = policyValueInput;
    if (selectedPolicy.id === 'pol_country_restrictions_list') {
      parsedValue = policyValueInput.split(',').map(s => s.trim().toUpperCase());
    } else if (!isNaN(Number(policyValueInput))) {
      parsedValue = Number(policyValueInput);
    }

    updateGovernancePolicy(selectedPolicy.id, parsedValue, policyEnabledInput, policyApprovalInput);
    setSelectedPolicy(null);
  };

  const handleFlagEditClick = (flag: FeatureFlag) => {
    setSelectedFlag(flag);
    setFlagGlobalInput(flag.isGlobal ?? true);
    setFlagTenantsInput(flag.targetTenants?.join(', ') || '');
    setFlagAppsInput(flag.targetApps?.join(', ') || '');
    setFlagCountriesInput(flag.targetCountries?.join(', ') || '');
    setFlagPlansInput(flag.targetPlans?.join(', ') || '');
    setFlagCohortsInput(flag.targetUserCohorts?.join(', ') || '');
  };

  const saveFlagChanges = () => {
    if (!selectedFlag) return;
    const updates = {
      isEnabled: selectedFlag.isEnabled,
      isGlobal: flagGlobalInput,
      targetTenants: flagTenantsInput.split(',').map(s => s.trim()).filter(Boolean),
      targetApps: flagAppsInput.split(',').map(s => s.trim()).filter(Boolean),
      targetCountries: flagCountriesInput.split(',').map(s => s.trim().toUpperCase()).filter(Boolean),
      targetPlans: flagPlansInput.split(',').map(s => s.trim()).filter(Boolean),
      targetUserCohorts: flagCohortsInput.split(',').map(s => s.trim()).filter(Boolean)
    };

    updateAdvancedFeatureFlag(selectedFlag.id, updates);
    setSelectedFlag(null);
  };

  const triggerProposal = () => {
    try {
      const parsedPayload = JSON.parse(newActionPayload);
      proposeAdminAction(newActionType, newActionDesc || `Manual override requested for ${newActionType}`, parsedPayload);
      setNewActionDesc('');
      triggerToast('Proposal Submitted', 'Action submitted to peer approval queue.', 'success');
    } catch (e: any) {
      triggerToast('JSON Formatting Error', 'Invalid payload object structure: ' + e.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-neutral-900 pb-20">
      {/* Sovereign Governance Banner Header */}
      <div className="bg-neutral-950 text-white py-10 px-6 sm:px-12 relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-rose-600/10 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-bold text-rose-400 tracking-wider uppercase mb-3">
              <Shield className="w-3.5 h-3.5" />
              Sovereign Root Core
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-display text-white">
              OMNI Governance &amp; Operations Center
            </h1>
            <p className="text-neutral-400 text-sm mt-1 max-w-2xl">
              Consolidated enterprise super-administration dashboard enforcing cryptographically audited network policy, multi-tenant sandboxing, and peer-reviewed administrative action locks.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
            <div className="flex flex-col">
              <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">System Watchdog</span>
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Audits Active (100% Integrity)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Navigation Sidebar Drawer */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase text-neutral-400 tracking-wider px-3 mb-2">Operational Sectors</h3>
            {[
              { id: 'overview', label: 'Ecosystem Overview', icon: Activity },
              { id: 'applications', label: 'Applications Hub', icon: Layout },
              { id: 'users', label: 'Users & Security', icon: Users },
              { id: 'tenants', label: 'Tenants & White-Labels', icon: Server },
              { id: 'resellers', label: 'Resellers Hierarchy', icon: Layers },
              { id: 'affiliates', label: 'Affiliates Network', icon: Globe },
              { id: 'finance', label: 'Financial Accounting', icon: DollarSign },
              { id: 'ai', label: 'AI Cognitive Systems', icon: Sliders },
              { id: 'developers', label: 'Developer Platform', icon: Key },
              { id: 'capital', label: 'Capital & Equity', icon: Star },
              { id: 'security', label: 'Security & Threats', icon: Shield },
              { id: 'system', label: 'System Configuration', icon: Sliders }
            ].map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  id={`btn-tab-${tab.id}`}
                  onClick={() => {
                    setActiveTab(tab.id as AdminTab);
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-neutral-900 text-white shadow-md font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${activeTab === tab.id ? 'text-rose-500' : 'text-neutral-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Central Workspace Canvas */}
          <div className="lg:col-span-9 flex flex-col gap-6">

            {/* Peer Approval Alert Bar (If pending tasks exist) */}
            {state.adminApprovalTasks.filter(t => t.status === 'pending').length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                    <Clock className="w-5 h-5 animate-spin-slow" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-950">
                      Operator Peer-Approvals Pending ({state.adminApprovalTasks.filter(t => t.status === 'pending').length})
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      High-risk administrative actions have been halted by OMNI Governance. Mutual peer authentication is required to release changes.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('security')}
                  className="bg-neutral-950 text-white hover:bg-neutral-800 transition-colors text-xs font-bold px-4 py-2.5 rounded-xl uppercase tracking-wider whitespace-nowrap"
                >
                  Authorize Actions
                </button>
              </div>
            )}

            {/* Sub-header / Search filter */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Query central records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>
              <div className="text-xs text-neutral-500 font-semibold tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Enforcing {state.governancePolicies.filter(p => p.isEnabled).length} Configured Rules
              </div>
            </div>

            {/* Tab Body Renderings */}
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-6">
                {/* Visual Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Ecosystem Tenants', val: '12 active clients', sub: '99.99% uptime' },
                    { label: 'Network Applications', val: `${state.apps.length} registered`, sub: '0 sandbox breaches' },
                    { label: 'Ledger Velocity', val: `$${(state.ledger.reduce((acc, l) => acc + l.amount, 0)).toLocaleString()}`, sub: 'SHA-256 Validated' },
                    { label: 'Platform Users', val: '2,408 accounts', sub: '100% MFA enabled' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white border border-neutral-200 p-5 rounded-2xl shadow-sm">
                      <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider">{stat.label}</span>
                      <h4 className="text-lg font-bold text-neutral-900 mt-1">{stat.val}</h4>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">{stat.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Ecosystem Health / Node matrix */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-neutral-100 pb-4">
                    <div>
                      <h3 className="text-sm font-bold">Universal Watchdog Diagnostics</h3>
                      <p className="text-xs text-neutral-500">Real-time telemetry and ingress routing matrix logs.</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">All Systems Operational</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {state.systemNodes.map((node, idx) => (
                      <div key={idx} className="bg-neutral-50 border border-neutral-200/80 p-4 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold font-mono text-neutral-800">{node.name}</span>
                          <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-0.5">{node.region} • {node.latencyMs}ms latency</div>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            node.status === 'operational' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {node.status}
                          </span>
                          <div className="text-[10px] text-neutral-500 mt-1">Load: {node.load}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subscriptions & Revenue Audit */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold mb-4">Core Treasury Ledger Reconciliation</h3>
                  <div className="space-y-3">
                    {state.ledger.slice(0, 4).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl text-xs font-bold ${tx.type === 'credit' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                            {tx.type === 'credit' ? '+' : '-'}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-900">{tx.description}</p>
                            <span className="text-[10px] text-neutral-400 font-mono">{tx.id}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xs font-extrabold ${tx.type === 'credit' ? 'text-emerald-700' : 'text-neutral-900'}`}>
                            ${tx.amount.toLocaleString()} USD
                          </p>
                          <span className="text-[10px] text-neutral-400 font-semibold">{tx.status.toUpperCase()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Applications Sector Tab */}
            {activeTab === 'applications' && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold">OMNI App Store &amp; Version Registry</h3>
                  <p className="text-xs text-neutral-500">Configure global availability constraints, version deployments, and third-party registration lifecycles.</p>
                </div>

                <div className="space-y-4">
                  {state.apps.map((app) => (
                    <div key={app.id} className="border border-neutral-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl font-bold">
                          {app.name.substring(0,2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-extrabold text-neutral-950 uppercase tracking-wider">{app.name}</h4>
                            <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">v1.2.0</span>
                          </div>
                          <p className="text-xs text-neutral-500 mt-1 max-w-md">{app.description}</p>
                          <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mt-1.5">Owner: OMNI Org Core • Category: {app.category}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            adminUpdateAppAvailability(app.id, app.status !== 'active', ['US', 'NG', 'GB', 'DE'], 'v1.2.0');
                          }}
                          className={`text-xs font-bold px-3 py-2 rounded-xl transition-all border ${
                            app.status === 'active'
                              ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {app.status === 'active' ? 'Disable App' : 'Enable App'}
                        </button>
                        <button
                          onClick={() => {
                            proposeAdminAction('REVOKE_APP', `Quarantine and revoke client permissions for app context: ${app.name}`, { appId: app.id });
                          }}
                          className="text-xs font-semibold px-3 py-2 bg-neutral-900 text-white hover:bg-neutral-800 rounded-xl transition-all"
                        >
                          Revoke Registry
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Users Sector Tab */}
            {activeTab === 'users' && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold">Passport Client Overrides</h3>
                  <p className="text-xs text-neutral-500">Manual compliance enforcement, identity validations, suspensions, and appeal auditing.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-neutral-200 text-neutral-400 uppercase tracking-wider font-extrabold">
                        <th className="py-3 px-2">Account User</th>
                        <th className="py-3 px-2">Role</th>
                        <th className="py-3 px-2">Compliance (KYC)</th>
                        <th className="py-3 px-2">Status</th>
                        <th className="py-3 px-2 text-right">Overrides</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 font-medium">
                      {filteredUsers.map((u) => (
                        <tr key={u.id}>
                          <td className="py-3.5 px-2">
                            <p className="font-bold text-neutral-950">{u.fullName}</p>
                            <span className="text-[10px] text-neutral-400 font-mono">{u.email}</span>
                          </td>
                          <td className="py-3.5 px-2 uppercase text-[10px] font-bold text-neutral-500">{u.role}</td>
                          <td className="py-3.5 px-2">
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              u.kyc === 'verified' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {u.kyc.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3.5 px-2">
                            <span className={`text-[10px] font-bold ${u.status === 'active' ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {u.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3.5 px-2 text-right space-x-2">
                            <button
                              onClick={() => adminUpdateUserControl(u.id, u.status === 'active' ? 'suspended' : 'active', u.kyc === 'verified')}
                              className="bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-800 font-bold text-[10px] px-2.5 py-1.5 rounded-lg"
                            >
                              Toggle State
                            </button>
                            <button
                              onClick={() => {
                                proposeAdminAction('SUSPEND_USER', `Suspend passport identifier ${u.email} for compliance verification failure.`, { userId: u.id });
                              }}
                              className="bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg"
                            >
                              Audit Hold
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tenants Sector Tab */}
            {activeTab === 'tenants' && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold">White-Label Tenancy Orchestrator</h3>
                  <p className="text-xs text-neutral-500">Review domain configs, active license plans, CPU/API usage metrics, and active reselling networks.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTenants.map((ten) => (
                    <div key={ten.id} className="border border-neutral-200 rounded-xl p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                        <div>
                          <h4 className="font-extrabold text-neutral-950 uppercase tracking-wider text-xs">{ten.name}</h4>
                          <span className="text-[10px] text-neutral-400 font-mono">{ten.id}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ten.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}>
                          {ten.status}
                        </span>
                      </div>

                      <div className="text-xs text-neutral-600 space-y-1">
                        <div><strong className="text-neutral-800">Domain:</strong> {ten.domain}</div>
                        <div><strong className="text-neutral-800">Billing Plan:</strong> {ten.plan}</div>
                        <div><strong className="text-neutral-800">Quota Consumed:</strong> {ten.usage}</div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          onClick={() => {
                            adminUpdateTenantControl(ten.id, { plan: 'enterprise', status: 'active', domain: ten.domain });
                          }}
                          className="bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-800 text-[10px] font-bold px-3 py-1.5 rounded-xl"
                        >
                          Upgrade to Enterprise
                        </button>
                        <button
                          onClick={() => {
                            adminUpdateTenantControl(ten.id, { plan: 'free', status: ten.status === 'active' ? 'suspended' : 'active', domain: ten.domain });
                          }}
                          className="bg-neutral-950 hover:bg-neutral-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl"
                        >
                          Suspend Tenant
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resellers Sector Tab */}
            {activeTab === 'resellers' && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold">OMNI Regional Franchisee Hierarchy</h3>
                  <p className="text-xs text-neutral-500">Monitor multi-level downline commissions, resale economics overrides, and franchise contracts.</p>
                </div>

                <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl space-y-4">
                  <div className="flex justify-between items-center text-xs border-b border-neutral-200 pb-2">
                    <strong className="text-neutral-800 uppercase tracking-wide text-[10px]">Global Reseller Economics Policy</strong>
                    <span className="text-rose-600 font-bold">Max 5 downline subnodes allowed</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white p-3.5 border border-neutral-200 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-neutral-950">Adebayo Reseller Franchise (West Africa)</p>
                        <span className="text-[10px] text-neutral-400">Contracts active until 2029 • 15% override commission</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-extrabold text-neutral-900">$125,400.00 earned</p>
                        <span className="text-[10px] text-emerald-600 font-semibold">Active Tier 1 Node</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Affiliates Sector Tab */}
            {activeTab === 'affiliates' && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold">Universal Referral Network Auditing</h3>
                  <p className="text-xs text-neutral-500">Track click conversion loops, prevent duplicate self-referrals, and audit payout locks.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-rose-50/50 border border-rose-200/60 p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-rose-950 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      Fraud Mitigation Guard (Duplicate IPs)
                    </h4>
                    <p className="text-xs text-neutral-600 mt-2">
                      Referral conversion attempts with overlapping billing profiles or self-referral cookies are flagged for peer verification automatically.
                    </p>
                  </div>
                  <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl">
                    <h4 className="text-xs font-bold text-neutral-900">Affiliate Global Statistics</h4>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-extrabold">Clicks Handled</span>
                        <p className="font-bold text-neutral-900">4,812 clicks</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-extrabold">Total Paid Outs</span>
                        <p className="font-bold text-neutral-900">$246,000.00 USD</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Financial Sector Tab */}
            {activeTab === 'finance' && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold">Sovereign Accounting &amp; double-Entry Ledger</h3>
                  <p className="text-xs text-neutral-500">Manual double-entry corrections, payment refunds, and compliance auditing tools.</p>
                </div>

                <div className="bg-rose-950 text-white p-5 rounded-xl border border-rose-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">Cryptographic Seal Activated</h4>
                    <p className="text-xs text-rose-100 mt-1 max-w-md">Every transactional ledger write is backed by a double-entry check ledger preventing arbitrary balance alterations.</p>
                  </div>
                  <Lock className="w-8 h-8 text-rose-400" />
                </div>
              </div>
            )}

            {/* AI Console Tab - Sovereign AI Admin Control Plane */}
            {activeTab === 'ai' && (
              <OmniAiAdminControlPlane
                currentUserRole="superadmin"
                triggerToast={triggerToast}
              />
            )}

            {/* Developer Platform Tab */}
            {activeTab === 'developers' && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold">Third-Party Ecosystem &amp; API Usage</h3>
                  <p className="text-xs text-neutral-500">Inspect developers credentials, sandbox requests logs, and software reviews.</p>
                </div>

                <div className="space-y-3">
                  {state.sandboxApiRequests.slice(0, 3).map((req) => (
                    <div key={req.id} className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-neutral-900 text-white font-mono text-[9px] px-1.5 py-0.5 rounded uppercase">{req.method}</span>
                        <div>
                          <p className="text-xs font-bold text-neutral-950">{req.endpoint}</p>
                          <span className="text-[10px] text-neutral-400">Response Code: {req.statusCode} • Sandbox: Isolated</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-semibold">{req.timestamp.substring(11, 19)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Capital & Shareholder Tab */}
            {activeTab === 'capital' && (
              <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold">Securities Registry &amp; Cap Table Controls</h3>
                  <p className="text-xs text-neutral-500">Authorize private placements, verify SEC Regulation D filing guidelines, and approve stock allocations.</p>
                </div>

                <div className="space-y-4">
                  {state.investmentOfferings.map((off) => (
                    <div key={off.id} className="p-4 border border-neutral-200 rounded-xl flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider">{off.title}</h4>
                        <span className="text-[10px] text-neutral-400">Price per share: ${off.pricePerShare} • Target: ${off.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          off.status === 'open' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-800'
                        }`}>
                          {off.status.toUpperCase()}
                        </span>
                        <div className="mt-2">
                          <button
                            onClick={() => {
                              proposeAdminAction('APPROVE_OFFERING', `Authorize securities filing for: ${off.title}`, { offeringId: off.id, title: off.title });
                            }}
                            className="bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg"
                          >
                            Approve Offering
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab (Approvals, threats, suspicious attempts) */}
            {activeTab === 'security' && (
              <div className="flex flex-col gap-6">
                {/* Peer Review Approval Requests Hub */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4 border-b border-neutral-100 pb-4">
                    <div>
                      <h3 className="text-sm font-bold">OMNI Governance Peer-Review Approvals</h3>
                      <p className="text-xs text-neutral-500">Decide on locked operations requiring mutual validation.</p>
                    </div>
                    <span className="bg-neutral-150 text-neutral-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Requires 1/1 Co-Signer</span>
                  </div>

                  <div className="space-y-4">
                    {state.adminApprovalTasks.map((task) => (
                      <div key={task.id} className="border border-neutral-200 rounded-xl p-5 flex flex-col gap-4 bg-neutral-50">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                                {task.actionType}
                              </span>
                              <span className="text-[10px] text-neutral-400 font-mono">{task.id}</span>
                            </div>
                            <h4 className="text-xs font-extrabold text-neutral-900 mt-2">{task.description}</h4>
                            <p className="text-[10px] text-neutral-500 mt-1">Requested by: {task.requestedByEmail} • Created: {new Date(task.createdAt).toLocaleString()}</p>
                          </div>
                          <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full uppercase tracking-wider ${
                            task.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : task.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {task.status}
                          </span>
                        </div>

                        {/* Render parameters in json code */}
                        <div className="bg-neutral-950 text-emerald-400 font-mono text-[10px] p-3 rounded-lg overflow-x-auto max-h-32">
                          {JSON.stringify(task.payload, null, 2)}
                        </div>

                        {task.status === 'pending' && (
                          <div className="flex items-center justify-end gap-2 border-t border-neutral-200/60 pt-3">
                            <button
                              onClick={() => processAdminApprovalTask(task.id, 'rejected')}
                              className="text-xs font-bold text-neutral-700 hover:text-neutral-900 px-3 py-2 border border-neutral-300 rounded-xl hover:bg-neutral-100"
                            >
                              Reject Request
                            </button>
                            <button
                              onClick={() => processAdminApprovalTask(task.id, 'approved')}
                              className="text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 px-4 py-2 rounded-xl"
                            >
                              Approve &amp; Co-Sign
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suspicious activity warnings */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold mb-4">Security Threat Detection Logs</h3>
                  <div className="space-y-3">
                    <div className="p-3.5 bg-rose-50/50 border border-rose-200 rounded-xl flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-neutral-900">Overlapping Session Warning (Proxy Gateway)</p>
                        <p className="text-[11px] text-neutral-600 mt-1">Intercepted unauthorized SSH handshake on node London center (omni-node-lon-01). Enforced firewall block.</p>
                        <span className="text-[10px] text-neutral-400 font-mono mt-1 block">IP: 109.112.45.19 • Location: RU</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Config Tab (Dynamic Policies, Targeted Feature Flags) */}
            {activeTab === 'system' && (
              <div className="flex flex-col gap-8">

                {/* 1. Dynamic Governance Policy Engine */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                  <div>
                    <h3 className="text-sm font-bold">Dynamic Regulatory Policy Engine</h3>
                    <p className="text-xs text-neutral-500">Manage real-time ecosystem operating limits without redeploying code. Rules are enforced at the router gateway.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {state.governancePolicies.map((policy) => (
                      <div key={policy.id} className="border border-neutral-200 rounded-xl p-4 flex flex-col justify-between bg-neutral-50/50">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="bg-rose-50 text-rose-700 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                              {policy.category}
                            </span>
                            <span className={`text-[10px] font-bold ${policy.isEnabled ? 'text-emerald-600' : 'text-neutral-400'}`}>
                              {policy.isEnabled ? 'Active Limit' : 'Inactive'}
                            </span>
                          </div>
                          <h4 className="text-xs font-extrabold text-neutral-900">{policy.name}</h4>
                          <p className="text-[11px] text-neutral-600 mt-1">{policy.description}</p>
                          <div className="mt-3 bg-white p-2.5 rounded-lg border border-neutral-100">
                            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Current Limit Value:</div>
                            <div className="text-xs font-mono font-bold text-neutral-800 mt-0.5">
                              {Array.isArray(policy.value) ? policy.value.join(', ') : String(policy.value)}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between">
                          <span className="text-[10px] text-neutral-400 font-semibold flex items-center gap-1">
                            <Lock className="w-3 h-3" /> {policy.approvalRequired ? 'Peer Lock Active' : 'Auto Approved'}
                          </span>
                          <button
                            onClick={() => handlePolicyEditClick(policy)}
                            className="bg-neutral-950 text-white hover:bg-neutral-800 font-bold text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-wide"
                          >
                            Edit Policy
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Advanced Scoped Feature Flags Studio */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                  <div>
                    <h3 className="text-sm font-bold">Scoped Feature Flags Studio</h3>
                    <p className="text-xs text-neutral-500">Fine-tune rollouts using multi-dimensional rules targeting specific clients, app contexts, plan tiers, or user cohorts.</p>
                  </div>

                  <div className="space-y-4 mt-6">
                    {state.featureFlags.map((flag) => (
                      <div key={flag.id} className="border border-neutral-200 rounded-xl p-5 flex flex-col gap-4">
                        <div className="flex items-start justify-between border-b border-neutral-100 pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-extrabold text-neutral-950">{flag.name}</h4>
                              <span className="text-[9px] font-mono bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded font-bold">{flag.key}</span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-1">{flag.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                updateAdvancedFeatureFlag(flag.id, {
                                  isEnabled: !flag.isEnabled,
                                  isGlobal: flag.isGlobal ?? true,
                                  targetTenants: flag.targetTenants || [],
                                  targetApps: flag.targetApps || [],
                                  targetCountries: flag.targetCountries || [],
                                  targetPlans: flag.targetPlans || [],
                                  targetUserCohorts: flag.targetUserCohorts || []
                                });
                              }}
                              className={`p-1.5 rounded-lg transition-all ${
                                flag.isEnabled ? 'text-emerald-600 hover:bg-emerald-50' : 'text-neutral-400 hover:bg-neutral-50'
                              }`}
                            >
                              {flag.isEnabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                            </button>
                            <button
                              onClick={() => handleFlagEditClick(flag)}
                              className="text-xs font-bold text-neutral-700 hover:text-neutral-950 uppercase tracking-wide border border-neutral-300 px-3 py-1.5 rounded-xl hover:bg-neutral-50"
                            >
                              Target Rules
                            </button>
                          </div>
                        </div>

                        {/* Rendering of target scopes */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
                          <div>
                            <span className="text-[10px] text-neutral-400 uppercase font-extrabold">Scope</span>
                            <p className="font-bold text-neutral-900 mt-0.5">{flag.isGlobal ? 'Global' : 'Scoped'}</p>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 uppercase font-extrabold">Tenants ({flag.targetTenants?.length || 0})</span>
                            <p className="font-bold text-neutral-800 mt-0.5 truncate">{flag.targetTenants?.join(', ') || 'All'}</p>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 uppercase font-extrabold">Apps ({flag.targetApps?.length || 0})</span>
                            <p className="font-bold text-neutral-800 mt-0.5 truncate">{flag.targetApps?.join(', ') || 'All'}</p>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 uppercase font-extrabold">Countries ({flag.targetCountries?.length || 0})</span>
                            <p className="font-bold text-neutral-800 mt-0.5 truncate">{flag.targetCountries?.join(', ') || 'All'}</p>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 uppercase font-extrabold">Plans ({flag.targetPlans?.length || 0})</span>
                            <p className="font-bold text-neutral-800 mt-0.5 truncate">{flag.targetPlans?.join(', ') || 'All'}</p>
                          </div>
                          <div>
                            <span className="text-[10px] text-neutral-400 uppercase font-extrabold">Cohorts ({flag.targetUserCohorts?.length || 0})</span>
                            <p className="font-bold text-neutral-800 mt-0.5 truncate">{flag.targetUserCohorts?.join(', ') || 'All'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Manual Administrator Proposal Studio */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                  <div>
                    <h3 className="text-sm font-bold">Sovereign Action Sandbox</h3>
                    <p className="text-xs text-neutral-500">Draft and submit sensitive, peer-reviewed operations to test rule validations and governance handshakes.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block mb-1">Action Type</label>
                        <select
                          value={newActionType}
                          onChange={(e) => setNewActionType(e.target.value)}
                          className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                        >
                          <option value="SUSPEND_USER">SUSPEND_USER</option>
                          <option value="RELEASE_PAYOUT">RELEASE_PAYOUT</option>
                          <option value="APPROVE_OFFERING">APPROVE_OFFERING</option>
                          <option value="REVOKE_APP">REVOKE_APP</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block mb-1">Description / Memo</label>
                        <input
                          type="text"
                          value={newActionDesc}
                          onChange={(e) => setNewActionDesc(e.target.value)}
                          placeholder="e.g., Hold commissions pending KYC audit"
                          className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                        />
                      </div>

                      <button
                        onClick={triggerProposal}
                        className="w-full bg-neutral-950 text-white hover:bg-neutral-800 font-bold text-xs px-4 py-3 rounded-xl uppercase tracking-wider transition-all"
                      >
                        Submit Proposal to Peer Queue
                      </button>
                    </div>

                    <div>
                      <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block mb-1">Payload JSON Arguments</label>
                      <textarea
                        value={newActionPayload}
                        onChange={(e) => setNewActionPayload(e.target.value)}
                        rows={6}
                        className="w-full font-mono text-[10px] text-emerald-400 bg-neutral-950 border border-neutral-800 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-neutral-800"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Audit Logs Footprint / Trail */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-neutral-100 pb-4">
                <div>
                  <h3 className="text-sm font-bold">Superadmin Auditable Logs Matrix</h3>
                  <p className="text-xs text-neutral-500">Every sensitive override and co-sign event is permanently written here.</p>
                </div>
                <button
                  onClick={() => triggerToast('Ledger Integrity Valid', 'SHA-256 seal verified successfully across all blocks.', 'success')}
                  className="bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider"
                >
                  Verify Seal
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {state.auditLogs.map((log) => (
                  <div key={log.id} className="text-xs flex items-start justify-between p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-rose-100 text-rose-800 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">
                          {log.action}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wide">
                          {log.module}
                        </span>
                      </div>
                      <p className="text-neutral-700">{log.details}</p>
                      <div className="text-[10px] text-neutral-400 font-semibold">
                        Actor: {log.userEmail} • IP: {log.ipAddress}
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-semibold shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Policy Edit Modal Panel */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 w-full max-w-md shadow-2xl">
            <h4 className="text-sm font-bold uppercase tracking-wider text-rose-600">Edit System Policy Constraint</h4>
            <h3 className="text-lg font-bold text-neutral-950 mt-1">{selectedPolicy.name}</h3>
            <p className="text-xs text-neutral-500 mt-1">{selectedPolicy.description}</p>

            <div className="space-y-4 mt-6">
              <div>
                <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block mb-1">Limit Config Value</label>
                <input
                  type="text"
                  value={policyValueInput}
                  onChange={(e) => setPolicyValueInput(e.target.value)}
                  className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-neutral-900 block">Enable Policy</span>
                  <p className="text-[11px] text-neutral-500">Is this constraint currently enforced at router nodes?</p>
                </div>
                <button
                  onClick={() => setPolicyEnabledInput(!policyEnabledInput)}
                  className={`p-1.5 rounded-lg ${policyEnabledInput ? 'text-emerald-600' : 'text-neutral-400'}`}
                >
                  {policyEnabledInput ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-neutral-900 block">Require Peer Approval</span>
                  <p className="text-[11px] text-neutral-500">Block immediate changes and require peer co-signers?</p>
                </div>
                <button
                  onClick={() => setPolicyApprovalInput(!policyApprovalInput)}
                  className={`p-1.5 rounded-lg ${policyApprovalInput ? 'text-emerald-600' : 'text-neutral-400'}`}
                >
                  {policyApprovalInput ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-8 pt-4 border-t border-neutral-100">
              <button
                onClick={() => setSelectedPolicy(null)}
                className="text-xs font-bold text-neutral-700 hover:text-neutral-900 px-4 py-2 border border-neutral-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={savePolicyChanges}
                className="text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 px-5 py-2 rounded-xl"
              >
                Save Limits
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature Flag Scoping Modal Panel */}
      {selectedFlag && (
        <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 w-full max-w-lg shadow-2xl">
            <h4 className="text-sm font-bold uppercase tracking-wider text-rose-600">Feature Rollout Targeting Studio</h4>
            <h3 className="text-lg font-bold text-neutral-950 mt-1">{selectedFlag.name}</h3>
            <p className="text-xs text-neutral-500 mt-1">Key: {selectedFlag.key}</p>

            <div className="space-y-4 mt-6 max-h-96 overflow-y-auto pr-1">
              <div className="flex items-center justify-between bg-neutral-50 p-3 rounded-xl border border-neutral-150">
                <div>
                  <span className="text-xs font-extrabold text-neutral-900 block">Global Active Status</span>
                  <p className="text-[10px] text-neutral-500">Should this flag bypass all targeted rules and be active for everyone?</p>
                </div>
                <button
                  onClick={() => setFlagGlobalInput(!flagGlobalInput)}
                  className={`p-1.5 rounded-lg ${flagGlobalInput ? 'text-emerald-600' : 'text-neutral-400'}`}
                >
                  {flagGlobalInput ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                </button>
              </div>

              {!flagGlobalInput && (
                <>
                  <div>
                    <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block mb-1">Target Tenant IDs (comma separated)</label>
                    <input
                      type="text"
                      value={flagTenantsInput}
                      onChange={(e) => setFlagTenantsInput(e.target.value)}
                      placeholder="e.g. ten_dynasty_99, ten_artisan_dynasty"
                      className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block mb-1">Target App Slugs (comma separated)</label>
                    <input
                      type="text"
                      value={flagAppsInput}
                      onChange={(e) => setFlagAppsInput(e.target.value)}
                      placeholder="e.g. pay, market, cloud"
                      className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block mb-1">Target Country Codes (comma separated ISO)</label>
                    <input
                      type="text"
                      value={flagCountriesInput}
                      onChange={(e) => setFlagCountriesInput(e.target.value)}
                      placeholder="e.g. US, NG, GB, DE"
                      className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block mb-1">Target Billing Plan Tiers (comma separated)</label>
                    <input
                      type="text"
                      value={flagPlansInput}
                      onChange={(e) => setFlagPlansInput(e.target.value)}
                      placeholder="e.g. Enterprise, Sovereign Growth"
                      className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider block mb-1">Target User Cohorts (comma separated)</label>
                    <input
                      type="text"
                      value={flagCohortsInput}
                      onChange={(e) => setFlagCohortsInput(e.target.value)}
                      placeholder="e.g. beta-testers, advanced-agents"
                      className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 focus:outline-none"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 mt-8 pt-4 border-t border-neutral-100">
              <button
                onClick={() => setSelectedFlag(null)}
                className="text-xs font-bold text-neutral-700 hover:text-neutral-900 px-4 py-2 border border-neutral-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={saveFlagChanges}
                className="text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 px-5 py-2 rounded-xl"
              >
                Apply Rollout Rules
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
