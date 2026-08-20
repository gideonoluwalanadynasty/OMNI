import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldCheck,
  Zap,
  ShoppingBag,
  ArrowRight,
  Scale,
  Star,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';
import {
  CommerceProduct,
  AiShoppingChatMessage
} from '../../../types/omni_commerce';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  products: CommerceProduct[];
  messages: AiShoppingChatMessage[];
  activeProfile: ConnectProfile;
  selectedCurrency: string;
  currencyExchangeRates: Record<string, number>;
  onSendMessage: (userText: string) => void;
  onAddToCart: (product: CommerceProduct, variantId?: string) => void;
  onDirectBuy: (product: CommerceProduct, variantId?: string) => void;
  onOpenStorefront: (storeSlug: string) => void;
}

export const OmniAiShoppingAssistant: React.FC<Props> = ({
  products,
  messages,
  activeProfile,
  selectedCurrency,
  currencyExchangeRates,
  onSendMessage,
  onAddToCart,
  onDirectBuy,
  onOpenStorefront
}) => {
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'compare'>('chat');
  const [compareProductA, setCompareProductA] = useState<string>(products[0]?.id || '');
  const [compareProductB, setCompareProductB] = useState<string>(products[1]?.id || '');

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

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const productA = products.find(p => p.id === compareProductA);
  const productB = products.find(p => p.id === compareProductB);

  return (
    <div id="omni-ai-shopping-assistant" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              OMNI AI CONCIERGE
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              NO SPONSORED BIAS • EXPLICIT BUY CONFIRMATION
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-400" />
            AI Shopping Assistant & Product Comparison Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Ask for technical specs, compare hardware rings with developer SDKs, summarize verified buyer reviews, and evaluate total cost of ownership.
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'chat' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4" />
            AI Concierge
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'compare' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            Side-by-Side Compare
          </button>
        </div>
      </div>

      {/* CHAT VIEW */}
      {activeTab === 'chat' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-thin">
            {messages.map(msg => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 flex-shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`space-y-3 max-w-xl ${isAi ? 'text-left' : 'text-right'}`}>
                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        isAi
                          ? 'bg-slate-800/90 border border-slate-700 text-slate-200'
                          : 'bg-indigo-600 text-white shadow-lg'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Attached Recommended Products in AI response */}
                    {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {msg.recommendedProducts.map(p => (
                          <div
                            key={p.id}
                            className="bg-slate-950/80 border border-indigo-500/30 rounded-2xl p-3.5 flex flex-col justify-between space-y-3"
                          >
                            <div className="flex items-center gap-2.5">
                              <img src={p.mediaUrls[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                              <div className="min-w-0">
                                <span className="text-[9px] uppercase font-bold text-indigo-300 bg-indigo-950 px-1 py-0.2 rounded border border-indigo-500/20">
                                  {p.archetype}
                                </span>
                                <h4 className="text-xs font-bold text-white truncate mt-0.5">{p.name}</h4>
                                <span className="text-xs font-black text-emerald-400">{formatPrice(p.priceUsd)}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => onAddToCart(p)}
                                className="py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-200 rounded-lg border border-slate-700 transition flex items-center justify-center gap-1"
                              >
                                <Plus className="w-3 h-3" />
                                Cart
                              </button>
                              <button
                                onClick={() => onDirectBuy(p)}
                                className="py-1.5 bg-indigo-600 hover:bg-indigo-500 text-[11px] font-bold text-white rounded-lg transition flex items-center justify-center gap-1"
                              >
                                <Zap className="w-3 h-3 text-amber-400" />
                                Buy
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {!isAi && (
                    <img
                      src={activeProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt="User"
                      className="w-8 h-8 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleSend} className="p-4 bg-slate-950/80 border-t border-slate-800 flex gap-3">
            <input
              type="text"
              placeholder="Ask anything: 'Compare security rings', 'Find TypeScript AI boilerplates'..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-2xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Ask AI
            </button>
          </form>
        </div>
      )}

      {/* SIDE-BY-SIDE COMPARE VIEW */}
      {activeTab === 'compare' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-400">Select Product 1:</label>
              <select
                value={compareProductA}
                onChange={e => setCompareProductA(e.target.value)}
                className="w-full mt-1.5 p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    [{p.archetype.toUpperCase()}] {p.name} - {formatPrice(p.priceUsd)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400">Select Product 2:</label>
              <select
                value={compareProductB}
                onChange={e => setCompareProductB(e.target.value)}
                className="w-full mt-1.5 p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    [{p.archetype.toUpperCase()}] {p.name} - {formatPrice(p.priceUsd)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {productA && productB && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              {/* Product A Card */}
              <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-4">
                <img src={productA.mediaUrls[0]} alt={productA.name} className="w-full aspect-[16/10] object-cover rounded-xl" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-500/20">
                    {productA.archetype}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1.5">{productA.name}</h3>
                  <div className="text-xl font-black text-emerald-400 mt-1">{formatPrice(productA.priceUsd)}</div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{productA.description}</p>
                </div>

                <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-3">
                  <div className="flex justify-between">
                    <span>Seller:</span>
                    <strong className="text-white">{productA.sellerName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <strong className="text-amber-400">★ {productA.averageRating.toFixed(1)} ({productA.reviewsCount} reviews)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Type:</span>
                    <strong className="text-white">{productA.archetype === 'physical' ? 'Tracked Courier' : 'Instant License'}</strong>
                  </div>
                </div>

                <button
                  onClick={() => onDirectBuy(productA)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg transition"
                >
                  Buy {productA.name}
                </button>
              </div>

              {/* Product B Card */}
              <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-4">
                <img src={productB.mediaUrls[0]} alt={productB.name} className="w-full aspect-[16/10] object-cover rounded-xl" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-500/20">
                    {productB.archetype}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1.5">{productB.name}</h3>
                  <div className="text-xl font-black text-emerald-400 mt-1">{formatPrice(productB.priceUsd)}</div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{productB.description}</p>
                </div>

                <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-3">
                  <div className="flex justify-between">
                    <span>Seller:</span>
                    <strong className="text-white">{productB.sellerName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <strong className="text-amber-400">★ {productB.averageRating.toFixed(1)} ({productB.reviewsCount} reviews)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Type:</span>
                    <strong className="text-white">{productB.archetype === 'physical' ? 'Tracked Courier' : 'Instant License'}</strong>
                  </div>
                </div>

                <button
                  onClick={() => onDirectBuy(productB)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg transition"
                >
                  Buy {productB.name}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
