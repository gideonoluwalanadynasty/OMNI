import React, { useState } from 'react';
import {
  Award,
  Users,
  Lock,
  Unlock,
  Sparkles,
  MessageSquare,
  DollarSign,
  CheckCircle2,
  Heart,
  Flame,
  ShieldCheck,
  Send,
  Star
} from 'lucide-react';
import { CreatorSubscriptionTier, CreatorContentItem } from '../../../types/omni_creator';

interface Props {
  subscriptionTiers: CreatorSubscriptionTier[];
  contentItems: CreatorContentItem[];
  onOpenDirectChat?: (recipientId: string, recipientName: string) => void;
}

export const OmniFanEngagementMembershipsView: React.FC<Props> = ({
  subscriptionTiers,
  contentItems,
  onOpenDirectChat
}) => {
  const [selectedTier, setSelectedTier] = useState<string>(subscriptionTiers[1]?.id || 'tier-silver');
  const [joinedTiers, setJoinedTiers] = useState<string[]>(['tier-silver']);
  const [fanMessage, setFanMessage] = useState('');
  const [tipAmount, setTipAmount] = useState(10);
  const [sentSuccessMsg, setSentSuccessMsg] = useState('');

  const exclusivePosts = contentItems.filter(i => i.accessTier === 'subscribers_only');

  const handleJoinTier = (tierId: string) => {
    if (joinedTiers.includes(tierId)) {
      setJoinedTiers(joinedTiers.filter(id => id !== tierId));
    } else {
      setJoinedTiers([...joinedTiers, tierId]);
    }
  };

  const handleSendFanMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fanMessage.trim()) return;
    setSentSuccessMsg(`Fan message sent directly to creator with a $${tipAmount} sovereign tip!`);
    setFanMessage('');
    setTimeout(() => setSentSuccessMsg(''), 5000);
  };

  return (
    <div id="omni-fan-engagement-memberships-view" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              SOVEREIGN FAN ENGAGEMENT & PATRON MEMBERSHIPS
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ZERO PLATFORM COMMISSIONS
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            Exclusive Patrons Club & VIP Community Access
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Offer tiered memberships with exclusive research papers, live video AMAs, private OMNI channels, and priority fan mail tipping.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl px-5 py-3 text-center">
            <div className="text-2xl font-bold text-white">773</div>
            <div className="text-[10px] text-purple-300 uppercase font-bold">Total Active Patrons</div>
          </div>
        </div>
      </div>

      {sentSuccessMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-300 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{sentSuccessMsg}</span>
        </div>
      )}

      {/* Subscription Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionTiers.map(tier => {
          const isJoined = joinedTiers.includes(tier.id);
          return (
            <div
              key={tier.id}
              className={`bg-slate-900 border rounded-3xl p-6 space-y-5 flex flex-col justify-between shadow-xl transition ${
                isJoined ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{tier.badgeIcon}</span>
                  {isJoined && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> ACTIVE MEMBER
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white font-mono">${tier.priceMonthlyUsd}</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>

                {/* Perks */}
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Perks Included:</span>
                  {tier.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleJoinTier(tier.id)}
                className={`w-full py-3 rounded-2xl text-xs font-bold transition shadow-lg ${
                  isJoined
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                }`}
              >
                {isJoined ? 'Manage Subscription' : `Join ${tier.name} ($${tier.priceMonthlyUsd}/mo)`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Exclusive Vault & Priority Fan Mail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exclusive Content Vault */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              Exclusive Patrons-Only Content Vault
            </h3>
            <span className="text-xs text-emerald-400 font-mono font-semibold">Unlocked for Silver & Gold</span>
          </div>

          <div className="space-y-3">
            {exclusivePosts.map(post => (
              <div
                key={post.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2 hover:border-purple-500/40 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                    {post.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white">{post.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-2">{post.description}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Unlock className="w-3 h-3" /> Available to Patrons
                  </span>
                  <span className="text-indigo-300 font-semibold cursor-pointer hover:underline">
                    Read Full Briefing ➔
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Fan Mail & Direct Tipping */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              Priority Fan Mail & Sovereign Tip Jar
            </h3>
            <p className="text-xs text-slate-300">
              Send a highlighted message directly to the creator's priority inbox with optional micro-tip deposit.
            </p>

            <form onSubmit={handleSendFanMail} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Your Message to Creator</label>
                <textarea
                  rows={3}
                  required
                  value={fanMessage}
                  onChange={e => setFanMessage(e.target.value)}
                  placeholder="Ask a technical question, propose a collaboration, or express appreciation..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Add Sovereign Tip (USD)</label>
                <div className="flex gap-2">
                  {[5, 10, 25, 50, 100].map(amt => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setTipAmount(amt)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                        tipAmount === amt
                          ? 'bg-purple-600 text-white shadow'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-purple-600/30 transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Fan Mail + ${tipAmount} Tip</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
