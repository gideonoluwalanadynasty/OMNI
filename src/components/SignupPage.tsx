import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface SignupPageProps {
  onSignup: (name: string, email: string) => void;
  onBack: () => void;
}

export function SignupPage({ onSignup, onBack }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    onSignup(name, email);
  };

  return (
    <div id="omni-signup-root" className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 font-sans">
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
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 mt-2">Create OMNI Sovereign Identity</h2>
            <p className="text-xs text-neutral-500 font-normal">
              Register your sovereign credentials. This registers you on the OMNI directory.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Gideon Oluwalana"
                  className="w-full pl-11 pr-4 py-3 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-900 rounded-xl text-sm transition-colors outline-none text-neutral-900 font-medium"
                />
              </div>
            </div>

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
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-900 rounded-xl text-sm transition-colors outline-none text-neutral-900 font-medium"
                />
              </div>
              <p className="text-[10px] text-neutral-400 font-mono mt-1">
                Recommendation: Use 12+ characters with symbols. Argon2id salt will be appended.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm mt-2"
            >
              <span>Initialize Identity Handshake</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-100 text-[11px] text-neutral-400 font-mono flex items-center justify-between">
            <span>NETWORK: SECURE CORRIDOR</span>
            <span>AA+ TRUST VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
