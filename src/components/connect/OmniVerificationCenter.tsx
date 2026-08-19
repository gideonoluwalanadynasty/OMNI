import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Building,
  GraduationCap,
  UserCheck,
  FileText,
  Upload,
  Check,
  X,
  ExternalLink,
  Lock,
  Key
} from 'lucide-react';
import {
  VerificationApplication,
  VerificationBadgeType,
  UniversalOmniProfile
} from '../../types/omni_identity';

interface OmniVerificationCenterProps {
  applications: VerificationApplication[];
  activeProfile: UniversalOmniProfile;
  onSubmitApplication: (data: any) => void;
  onReviewApplication: (appId: string, decision: 'approved' | 'rejected' | 'info_requested', notes: string, badgeToAssign?: VerificationBadgeType) => void;
}

export const OmniVerificationCenter: React.FC<OmniVerificationCenterProps> = ({
  applications,
  activeProfile,
  onSubmitApplication,
  onReviewApplication
}) => {
  const [isApplying, setIsApplying] = useState(false);
  const [applicantName, setApplicantName] = useState(activeProfile.displayName);
  const [applicantEmail, setApplicantEmail] = useState('contact@omni.com');
  const [entityType, setEntityType] = useState<'person' | 'creator' | 'business' | 'organization' | 'government'>('creator');
  const [requestedBadge, setRequestedBadge] = useState<VerificationBadgeType>('verified_creator');
  const [category, setCategory] = useState('Software Engineering & Systems Architecture');
  const [justification, setJustification] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState(activeProfile.canonicalUrl);
  const [documentFileName, setDocumentFileName] = useState('Government_ID_Verification_Scan.pdf');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitApplication({
      profileId: activeProfile.id,
      applicantLegalName: applicantName,
      applicantEmail,
      entityType,
      requestedBadge,
      category,
      justificationText: justification,
      officialWebsiteUrl: websiteUrl,
      documentFileName,
      documentType: entityType === 'business' ? 'business_registration' : entityType === 'organization' ? 'tax_exemption_501c3' : 'government_id'
    });

    setIsApplying(false);
    setSuccessMsg('Verification application submitted successfully to the Super Admin queue!');
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              OMNI VERIFICATION & TRUST FRAMEWORK
            </span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white">
            Official Identity Verification & Badging Center
          </h2>
          <p className="text-xs text-slate-400">
            Apply for verified person, creator, business, and organisation trust badges, or review and approve incoming identity attestations.
          </p>
        </div>

        <button
          onClick={() => setIsApplying(true)}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-xs font-bold shadow-lg transition-colors flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Apply for Verification</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Verification Tiers Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tier 1: Person */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
              <UserCheck className="w-5 h-5" />
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300">Blue Check</span>
          </div>
          <div className="text-sm font-bold text-white">Verified Person</div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Government ID biometric confirmation establishing authentic human identity on OMNI.
          </p>
        </div>

        {/* Tier 2: Creator */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">Purple Star</span>
          </div>
          <div className="text-sm font-bold text-white">Verified Creator</div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Recognized authors, architects, educators, podcasters, and verified media publishers.
          </p>
        </div>

        {/* Tier 3: Business */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <Building className="w-5 h-5" />
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">Gold Shield</span>
          </div>
          <div className="text-sm font-bold text-white">Verified Business</div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Companies House or commercial register audit for corporate vendors and software entities.
          </p>
        </div>

        {/* Tier 4: Organisation */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <GraduationCap className="w-5 h-5" />
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Emerald Badge</span>
          </div>
          <div className="text-sm font-bold text-white">Official Organisation</div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Churches, dioceses, universities, NGOs, and sovereign institutions.
          </p>
        </div>
      </div>

      {/* Application Submission Form Modal */}
      {isApplying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Apply for OMNI Passport Verification Badge
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Legal Full Name</label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Official Email Address</label>
                  <input
                    type="email"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Entity Type</label>
                  <select
                    value={entityType}
                    onChange={(e) => {
                      const et = e.target.value as any;
                      setEntityType(et);
                      setRequestedBadge(
                        et === 'business'
                          ? 'verified_business'
                          : et === 'organization'
                          ? 'verified_official'
                          : et === 'creator'
                          ? 'verified_creator'
                          : 'verified_human'
                      );
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="creator">Creator / Public Figure</option>
                    <option value="business">Registered Business / Enterprise</option>
                    <option value="organization">Church / University / NGO</option>
                    <option value="person">Individual Person</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold">Requested Trust Badge</label>
                  <input
                    type="text"
                    value={requestedBadge}
                    disabled
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 text-purple-300 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Category / Professional Domain</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Justification & Notable Public Record</label>
                <textarea
                  rows={3}
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="Provide proof of identity, registered publications, corporate incorporation, or diocese registry details..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold">Supporting Document (PDF)</label>
                <div className="p-3 bg-slate-950 rounded-xl border border-dashed border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300 font-mono">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span>{documentFileName}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Ready for Upload
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsApplying(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold shadow-lg"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Super Admin Verification Applications Queue */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400" />
            Super Admin Verification Queue ({applications.length})
          </h3>
          <span className="text-xs text-slate-400">Cryptographically Audited Merkle State</span>
        </div>

        <div className="space-y-3">
          {applications.map(app => {
            const isPending = app.status === 'pending_review';
            const isApproved = app.status === 'approved';

            return (
              <div
                key={app.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="font-bold text-white text-sm">{app.applicantLegalName}</div>
                    <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-purple-300 rounded font-mono text-[10px]">
                      {app.requestedBadge}
                    </span>
                  </div>

                  <div>
                    {isApproved ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        APPROVED & BADGE ISSUED
                      </span>
                    ) : isPending ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        PENDING AUDIT REVIEW
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        REJECTED
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {app.justificationText}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-900 text-[11px] text-slate-400">
                  <div className="flex items-center gap-3">
                    <span>Category: <strong className="text-slate-200">{app.category}</strong></span>
                    <span>Email: <strong className="text-indigo-400 font-mono">{app.applicantEmail}</strong></span>
                    {app.documents.length > 0 && (
                      <span className="text-slate-300 font-mono">Doc: {app.documents[0].fileName}</span>
                    )}
                  </div>

                  {/* Super Admin Action Controls */}
                  {isPending && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onReviewApplication(app.id, 'rejected', 'Failed KYC proof')}
                        className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 rounded-xl font-bold"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => onReviewApplication(app.id, 'approved', 'Documents verified authentic', app.requestedBadge)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Assign Badge</span>
                      </button>
                    </div>
                  )}

                  {isApproved && app.merkleAuditProof && (
                    <div className="font-mono text-[10px] text-emerald-400">
                      Merkle Proof: {app.merkleAuditProof.slice(0, 16)}...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
