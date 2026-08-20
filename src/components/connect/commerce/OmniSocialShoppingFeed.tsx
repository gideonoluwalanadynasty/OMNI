import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  MessageCircle,
  Share2,
  Zap,
  Plus,
  ShieldCheck,
  Video,
  Radio,
  ExternalLink,
  Tag,
  CheckCircle2,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { CommerceProduct } from '../../../types/omni_commerce';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  products: CommerceProduct[];
  activeProfile: ConnectProfile;
  selectedCurrency: string;
  currencyExchangeRates: Record<string, number>;
  onAddToCart: (product: CommerceProduct, variantId?: string) => void;
  onDirectBuy: (product: CommerceProduct, variantId?: string) => void;
  onOpenStorefront: (storeSlug: string) => void;
  onOpenChatWithSeller: (sellerId: string, sellerName: string) => void;
}

interface SocialShoppablePost {
  id: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  creatorBadge: 'verified_creator' | 'verified_business';
  postType: 'feed_video' | 'moment_story' | 'live_stream' | 'community_drop';
  caption: string;
  mediaUrl: string;
  isVideo: boolean;
  likesCount: number;
  commentsCount: number;
  taggedProduct: CommerceProduct;
  creatorCommissionPct: number;
  timeAgo: string;
}

export const OmniSocialShoppingFeed: React.FC<Props> = ({
  products,
  activeProfile,
  selectedCurrency,
  currencyExchangeRates,
  onAddToCart,
  onDirectBuy,
  onOpenStorefront,
  onOpenChatWithSeller
}) => {
  const [activeMediaFilter, setActiveMediaFilter] = useState<'all' | 'feed_video' | 'live_stream' | 'moment_story'>('all');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const formatPrice = (priceUsd: number) => {
    const rate = currencyExchangeRates[selectedCurrency] || 1.0;
    const converted = priceUsd * rate;
    if (selectedCurrency === 'USD') return `$${converted.toFixed(2)}`;
    if (selectedCurrency === 'EUR') return `€${converted.toFixed(2)}`;
    if (selectedCurrency === 'GBP') return `£${converted.toFixed(2)}`;
    if (selectedCurrency === 'OMNI') return `⚡${(priceUsd / 4.5).toFixed(2)} OMNI`;
    if (selectedCurrency === 'USDC') return `₮${priceUsd.toFixed(2)} USDC`;
    if (selectedCurrency === 'NGN') return `₦${(priceUsd * 1540).toLocaleString()}`;
    if (selectedCurrency === 'BRL') return `R$${(priceUsd * 5.5).toFixed(2)}`;
    return `$${priceUsd.toFixed(2)}`;
  };

  // Mock social shoppable feed posts
  const shoppablePosts: SocialShoppablePost[] = [
    {
      id: 'post-shop-01',
      creatorName: 'Dr. Elena Rostova',
      creatorHandle: 'elena_ai',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      creatorBadge: 'verified_creator',
      postType: 'feed_video',
      caption: 'Testing the zero-knowledge biometric tap-to-sign NFC speed with my titanium key ring at Zurich airport. Instant authorization without touching my phone! 🚀💍',
      mediaUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
      isVideo: true,
      likesCount: 1420,
      commentsCount: 88,
      taggedProduct: products.find(p => p.id === 'prod-phys-001') || products[0],
      creatorCommissionPct: 5,
      timeAgo: '2 hours ago'
    },
    {
      id: 'post-shop-02',
      creatorName: 'Gideon Dynasty',
      creatorHandle: 'gideon_dynasty',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      creatorBadge: 'verified_creator',
      postType: 'live_stream',
      caption: '🔴 LIVE STREAM: Architecting an Agentic Multimodal AI Application in 45 minutes using the OMNI TypeScript SDK kit. Grab the template below!',
      mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      isVideo: true,
      likesCount: 3890,
      commentsCount: 245,
      taggedProduct: products.find(p => p.id === 'prod-digi-002') || products[1],
      creatorCommissionPct: 10,
      timeAgo: 'Live Now'
    },
    {
      id: 'post-shop-03',
      creatorName: 'OmniAcademy',
      creatorHandle: 'omni_academy',
      creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      creatorBadge: 'verified_business',
      postType: 'moment_story',
      caption: 'Cohort 4 registrations are now open for the Zero-Knowledge Cryptography Masterclass. 28 seats remaining with live weekly office hours!',
      mediaUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      isVideo: false,
      likesCount: 840,
      commentsCount: 34,
      taggedProduct: products.find(p => p.id === 'prod-course-003') || products[2],
      creatorCommissionPct: 7.5,
      timeAgo: '5 hours ago'
    }
  ];

  const filteredPosts = shoppablePosts.filter(p =>
    activeMediaFilter === 'all' ? true : p.postType === activeMediaFilter
  );

  const toggleLike = (id: string) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div id="omni-social-shopping-feed" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              SOCIAL COMMERCE ENGINE
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              TRANSPARENT CREATOR COMMISSIONS
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-indigo-400" />
            Social Shopping Feed & Live Streams
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Seamlessly purchase physical hardware, digital SDKs, and masterclasses directly inside Creator Feed posts, Moments, and Live Streams.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'all', label: 'All Content' },
            { id: 'live_stream', label: '🔴 Live Streams' },
            { id: 'feed_video', label: '🎬 Feed Posts' },
            { id: 'moment_story', label: '⚡ Moments / Stories' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveMediaFilter(f.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeMediaFilter === f.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Social Posts Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredPosts.map(post => {
          const isLiked = likedPosts.has(post.id);
          const p = post.taggedProduct;

          return (
            <div
              key={post.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group"
            >
              {/* Creator Header */}
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.creatorAvatar}
                    alt={post.creatorName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white">{post.creatorName}</span>
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>@{post.creatorHandle}</span>
                      <span>•</span>
                      <span>{post.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {post.postType === 'live_stream' && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse flex items-center gap-1">
                      <Radio className="w-3 h-3" />
                      LIVE
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">
                    {post.creatorCommissionPct}% Creator Commission
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="px-5 pb-3">
                <p className="text-xs text-slate-200 leading-relaxed">{post.caption}</p>
              </div>

              {/* Media Container with Interactive Floating Product Tag */}
              <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                <img
                  src={post.mediaUrl}
                  alt="Post visual"
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />

                {/* Floating Shoppable Tag Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md border border-indigo-500/40 rounded-2xl p-4 shadow-2xl space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.mediaUrls[0]}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950 px-1.5 py-0.2 rounded border border-indigo-500/30">
                            {p.archetype}
                          </span>
                          <span className="text-xs font-bold text-white truncate max-w-[180px]">
                            {p.name}
                          </span>
                        </div>
                        <div className="text-sm font-extrabold text-emerald-400 mt-0.5">
                          {formatPrice(p.priceUsd)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAddToCart(p)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition"
                        title="Add to Cart"
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDirectBuy(p)}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-md transition flex items-center gap-1"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Engagement Actions */}
              <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 transition ${isLiked ? 'text-rose-400' : 'hover:text-white'}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400' : ''}`} />
                    <span>{post.likesCount + (isLiked ? 1 : 0)}</span>
                  </button>

                  <button className="flex items-center gap-1.5 hover:text-white transition">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.commentsCount}</span>
                  </button>

                  <button className="flex items-center gap-1.5 hover:text-white transition">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>

                <button
                  onClick={() => onOpenChatWithSeller(p.sellerId, p.sellerName)}
                  className="text-xs text-indigo-400 hover:underline font-semibold flex items-center gap-1"
                >
                  Chat with Merchant →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
