import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Unlock,
  DollarSign,
  Users,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Sliders,
  Settings,
  Scale
} from 'lucide-react';
import { CreatorMarketplaceProfile } from '../../../types/omni_creator';

interface Props {
  creators: CreatorMarketplaceProfile[];
  onToggleVerification: (creatorId: string) => void;
  onFreezePayouts: (creatorId: string) => void;
}

export const OmniCreatorAdminControlView: React.FC<Props> = ({
  creators,
  onToggleVerification,
  onFreezePayouts
}) => {
  const [platformFee, setPlatformFee] = useState<number>(1.5);
  const [search, setSearch] = useState('');
  const [frozenList, setFrozenList] = useState<string[]>([]);
  const [adminNotice, setAdminNotice] = useState('');

  const handleToggleFreeze = (id: string, name: string) => {
    if (frozenList.includes(id)) {
      setFrozenList(frozenList.filter(x => x !== id));
      setAdminNotice(`Payouts un-frozen for ${name}. Settling next cycle.`);
    } else {
      setFrozenList([...frozenList, id]);
      setAdminNotice(`Payouts locked for ${name} pending trust & safety review.`);
    }
    setTimeout(() => setAdminNotice(''), 5000);
  };

  return (
    <div id="omni-creator-admin-control-view" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              SUPER ADMIN GOVERNANCE & CREATOR INTEGRITY
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
              TRUST & SAFETY ESCROW
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            Creator Economy Administration & Fee Control
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Supervise verification badges, enforce content compliance thresholds, configure sovereign protocol fee splits, and freeze anomalous payout volumes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl flex items-center gap-3">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Network Protocol Fee</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">{platformFee}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={platformFee}
              onChange={e => setPlatformFee(Number(e.target.value))}
              className="w-24 accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {adminNotice && (
        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-center gap-3 text-xs text-amber-300 font-semibold">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{adminNotice}</span>
        </div>
      )}

      {/* Admin Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400">Total Registered Creators</span>
          <div className="text-xl font-bold text-white mt-1">{creators.length} Profiles</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400">Verified Pro Tier</span>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            {creators.filter(c => c.verificationLevel === 'verified_pro' || c.verificationLevel === 'institutional_master').length} Active
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400">Frozen Accounts</span>
          <div className="text-xl font-bold text-rose-400 mt-1">{frozenList.length} Accounts</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400">Avg Content Trust Score</span>
          <div className="text-xl font-bold text-indigo-400 mt-1">98.4 / 100</div>
        </div>
      </div>

      {/* Creators Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            Creator Governance & Verification Roster
          </h3>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search creator records..."
              className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Creator</th>
                <th className="py-3 px-4">Niche</th>
                <th className="py-3 px-4">Verification Level</th>
                <th className="py-3 px-4 text-right">Patrons</th>
                <th className="py-3 px-4 text-right">Lifetime Earnings</th>
                <th className="py-3 px-4 text-center">Payout Status</th>
                <th className="py-3 px-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {creators
                .filter(c => c.displayName.toLowerCase().includes(search.toLowerCase()))
                .map(c => {
                  const isFrozen = frozenList.includes(c.id);
                  return (
                    <tr key={c.id} className="hover:bg-slate-950/60 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img src={c.avatarUrl} alt={c.displayName} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <div className="font-bold text-white">{c.displayName}</div>
                            <div className="text-[10px] text-slate-500 font-mono">@{c.handle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{c.niche}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                          {c.verificationLevel.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono">{c.subscribersCount.toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-emerald-400 font-bold">
                        ${c.totalEarningsUsd.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {isFrozen ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center gap-1">
                            <Lock className="w-3 h-3" /> FROZEN
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center gap-1">
                            <Unlock className="w-3 h-3" /> ACTIVE
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleToggleFreeze(c.id, c.displayName)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                            isFrozen
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                              : 'bg-rose-600/20 text-rose-300 hover:bg-rose-600 hover:text-white border border-rose-500/30'
                          }`}
                        >
                          {isFrozen ? 'Unfreeze' : 'Freeze Payouts'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
