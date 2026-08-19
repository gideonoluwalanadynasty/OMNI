import React, { useState } from 'react';
import { EnterpriseInternalPortalApp } from '../../../types/enterprise_audit';
import { INITIAL_INTERNAL_PORTALS } from '../../../data/mockEnterpriseAuditData';
import {
  ExternalLink,
  ShieldCheck,
  Lock,
  Plus,
  Server,
  Landmark,
  ShieldAlert,
  GraduationCap,
  MapPin,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const EnterpriseInternalPortals: React.FC = () => {
  const [portals, setPortals] = useState<EnterpriseInternalPortalApp[]>(INITIAL_INTERNAL_PORTALS);
  const [activeLaunchedApp, setActiveLaunchedApp] = useState<string | null>(null);

  const getPortalIcon = (icon: string) => {
    switch (icon) {
      case 'ShieldAlert':
        return ShieldAlert;
      case 'Landmark':
        return Landmark;
      case 'Server':
        return Server;
      case 'MapPin':
        return MapPin;
      case 'GraduationCap':
        return GraduationCap;
      default:
        return Server;
    }
  };

  const handleLaunch = (portal: EnterpriseInternalPortalApp) => {
    setActiveLaunchedApp(portal.name);
    setTimeout(() => setActiveLaunchedApp(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-stone-100">Enterprise Internal Portals & Micro-Apps Directory</h2>
          <p className="text-xs text-stone-400">
            Secure launchpad for air-gapped intranet dashboards, sovereign SIEM tools, ERP treasury systems, and classified registries.
          </p>
        </div>

        <button
          onClick={() => {
            const newPortal: EnterpriseInternalPortalApp = {
              id: `portal-${Date.now()}`,
              name: 'Enterprise BI Analytics Hub',
              category: 'operations',
              icon: 'Server',
              url: 'https://bi.internal.enterprise.omni',
              ssoEnabled: true,
              requiredClearance: 'Confidential',
              description: 'Executive revenue models, regional usage forecasts, and server load monitoring.',
              badgeText: 'SSO Enabled',
              isAirGapped: false
            };
            setPortals([...portals, newPortal]);
          }}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Register Internal Portal</span>
        </button>
      </div>

      {activeLaunchedApp && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Successfully initiated Zero-Trust SAML/OIDC SSO handshake for &quot;{activeLaunchedApp}&quot;.</span>
          </div>
          <span className="font-mono text-[10px]">Session Token Issued</span>
        </div>
      )}

      {/* Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {portals.map((portal) => {
          const Icon = getPortalIcon(portal.icon);

          return (
            <div
              key={portal.id}
              className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-indigo-500/80 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-indigo-400 group-hover:border-indigo-700">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {portal.badgeText && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-mono font-semibold">
                        {portal.badgeText}
                      </span>
                    )}
                    {portal.isAirGapped && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-mono">
                        AIR-GAPPED
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-stone-100 text-sm">{portal.name}</h3>
                  <p className="text-stone-400 text-xs mt-1 leading-relaxed">{portal.description}</p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-stone-800/80">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span>CLEARANCE: <strong className="text-stone-300">{portal.requiredClearance}</strong></span>
                  <span>{portal.ssoEnabled ? 'SAML SSO' : 'TOKEN AUTH'}</span>
                </div>

                <button
                  onClick={() => handleLaunch(portal)}
                  className="w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Internal Session</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
