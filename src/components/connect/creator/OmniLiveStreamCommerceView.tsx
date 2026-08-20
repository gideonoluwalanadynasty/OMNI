import React, { useState } from 'react';
import {
  Radio,
  Eye,
  Heart,
  ShoppingBag,
  DollarSign,
  Send,
  Sparkles,
  Flame,
  CheckCircle2,
  Share2,
  Users,
  Award,
  Zap
} from 'lucide-react';
import { CreatorLiveStreamCommerce } from '../../../types/omni_creator';

interface Props {
  liveStream: CreatorLiveStreamCommerce;
  onSendChatMessage: (msg: string, isSuperchat?: boolean, amount?: number) => void;
  onPurchaseProduct: (productId: string, productName: string, price: number) => void;
}

export const OmniLiveStreamCommerceView: React.FC<Props> = ({
  liveStream,
  onSendChatMessage,
  onPurchaseProduct
}) => {
  const [chatInput, setChatInput] = useState('');
  const [isSuperchatMode, setIsSuperchatMode] = useState(false);
  const [superchatAmount, setSuperchatAmount] = useState(25);
  const [likesCount, setLikesCount] = useState(liveStream.totalLikes);
  const [purchaseSuccessMsg, setPurchaseSuccessMsg] = useState('');

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    onSendChatMessage(chatInput.trim(), isSuperchatMode, isSuperchatMode ? superchatAmount : undefined);
    setChatInput('');
    setIsSuperchatMode(false);
  };

  const handleBuy = (prod: any) => {
    onPurchaseProduct(prod.id, prod.name, prod.salePriceUsd || prod.priceUsd);
    setPurchaseSuccessMsg(`🎉 Successfully ordered ${prod.name} for $${prod.salePriceUsd || prod.priceUsd}! Receipt sent.`);
    setTimeout(() => setPurchaseSuccessMsg(''), 5000);
  };

  const handleLike = () => {
    setLikesCount(prev => prev + 1);
  };

  const pinnedProduct = liveStream.productsForSale.find(p => p.id === liveStream.pinnedProductId) || liveStream.productsForSale[0];

  return (
    <div id="omni-live-stream-commerce-view" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5 animate-pulse">
              <Radio className="w-3.5 h-3.5 text-rose-400" />
              LIVE STREAM COMMERCE ENGINE
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              IN-STREAM 1-CLICK CHECKOUT
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
            {liveStream.title}
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Live broadcast with native in-video product purchasing, real-time superchat tips, and interactive audience participation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl px-4 py-2.5 text-center min-w-[120px]">
            <div className="text-xl font-bold text-rose-400 font-mono flex items-center justify-center gap-1">
              <Eye className="w-4 h-4" />
              {liveStream.currentLiveViewers.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Live Viewers</div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl px-4 py-2.5 text-center min-w-[120px]">
            <div className="text-xl font-bold text-emerald-400 font-mono">
              ${liveStream.totalStreamRevenueUsd.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Stream Sales</div>
          </div>
        </div>
      </div>

      {purchaseSuccessMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-300 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{purchaseSuccessMsg}</span>
        </div>
      )}

      {/* Main Studio Grid: Video + Pinned Product + Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player & Pinned Product (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 aspect-video flex items-center justify-center group">
            <video
              src={liveStream.streamUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Overlays */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white tracking-widest flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                LIVE
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md">
                👥 {liveStream.currentLiveViewers.toLocaleString()}
              </span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleLike}
                className="px-3 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full text-xs font-bold text-rose-400 flex items-center gap-1.5 transition"
              >
                <Heart className="w-4 h-4 fill-rose-500" />
                <span>{likesCount.toLocaleString()}</span>
              </button>
            </div>

            {/* Pinned Product In-Video HUD */}
            {pinnedProduct && (
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3.5 flex items-center justify-between gap-4 shadow-2xl">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={pinnedProduct.imageUrl}
                    alt={pinnedProduct.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                      ⚡ LIVE FEATURED DROP ({pinnedProduct.inStockCount} in stock)
                    </span>
                    <h4 className="text-xs font-bold text-white truncate">{pinnedProduct.name}</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-emerald-400 font-mono">
                        ${pinnedProduct.salePriceUsd || pinnedProduct.priceUsd}
                      </span>
                      {pinnedProduct.salePriceUsd && (
                        <span className="text-xs text-slate-500 line-through font-mono">
                          ${pinnedProduct.priceUsd}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleBuy(pinnedProduct)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30 transition shrink-0 flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>
            )}
          </div>

          {/* Additional Stream Catalogues */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xl">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              All Live Showcase Products ({liveStream.productsForSale.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {liveStream.productsForSale.map(prod => (
                <div
                  key={prod.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <img src={prod.imageUrl} alt={prod.name} className="w-full h-24 object-cover rounded-xl" />
                    <h5 className="text-xs font-bold text-white truncate">{prod.name}</h5>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-400 font-mono">${prod.salePriceUsd || prod.priceUsd}</span>
                      <span className="text-[10px] text-slate-400">{prod.salesDuringStream} sold live</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuy(prod)}
                    className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
                  >
                    Quick Purchase
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Interactive Chat & Superchats (1 col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between h-[580px]">
          <div className="space-y-3 flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                Live Audience Stream Chat
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono">
                ENCRYPTED
              </span>
            </div>

            {/* Chat message stream */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {liveStream.chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-2xl transition ${
                    msg.isSuperchat
                      ? 'bg-gradient-to-r from-amber-950/60 to-purple-950/60 border border-amber-500/40'
                      : 'bg-slate-950 border border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <img src={msg.senderAvatar} alt={msg.senderName} className="w-5 h-5 rounded-full object-cover" />
                      <span className="font-bold text-white">{msg.senderName}</span>
                    </div>
                    {msg.isSuperchat ? (
                      <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full">
                        💰 ${msg.superchatAmountUsd} Superchat
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                    )}
                  </div>
                  <p className={`text-xs ${msg.isSuperchat ? 'text-amber-100 font-semibold' : 'text-slate-300'}`}>
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Composer */}
          <form onSubmit={handleSendChat} className="pt-3 border-t border-slate-800 space-y-2">
            {isSuperchatMode && (
              <div className="bg-amber-950/40 border border-amber-500/40 p-3 rounded-2xl flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">Superchat Amount:</span>
                <div className="flex gap-1.5">
                  {[10, 25, 50, 100].map(amt => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => setSuperchatAmount(amt)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        superchatAmount === amt ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-300'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSuperchatMode(!isSuperchatMode)}
                className={`p-2.5 rounded-xl text-xs font-bold transition ${
                  isSuperchatMode
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                }`}
                title="Toggle Superchat Tip"
              >
                <DollarSign className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder={isSuperchatMode ? 'Write highlighted superchat message...' : 'Say something in live chat...'}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />

              <button
                type="submit"
                className="p-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-rose-600/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
