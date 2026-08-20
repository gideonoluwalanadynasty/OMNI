import React, { useState } from 'react';
import {
  Sliders,
  ShieldCheck,
  DollarSign,
  Layers,
  Globe,
  Lock,
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { OmniAdsAdminSettings } from '../../../types/omni_ads';
import { SEED_OMNI_ADS_ADMIN_SETTINGS } from '../../../data/omni_ads_seed';

interface Props {
  settings?: OmniAdsAdminSettings;
  onSaveSettings?: (settings: OmniAdsAdminSettings) => void;
}

export const OmniAdAdminGovernanceView: React.FC<Props> = ({
  settings = SEED_OMNI_ADS_ADMIN_SETTINGS,
  onSaveSettings
}) => {
  const [adminSettings, setAdminSettings] = useState<OmniAdsAdminSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onSaveSettings?.(adminSettings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Lock className="w-4 h-4" />
              Omni Ads Super Admin Governance & Global Policy
            </div>
            <h2 className="text-2xl font-black text-white">Platform Revenue Splits & Auction Parameters</h2>
            <p className="text-sm text-slate-400 mt-1">
              Tune platform monetization algorithms, configure minimum CPM/CPC auction floors, and enforce privacy standards.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            {savedSuccess ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            {savedSuccess ? 'Settings Saved' : 'Save System Settings'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Revenue Sharing Split Engine */}
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            Ecosystem Revenue Sharing Protocols
          </div>
          <h3 className="text-base font-black text-white">Default Payout Splits</h3>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-bold">Creator Revenue Share (%)</span>
                <span className="text-emerald-400 font-black">{adminSettings.creatorDefaultRevSharePct}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                value={adminSettings.creatorDefaultRevSharePct}
                onChange={e => setAdminSettings({ ...adminSettings, creatorDefaultRevSharePct: Number(e.target.value) })}
                className="w-full accent-indigo-500"
              />
              <span className="text-[11px] text-slate-500">Industry standard: 55%. OMNI Default: 70% to verified creators.</span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-bold">Publisher Network Share (%)</span>
                <span className="text-indigo-300 font-black">{adminSettings.publisherDefaultRevSharePct}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                value={adminSettings.publisherDefaultRevSharePct}
                onChange={e => setAdminSettings({ ...adminSettings, publisherDefaultRevSharePct: Number(e.target.value) })}
                className="w-full accent-indigo-500"
              />
              <span className="text-[11px] text-slate-500">OMNI Publisher Network SDK default (AdSense parity): 68%.</span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-bold">OMNI Platform Reserve (%)</span>
                <span className="text-slate-400 font-black">{adminSettings.omniPlatformTakeRatePct}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={adminSettings.omniPlatformTakeRatePct}
                onChange={e => setAdminSettings({ ...adminSettings, omniPlatformTakeRatePct: Number(e.target.value) })}
                className="w-full accent-indigo-500"
              />
              <span className="text-[11px] text-slate-500">Funds decentralized edge CDN infrastructure and cryptographic auditing.</span>
            </div>
          </div>
        </div>

        {/* Card 2: Floor Pricing & Subscriptions */}
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            Auction Floors & Ad-Free VIP Subscription
          </div>
          <h3 className="text-base font-black text-white">Global Auction Parameters</h3>

          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Minimum Floor CPM ($)</label>
                <input
                  type="number"
                  step="0.10"
                  value={adminSettings.minimumFloorCpmUsd}
                  onChange={e => setAdminSettings({ ...adminSettings, minimumFloorCpmUsd: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Minimum Floor CPC ($)</label>
                <input
                  type="number"
                  step="0.05"
                  value={adminSettings.minimumFloorCpcUsd}
                  onChange={e => setAdminSettings({ ...adminSettings, minimumFloorCpcUsd: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Ad-Free Subscription Monthly Price ($ USD)</label>
              <input
                type="number"
                step="0.50"
                value={adminSettings.adFreeSubscriptionPriceUsd}
                onChange={e => setAdminSettings({ ...adminSettings, adFreeSubscriptionPriceUsd: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">Subscribers get 100% ad-free experience across all 9 placements.</span>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={adminSettings.allowAdvertiserSelfServe}
                  onChange={e => setAdminSettings({ ...adminSettings, allowAdvertiserSelfServe: e.target.checked })}
                  className="w-4 h-4 rounded accent-indigo-500"
                />
                <span className="text-xs font-semibold text-slate-300">Allow Self-Serve Campaign Onboarding & Direct Wallet Funding</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
