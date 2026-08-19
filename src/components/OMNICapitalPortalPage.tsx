import React, { useState } from 'react';
import { 
  TrendingUp, Shield, Users, Landmark, FileText, ChevronRight, CheckCircle2, AlertTriangle, 
  HelpCircle, Plus, Calendar, Settings, Activity, Sparkles, Building, Briefcase, Key, 
  Lock, RefreshCw, FileSpreadsheet, Layers, DollarSign, ArrowUpRight, Scale, Info,
  AlertCircle, Download, Check, ShieldCheck, HardDrive, Network, GitFork
} from 'lucide-react';
import { 
  OMNIState, ShareholderProfile, CapTableConfig, ValuationRecord, InvestmentOffering, 
  ExchangeCredential 
} from '../types';

interface OMNICapitalPortalPageProps {
  state: OMNIState;
  recordValuation: (
    date: string,
    methodology: ValuationRecord['methodology'],
    supportingDocument: string,
    approvingAuthority: string,
    valuationAmount: number,
    notes: string
  ) => void;
  proposeInvestmentOffering: (
    title: string,
    targetAmount: number,
    pricePerShare: number,
    shareClass: string,
    minInvestment: number
  ) => void;
  configureJurisdictionCompliance: (
    offeringId: string,
    licensedProviderName: string,
    eligibilityRules: string,
    jurisdictionConfigured: boolean,
    legalApprovalReceived: boolean,
    kycAmlRulesRequired: boolean,
    investorDisclosuresCount: number
  ) => void;
  mockSimulateAmlKycVerification: (
    shareholderId: string,
    kycStatus: ShareholderProfile['kycStatus']
  ) => void;
  configureExchangeCredentials: (
    credentialId: string,
    providerName: string,
    apiVersion: string,
    endpoint: string,
    status: ExchangeCredential['status']
  ) => void;
  transitionOfferingStatus: (
    offeringId: string,
    status: InvestmentOffering['status']
  ) => void;
  triggerToast: (title: string, description: string, type: 'success' | 'info' | 'error') => void;
}

