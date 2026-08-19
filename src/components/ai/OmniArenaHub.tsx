import { useState, useEffect } from 'react';
import { 
  OMNIState, OmniArenaMatch, OmniArenaLeaderboardEntry 
} from '../../types';
import { 
  Flame, Trophy, Sparkles, RefreshCw, ThumbsUp, 
  HelpCircle, Eye, Check, X, ShieldAlert, Cpu, 
  Layers, ArrowRight, Zap, Copy, CheckCircle2
} from 'lucide-react';
import { omniAi } from '../../lib/omniAiSdk';

interface OmniArenaHubProps {
  state: OMNIState;
  triggerToast: (title: string, description: string, type?: 'success' | 'info' | 'error') => void;
}

export function OmniArenaHub({
  state,
  triggerToast
}: OmniArenaHubProps) {
  const [activeTab, setActiveTab] = useState<'match' | 'leaderboard'>('match');
  const [prompt, setPrompt] = useState('Write a thread-safe lock-free concurrent queue implementation in TypeScript with formal invariant explanations.');
  const [category, setCategory] = useState<'coding' | 'reasoning' | 'creative' | 'factual' | 'concise'>('coding');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<OmniArenaMatch | null>(null);
  const [userReason, setUserReason] = useState('');
  const [isVoting, setIsVoting] = useState(false);
  const [revealedResult, setRevealedResult] = useState<{
    winner: string;
    modelA: { id: string; name: string; provider: string; newElo: number };
    modelB: { id: string; name: string; provider: string; newElo: number };
    message: string;
  } | null>(null);

  // Leaderboard data
  const [leaderboard, setLeaderboard] = useState<OmniArenaLeaderboardEntry[]>([]);
  const [totalEvaluations, setTotalEvaluations] = useState(1480);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);

  const fetchLeaderboard = async () => {
    setIsLoadingLeaderboard(true);
    try {
      const data = await omniAi.getArenaLeaderboard();
      setLeaderboard(data.leaderboard);
      setTotalEvaluations(data.totalEvaluations);
    } catch (err: any) {
      // Fallback
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleRequestMatch = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setRevealedResult(null);
    setUserReason('');

    try {
      const match = await omniAi.requestArenaMatch({
        prompt,
        category,
        organizationId: state.currentOrgId
      });
      setCurrentMatch(match);
      triggerToast('Arena Match Generated', 'Two anonymous models have responded. Cast your blind vote!', 'info');
    } catch (err: any) {
      triggerToast('Match Error', err?.message || 'Failed to initialize arena match', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (winner: 'model_a' | 'model_b' | 'tie' | 'both_bad') => {
    if (!currentMatch) return;

    setIsVoting(true);
    try {
      const res = await omniAi.voteArenaMatch({
        matchId: currentMatch.matchId,
        winner,
        userFeedbackReason: userReason,
        organizationId: state.currentOrgId
      });

      setRevealedResult({
        winner: res.winner,
        modelA: res.revealed.modelA,
        modelB: res.revealed.modelB,
        message: res.message
      });

      triggerToast('Vote Recorded', 'Model identities unmasked! Elo ratings updated.', 'success');
      fetchLeaderboard();
    } catch (err: any) {
      triggerToast('Vote Failed', err?.message || 'Could not record vote', 'error');
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Top Banner & Tab Navigation */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Flame className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
                OMNI Blind Model Arena
              </h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Double-blind pairwise evaluations powering continuous Elo calibration across frontier and sovereign models.
            </p>
          </div>

          <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-xs">
            <button
              onClick={() => setActiveTab('match')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'match'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Pairwise Match</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('leaderboard');
                fetchLeaderboard();
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'leaderboard'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Elo Leaderboard</span>
            </button>
          </div>
        </div>

        {/* Categories & Match Request Input */}
        {activeTab === 'match' && (
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] font-bold text-neutral-400">Evaluation Domain:</span>
              {[
                { id: 'coding', label: 'Code & Architecture' },
                { id: 'reasoning', label: 'Math & Deep Logic' },
                { id: 'factual', label: 'Factual Grounding' },
                { id: 'concise', label: 'Executive Brevity' },
                { id: 'creative', label: 'Synthesizing & Creative' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id as any)}
                  className={`px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer text-xs ${
                    category === cat.id
                      ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Enter a challenging benchmark prompt to evaluate two anonymous models blind..."
              rows={2}
              className="w-full p-4 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-2xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 leading-relaxed font-medium"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-400">
                Model identities and telemetry are strictly masked to prevent confirmation bias.
              </span>
              <button
                onClick={handleRequestMatch}
                disabled={isLoading || !prompt.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-500 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Flame className="w-4 h-4" />}
                <span>{isLoading ? 'Generating Blind Outputs...' : 'Start Blind Battle'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MATCH VIEW */}
      {activeTab === 'match' && currentMatch && (
        <div className="space-y-6">
          
          {/* Side-by-Side Model Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* MODEL A */}
            <div className={`p-6 rounded-3xl border shadow-xs space-y-4 transition-all ${
              revealedResult?.winner === 'model_a'
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
            }`}>
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {revealedResult ? revealedResult.modelA.name : 'Model Alpha (Anonymous)'}
                  </h3>
                </div>
                {revealedResult && (
                  <span className="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-md text-[10px] font-mono font-bold">
                    Elo: {revealedResult.modelA.newElo}
                  </span>
                )}
              </div>

              <div className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans whitespace-pre-wrap">
                {currentMatch.modelA.response}
              </div>
            </div>

            {/* MODEL B */}
            <div className={`p-6 rounded-3xl border shadow-xs space-y-4 transition-all ${
              revealedResult?.winner === 'model_b'
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
            }`}>
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs">
                    B
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {revealedResult ? revealedResult.modelB.name : 'Model Beta (Anonymous)'}
                  </h3>
                </div>
                {revealedResult && (
                  <span className="px-2.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-md text-[10px] font-mono font-bold">
                    Elo: {revealedResult.modelB.newElo}
                  </span>
                )}
              </div>

              <div className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans whitespace-pre-wrap">
                {currentMatch.modelB.response}
              </div>
            </div>

          </div>

          {/* Voting Action Section */}
          {!revealedResult ? (
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4 text-center max-w-2xl mx-auto">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Cast Your Blind Evaluation Vote
              </h3>
              <p className="text-xs text-neutral-500">
                Which model provided the superior, more accurate, and better-structured answer?
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <button
                  onClick={() => handleVote('model_a')}
                  disabled={isVoting}
                  className="p-3 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-2xl text-xs font-bold transition-all cursor-pointer border border-indigo-200 dark:border-indigo-800"
                >
                  👈 Model Alpha is Better
                </button>
                <button
                  onClick={() => handleVote('model_b')}
                  disabled={isVoting}
                  className="p-3 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-2xl text-xs font-bold transition-all cursor-pointer border border-purple-200 dark:border-purple-800"
                >
                  👉 Model Beta is Better
                </button>
                <button
                  onClick={() => handleVote('tie')}
                  disabled={isVoting}
                  className="p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 rounded-2xl text-xs font-bold transition-all cursor-pointer border border-neutral-200 dark:border-neutral-700"
                >
                  🤝 Tie (Both Good)
                </button>
                <button
                  onClick={() => handleVote('both_bad')}
                  disabled={isVoting}
                  className="p-3 bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-red-700 dark:text-red-400 rounded-2xl text-xs font-bold transition-all cursor-pointer border border-red-200 dark:border-red-800"
                >
                  👎 Both are Bad
                </button>
              </div>

              <div className="pt-2">
                <input
                  type="text"
                  value={userReason}
                  onChange={e => setUserReason(e.target.value)}
                  placeholder="Optional reasoning (e.g. Model A handled edge case invariance better)..."
                  className="w-full p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs text-center focus:outline-hidden"
                />
              </div>
            </div>
          ) : (
            /* Reveal Card */
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-3xl border border-emerald-200 dark:border-emerald-800 shadow-xs space-y-4 max-w-2xl mx-auto text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <div>
                <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                  Model Identities Unmasked!
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                  {revealedResult.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2">
                <div className="p-3 bg-white dark:bg-neutral-900 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                  <p className="font-bold text-neutral-900 dark:text-neutral-100">{revealedResult.modelA.name}</p>
                  <p className="text-neutral-500">{revealedResult.modelA.provider}</p>
                  <p className="text-emerald-600 font-bold mt-1">Elo: {revealedResult.modelA.newElo}</p>
                </div>
                <div className="p-3 bg-white dark:bg-neutral-900 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                  <p className="font-bold text-neutral-900 dark:text-neutral-100">{revealedResult.modelB.name}</p>
                  <p className="text-neutral-500">{revealedResult.modelB.provider}</p>
                  <p className="text-emerald-600 font-bold mt-1">Elo: {revealedResult.modelB.newElo}</p>
                </div>
              </div>

              <button
                onClick={handleRequestMatch}
                className="px-6 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl text-xs font-bold hover:opacity-90 cursor-pointer shadow-xs"
              >
                Start Next Arena Battle
              </button>
            </div>
          )}

        </div>
      )}

      {/* LEADERBOARD VIEW */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Global Model Elo Ratings
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Calibrated across {totalEvaluations.toLocaleString()} pairwise blind human & judge evaluations.
              </p>
            </div>
            <button
              onClick={fetchLeaderboard}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingLeaderboard ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 uppercase text-[10px]">
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">Model</th>
                  <th className="py-2.5 px-3">Provider</th>
                  <th className="py-2.5 px-3">Arena Elo</th>
                  <th className="py-2.5 px-3">Matches</th>
                  <th className="py-2.5 px-3">Win Rate</th>
                  <th className="py-2.5 px-3">Avg Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-mono">
                {leaderboard.map(entry => (
                  <tr key={entry.modelId} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                    <td className="py-3.5 px-3 font-bold">
                      {entry.rank === 1 ? '🥇 #1' : (entry.rank === 2 ? '🥈 #2' : (entry.rank === 3 ? '🥉 #3' : `#${entry.rank}`))}
                    </td>
                    <td className="py-3.5 px-3 font-sans font-bold text-neutral-900 dark:text-neutral-100">
                      {entry.modelName}
                    </td>
                    <td className="py-3.5 px-3 text-neutral-500">{entry.provider}</td>
                    <td className="py-3.5 px-3 font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                      {entry.eloRating}
                    </td>
                    <td className="py-3.5 px-3 text-neutral-600 dark:text-neutral-400">{entry.matchesPlayed}</td>
                    <td className="py-3.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">{entry.winRatePercentage}%</td>
                    <td className="py-3.5 px-3 text-neutral-500">{entry.avgLatencyMs}ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
