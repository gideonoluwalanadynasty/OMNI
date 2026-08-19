import { useState } from 'react';
import { Shield, Sparkles, Server, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingFlowProps {
  fullName: string;
  onComplete: (orgName: string, plan: 'free' | 'growth' | 'enterprise') => void;
}

export function OnboardingFlow({ fullName, onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [orgName, setOrgName] = useState('');
  const [plan, setPlan] = useState<'free' | 'growth' | 'enterprise'>('growth');

  const handleNext = () => {
    if (step === 1 && !orgName.trim()) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    onComplete(orgName, plan);
  };

  const planCredits = {
    free: 100,
    growth: 15000,
    enterprise: 250000,
  };

  const subdomainCalculated = orgName
    ? orgName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') + '.omni.io'
    : 'your-tenant.omni.io';

  return (
    <div id="omni-onboarding-root" className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
        
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-8 font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
          <span className={step >= 1 ? 'text-neutral-900 font-bold' : ''}>1. Context Mapping</span>
          <span>/</span>
          <span className={step >= 2 ? 'text-neutral-900 font-bold' : ''}>2. Financial Ledger</span>
          <span>/</span>
          <span className={step >= 3 ? 'text-neutral-900 font-bold' : ''}>3. Provisioning</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Welcome, {fullName}. Let's create your tenant bounds.
                </h2>
                <p className="text-xs text-neutral-500 mt-2">
                  OMNI isolates tenant data completely using dynamic database boundaries. Define your root organization.
                </p>
              </div>

              <div className="flex flex-col gap-5 mt-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    Organization / Tenant Name
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Oluwalana Innovations"
                    className="w-full px-4 py-3 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-900 rounded-xl text-sm transition-colors outline-none text-neutral-900 font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    OMNI Routing Subdomain
                  </label>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-600 flex justify-between items-center">
                    <span>{subdomainCalculated}</span>
                    <span className="text-[9px] text-emerald-600 uppercase font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      Available on Mesh
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8 pt-4 border-t border-neutral-100">
                <button
                  onClick={handleNext}
                  disabled={!orgName.trim()}
                  className="bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-200 text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Select Billing Tier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Select OMNI Sovereign Plan & Ledger Credits
                </h2>
                <p className="text-xs text-neutral-500 mt-2">
                  Every organization starts with an isolated Ledger Wallet loaded with demo credits to test cross-border settlement.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setPlan('free')}
                  className={`p-5 rounded-2xl border text-left flex flex-col gap-3 transition-all ${
                    plan === 'free'
                      ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Sandbox Trial</span>
                  <span className="text-xl font-bold text-neutral-950">$100</span>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-normal">
                    Standard limits. For testing isolated API endpoints only.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPlan('growth')}
                  className={`p-5 rounded-2xl border text-left flex flex-col gap-3 transition-all ${
                    plan === 'growth'
                      ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 font-semibold">Growth Network</span>
                  <span className="text-xl font-bold text-neutral-950">$15,000</span>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-normal">
                    Expands API limits, supports webhooks, dynamic apps registration.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPlan('enterprise')}
                  className={`p-5 rounded-2xl border text-left flex flex-col gap-3 transition-all ${
                    plan === 'enterprise'
                      ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 font-semibold">Enterprise Core</span>
                  <span className="text-xl font-bold text-neutral-950">$250,000</span>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-normal">
                    Full capabilities, Spanner nodes setup, custom SLAs, white-label configs.
                  </p>
                </button>
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-neutral-100">
                <button
                  onClick={handleBack}
                  className="border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleNext}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Verify Topology</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="text-center py-4 flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Tenant Validated. Ready to Spin.
                </h2>
                <p className="text-xs text-neutral-500 mt-2 max-w-md mx-auto">
                  OMNI is ready to initialize organization keys and deploy your Genesis Ledger context.
                </p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 flex flex-col gap-4 font-mono text-xs text-neutral-600">
                <div className="flex justify-between pb-2 border-b border-neutral-200/50">
                  <span>Tenant Org:</span>
                  <span className="font-semibold text-neutral-900">{orgName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-neutral-200/50">
                  <span>Core DNS:</span>
                  <span className="font-semibold text-neutral-900">{subdomainCalculated}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-neutral-200/50">
                  <span>License Tier:</span>
                  <span className="font-semibold text-neutral-900 uppercase">{plan}</span>
                </div>
                <div className="flex justify-between">
                  <span>Wallet Balance:</span>
                  <span className="font-semibold text-emerald-600">${planCredits[plan].toLocaleString()} USD</span>
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-neutral-100">
                <button
                  onClick={handleBack}
                  className="border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Server className="w-4 h-4" />
                  <span>Provision Sandbox</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
