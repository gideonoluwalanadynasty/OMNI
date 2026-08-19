import React, { useState } from 'react';
import { 
  Users, Link, QrCode, TrendingUp, ShieldAlert, Award, 
  Percent, RefreshCw, Layers, MapPin, CheckCircle2, 
  XCircle, AlertTriangle, Play, HelpCircle, UserPlus, 
  DollarSign, FileText, Settings, Sparkles, AlertCircle, Trash2
} from 'lucide-react';
import { OMNIState, Affiliate, AffiliateOpportunity, PartnerType } from '../types';

interface OMNIAffiliatePageProps {
  state: OMNIState;
  registerAsAffiliate: (name: string, email: string, partnerType: PartnerType, customCode?: string) => void;
  updateAttributionModel: (model: 'first_click' | 'last_click' | 'coupon' | 'app_specific', windowDays: number) => void;
  simulateAffiliateClick: (affiliateCode: string, opportunityId: string) => void;
  simulateAffiliateLead: (affiliateCode: string, opportunityId: string, email: string, customerType: 'individual' | 'enterprise') => void;
  triggerAffiliateConversion: (
    affiliateCode: string, 
    opportunityId: string, 
    amount: number, 
    customerType: 'individual' | 'enterprise',
    country: string,
    campaign?: string
  ) => void;
  processFraudAlertAction: (alertId: string, action: 'dismiss' | 'suspend') => void;
  allocateGrowthReward: (
    recipientId: string, 
    recipientName: string, 
    activityType: 'verified_customer_acquisition' | 'merchant_acquisition' | 'completed_sales' | 'retention_milestone' | 'useful_content' | 'geographic_expansion' | 'validated_business_development',
    points: number,
    description: string
  ) => void;
  redeemGrowthRewardPoints: (rewardId: string, pointsToRedeem: number, cashValueUSD: number) => void;
}

