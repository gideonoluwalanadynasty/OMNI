import React, { useState } from 'react';
import {
  Globe,
  Radio,
  Plus,
  Code,
  Copy,
  Check,
  TrendingUp,
  DollarSign,
  Smartphone,
  Layers,
  Award,
  ShieldCheck,
  Zap,
  ExternalLink
} from 'lucide-react';
import { PublisherProperty, PublisherAdUnitType } from '../../../types/omni_ads';
import { SEED_PUBLISHER_PROPERTIES } from '../../../data/omni_ads_seed';

interface Props {
  properties?: PublisherProperty[];
  onAddProperty?: (prop: PublisherProperty) => void;
}

export const OmniPublisherNetworkView: React.FC<Props> = ({
  properties = SEED_PUBLISHER_PROPERTIES,
  onAddProperty
}) => {
  const [pubProperties, setPubProperties] = useState<PublisherProperty[]>(properties);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(properties[0]?.id || '');
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [showNewUnitModal, setShowNewUnitModal] = useState(false);

  // New Ad Unit Form
  const [unitName, setUnitName] = useState('');
  const [unitType, setUnitType] = useState<PublisherAdUnitType>('responsive_banner');
  const [floorCpm, setFloorCpm] = useState(2.00);

  const selectedProperty = pubProperties.find(p => p.id === selectedPropertyId) || pubProperties[0];

  const totalPublisherEarnings = pubProperties.reduce((acc, p) => acc + p.totalEarningsUsd, 0);
  const totalPublisherImpressions = pubProperties.reduce((acc, p) => acc + p.totalImpressions, 0);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const handleCreateAdUnit = () => {
    if (!unitName.trim() || !selectedProperty) return;

    const newUnit = {
      unitId: `unit-${Date.now()}`,
      unitName,
      type: unitType,
      floorCpmUsd: Number(floorCpm),
      impressionsTotal: 0,
      clicksTotal: 0,
      ctrPct: 0,
      revenueUsd: 0
    };

    setPubProperties(prev => prev.map(p => {
      if (p.id === selectedProperty.id) {
        return {
          ...p,
          adUnits: [...p.adUnits, newUnit]
        };
      }
      return p;
    }));

    setShowNewUnitModal(false);
    setUnitName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Radio className="w-4 h-4" />
              OMNI Publisher Network (AdSense & AdMob Native Protocol)
            </div>
            <h2 className="text-2xl font-black text-white">Monetize Websites, WebApps & Mobile SDKs</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Display high-yielding verified advertiser demand on your external websites and native apps with 68% publisher rev-share and sub-second rendering.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNewUnitModal(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Ad Unit
            </button>
          </div>
        </div>
      </div>

      {/* Aggregate Publisher Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Total Publisher Earnings</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">
            ${totalPublisherEarnings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">68% Net Revenue Split</div>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Network Impressions Served</div>
          <div className="text-2xl font-black text-white mt-1">
            {totalPublisherImpressions.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Across {pubProperties.length} Properties</div>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Pending Settlement</div>
          <div className="text-2xl font-black text-amber-400 mt-1">
            ${pubProperties.reduce((acc, p) => acc + p.pendingPayoutUsd, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Clears on 25th / On-Demand</div>
        </div>

        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div className="text-slate-400 text-xs font-semibold">Active Ad Units</div>
          <div className="text-2xl font-black text-indigo-300 mt-1">
            {pubProperties.reduce((acc, p) => acc + p.adUnits.length, 0)}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Responsive & Rewarded</div>
        </div>
      </div>

      {/* Main Split Layout: Properties List & Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Property Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Registered Websites & Apps ({pubProperties.length})
          </div>

          <div className="space-y-2.5">
            {pubProperties.map(prop => {
              const isSelected = prop.id === selectedPropertyId;
              return (
                <div
                  key={prop.id}
                  onClick={() => setSelectedPropertyId(prop.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/80 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400">{prop.propertyType.replace(/_/g, ' ')}</span>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase rounded border border-emerald-500/30">
                      {prop.verificationStatus}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-1 truncate">{prop.siteOrAppName}</h3>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{prop.domainOrBundleId}</div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 mt-2 border-t border-slate-800">
                    <span>Ad Units: <strong className="text-white">{prop.adUnits.length}</strong></span>
                    <span className="text-emerald-400 font-bold">${prop.totalEarningsUsd.toFixed(2)} USD</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Property Dashboard & Code Snippet Generator */}
        <div className="lg:col-span-8 space-y-5">
          {selectedProperty && (
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-6">
              {/* Property Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-lg font-black text-white">{selectedProperty.siteOrAppName}</h3>
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{selectedProperty.domainOrBundleId}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold rounded-xl">
                    68% Revenue Share Active
                  </span>
                </div>
              </div>

              {/* Ad Units Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Configured Ad Units ({selectedProperty.adUnits.length})
                  </div>
                  <button
                    onClick={() => setShowNewUnitModal(true)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Unit
                  </button>
                </div>

                <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
                  {selectedProperty.adUnits.map(unit => (
                    <div key={unit.unitId} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-bold text-white">{unit.unitName}</div>
                        <div className="text-slate-400 capitalize">{unit.type.replace(/_/g, ' ')} • Floor CPM: ${unit.floorCpmUsd.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <div className="text-slate-400">Impressions</div>
                          <div className="text-white font-bold">{unit.impressionsTotal.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-slate-400">CTR</div>
                          <div className="text-indigo-300 font-bold">{unit.ctrPct.toFixed(2)}%</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Gross Revenue</div>
                          <div className="text-emerald-400 font-bold">${unit.revenueUsd.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Embed Code Snippet Generator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-indigo-400" />
                    Publisher HTML / JS SDK Embed Code
                  </div>
                  <button
                    onClick={() => handleCopyCode(selectedProperty.embedSnippetCode)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
                  >
                    {copiedSnippet ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 bg-black/90 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto whitespace-pre">
                  {selectedProperty.embedSnippetCode}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CREATE AD UNIT MODAL */}
      {showNewUnitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">Create New Publisher Ad Unit</h3>

            <div>
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Unit Name</label>
              <input
                type="text"
                placeholder="e.g. Sidebar Sticky 300x250"
                value={unitName}
                onChange={e => setUnitName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Ad Unit Type</label>
              <select
                value={unitType}
                onChange={e => setUnitType(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
              >
                <option value="responsive_banner">Responsive Billboard Banner (Desktop/Mobile)</option>
                <option value="native_card">In-Article Native Grid Card</option>
                <option value="rewarded_ad">Rewarded Video (Games / Web3)</option>
                <option value="interstitial_video">Full-Screen Interstitial Video</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Minimum Floor CPM ($)</label>
              <input
                type="number"
                step="0.50"
                min="0.50"
                value={floorCpm}
                onChange={e => setFloorCpm(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowNewUnitModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAdUnit}
                disabled={!unitName.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow"
              >
                Generate Unit & Embed Tag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