export default function OMNICapitalPortalPage({
  state,
  recordValuation,
  proposeInvestmentOffering,
  configureJurisdictionCompliance,
  mockSimulateAmlKycVerification,
  configureExchangeCredentials,
  transitionOfferingStatus,
  triggerToast
}: OMNICapitalPortalPageProps) {
  
  // Navigation: 'shareholder_center' | 'cap_table' | 'valuations' | 'offerings' | 'future_exchange'
  const [activeTab, setActiveTab] = useState<'shareholder_center' | 'cap_table' | 'valuations' | 'offerings' | 'future_exchange'>('shareholder_center');

  // Form states
  const [showValuationForm, setShowValuationForm] = useState(false);
  const [newValDate, setNewValDate] = useState('2026-08-15');
  const [newValMethod, setNewValMethod] = useState<ValuationRecord['methodology']>('409A Asset Approach');
  const [newValDoc, setNewValDoc] = useState('Valuation_Audit_Report_v2.pdf');
  const [newValAuthority, setNewValAuthority] = useState('Standard & Chartered Chartered Valuators');
  const [newValAmount, setNewValAmount] = useState('42000000');
  const [newValNotes, setNewValNotes] = useState('');

  // Propose offering states
  const [showOfferingForm, setShowOfferingForm] = useState(false);
  const [newOffTitle, setNewOffTitle] = useState('');
  const [newOffTarget, setNewOffTarget] = useState('5000000');
  const [newOffPrice, setNewOffPrice] = useState('10.00');
  const [newOffClass, setNewOffClass] = useState('Preferred');
  const [newOffMin, setNewOffMin] = useState('10000');

  // Compliance Configuration state
  const [selectedOfferingId, setSelectedOfferingId] = useState<string | null>(null);
  const [providerName, setProviderName] = useState('');
  const [eligibilityRules, setEligibilityRules] = useState('');
  const [jurisdictionConfigured, setJurisdictionConfigured] = useState(false);
  const [legalApprovalReceived, setLegalApprovalReceived] = useState(false);
  const [kycAmlRulesRequired, setKycAmlRulesRequired] = useState(true);
  const [disclosuresCount, setDisclosuresCount] = useState(3);

  // Future exchange credential configuration state
  const [selectedExchangeId, setSelectedExchangeId] = useState<string | null>(null);
  const [exchangeProvider, setExchangeProvider] = useState('');
  const [exchangeApiVersion, setExchangeApiVersion] = useState('v1.0');
  const [exchangeEndpoint, setExchangeEndpoint] = useState('');
  const [exchangeStatus, setExchangeStatus] = useState<ExchangeCredential['status']>('unlicensed');

  // Dilution calculator states
  const [newRoundInvestment, setNewRoundInvestment] = useState('5000000');
  const [newRoundPreMoneyValuation, setNewRoundPreMoneyValuation] = useState('35000000');

  // Find active shareholder profile matching user
  const myShareholder = state.shareholders.find(s => s.userId === state.user?.id);

  // Handlers
  const handleRecordValuation = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(newValAmount);
    if (!newValDate || isNaN(amountNum) || amountNum <= 0) {
      triggerToast('Validation Error', 'Provide a valid date and valuation amount.', 'error');
      return;
    }
    recordValuation(
      newValDate,
      newValMethod,
      newValDoc,
      newValAuthority,
      amountNum,
      newValNotes || 'Formally filed valuation ledger update.'
    );
    setShowValuationForm(false);
    setNewValNotes('');
  };

  const handleProposeOffering = (e: React.FormEvent) => {
    e.preventDefault();
    const targetNum = parseFloat(newOffTarget);
    const priceNum = parseFloat(newOffPrice);
    const minNum = parseFloat(newOffMin);
    if (!newOffTitle || isNaN(targetNum) || isNaN(priceNum) || isNaN(minNum)) {
      triggerToast('Validation Error', 'Please fill in all requested fields with positive values.', 'error');
      return;
    }
    proposeInvestmentOffering(newOffTitle, targetNum, priceNum, newOffClass, minNum);
    setShowOfferingForm(false);
    setNewOffTitle('');
  };

  const handleSaveCompliance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOfferingId) return;
    configureJurisdictionCompliance(
      selectedOfferingId,
      providerName || 'Awaiting licensed custodian provider signoff',
      eligibilityRules || 'Accredited only',
      jurisdictionConfigured,
      legalApprovalReceived,
      kycAmlRulesRequired,
      disclosuresCount
    );
    setSelectedOfferingId(null);
  };

  const handleSaveExchange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExchangeId) return;
    configureExchangeCredentials(
      selectedExchangeId,
      exchangeProvider,
      exchangeApiVersion,
      exchangeEndpoint,
      exchangeStatus
    );
    setSelectedExchangeId(null);
  };

  // Calculations for Cap Table & Dilution
  const totalIssuedShares = state.capTable?.outstandingShares || 10000000;
  const mockCurrentValuation = state.valuationRecords?.[0]?.valuationAmount || 35000000;
  const impliedPricePerShare = totalIssuedShares > 0 ? mockCurrentValuation / totalIssuedShares : 3.5;

  // Implied round metrics
  const investmentVal = parseFloat(newRoundInvestment) || 0;
  const preMoneyVal = parseFloat(newRoundPreMoneyValuation) || 0;
  const postMoneyVal = preMoneyVal + investmentVal;
  const estimatedDilutionPercent = postMoneyVal > 0 ? (investmentVal / postMoneyVal) * 100 : 0;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans p-6 md:p-8" id="capital_ownership_portal">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-200 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Regulated SEC Class</span>
            <span className="text-neutral-400 text-xs font-semibold">Corporate Capital Ledger &amp; Securities Registry</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">Capital, Cap Table &amp; Ownership</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Inspect formal company valuation records, verify your shareholder registry ledger, and manage non-public equity classes securely.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setActiveTab('shareholder_center')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 border ${
              activeTab === 'shareholder_center' 
                ? 'bg-white text-neutral-900 border-neutral-300 shadow-sm' 
                : 'bg-transparent text-neutral-500 border-transparent hover:text-neutral-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Shareholder Center
          </button>

          <button 
            onClick={() => setActiveTab('cap_table')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 border ${
              activeTab === 'cap_table' 
                ? 'bg-white text-neutral-900 border-neutral-300 shadow-sm' 
                : 'bg-transparent text-neutral-500 border-transparent hover:text-neutral-900'
            }`}
          >
            <Landmark className="w-4 h-4" />
            Cap Table &amp; Dilution
          </button>

          <button 
            onClick={() => setActiveTab('valuations')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 border ${
              activeTab === 'valuations' 
                ? 'bg-white text-neutral-900 border-neutral-300 shadow-sm' 
                : 'bg-transparent text-neutral-500 border-transparent hover:text-neutral-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Valuation Records
          </button>

          <button 
            onClick={() => setActiveTab('offerings')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 border ${
              activeTab === 'offerings' 
                ? 'bg-white text-neutral-900 border-neutral-300 shadow-sm' 
                : 'bg-transparent text-neutral-500 border-transparent hover:text-neutral-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Compliance Offerings
          </button>

          <button 
            onClick={() => setActiveTab('future_exchange')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 border ${
              activeTab === 'future_exchange' 
                ? 'bg-white text-neutral-900 border-neutral-300 shadow-sm' 
                : 'bg-transparent text-neutral-500 border-transparent hover:text-neutral-900'
            }`}
          >
            <Network className="w-4 h-4" />
            Exchange Integration
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">

        {/* ====================================================================== */}
        {/* WARNINGS & REGULATORY ISOLATION BAR */}
        {/* ====================================================================== */}
        <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-md border border-neutral-800 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 border-r border-neutral-800 pr-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-500 mb-2">
                <Shield className="w-5 h-5" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest">Legal Separation</span>
              </div>
              <h3 className="text-md font-bold text-neutral-100">Economic Category Isolation</h3>
              <p className="text-[11px] text-neutral-400 font-normal mt-1 leading-relaxed">
                By corporate charter, OMNI maintains absolute legal segregation between growth loyalty benefits and actual corporate security classes.
              </p>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
              <span className="text-[9px] block font-extrabold uppercase text-rose-500 tracking-wider">Affiliate Commission</span>
              <p className="text-xs text-neutral-300 mt-1 font-medium">Sales referrals. Fully withdrawable USD via partner escrow balances.</p>
              <span className="text-[9px] text-neutral-500 mt-2 block font-semibold">Not Equity • Liquid Asset</span>
            </div>
            
            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
              <span className="text-[9px] block font-extrabold uppercase text-rose-500 tracking-wider">Reseller Rev Share</span>
              <p className="text-xs text-neutral-300 mt-1 font-medium">Yield calculated from active decentralized white-label cloud node rents.</p>
              <span className="text-[9px] text-neutral-500 mt-2 block font-semibold">Contractual • Non-Security</span>
            </div>

            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
              <span className="text-[9px] block font-extrabold uppercase text-rose-500 tracking-wider">Growth &amp; Loyalty</span>
              <p className="text-xs text-neutral-300 mt-1 font-medium">Non-transferable developer points redeemed for API credits or free servers.</p>
              <span className="text-[9px] text-neutral-500 mt-2 block font-semibold">Promo Credits • No Basis</span>
            </div>

            <div className="p-3 bg-rose-950/20 rounded-xl border border-rose-900/30">
              <span className="text-[9px] block font-extrabold uppercase text-white tracking-wider">Investment Securities</span>
              <p className="text-xs text-rose-200 mt-1 font-medium">Formal private stock certificates under standard board resolution cost basis.</p>
              <span className="text-[9px] text-rose-400 mt-2 block font-semibold">Regulated Class • Non-Public</span>
            </div>
          </div>
        </div>

        {/* ====================================================================== */}
        {/* TAB 1: SHAREHOLDER CENTER */}
        {/* ====================================================================== */}
        {activeTab === 'shareholder_center' && (
          <div className="space-y-6">
            
            {myShareholder ? (
              /* Verified Investor Profile Card */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Profile and Cost Basis Widget */}
                <div className="lg:col-span-1 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-lg">
                      {myShareholder.name?.split(' ').map(n => n?.[0] || '').join('') || 'SH'}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-neutral-900">{myShareholder.name}</h3>
                      <p className="text-xs text-neutral-400 font-normal">{myShareholder.email}</p>
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-4 space-y-3">
                    <div>
                      <span className="text-[10px] block font-bold uppercase text-neutral-400">Security Certificate Class</span>
                      <span className="text-xs font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded mt-1 inline-block">
                        {myShareholder.shareClass}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] block uppercase text-neutral-400 font-bold">Total Shares</span>
                        <span className="text-md font-extrabold text-neutral-950">
                          {myShareholder.unitCount.toLocaleString()} units
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] block uppercase text-neutral-400 font-bold">Ownership Percentage</span>
                        <span className="text-md font-extrabold text-rose-600">
                          {myShareholder.ownershipPercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[10px] block uppercase text-neutral-400 font-bold">Cost Basis</span>
                        <span className="text-sm font-bold text-neutral-700">
                          ${myShareholder.costBasisUsd.toFixed(2)} / unit
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] block uppercase text-neutral-400 font-bold">Implied Value</span>
                        <span className="text-sm font-bold text-emerald-600">
                          ${(myShareholder.unitCount * impliedPricePerShare).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] block uppercase text-neutral-400 font-bold">Acquisition Record</span>
                      <span className="text-[11px] text-neutral-500 font-normal">
                        Filed {new Date(myShareholder.acquiredAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] block uppercase text-neutral-400 font-bold mb-1.5">KYC/AML Status</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase font-extrabold px-2 py-1 rounded ${
                          myShareholder.kycStatus === 'verified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          myShareholder.kycStatus === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-neutral-100 text-neutral-700'
                        }`}>
                          {myShareholder.kycStatus}
                        </span>

                        {myShareholder.kycStatus !== 'verified' && (
                          <button 
                            onClick={() => {
                              mockSimulateAmlKycVerification(myShareholder.id, 'verified');
                            }}
                            className="text-[10px] bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-2.5 py-1 rounded transition-all"
                          >
                            Simulate KYC Clear
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Documents, Voting & Announcements */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Corporate Documents Download Vault */}
                  <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider">Corporate Documents Vault</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {myShareholder.corporateDocuments.map((doc, i) => (
                        <div key={i} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-4 h-4 text-rose-500 shrink-0" />
                            <span className="text-xs font-bold text-neutral-800 truncate">{doc}</span>
                          </div>
                          <button 
                            onClick={() => triggerToast('Download Initiated', `Downloaded certified copy of ${doc}.`, 'success')}
                            className="text-neutral-500 hover:text-neutral-900 p-1"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shareholder Voting Rights & Dividend Distributions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-3">
                      <div className="flex items-center gap-2 text-rose-600">
                        <Scale className="w-4 h-4" />
                        <h4 className="text-xs uppercase font-extrabold tracking-wider">Voting Rights Allocation</h4>
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                        Class A Voting shares carry **10 votes per unit**. As an active class holder, you are permitted to cast structured board ballots on OMNI operational bylaws.
                      </p>
                      <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-600">Ballot Voting Power:</span>
                        <strong className="text-neutral-900">
                          {myShareholder.shareClass === 'Class A Voting' ? (myShareholder.unitCount * 10).toLocaleString() : '0'} votes
                        </strong>
                      </div>
                    </div>

                    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-3">
                      <div className="flex items-center gap-2 text-emerald-600">
                        <DollarSign className="w-4 h-4" />
                        <h4 className="text-xs uppercase font-extrabold tracking-wider">Dividend Distribution Log</h4>
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                        Private equity distribution cycles are processed strictly via formal board of director resolutions, in conformity with corporate laws.
                      </p>
                      <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100 text-xs text-neutral-400 text-center font-normal">
                        No active distribution cycles are scheduled.
                      </div>
                    </div>

                  </div>

                  {/* Shareholders Announcements Board */}
                  <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-3">
                    <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider">Corporate Shareholder Board Announcements</h4>
                    <div className="border border-neutral-200 rounded-xl divide-y divide-neutral-100 overflow-hidden">
                      <div className="p-4 bg-neutral-50">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase bg-rose-50 text-rose-700 px-2 py-0.5 rounded">Bylaw Resolution</span>
                          <span className="text-[10px] text-neutral-400 font-semibold">2026-07-28</span>
                        </div>
                        <h5 className="text-xs font-bold text-neutral-900 mt-2">Annual General Meeting &amp; Cap Table Re-certification</h5>
                        <p className="text-xs text-neutral-500 font-normal leading-relaxed mt-1">
                          The board ratified the latest 409A valuation audit confirming the fair market value of standard Class B non-voting share equity at $3.50/unit.
                        </p>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Financial Audit</span>
                          <span className="text-[10px] text-neutral-400 font-semibold">2026-05-12</span>
                        </div>
                        <h5 className="text-xs font-bold text-neutral-900 mt-2">Filing of Q2 Consolidated Ledger Summary</h5>
                        <p className="text-xs text-neutral-500 font-normal leading-relaxed mt-1">
                          Independent auditors certified OMNI's double-entry master ledger integrity. Isolated reselling streams matched standard accounts perfectly.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ) : (
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center text-xs text-neutral-400 max-w-md mx-auto">
                No personalized shareholder record detected for your user ID. Enter the superadmin console or file valuations to manage master allocations.
              </div>
            )}

          </div>
        )}

        {/* ====================================================================== */}
        {/* TAB 2: CAP TABLE */}
        {/* ====================================================================== */}
        {activeTab === 'cap_table' && (
          <div className="space-y-6">
            
            {/* Ledger Capital Overview Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <div>
                <span className="text-[10px] block uppercase text-neutral-400 font-bold">Authorized Shares Pool</span>
                <div className="text-xl font-extrabold text-neutral-900 mt-1">
                  {state.capTable.authorizedShares.toLocaleString()} units
                </div>
                <span className="text-[10px] text-neutral-400">Total permissible ceiling</span>
              </div>
              <div>
                <span className="text-[10px] block uppercase text-neutral-400 font-bold">Issued &amp; Outstanding</span>
                <div className="text-xl font-extrabold text-neutral-900 mt-1">
                  {state.capTable.issuedShares.toLocaleString()} units
                </div>
                <span className="text-[10px] text-rose-600 font-semibold">
                  {((state.capTable.issuedShares / state.capTable.authorizedShares) * 100).toFixed(1)}% of authorized allocation
                </span>
              </div>
              <div>
                <span className="text-[10px] block uppercase text-neutral-400 font-bold">Incentive Option Pool</span>
                <div className="text-xl font-extrabold text-neutral-900 mt-1">
                  {state.capTable.optionPoolShares.toLocaleString()} units
                </div>
                <span className="text-[10px] text-neutral-400">Reserved for team retention</span>
              </div>
              <div>
                <span className="text-[10px] block uppercase text-neutral-400 font-bold">Implied Ledger Value</span>
                <div className="text-xl font-extrabold text-emerald-600 mt-1">
                  ${mockCurrentValuation.toLocaleString()}
                </div>
                <span className="text-[10px] text-neutral-500 font-medium">Implied price: ${impliedPricePerShare.toFixed(2)}/unit</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Table of Share Classes */}
              <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider">Share Classes &amp; Allocations</h4>
                <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-100 text-xs">
                  <div className="bg-neutral-50 p-3 font-bold text-neutral-400 uppercase tracking-wider text-[10px] grid grid-cols-12 gap-2">
                    <span className="col-span-4">Class Name</span>
                    <span className="col-span-4">Description</span>
                    <span className="col-span-2 text-right">Units Issued</span>
                    <span className="col-span-2 text-right">Vote Multiplier</span>
                  </div>
                  {state.capTable.shareClasses.map((cls, idx) => (
                    <div key={idx} className="p-3 grid grid-cols-12 gap-2 hover:bg-neutral-50">
                      <span className="col-span-4 font-bold text-neutral-900">{cls.name}</span>
                      <span className="col-span-4 text-neutral-400 font-normal leading-relaxed">{cls.description}</span>
                      <span className="col-span-2 text-right font-semibold text-neutral-700">{cls.issuedUnits.toLocaleString()}</span>
                      <span className="col-span-2 text-right font-semibold text-neutral-600">{cls.votingPowerMultiplier}x</span>
                    </div>
                  ))}
                </div>

                {/* List of Registered Shareholders */}
                <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider pt-2">Detailed Stock Registry Ledger</h4>
                <div className="border border-neutral-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-neutral-50 text-neutral-400 font-bold uppercase tracking-wider text-[10px] border-b border-neutral-200">
                      <tr>
                        <th className="p-3">Shareholder Name</th>
                        <th className="p-3">Class</th>
                        <th className="p-3 text-right">Units Held</th>
                        <th className="p-3 text-right">Cost Basis</th>
                        <th className="p-3 text-right">Ownership</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {state.shareholders.map((sh) => (
                        <tr key={sh.id} className="hover:bg-neutral-50">
                          <td className="p-3 font-bold text-neutral-900">{sh.name}</td>
                          <td className="p-3">
                            <span className="bg-neutral-100 text-neutral-700 text-[10px] px-1.5 py-0.5 rounded font-bold">
                              {sh.shareClass}
                            </span>
                          </td>
                          <td className="p-3 text-right font-semibold">{sh.unitCount.toLocaleString()}</td>
                          <td className="p-3 text-right text-neutral-500">${sh.costBasisUsd.toFixed(2)}</td>
                          <td className="p-3 text-right font-bold text-rose-600">{sh.ownershipPercent.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Interactive Dilution & Round Simulator */}
              <div className="lg:col-span-1 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-rose-600">
                  <Activity className="w-4 h-4" />
                  <h4 className="text-xs uppercase font-extrabold tracking-wider">Dilution &amp; Round Simulator</h4>
                </div>
                <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                  Evaluate funding round effects on the capital pool before drafting binding corporate board sheets.
                </p>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[10px] uppercase text-neutral-400 font-bold block mb-1">Target New Round Investment (USD)</label>
                    <input 
                      type="number" 
                      value={newRoundInvestment}
                      onChange={(e) => setNewRoundInvestment(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase text-neutral-400 font-bold block mb-1">Assumed Pre-Money Valuation (USD)</label>
                    <input 
                      type="number" 
                      value={newRoundPreMoneyValuation}
                      onChange={(e) => setNewRoundPreMoneyValuation(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 p-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-400"
                    />
                  </div>

                  {/* Math Breakdown Panel */}
                  <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-normal">Implied Post-Money Valuation:</span>
                      <strong className="text-neutral-900">${postMoneyVal.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-normal">Implied New Investor Ownership:</span>
                      <strong className="text-rose-600">{estimatedDilutionPercent.toFixed(2)}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500 font-normal">Estimated Founder Dilution:</span>
                      <strong className="text-neutral-700">-{estimatedDilutionPercent.toFixed(2)}% of original pool</strong>
                    </div>
                  </div>

                  <div className="text-[10px] text-amber-600 bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="font-medium">
                      Simulated models do not update the actual stock registry ledger. Final stock certificate updates require explicit board of director approval and signature.
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ====================================================================== */}
        {/* TAB 3: VALUATION RECORDS */}
        {/* ====================================================================== */}
        {activeTab === 'valuations' && (
          <div className="space-y-6">
            
            <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
              <div>
                <h3 className="text-sm uppercase font-extrabold text-neutral-400 tracking-wider">Formal 409A Asset &amp; Fair Market Valuations</h3>
                <p className="text-xs text-neutral-500 mt-0.5">Formal company valuations are logged solely via recorded events passed by auditors.</p>
              </div>

              {state.user?.role === 'superadmin' && (
                <button 
                  onClick={() => setShowValuationForm(!showValuationForm)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Record Valuation Event
                </button>
              )}
            </div>

            {/* Valuation Recording Modal Form */}
            {showValuationForm && (
              <form onSubmit={handleRecordValuation} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm max-w-xl mx-auto space-y-4">
                <div className="flex items-center gap-2 text-rose-600 mb-2 pb-2 border-b border-neutral-100">
                  <Landmark className="w-5 h-5" />
                  <h4 className="text-sm font-bold">Record Formal Valuation resolution</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Effective Date</label>
                    <input 
                      type="date" 
                      required
                      value={newValDate}
                      onChange={(e) => setNewValDate(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Methodology</label>
                    <select 
                      value={newValMethod}
                      onChange={(e: any) => setNewValMethod(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2 rounded-lg focus:outline-none"
                    >
                      <option value="409A Asset Approach">409A Asset Approach</option>
                      <option value="Discounted Cash Flow (DCF)">Discounted Cash Flow (DCF)</option>
                      <option value="Comparable Market Multiples">Comparable Market Multiples</option>
                      <option value="Precedent Transactions">Precedent Transactions</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Valuation Amount (USD)</label>
                    <input 
                      type="number" 
                      required
                      value={newValAmount}
                      onChange={(e) => setNewValAmount(e.target.value)}
                      placeholder="e.g., 35000000"
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Auditing approving Authority</label>
                    <input 
                      type="text" 
                      required
                      value={newValAuthority}
                      onChange={(e) => setNewValAuthority(e.target.value)}
                      placeholder="e.g., Ernst &amp; Young LLC"
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Certified Supporting Audit Document (.pdf)</label>
                  <input 
                    type="text" 
                    required
                    value={newValDoc}
                    onChange={(e) => setNewValDoc(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2 rounded-lg focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Notes / Supporting Rationale</label>
                  <textarea 
                    rows={3}
                    value={newValNotes}
                    onChange={(e) => setNewValNotes(e.target.value)}
                    placeholder="Enter valuation multiples, discount rate parameters, and ledger growth assumptions."
                    className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2 rounded-lg focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <button 
                    type="button"
                    onClick={() => setShowValuationForm(false)}
                    className="px-4 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-900"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-rose-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-rose-700 transition-all"
                  >
                    Commit Valuation Record
                  </button>
                </div>
              </form>
            )}

            {/* List of Valuations */}
            <div className="space-y-4">
              {state.valuationRecords.map((val) => (
                <div key={val.id} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6 hover:shadow-md transition-all">
                  <div className="md:col-span-1 border-r border-neutral-100 pr-4">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Recorded Date</span>
                    <h4 className="text-sm font-bold text-neutral-900 mt-1">
                      {new Date(val.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </h4>
                    <span className="text-xs text-rose-600 bg-rose-50 px-2 py-0.5 rounded font-extrabold uppercase mt-2 inline-block">
                      {val.methodology}
                    </span>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">Approving Regulatory Authority</span>
                      <span className="text-xs text-neutral-800 font-semibold">{val.approvingAuthority}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">Filing Notes</span>
                      <p className="text-xs text-neutral-500 font-normal leading-relaxed mt-0.5">{val.notes}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-blue-600 hover:underline cursor-pointer" onClick={() => triggerToast('Download Audit Document', `Downloading certified proof document: ${val.supportingDocument}`, 'success')}>
                      <FileText className="w-4 h-4 shrink-0" />
                      <span>{val.supportingDocument}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1 flex flex-col justify-center items-end">
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Formally Certified Value</span>
                    <div className="text-2xl font-black text-rose-600 mt-1">
                      ${val.valuationAmount.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-neutral-400">USD Sovereign Balance</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ====================================================================== */}
        {/* TAB 4: COMPLIANCE OFFERINGS */}
        {/* ====================================================================== */}
        {activeTab === 'offerings' && (
          <div className="space-y-6">
            
            <div className="flex justify-between items-center pb-4 border-b border-neutral-200">
              <div>
                <h3 className="text-sm uppercase font-extrabold text-neutral-400 tracking-wider">Investment Offerings Framework</h3>
                <p className="text-xs text-neutral-500 mt-0.5">By regulatory mandate, public capital collections are disabled by default until compliance criteria are certified.</p>
              </div>

              {state.user?.role === 'superadmin' && (
                <button 
                  onClick={() => setShowOfferingForm(!showOfferingForm)}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Propose Offering
                </button>
              )}
            </div>

            {/* Propose Offering Form */}
            {showOfferingForm && (
              <form onSubmit={handleProposeOffering} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm max-w-xl mx-auto space-y-4">
                <div className="flex items-center gap-2 text-rose-600 mb-2 pb-2 border-b border-neutral-100">
                  <Briefcase className="w-5 h-5" />
                  <h4 className="text-sm font-bold">Propose New Private Placement Offering</h4>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Offering Title</label>
                  <input 
                    type="text" 
                    required
                    value={newOffTitle}
                    onChange={(e) => setNewOffTitle(e.target.value)}
                    placeholder="e.g., Sovereign Ledger Series A Extension"
                    className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2.5 rounded-lg focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Target Capital Raise (USD)</label>
                    <input 
                      type="number" 
                      required
                      value={newOffTarget}
                      onChange={(e) => setNewOffTarget(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Cost Per Share Unit (USD)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={newOffPrice}
                      onChange={(e) => setNewOffPrice(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Share Security Class</label>
                    <select 
                      value={newOffClass}
                      onChange={(e) => setNewOffClass(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2 rounded-lg focus:outline-none"
                    >
                      <option value="Preferred">Preferred Stock</option>
                      <option value="Class A Voting">Class A Voting</option>
                      <option value="Class B Non-Voting">Class B Non-Voting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Minimum Ticket Investment (USD)</label>
                    <input 
                      type="number" 
                      required
                      value={newOffMin}
                      onChange={(e) => setNewOffMin(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 text-[11px] text-neutral-500 leading-relaxed">
                  Proposed offerings start strictly in a <strong>Draft (compliance disabled)</strong> state. Direct investor transfers cannot be made until licensed brokers, accredited rules, and SEC disclosures are committed.
                </div>

                <div className="flex gap-2 justify-end">
                  <button 
                    type="button"
                    onClick={() => setShowOfferingForm(false)}
                    className="px-4 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-900"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-rose-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-rose-700 transition-all"
                  >
                    Initialize Draft
                  </button>
                </div>
              </form>
            )}

            {/* Displaying Offerings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {state.investmentOfferings.map((off) => (
                <div key={off.id} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
                  
                  {/* Top segment with status */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        off.status === 'open' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        off.status === 'draft' ? 'bg-neutral-100 text-neutral-500' :
                        off.status === 'compliance_review' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {off.status.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-semibold">Offering ID: {off.id}</span>
                    </div>

                    <h4 className="text-md font-bold text-neutral-900">{off.title}</h4>
                    <p className="text-xs text-neutral-500 font-normal leading-relaxed">{off.eligibilityRules}</p>
                  </div>

                  {/* Pricing parameters grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-100 text-xs">
                    <div>
                      <span className="text-[9px] block text-neutral-400 font-bold uppercase">Target Raise</span>
                      <span className="font-bold text-neutral-800">${off.targetAmount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[9px] block text-neutral-400 font-bold uppercase">Price/Unit</span>
                      <span className="font-bold text-neutral-800">${off.pricePerShare.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-[9px] block text-neutral-400 font-bold uppercase">Min Ticket</span>
                      <span className="font-bold text-neutral-800">${off.minInvestment.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Compliance Verification checklist */}
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 space-y-2">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-neutral-400 block mb-1">
                      Regulatory Gate Certification Check
                    </span>
                    
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-neutral-500">Jurisdiction Configuration:</span>
                      <span className="flex items-center gap-1">
                        {off.jurisdictionConfigured ? (
                          <Check className="w-4 h-4 text-emerald-600 font-bold" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-neutral-400" />
                        )}
                        <span className={off.jurisdictionConfigured ? "text-emerald-700 font-bold" : "text-neutral-400"}>
                          {off.jurisdictionConfigured ? "Verified SEC Form-D" : "Awaiting Config"}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-neutral-500">Licensed Broker/Custodian:</span>
                      <span className="text-neutral-700 truncate max-w-[150px]" title={off.licensedProviderName}>
                        {off.licensedProviderName}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-neutral-500">Legal Counsel Approvals:</span>
                      <span className={off.legalApprovalReceived ? "text-emerald-700 font-bold" : "text-rose-600 font-bold"}>
                        {off.legalApprovalReceived ? "Signed Resolution" : "Board Signature Locked"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-neutral-500">Securities Disclosures filed:</span>
                      <span className="text-neutral-700 font-bold">
                        {off.investorDisclosuresCount} documents
                      </span>
                    </div>
                  </div>

                  {/* Admin controls to configure compliance or trigger state transitions */}
                  {state.user?.role === 'superadmin' && (
                    <div className="pt-4 flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setSelectedOfferingId(off.id);
                          setProviderName(off.licensedProviderName);
                          setEligibilityRules(off.eligibilityRules);
                          setJurisdictionConfigured(off.jurisdictionConfigured);
                          setLegalApprovalReceived(off.legalApprovalReceived);
                          setKycAmlRulesRequired(off.kycAmlRulesRequired);
                          setDisclosuresCount(off.investorDisclosuresCount);
                        }}
                        className="flex-1 bg-white border border-neutral-300 text-neutral-700 text-xs font-bold py-2 rounded-lg hover:bg-neutral-100 transition-all flex items-center justify-center gap-1"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        Configure Gates
                      </button>

                      {off.status === 'draft' && (
                        <button 
                          onClick={() => transitionOfferingStatus(off.id, 'compliance_review')}
                          className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-2 rounded-lg transition-all"
                        >
                          Submit For Audit
                        </button>
                      )}

                      {off.status === 'compliance_review' && (
                        <button 
                          onClick={() => {
                            if (!off.jurisdictionConfigured || !off.legalApprovalReceived) {
                              triggerToast('Action Blocked', 'Complete all compliance parameters before approving.', 'error');
                              return;
                            }
                            transitionOfferingStatus(off.id, 'approved');
                          }}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-lg transition-all"
                        >
                          Approve Offering
                        </button>
                      )}

                      {off.status === 'approved' && (
                        <button 
                          onClick={() => transitionOfferingStatus(off.id, 'open')}
                          className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-2 rounded-lg transition-all"
                        >
                          Open To Allotted
                        </button>
                      )}

                      {off.status === 'open' && (
                        <button 
                          onClick={() => transitionOfferingStatus(off.id, 'closed')}
                          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2 rounded-lg transition-all"
                        >
                          Close Offering
                        </button>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Compliance Modal Gate Sheet */}
            {selectedOfferingId && (
              <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <form onSubmit={handleSaveCompliance} className="bg-white rounded-3xl border border-neutral-200 p-6 max-w-lg w-full space-y-4 shadow-xl">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                    <h3 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wider">Configure Compliance Gates</h3>
                    <button type="button" onClick={() => setSelectedOfferingId(null)} className="text-neutral-400 hover:text-neutral-900 text-sm">✕</button>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Licensed Provider / Custodian</label>
                    <input 
                      type="text" 
                      value={providerName}
                      onChange={(e) => setProviderName(e.target.value)}
                      placeholder="e.g., Sovereign Securities Trust LLC"
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2.5 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Investor Eligibility Rules</label>
                    <textarea 
                      rows={2}
                      value={eligibilityRules}
                      onChange={(e) => setEligibilityRules(e.target.value)}
                      placeholder="e.g., Accredited investors under Rule 506(c) only."
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2.5 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                      <span className="text-neutral-600">Form-D Jurisdiction filed</span>
                      <input 
                        type="checkbox" 
                        checked={jurisdictionConfigured}
                        onChange={(e) => setJurisdictionConfigured(e.target.checked)}
                        className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                      />
                    </div>

                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
                      <span className="text-neutral-600">Board Legal Approval signed</span>
                      <input 
                        type="checkbox" 
                        checked={legalApprovalReceived}
                        onChange={(e) => setLegalApprovalReceived(e.target.checked)}
                        className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
                      <span className="text-neutral-600 font-medium">Enforce KYC/AML Check</span>
                      <input 
                        type="checkbox" 
                        checked={kycAmlRulesRequired}
                        onChange={(e) => setKycAmlRulesRequired(e.target.checked)}
                        className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Investor Disclosures filed</label>
                      <input 
                        type="number" 
                        value={disclosuresCount}
                        onChange={(e) => setDisclosuresCount(parseInt(e.target.value) || 0)}
                        className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button 
                      type="button"
                      onClick={() => setSelectedOfferingId(null)}
                      className="px-4 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="bg-neutral-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-neutral-800 transition-all"
                    >
                      Commit Compliance Gates
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}

        {/* ====================================================================== */}
        {/* TAB 5: FUTURE EXCHANGE ARCHITECTURE */}
        {/* ====================================================================== */}
        {activeTab === 'future_exchange' && (
          <div className="space-y-6">
            
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 flex gap-4">
              <ShieldCheck className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-rose-950 uppercase tracking-wide">SEC &amp; MiFID II Compliance Lockout</h4>
                <p className="text-xs text-rose-800 font-normal leading-relaxed mt-1">
                  Public trading of equity class shares is disabled on this sandbox client. Connection interfaces exist strictly to demo future licensed exchange bridges (such as NASDAQ Digital Listing or NYSE Sovereign Equity Gateways) once appropriately licensed legal and market liquidity providers are explicitly configured by administrators.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* List of Exchange Adapters */}
              <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider">Future Exchange Bridges</h4>
                
                <div className="space-y-4">
                  {state.exchangeCredentials.map((cred) => (
                    <div key={cred.id} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-950 text-xs">{cred.providerName}</span>
                          <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            cred.status === 'connected' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            cred.status === 'unlicensed' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                            'bg-neutral-100 text-neutral-500'
                          }`}>
                            {cred.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 font-mono">{cred.endpoint}</p>
                        <span className="text-[10px] text-neutral-500 font-normal">API Version: {cred.apiVersion}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {state.user?.role === 'superadmin' && (
                          <button 
                            onClick={() => {
                              setSelectedExchangeId(cred.id);
                              setExchangeProvider(cred.providerName);
                              setExchangeApiVersion(cred.apiVersion);
                              setExchangeEndpoint(cred.endpoint);
                              setExchangeStatus(cred.status);
                            }}
                            className="bg-white border border-neutral-300 text-neutral-700 text-xs font-semibold px-2.5 py-1.5 rounded hover:bg-neutral-100 transition-all"
                          >
                            Edit Adapter
                          </button>
                        )}

                        {cred.status === 'connected' && (
                          <span className="text-xs text-neutral-500 font-semibold flex items-center gap-1">
                            <Key className="w-3.5 h-3.5 text-rose-500" /> API Keys active
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Endpoint Documentation Demo */}
              <div className="lg:col-span-1 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-rose-600">
                  <FileSpreadsheet className="w-4 h-4" />
                  <h4 className="text-xs uppercase font-extrabold tracking-wider font-mono">POST /api/v1/listings/liquidity</h4>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                  Pre-configured interface blueprint mapping securities ledger to institutional clearing networks.
                </p>

                <div className="bg-neutral-900 text-neutral-100 p-4 rounded-xl font-mono text-[10px] space-y-2 max-h-52 overflow-y-auto">
                  <span className="text-rose-400 font-bold">Inbound Webhook payload:</span>
                  <pre className="text-neutral-300">
{`{
  "ticker": "OMNI",
  "clearingHouse": "DTCC_SEC",
  "shareClass": "Preferred",
  "settlementType": "T_ZERO",
  "authorizedLiquidity": 1000000
}`}
                  </pre>
                  <span className="text-neutral-500 font-bold block pt-2">Simulated Gateway Response:</span>
                  <span className="text-rose-400 font-bold block">401 Unauthorized</span>
                  <span className="text-neutral-400 block text-[9px]">
                    "Access blocked. Gateway status is currently set to UNLICENSED. Establish Form-D filings and clear legal signatures to activate real DTCC routing."
                  </span>
                </div>
              </div>

            </div>

            {/* Exchange Configuration Modal */}
            {selectedExchangeId && (
              <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <form onSubmit={handleSaveExchange} className="bg-white rounded-3xl border border-neutral-200 p-6 max-w-sm w-full space-y-4 shadow-xl">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                    <h3 className="text-sm font-extrabold text-neutral-900 uppercase tracking-wider">Configure Exchange Bridge</h3>
                    <button type="button" onClick={() => setSelectedExchangeId(null)} className="text-neutral-400 hover:text-neutral-900 text-sm">✕</button>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Exchange Provider Name</label>
                    <input 
                      type="text" 
                      value={exchangeProvider}
                      onChange={(e) => setExchangeProvider(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2.5 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">API Version</label>
                      <input 
                        type="text" 
                        value={exchangeApiVersion}
                        onChange={(e) => setExchangeApiVersion(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2.5 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Status</label>
                      <select 
                        value={exchangeStatus}
                        onChange={(e: any) => setExchangeStatus(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2.5 rounded-lg focus:outline-none"
                      >
                        <option value="unlicensed">Unlicensed (Locked)</option>
                        <option value="disconnected">Disconnected</option>
                        <option value="connected">Connected (Simulated)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 font-bold mb-1">Endpoint Path</label>
                    <input 
                      type="text" 
                      value={exchangeEndpoint}
                      onChange={(e) => setExchangeEndpoint(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 text-xs p-2.5 rounded-lg focus:outline-none font-mono"
                    />
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button 
                      type="button"
                      onClick={() => setSelectedExchangeId(null)}
                      className="px-4 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-900"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="bg-neutral-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-neutral-800 transition-all"
                    >
                      Apply Adapter settings
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