export default function OMNIAffiliatePage({
  state,
  registerAsAffiliate,
  updateAttributionModel,
  simulateAffiliateClick,
  simulateAffiliateLead,
  triggerAffiliateConversion,
  processFraudAlertAction,
  allocateGrowthReward,
  redeemGrowthRewardPoints
}: OMNIAffiliatePageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'marketplace' | 'attribution' | 'rewards' | 'fraud' | 'testbed'>('profile');
  
  // Local state for registering new affiliate
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newPartnerEmail, setNewPartnerEmail] = useState('');
  const [newPartnerType, setNewPartnerType] = useState<PartnerType>('affiliate');
  const [customRefCode, setCustomRefCode] = useState('');

  // Local state for growth reward allocation
  const [rewardRecipient, setRewardRecipient] = useState('');
  const [rewardPoints, setRewardPoints] = useState(1000);
  const [rewardActivity, setRewardActivity] = useState<'verified_customer_acquisition' | 'merchant_acquisition' | 'completed_sales' | 'retention_milestone' | 'useful_content' | 'geographic_expansion' | 'validated_business_development'>('verified_customer_acquisition');
  const [rewardDescription, setRewardDescription] = useState('');

  // Selector state for simulation panels
  const [simSelectedAff, setSimSelectedAff] = useState(state.affiliates?.[0]?.affiliateId || 'GIDEON2026');
  const [simSelectedOpp, setSimSelectedOpp] = useState(state.affiliateOpportunities?.[0]?.id || 'opp_omni_family');
  const [simAmount, setSimAmount] = useState(120);
  const [simCustomerType, setSimCustomerType] = useState<'individual' | 'enterprise'>('individual');
  const [simCountry, setSimCountry] = useState('US');
  const [simCampaign, setSimCampaign] = useState('summer_growth_2026');
  const [simLeadEmail, setSimLeadEmail] = useState('new-lead@growth-target.com');

  // Copy helper
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Find currently active profile based on logged-in user email or fallback
  const activeAffProfile = state.affiliates?.find(a => a.email === state.user?.email) || state.affiliates?.[0] || {
    id: 'aff_1',
    userId: 'usr_gideon',
    affiliateId: 'GIDEON2026',
    email: 'gideonoluwalanadynasty@gmail.com',
    name: 'Gideon Oluwalana',
    partnerType: 'affiliate' as const,
    level: 'platinum' as const,
    status: 'active' as const,
    referralLink: 'https://omni.io/?ref=GIDEON2026',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://omni.io/?ref=GIDEON2026',
    joinedDate: '2026-01-01T00:00:00Z',
    clicksCount: 1420,
    leadsCount: 185,
    conversionsCount: 42,
    earningsPending: 680.00,
    earningsApproved: 48920.00,
    earningsRejected: 0
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] text-[#1E1E1C] font-sans antialiased">
      {/* Upper Navigation Hero */}
      <header className="border-b border-[#EBEBE8] bg-white sticky top-0 z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#A3A39E] uppercase mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              OMNI Global Growth Network
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1E1E1C]">Partner & Affiliate Engine</h1>
            <p className="text-xs text-[#73736E] mt-0.5">
              GAAP-compliant double-entry ledger attribution, smart commission rules, and anti-fraud sentry protocol.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#73736E]">Attribution Mode:</span>
            <span className="bg-[#F4F4F3] text-[#1E1E1C] px-2.5 py-1 rounded text-xs font-mono font-medium border border-[#EBEBE8] capitalize">
              {state.attributionSettings?.model.replace('_', ' ')} ({state.attributionSettings?.windowDays}d window)
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#A3A39E] px-3 mb-2">Ecosystem Operations</div>
            
            <button
              id="btn-tab-profile"
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                activeTab === 'profile'
                  ? 'bg-amber-500/10 text-[#B25E00] border border-amber-500/20'
                  : 'text-[#575752] hover:bg-[#F4F4F3]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="h-4 w-4" />
                <span>Partner Dashboard</span>
              </div>
              {activeAffProfile && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-[#B25E00] uppercase font-bold">
                  {activeAffProfile.level}
                </span>
              )}
            </button>

            <button
              id="btn-tab-marketplace"
              onClick={() => setActiveTab('marketplace')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                activeTab === 'marketplace'
                  ? 'bg-amber-500/10 text-[#B25E00] border border-amber-500/20'
                  : 'text-[#575752] hover:bg-[#F4F4F3]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="h-4 w-4" />
                <span>OMNI Marketplace</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#EBEBE8] text-[#575752]">
                {state.affiliateOpportunities.length} Apps
              </span>
            </button>

            <button
              id="btn-tab-attribution"
              onClick={() => setActiveTab('attribution')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                activeTab === 'attribution'
                  ? 'bg-amber-500/10 text-[#B25E00] border border-amber-500/20'
                  : 'text-[#575752] hover:bg-[#F4F4F3]'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Attribution Engine</span>
            </button>

            <button
              id="btn-tab-rewards"
              onClick={() => setActiveTab('rewards')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                activeTab === 'rewards'
                  ? 'bg-amber-500/10 text-[#B25E00] border border-amber-500/20'
                  : 'text-[#575752] hover:bg-[#F4F4F3]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Award className="h-4 w-4" />
                <span>Growth Rewards</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">
                PRO POINTS
              </span>
            </button>

            <div className="h-px bg-[#EBEBE8] my-4" />
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#A3A39E] px-3 mb-2">Compliance & Security</div>

            <button
              id="btn-tab-fraud"
              onClick={() => setActiveTab('fraud')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                activeTab === 'fraud'
                  ? 'bg-red-500/10 text-red-700 border border-red-500/20 font-semibold'
                  : 'text-[#575752] hover:bg-[#F4F4F3]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="h-4 w-4" />
                <span>Sentry Anti-Fraud</span>
              </div>
              {state.fraudAlerts.filter(a => a.status === 'flagged').length > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-600 text-white font-bold">
                  {state.fraudAlerts.filter(a => a.status === 'flagged').length} Alert
                </span>
              )}
            </button>

            <button
              id="btn-tab-testbed"
              onClick={() => setActiveTab('testbed')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                activeTab === 'testbed'
                  ? 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20'
                  : 'text-[#575752] hover:bg-[#F4F4F3]'
              }`}
            >
              <Play className="h-4 w-4" />
              <span>Sim Sandbox Console</span>
            </button>

            {/* Platform Quick Wallet Card */}
            <div className="mt-8 p-4 bg-[#F4F4F3] border border-[#EBEBE8] rounded-xl space-y-3">
              <div className="text-xs font-mono text-[#73736E]">YOUR WALLET ACCOUNTS</div>
              {state.omniWallets.map(wallet => (
                <div key={wallet.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-[#575752]">
                    <span className="font-medium">Available Balance</span>
                    <span className="font-mono text-[#1E1E1C] font-bold">
                      ${wallet.availableBalance.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#A3A39E]">
                    <span>Affiliate Earnings</span>
                    <span className="font-mono text-emerald-700">${wallet.affiliateEarnings.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#A3A39E]">
                    <span>Growth Rewards</span>
                    <span className="font-mono text-indigo-700 font-medium">{wallet.rewardsBalance.toLocaleString()} Pts</span>
                  </div>
                </div>
              ))}
              <div className="text-[9px] text-[#A3A39E] font-mono border-t border-[#EBEBE8] pt-2">
                *Separated accounting: earnings, reseller revenue shares, growth rewards, and investment ownership are independent reserves.
              </div>
            </div>
          </div>

          {/* Tab Workspaces */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* TAB 1: Profile & Metrics */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                
                {/* Active Partner Profile Header Card */}
                {activeAffProfile ? (
                  <div className="bg-white border border-[#EBEBE8] rounded-xl p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-24 w-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-amber-100 text-[#B25E00] text-xs font-mono font-bold px-2.5 py-0.5 rounded-full capitalize">
                            {activeAffProfile.partnerType.replace('_', ' ')}
                          </span>
                          <span className="bg-[#1E1E1C] text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase">
                            Level: {activeAffProfile.level}
                          </span>
                          {activeAffProfile.status === 'suspended' && (
                            <span className="bg-red-100 text-red-800 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold">
                              SUSPENDED
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-bold text-[#1E1E1C]">{activeAffProfile.name}</h2>
                        <p className="text-sm text-[#73736E]">{activeAffProfile.email}</p>
                        <div className="text-xs text-[#A3A39E] font-mono mt-2">
                          Affiliate ID: {activeAffProfile.affiliateId} • Joined: {new Date(activeAffProfile.joinedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
                        <div className="p-2.5 bg-[#F4F4F3] border border-[#EBEBE8] rounded-lg flex items-center justify-center">
                          <img 
                            src={activeAffProfile.qrCodeUrl} 
                            alt="QR Code" 
                            className="h-16 w-16 opacity-90"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-2">
                          <button
                            id="btn-copy-ref-link"
                            onClick={() => handleCopy(activeAffProfile.referralLink)}
                            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-[#1E1E1C] text-white hover:bg-[#333] rounded-lg text-xs font-medium transition"
                          >
                            <Link className="h-3.5 w-3.5" />
                            {copiedText === activeAffProfile.referralLink ? 'Copied Link!' : 'Copy Referral'}
                          </button>
                          <div className="text-[10px] text-center text-[#73736E] font-mono truncate max-w-[180px]">
                            {activeAffProfile.referralLink}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6 text-center">
                    <p className="text-sm text-[#73736E]">You are not registered as an affiliate partner yet.</p>
                    <button
                      id="btn-register-anchor"
                      onClick={() => {
                        setNewPartnerName(state.user?.fullName || 'Gideon Dynasty');
                        setNewPartnerEmail(state.user?.email || 'gideonoluwalanadynasty@gmail.com');
                      }}
                      className="mt-3 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold"
                    >
                      Initialize Partner Identity
                    </button>
                  </div>
                )}

                {/* Dashboard Metrics Panel */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white border border-[#EBEBE8] rounded-xl p-4 shadow-sm">
                    <div className="text-xs text-[#73736E] font-medium">Referral Clicks</div>
                    <div className="text-2xl font-bold tracking-tight text-[#1E1E1C] mt-1 font-mono">
                      {activeAffProfile ? activeAffProfile.clicksCount.toLocaleString() : '0'}
                    </div>
                    <div className="text-[10px] text-[#A3A39E] font-mono mt-1">Unique IP routing logs</div>
                  </div>
                  
                  <div className="bg-white border border-[#EBEBE8] rounded-xl p-4 shadow-sm">
                    <div className="text-xs text-[#73736E] font-medium">Onboarded Leads</div>
                    <div className="text-2xl font-bold tracking-tight text-[#1E1E1C] mt-1 font-mono">
                      {activeAffProfile ? activeAffProfile.leadsCount.toLocaleString() : '0'}
                    </div>
                    <div className="text-[10px] text-[#A3A39E] font-mono mt-1">Pending checkout carts</div>
                  </div>

                  <div className="bg-white border border-[#EBEBE8] rounded-xl p-4 shadow-sm">
                    <div className="text-xs text-[#73736E] font-medium">Paying Conversions</div>
                    <div className="text-2xl font-bold tracking-tight text-[#1E1E1C] mt-1 font-mono">
                      {activeAffProfile ? activeAffProfile.conversionsCount.toLocaleString() : '0'}
                    </div>
                    <div className="text-[10px] text-emerald-700 font-medium mt-1">
                      Conversion Rate: {activeAffProfile && activeAffProfile.clicksCount > 0 ? ((activeAffProfile.conversionsCount / activeAffProfile.clicksCount) * 100).toFixed(2) : '0'}%
                    </div>
                  </div>

                  <div className="bg-white border border-[#EBEBE8] rounded-xl p-4 shadow-sm">
                    <div className="text-xs text-[#73736E] font-medium">Total Commissions</div>
                    <div className="text-2xl font-bold tracking-tight text-emerald-800 mt-1 font-mono">
                      ${activeAffProfile ? (activeAffProfile.earningsApproved).toFixed(2) : '0.00'}
                    </div>
                    <div className="text-[10px] text-[#A3A39E] font-mono mt-1">
                      Pending escrow: ${activeAffProfile ? (activeAffProfile.earningsPending).toFixed(2) : '0.00'}
                    </div>
                  </div>
                </div>

                {/* Subsections: Register Partner & Payout Records */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Create / Onboard Partner Identity */}
                  <div className="bg-white border border-[#EBEBE8] rounded-xl p-5 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-[#1E1E1C] flex items-center gap-2">
                      <UserPlus className="h-4 w-4 text-amber-600" />
                      Register New Partner / Agent
                    </h3>
                    
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-[#575752] font-medium mb-1">Partner Entity Name</label>
                        <input
                          id="inp-partner-name"
                          type="text"
                          placeholder="e.g. Oluwalana Agencies LTD"
                          value={newPartnerName}
                          onChange={(e) => setNewPartnerName(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBEBE8] rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-[#FDFDFC]"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[#575752] font-medium mb-1">Authorized Contact Email</label>
                        <input
                          id="inp-partner-email"
                          type="email"
                          placeholder="partner@oluwalana.org"
                          value={newPartnerEmail}
                          onChange={(e) => setNewPartnerEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBEBE8] rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-[#FDFDFC]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[#575752] font-medium mb-1">Partner Type</label>
                          <select
                            id="sel-partner-type"
                            value={newPartnerType}
                            onChange={(e) => setNewPartnerType(e.target.value as PartnerType)}
                            className="w-full px-2 py-2 border border-[#EBEBE8] rounded-lg bg-white"
                          >
                            <option value="affiliate">Affiliate Partner</option>
                            <option value="influencer">Social Influencer</option>
                            <option value="agency">Development Agency</option>
                            <option value="referral_partner">Referral Partner</option>
                            <option value="sales_agent">Ecosystem Sales Agent</option>
                            <option value="regional_representative">Regional Rep</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[#575752] font-medium mb-1">Promo Code (Optional)</label>
                          <input
                            id="inp-custom-ref-code"
                            type="text"
                            placeholder="GIDEON50"
                            value={customRefCode}
                            onChange={(e) => setCustomRefCode(e.target.value)}
                            className="w-full px-3 py-2 border border-[#EBEBE8] rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-[#FDFDFC]"
                          />
                        </div>
                      </div>

                      <button
                        id="btn-submit-register"
                        onClick={() => {
                          if (!newPartnerName || !newPartnerEmail) return;
                          registerAsAffiliate(newPartnerName, newPartnerEmail, newPartnerType, customRefCode || undefined);
                          setNewPartnerName('');
                          setNewPartnerEmail('');
                          setCustomRefCode('');
                        }}
                        className="w-full py-2 bg-[#1E1E1C] hover:bg-amber-600 text-white rounded-lg font-semibold text-center transition"
                      >
                        Authorize Partner Onboarding
                      </button>
                    </div>
                  </div>

                  {/* Registered Growth Network partners List */}
                  <div className="bg-white border border-[#EBEBE8] rounded-xl p-5 shadow-sm space-y-3">
                    <h3 className="text-sm font-bold text-[#1E1E1C]">Registered Growth Agents</h3>
                    <div className="divide-y divide-[#EBEBE8] max-h-[280px] overflow-y-auto pr-1">
                      {state.affiliates.map(aff => (
                        <div key={aff.id} className="py-2.5 flex items-center justify-between text-xs">
                          <div>
                            <div className="font-semibold text-[#1E1E1C] flex items-center gap-1.5">
                              {aff.name}
                              <span className={`text-[9px] font-mono px-1 py-0.2 rounded uppercase ${
                                aff.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {aff.status}
                              </span>
                            </div>
                            <div className="text-[10px] text-[#73736E]">
                              Code: <span className="font-mono text-[#1E1E1C] font-semibold">{aff.affiliateId}</span> • {aff.partnerType.replace('_', ' ')}
                            </div>
                          </div>
                          <div className="text-right font-mono text-[11px]">
                            <div className="text-[#1E1E1C] font-bold">${aff.earningsApproved.toFixed(2)}</div>
                            <div className="text-[10px] text-[#A3A39E]">{aff.conversionsCount} sales</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Historical Commissions Ledger */}
                <div className="bg-white border border-[#EBEBE8] rounded-xl p-5 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-[#1E1E1C] flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-amber-600" />
                    Double-Entry Referral Commission Ledger
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[#EBEBE8] text-[#73736E] font-mono">
                          <th className="py-2">Commission ID</th>
                          <th className="py-2">Affiliate Partner</th>
                          <th className="py-2">Date</th>
                          <th className="py-2">Opportunity Type</th>
                          <th className="py-2">Status</th>
                          <th className="py-2 text-right">Commission Amt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EBEBE8]">
                        {state.affiliateCommissions.map(comm => {
                          const partner = state.affiliates.find(a => a.id === comm.affiliateId);
                          const opp = state.affiliateOpportunities.find(o => o.id === comm.opportunityId);
                          return (
                            <tr key={comm.id} className="hover:bg-[#FDFDFC]">
                              <td className="py-3 font-mono text-[10px] text-[#73736E]">{comm.id.slice(0, 10)}...</td>
                              <td className="py-3">
                                <div className="font-medium text-[#1E1E1C]">{partner?.name || 'Anonymous Partner'}</div>
                                <div className="text-[10px] text-[#73736E]">Ref: {partner?.affiliateId}</div>
                              </td>
                              <td className="py-3 text-[#575752] font-mono">{new Date(comm.createdAt).toLocaleDateString()}</td>
                              <td className="py-3">
                                <div className="font-medium text-[#1E1E1C]">{opp?.appName}</div>
                                {comm.isRecurring && (
                                  <span className="text-[9px] font-mono px-1 py-0.2 bg-indigo-100 text-indigo-800 rounded font-bold">
                                    RECURRING SUB
                                  </span>
                                )}
                              </td>
                              <td className="py-3">
                                {comm.status === 'approved' ? (
                                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" /> Approved
                                  </span>
                                ) : comm.status === 'pending' ? (
                                  <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3 animate-spin" /> Pending Sentry Review
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-mono bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold inline-flex items-center gap-1">
                                    <XCircle className="h-3 w-3" /> Blocked / Rejected
                                  </span>
                                )}
                              </td>
                              <td className="py-3 text-right font-mono font-bold text-emerald-800">${comm.amount.toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: Marketplace Opportunities */}
            {activeTab === 'marketplace' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-[#1E1E1C]">Ecosystem Affiliate Marketplace</h2>
                    <p className="text-xs text-[#73736E]">Promote active applications in the OMNI ecosystem and earn guaranteed rewards.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {state.affiliateOpportunities.map(opp => (
                    <div key={opp.id} className="bg-white border border-[#EBEBE8] rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                            {opp.appName}
                          </span>
                          <span className="text-[11px] text-[#A3A39E] font-mono">{opp.category}</span>
                        </div>
                        <h3 className="text-sm font-bold text-[#1E1E1C]">{opp.productName}</h3>
                        <p className="text-xs text-[#73736E] mt-2 line-clamp-3">{opp.description}</p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-[#F4F4F3]">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#73736E]">Payout Term</span>
                          <span className="font-mono font-medium">{opp.payoutFrequency}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#73736E]">Commission Rate</span>
                          <span className="font-mono font-bold text-emerald-800">
                            {opp.commissionType === 'percentage' ? `${opp.commissionValue}%` : `$${opp.commissionValue}`} 
                            {opp.isRecurring ? ' Recurring' : ' One-Time'}
                          </span>
                        </div>
                        {opp.promoCode && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#73736E]">Default Coupon Code</span>
                            <span className="font-mono text-[#1E1E1C] bg-[#F4F4F3] px-1.5 rounded font-bold border border-[#EBEBE8] select-all">
                              {opp.promoCode}
                            </span>
                          </div>
                        )}
                        
                        <div className="bg-[#F4F4F3] p-2.5 rounded-lg border border-[#EBEBE8] space-y-2">
                          <div className="text-[10px] font-mono text-[#73736E] font-bold">SIMULATION ACTION TARGET:</div>
                          <div className="flex gap-2">
                            <button
                              id={`btn-click-opp-${opp.id}`}
                              onClick={() => simulateAffiliateClick(simSelectedAff, opp.id)}
                              className="flex-1 bg-white border border-[#EBEBE8] hover:bg-amber-500/10 hover:text-[#B25E00] hover:border-amber-500/20 py-1 rounded text-[10px] font-mono text-[#575752] transition font-bold"
                            >
                              Simulate Click
                            </button>
                            <button
                              id={`btn-lead-opp-${opp.id}`}
                              onClick={() => simulateAffiliateLead(simSelectedAff, opp.id, 'lead-' + Math.floor(100+Math.random()*900) + '@client.com', 'individual')}
                              className="flex-1 bg-white border border-[#EBEBE8] hover:bg-amber-500/10 hover:text-[#B25E00] hover:border-amber-500/20 py-1 rounded text-[10px] font-mono text-[#575752] transition font-bold"
                            >
                              Simulate Lead
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Attribution Settings */}
            {activeTab === 'attribution' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#1E1E1C]">Ecosystem Attribution Rules Configurator</h2>
                  <p className="text-xs text-[#73736E]">Configure standard attribution parameters across the growth network database.</p>
                </div>

                <div className="bg-white border border-[#EBEBE8] rounded-xl p-6 shadow-sm space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-[#1E1E1C] block uppercase tracking-wider font-mono">Attribution Models</label>
                      <div className="space-y-2.5">
                        
                        <label className="flex items-start gap-3 p-3 rounded-lg border border-[#EBEBE8] hover:bg-[#FDFDFC] cursor-pointer">
                          <input
                            type="radio"
                            name="attribModel"
                            checked={state.attributionSettings?.model === 'first_click'}
                            onChange={() => updateAttributionModel('first_click', state.attributionSettings?.windowDays || 30)}
                            className="mt-1 text-amber-600 focus:ring-amber-500"
                          />
                          <div>
                            <span className="text-xs font-bold block text-[#1E1E1C]">First Click Attribution</span>
                            <span className="text-[11px] text-[#73736E]">Commissions belong entirely to the partner who introduced the customer to OMNI first.</span>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 p-3 rounded-lg border border-[#EBEBE8] hover:bg-[#FDFDFC] cursor-pointer">
                          <input
                            type="radio"
                            name="attribModel"
                            checked={state.attributionSettings?.model === 'last_click'}
                            onChange={() => updateAttributionModel('last_click', state.attributionSettings?.windowDays || 30)}
                            className="mt-1 text-amber-600 focus:ring-amber-500"
                          />
                          <div>
                            <span className="text-xs font-bold block text-[#1E1E1C]">Last Click Attribution (Default)</span>
                            <span className="text-[11px] text-[#73736E]">Commissions are credited to the final affiliate link clicked prior to checkout completion.</span>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 p-3 rounded-lg border border-[#EBEBE8] hover:bg-[#FDFDFC] cursor-pointer">
                          <input
                            type="radio"
                            name="attribModel"
                            checked={state.attributionSettings?.model === 'coupon'}
                            onChange={() => updateAttributionModel('coupon', state.attributionSettings?.windowDays || 30)}
                            className="mt-1 text-amber-600 focus:ring-amber-500"
                          />
                          <div>
                            <span className="text-xs font-bold block text-[#1E1E1C]">Coupon/Promo Code Absolute</span>
                            <span className="text-[11px] text-[#73736E]">Overrides cookies; credit is given strictly to the promo code matching the checkout input.</span>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 p-3 rounded-lg border border-[#EBEBE8] hover:bg-[#FDFDFC] cursor-pointer">
                          <input
                            type="radio"
                            name="attribModel"
                            checked={state.attributionSettings?.model === 'app_specific'}
                            onChange={() => updateAttributionModel('app_specific', state.attributionSettings?.windowDays || 30)}
                            className="mt-1 text-amber-600 focus:ring-amber-500"
                          />
                          <div>
                            <span className="text-xs font-bold block text-[#1E1E1C]">Application-Specific Rules</span>
                            <span className="text-[11px] text-[#73736E]">Allows developers to code custom attribution hierarchies inside micro-service metadata.</span>
                          </div>
                        </label>

                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-[#1E1E1C] block uppercase tracking-wider font-mono">Attribution Window</label>
                        <div className="p-4 bg-[#F4F4F3] border border-[#EBEBE8] rounded-xl space-y-3">
                          <div className="flex justify-between text-xs font-mono font-bold text-[#1E1E1C]">
                            <span>Tracking Lifetime</span>
                            <span>{state.attributionSettings?.windowDays} Days</span>
                          </div>
                          <input
                            id="attrib-window-slider"
                            type="range"
                            min="15"
                            max="180"
                            step="15"
                            value={state.attributionSettings?.windowDays || 30}
                            onChange={(e) => updateAttributionModel(state.attributionSettings?.model || 'last_click', parseInt(e.target.value))}
                            className="w-full accent-amber-600"
                          />
                          <p className="text-[10px] text-[#73736E]">
                            Tracking cookies remain verified on browser clients for this period of time. Purchases completed outside of this lifetime do not trigger commission logs.
                          </p>
                        </div>
                      </div>

                      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 space-y-2 text-xs">
                        <h4 className="font-bold text-[#1E1E1C]">Enterprise Multi-Level Policy</h4>
                        <p className="text-[#73736E]">
                          Partner commissions are evaluated securely using the platform's central sandbox routing layers, mitigating click spam & tracking overlap.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Growth Rewards */}
            {activeTab === 'rewards' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-[#1E1E1C]">OMNI Ecosystem Growth Rewards</h2>
                    <p className="text-xs text-[#73736E]">Recognizing legitimate contributions such as user acquisition, useful tutorials, and expansion milestones.</p>
                  </div>
                  <div className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-100 font-mono text-xs font-bold">
                    Independent Reward Ledger System
                  </div>
                </div>

                {/* Allocate New Growth Reward Points */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="md:col-span-1 bg-white border border-[#EBEBE8] rounded-xl p-5 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E1E1C] uppercase tracking-wider font-mono">Grant Growth Reward</h3>
                    
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-[#575752] font-medium mb-1">Recipient ID / Affiliate Code</label>
                        <select
                          id="sel-reward-recipient"
                          value={rewardRecipient}
                          onChange={(e) => setRewardRecipient(e.target.value)}
                          className="w-full px-2 py-2 border border-[#EBEBE8] rounded-lg bg-white"
                        >
                          <option value="">-- Choose Partner --</option>
                          {state.affiliates.map(af => (
                            <option key={af.id} value={af.id}>{af.name} ({af.affiliateId})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[#575752] font-medium mb-1">Contribution Type</label>
                        <select
                          id="sel-reward-activity"
                          value={rewardActivity}
                          onChange={(e) => setRewardActivity(e.target.value as any)}
                          className="w-full px-2 py-2 border border-[#EBEBE8] rounded-lg bg-white"
                        >
                          <option value="verified_customer_acquisition">Customer Acquisition</option>
                          <option value="merchant_acquisition">Merchant Onboarding</option>
                          <option value="completed_sales">Completed High-Ticket Sale</option>
                          <option value="retention_milestone">1 Year Retention Milestone</option>
                          <option value="useful_content">High-Value Tutorial Content</option>
                          <option value="geographic_expansion">Geographical Integration</option>
                          <option value="validated_business_development">Corporate Business Dev</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[#575752] font-medium mb-1">Points to Grant (NOT shares)</label>
                        <input
                          id="inp-reward-points"
                          type="number"
                          min="100"
                          max="100000"
                          value={rewardPoints}
                          onChange={(e) => setRewardPoints(parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-[#EBEBE8] rounded-lg bg-[#FDFDFC]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#575752] font-medium mb-1">Description / Validation Link</label>
                        <textarea
                          id="txt-reward-desc"
                          rows={2}
                          placeholder="e.g. Published translation logs for Ghana merchant support"
                          value={rewardDescription}
                          onChange={(e) => setRewardDescription(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBEBE8] rounded-lg text-xs"
                        />
                      </div>

                      <button
                        id="btn-allocate-reward"
                        onClick={() => {
                          if (!rewardRecipient) return;
                          const partner = state.affiliates.find(a => a.id === rewardRecipient);
                          if (!partner) return;
                          allocateGrowthReward(partner.id, partner.name, rewardActivity, rewardPoints, rewardDescription);
                          setRewardDescription('');
                        }}
                        className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-bold text-center transition"
                      >
                        Grant Points
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-white border border-[#EBEBE8] rounded-xl p-5 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E1E1C] uppercase tracking-wider font-mono">Ecosystem Contributions Ledgers</h3>
                    
                    <div className="space-y-4 divide-y divide-[#EBEBE8] max-h-[380px] overflow-y-auto pr-1">
                      {state.growthRewards.map(rew => (
                        <div key={rew.id} className="pt-3 first:pt-0 space-y-1.5 text-xs">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold text-[#1E1E1C]">{rew.recipientName}</div>
                              <div className="text-[10px] text-[#73736E] capitalize font-mono">
                                Type: {rew.activityType.replace(/_/g, ' ')}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-mono font-bold text-indigo-700 px-2 py-0.5 rounded bg-indigo-50 inline-block text-xs">
                                {rew.points.toLocaleString()} Points
                              </span>
                              <div className="text-[10px] text-[#A3A39E] font-mono mt-0.5">{new Date(rew.timestamp).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <p className="text-[11px] text-[#575752] bg-[#F4F4F3] p-2 rounded border border-[#EBEBE8]">
                            {rew.description}
                          </p>
                          {rew.status === 'allocated' ? (
                            <div className="flex justify-end pt-1">
                              <button
                                id={`btn-redeem-${rew.id}`}
                                onClick={() => redeemGrowthRewardPoints(rew.id, rew.points, Math.floor(rew.points / 10))}
                                className="px-2.5 py-1 bg-white border border-[#EBEBE8] text-indigo-700 hover:bg-indigo-100 rounded text-[10px] font-bold font-mono transition"
                              >
                                Redeem Points (Est: ${Math.floor(rew.points / 10)})
                              </button>
                            </div>
                          ) : (
                            <div className="text-right text-[10px] font-mono text-emerald-700 font-bold flex items-center justify-end gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {rew.redemptionMethod}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 5: Sentry Anti-Fraud */}
            {activeTab === 'fraud' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#1E1E1C] flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-red-600" />
                    OMNI Fraud Sentry Monitoring Shield
                  </h2>
                  <p className="text-xs text-[#73736E]">
                    Sentry scans the global growth ledger checking for click-stuffing, affiliate duplicate identity, click spam, self-referral, and refund abuse patterns.
                  </p>
                </div>

                <div className="bg-white border border-[#EBEBE8] rounded-xl p-5 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold text-[#1E1E1C] uppercase tracking-wider font-mono">Unresolved Security Threats</h3>
                  
                  <div className="space-y-4 divide-y divide-[#EBEBE8]">
                    {state.fraudAlerts.map(alert => (
                      <div key={alert.id} className="pt-4 first:pt-0 space-y-2 text-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                              alert.severity === 'high' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {alert.severity} Risk
                            </span>
                            <span className="font-bold text-[#1E1E1C]">{alert.affiliateName}</span>
                            <span className="text-[#73736E] font-mono">({alert.type.replace(/_/g, ' ')})</span>
                          </div>
                          <div className="text-[10px] text-[#A3A39E] font-mono">
                            Detected: {new Date(alert.timestamp).toLocaleString()}
                          </div>
                        </div>

                        <div className="bg-[#FFF5F5] border border-red-200/50 rounded-lg p-3 text-[11px] space-y-1 text-[#5c1c1c]">
                          <div className="font-semibold text-red-900">Incident Details:</div>
                          <div>{alert.description}</div>
                          <div className="mt-1 font-mono text-[10px] bg-red-100/50 p-1.5 rounded text-red-950 font-bold break-all">
                            Evidence Trace: {alert.evidence}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-1 text-[11px]">
                          <div className="text-[#73736E]">
                            Sentry Status:{' '}
                            <span className={`font-mono font-bold ${
                              alert.status === 'flagged' ? 'text-red-700 animate-pulse' : 'text-emerald-700'
                            }`}>
                              {alert.status.replace(/_/g, ' ').toUpperCase()}
                            </span>
                          </div>
                          
                          {alert.status === 'flagged' && (
                            <div className="flex gap-2">
                              <button
                                id={`btn-fraud-dismiss-${alert.id}`}
                                onClick={() => processFraudAlertAction(alert.id, 'dismiss')}
                                className="px-2.5 py-1 bg-[#F4F4F3] border border-[#EBEBE8] hover:bg-gray-100 rounded font-medium transition"
                              >
                                Dismiss Flag
                              </button>
                              <button
                                id={`btn-fraud-suspend-${alert.id}`}
                                onClick={() => processFraudAlertAction(alert.id, 'suspend')}
                                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-bold transition"
                              >
                                Suspend Affiliate
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: Sim Sandbox Testbed */}
            {activeTab === 'testbed' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#1E1E1C]">Ecosystem Growth Testbed Console</h2>
                  <p className="text-xs text-[#73736E]">
                    Trigger and trace simulated marketing actions to verify GAAP double-entry logs, multipliers, and security algorithms.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Left Parameter Panel */}
                  <div className="md:col-span-1 bg-white border border-[#EBEBE8] rounded-xl p-5 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E1E1C] uppercase tracking-wider font-mono">Conversion Parameters</h3>
                    
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-[#575752] font-medium mb-1">Target Partner Entity</label>
                        <select
                          id="sel-sim-aff"
                          value={simSelectedAff}
                          onChange={(e) => setSimSelectedAff(e.target.value)}
                          className="w-full px-2 py-2 border border-[#EBEBE8] rounded-lg bg-white"
                        >
                          {state.affiliates.map(af => (
                            <option key={af.id} value={af.affiliateId}>{af.name} ({af.affiliateId} - {af.level})</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[#575752] font-medium mb-1">Ecosystem Opportunity App</label>
                        <select
                          id="sel-sim-opp"
                          value={simSelectedOpp}
                          onChange={(e) => setSimSelectedOpp(e.target.value)}
                          className="w-full px-2 py-2 border border-[#EBEBE8] rounded-lg bg-white"
                        >
                          {state.affiliateOpportunities.map(op => (
                            <option key={op.id} value={op.id}>{op.appName} - {op.productName}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[#575752] font-medium mb-1">Purchase Amount</label>
                          <input
                            id="inp-sim-amt"
                            type="number"
                            value={simAmount}
                            onChange={(e) => setSimAmount(parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-1.5 border border-[#EBEBE8] rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-[#575752] font-medium mb-1">Country Node</label>
                          <input
                            id="inp-sim-country"
                            type="text"
                            value={simCountry}
                            onChange={(e) => setSimCountry(e.target.value)}
                            className="w-full px-3 py-1.5 border border-[#EBEBE8] rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#575752] font-medium mb-1">Customer Classification</label>
                        <div className="flex gap-2">
                          <button
                            id="btn-customer-ind"
                            onClick={() => setSimCustomerType('individual')}
                            className={`flex-1 py-1 rounded text-xs transition ${
                              simCustomerType === 'individual' ? 'bg-[#1E1E1C] text-white font-bold' : 'bg-gray-100 text-[#575752]'
                            }`}
                          >
                            Individual
                          </button>
                          <button
                            id="btn-customer-ent"
                            onClick={() => setSimCustomerType('enterprise')}
                            className={`flex-1 py-1 rounded text-xs transition ${
                              simCustomerType === 'enterprise' ? 'bg-[#1E1E1C] text-white font-bold' : 'bg-gray-100 text-[#575752]'
                            }`}
                          >
                            Enterprise (+10%)
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#575752] font-medium mb-1">Marketing Campaign Banner</label>
                        <input
                          id="inp-sim-campaign"
                          type="text"
                          placeholder="e.g. summer_growth_2026"
                          value={simCampaign}
                          onChange={(e) => setSimCampaign(e.target.value)}
                          className="w-full px-3 py-2 border border-[#EBEBE8] rounded-lg text-xs"
                        />
                      </div>

                      <button
                        id="btn-trigger-checkout"
                        onClick={() => {
                          triggerAffiliateConversion(simSelectedAff, simSelectedOpp, simAmount, simCustomerType, simCountry, simCampaign);
                        }}
                        className="w-full py-2.5 bg-[#1E1E1C] hover:bg-emerald-700 text-white rounded-lg font-bold transition flex items-center justify-center gap-2"
                      >
                        <Sparkles className="h-4 w-4" />
                        Execute Checkout Conversion
                      </button>
                    </div>
                  </div>

                  {/* Right Automated Scenarios Dashboard */}
                  <div className="md:col-span-2 bg-white border border-[#EBEBE8] rounded-xl p-5 shadow-sm space-y-4">
                    <h3 className="text-xs font-bold text-[#1E1E1C] uppercase tracking-wider font-mono">Guided Scenario Playground</h3>
                    
                    <div className="space-y-4">
                      
                      <div className="p-3 bg-[#FDFDFC] border border-[#EBEBE8] rounded-xl space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-emerald-800">Scenario A: Platinum Tier Lead Checkout</span>
                          <span className="text-[10px] font-mono text-[#A3A39E]">GAAP double-entry ready</span>
                        </div>
                        <p className="text-[11px] text-[#73736E]">
                          Runs an order for a Platinum Level affiliate, applying level commission modifiers (1.3x), Enterprise multi-level boost (1.1x), and registers debit-credits in the platform ledger.
                        </p>
                        <button
                          id="btn-run-scenario-a"
                          onClick={() => {
                            setSimSelectedAff('GIDEON2026');
                            setSimSelectedOpp('opp_omni_family');
                            setSimAmount(200);
                            setSimCustomerType('enterprise');
                            setSimCountry('GB');
                            setSimCampaign('summer_growth_2026');
                            triggerAffiliateConversion('GIDEON2026', 'opp_omni_family', 200, 'enterprise', 'GB', 'summer_growth_2026');
                          }}
                          className="px-3 py-1 bg-white border border-emerald-500/30 text-emerald-800 hover:bg-emerald-50 rounded text-[11px] font-bold"
                        >
                          Launch Platinum Enterprise Order
                        </button>
                      </div>

                      <div className="p-3 bg-[#FDFDFC] border border-[#EBEBE8] rounded-xl space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-amber-800">Scenario B: Self-Referral Shield Trigger</span>
                          <span className="text-[10px] font-mono text-[#A3A39E]">Anti-Fraud Block</span>
                        </div>
                        <p className="text-[11px] text-[#73736E]">
                          Simulates checkout of a customer who normalization matches the partner profile email. Automatically flags threat, generates security alerts, and blocks credit payouts.
                        </p>
                        <button
                          id="btn-run-scenario-b"
                          onClick={() => {
                            // Register user as affiliate with match email to trigger block
                            triggerAffiliateConversion('GIDEON2026', 'opp_omni_family', 100, 'individual', 'US', 'none');
                          }}
                          className="px-3 py-1 bg-white border border-amber-500/30 text-amber-800 hover:bg-amber-50 rounded text-[11px] font-bold"
                        >
                          Simulate Self-Referral Checkout
                        </button>
                      </div>

                      <div className="p-3 bg-[#FDFDFC] border border-[#EBEBE8] rounded-xl space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-red-800">Scenario C: Blackhat Click Spam Shielding</span>
                          <span className="text-[10px] font-mono text-red-500">Security alert fired</span>
                        </div>
                        <p className="text-[11px] text-[#73736E]">
                          Fires a simulated automated script click from highly suspicious bot sources. Automatically records click-spam alerts on the security sentry logs list.
                        </p>
                        <button
                          id="btn-run-scenario-c"
                          onClick={() => {
                            simulateAffiliateClick('EASYMONEY', 'opp_omni_ads');
                          }}
                          className="px-3 py-1 bg-white border border-red-500/30 text-red-800 hover:bg-red-50 rounded text-[11px] font-bold"
                        >
                          Simulate Bot Attack Routing
                        </button>
                      </div>

                      <div className="p-3 bg-[#FDFDFC] border border-[#EBEBE8] rounded-xl space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-indigo-800">Scenario D: Ecosystem Contribution Allocation</span>
                          <span className="text-[10px] font-mono text-indigo-500">Growth points awarded</span>
                        </div>
                        <p className="text-[11px] text-[#73736E]">
                          Awards Gideon Dynasty 5,000 points for authoring useful content. Highlights points separated completely from standard shares.
                        </p>
                        <button
                          id="btn-run-scenario-d"
                          onClick={() => {
                            allocateGrowthReward('aff_gideon_dynasty', 'Gideon Dynasty Group', 'useful_content', 5000, 'Published complete tutorials explaining double-entry API setups.');
                          }}
                          className="px-3 py-1 bg-white border border-indigo-500/30 text-indigo-800 hover:bg-indigo-50 rounded text-[11px] font-bold"
                        >
                          Allocate Geographic Expansion points
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
