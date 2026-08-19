import React, { useState } from 'react';
import {
  Gamepad2,
  Trophy,
  Sparkles,
  ShieldAlert,
  Cpu,
  Brain,
  Search,
  Filter,
  Play,
  Flame,
  CheckCircle2,
  Wifi,
  WifiOff,
  ArrowRight,
  Layers,
  Award
} from 'lucide-react';
import { PlayGameItem, PlayGameCategory } from '../../../types/play_learn_ecosystem';
import { omniPlayLearnService } from '../../../sdk/browser-services/OmniPlayLearnService';
import { OmniCypherGridGame } from './games/OmniCypherGridGame';
import { OmniLogicCircuitGame } from './games/OmniLogicCircuitGame';
import { OmniTriviaFamilyGame } from './games/OmniTriviaFamilyGame';
import { OmniAchievementsModal } from './OmniAchievementsModal';

export const OmniPlayRoot: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PlayGameCategory>('all');
  const [activePlayableGameId, setActivePlayableGameId] = useState<string | null>(null);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const games = omniPlayLearnService.getGames(selectedCategory);
  const userXp = omniPlayLearnService.getUserTotalXp();

  const filteredGames = games.filter(g =>
    searchQuery === '' ||
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categories: { id: PlayGameCategory; label: string }[] = [
    { id: 'all', label: 'All Experiences' },
    { id: 'cyber_logic', label: 'Cyber Cryptography' },
    { id: 'stem_sim', label: 'STEM & Circuit Sim' },
    { id: 'family', label: 'Family & Trivia' },
    { id: 'educational', label: 'AI & Neural Systems' },
    { id: 'puzzles', label: 'Logic Puzzles' }
  ];

  // Render active game if selected
  if (activePlayableGameId === 'game_cypher_grid') {
    return (
      <div className="flex-1 p-6 bg-stone-950 overflow-y-auto">
        <OmniCypherGridGame onBack={() => setActivePlayableGameId(null)} />
      </div>
    );
  }

  if (activePlayableGameId === 'game_logic_circuit') {
    return (
      <div className="flex-1 p-6 bg-stone-950 overflow-y-auto">
        <OmniLogicCircuitGame onBack={() => setActivePlayableGameId(null)} />
      </div>
    );
  }

  if (activePlayableGameId === 'game_family_trivia') {
    return (
      <div className="flex-1 p-6 bg-stone-950 overflow-y-auto">
        <OmniTriviaFamilyGame onBack={() => setActivePlayableGameId(null)} />
      </div>
    );
  }

  return (
    <div id="omni-play-root" className="flex-1 flex flex-col bg-stone-950 text-stone-100 overflow-hidden">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/40 border-b border-stone-800 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>OMNI Play Sovereign Arcade</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Educational Games, Quantum Puzzles & Family Play
            </h1>
            <p className="text-xs text-stone-400 max-w-xl">
              100% offline-ready, zero-telemetry educational simulators, cryptography challenges, and family multiplayer trivia.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAchievementsOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all shadow-md active:scale-95"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Achievements ({userXp.toLocaleString()} XP)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Controls Bar: Search & Category Chips */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === c.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search games, skills, STEM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Featured Game Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-stone-900 to-stone-900 border border-indigo-800/40 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold uppercase">
                  Featured Challenge
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <WifiOff className="w-3.5 h-3.5" /> Offline Verified
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-white">Sovereign Cypher Grid: Post-Quantum Decryption</h2>
              <p className="text-xs text-stone-300 max-w-lg leading-relaxed">
                Step into the shoes of a post-quantum cryptographer. Solve interactive lattice parity puzzles and decrypt memory blocks without network telemetry.
              </p>

              <div className="flex items-center gap-4 text-xs text-stone-400">
                <span className="flex items-center gap-1 font-mono text-amber-400 font-bold">
                  <Flame className="w-3.5 h-3.5" /> +350 XP
                </span>
                <span>•</span>
                <span>Est. 8 Mins</span>
                <span>•</span>
                <span className="text-stone-300">All Ages / Intermediate</span>
              </div>

              <button
                onClick={() => setActivePlayableGameId('game_cypher_grid')}
                className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Launch Cypher Grid</span>
              </button>
            </div>

            <div className="w-full md:w-64 h-44 rounded-2xl overflow-hidden border border-stone-700 shrink-0 shadow-lg relative">
              <img
                src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80"
                alt="Cypher Grid"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
            </div>
          </div>

          {/* Games Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-stone-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Available Sovereign Games & Simulations</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="p-5 rounded-3xl bg-stone-900 border border-stone-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
                >
                  <div className="space-y-3">
                    <div className="h-36 rounded-2xl overflow-hidden border border-stone-800 relative">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-stone-950/80 backdrop-blur-md border border-stone-800 text-[10px] font-mono font-bold text-stone-200">
                        {game.difficulty}
                      </div>
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-[10px] font-mono font-bold text-amber-300">
                        +{game.xpReward} XP
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-stone-100 group-hover:text-indigo-400 transition-colors">
                        {game.title}
                      </h4>
                      <p className="text-xs text-stone-400 line-clamp-2 mt-1">
                        {game.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {game.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-stone-950 border border-stone-800 text-[10px] text-stone-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 font-medium">
                      {game.playersCount}
                    </span>

                    <button
                      onClick={() => setActivePlayableGameId(game.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-indigo-600 hover:text-white text-stone-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Modal */}
      <OmniAchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
      />
    </div>
  );
};
