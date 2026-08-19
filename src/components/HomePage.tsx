import { Shield, Cpu, RefreshCw, Layers, ArrowRight, Zap, ChevronRight, Globe, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  onLogin: () => void;
  onSignup: () => void;
  onDemo: () => void;
}

export function HomePage({ onLogin, onSignup, onDemo }: HomePageProps) {
  return (
    <div id="omni-homepage-root" className="min-h-screen bg-[#fafafa] text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans flex flex-col justify-between">
      {/* Premium Header Header */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center font-bold text-white text-base tracking-tighter">
            O
          </div>
          <span className="font-semibold tracking-wider text-sm uppercase text-neutral-900">OMNI</span>
        </div>
        <nav className="flex items-center gap-6">
          <button
            onClick={onLogin}
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={onSignup}
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-5 rounded-lg transition-all shadow-sm"
          >
            Create Identity
          </button>
        </nav>
      </header>

      {/* Main Hero Container */}
      <main className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-6 py-12">
        <div className="text-center md:text-left md:grid md:grid-cols-12 md:gap-12 items-center">
          <div className="md:col-span-7 flex flex-col gap-6">
            {/* Tagline */}
            <div className="inline-flex self-center md:self-start items-center gap-1.5 bg-neutral-200/60 dark:bg-neutral-200 px-3 py-1 rounded-full text-[11px] font-semibold text-neutral-700 tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 text-neutral-950" />
              <span>Omni Foundation OS v1.0</span>
            </div>

            {/* Main Typographical Statement */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 leading-[1.1]">
              The Global Digital <br />
              <span className="text-neutral-500">Operating System.</span>
            </h1>

            <p className="text-neutral-600 text-base md:text-lg max-w-xl font-normal leading-relaxed">
              One identity. One multi-tenant organization index. One distributed ledger wallet. One security layer. Interoperating flawlessly across dozens of registered business applications.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-2">
              <button
                onClick={onDemo}
                className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold py-3.5 px-7 rounded-xl flex items-center justify-center gap-2 group transition-all"
              >
                <span>Launch Operational Shell</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onSignup}
                className="w-full sm:w-auto border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-sm font-semibold py-3.5 px-7 rounded-xl transition-colors"
              >
                Register Tenant Portal
              </button>
            </div>
          </div>

          {/* Interactive Core Architectural Blueprint Card */}
          <div className="mt-12 md:mt-0 md:col-span-5 relative">
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">ledger.active</span>
                </div>
                <Globe className="w-4 h-4 text-neutral-400" />
              </div>

              {/* Simulated Nodes/Applications grid */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-200/50">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-neutral-800" />
                    <span className="text-xs font-semibold tracking-wide">OMNI Auth Keyring</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">MFA Active</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-200/50">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-neutral-800" />
                    <span className="text-xs font-semibold tracking-wide">AI Command Matrix</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 bg-neutral-200/50 px-2 py-0.5 rounded">v1.0.8</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-200/50">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-4 h-4 text-neutral-800" />
                    <span className="text-xs font-semibold tracking-wide">Ledger Core balance</span>
                  </div>
                  <span className="text-xs font-bold font-mono">$4,280,550</span>
                </div>
              </div>

              {/* Decorative dotted overlay */}
              <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>TX: COMPLETED</span>
                <span>REGISTRY: MULTI-TENANT</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Structured Core Features Banner */}
      <section className="bg-white border-t border-neutral-200 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-2">
              <Lock className="w-5 h-5 text-neutral-800" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">Unified Trust Identity</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Verify credentials across domains instantly. Built with built-in login throttling, audit trails, and multi-factor authorization.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-2">
              <RefreshCw className="w-5 h-5 text-neutral-800" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">Decentralized Financial Ledgers</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              A single balance index powering transactional flows in any native application context. Absolute reconciliation and real-time ledger accounting.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-2">
              <Layers className="w-5 h-5 text-neutral-800" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">Dynamic App Platform</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              A robust runtime where applications are registered and bound on-the-fly. Subdomains are synchronized and isolated for secure multi-tenancy.
            </p>
          </div>
        </div>
      </section>

      {/* Sophisticated Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50 py-6 text-center text-xs text-neutral-400 font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 OMNI Core Foundation. Distributed Node Network.</span>
          <div className="flex gap-4">
            <span className="hover:text-neutral-600 cursor-pointer">Security Protocol</span>
            <span>·</span>
            <span className="hover:text-neutral-600 cursor-pointer">Cluster Status: 100% Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
