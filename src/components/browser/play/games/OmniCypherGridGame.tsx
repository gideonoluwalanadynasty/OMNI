import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Award,
  CheckCircle2,
  Lock,
  Unlock,
  Zap,
  ArrowLeft,
  Flame,
  Info
} from 'lucide-react';
import { omniPlayLearnService } from '../../../../sdk/browser-services/OmniPlayLearnService';

interface OmniCypherGridGameProps {
  onBack: () => void;
  onComplete?: (score: number) => void;
}

export const OmniCypherGridGame: React.FC<OmniCypherGridGameProps> = ({ onBack, onComplete }) => {
  const [level, setLevel] = useState(1);
  const [gridSize, setGridSize] = useState(4);
  const [grid, setGrid] = useState<number[]>([]);
  const [targetParity, setTargetParity] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isLevelSolved, setIsLevelSolved] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [streak, setStreak] = useState(1);

  // Initialize level
  const initLevel = (lvl: number) => {
    const size = lvl <= 2 ? 3 : lvl <= 5 ? 4 : 5;
    setGridSize(size);
    const totalCells = size * size;

    // Generate random initial binary lattice state
    const initialGrid = Array.from({ length: totalCells }, () => (Math.random() > 0.5 ? 1 : 0));
    setGrid(initialGrid);

    // Target is all 1s (Quantum Decryption state)
    const target = Array.from({ length: totalCells }, () => 1);
    setTargetParity(target);

    setMoves(0);
    setIsLevelSolved(false);
  };

  useEffect(() => {
    initLevel(level);
  }, [level]);

  // Handle cell click (flips self and orthogonal neighbors in lattice)
  const handleCellClick = (index: number) => {
    if (isLevelSolved) return;

    const newGrid = [...grid];
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    // Toggle self
    newGrid[index] = newGrid[index] === 1 ? 0 : 1;

    // Toggle neighbors (Up, Down, Left, Right)
    const neighbors = [
      { r: row - 1, c: col },
      { r: row + 1, c: col },
      { r: row, c: col - 1 },
      { r: row, c: col + 1 }
    ];

    neighbors.forEach(({ r, c }) => {
      if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
        const neighborIdx = r * gridSize + c;
        newGrid[neighborIdx] = newGrid[neighborIdx] === 1 ? 0 : 1;
      }
    });

    setGrid(newGrid);
    setMoves(prev => prev + 1);

    // Check if all cells are 1 (Solved!)
    if (newGrid.every(val => val === 1)) {
      setIsLevelSolved(true);
      const points = Math.max(100, 500 - moves * 15) * streak;
      setTotalScore(prev => prev + points);
      setStreak(prev => prev + 1);
      omniPlayLearnService.unlockAchievement('ach_pqc_cryptography');
      if (onComplete) onComplete(totalScore + points);
    }
  };

  const handleNextLevel = () => {
    setLevel(prev => prev + 1);
  };

  return (
    <div id="omni-cypher-grid-game" className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-6 max-w-2xl mx-auto shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Game</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-800">
            <Flame className="w-4 h-4" />
            <span>Streak: {streak}x</span>
          </div>

          <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800">
            Score: {totalScore} XP
          </div>
        </div>
      </div>

      {/* Game Info & Level Target */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 text-[10px] font-mono font-bold uppercase">
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
          Level {level}: NIST Lattice Inversion
        </div>
        <h3 className="text-lg font-extrabold text-stone-100">
          Sovereign Cypher Grid
        </h3>
        <p className="text-xs text-stone-400 max-w-md mx-auto">
          Align all polynomial lattice nodes to <strong className="text-emerald-400">STATE 1 (Quantum Decrypted)</strong>. Clicking a node inverts its orthogonal parity.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="flex items-center justify-center gap-8 py-2 text-xs">
        <div className="text-center">
          <span className="text-stone-500 text-[11px]">Moves Made</span>
          <div className="text-base font-bold text-stone-200 font-mono">{moves}</div>
        </div>
        <div className="text-center">
          <span className="text-stone-500 text-[11px]">Decrypted Nodes</span>
          <div className="text-base font-bold text-emerald-400 font-mono">
            {grid.filter(v => v === 1).length} / {grid.length}
          </div>
        </div>
      </div>

      {/* Interactive Lattice Grid */}
      <div className="flex justify-center">
        <div
          className="grid gap-2.5 p-4 rounded-2xl bg-stone-950 border border-stone-800 shadow-inner"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
          }}
        >
          {grid.map((val, idx) => (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-sm transition-all duration-150 active:scale-95 shadow-md ${
                val === 1
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-emerald-400 shadow-emerald-950/80'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-400 border border-stone-700'
              }`}
            >
              {val === 1 ? <Unlock className="w-4 h-4 mb-0.5" /> : <Lock className="w-4 h-4 mb-0.5 text-stone-600" />}
              <span>{val}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Solved Victory Banner */}
      {isLevelSolved && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-center space-y-2 shadow-2xl animate-fade-in">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center mx-auto font-bold shadow-lg">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-extrabold text-white">Lattice Inversion Complete!</h4>
          <p className="text-xs text-emerald-200">
            Enclave decrypted in {moves} moves. Awarded +{Math.max(100, 500 - moves * 15) * streak} XP.
          </p>
          <button
            onClick={handleNextLevel}
            className="mt-2 px-5 py-2 rounded-xl bg-white text-stone-950 font-bold text-xs hover:bg-stone-200 transition-colors shadow-md"
          >
            Advance to Level {level + 1} →
          </button>
        </div>
      )}

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-2 text-xs text-stone-400 border-t border-stone-800">
        <button
          onClick={() => initLevel(level)}
          className="flex items-center gap-1 text-stone-400 hover:text-stone-200 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Level</span>
        </button>

        <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
          <Info className="w-3.5 h-3.5" />
          <span>Offline Encrypted Logic Engine</span>
        </div>
      </div>
    </div>
  );
};
