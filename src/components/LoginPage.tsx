import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginPageProps {
  onLogin: (email: string) => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [email, setEmail] = useState('gideonoluwalanadynasty@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLogs([
      'Initiating OMNI identity handshake...',
      `Validating tenant credential mapping for ${email}...`,
      'Hashing passphrase credentials using Argon2id with salt overhead...',
      'Validating SHA256 multi-tenant token integrity...',
      'Synchronizing encrypted session credentials on cluster nodes...',
      'Access token issued. Handing off session keys...'
    ]);

    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx >= 5) {
        clearInterval(interval);
        onLogin(email);
        setLoading(false);
      }
      logIdx++;
    }, 200);
  };

  return (
    <div id="omni-login-root" className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portal</span>
        </button>

        <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center font-bold text-white tracking-tighter text-lg self-start">
              O
            </div>
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 mt-2">Sign in to OMNI Platform</h2>
            <p className="text-xs text-neutral-500 font-normal">
              Enter your universal developer/tenant credentials to access organizations.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Universal Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gideonoluwalanadynasty@gmail.com"
                  className="w-full pl-11 pr-4 py-3 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-900 rounded-xl text-sm transition-colors outline-none text-neutral-900 font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Secure Passphrase</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-900 rounded-xl text-sm transition-colors outline-none text-neutral-900 font-medium"
                />
              </div>
            </div>

            {loading ? (
              <div className="bg-neutral-950 text-emerald-400 p-4 rounded-xl font-mono text-[10px] flex flex-col gap-1 border border-neutral-800">
                <div className="flex items-center gap-2 mb-1 border-b border-neutral-800 pb-1 text-neutral-400">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>SESSION_NEGOTIATION_STREAM</span>
                </div>
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-neutral-600">[{i+1}]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Authorize Keyring</span>
              </button>
            )}
          </form>

          {/* Micro Security Banner */}
          <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center gap-3 text-[11px] text-neutral-400 leading-relaxed font-mono">
            <span className="text-emerald-500 font-bold">● CSRF SECURE</span>
            <span>·</span>
            <span>IP: 184.22.115.9 (EU-London)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
