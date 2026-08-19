import React from 'react';
import {
  X,
  Award,
  ShieldCheck,
  Flame,
  BookOpen,
  Cpu,
  WifiOff,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { omniPlayLearnService } from '../../../sdk/browser-services/OmniPlayLearnService';

interface OmniAchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OmniAchievementsModal: React.FC<OmniAchievementsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const achievements = omniPlayLearnService.getAchievements();
  const totalXp = omniPlayLearnService.getUserTotalXp();
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return BookOpen;
      case 'ShieldCheck': return ShieldCheck;
      case 'Cpu': return Cpu;
      case 'WifiOff': return WifiOff;
      case 'Flame': return Flame;
      default: return Award;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] bg-stone-950 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950/60 via-stone-900 to-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <span>Sovereign Achievements & Cryptographic Badges</span>
              </h3>
              <p className="text-xs text-stone-400">
                Verifiable cryptographic proofs for learning milestones & puzzle masteries
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

        {/* Total XP & Progress Banner */}
        <div className="p-5 bg-stone-900/60 border-b border-stone-800 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="text-xs text-stone-400">Total Sovereign Experience</div>
            <div className="text-2xl font-extrabold text-amber-400 font-mono">{totalXp.toLocaleString()} XP</div>
          </div>

          <div className="text-right space-y-0.5">
            <div className="text-xs text-stone-400">Unlocked Milestones</div>
            <div className="text-base font-bold text-stone-100">
              {unlockedCount} of {achievements.length} Badges
            </div>
          </div>
        </div>

        {/* Achievements List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {achievements.map((ach) => {
            const Icon = getIcon(ach.icon);

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  ach.unlocked
                    ? 'bg-stone-900 border-amber-500/50 shadow-md'
                    : 'bg-stone-950/60 border-stone-800/80 opacity-70'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                      ach.unlocked
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-stone-900 text-stone-600 border-stone-800'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-stone-100 truncate">{ach.title}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-stone-950 text-amber-400 border border-stone-800 text-[10px] font-mono font-semibold">
                        +{ach.xp} XP
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed">{ach.description}</p>
                    {ach.cryptographicProofHash && (
                      <div className="text-[10px] font-mono text-emerald-400">
                        Proof Hash: {ach.cryptographicProofHash}
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  {ach.unlocked ? (
                    <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Unlocked</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
                      <Lock className="w-4 h-4" />
                      <span>{ach.progressPercent}%</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 text-xs text-stone-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Cryptographically signed & verifiable via OMNI Passport</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
