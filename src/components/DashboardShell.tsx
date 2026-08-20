import React, { useState } from 'react';
import { 
  Home, Wallet, ShoppingBag, Megaphone, Server, CodeXml, Globe, Compass, 
  Search, Bell, Sparkles, User, RefreshCw, ChevronDown, Check, Plus, 
  Layers, LogOut, Sun, Moon, Laptop, Menu, X, ShieldAlert, ShieldCheck, Terminal, Users,
  GitMerge, Cpu, MessageSquare
} from 'lucide-react';
import { OMNIState, AppRegistration } from '../types';

interface DashboardShellProps {
  state: OMNIState;
  onLogout: () => void;
  setView: (view: string, appId: string | null) => void;
  switchOrg: (orgId: string) => void;
  createOrg: (name: string, plan: 'free' | 'growth' | 'enterprise') => void;
  toggleTheme: () => void;
  clearNotifications: () => void;
  onOpenAi: () => void;
  children: React.ReactNode;
}

export function DashboardShell({
  state,
  onLogout,
  setView,
  switchOrg,
  createOrg,
  toggleTheme,
  clearNotifications,
  onOpenAi,
  children
}: DashboardShellProps) {
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [newOrgFormOpen, setNewOrgFormOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgPlan, setNewOrgPlan] = useState<'free' | 'growth' | 'enterprise'>('growth');

  const currentOrg = state.organizations?.find((o) => o.id === state.currentOrgId) || state.organizations?.[0] || {
    id: 'org_dynasty',
    name: 'Dynasty Global Holdings',
    slug: 'dynasty',
    tenantId: 'tenant_dynasty_99',
    status: 'active' as const,
    orgType: 'company' as const,
    billingPlan: 'enterprise' as const,
    walletBalance: 4280550.00,
    apiKey: 'omni_live_api_dyn_k8s_9v02l4k1a7s90f8',
    webhookUrl: 'https://api.dynastyholdings.com/omni-webhook',
    subdomains: ['dynasty.omni.io'],
    createdAt: '2026-01-05T00:00:00Z',
    kybVerified: true
  };
  const unreadNotifs = (state.notifications || []).filter((n) => !n.isRead);

  const handleCreateOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName.trim()) return;
    createOrg(newOrgName, newOrgPlan);
    setNewOrgName('');
    setNewOrgFormOpen(false);
    setOrgDropdownOpen(false);
  };

  // Icon mapper helper
  const renderAppIcon = (slug: string, className = "w-4.5 h-4.5") => {
    switch (slug) {
      case 'home': return <Home className={className} />;
      case 'pay': return <Wallet className={className} />;
      case 'market': return <ShoppingBag className={className} />;
      case 'ads': return <Megaphone className={className} />;
      case 'cloud': return <Server className={className} />;
      case 'apps': return <CodeXml className={className} />;
      default: return <Compass className={className} />;
    }
  };

  return (
    <div id="omni-shell-root" className={`min-h-screen flex bg-neutral-50 font-sans text-neutral-900 ${state.theme === 'dark' ? 'dark' : ''}`}>
      
      {/* Sidebar: Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-neutral-200/80 fixed inset-y-0 left-0 z-20">
        {/* Brand logo container */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('dashboard', null)}>
            <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center font-bold text-white text-base tracking-tighter">
              O
            </div>
            <span className="font-semibold tracking-wider text-xs uppercase text-neutral-900">OMNI Platform</span>
          </div>
          <span className="text-[9px] font-mono font-bold uppercase bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded">v1.0</span>
        </div>

        {/* Navigation Core section */}
        <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Core Navigation</span>
            <button
              onClick={() => setView('dashboard', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'dashboard' && !state.activeAppId
                  ? 'bg-neutral-950 text-white'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Home className="w-4.5 h-4.5" />
              <span>Workspace Hub</span>
            </button>
            <button
              onClick={() => setView('passport', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'passport'
                  ? 'bg-neutral-950 text-white'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <ShieldCheck className="w-4.5 h-4.5" />
              <span>OMNI Passport</span>
            </button>
            <button
              id="sidebar-link-finance-os"
              onClick={() => setView('finance', 'app_finance')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                (state.activeView === 'finance' || state.activeView === 'finance_os' || (state.activeView === 'app' && (state.activeAppId === 'app_finance' || state.activeAppId === 'finance')))
                  ? 'bg-gradient-to-r from-emerald-900 to-neutral-950 text-white font-bold shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-emerald-50/40'
              }`}
            >
              <Wallet className="w-4.5 h-4.5 text-emerald-500" />
              <div className="flex items-center justify-between w-full">
                <span>OMNI Finance OS</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">OS</span>
              </div>
            </button>
            <button
              id="sidebar-link-ai-app"
              onClick={() => setView('ai', 'app_ai')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                (state.activeView === 'ai' || (state.activeView === 'app' && (state.activeAppId === 'app_ai' || state.activeAppId === 'ai')))
                  ? 'bg-gradient-to-r from-indigo-900 to-neutral-950 text-white font-bold shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-indigo-50/40'
              }`}
            >
              <Sparkles className="w-4.5 h-4.5 text-indigo-500 animate-bounce" />
              <div className="flex items-center justify-between w-full">
                <span>OMNI AI</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold">App</span>
              </div>
            </button>
            <button
              id="sidebar-link-browser-app"
              onClick={() => setView('browser', 'app_browser')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                (state.activeView === 'browser' || (state.activeView === 'app' && (state.activeAppId === 'app_browser' || state.activeAppId === 'browser')))
                  ? 'bg-gradient-to-r from-cyan-900 to-neutral-950 text-white font-bold shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-cyan-50/40'
              }`}
            >
              <Globe className="w-4.5 h-4.5 text-cyan-500" />
              <div className="flex items-center justify-between w-full">
                <span>OMNI Browser</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold">App</span>
              </div>
            </button>
            <button
              id="sidebar-link-connect-app"
              onClick={() => setView('connect', 'app_connect')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                (state.activeView === 'connect' || (state.activeView === 'app' && (state.activeAppId === 'app_connect' || state.activeAppId === 'connect')))
                  ? 'bg-gradient-to-r from-indigo-900 to-purple-950 text-white font-bold shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-indigo-50/40'
              }`}
            >
              <MessageSquare className="w-4.5 h-4.5 text-indigo-400" />
              <div className="flex items-center justify-between w-full">
                <span>OMNI Connect</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold">App</span>
              </div>
            </button>
            <button
              id="sidebar-link-works-app"
              onClick={() => setView('works', 'app_works')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                (state.activeView === 'works' || (state.activeView === 'app' && (state.activeAppId === 'app_works' || state.activeAppId === 'works')))
                  ? 'bg-gradient-to-r from-indigo-900 via-purple-900 to-neutral-950 text-white font-bold shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-indigo-50/40'
              }`}
            >
              <Layers className="w-4.5 h-4.5 text-indigo-400" />
              <div className="flex items-center justify-between w-full">
                <span>OMNI Works</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold">OS</span>
              </div>
            </button>
            <button
              onClick={() => setView('ai_os', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'ai_os'
                  ? 'bg-neutral-950 text-white font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Cpu className="w-4.5 h-4.5 text-indigo-500" />
              <span>AI Gateway (Admin)</span>
            </button>
            <button
              onClick={() => setView('admin', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'admin'
                  ? 'bg-neutral-950 text-white'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Globe className="w-4.5 h-4.5" />
              <span>Super Admin Portal</span>
            </button>
            <button
              onClick={() => setView('financial', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'financial'
                  ? 'bg-neutral-950 text-white font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Wallet className="w-4.5 h-4.5 text-emerald-600" />
              <span>Finance & Ledger</span>
            </button>
            <button
              id="sidebar-link-capital"
              onClick={() => setView('capital', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'capital'
                  ? 'bg-neutral-950 text-white font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Users className="w-4.5 h-4.5 text-rose-600" />
              <span>Capital &amp; Equity</span>
            </button>
            <button
              onClick={() => setView('affiliates', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'affiliates'
                  ? 'bg-neutral-950 text-white font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Users className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
              <span>Affiliate & Growth</span>
            </button>
            <button
              onClick={() => setView('white_label', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'white_label'
                  ? 'bg-neutral-950 text-white font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Layers className="w-4.5 h-4.5 text-blue-500" />
              <span>White-Label & Reseller</span>
            </button>
            <button
              onClick={() => setView('shared_services', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'shared_services'
                  ? 'bg-neutral-950 text-white font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Compass className="w-4.5 h-4.5 text-rose-500 animate-pulse" />
              <span>Omni Shared Services</span>
            </button>
            <button
              id="sidebar-link-migration"
              onClick={() => setView('migration', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'migration'
                  ? 'bg-neutral-950 text-white font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <GitMerge className="w-4.5 h-4.5 text-rose-600 animate-spin-slow" />
              <span>Migration Suite</span>
            </button>
            <button
              id="sidebar-link-demo-app"
              onClick={() => setView('demo-app', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'demo-app'
                  ? 'bg-neutral-950 text-white font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Sparkles className="w-4.5 h-4.5 text-rose-600" />
              <span>Demo Sandbox</span>
            </button>
            <button
              id="sidebar-link-security-audit"
              onClick={() => setView('security-audit', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'security-audit'
                  ? 'bg-neutral-950 text-white font-bold'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
              <span>Security Audit</span>
            </button>
            <button
              onClick={() => setView('status', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'status'
                  ? 'bg-neutral-950 text-white'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Server className="w-4.5 h-4.5" />
              <span>Systems Status</span>
            </button>
            <button
              onClick={() => setView('settings', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'settings'
                  ? 'bg-neutral-950 text-white'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <CodeXml className="w-4.5 h-4.5" />
              <span>Dev & Security</span>
            </button>
            <button
              id="sidebar-link-developer"
              onClick={() => setView('developer', null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                state.activeView === 'developer'
                  ? 'bg-neutral-950 text-white'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <Terminal className="w-4.5 h-4.5" />
              <span>Developer Portal</span>
            </button>
          </div>

          {/* Dynamically Registered apps switcher sidebar */}
          <div className="flex flex-col gap-1.5">
            <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Applications Mesh</span>
            <div className="flex flex-col gap-1">
              {state.apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setView('app', app.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    state.activeView === 'app' && state.activeAppId === app.id
                      ? 'bg-neutral-100 text-neutral-900 font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {renderAppIcon(app.slug)}
                    <span className="truncate max-w-[130px]">{app.name}</span>
                  </div>
                  {app.status === 'beta' && (
                    <span className="text-[8px] font-bold bg-neutral-200 text-neutral-600 px-1 rounded uppercase tracking-widest">
                      beta
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User context footer */}
        <div className="p-4 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <span className="text-xs font-bold text-neutral-900 block truncate">{state.user?.fullName}</span>
            <span className="text-[10px] text-neutral-400 block truncate font-mono">{state.user?.email}</span>
          </div>
          <button
            onClick={onLogout}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>
      </aside>

      {/* Main Content shell wrap */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Top Header navbar bar */}
        <header className="h-16 bg-white border-b border-neutral-200/80 px-6 flex items-center justify-between sticky top-0 z-10">
          {/* Mobile sidebar toggle and Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Universal trigger buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={onOpenAi}
                className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200/80 text-neutral-500 hover:text-neutral-900 text-xs font-semibold py-2 px-3.5 rounded-xl transition-all cursor-pointer border border-neutral-200/40"
              >
                <Search className="w-4 h-4" />
                <span>Search / Ask AI...</span>
                <span className="text-[9px] font-mono bg-white text-neutral-400 border border-neutral-200 px-1 rounded">Cmd K</span>
              </button>
            </div>
          </div>

          {/* Right Action Widgets Context dropdowns */}
          <div className="flex items-center gap-3">
            
            {/* Organization context Switcher */}
            <div className="relative">
              <button
                onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                className="inline-flex items-center gap-2 border border-neutral-200 hover:bg-neutral-50 px-3.5 py-2 rounded-xl text-xs font-bold text-neutral-800 transition-colors cursor-pointer"
              >
                <span className="truncate max-w-[120px]">{currentOrg?.name || 'Default Org'}</span>
                <ChevronDown className="w-4 h-4 text-neutral-400" />
              </button>

              {orgDropdownOpen && (
                <div id="org-dropdown-panel" className="absolute right-0 mt-2 w-72 bg-white border border-neutral-200 rounded-2xl shadow-xl p-4 flex flex-col gap-3 z-30">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block pb-1 border-b border-neutral-100">
                    Switch Workspace Ledger
                  </span>
                  
                  {/* Org selector options */}
                  <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                    {state.organizations.map((org) => (
                      <button
                        key={org.id}
                        onClick={() => {
                          switchOrg(org.id);
                          setOrgDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-left cursor-pointer hover:bg-neutral-50 transition-colors ${
                          org.id === currentOrg?.id ? 'bg-neutral-50 font-bold text-neutral-900' : 'text-neutral-500'
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="block truncate">{org.name}</span>
                          <span className="text-[9px] font-mono text-neutral-400">${org.walletBalance.toLocaleString()} USD</span>
                        </div>
                        {org.id === currentOrg?.id && <Check className="w-4 h-4 text-neutral-900" />}
                      </button>
                    ))}
                  </div>

                  {/* Provision custom organization button inside dropdown */}
                  {newOrgFormOpen ? (
                    <form onSubmit={handleCreateOrgSubmit} className="flex flex-col gap-2 pt-2 border-t border-neutral-100">
                      <input
                        type="text"
                        required
                        value={newOrgName}
                        onChange={(e) => setNewOrgName(e.target.value)}
                        placeholder="Organization name"
                        className="px-2.5 py-1.5 border border-neutral-200 rounded-lg text-xs outline-none"
                      />
                      <select
                        value={newOrgPlan}
                        onChange={(e: any) => setNewOrgPlan(e.target.value)}
                        className="px-2 py-1 border border-neutral-200 rounded-lg text-xs"
                      >
                        <option value="free">Free Trial</option>
                        <option value="growth">Growth License</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                      <button
                        type="submit"
                        className="w-full bg-neutral-900 text-white py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider"
                      >
                        Deploy Workspace
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => setNewOrgFormOpen(true)}
                      className="w-full border border-dashed border-neutral-200 hover:border-neutral-900 p-2 rounded-xl text-[11px] font-bold text-neutral-500 hover:text-neutral-900 text-center flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Deploy New Workspace</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Wallet Quick Balance Display */}
            <div className="hidden md:inline-flex items-center gap-1.5 border border-neutral-200 px-3 py-2 rounded-xl text-xs font-bold text-emerald-600 bg-emerald-50/50">
              <Wallet className="w-4 h-4" />
              <span className="font-mono">${currentOrg?.walletBalance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
            </div>

            {/* OMNI Command trigger widget */}
            <button
              onClick={onOpenAi}
              className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-all cursor-pointer border border-neutral-200"
              title="Open AI Command Bar"
            >
              <Sparkles className="w-4.5 h-4.5 text-blue-500 animate-pulse" />
            </button>

            {/* Notifications panel toggle button */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer border border-neutral-200 relative"
              >
                <Bell className="w-4.5 h-4.5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {notifDropdownOpen && (
                <div id="notifications-panel" className="absolute right-0 mt-2 w-80 bg-white border border-neutral-200 rounded-2xl shadow-xl p-4 flex flex-col gap-3 z-30">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block">
                      OMNI Core Alerts
                    </span>
                    <button
                      onClick={() => {
                        clearNotifications();
                        setNotifDropdownOpen(false);
                      }}
                      className="text-[9px] font-bold text-neutral-500 hover:text-neutral-900 cursor-pointer"
                    >
                      Mark read
                    </button>
                  </div>

                  <div className="flex flex-col gap-3.5 max-h-64 overflow-y-auto">
                    {state.notifications.length === 0 ? (
                      <div className="text-center py-6 text-xs text-neutral-400 font-normal">
                        No alerts in core index buffer.
                      </div>
                    ) : (
                      state.notifications.map((n) => (
                        <div key={n.id} id={`notif-item-${n.id}`} className="flex gap-2.5">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.isRead ? 'bg-neutral-200' : 'bg-blue-500'}`} />
                          <div className="min-w-0">
                            <span className="text-xs font-semibold text-neutral-900 block leading-tight">{n.title}</span>
                            <span className="text-[10px] text-neutral-500 block leading-relaxed mt-0.5">{n.content}</span>
                            <span className="text-[9px] text-neutral-400 block font-mono mt-0.5">{new Date(n.createdAt).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs cursor-pointer border border-neutral-200"
              >
                G
              </button>

              {profileDropdownOpen && (
                <div id="profile-dropdown-panel" className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-2xl shadow-xl p-4 flex flex-col gap-3 z-30">
                  <div className="pb-2 border-b border-neutral-100">
                    <span className="text-xs font-bold text-neutral-900 block truncate">{state.user?.fullName}</span>
                    <span className="text-[10px] text-neutral-400 block truncate font-mono">{state.user?.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      setView('passport', null);
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left text-xs font-semibold text-neutral-500 hover:text-neutral-900 py-1"
                  >
                    My OMNI Passport
                  </button>
                  <button
                    onClick={() => {
                      setView('settings', null);
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left text-xs font-semibold text-neutral-500 hover:text-neutral-900 py-1"
                  >
                    Manage Settings
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left text-xs font-bold text-red-600 hover:text-red-800 py-1 pt-2 border-t border-neutral-100"
                  >
                    Logout System Session
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Real-world Interactive Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Drawer Navigation Sidebar */}
      {mobileSidebarOpen && (
        <div id="mobile-sidebar-root" className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-neutral-950/30 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          
          <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-neutral-200 flex flex-col z-50">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center font-bold text-white text-base tracking-tighter">
                  O
                </div>
                <span className="font-semibold tracking-wider text-xs uppercase text-neutral-900">OMNI</span>
              </div>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded-lg hover:bg-neutral-50 text-neutral-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => {
                    setView('dashboard', null);
                    setMobileSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left text-neutral-500 hover:bg-neutral-50"
                >
                  <Home className="w-4.5 h-4.5" />
                  <span>Workspace Hub</span>
                </button>
                <button
                  onClick={() => {
                    setView('passport', null);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    state.activeView === 'passport'
                      ? 'bg-neutral-950 text-white'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <ShieldCheck className="w-4.5 h-4.5" />
                  <span>OMNI Passport</span>
                </button>
                <button
                  onClick={() => {
                    setView('finance', 'app_finance');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    (state.activeView === 'finance' || state.activeView === 'finance_os' || (state.activeView === 'app' && (state.activeAppId === 'app_finance' || state.activeAppId === 'finance')))
                      ? 'bg-neutral-950 text-white font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Wallet className="w-4.5 h-4.5 text-emerald-500" />
                  <span>OMNI Finance OS</span>
                </button>
                <button
                  onClick={() => {
                    setView('ai', 'app_ai');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    (state.activeView === 'ai' || (state.activeView === 'app' && (state.activeAppId === 'app_ai' || state.activeAppId === 'ai')))
                      ? 'bg-neutral-950 text-white font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Sparkles className="w-4.5 h-4.5 text-indigo-500" />
                  <span>OMNI AI</span>
                </button>
                <button
                  onClick={() => {
                    setView('browser', 'app_browser');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    (state.activeView === 'browser' || (state.activeView === 'app' && (state.activeAppId === 'app_browser' || state.activeAppId === 'browser')))
                      ? 'bg-neutral-950 text-white font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Globe className="w-4.5 h-4.5 text-cyan-500" />
                  <span>OMNI Browser</span>
                </button>
                <button
                  onClick={() => {
                    setView('connect', 'app_connect');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    (state.activeView === 'connect' || (state.activeView === 'app' && (state.activeAppId === 'app_connect' || state.activeAppId === 'connect')))
                      ? 'bg-neutral-950 text-white font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <MessageSquare className="w-4.5 h-4.5 text-indigo-400" />
                  <span>OMNI Connect</span>
                </button>
                <button
                  onClick={() => {
                    setView('works', 'app_works');
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    (state.activeView === 'works' || (state.activeView === 'app' && (state.activeAppId === 'app_works' || state.activeAppId === 'works')))
                      ? 'bg-neutral-950 text-white font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Layers className="w-4.5 h-4.5 text-indigo-400" />
                  <span>OMNI Works</span>
                </button>
                <button
                  onClick={() => {
                    setView('admin', null);
                    setMobileSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left text-neutral-500 hover:bg-neutral-50"
                >
                  <Globe className="w-4.5 h-4.5" />
                  <span>Super Admin Portal</span>
                </button>
                <button
                  onClick={() => {
                    setView('financial', null);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    state.activeView === 'financial'
                      ? 'bg-neutral-950 text-white font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Wallet className="w-4.5 h-4.5 text-emerald-600" />
                  <span>Finance & Ledger</span>
                </button>
                <button
                  id="mobile-link-capital"
                  onClick={() => {
                    setView('capital', null);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    state.activeView === 'capital'
                      ? 'bg-neutral-950 text-white font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Users className="w-4.5 h-4.5 text-rose-600" />
                  <span>Capital &amp; Equity</span>
                </button>
                <button
                  onClick={() => {
                    setView('affiliates', null);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    state.activeView === 'affiliates'
                      ? 'bg-neutral-950 text-white font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Users className="w-4.5 h-4.5 text-amber-500" />
                  <span>Affiliate & Growth</span>
                </button>
                <button
                  onClick={() => {
                    setView('white_label', null);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    state.activeView === 'white_label'
                      ? 'bg-neutral-950 text-white font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Layers className="w-4.5 h-4.5 text-blue-500" />
                  <span>White-Label & Reseller</span>
                </button>
                <button
                  onClick={() => {
                    setView('shared_services', null);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    state.activeView === 'shared_services'
                      ? 'bg-neutral-950 text-white font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Compass className="w-4.5 h-4.5 text-rose-500" />
                  <span>Omni Shared Services</span>
                </button>
                <button
                  onClick={() => {
                    setView('status', null);
                    setMobileSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left text-neutral-500 hover:bg-neutral-50"
                >
                  <Server className="w-4.5 h-4.5" />
                  <span>Systems Status</span>
                </button>
                <button
                  onClick={() => {
                    setView('settings', null);
                    setMobileSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left text-neutral-500 hover:bg-neutral-50"
                >
                  <CodeXml className="w-4.5 h-4.5" />
                  <span>Dev & Security</span>
                </button>
                <button
                  id="mobile-link-developer"
                  onClick={() => {
                    setView('developer', null);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left transition-colors cursor-pointer ${
                    state.activeView === 'developer'
                      ? 'bg-neutral-950 text-white'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Terminal className="w-4.5 h-4.5" />
                  <span>Developer Portal</span>
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Applications</span>
                {state.apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      setView('app', app.id);
                      setMobileSidebarOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-left text-neutral-500 hover:bg-neutral-50"
                  >
                    {renderAppIcon(app.slug)}
                    <span className="truncate">{app.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-neutral-100 text-xs font-bold text-neutral-700">
              {state.user?.fullName}
            </div>
          </aside>
        </div>
      )}

    </div>
  );
}
