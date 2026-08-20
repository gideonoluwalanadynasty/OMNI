import React, { useState } from 'react';
import {
  Building2,
  Palette,
  Shield,
  Layers,
  Globe,
  Sliders,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Eye,
  Plus
} from 'lucide-react';
import { WhiteLabelTenant } from '../../../types/omni_white_label';
import { SEED_WHITE_LABEL_TENANTS } from '../../../data/omni_white_label_seed';
import { OmniWhiteLabelStudio } from './OmniWhiteLabelStudio';
import { OmniEnterpriseConnectPlatform } from './OmniEnterpriseConnectPlatform';
import { OmniEnterpriseAdminPortal } from './OmniEnterpriseAdminPortal';
import { OmniGlobalSuperAdminControl } from './OmniGlobalSuperAdminControl';
import { OmniWhiteLabelTestSuiteModal } from './OmniWhiteLabelTestSuiteModal';

interface OmniWhiteLabelRootProps {
  initialTab?: 'studio' | 'workplace' | 'admin_portal' | 'super_admin';
}

export const OmniWhiteLabelRoot: React.FC<OmniWhiteLabelRootProps> = ({
  initialTab = 'studio',
}) => {
  const [tenants, setTenants] = useState<WhiteLabelTenant[]>(SEED_WHITE_LABEL_TENANTS);
  const [selectedTenantId, setSelectedTenantId] = useState<string>(SEED_WHITE_LABEL_TENANTS[0].id);
  const [activePlatformTab, setActivePlatformTab] = useState<'studio' | 'workplace' | 'admin_portal' | 'super_admin'>(initialTab);
  const [testSuiteOpen, setTestSuiteOpen] = useState(false);
  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);

  const currentTenant = tenants.find(t => t.id === selectedTenantId) || tenants[0];

  const handleUpdateTenant = (updated: WhiteLabelTenant) => {
    setTenants(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  };

  const handleCreateTenant = (newTenant: WhiteLabelTenant) => {
    setTenants(prev => [newTenant, ...prev]);
    setSelectedTenantId(newTenant.id);
    setActivePlatformTab('studio');
  };

  const handlePreviewTenant = (tenantToPreview: WhiteLabelTenant) => {
    handleUpdateTenant(tenantToPreview);
    setActivePlatformTab('workplace');
  };

  return (
    <div className="space-y-6">
      {/* Universal White Label Top Controller Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        {/* Tenant Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
            className="flex items-center gap-3 p-2 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 rounded-xl transition text-left w-full md:w-auto"
          >
            <img
              src={currentTenant.branding.logoUrl}
              alt={currentTenant.branding.brandName}
              className="w-8 h-8 rounded-lg object-cover border border-slate-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{currentTenant.branding.brandName}</span>
                <span className="px-1.5 py-0.2 bg-slate-800 text-indigo-300 rounded text-[9px] font-mono uppercase">
                  {currentTenant.customerType}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block">
                {currentTenant.domains[0]?.domain}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
          </button>

          {tenantDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 space-y-1 animate-in fade-in">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1 block">
                Switch Organization Tenant
              </span>
              {tenants.map(t => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTenantId(t.id);
                    setTenantDropdownOpen(false);
                  }}
                  className={`w-full p-2 rounded-lg flex items-center gap-2.5 transition text-left text-xs ${
                    t.id === selectedTenantId
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <img src={t.branding.logoUrl} alt={t.branding.brandName} className="w-6 h-6 rounded object-cover" />
                  <div className="truncate">
                    <span className="font-bold truncate block">{t.branding.brandName}</span>
                    <span className="text-[10px] opacity-75 font-mono truncate block">{t.domains[0]?.domain}</span>
                  </div>
                </button>
              ))}
              <div className="pt-1 border-t border-slate-800">
                <button
                  onClick={() => {
                    setActivePlatformTab('super_admin');
                    setTenantDropdownOpen(false);
                  }}
                  className="w-full p-2 text-center text-xs font-bold text-purple-400 hover:bg-purple-950/30 rounded-lg transition flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Provision New Tenant
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Primary White Label Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar">
          {[
            { id: 'studio', label: 'White Label Studio', icon: Palette },
            { id: 'workplace', label: 'Enterprise Workplace', icon: Building2 },
            { id: 'admin_portal', label: 'Tenant Admin Portal', icon: Shield },
            { id: 'super_admin', label: 'Global Overseer', icon: Layers },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activePlatformTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePlatformTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Diagnostic Test Runner Trigger */}
        <button
          onClick={() => setTestSuiteOpen(true)}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
        >
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          Multi-Tenant Tests
        </button>
      </div>

      {/* RENDER ACTIVE PLATFORM VIEW */}
      {activePlatformTab === 'studio' && (
        <OmniWhiteLabelStudio
          tenant={currentTenant}
          onUpdateTenant={handleUpdateTenant}
          onPreviewTenant={handlePreviewTenant}
        />
      )}

      {activePlatformTab === 'workplace' && (
        <OmniEnterpriseConnectPlatform
          tenant={currentTenant}
          onOpenStudio={() => setActivePlatformTab('studio')}
        />
      )}

      {activePlatformTab === 'admin_portal' && (
        <OmniEnterpriseAdminPortal
          tenant={currentTenant}
          onUpdateTenant={handleUpdateTenant}
        />
      )}

      {activePlatformTab === 'super_admin' && (
        <OmniGlobalSuperAdminControl
          tenants={tenants}
          onSelectTenant={tenant => {
            setSelectedTenantId(tenant.id);
            setActivePlatformTab('studio');
          }}
          onCreateTenant={handleCreateTenant}
        />
      )}

      {/* Test Suite Modal */}
      <OmniWhiteLabelTestSuiteModal
        isOpen={testSuiteOpen}
        onClose={() => setTestSuiteOpen(false)}
      />
    </div>
  );
};
