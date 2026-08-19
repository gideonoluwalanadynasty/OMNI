import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  ShoppingBag,
  Star,
  ShieldCheck,
  Info,
  AlertTriangle,
  CheckCircle2,
  Layers,
  ArrowRight,
  TrendingDown,
  X,
  ExternalLink,
  MessageSquare,
  Bot
} from 'lucide-react';
import {
  OmniMarketProduct,
  OmniShoppingAiRecommendation
} from '../../../types/commerce_market';
import { omniCommerceService } from '../../../sdk/browser-services/OmniCommerceService';

interface OmniAiShoppingCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: OmniMarketProduct) => void;
  onAddToCart: (product: OmniMarketProduct) => void;
  initialQuery?: string;
}

export const OmniAiShoppingCopilotModal: React.FC<OmniAiShoppingCopilotModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [budgetMax, setBudgetMax] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<OmniShoppingAiRecommendation | null>(null);

  if (!isOpen) return null;

  const handleRunSearch = async (userPrompt?: string) => {
    const q = userPrompt || query;
    if (!q.trim()) return;

    setIsLoading(true);
    try {
      const rec = await omniCommerceService.runAiShoppingAssistant({
        query: q,
        budgetMax
      });
      setRecommendation(rec);
    } catch (err) {
      console.error('Failed to run AI shopping assistant', err);
    } finally {
      setIsLoading(false);
    }
  };

  const topPick = recommendation ? omniCommerceService.getProductById(recommendation.topPickProductId) : null;
  const budgetPick = recommendation ? omniCommerceService.getProductById(recommendation.budgetPickProductId) : null;
  const altPick = recommendation ? omniCommerceService.getProductById(recommendation.alternativePickProductId) : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl max-h-[90vh] bg-stone-950 border border-indigo-500/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-950/80 via-stone-900 to-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <span>OMNI Shopping Intelligence</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 text-[10px] font-mono">
                  Sovereign AI Copilot
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                Compare architectures • Summarise thousands of reviews • Unbiased recommendations with 100% sponsored disclosure
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Query Bar */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask anything (e.g., 'Best local LLM accelerator under $700' or 'Compare hardware security keys')..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRunSearch()}
                className="flex-1 p-3.5 rounded-2xl bg-stone-900 border border-stone-800 focus:border-indigo-500 text-sm text-stone-100 placeholder:text-stone-500 outline-none"
              />
              <button
                type="button"
                onClick={() => handleRunSearch()}
                disabled={isLoading || !query.trim()}
                className="px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                {isLoading ? (
                  <span>Thinking...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Inquire</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="text-stone-500 py-1 font-medium text-[11px]">Quick Inquiries:</span>
              {[
                'Best neural accelerator for 70B models',
                'Quantum-resistant FIDO3 key vs ring',
                'Developer Linux workstation for kernel builds',
                'Zero-cloud privacy smart home mesh router'
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(chip);
                    handleRunSearch(chip);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white text-[11px] transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* AI Output / Results */}
          {recommendation && (
            <div className="space-y-6 pt-2">
              {/* Executive Recommendation Box */}
              <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-600/50 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-indigo-400" />
                    AI Executive Recommendation
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    Zero Bias Guarantee
                  </span>
                </div>

                <p className="text-xs text-stone-200 leading-relaxed font-medium">
                  {recommendation.directRecommendation}
                </p>

                <div className="space-y-1.5 pt-1">
                  {recommendation.comparisonHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MANDATORY SPONSORED DISCLOSURE ACCORDION */}
              {recommendation.sponsoredDisclosures.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                    <Info className="w-4 h-4 text-amber-400" />
                    <span>MANDATORY SPONSORED & AFFILIATE DISCLOSURES</span>
                  </div>
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    In compliance with OMNI Sovereign Transparency Rules, all sponsored rankings and commercial affiliate partnerships are disclosed in full below:
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {recommendation.sponsoredDisclosures.map((disc, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 text-xs">
                        <div className="font-bold text-stone-200">{disc.productName}</div>
                        <div className="text-[11px] text-amber-300/80 mt-0.5">{disc.reason}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Review Synthesis & Bot Detection */}
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-200 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    Review Intelligence & Bot Filtration
                  </span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {recommendation.reviewSummary.overallSentiment}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <div className="text-emerald-400 font-semibold text-[11px]">Aggregated Buyer Praise:</div>
                    <ul className="text-stone-300 space-y-1">
                      {recommendation.reviewSummary.topPraise.map((p, i) => (
                        <li key={i}>• {p}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
                    <div className="text-amber-400 font-semibold text-[11px]">Common Minor Caveats:</div>
                    <ul className="text-stone-300 space-y-1">
                      {recommendation.reviewSummary.topCriticisms.map((c, i) => (
                        <li key={i}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Matched Product Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Recommended Catalog Solutions
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {topPick && (
                    <div className="p-4 rounded-2xl bg-stone-900 border border-indigo-600/60 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-[10px] uppercase mb-2">
                          Top Match
                        </span>
                        <img src={topPick.images[0]} alt="" className="w-full aspect-[16/10] object-cover rounded-xl mb-2" referrerPolicy="no-referrer" />
                        <h5 className="font-bold text-xs text-stone-100 line-clamp-2">{topPick.title}</h5>
                        <div className="text-sm font-extrabold text-stone-100 mt-1">${topPick.price.toFixed(2)}</div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            onSelectProduct(topPick);
                            onClose();
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => onAddToCart(topPick)}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {budgetPick && (
                    <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] uppercase mb-2">
                          Budget Champion
                        </span>
                        <img src={budgetPick.images[0]} alt="" className="w-full aspect-[16/10] object-cover rounded-xl mb-2" referrerPolicy="no-referrer" />
                        <h5 className="font-bold text-xs text-stone-100 line-clamp-2">{budgetPick.title}</h5>
                        <div className="text-sm font-extrabold text-stone-100 mt-1">${budgetPick.price.toFixed(2)}</div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            onSelectProduct(budgetPick);
                            onClose();
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => onAddToCart(budgetPick)}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {altPick && (
                    <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-bold text-[10px] uppercase mb-2">
                          Alternative Option
                        </span>
                        <img src={altPick.images[0]} alt="" className="w-full aspect-[16/10] object-cover rounded-xl mb-2" referrerPolicy="no-referrer" />
                        <h5 className="font-bold text-xs text-stone-100 line-clamp-2">{altPick.title}</h5>
                        <div className="text-sm font-extrabold text-stone-100 mt-1">${altPick.price.toFixed(2)}</div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            onSelectProduct(altPick);
                            onClose();
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => onAddToCart(altPick)}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
