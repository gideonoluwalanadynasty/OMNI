import React, { useState } from 'react';
import {
  Headphones,
  CheckCircle,
  AlertCircle,
  UserCheck,
  Send,
  MessageSquare,
  Sparkles,
  Smile,
  Frown,
  Meh,
  Clock,
  ArrowRight
} from 'lucide-react';
import { omniSocialAiEngine } from '../../../engine/omni_social_ai_engine';
import { OmniCustomerServiceTicket } from '../../../types/omni_social_ai';

export const OmniCustomerServiceAiView: React.FC = () => {
  const [tickets, setTickets] = useState<OmniCustomerServiceTicket[]>(omniSocialAiEngine.getCustomerTickets());
  const [selectedTicket, setSelectedTicket] = useState<OmniCustomerServiceTicket>(tickets[0]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleResolveAi = (id: string) => {
    omniSocialAiEngine.resolveTicketWithAi(id);
    const updated = omniSocialAiEngine.getCustomerTickets();
    setTickets([...updated]);
    setSelectedTicket(updated.find(t => t.id === id) || updated[0]);
    setToastMsg('Ticket resolved autonomously by AI! Customer notified.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleEscalate = (id: string) => {
    omniSocialAiEngine.escalateTicketToHuman(id);
    const updated = omniSocialAiEngine.getCustomerTickets();
    setTickets([...updated]);
    setSelectedTicket(updated.find(t => t.id === id) || updated[0]);
    setToastMsg('Ticket escalated to Senior Human Support Specialist.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="p-4 bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-sm font-semibold rounded-xl flex items-center gap-2 shadow-xl">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          {toastMsg}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">OMNI Customer Service Assistant</h2>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full">
                  Autonomous 24/7 Desk
                </span>
              </div>
              <p className="text-sm text-slate-400">Context-aware multi-channel resolution, sentiment prediction, and human escalation routing</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Avg Resolution Time</div>
              <div className="text-lg font-bold text-emerald-400">&lt; 4.2 Seconds</div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Autonomous Resolution Rate</div>
              <div className="text-lg font-bold text-white">88.5%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Management Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Active Inbound Queue</span>
            <span className="text-xs text-slate-400">{tickets.length} Tickets</span>
          </div>

          <div className="space-y-2">
            {tickets.map(ticket => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  selectedTicket.id === ticket.id
                    ? 'bg-indigo-950/40 border-indigo-500'
                    : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <img src={ticket.customerAvatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs font-bold text-white truncate">{ticket.customerName}</span>
                  </div>
                  <span
                    className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      ticket.status === 'resolved'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : ticket.status === 'escalated_to_human'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-cyan-500/20 text-cyan-300'
                    }`}
                  >
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="capitalize">{ticket.category.replace('_', ' ')}</span>
                  <span className="flex items-center gap-1">
                    {ticket.sentiment === 'delighted' && <Smile className="w-3.5 h-3.5 text-emerald-400" />}
                    {ticket.sentiment === 'frustrated' && <Frown className="w-3.5 h-3.5 text-rose-400" />}
                    {ticket.sentiment === 'neutral' && <Meh className="w-3.5 h-3.5 text-amber-400" />}
                    {ticket.sentiment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Conversation & AI Copilot */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <img src={selectedTicket.customerAvatar} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-700" />
              <div>
                <h3 className="text-base font-bold text-white">{selectedTicket.customerName}</h3>
                <p className="text-xs text-slate-400">{selectedTicket.customerEmail} • via {selectedTicket.channel}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Predicted CSAT</div>
                <div className="text-sm font-bold text-emerald-400">{selectedTicket.csatPredicted} / 5.0 ⭐</div>
              </div>
            </div>
          </div>

          {/* Conversation History */}
          <div className="space-y-3 max-h-64 overflow-y-auto p-3 bg-slate-950 rounded-lg border border-slate-800">
            {selectedTicket.history.map((h, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg max-w-[85%] text-xs ${
                  h.sender === 'customer'
                    ? 'bg-slate-800 text-slate-200 mr-auto'
                    : 'bg-indigo-950/80 text-indigo-100 border border-indigo-500/30 ml-auto'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-[10px] mb-1 opacity-70">
                  <span>{h.sender === 'customer' ? selectedTicket.customerName : 'OMNI Support AI'}</span>
                  <span>{h.timestamp}</span>
                </div>
                <p>{h.message}</p>
              </div>
            ))}
          </div>

          {/* AI Response Draft Box */}
          <div className="p-4 bg-slate-950 rounded-xl border border-indigo-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                <Sparkles className="w-3.5 h-3.5" /> AI Recommended Resolution (Confidence: {selectedTicket.aiConfidenceScore}%)
              </div>
              <span className="text-[10px] text-slate-400">Grounded in verified knowledge base</span>
            </div>

            <p className="text-xs text-slate-200 bg-slate-900 p-3 rounded border border-slate-800">
              {selectedTicket.aiDraftedResponse}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => handleEscalate(selectedTicket.id)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1"
              >
                <UserCheck className="w-3.5 h-3.5" /> Escalate to Human
              </button>
              <button
                onClick={() => handleResolveAi(selectedTicket.id)}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
              >
                <Send className="w-3.5 h-3.5" /> Approve & Send AI Response
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
