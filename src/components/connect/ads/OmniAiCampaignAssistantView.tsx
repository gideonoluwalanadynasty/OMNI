import React, { useState } from 'react';
import {
  Sparkles,
  Brain,
  Wand2,
  CheckCircle,
  XCircle,
  Eye,
  TrendingUp,
  Target,
  Layers,
  ArrowRight,
  RefreshCw,
  Zap,
  ShieldCheck,
  Smartphone,
  Sliders,
  DollarSign
} from 'lucide-react';
import {
  AiGeneratedCampaignProposal,
  AdCampaign,
  AdPlacementType
} from '../../../types/omni_ads';
import { SEED_AI_CAMPAIGN_PROPOSALS } from '../../../data/omni_ads_seed';

interface Props {
  onApproveProposal: (proposal: AiGeneratedCampaignProposal) => void;
  onPreviewPlacement: (placement: AdPlacementType) => void;
}

export const OmniAiCampaignAssistantView: React.FC<Props> = ({
  onApproveProposal,
  onPreviewPlacement
}) => {
  const [proposals, setProposals] = useState<AiGeneratedCampaignProposal[]>(SEED_AI_CAMPAIGN_PROPOSALS);
  const [activeProposalId, setActiveProposalId] = useState<string>(proposals[0]?.id || '');
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCopyIndex, setSelectedCopyIndex] = useState(0);
  const [selectedVisualIndex, setSelectedVisualIndex] = useState(0);

  const activeProposal = proposals.find(p => p.id === activeProposalId) || proposals[0];

  const handleGenerateNewCampaign = () => {
    if (!promptInput.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const generated: AiGeneratedCampaignProposal = {
        id: `ai-prop-${Date.now()}`,
        prompt: promptInput,
        recommendedName: `AI: ${promptInput.slice(0, 30)}...`,
        recommendedObjective: promptInput.toLowerCase().includes('lead') ? 'leads' : 'sales',
        recommendedPlacements: ['feed_native', 'video_ad_break', 'moments_vertical', 'search_sponsored'],
        recommendedDailyBudgetUsd: 120,
        recommendedBidStrategy: 'target_roas',
        recommendedTargetBidUsd: 3.50,
        predictedRoas: 6.2,
        predictedReachMin: 95000,
        predictedReachMax: 280000,
        generatedCopyOptions: [
          {
            headline: 'Experience Sovereign Intelligence Built for Builders',
            primaryText: `Engineered from the ground up: ${promptInput}. Integrate seamlessly with zero vendor lock-in and instant settlement.`,
            callToAction: 'Shop Now',
            sellingPoints: ['Gemini 2.5 Core', 'Zero Third-Party Tracking', 'Instant Crypto/Fiat Settlement']
          },
          {
            headline: 'The Next Leap in Autonomous Operations',
            primaryText: 'Scale your business 10x faster with AI-augmented pipelines. Experience sovereign speed and guaranteed privacy.',
            callToAction: 'Learn More',
            sellingPoints: ['Enterprise SLA', 'Sub-second Execution', 'Automated Ledgers']
          }
        ],
        generatedVisualPrompts: [
          {
            visualDescription: 'Futuristic holographic terminal visualizing real-time financial flows and glowing quantum nodes.',
            recommendedAspectRatio: '16:9',
            previewUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800'
          },
          {
            visualDescription: 'Vertical 9:16 mobile mockup showcasing sleek dark interface with golden badge animations.',
            recommendedAspectRatio: '9:16',
            previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'
          }
        ],
        suggestedAudience: {
          locations: ['United States', 'United Kingdom', 'Germany', 'Japan', 'Singapore'],
          languages: ['English'],
          ageMin: 22,
          ageMax: 55,
          genders: ['all'],
          interests: ['Artificial Intelligence', 'Software Engineering', 'Decentralized Finance'],
          behaviours: ['Tech Innovators', 'Early Adopters'],
          communityMemberships: ['space-ai-builders'],
          businessCategories: ['Technology'],
          privacyConsentMode: 'anonymized_cohorts',
          estimatedAudienceSize: 1650000
        },
        requiresUserApproval: true,
        approvalStatus: 'pending'
      };

      setProposals(prev => [generated, ...prev]);
      setActiveProposalId(generated.id);
      setIsGenerating(false);
      setPromptInput('');
    }, 1200);
  };

  const handleApprove = (prop: AiGeneratedCampaignProposal) => {
    setProposals(prev => prev.map(p => p.id === prop.id ? { ...p, approvalStatus: 'approved' } : p));
    onApproveProposal(prop);
  };

  const handleReject = (propId: string) => {
    setProposals(prev => prev.map(p => p.id === propId ? { ...p, approvalStatus: 'rejected' } : p));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Brain className="w-4 h-4" />
              Gemini 2.5 Multimodal Advertising Engine
            </div>
            <h2 className="text-2xl font-black text-white">AI Campaign Studio & Performance Copilot</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Turn single-sentence business goals into end-to-end multi-placement ad campaigns with predictive ROAS, AI-crafted copy, visual mockups, and strict Human-in-the-Loop approval.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-xs font-bold text-purple-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Human Approval Enforced
            </div>
          </div>
        </div>

        {/* Prompt Input Bar */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Sparkles className="w-5 h-5 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Describe your product, goal, or campaign vision (e.g. 'Launch our new titanium hardware wallet with $150 daily budget targeting crypto founders')..."
              value={promptInput}
              onChange={e => setPromptInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleGenerateNewCampaign()}
              className="w-full pl-11 pr-4 py-3 bg-slate-950/90 border border-purple-500/40 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          <button
            onClick={handleGenerateNewCampaign}
            disabled={isGenerating || !promptInput.trim()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 shrink-0"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Synthesizing Campaign...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate Campaign
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split Layout: Proposal Selector & Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Proposals History */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Generated Campaign Proposals ({proposals.length})
          </div>

          <div className="space-y-2.5">
            {proposals.map(prop => {
              const isSelected = prop.id === activeProposalId;
              return (
                <div
                  key={prop.id}
                  onClick={() => setActiveProposalId(prop.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500/80 shadow-md shadow-purple-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase text-purple-400 truncate">
                      {prop.recommendedObjective}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      prop.approvalStatus === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : prop.approvalStatus === 'rejected'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {prop.approvalStatus}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-1 line-clamp-1">{prop.recommendedName}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{prop.prompt}</p>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 mt-2 border-t border-slate-800">
                    <span>Budget: <strong className="text-white">${prop.recommendedDailyBudgetUsd}/day</strong></span>
                    <span className="text-emerald-400 font-bold">ROAS: {prop.predictedRoas}x</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Proposal Breakdown & Human Approval Gateway */}
        <div className="lg:col-span-8 space-y-5">
          {activeProposal && (
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-6">
              {/* Proposal Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Gemini Proposal
                    </span>
                    <span className="text-xs font-bold uppercase text-slate-400">
                      Objective: {activeProposal.recommendedObjective}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white mt-1">{activeProposal.recommendedName}</h3>
                </div>

                {/* Human Approval Action Bar */}
                <div className="flex items-center gap-2">
                  {activeProposal.approvalStatus === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleReject(activeProposal.id)}
                        className="px-3.5 py-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold rounded-xl border border-rose-500/30 flex items-center gap-1.5 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(activeProposal)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve & Launch Campaign
                      </button>
                    </>
                  ) : activeProposal.approvalStatus === 'approved' ? (
                    <div className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Approved & Deployed to Live Auction
                    </div>
                  ) : (
                    <div className="px-4 py-2 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-rose-400" />
                      Proposal Rejected
                    </div>
                  )}
                </div>
              </div>

              {/* Predictive Financial Model Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-xs">Daily Budget</div>
                  <div className="text-lg font-black text-white mt-0.5">${activeProposal.recommendedDailyBudgetUsd}</div>
                  <div className="text-[10px] text-slate-500">Paced Automatically</div>
                </div>

                <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-xs">Predicted ROAS</div>
                  <div className="text-lg font-black text-emerald-400 mt-0.5">{activeProposal.predictedRoas}x</div>
                  <div className="text-[10px] text-emerald-500">Confidence: 94%</div>
                </div>

                <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-xs">Est. Audience Reach</div>
                  <div className="text-lg font-black text-indigo-300 mt-0.5">
                    {(activeProposal.predictedReachMin / 1000).toFixed(0)}k - {(activeProposal.predictedReachMax / 1000).toFixed(0)}k
                  </div>
                  <div className="text-[10px] text-slate-500">Anonymized Cohorts</div>
                </div>

                <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-xs">Target Bid</div>
                  <div className="text-lg font-black text-white mt-0.5">${activeProposal.recommendedTargetBidUsd.toFixed(2)}</div>
                  <div className="text-[10px] text-slate-500">{activeProposal.recommendedBidStrategy.replace(/_/g, ' ')}</div>
                </div>
              </div>

              {/* Multivariant AI Copy Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI-Generated Copy Variations ({activeProposal.generatedCopyOptions.length})
                  </div>
                  <span className="text-xs text-slate-400">Select preferred variant</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeProposal.generatedCopyOptions.map((copy, idx) => {
                    const isSelected = selectedCopyIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedCopyIndex(idx)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                          isSelected
                            ? 'bg-purple-950/30 border-purple-500 text-white'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-purple-300">Variant #{idx + 1}</span>
                          <span className="px-2 py-0.5 bg-indigo-600/30 text-indigo-300 text-[10px] font-bold rounded">
                            CTA: {copy.callToAction}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{copy.headline}</h4>
                        <p className="text-xs text-slate-400">{copy.primaryText}</p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {copy.sellingPoints.map((sp, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-800">
                              ✓ {sp}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Multivariant Visual Concepts & Previews */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  Multimodal Creative Visual Assets ({activeProposal.generatedVisualPrompts.length})
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeProposal.generatedVisualPrompts.map((vis, idx) => {
                    const isSelected = selectedVisualIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedVisualIndex(idx)}
                        className={`p-3 rounded-xl border space-y-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-950/30 border-purple-500'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="font-semibold text-white">Visual Concept #{idx + 1}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded">
                            {vis.recommendedAspectRatio}
                          </span>
                        </div>

                        <img
                          src={vis.previewUrl}
                          alt={vis.visualDescription}
                          className="w-full h-40 object-cover rounded-lg border border-slate-800"
                        />

                        <p className="text-xs text-slate-400 line-clamp-2 italic">
                          "{vis.visualDescription}"
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommended Placements & Target Audience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div>
                  <div className="text-xs font-bold uppercase text-slate-400 mb-2">Recommended Placements</div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProposal.recommendedPlacements.map(pl => (
                      <button
                        key={pl}
                        onClick={() => onPreviewPlacement(pl)}
                        className="px-2.5 py-1 bg-slate-950 hover:bg-indigo-950 text-indigo-300 border border-slate-800 hover:border-indigo-500/40 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                      >
                        <Layers className="w-3 h-3" />
                        {pl.replace(/_/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase text-slate-400 mb-2">Target Audience Cohort</div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div>Locations: <strong>{activeProposal.suggestedAudience.locations.join(', ')}</strong></div>
                    <div>Interests: <strong>{activeProposal.suggestedAudience.interests.join(', ')}</strong></div>
                    <div>Privacy Mode: <strong className="text-emerald-400">Differential Privacy (Anonymized)</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
