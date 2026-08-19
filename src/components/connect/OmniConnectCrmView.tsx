import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  DollarSign,
  TrendingUp,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Plus,
  ArrowRight
} from 'lucide-react';
import { ConnectContact, ConnectCrmDeal } from '../../types/omni_connect';

interface Props {
  contacts: ConnectContact[];
  deals: ConnectCrmDeal[];
  onUpdateDealStage: (dealId: string, stage: ConnectCrmDeal['stage']) => void;
}

export const OmniConnectCrmView: React.FC<Props> = ({
  contacts,
  deals,
  onUpdateDealStage
}) => {
  const [selectedTab, setSelectedTab] = useState<'pipeline' | 'contacts'>('pipeline');
  const [searchTerm, setSearchTerm] = useState('');

  const stages: { key: ConnectCrmDeal['stage']; label: string; color: string }[] = [
    { key: 'discovery', label: '1. Discovery & Lead Inbound', color: 'border-sky-500 text-sky-400' },
    { key: 'presentation', label: '2. Demo & Technical Review', color: 'border-indigo-500 text-indigo-400' },
    { key: 'contract_review', label: '3. Proposal / Legal Review', color: 'border-amber-500 text-amber-400' },
    { key: 'closed_won', label: '4. Won & Deployed (100%)', color: 'border-emerald-500 text-emerald-400' }
  ];

  const totalPipelineValue = deals.reduce((sum, d) => sum + d.valueUsd, 0);
  const totalWonValue = deals.filter(d => d.stage === 'closed_won').reduce((sum, d) => sum + d.valueUsd, 0);

  return (
    <div id="omni-connect-crm-view" className="space-y-6">
      {/* Header & Metrics */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                OMNI SOCIAL CRM
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-indigo-400" />
              Omni-Channel Lead Pipeline & Customer Directory
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Seamlessly manage social inbox inquiries, inbound enterprise leads, university campus deals, and institutional partners from one unified workspace.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-center min-w-[120px]">
              <div className="text-xl font-bold text-emerald-400">${totalPipelineValue.toLocaleString()}</div>
              <div className="text-xs text-slate-400 uppercase font-medium">Pipeline Value</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-center min-w-[100px]">
              <div className="text-xl font-bold text-indigo-400">{contacts.length}</div>
              <div className="text-xs text-slate-400 uppercase font-medium">Leads & Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedTab('pipeline')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              selectedTab === 'pipeline'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            📊 Visual Kanban Pipeline
          </button>
          <button
            onClick={() => setSelectedTab('contacts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              selectedTab === 'contacts'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            👥 Contacts Directory ({contacts.length})
          </button>
        </div>

        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Visual Pipeline View */}
      {selectedTab === 'pipeline' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map(st => {
            const stageDeals = deals.filter(d => d.stage === st.key);
            const stageTotal = stageDeals.reduce((sum, d) => sum + d.valueUsd, 0);

            return (
              <div
                key={st.key}
                className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-4 flex flex-col min-h-[500px]"
              >
                {/* Stage Header */}
                <div className="border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${st.color}`}>{st.label}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                      {stageDeals.length}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    ${stageTotal.toLocaleString()} USD
                  </div>
                </div>

                {/* Deal Cards */}
                <div className="flex-1 space-y-3 overflow-y-auto">
                  {stageDeals.map(deal => (
                    <div
                      key={deal.id}
                      className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 space-y-2.5 transition-all shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white leading-snug">{deal.dealTitle}</h4>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded">
                          {deal.probabilityPercent}%
                        </span>
                      </div>

                      <div className="text-base font-extrabold text-emerald-400">
                        ${deal.valueUsd.toLocaleString()} USD
                      </div>

                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        <span>{deal.contactName}</span>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-800">
                        <span>Close: {deal.expectedCloseDate}</span>
                        <span>Assignee: {deal.assignedStaffName.split(' ')[0]}</span>
                      </div>

                      {/* Stage Progression Action */}
                      <div className="pt-2 flex items-center justify-between gap-1">
                        {st.key !== 'closed_won' && (
                          <button
                            onClick={() => onUpdateDealStage(deal.id, 'closed_won')}
                            className="w-full py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold transition-colors flex items-center justify-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Mark Won</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {stageDeals.length === 0 && (
                    <div className="h-32 flex items-center justify-center text-xs text-slate-600 border border-dashed border-slate-800 rounded-xl">
                      No active deals in stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Contacts Table View */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Contact / Organization</th>
                <th className="p-4">Lead Source</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Est. Lifetime Value</th>
                <th className="p-4">Last Contacted</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {contacts.map(c => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{c.fullName}</div>
                    <div className="text-slate-400 text-[11px]">{c.jobTitle} • {c.companyName}</div>
                    <div className="text-slate-500 text-[10px]">{c.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                      {c.leadSource}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 uppercase">
                      {c.leadStage.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-emerald-400 text-sm">
                    ${c.estimatedLifetimeValueUsd.toLocaleString()}
                  </td>
                  <td className="p-4 text-slate-400">
                    {new Date(c.lastContactedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold">
                      Open CRM Card
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
