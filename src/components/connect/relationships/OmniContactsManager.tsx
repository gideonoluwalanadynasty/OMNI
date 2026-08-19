import React, { useState, useMemo } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Mail,
  Phone,
  Building2,
  Tag,
  DollarSign,
  Calendar,
  MessageSquare,
  Shield,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  FileSpreadsheet,
  Download,
  Upload,
  ChevronRight,
  X,
  Plus,
  Lock,
  ArrowRight,
  SlidersHorizontal,
  ExternalLink,
  Award,
  Video
} from 'lucide-react';
import {
  OmniUniversalContact,
  OmniCircle,
  ContactLifecycleStage,
  ContactSource,
  OmniRelationshipKind
} from '../../../types/omni_relationship_graph';
import { ConnectCrmDeal } from '../../../types/omni_connect';

interface OmniContactsManagerProps {
  contacts: OmniUniversalContact[];
  circles: OmniCircle[];
  deals: ConnectCrmDeal[];
  onAddContact: (contact: Omit<OmniUniversalContact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateContact: (contactId: string, updates: Partial<OmniUniversalContact>) => void;
  onDeleteContact: (contactId: string) => void;
  onImportContacts: (source: ContactSource, rawContacts: Array<Partial<OmniUniversalContact>>) => void;
  onConvertLifecycle: (contactId: string, newStage: ContactLifecycleStage, dealValue?: number, notes?: string) => void;
  onLogInteraction: (contactId: string, interaction: { type: any; title: string; notes: string; outcome?: string; actorName: string }) => void;
  onOpenMeeting?: () => void;
}

export const OmniContactsManager: React.FC<OmniContactsManagerProps> = ({
  contacts,
  circles,
  deals,
  onAddContact,
  onUpdateContact,
  onDeleteContact,
  onImportContacts,
  onConvertLifecycle,
  onLogInteraction,
  onOpenMeeting
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<ContactLifecycleStage | 'all'>('all');
  const [selectedCircleId, setSelectedCircleId] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<ContactSource | 'all'>('all');
  const [selectedContact, setSelectedContact] = useState<OmniUniversalContact | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isLifecycleModalOpen, setIsLifecycleModalOpen] = useState(false);
  const [isInteractionModalOpen, setIsInteractionModalOpen] = useState(false);

  // New Contact Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newJob, setNewJob] = useState('');
  const [newStage, setNewStage] = useState<ContactLifecycleStage>('contact');
  const [newRelType, setNewRelType] = useState<OmniRelationshipKind>('lead');
  const [newCircleIds, setNewCircleIds] = useState<string[]>(['circle_leads_pipeline']);
  const [newDealValue, setNewDealValue] = useState(15000);
  const [newHandle, setNewHandle] = useState('');

  // Lifecycle Conversion Form State
  const [targetStage, setTargetStage] = useState<ContactLifecycleStage>('customer');
  const [conversionDealValue, setConversionDealValue] = useState(50000);
  const [conversionNotes, setConversionNotes] = useState('');

  // Interaction Form State
  const [interactionType, setInteractionType] = useState<'meeting' | 'call' | 'message' | 'email' | 'order' | 'note'>('meeting');
  const [interactionTitle, setInteractionTitle] = useState('');
  const [interactionNotes, setInteractionNotes] = useState('');
  const [interactionOutcome, setInteractionOutcome] = useState('Productive discussion');

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      if (selectedStage !== 'all' && c.lifecycleStage !== selectedStage) return false;
      if (selectedCircleId !== 'all' && !c.circleIds.includes(selectedCircleId)) return false;
      if (selectedSource !== 'all' && c.source !== selectedSource) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchEmail = c.email?.toLowerCase().includes(q);
        const matchOrg = c.organisation?.toLowerCase().includes(q);
        const matchTag = c.tags.some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchEmail && !matchOrg && !matchTag) return false;
      }
      return true;
    });
  }, [contacts, selectedStage, selectedCircleId, selectedSource, searchQuery]);

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onAddContact({
      tenantId: 'tenant_primary_001',
      ownerProfileId: 'prof_gideon_001',
      source: 'manual',
      name: newName,
      displayName: newName,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,
      jobTitle: newJob || 'Executive',
      organisation: newOrg || 'Independent',
      department: 'Executive',
      phone: newPhone || '+1 (555) 012-3456',
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '')}@omni.universe`,
      address: 'Global Hub',
      linkedOmniHandle: newHandle ? (newHandle.startsWith('@') ? newHandle : `@${newHandle}`) : undefined,
      relationshipType: newRelType,
      lifecycleStage: newStage,
      circleIds: newCircleIds,
      tags: ['Manual', newStage.toUpperCase()],
      notes: 'Direct relationship created via Universal Contacts Manager.',
      dealValue: newDealValue,
      currency: 'USD',
      leadScore: 80,
      interactions: [],
      orders: [],
      messagesCount: 0,
      eventsAttended: [],
      consent: {
        status: 'granted',
        grantedAt: new Date().toISOString(),
        legalBasis: 'explicit_consent',
        scope: ['crm_analytics', 'direct_messaging'],
        proofHash: `sha256:consent_manual_${Date.now()}`
      },
      lastContactedAt: new Date().toISOString(),
      isFavorite: false
    });

    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewOrg('');
    setNewJob('');
    setNewHandle('');
  };

  const handleExecuteLifecycleConversion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) return;
    onConvertLifecycle(selectedContact.id, targetStage, conversionDealValue, conversionNotes);
    setIsLifecycleModalOpen(false);
    // Refresh selected contact view
    const updated = contacts.find(c => c.id === selectedContact.id);
    if (updated) setSelectedContact(updated);
  };

  const handleLogInteraction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact || !interactionTitle.trim()) return;

    onLogInteraction(selectedContact.id, {
      type: interactionType,
      title: interactionTitle,
      notes: interactionNotes,
      outcome: interactionOutcome,
      actorName: 'Gideon Oluwalanadynasty'
    });

    setIsInteractionModalOpen(false);
    setInteractionTitle('');
    setInteractionNotes('');
    const updated = contacts.find(c => c.id === selectedContact.id);
    if (updated) setSelectedContact(updated);
  };

  const getStageBadge = (stage: ContactLifecycleStage) => {
    switch (stage) {
      case 'champion':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1"><Award className="w-3 h-3 text-amber-400" /> Champion</span>;
      case 'relationship':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">Relationship</span>;
      case 'customer':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Customer</span>;
      case 'lead':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Lead</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-800 text-slate-300 border border-slate-700">Contact</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Universal CRM & Contacts Core
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              {contacts.length} Authorised Records
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Universal Contacts & CRM Synchronizer
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Multi-channel contact intelligence supporting lifecycle stage progression (Contact → Lead → Customer → Champion) with automated CRM Deals synchronization and zero-leakage data consent proofs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 border border-slate-700"
          >
            <Upload className="w-4 h-4 text-sky-400" />
            <span>Import Contacts</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Universal Contact</span>
          </button>
        </div>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative min-w-[220px] flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, organization, email, or tags..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Lifecycle Stage Filter */}
          <select
            value={selectedStage}
            onChange={e => setSelectedStage(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Lifecycle Stages</option>
            <option value="contact">Contact</option>
            <option value="lead">Lead</option>
            <option value="customer">Customer</option>
            <option value="relationship">Relationship</option>
            <option value="champion">Champion</option>
          </select>

          {/* Circle Filter */}
          <select
            value={selectedCircleId}
            onChange={e => setSelectedCircleId(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Sovereign Circles</option>
            {circles.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.memberCount})
              </option>
            ))}
          </select>

          {/* Source Filter */}
          <select
            value={selectedSource}
            onChange={e => setSelectedSource(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Sources</option>
            <option value="manual">Manual Entry</option>
            <option value="omni_passport">OMNI Passport</option>
            <option value="google_contacts">Google Contacts</option>
            <option value="microsoft_contacts">Microsoft 365</option>
            <option value="csv_import">CSV Import</option>
            <option value="vcard">vCard</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredContacts.map(contact => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`bg-slate-900 border rounded-2xl p-5 shadow-lg transition-all cursor-pointer hover:border-indigo-500/80 ${
                    selectedContact?.id === contact.id ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={contact.avatarUrl}
                        alt={contact.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-indigo-500/30"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>{contact.name}</span>
                          {contact.consent.status === 'granted' && (
                            <Shield className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                        </h3>
                        <p className="text-xs text-slate-400">{contact.jobTitle} • {contact.organisation}</p>
                        {contact.linkedOmniHandle && (
                          <span className="text-[11px] text-indigo-400 font-mono">{contact.linkedOmniHandle}</span>
                        )}
                      </div>
                    </div>
                    {getStageBadge(contact.lifecycleStage)}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Pipeline Value:</span>
                      <span className="text-emerald-400 font-bold font-mono">
                        ${contact.dealValue.toLocaleString()} {contact.currency}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <span>Lead Score:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-300 font-bold font-mono">{contact.leadScore}/100</span>
                        <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-indigo-500 h-full rounded-full"
                            style={{ width: `${contact.leadScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {contact.tags.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-950 text-slate-400 rounded text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-semibold">
                  <tr>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Organisation</th>
                    <th className="p-4">Stage</th>
                    <th className="p-4">Pipeline</th>
                    <th className="p-4">Score</th>
                    <th className="p-4">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredContacts.map(contact => (
                    <tr
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                        selectedContact?.id === contact.id ? 'bg-indigo-950/40' : ''
                      }`}
                    >
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={contact.avatarUrl}
                          alt={contact.name}
                          className="w-8 h-8 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-bold text-white">{contact.name}</div>
                          <div className="text-[10px] text-slate-400">{contact.email}</div>
                        </div>
                      </td>
                      <td className="p-4">{contact.organisation}</td>
                      <td className="p-4">{getStageBadge(contact.lifecycleStage)}</td>
                      <td className="p-4 font-mono font-bold text-emerald-400">
                        ${contact.dealValue.toLocaleString()}
                      </td>
                      <td className="p-4 font-mono text-indigo-300 font-bold">{contact.leadScore}</td>
                      <td className="p-4 capitalize text-slate-400">{contact.source.replace('_', ' ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Contact Detailed Inspector (1 Col) */}
        <div className="space-y-4">
          {selectedContact ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedContact.avatarUrl}
                    alt={selectedContact.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-white">{selectedContact.name}</h3>
                    <p className="text-xs text-slate-400">{selectedContact.jobTitle}</p>
                    <p className="text-xs text-indigo-400 font-semibold">{selectedContact.organisation}</p>
                    {selectedContact.linkedOmniHandle && (
                      <span className="text-[11px] text-sky-400 font-mono">{selectedContact.linkedOmniHandle}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stage Progression & 1-Click Convert */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lifecycle Stage</span>
                  {getStageBadge(selectedContact.lifecycleStage)}
                </div>

                <button
                  onClick={() => setIsLifecycleModalOpen(true)}
                  className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:opacity-90 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Convert Lifecycle Stage & Sync CRM</span>
                </button>
              </div>

              {/* Communication Bar */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setInteractionType('message');
                    setInteractionTitle(`Direct message to ${selectedContact.name}`);
                    setIsInteractionModalOpen(true);
                  }}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex flex-col items-center gap-1"
                >
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <span>Message</span>
                </button>
                <button
                  onClick={() => {
                    if (onOpenMeeting) onOpenMeeting();
                    setInteractionType('meeting');
                    setInteractionTitle(`Executive HD Meeting with ${selectedContact.name}`);
                    setIsInteractionModalOpen(true);
                  }}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex flex-col items-center gap-1"
                >
                  <Video className="w-4 h-4 text-emerald-400" />
                  <span>HD Meet</span>
                </button>
                <button
                  onClick={() => setIsInteractionModalOpen(true)}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex flex-col items-center gap-1"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Log Activity</span>
                </button>
              </div>

              {/* Contact Details */}
              <div className="space-y-2 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-white">{selectedContact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-white">{selectedContact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  <span className="text-white">{selectedContact.department} • {selectedContact.address}</span>
                </div>
              </div>

              {/* Circles Membership */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Assigned Sovereign Circles</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedContact.circleIds.map(cId => {
                    const cObj = circles.find(cir => cir.id === cId);
                    return (
                      <span key={cId} className="px-2.5 py-1 bg-indigo-950/60 border border-indigo-800/60 text-indigo-300 rounded-lg text-xs font-semibold">
                        {cObj ? cObj.name : cId}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Interactions History Timeline */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Interactions</h4>
                  <span className="text-[10px] text-slate-500">{selectedContact.interactions.length} Logged</span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedContact.interactions.length > 0 ? (
                    selectedContact.interactions.map(item => (
                      <div key={item.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white capitalize">{item.title}</span>
                          <span className="text-[10px] text-indigo-400 font-mono capitalize">{item.type}</span>
                        </div>
                        <p className="text-slate-400">{item.notes}</p>
                        {item.outcome && (
                          <div className="text-[10px] text-emerald-400 font-semibold">Outcome: {item.outcome}</div>
                        )}
                        <span className="text-[9px] text-slate-500 block pt-1">{new Date(item.timestamp).toLocaleString()}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-xs text-slate-500">
                      No interactions logged yet.
                    </div>
                  )}
                </div>
              </div>

              {/* Explicit Consent & GDPR Audit Proof */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    Consent & Privacy Status:
                  </span>
                  <span className="text-emerald-400 font-bold uppercase">{selectedContact.consent.status}</span>
                </div>
                <div className="text-slate-500 font-mono text-[10px] truncate">
                  Proof: {selectedContact.consent.proofHash}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 space-y-3">
              <Users className="w-10 h-10 mx-auto text-slate-600 animate-pulse" />
              <p className="text-xs">Select any contact from the directory to review CRM lifecycle stages, log interactions, and inspect cryptographic data consent proofs.</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: ADD UNIVERSAL CONTACT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-400" />
                Add Universal OMNI Contact
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateContact} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Linked OMNI Handle</label>
                  <input
                    type="text"
                    placeholder="@handle (optional)"
                    value={newHandle}
                    onChange={e => setNewHandle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="elena@company.com"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Organisation</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Global"
                    value={newOrg}
                    onChange={e => setNewOrg(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Chief Operating Officer"
                    value={newJob}
                    onChange={e => setNewJob(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Lifecycle Stage</label>
                  <select
                    value={newStage}
                    onChange={e => setNewStage(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="contact">Contact</option>
                    <option value="lead">Lead</option>
                    <option value="customer">Customer</option>
                    <option value="relationship">Relationship</option>
                    <option value="champion">Champion</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Deal Pipeline (USD)</label>
                  <input
                    type="number"
                    value={newDealValue}
                    onChange={e => setNewDealValue(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20"
                >
                  Save Universal Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MULTI-SOURCE IMPORT */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-sky-400" />
                Multi-Channel Contact Import Gateway
              </h3>
              <button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-300">
                Select your external contacts source to synchronize directly into OMNI Connect without data leakage:
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    onImportContacts('google_contacts', [
                      { name: 'Dr. Michael Chen', organisation: 'Stanford Health AI', email: 'mchen@stanford.edu', jobTitle: 'Principal Investigator', lifecycleStage: 'lead', dealValue: 45000 },
                      { name: 'Sarah Jenkins', organisation: 'Vanguard Capital', email: 'sjenkins@vanguard.com', jobTitle: 'Managing Partner', lifecycleStage: 'customer', dealValue: 120000 }
                    ]);
                    setIsImportModalOpen(false);
                  }}
                  className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left space-y-1.5 transition-all group"
                >
                  <div className="font-bold text-white text-xs group-hover:text-sky-400 flex items-center justify-between">
                    <span>Google Contacts</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                  </div>
                  <p className="text-[10px] text-slate-400">Sync Google Workspace and Gmail address book with OAuth2.</p>
                </button>

                <button
                  onClick={() => {
                    onImportContacts('microsoft_contacts', [
                      { name: 'Robert Thorne', organisation: 'Azure Systems', email: 'rthorne@azure.ms', jobTitle: 'Enterprise Architect', lifecycleStage: 'lead', dealValue: 80000 },
                      { name: 'Amanda Lewis', organisation: 'London Financial', email: 'alewis@londonfin.co.uk', jobTitle: 'Treasury Officer', lifecycleStage: 'customer', dealValue: 250000 }
                    ]);
                    setIsImportModalOpen(false);
                  }}
                  className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left space-y-1.5 transition-all group"
                >
                  <div className="font-bold text-white text-xs group-hover:text-indigo-400 flex items-center justify-between">
                    <span>Microsoft 365</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
                  </div>
                  <p className="text-[10px] text-slate-400">Sync Microsoft Outlook & Exchange corporate contacts.</p>
                </button>

                <button
                  onClick={() => {
                    onImportContacts('csv_import', [
                      { name: 'Kemi Adebayo', organisation: 'Lagos Fintech Hub', email: 'kemi@fintechlagos.ng', jobTitle: 'Founding Partner', lifecycleStage: 'relationship', dealValue: 95000 },
                      { name: 'Tariq Al-Mansoor', organisation: 'Gulf Sovereign Vault', email: 'tariq@gulfvault.ae', jobTitle: 'Asset Custodian', lifecycleStage: 'champion', dealValue: 500000 }
                    ]);
                    setIsImportModalOpen(false);
                  }}
                  className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left space-y-1.5 transition-all group"
                >
                  <div className="font-bold text-white text-xs group-hover:text-emerald-400 flex items-center justify-between">
                    <span>CSV / Excel Upload</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
                  </div>
                  <p className="text-[10px] text-slate-400">Drop structured CSV with automatic column mapping.</p>
                </button>

                <button
                  onClick={() => {
                    onImportContacts('omni_passport', [
                      { name: 'Bishop David Olanrewaju', organisation: 'Ecclesia Global Dioceses', email: 'bishop@ecclesia.org', jobTitle: 'General Overseer', lifecycleStage: 'champion', dealValue: 0 }
                    ]);
                    setIsImportModalOpen(false);
                  }}
                  className="p-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-left space-y-1.5 transition-all group"
                >
                  <div className="font-bold text-white text-xs group-hover:text-purple-400 flex items-center justify-between">
                    <span>OMNI Passport Sync</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400" />
                  </div>
                  <p className="text-[10px] text-slate-400">Sync cross-app verified OMNI identities automatically.</p>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CONVERT LIFECYCLE STAGE */}
      {isLifecycleModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Convert Lifecycle Stage & CRM Deal
              </h3>
              <button onClick={() => setIsLifecycleModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteLifecycleConversion} className="space-y-4">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="text-slate-400">Target Contact:</div>
                <div className="font-bold text-white text-sm">{selectedContact.name} ({selectedContact.organisation})</div>
                <div className="text-slate-500 mt-1">Current Stage: <strong className="text-indigo-400 uppercase">{selectedContact.lifecycleStage}</strong></div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">New Target Stage</label>
                <select
                  value={targetStage}
                  onChange={e => setTargetStage(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="lead">Lead (Prospect)</option>
                  <option value="customer">Customer (Closed/Won Deal)</option>
                  <option value="relationship">Relationship (Strategic Partner)</option>
                  <option value="champion">Champion (Ecosystem Advocate)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">CRM Deal Pipeline Value (USD)</label>
                <input
                  type="number"
                  value={conversionDealValue}
                  onChange={e => setConversionDealValue(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Conversion Rationale & Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Agreed to enterprise pilot program and requested contract."
                  value={conversionNotes}
                  onChange={e => setConversionNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLifecycleModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Convert & Sync CRM Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LOG INTERACTION */}
      {isInteractionModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" />
                Log Interaction with {selectedContact.name}
              </h3>
              <button onClick={() => setIsInteractionModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogInteraction} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Interaction Type</label>
                  <select
                    value={interactionType}
                    onChange={e => setInteractionType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="meeting">Video Meeting</option>
                    <option value="call">Voice Call</option>
                    <option value="message">Direct Message</option>
                    <option value="email">Email</option>
                    <option value="order">Commercial Order</option>
                    <option value="note">Internal Note</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Outcome</label>
                  <input
                    type="text"
                    placeholder="e.g. Proposal Approved"
                    value={interactionOutcome}
                    onChange={e => setInteractionOutcome(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Summary / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q3 Partnership Milestone Discussion"
                  value={interactionTitle}
                  onChange={e => setInteractionTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Meeting Notes & Action Items</label>
                <textarea
                  rows={3}
                  placeholder="Key decisions, timelines, follow-up deliverables..."
                  value={interactionNotes}
                  onChange={e => setInteractionNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsInteractionModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Save Activity Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
