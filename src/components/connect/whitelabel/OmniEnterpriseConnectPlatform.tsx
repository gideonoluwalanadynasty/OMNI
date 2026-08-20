import React, { useState } from 'react';
import {
  Building2,
  Users,
  Megaphone,
  BookOpen,
  Share2,
  Shield,
  Search,
  Plus,
  Lock,
  Radio,
  FileText,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Send,
  Download,
  AlertTriangle
} from 'lucide-react';
import {
  WhiteLabelTenant,
  EnterpriseMember,
  EnterpriseAnnouncement,
  EnterpriseKnowledgeDoc,
  EnterprisePartnerNetwork
} from '../../../types/omni_white_label';
import {
  SEED_ENTERPRISE_MEMBERS,
  SEED_ENTERPRISE_ANNOUNCEMENTS,
  SEED_ENTERPRISE_KNOWLEDGE_DOCS,
  SEED_ENTERPRISE_PARTNERS
} from '../../../data/omni_white_label_seed';

interface OmniEnterpriseConnectPlatformProps {
  tenant: WhiteLabelTenant;
  onOpenStudio?: () => void;
}

export const OmniEnterpriseConnectPlatform: React.FC<OmniEnterpriseConnectPlatformProps> = ({
  tenant,
  onOpenStudio,
}) => {
  const [activeSection, setActiveSection] = useState<
    'departments' | 'broadcasts' | 'knowledge' | 'partners' | 'directory'
  >('departments');

  const [members, setMembers] = useState<EnterpriseMember[]>(SEED_ENTERPRISE_MEMBERS);
  const [announcements, setAnnouncements] = useState<EnterpriseAnnouncement[]>(SEED_ENTERPRISE_ANNOUNCEMENTS);
  const [knowledgeDocs, setKnowledgeDocs] = useState<EnterpriseKnowledgeDoc[]>(SEED_ENTERPRISE_KNOWLEDGE_DOCS);
  const [partners, setPartners] = useState<EnterprisePartnerNetwork[]>(SEED_ENTERPRISE_PARTNERS);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<EnterpriseKnowledgeDoc | null>(knowledgeDocs[0]);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiAnswering, setIsAiAnswering] = useState(false);

  const [newAnnounceModal, setNewAnnounceModal] = useState(false);
  const [newAnnounceTitle, setNewAnnounceTitle] = useState('');
  const [newAnnounceBody, setNewAnnounceBody] = useState('');
  const [newAnnouncePriority, setNewAnnouncePriority] = useState<'routine' | 'important' | 'urgent_critical'>('important');

  const handleAcknowledge = (announcementId: string) => {
    setAnnouncements(prev =>
      prev.map(a =>
        a.id === announcementId
          ? { ...a, acknowledgmentsCount: a.acknowledgmentsCount + 1 }
          : a
      )
    );
  };

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnounceTitle.trim()) return;

    const newAnn: EnterpriseAnnouncement = {
      id: `ann-${Date.now()}`,
      tenantId: tenant.id,
      title: newAnnounceTitle.trim(),
      summary: newAnnounceBody.slice(0, 120) + '...',
      body: newAnnounceBody.trim(),
      authorName: 'Marcus Thorne (You)',
      authorRole: 'Lead Security Architect & CISO',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      priority: newAnnouncePriority,
      targetAudience: 'all_organization',
      publishedAt: 'Just now',
      acknowledgmentsCount: 1,
      pinned: newAnnouncePriority === 'urgent_critical',
    };

    setAnnouncements([newAnn, ...announcements]);
    setNewAnnounceTitle('');
    setNewAnnounceBody('');
    setNewAnnounceModal(false);
  };

  const handleAskAiAboutDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim() || !selectedDoc) return;

    setIsAiAnswering(true);
    setAiAnswer(null);

    setTimeout(() => {
      setIsAiAnswering(false);
      setAiAnswer(
        `[Grounding Source: ${selectedDoc.title} v${selectedDoc.version}]\n\nBased on the internal enterprise specification, ${selectedDoc.title.toLowerCase()} enforces end-to-end cryptographic boundaries. Specifically, all transactions mandate zero-trust key generation with automated audit logging before node execution.`
      );
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Enterprise Platform Header */}
      <div
        className="rounded-2xl p-6 border shadow-xl relative overflow-hidden"
        style={{
          backgroundColor: tenant.branding.surfaceColor,
          borderColor: tenant.branding.primaryColor + '40',
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <img
              src={tenant.branding.logoUrl}
              alt={tenant.branding.brandName}
              className="w-14 h-14 rounded-2xl object-cover border p-0.5 shrink-0 shadow-lg"
              style={{ borderColor: tenant.branding.primaryColor }}
            />
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-white tracking-tight font-mono">
                  {tenant.branding.brandName} Enterprise Workplace
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {tenant.domains[0]?.domain || 'connect.aegisquantum.io'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Sovereign Enclave
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">{tenant.branding.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onOpenStudio && (
              <button
                onClick={onOpenStudio}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition"
              >
                White Label Studio
              </button>
            )}
            <button
              onClick={() => setNewAnnounceModal(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition"
            >
              <Megaphone className="w-4 h-4" />
              Publish Broadcast
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          {[
            { id: 'departments', label: 'Departmental Spaces', icon: Building2, count: tenant.departments.length },
            { id: 'broadcasts', label: 'Broadcasts & Townhalls', icon: Megaphone, count: announcements.length },
            { id: 'knowledge', label: 'Institutional Knowledge Wiki', icon: BookOpen, count: knowledgeDocs.length },
            { id: 'partners', label: 'Partner & Vendor Networks', icon: Share2, count: partners.length },
            { id: 'directory', label: 'Employee & Member Directory', icon: Users, count: members.length },
          ].map(sec => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {sec.label}
                {sec.count !== undefined && (
                  <span className="ml-1 px-1.5 py-0.2 bg-slate-800 rounded-full text-[10px] font-mono text-slate-300">
                    {sec.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. DEPARTMENTAL SPACES */}
      {activeSection === 'departments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              Active Enterprise Department Hubs
            </h2>
            <span className="text-xs text-slate-400">
              {tenant.departments.reduce((acc, d) => acc + d.memberCount, 0)} Total Team Members
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tenant.departments.map(dept => (
              <div
                key={dept.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                      {dept.name}
                    </h3>
                    <p className="text-xs text-slate-400">Space ID: #{dept.privateSpaceId}</p>
                  </div>
                  {dept.unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {dept.unreadCount} New
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={dept.leadAvatar}
                      alt={dept.leadName}
                      className="w-7 h-7 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block leading-none">{dept.leadName}</span>
                      <span className="text-[10px] text-slate-400">Department Lead</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">{dept.memberCount} Staff</span>
                    <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition">
                      Enter Space
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. BROADCASTS & TOWNHALLS */}
      {activeSection === 'broadcasts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-indigo-400" />
              Organization Broadcasts & Townhall Streams
            </h2>
            <button
              onClick={() => setNewAnnounceModal(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              New Broadcast
            </button>
          </div>

          <div className="space-y-4">
            {announcements.map(ann => (
              <div
                key={ann.id}
                className={`p-6 rounded-2xl border transition space-y-4 ${
                  ann.priority === 'urgent_critical'
                    ? 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {ann.priority === 'urgent_critical' && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        CRITICAL ACTION
                      </span>
                    )}
                    {ann.priority === 'important' && (
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        IMPORTANT
                      </span>
                    )}
                    <span className="text-xs text-slate-400">{ann.publishedAt}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-emerald-400">
                      {ann.acknowledgmentsCount} Acknowledged
                    </span>
                    <button
                      onClick={() => handleAcknowledge(ann.id)}
                      className="px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Acknowledge
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{ann.title}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{ann.body}</p>
                </div>

                <div className="flex items-center gap-2.5 pt-3 border-t border-slate-800/80">
                  <img
                    src={ann.authorAvatar}
                    alt={ann.authorName}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-bold text-white">{ann.authorName}</span>
                  <span className="text-xs text-slate-400">• {ann.authorRole}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. INSTITUTIONAL KNOWLEDGE WIKI */}
      {activeSection === 'knowledge' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doc List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Verified Enterprise Documents ({knowledgeDocs.length})
            </h3>
            <div className="space-y-2">
              {knowledgeDocs.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition space-y-1.5 ${
                    selectedDoc?.id === doc.id
                      ? 'bg-indigo-950/40 border-indigo-500/50'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-mono">
                      {doc.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">v{doc.version}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{doc.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{doc.snippet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Doc Viewer & AI Copilot Grounding */}
          <div className="lg:col-span-2 space-y-4">
            {selectedDoc ? (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-[10px] font-bold">
                        {selectedDoc.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">v{selectedDoc.version}</span>
                    </div>
                    <h2 className="text-lg font-bold text-white mt-1">{selectedDoc.title}</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Authored by {selectedDoc.authorName} • Updated {selectedDoc.lastUpdated}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                  {selectedDoc.content}
                </div>

                {/* Ask AI Grounded on this Doc */}
                <div className="p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Ask {tenant.aiConfig.assistantName} about this Document
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-mono">GROUNDED</span>
                  </div>

                  <form onSubmit={handleAskAiAboutDoc} className="flex gap-2">
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={e => setAiQuestion(e.target.value)}
                      placeholder={`Ask anything about "${selectedDoc.title}"...`}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      disabled={isAiAnswering || !aiQuestion.trim()}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      {isAiAnswering ? 'Synthesizing...' : 'Query'}
                    </button>
                  </form>

                  {aiAnswer && (
                    <div className="p-3 bg-slate-950 border border-indigo-500/30 rounded-lg text-xs text-indigo-200 leading-relaxed font-mono whitespace-pre-wrap animate-in fade-in">
                      {aiAnswer}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
                Select a document from the repository to view content.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. PARTNER & VENDOR NETWORKS */}
      {activeSection === 'partners' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-indigo-400" />
              Federated Partner & Cross-Organization Networks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {partners.map(part => (
              <div
                key={part.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-mono">
                      {part.partnerType}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1.5">{part.partnerOrgName}</h3>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                    FEDERATED
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-400">
                  <p>Liaison: <span className="text-white font-medium">{part.contactPerson}</span></p>
                  <p className="font-mono text-[11px] text-slate-500">{part.contactEmail}</p>
                  <p>{part.sharedSpacesCount} Shared Federated Channels</p>
                </div>

                <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition border border-slate-700">
                  Launch Cross-Org Channel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. EMPLOYEE & MEMBER DIRECTORY */}
      {activeSection === 'directory' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              Verified Organization Directory ({members.length})
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search staff, roles, emails..."
                className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 w-64"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
            {members
              .filter(m =>
                m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(mem => (
                <div key={mem.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={mem.avatarUrl} alt={mem.fullName} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{mem.fullName}</span>
                        <span className="px-2 py-0.5 bg-slate-800 text-indigo-300 rounded text-[10px] font-mono">
                          {mem.role.replace('_', ' ').toUpperCase()}
                        </span>
                        {mem.ssoLinked && (
                          <span className="px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-mono">
                            SSO
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{mem.title} • <span className="font-mono text-slate-500">{mem.email}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-mono hidden md:inline">Active {mem.lastActive}</span>
                    <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition">
                      Message
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* New Announcement Modal */}
      {newAnnounceModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-indigo-400" />
              Publish Enterprise Broadcast
            </h3>

            <form onSubmit={handlePublishAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Broadcast Title</label>
                <input
                  type="text"
                  required
                  value={newAnnounceTitle}
                  onChange={e => setNewAnnounceTitle(e.target.value)}
                  placeholder="e.g. Q3 Townhall Schedule & Roadmap"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Priority Level</label>
                <select
                  value={newAnnouncePriority}
                  onChange={e => setNewAnnouncePriority(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="routine">Routine Announcement</option>
                  <option value="important">Important (Pinned to Feed)</option>
                  <option value="urgent_critical">Urgent Critical (Requires Member Acknowledgment)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Broadcast Details & Action Items</label>
                <textarea
                  rows={4}
                  required
                  value={newAnnounceBody}
                  onChange={e => setNewAnnounceBody(e.target.value)}
                  placeholder="Write clear instructions, livestream links, or mandatory deadlines..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNewAnnounceModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  Broadcast to Organization
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
