import React, { useState } from 'react';
import {
  Compass,
  GitFork,
  CheckCircle2,
  Clock,
  Play,
  Users,
  Send,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Mail,
  MessageSquare,
  Gift,
  Plus
} from 'lucide-react';
import { Customer360Profile } from '../../../types/omni_crm';

interface JourneyStep {
  id: string;
  stepNumber: number;
  delayLabel: string;
  channel: 'OMNI Chat' | 'Email' | 'Special Token Grant' | 'Rep Follow-up';
  title: string;
  description: string;
  openRate: string;
  conversionRate: string;
}

interface JourneySequence {
  id: string;
  name: string;
  description: string;
  targetAudience: string;
  enrolledCount: number;
  completedCount: number;
  conversionPct: number;
  status: 'active' | 'draft' | 'paused';
  steps: JourneyStep[];
}

const INITIAL_JOURNEYS: JourneySequence[] = [
  {
    id: 'j-1',
    name: 'Institutional Enterprise Onboarding',
    description: 'Guiding enterprise quantum & technology clients through credential provisioning and key management.',
    targetAudience: 'Enterprise Tier Customers',
    enrolledCount: 142,
    completedCount: 128,
    conversionPct: 90.1,
    status: 'active',
    steps: [
      {
        id: 's-1',
        stepNumber: 1,
        delayLabel: 'Day 0 (Immediate)',
        channel: 'OMNI Chat',
        title: 'Executive Welcome & Sovereign Passport Key Delivery',
        description: 'Instant encrypted welcome packet with credential keys and designated account manager.',
        openRate: '98.5%',
        conversionRate: '95.0%'
      },
      {
        id: 's-2',
        stepNumber: 2,
        delayLabel: 'Day 2 (+48h)',
        channel: 'OMNI Chat',
        title: 'Quantum Hardware Integration & API Masterclass Access',
        description: 'Auto-enrollment into private developer masterclasses and lab documentation.',
        openRate: '92.0%',
        conversionRate: '88.4%'
      },
      {
        id: 's-3',
        stepNumber: 3,
        delayLabel: 'Day 5 (+5d)',
        channel: 'Rep Follow-up',
        title: 'Dedicated Solutions Architect Architecture Review Call',
        description: 'Automated task creation for Alexander Hayes to host WebRTC infrastructure check-in.',
        openRate: '100%',
        conversionRate: '94.2%'
      }
    ]
  },
  {
    id: 'j-2',
    name: 'Masterclass Graduate to Enterprise Accelerator',
    description: 'Nurturing student alumni into professional software licensing and corporate deployments.',
    targetAudience: 'Course Graduates (Score > 85)',
    enrolledCount: 380,
    completedCount: 290,
    conversionPct: 76.3,
    status: 'active',
    steps: [
      {
        id: 's-4',
        stepNumber: 1,
        delayLabel: 'Day 0 (On Completion)',
        channel: 'Special Token Grant',
        title: 'Issuance of On-Chain Completion Credential & 100 REWARD Tokens',
        description: 'Verifiable SBT credential minted to user passport with reward tokens for commerce store.',
        openRate: '100%',
        conversionRate: '99.0%'
      },
      {
        id: 's-5',
        stepNumber: 2,
        delayLabel: 'Day 3 (+72h)',
        channel: 'OMNI Chat',
        title: 'Exclusive Invitation to Enterprise Lab Residency',
        description: 'Targeted invitation to commercial SDK sandbox with 30-day enterprise trial.',
        openRate: '84.2%',
        conversionRate: '68.0%'
      }
    ]
  },
  {
    id: 'j-3',
    name: 'Cart Abandonment & Commercial Recovery Sequence',
    description: 'Multi-touch conversational recovery for customers who left items in marketplace checkout.',
    targetAudience: 'Abandoned Cart Prospects',
    enrolledCount: 520,
    completedCount: 460,
    conversionPct: 42.8,
    status: 'active',
    steps: [
      {
        id: 's-6',
        stepNumber: 1,
        delayLabel: '2 Hours Post-Abandon',
        channel: 'OMNI Chat',
        title: 'Friendly In-Chat Cart Reminder & Assistance Offer',
        description: 'Chat assistant asks if the user needs answers to product specifications or payment rails.',
        openRate: '88.9%',
        conversionRate: '28.5%'
      },
      {
        id: 's-7',
        stepNumber: 2,
        delayLabel: '24 Hours Post-Abandon',
        channel: 'OMNI Chat',
        title: 'Limited-Time 10% Sovereign Pay Voucher',
        description: 'Applies automated discount code valid for 12 hours via OMNI Pay wallet.',
        openRate: '79.3%',
        conversionRate: '34.2%'
      }
    ]
  }
];

