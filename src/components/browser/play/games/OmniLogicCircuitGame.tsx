import React, { useState } from 'react';
import {
  Cpu,
  ArrowLeft,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Award,
  Layers
} from 'lucide-react';
import { omniPlayLearnService } from '../../../../sdk/browser-services/OmniPlayLearnService';

interface OmniLogicCircuitGameProps {
  onBack: () => void;
  onComplete?: (score: number) => void;
}

type GateType = 'AND' | 'OR' | 'XOR' | 'NAND' | 'NOR' | 'NOT';

interface CircuitChallenge {
  id: string;
  name: string;
  targetOutput: (a: boolean, b: boolean) => boolean;
  targetTruthTable: { a: boolean; b: boolean; expected: boolean }[];
  description: string;
}

const CHALLENGES: CircuitChallenge[] = [
  {
    id: 'c1',
    name: 'Challenge 1: The Half Adder Sum Bit',
    targetOutput: (a, b) => (a && !b) || (!a && b), // XOR
    targetTruthTable: [
      { a: false, b: false, expected: false },
      { a: false, b: true, expected: true },
      { a: true, b: false, expected: true },
      { a: true, b: true, expected: false }
    ],
    description: 'Construct the logic that produces TRUE only when exactly ONE input is active (Sum bit for binary addition).'
  },
  {
    id: 'c2',
    name: 'Challenge 2: The Carry-Out Generator',
    targetOutput: (a, b) => a && b, // AND
    targetTruthTable: [
      { a: false, b: false, expected: false },
      { a: false, b: true, expected: false },
      { a: true, b: false, expected: false },
      { a: true, b: true, expected: true }
    ],
    description: 'Generate the Carry-Out bit (TRUE only when BOTH input A and B are active simultaneously).'
  },
  {
    id: 'c3',
    name: 'Challenge 3: Sovereign Universal Inversion',
    targetOutput: (a, b) => !(a && b), // NAND
    targetTruthTable: [
      { a: false, b: false, expected: true },
      { a: false, b: true, expected: true },
      { a: true, b: false, expected: true },
      { a: true, b: true, expected: false }
    ],
    description: 'Build the universal NAND gate: output is FALSE only when BOTH inputs are active.'
  }
];

