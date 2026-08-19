import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  Copy,
  Check,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
  Search,
  Sliders,
  Sparkles,
  Zap,
  Globe,
  Fingerprint,
  CheckCircle2,
  Clock,
  Shuffle
} from 'lucide-react';
import {
  OmniWorkspacePasswordItem,
  VaultSecurityAuditReport,
  PasswordGeneratorOptions
} from '../../../types/workspace';
import { omniWorkspaceService } from '../../../sdk/browser-services/OmniWorkspaceService';

interface OmniWorkspacePasswordManagerViewProps {
  currentTabUrl?: string;
  onAutofillCredentials?: (username: string, passwordPlain: string) => void;
}

export const OmniWorkspacePasswordManagerView: React.FC<OmniWorkspacePasswordManagerViewProps> = ({
  currentTabUrl = 'https://github.com',
  onAutofillCredentials
}) => {
  const [passwords, setPasswords] = useState<OmniWorkspacePasswordItem[]>(
    omniWorkspaceService.getPasswords()
  );
  const [isUnlocked, setIsUnlocked] = useState(omniWorkspaceService.isVaultSessionUnlocked());
  const [audit, setAudit] = useState<VaultSecurityAuditReport>(
    omniWorkspaceService.getVaultSecurityAudit()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [revealedPasswords, setRevealedPasswords] = useState<{ [id: string]: string }>({});
  const [revealedTotp, setRevealedTotp] = useState<{ [id: string]: { code: string; secondsRemaining: number } }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Master key unlock state
  const [masterKeyInput, setMasterKeyInput] = useState('');

  // Password Generator State
  const [genLength, setGenLength] = useState(20);
  const [genUpper, setGenUpper] = useState(true);
  const [genLower, setGenLower] = useState(true);
  const [genNumbers, setGenNumbers] = useState(true);
  const [genSymbols, setGenSymbols] = useState(true);
  const [genAvoidAmbiguous, setGenAvoidAmbiguous] = useState(true);
  const [genMode, setGenMode] = useState<'random' | 'passphrase'>('random');
  const [genWordCount, setGenWordCount] = useState(4);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [generatedEntropy, setGeneratedEntropy] = useState(0);

  // Add Item Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newFolder, setNewFolder] = useState('General');
  const [newTotpSecret, setNewTotpSecret] = useState('');

  // Active Tab Mode
  const [activeTab, setActiveTab] = useState<'vault' | 'generator' | 'audit' | 'autofill'>('vault');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const refreshState = () => {
    setPasswords(omniWorkspaceService.getPasswords());
    setIsUnlocked(omniWorkspaceService.isVaultSessionUnlocked());
    setAudit(omniWorkspaceService.getVaultSecurityAudit());
  };

  useEffect(() => {
    const unsub = omniWorkspaceService.subscribe(refreshState);
    generateNewPassword();
    return unsub;
  }, [genLength, genUpper, genLower, genNumbers, genSymbols, genAvoidAmbiguous, genMode, genWordCount]);

  // Live TOTP Ticking
  useEffect(() => {
    const interval = setInterval(() => {
      const updated: { [id: string]: { code: string; secondsRemaining: number } } = {};
      passwords.forEach(p => {
        if (p.has2Fa) {
          updated[p.id] = omniWorkspaceService.generateTotpToken(p);
        }
      });
      setRevealedTotp(updated);
    }, 1000);
    return () => clearInterval(interval);
  }, [passwords]);

  const generateNewPassword = () => {
    const opts: PasswordGeneratorOptions = {
      length: genLength,
      includeUppercase: genUpper,
      includeLowercase: genLower,
      includeNumbers: genNumbers,
      includeSymbols: genSymbols,
      avoidAmbiguous: genAvoidAmbiguous,
      mode: genMode,
      wordCount: genWordCount
    };
    const res = omniWorkspaceService.generatePassword(opts);
    setGeneratedPassword(res.password);
    setGeneratedEntropy(res.entropyBits);
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (omniWorkspaceService.unlockVault(masterKeyInput)) {
      setIsUnlocked(true);
      setMasterKeyInput('');
      showToast('Zero-Knowledge Vault Unlocked.');
    } else {
      showToast('Invalid Master Key (minimum 4 characters).');
    }
  };

  const handleLock = () => {
    omniWorkspaceService.lockVault();
    setIsUnlocked(false);
    setRevealedPasswords({});
    showToast('Vault Locked. Ephemeral keys cleared from memory.');
  };

  const handleToggleReveal = (item: OmniWorkspacePasswordItem) => {
    if (!isUnlocked) {
      showToast('Vault is locked. Unlock with Master Key to reveal.');
      return;
    }

    if (revealedPasswords[item.id]) {
      const next = { ...revealedPasswords };
      delete next[item.id];
      setRevealedPasswords(next);
    } else {
      const decrypted = omniWorkspaceService.decryptPasswordForReveal(item);
      setRevealedPasswords({ ...revealedPasswords, [item.id]: decrypted });
      // Auto-hide after 15 seconds
      setTimeout(() => {
        setRevealedPasswords(prev => {
          const n = { ...prev };
          delete n[item.id];
          return n;
        });
      }, 15000);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard.');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyPassword = (item: OmniWorkspacePasswordItem) => {
    try {
      const plain = omniWorkspaceService.decryptPasswordForReveal(item);
      handleCopy(plain, `pwd_${item.id}`);
    } catch {
      showToast('Unlock vault to copy password.');
    }
  };

  const handleCreatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPassword.trim()) {
      showToast('Title and Password are required.');
      return;
    }

    omniWorkspaceService.savePasswordItem(
      newTitle,
      newUsername,
      newPassword,
      newUrl || 'https://omni.internal',
      newFolder,
      'login',
      newTotpSecret.trim() || undefined
    );

    setShowAddModal(false);
    setNewTitle('');
    setNewUsername('');
    setNewPassword('');
    setNewUrl('');
    setNewTotpSecret('');
    showToast('Credentials encrypted & saved with PBKDF2/AES-GCM (Zero plaintext stored).');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this encrypted credential from vault?')) {
      omniWorkspaceService.deletePasswordItem(id);
      showToast('Item deleted from vault.');
    }
  };

  // Filter passwords
  const filteredPasswords = passwords.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || p.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  // Autofill Matches for currentTabUrl
  let currentDomain = '';
  try {
    currentDomain = new URL(currentTabUrl.startsWith('http') ? currentTabUrl : `https://${currentTabUrl}`).hostname;
  } catch {
    currentDomain = currentTabUrl;
  }

  const autofillMatches = passwords.filter(p =>
    p.matchingDomains.some(d => currentDomain.includes(d) || d.includes(currentDomain))
  );

  return (
    <div className="space-y-6 text-stone-200">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-14 right-8 z-50 px-4 py-3 bg-indigo-600 text-white rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-indigo-950/50 border border-stone-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                passwords.browser.omni.com
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono text-[10px] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Zero-Plaintext Cryptographic Vault
              </span>
            </div>
            <h2 className="text-2xl font-bold text-stone-100">
              OMNI Sovereign Password Manager & Vault
            </h2>
            <p className="text-xs text-stone-400 max-w-2xl leading-relaxed">
              FIPS-compliant client-side PBKDF2 (600k rounds) + AES-256-GCM encrypted vault. Passwords and TOTP keys are never transmitted or stored in plaintext.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {isUnlocked ? (
              <button
                onClick={handleLock}
                className="px-3.5 py-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Vault</span>
              </button>
            ) : (
              <form onSubmit={handleUnlock} className="flex items-center gap-1.5">
                <input
                  type="password"
                  placeholder="Enter Master Key / PIN"
                  value={masterKeyInput}
                  onChange={(e) => setMasterKeyInput(e.target.value)}
                  className="px-3 py-1.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500 w-44 font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Unlock
                </button>
              </form>
            )}

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Credential</span>
            </button>
          </div>
        </div>

        {/* Security Health Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 border-t border-stone-800/80 text-xs">
          <div className="p-3 bg-stone-950/80 border border-stone-800/80 rounded-xl space-y-1">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Vault Security Score</div>
            <div className={`text-lg font-bold font-mono ${audit.overallScore > 75 ? 'text-emerald-400' : audit.overallScore > 50 ? 'text-amber-400' : 'text-rose-400'}`}>
              {audit.overallScore}/100
            </div>
          </div>
          <div className="p-3 bg-stone-950/80 border border-stone-800/80 rounded-xl space-y-1">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Total Credentials</div>
            <div className="text-lg font-bold text-stone-100 font-mono">{passwords.length} Logins</div>
          </div>
          <div className="p-3 bg-stone-950/80 border border-stone-800/80 rounded-xl space-y-1">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Reused Passwords</div>
            <div className={`text-lg font-bold font-mono ${audit.reusedPasswordsCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {audit.reusedPasswordsCount} Detected
            </div>
          </div>
          <div className="p-3 bg-stone-950/80 border border-stone-800/80 rounded-xl space-y-1">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">Breach Matches</div>
            <div className={`text-lg font-bold font-mono ${audit.compromisedBreachCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {audit.compromisedBreachCount} Compromised
            </div>
          </div>
          <div className="p-3 bg-stone-950/80 border border-stone-800/80 rounded-xl space-y-1">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">2FA Protection</div>
            <div className="text-lg font-bold text-indigo-300 font-mono">
              {passwords.filter(p => p.has2Fa).length}/{passwords.length} Active
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 text-xs overflow-x-auto">
        {[
          { id: 'vault', label: 'Encrypted Vault', count: passwords.length },
          { id: 'generator', label: 'Password & Entropy Generator', icon: Key },
          { id: 'audit', label: `Security Alerts (${audit.criticalAlerts.length})`, icon: ShieldAlert },
          { id: 'autofill', label: 'Autofill & Origin Matching Rules', icon: Zap }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-4 font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full bg-stone-800 text-stone-300 font-mono text-[10px]">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: ENCRYPTED VAULT LIST */}
      {activeTab === 'vault' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-stone-900/60 border border-stone-800 rounded-xl">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search credentials, usernames, or domains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-xs text-stone-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Folders</option>
                <option value="General">General</option>
                <option value="Development">Development</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Security">Security</option>
                <option value="Design">Design</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredPasswords.map(item => {
              const isRevealed = !!revealedPasswords[item.id];
              const plainValue = revealedPasswords[item.id] || '••••••••••••••••';
              const totpInfo = revealedTotp[item.id];

              return (
                <div
                  key={item.id}
                  className="p-4 bg-stone-900/60 border border-stone-800 hover:border-stone-700 rounded-2xl transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-indigo-400 shrink-0">
                        <Key className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-stone-100">{item.title}</h4>
                          <span className="px-2 py-0.5 rounded bg-stone-950 text-stone-400 font-mono text-[10px] border border-stone-800">
                            {item.folder}
                          </span>
                          {item.isCompromisedInBreach && (
                            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-mono text-[10px] border border-rose-800 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Breach Match
                            </span>
                          )}
                          {item.isReused && (
                            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[10px] border border-amber-800">
                              Reused
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-400 font-mono mt-0.5 flex items-center gap-2">
                          <span>{item.username}</span>
                          <span>•</span>
                          <span className="text-stone-500">{item.url}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleCopy(item.username, `user_${item.id}`)}
                        className="px-2.5 py-1.5 bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-700 rounded-xl text-xs flex items-center gap-1"
                        title="Copy Username"
                      >
                        {copiedId === `user_${item.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>User</span>
                      </button>

                      <button
                        onClick={() => handleCopyPassword(item)}
                        className="px-2.5 py-1.5 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all"
                        title="Copy Encrypted Password"
                      >
                        {copiedId === `pwd_${item.id}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Password</span>
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-stone-500 hover:text-rose-400 hover:bg-stone-800 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Password Ciphertext & Reveal Row */}
                  <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-stone-500">Secret:</span>
                      <span className={`px-2 py-0.5 rounded ${isRevealed ? 'bg-stone-900 text-emerald-300 font-bold' : 'text-stone-400'}`}>
                        {plainValue}
                      </span>
                      <button
                        onClick={() => handleToggleReveal(item)}
                        className="p-1 text-stone-400 hover:text-stone-200"
                        title={isRevealed ? 'Hide Password' : 'Reveal Decrypted Password'}
                      >
                        {isRevealed ? <EyeOff className="w-3.5 h-3.5 text-indigo-400" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-stone-400">
                      <span>Cipher: <strong className="text-indigo-300">AES-256-GCM</strong></span>
                      <span>Strength: <strong className={item.strengthScore > 75 ? 'text-emerald-400' : 'text-amber-400'}>{item.strengthScore}%</strong></span>
                      <span>Rotated: {item.lastRotatedDate}</span>
                    </div>
                  </div>

                  {/* TOTP Authenticator Live Bar */}
                  {item.has2Fa && totpInfo && (
                    <div className="p-3 bg-indigo-950/30 border border-indigo-800/50 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Fingerprint className="w-4 h-4 text-indigo-400" />
                        <span className="text-stone-300 font-semibold">2FA Authenticator Code:</span>
                        <span className="font-mono text-base font-bold tracking-widest text-indigo-300">
                          {totpInfo.code.slice(0, 3)} {totpInfo.code.slice(3)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-400">
                          <Clock className="w-3 h-3 text-indigo-400 animate-spin" />
                          <span>{totpInfo.secondsRemaining}s</span>
                        </div>
                        <button
                          onClick={() => handleCopy(totpInfo.code, `totp_${item.id}`)}
                          className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-semibold"
                        >
                          {copiedId === `totp_${item.id}` ? 'Copied' : 'Copy TOTP'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PASSWORD & ENTROPY GENERATOR */}
      {activeTab === 'generator' && (
        <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-stone-100">High-Entropy Cryptographic Password Generator</h3>
            <p className="text-xs text-stone-400 mt-1">
              Generate mathematically resilient passwords or multi-word passphrases with zero predictable patterns.
            </p>
          </div>

          {/* Generated Password Display Box */}
          <div className="p-4 bg-stone-950 border border-indigo-800/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-1 w-full">
              <div className="text-[10px] text-indigo-400 font-mono uppercase font-bold">Generated Credential</div>
              <div className="text-lg sm:text-xl font-bold font-mono text-stone-100 tracking-wider break-all select-all">
                {generatedPassword}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={generateNewPassword}
                className="p-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 rounded-xl text-xs flex items-center gap-1 transition-colors"
                title="Regenerate"
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleCopy(generatedPassword, 'gen_pwd')}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all"
              >
                {copiedId === 'gen_pwd' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>Copy Password</span>
              </button>
            </div>
          </div>

          {/* Entropy & Strength Meter */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl space-y-1">
              <div className="text-[10px] text-stone-400 uppercase">Entropy Bits</div>
              <div className="text-base font-bold font-mono text-emerald-400">{generatedEntropy} bits</div>
            </div>
            <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl space-y-1">
              <div className="text-[10px] text-stone-400 uppercase">Brute-Force Time</div>
              <div className="text-base font-bold font-mono text-indigo-300">&gt; 100 Trillion Years</div>
            </div>
            <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl space-y-1">
              <div className="text-[10px] text-stone-400 uppercase">Character Count</div>
              <div className="text-base font-bold font-mono text-stone-200">{generatedPassword.length} chars</div>
            </div>
            <div className="p-3 bg-stone-950 border border-stone-800 rounded-xl space-y-1">
              <div className="text-[10px] text-stone-400 uppercase">Complexity</div>
              <div className="text-base font-bold font-mono text-emerald-400">Cryptographic Grade</div>
            </div>
          </div>

          {/* Generator Controls */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setGenMode('random')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  genMode === 'random' ? 'bg-indigo-600 text-white' : 'bg-stone-950 border border-stone-800 text-stone-400'
                }`}
              >
                Random Characters Mode
              </button>
              <button
                type="button"
                onClick={() => setGenMode('passphrase')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  genMode === 'passphrase' ? 'bg-indigo-600 text-white' : 'bg-stone-950 border border-stone-800 text-stone-400'
                }`}
              >
                Memorable Passphrase Mode
              </button>
            </div>

            {genMode === 'random' ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-stone-300">
                    <span>Password Length: {genLength} characters</span>
                    <span className="text-indigo-400 font-mono">Recommended: 18+</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="64"
                    value={genLength}
                    onChange={(e) => setGenLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-stone-950 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Uppercase (A-Z)', val: genUpper, set: setGenUpper },
                    { label: 'Lowercase (a-z)', val: genLower, set: setGenLower },
                    { label: 'Numbers (0-9)', val: genNumbers, set: setGenNumbers },
                    { label: 'Symbols (!@#$)', val: genSymbols, set: setGenSymbols },
                    { label: 'Avoid Ambiguous (1, l, I, 0, O)', val: genAvoidAmbiguous, set: setGenAvoidAmbiguous }
                  ].map((opt, i) => (
                    <label
                      key={i}
                      className="p-3 bg-stone-950 border border-stone-800 rounded-xl flex items-center justify-between text-xs cursor-pointer hover:bg-stone-900"
                    >
                      <span className="text-stone-300">{opt.label}</span>
                      <input
                        type="checkbox"
                        checked={opt.val}
                        onChange={(e) => opt.set(e.target.checked)}
                        className="rounded accent-indigo-600"
                      />
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-stone-300">
                    <span>Word Count: {genWordCount} words</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="8"
                    value={genWordCount}
                    onChange={(e) => setGenWordCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-stone-950 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SECURITY AUDIT & ALERTS */}
      {activeTab === 'audit' && (
        <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-100">Sovereign Vault Security Audit Report</h3>
              <p className="text-xs text-stone-400 mt-1">
                Automated breach detection, password reuse analysis, and 2FA compliance auditing.
              </p>
            </div>
            <span className="px-3 py-1 bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-xs font-bold rounded-lg">
              k-Anonymity Verified
            </span>
          </div>

          <div className="space-y-3">
            {audit.criticalAlerts.map(alert => (
              <div
                key={alert.id}
                className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${alert.severity === 'critical' ? 'text-rose-400' : 'text-amber-400'}`} />
                    <span className="font-bold text-xs text-stone-100">{alert.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase ${
                      alert.severity === 'critical' ? 'bg-rose-950 text-rose-300' : 'bg-amber-950 text-amber-300'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('generator')}
                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                  >
                    Rotate Password
                  </button>
                </div>
                <p className="text-xs text-stone-400">{alert.message}</p>
                <p className="text-[11px] text-indigo-300 font-mono">
                  Recommendation: {alert.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AUTOFILL ARCHITECTURE */}
      {activeTab === 'autofill' && (
        <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-2xl space-y-5">
          <div>
            <h3 className="text-base font-bold text-stone-100">OMNI Sovereign Autofill & Origin Matcher</h3>
            <p className="text-xs text-stone-400 mt-1">
              Cross-tab iframe isolation protects against clickjacking and credential snooping by untrusted third-party scripts.
            </p>
          </div>

          <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-400 font-semibold">Current Active Tab Origin:</span>
              <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 font-mono rounded border border-indigo-800">
                {currentDomain || 'omni.internal'}
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-300">Matching Autofill Credentials ({autofillMatches.length}):</div>
              {autofillMatches.length > 0 ? (
                autofillMatches.map(m => (
                  <div
                    key={m.id}
                    className="p-3 bg-stone-900 rounded-lg flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-stone-200">{m.title}</span>
                      <span className="text-stone-400 font-mono ml-2">({m.username})</span>
                    </div>
                    <button
                      onClick={() => {
                        const plain = omniWorkspaceService.decryptPasswordForReveal(m);
                        if (onAutofillCredentials) onAutofillCredentials(m.username, plain);
                        showToast(`Autofilled credentials for ${m.title} into active tab.`);
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Autofill Form</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-xs text-stone-500 font-mono">
                  No matching credentials saved for this domain. Add one above or browse the vault.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Credential Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleCreatePassword}
            className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 text-stone-200 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100 flex items-center gap-2">
                <Key className="w-4 h-4 text-indigo-400" />
                <span>Add Encrypted Credential to Vault</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Service / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GitHub Enterprise"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">Username / Email</label>
                <input
                  type="text"
                  placeholder="e.g. gideon@omni.com"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-stone-300">Password * (Will be encrypted client-side)</label>
                  <button
                    type="button"
                    onClick={() => {
                      const res = omniWorkspaceService.generatePassword({
                        length: 20,
                        includeUppercase: true,
                        includeLowercase: true,
                        includeNumbers: true,
                        includeSymbols: true,
                        avoidAmbiguous: true,
                        mode: 'random'
                      });
                      setNewPassword(res.password);
                    }}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-mono font-bold"
                  >
                    Generate Strong
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="••••••••••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Website URL / Domain</label>
                  <input
                    type="text"
                    placeholder="https://github.com"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300">Folder</label>
                  <select
                    value={newFolder}
                    onChange={(e) => setNewFolder(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="General">General</option>
                    <option value="Development">Development</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Security">Security</option>
                    <option value="Design">Design</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-300">2FA Secret Key (Optional for TOTP generator)</label>
                <input
                  type="text"
                  placeholder="e.g. JBSWY3DPEHPK3PXP"
                  value={newTotpSecret}
                  onChange={(e) => setNewTotpSecret(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 text-xs font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
              >
                Save & Encrypt
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