interface Props {
  profiles: Customer360Profile[];
}

export const OmniCustomerJourneysView: React.FC<Props> = ({ profiles }) => {
  const [journeys, setJourneys] = useState<JourneySequence[]>(INITIAL_JOURNEYS);
  const [selectedJourneyId, setSelectedJourneyId] = useState<string>(INITIAL_JOURNEYS[0].id);
  const [enrolledNotice, setEnrolledNotice] = useState<string | null>(null);

  const selectedJourney = journeys.find(j => j.id === selectedJourneyId) || journeys[0];

  const handleEnrollAll = () => {
    setEnrolledNotice(`✓ Enrolled ${profiles.length} qualified CRM contacts into "${selectedJourney.name}". Automated sequences initiated.`);
    setTimeout(() => setEnrolledNotice(null), 4000);
  };

  return (
    <div id="omni-customer-journeys-view" className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-indigo-400" />
                CUSTOMER LIFECYCLE JOURNEYS
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Automated Marketing & Lifecycle Sequences
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Design timed multi-step conversational journeys that onboard new institutional clients, re-engage cold leads, and recover abandoned carts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleEnrollAll}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Enroll Matching Contacts ({profiles.length})</span>
            </button>
          </div>
        </div>
      </div>

      {enrolledNotice && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs rounded-xl flex items-center gap-2 animate-fade-in shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{enrolledNotice}</span>
        </div>
      )}

      {/* Main Journeys Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Journey Selectors */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Active Lifecycle Sequences
          </h3>

          <div className="space-y-3">
            {journeys.map(j => {
              const isSelected = selectedJourney.id === j.id;

              return (
                <div
                  key={j.id}
                  onClick={() => setSelectedJourneyId(j.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/60 shadow-lg'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-xs font-bold text-white">{j.name}</h4>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 text-[9px] font-bold rounded-full border border-emerald-500/30">
                      ACTIVE
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400">{j.description}</p>

                  <div className="grid grid-cols-3 gap-2 p-2 bg-slate-950/60 rounded-xl text-center text-[10px]">
                    <div>
                      <span className="text-slate-500 block">Enrolled</span>
                      <span className="font-bold text-white font-mono">{j.enrolledCount}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Steps</span>
                      <span className="font-bold text-indigo-400 font-mono">{j.steps.length}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Conversion</span>
                      <span className="font-bold text-emerald-400 font-mono">{j.conversionPct}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Step-by-Step Timeline Visualization */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GitFork className="w-4 h-4 text-indigo-400" />
                {selectedJourney.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Target: <strong className="text-indigo-300">{selectedJourney.targetAudience}</strong></p>
            </div>
            <span className="text-xs text-emerald-400 font-bold font-mono">
              {selectedJourney.conversionPct}% Avg Conversion
            </span>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-4">
            {selectedJourney.steps.map((step, idx) => (
              <div key={step.id} className="relative pl-8 border-l-2 border-indigo-500/40 pb-4 last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-2 border-slate-900 flex items-center justify-center text-[9px] text-white font-bold">
                  {step.stepNumber}
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-400 font-mono">
                      {step.delayLabel} • {step.channel}
                    </span>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-slate-400">Open: <strong className="text-white font-mono">{step.openRate}</strong></span>
                      <span className="text-slate-400">Conv: <strong className="text-emerald-400 font-mono">{step.conversionRate}</strong></span>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-white">{step.title}</h4>
                  <p className="text-[11px] text-slate-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
