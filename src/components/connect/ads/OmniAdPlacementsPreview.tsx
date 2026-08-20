import React, { useState } from 'react';
import {
  Layers,
  Smartphone,
  Clock,
  Play,
  Search,
  DollarSign,
  Sparkles,
  Globe,
  Radio,
  ExternalLink,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  CheckCircle,
  ShieldCheck,
  Award,
  ChevronRight,
  Eye,
  Info,
  Gift
} from 'lucide-react';
import {
  AdPlacementType,
  AdCreative
} from '../../../types/omni_ads';

interface Props {
  initialPlacement?: AdPlacementType;
  customCreative?: AdCreative;
  onAdClicked?: (placement: AdPlacementType) => void;
}

export const OmniAdPlacementsPreview: React.FC<Props> = ({
  initialPlacement = 'feed_native',
  customCreative,
  onAdClicked
}) => {
  const [selectedPlacement, setSelectedPlacement] = useState<AdPlacementType>(initialPlacement);
  const [videoSkipSeconds, setVideoSkipSeconds] = useState(5);
  const [isVideoAdPlaying, setIsVideoAdPlaying] = useState(true);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const defaultCreative: AdCreative = {
    id: 'sample-ad-01',
    headline: 'QuantumCore: 4ms Edge Cloud Serverless',
    primaryText: 'Deploy high-throughput microservices across 180+ global PoPs in under 4ms latency with zero cold starts.',
    description: 'Claim $500 free developer credits upon verification.',
    callToAction: 'Sign Up',
    mediaUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    mediaType: 'single_image',
    aspectRatio: '16:9',
    destinationUrl: 'https://quantumcore.cloud/deploy',
    displayUrl: 'quantumcore.cloud/ai-edge',
    sponsorHandle: 'quantumcore',
    sponsorName: 'QuantumCore Cloud Systems',
    sponsorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200',
    isAiGenerated: true
  };

  const creative = customCreative || defaultCreative;

  const placementsList: { type: AdPlacementType; label: string; icon: React.FC<{ className?: string }>; desc: string }[] = [
    { type: 'feed_native', label: 'Feed Native Ad', icon: Layers, desc: 'Seamlessly inserted into user chronological & algorithmic feeds.' },
    { type: 'moments_vertical', label: 'Moments Reel (9:16)', icon: Smartphone, desc: 'Full-bleed immersive short-form vertical video ad with audio.' },
    { type: 'status_story', label: 'Status 24h Story Ad', icon: Clock, desc: 'Full-screen ephemeral story unit with swipe-up link.' },
    { type: 'video_ad_break', label: 'Video In-Stream Break', icon: Play, desc: '5s unskippable pre-roll or mid-roll video ad break with creator revenue split.' },
    { type: 'search_sponsored', label: 'Search Sponsored Ad', icon: Search, desc: 'High-intent sponsored keyword results with 1-click discovery.' },
    { type: 'marketplace_boost', label: 'Marketplace Boost', icon: DollarSign, desc: 'Featured product cards in OMNI Commerce store feeds.' },
    { type: 'creator_co_branded', label: 'Creator Co-Branded Ad', icon: Sparkles, desc: 'Official sponsorship tag on verified creator profile content.' },
    { type: 'business_page_promoted', label: 'Promoted Business Page', icon: Globe, desc: 'High-visibility local and global business directory discovery.' },
    { type: 'publisher_web_native', label: 'Publisher Web & App', icon: Radio, desc: 'AdSense & AdMob style embed units across third-party websites.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header & Placement Selector */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-400" />
              Interactive Multi-Placement Ad Simulator
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Preview how your creatives and campaigns render across all 9 OMNI channels with native responsive UI styling.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            Ad Transparency & Why This Ad Enabled
          </div>
        </div>

        {/* 9 Placements Tab Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-5">
          {placementsList.map(pl => {
            const isSelected = selectedPlacement === pl.type;
            return (
              <button
                key={pl.type}
                onClick={() => setSelectedPlacement(pl.type)}
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <pl.icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{pl.label}</div>
                  <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{pl.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Viewport Area */}
      <div className="flex justify-center p-4 sm:p-8 bg-slate-950 rounded-2xl border border-slate-800 min-h-[520px]">
        {/* 1. FEED NATIVE AD */}
        {selectedPlacement === 'feed_native' && (
          <div className="w-full max-w-lg bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={creative.sponsorAvatar} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">{creative.sponsorName}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-indigo-300 font-medium">Sponsored</span>
                    <span>•</span>
                    <span className="text-slate-500">Paid Partnership</span>
                  </div>
                </div>
              </div>

              <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase rounded border border-slate-700">
                Ad
              </span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">{creative.primaryText}</p>

            <div className="rounded-xl overflow-hidden border border-slate-800 relative group">
              <img src={creative.mediaUrl} alt="" className="w-full h-56 object-cover" />
              <div className="p-3 bg-slate-950/95 border-t border-slate-800 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <div className="text-xs text-slate-400 font-mono truncate">{creative.displayUrl || 'omni.connect/promoted'}</div>
                  <div className="text-sm font-bold text-white truncate">{creative.headline}</div>
                </div>
                <button
                  onClick={() => onAdClicked?.('feed_native')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shrink-0 transition-colors shadow-md"
                >
                  {creative.callToAction}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <button className="flex items-center gap-1.5 hover:text-rose-400 transition-colors">
                <Heart className="w-4 h-4" /> 1.4k
              </button>
              <button className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors">
                <MessageCircle className="w-4 h-4" /> 84
              </button>
              <button className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button className="hover:text-amber-400 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 2. MOMENTS REEL (9:16 VERTICAL) */}
        {selectedPlacement === 'moments_vertical' && (
          <div className="w-full max-w-sm h-[580px] bg-slate-900 rounded-3xl border-4 border-slate-800 overflow-hidden relative shadow-2xl flex flex-col justify-between p-4">
            <img src={creative.mediaUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                Sponsored Reel
              </span>
              <span className="text-white/80 text-xs font-mono">9:16 Full HD</span>
            </div>

            {/* Bottom Overlay Info & Action */}
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2.5">
                <img src={creative.sponsorAvatar} alt="" className="w-9 h-9 rounded-full border border-white/40" />
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1">
                    {creative.sponsorName}
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/30" />
                  </div>
                  <div className="text-[11px] text-white/70">@{creative.sponsorHandle} • Ad</div>
                </div>
              </div>

              <p className="text-xs text-white/90 line-clamp-2">{creative.primaryText}</p>

              <button
                onClick={() => onAdClicked?.('moments_vertical')}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <span>{creative.callToAction}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 3. STATUS 24H STORY AD */}
        {selectedPlacement === 'status_story' && (
          <div className="w-full max-w-sm h-[560px] bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden relative shadow-2xl flex flex-col justify-between p-4">
            <img src={creative.mediaUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />

            {/* Story Progress Bar */}
            <div className="relative z-10 space-y-2">
              <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-white rounded-full" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={creative.sponsorAvatar} alt="" className="w-8 h-8 rounded-full border border-white" />
                  <div>
                    <div className="text-xs font-bold text-white">{creative.sponsorName}</div>
                    <div className="text-[10px] text-indigo-300">Sponsored Story</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Swipe Up Card */}
            <div className="relative z-10 text-center space-y-2 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <h4 className="text-sm font-bold text-white">{creative.headline}</h4>
              <button
                onClick={() => onAdClicked?.('status_story')}
                className="w-full py-2.5 bg-white text-black font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
              >
                <span>Swipe Up to {creative.callToAction}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* 4. VIDEO AD BREAK (PRE-ROLL / MID-ROLL) */}
        {selectedPlacement === 'video_ad_break' && (
          <div className="w-full max-w-xl bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="relative h-64 bg-black flex items-center justify-center">
              <img src={creative.mediaUrl} alt="" className="w-full h-full object-cover opacity-75" />

              {/* Video Player Controls Overlay */}
              <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-lg text-white text-xs font-bold flex items-center gap-2 border border-white/20">
                <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Ad 1 of 1 • 0:15</span>
              </div>

              {/* Skip Ad Countdown Button */}
              <div className="absolute bottom-3 right-3">
                <button
                  onClick={() => setIsVideoAdPlaying(false)}
                  className="px-4 py-2 bg-black/80 backdrop-blur-md hover:bg-black text-white text-xs font-bold rounded-xl border border-white/30 flex items-center gap-2 shadow-lg transition-all"
                >
                  {videoSkipSeconds > 0 ? (
                    <span>Skip in {videoSkipSeconds}s</span>
                  ) : (
                    <span>Skip Ad →</span>
                  )}
                </button>
              </div>

              {/* Creator Monetization Badge */}
              <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 rounded-lg text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                <DollarSign className="w-3 h-3 text-emerald-400" />
                Creator 70% Revenue Share Active
              </div>
            </div>

            <div className="p-4 bg-slate-950 flex items-center justify-between border-t border-slate-800">
              <div>
                <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Promoted Video Sponsor</div>
                <h4 className="text-sm font-bold text-white">{creative.headline}</h4>
              </div>
              <button
                onClick={() => onAdClicked?.('video_ad_break')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors"
              >
                {creative.callToAction}
              </button>
            </div>
          </div>
        )}

        {/* 5. SEARCH SPONSORED AD */}
        {selectedPlacement === 'search_sponsored' && (
          <div className="w-full max-w-xl bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-2xl">
            {/* Fake Search Input */}
            <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2.5 rounded-xl border border-slate-800 text-sm text-slate-400">
              <Search className="w-4 h-4 text-indigo-400" />
              <span>Query: <strong>cloud developer edge infrastructure</strong></span>
            </div>

            {/* Sponsored Result Card */}
            <div className="p-4 bg-indigo-950/20 rounded-xl border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-indigo-300 font-bold">
                  <span className="px-1.5 py-0.5 bg-indigo-600 text-white text-[10px] rounded uppercase font-black">Sponsored</span>
                  <span>{creative.displayUrl || 'quantumcore.cloud/ai-edge'}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </div>

              <h3 className="text-base font-bold text-indigo-300 hover:underline cursor-pointer">
                {creative.headline}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {creative.primaryText} {creative.description}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onAdClicked?.('search_sponsored')}
                  className="px-3.5 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-lg hover:bg-indigo-500 transition-colors"
                >
                  {creative.callToAction}
                </button>
                <span className="text-xs text-emerald-400 font-semibold">✓ Verified Sovereign Advertiser</span>
              </div>
            </div>
          </div>
        )}

        {/* 6. MARKETPLACE BOOSTED AD */}
        {selectedPlacement === 'marketplace_boost' && (
          <div className="w-full max-w-xs bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl space-y-3 p-3">
            <div className="relative rounded-xl overflow-hidden">
              <img src={creative.mediaUrl} alt="" className="w-full h-44 object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500/90 text-black text-[10px] font-black uppercase rounded shadow">
                Featured Boost
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] text-indigo-400 font-semibold">{creative.sponsorName}</div>
              <h4 className="text-sm font-bold text-white line-clamp-1">{creative.headline}</h4>
              <div className="text-base font-black text-emerald-400">$189.00 USD</div>
            </div>

            <button
              onClick={() => onAdClicked?.('marketplace_boost')}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow"
            >
              1-Click Buy / {creative.callToAction}
            </button>
          </div>
        )}

        {/* 7. CREATOR CO-BRANDED */}
        {selectedPlacement === 'creator_co_branded' && (
          <div className="w-full max-w-lg bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-purple-300">Creator Co-Brand Partnership</span>
              </div>
              <span className="text-[11px] text-slate-400">Dr. Adeyemi Alabi x {creative.sponsorName}</span>
            </div>

            <div className="flex items-start gap-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="" className="w-10 h-10 rounded-full border border-slate-700 object-cover" />
              <div>
                <div className="text-sm font-bold text-white">Dr. Adeyemi Alabi</div>
                <div className="text-xs text-slate-400">Sponsored recommendation for our developer community</div>
              </div>
            </div>

            <p className="text-sm text-slate-200">{creative.primaryText}</p>

            <img src={creative.mediaUrl} alt="" className="w-full h-48 object-cover rounded-xl border border-slate-800" />

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-emerald-400 font-bold">Includes 20% Community Discount Code</span>
              <button
                onClick={() => onAdClicked?.('creator_co_branded')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                {creative.callToAction}
              </button>
            </div>
          </div>
        )}

        {/* 8. BUSINESS PAGE PROMOTED */}
        {selectedPlacement === 'business_page_promoted' && (
          <div className="w-full max-w-lg bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold rounded-full">
                Promoted Business Page
              </span>
              <span className="text-xs text-slate-400">Local & Global Discovery</span>
            </div>

            <div className="flex items-center gap-4">
              <img src={creative.sponsorAvatar} alt="" className="w-14 h-14 rounded-2xl object-cover border border-slate-700" />
              <div>
                <h3 className="text-base font-black text-white">{creative.sponsorName}</h3>
                <p className="text-xs text-slate-400">Enterprise Cloud Infrastructure & Distributed Nodes</p>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                  <span>★ 4.9 (420 Reviews)</span>
                  <span>•</span>
                  <span className="text-emerald-400">Verified Business</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300">{creative.primaryText}</p>

            <button
              onClick={() => onAdClicked?.('business_page_promoted')}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Visit Business Page / {creative.callToAction}
            </button>
          </div>
        )}

        {/* 9. PUBLISHER WEB NATIVE / REWARDED */}
        {selectedPlacement === 'publisher_web_native' && (
          <div className="w-full max-w-xl bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-2xl">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">OMNI Publisher Network SDK (AdSense / AdMob Mode)</span>
              <span className="text-indigo-400 font-semibold">68% Publisher Revenue</span>
            </div>

            {/* Web Responsive Banner */}
            <div className="p-4 bg-slate-950 rounded-xl border border-dashed border-indigo-500/40 flex flex-col sm:flex-row items-center gap-4">
              <img src={creative.mediaUrl} alt="" className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg shrink-0" />
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">OMNI Network Ads</div>
                <h4 className="text-sm font-bold text-white line-clamp-1">{creative.headline}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{creative.primaryText}</p>
                <div className="pt-1">
                  <button
                    onClick={() => onAdClicked?.('publisher_web_native')}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    {creative.callToAction}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Rewarded Video Simulator */}
            <div className="p-3.5 bg-purple-950/20 rounded-xl border border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="text-xs font-bold text-white">Rewarded Ad Unit (Gaming & Web3 Apps)</div>
                  <div className="text-[10px] text-purple-300">Watch full 15s ad to unlock VIP Energy boost</div>
                </div>
              </div>
              <button
                onClick={() => setRewardClaimed(true)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  rewardClaimed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}
              >
                {rewardClaimed ? '✓ Reward Claimed' : 'Simulate Reward'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
