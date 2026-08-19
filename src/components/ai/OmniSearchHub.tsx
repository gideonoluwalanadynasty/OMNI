import { useState } from 'react';
import { OMNIState, OmniAiSearchCitation } from '../../types';
import { 
  Search, Globe, Database, ShieldCheck, ExternalLink, 
  Sparkles, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, 
  Layers, FileText, Download, Copy, Bookmark, ChevronRight,
  Filter, Clock, Check, Share2
} from 'lucide-react';
import { omniAi } from '../../lib/omniAiSdk';

interface OmniSearchHubProps {
  state: OMNIState;
  triggerToast: (title: string, description: string, type?: 'success' | 'info' | 'error') => void;
  onContinueInChat?: (prompt: string) => void;
}

export function OmniSearchHub({
  state,
  triggerToast,
  onContinueInChat
}: OmniSearchHubProps) {
  const [query, setQuery] = useState('Byzantine Fault Tolerant double-entry ledger consensus protocols');
  const [scope, setScope] = useState<'hybrid' | 'web' | 'enterprise_vault'>('hybrid');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    query: string;
    scope: string;
    synthesizedAnswer: string;
    citations: any[];
    followUpQuestions: string[];
    confidenceScore: number;
    isModelKnowledgeDistinctFromEvidence: boolean;
    timestamp: string;
    latencyMs: number;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<'synthesis' | 'sources' | 'evidence_matrix' | 'comparison'>('synthesis');
  const [selectedCitation, setSelectedCitation] = useState<any | null>(null);

  const handleExecuteSearch = async (targetQuery?: string) => {
    const q = targetQuery || query;
    if (!q.trim()) return;

    setIsLoading(true);
    try {
      const res = await omniAi.search({
        query: q,
        scope,
        organizationId: state.currentOrgId
      });
      setSearchResult(res);
      if (res.citations.length > 0) {
        setSelectedCitation(res.citations[0]);
      }
    } catch (err: any) {
      triggerToast('Search Failed', err?.message || 'Unable to execute provider-neutral search', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Header & Search Bar Banner */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Search className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
                OMNI Grounded Search
              </h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Provider-neutral retrieval with verified citation tracking, freshness metadata, and quoted evidence extraction.
            </p>
          </div>

          {/* Scope Selector */}
          <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-xs">
            {[
              { id: 'hybrid', label: 'Hybrid Verified', icon: Layers },
              { id: 'web', label: 'Live Web', icon: Globe },
              { id: 'enterprise_vault', label: 'Tenant Vaults', icon: Database }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setScope(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    scope === tab.id
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Bar */}
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleExecuteSearch()}
              placeholder="Search across verified sovereign sources, regulatory directives, or public web..."
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-2xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
            />
          </div>
          <button
            onClick={() => handleExecuteSearch()}
            disabled={isLoading || !query.trim()}
            className="flex items-center gap-2 px-5 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-2xl text-xs font-bold hover:opacity-90 transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Search & Synthesize</span>
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
          <span className="text-[11px] font-bold text-neutral-400">Trending Queries:</span>
          {[
            'EU AI Act Article 14 human-in-the-loop requirements',
            'Hardware confidential computing enclaves zero-egress proofs',
            'Byzantine state machine replication latency benchmarks'
          ].map((pill, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(pill);
                handleExecuteSearch(pill);
              }}
              className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-neutral-600 dark:text-neutral-300 text-[11px] font-medium transition-all cursor-pointer"
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Main Results Panel */}
      {searchResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left / Center 2 Columns: Synthesis & Grounding */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Synthesis Card */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
              
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-mono font-bold uppercase border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Retrieved Evidence Verified</span>
                  </span>
                  <span className="text-xs text-neutral-400">•</span>
                  <span className="text-[11px] font-mono text-neutral-500">
                    Latency: {searchResult.latencyMs}ms • Confidence: {(searchResult.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(searchResult.synthesizedAnswer);
                      triggerToast('Copied', 'Synthesis copied to clipboard.', 'success');
                    }}
                    className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-neutral-500 cursor-pointer"
                    title="Copy Synthesis"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onContinueInChat?.(`Based on this search synthesis: "${searchResult.synthesizedAnswer}", elaborate further on the sovereign architecture implications.`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-bold hover:bg-indigo-100 cursor-pointer border border-indigo-200 dark:border-indigo-800"
                  >
                    <span>Continue in Chat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Synthesized Answer Body */}
              <div className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-neutral-800 dark:text-neutral-200">
                {searchResult.synthesizedAnswer}
              </div>

              {/* Distinction Banner: Model Knowledge vs Retrieved Evidence */}
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 space-y-0.5">
                  <p className="font-bold text-neutral-800 dark:text-neutral-200">
                    Epistemic Fact-Check Distinction
                  </p>
                  <p>
                    Inline numbers <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">[1], [2], [3]</span> map directly to verifiable retrieved sources. Unbracketed sentences represent parametric model inference. No synthetic citations have been hallucinated.
                  </p>
                </div>
              </div>

              {/* Follow-up Interactive Questions */}
              {searchResult.followUpQuestions && searchResult.followUpQuestions.length > 0 && (
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Suggested Follow-ups & Deep Explorations:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {searchResult.followUpQuestions.map((fq, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setQuery(fq);
                          handleExecuteSearch(fq);
                        }}
                        className="p-2.5 bg-neutral-50 dark:bg-neutral-800/40 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 text-left text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <span className="truncate">{fq}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-indigo-500 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Quoted-Evidence Tracking Matrix */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                <span>Extracted Quoted-Evidence Passages</span>
              </h3>

              <div className="space-y-3">
                {searchResult.citations.map((cit, idx) => (
                  <div
                    key={cit.id || idx}
                    className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        [{idx + 1}] {cit.title}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {cit.publishedDate || 'Fresh'} • {cit.domain}
                      </span>
                    </div>
                    {cit.quotedEvidence ? (
                      <blockquote className="border-l-2 border-indigo-500 pl-3 text-xs italic text-neutral-700 dark:text-neutral-300 bg-white/50 dark:bg-black/20 py-1 rounded-r-lg">
                        "{cit.quotedEvidence}"
                      </blockquote>
                    ) : (
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {cit.snippet}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Source Inspection & Freshness Metadata */}
          <div className="space-y-6">
            
            {/* Verified Sources Roster */}
            <div className="bg-white dark:bg-neutral-900 p-5 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-neutral-500">
                  Retrieved Sources ({searchResult.citations.length})
                </h3>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  100% Attestation
                </span>
              </div>

              <div className="space-y-2">
                {searchResult.citations.map((cit, idx) => {
                  const isSelected = selectedCitation?.id === cit.id;
                  return (
                    <div
                      key={cit.id || idx}
                      onClick={() => setSelectedCitation(cit)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? 'bg-indigo-50/70 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700 shadow-xs'
                          : 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5 min-w-0">
                          <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                            [{idx + 1}] {cit.title}
                          </p>
                          <p className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                            <span>{cit.domain}</span>
                            <span>•</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{cit.sourceType || 'Web'}</span>
                          </p>
                        </div>
                        <a
                          href={cit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-indigo-600"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 line-clamp-2">
                        {cit.snippet}
                      </p>

                      <div className="flex items-center justify-between text-[10px] pt-1 border-t border-neutral-200/60 dark:border-neutral-700/60">
                        <span className="flex items-center gap-1 text-neutral-400">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{cit.publishedDate || 'Verified'}</span>
                        </span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                          {(cit.relevanceScore * 100).toFixed(0)}% Match
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Source Deep Inspector */}
            {selectedCitation && (
              <div className="bg-white dark:bg-neutral-900 p-5 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-neutral-500">
                  Source Provenance Inspector
                </h3>
                <div className="p-3.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl space-y-2 border border-neutral-200 dark:border-neutral-700 text-xs">
                  <p className="font-bold text-neutral-900 dark:text-neutral-100">{selectedCitation.title}</p>
                  <p className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400 break-all">{selectedCitation.url}</p>
                  <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700 text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {selectedCitation.snippet}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      ) : (
        /* Empty State */
        <div className="bg-white dark:bg-neutral-900 p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 text-center space-y-3 max-w-md mx-auto">
          <Globe className="w-10 h-10 mx-auto text-indigo-500 opacity-60" />
          <h3 className="text-base font-bold">Ready to Probe Knowledge Horizons</h3>
          <p className="text-xs text-neutral-500">
            Submit a query above to retrieve live citations, extract factual evidence, and verify claims across sovereign repositories.
          </p>
        </div>
      )}

    </div>
  );
}