export const OmniLogicCircuitGame: React.FC<OmniLogicCircuitGameProps> = ({ onBack, onComplete }) => {
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [inputA, setInputA] = useState(true);
  const [inputB, setInputB] = useState(false);
  const [selectedGate, setSelectedGate] = useState<GateType>('AND');
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [circuitScore, setCircuitScore] = useState(0);

  const challenge = CHALLENGES[currentChallengeIdx];

  // Evaluate gate output
  const evaluateGate = (a: boolean, b: boolean, gate: GateType): boolean => {
    switch (gate) {
      case 'AND': return a && b;
      case 'OR': return a || b;
      case 'XOR': return (a && !b) || (!a && b);
      case 'NAND': return !(a && b);
      case 'NOR': return !(a || b);
      case 'NOT': return !a;
    }
  };

  const currentOutput = evaluateGate(inputA, inputB, selectedGate);

  // Check truth table compliance
  const truthTableResults = challenge.targetTruthTable.map(row => {
    const actual = evaluateGate(row.a, row.b, selectedGate);
    return {
      ...row,
      actual,
      passed: actual === row.expected
    };
  });

  const allPassed = truthTableResults.every(r => r.passed);

  const handleValidate = () => {
    if (allPassed && !solvedChallenges.includes(challenge.id)) {
      setSolvedChallenges(prev => [...prev, challenge.id]);
      setCircuitScore(prev => prev + 300);
      omniPlayLearnService.unlockAchievement('ach_logic_architect');
      if (onComplete) onComplete(circuitScore + 300);
    }
  };

  return (
    <div id="omni-logic-circuit-game" className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-6 max-w-3xl mx-auto shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Studio</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800">
            XP: {circuitScore}
          </span>
          <span className="text-xs text-stone-400">
            Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
          </span>
        </div>
      </div>

      {/* Challenge Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>{challenge.name}</span>
        </div>
        <p className="text-xs text-stone-300">
          {challenge.description}
        </p>
      </div>

      {/* Live Interactive Circuit Board Canvas */}
      <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 relative overflow-hidden shadow-inner">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Inputs Column */}
          <div className="space-y-4">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Inputs</span>
            
            <div className="space-y-3">
              {/* Input A */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setInputA(!inputA)}
                  className={`w-12 h-10 rounded-xl font-mono font-bold text-xs flex items-center justify-center transition-all ${
                    inputA
                      ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/30'
                      : 'bg-stone-900 text-stone-400 border border-stone-700'
                  }`}
                >
                  A: {inputA ? '1' : '0'}
                </button>
                <div className={`h-1 w-12 rounded ${inputA ? 'bg-amber-500 animate-pulse' : 'bg-stone-800'}`} />
              </div>

              {/* Input B */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setInputB(!inputB)}
                  className={`w-12 h-10 rounded-xl font-mono font-bold text-xs flex items-center justify-center transition-all ${
                    inputB
                      ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/30'
                      : 'bg-stone-900 text-stone-400 border border-stone-700'
                  }`}
                >
                  B: {inputB ? '1' : '0'}
                </button>
                <div className={`h-1 w-12 rounded ${inputB ? 'bg-amber-500 animate-pulse' : 'bg-stone-800'}`} />
              </div>
            </div>
          </div>

          {/* Gate Selection Slot */}
          <div className="flex flex-col items-center space-y-2">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Active Silicon Gate</span>
            <div className="p-4 rounded-2xl bg-indigo-950/70 border-2 border-indigo-500 text-center min-w-[120px] shadow-xl">
              <Zap className="w-6 h-6 text-indigo-400 mx-auto mb-1" />
              <span className="text-base font-extrabold text-white font-mono">{selectedGate}</span>
            </div>
          </div>

          {/* Output Signal */}
          <div className="space-y-4 text-center md:text-left">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Output Signal (Q)</span>
            <div className="flex items-center gap-3">
              <div className={`h-1 w-12 rounded ${currentOutput ? 'bg-emerald-400 animate-pulse' : 'bg-stone-800'}`} />
              <div
                className={`w-14 h-12 rounded-xl font-mono font-extrabold text-sm flex items-center justify-center shadow-lg ${
                  currentOutput
                    ? 'bg-emerald-500 text-stone-950 shadow-emerald-500/40'
                    : 'bg-stone-900 text-stone-500 border border-stone-800'
                }`}
              >
                Q: {currentOutput ? '1 (HIGH)' : '0 (LOW)'}
              </div>
            </div>
          </div>
        </div>

        {/* Gate Selection Buttons Bar */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex flex-wrap justify-center gap-2">
          {(['AND', 'OR', 'XOR', 'NAND', 'NOR', 'NOT'] as GateType[]).map((gate) => (
            <button
              key={gate}
              onClick={() => setSelectedGate(gate)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                selectedGate === gate
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {gate}
            </button>
          ))}
        </div>
      </div>

      {/* Truth Table Verification */}
      <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-stone-300">Truth Table Verification</span>
          <span className="font-mono text-stone-400">Target Spec Alignment</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-xs font-mono text-center">
          <div className="p-2 rounded-lg bg-stone-900 text-stone-400 font-bold">Input A</div>
          <div className="p-2 rounded-lg bg-stone-900 text-stone-400 font-bold">Input B</div>
          <div className="p-2 rounded-lg bg-stone-900 text-stone-400 font-bold">Expected</div>
          <div className="p-2 rounded-lg bg-stone-900 text-stone-400 font-bold">Your Circuit</div>

          {truthTableResults.map((r, idx) => (
            <React.Fragment key={idx}>
              <div className="p-2 rounded-lg bg-stone-900/50 text-stone-300">{r.a ? '1' : '0'}</div>
              <div className="p-2 rounded-lg bg-stone-900/50 text-stone-300">{r.b ? '1' : '0'}</div>
              <div className="p-2 rounded-lg bg-stone-900/50 text-stone-300 font-bold">{r.expected ? '1' : '0'}</div>
              <div
                className={`p-2 rounded-lg font-bold flex items-center justify-center gap-1 ${
                  r.passed ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}
              >
                <span>{r.actual ? '1' : '0'}</span>
                {r.passed ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <AlertTriangle className="w-3 h-3 text-rose-400" />}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Success Action Banner */}
      {allPassed && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-center space-y-2 shadow-2xl">
          <div className="font-extrabold text-sm text-white flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Circuit Validated! Truth Table 100% Satisfied.</span>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleValidate}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
            >
              Claim XP (+300)
            </button>
            {currentChallengeIdx < CHALLENGES.length - 1 && (
              <button
                onClick={() => setCurrentChallengeIdx(prev => prev + 1)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
              >
                Next Challenge →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
