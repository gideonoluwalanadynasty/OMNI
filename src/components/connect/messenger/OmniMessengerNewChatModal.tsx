import React, { useState } from 'react';
import {
  X,
  User,
  Users,
  Briefcase,
  Lock,
  Search,
  Check,
  Shield,
  Bot,
  Radio
} from 'lucide-react';
import { ConversationType } from '../../../types/omni_messenger';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreateConversation: (type: ConversationType, title: string, memberProfileIds: string[], extra?: any) => void;
}

export const OmniMessengerNewChatModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCreateConversation
}) => {
  const [convType, setConvType] = useState<ConversationType>('direct');
  const [title, setTitle] = useState('');
  const [searchContact, setSearchContact] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [crmDealValue, setCrmDealValue] = useState('50000');
  const [ephemeralTimer, setEphemeralTimer] = useState(0);

  if (!isOpen) return null;

  const contactsList = [
    {
      id: 'usr_sarah_chen',
      name: 'Sarah Chen, VP Strategy',
      handle: '@sarah_chen',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
      org: 'Meridian Capital'
    },
    {
      id: 'usr_elena_rostova',
      name: 'Elena Rostova',
      handle: '@elena_rostova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      org: 'Nexus Bio'
    },
    {
      id: 'usr_marcus_vance',
      name: 'Marcus Vance',
      handle: '@marcus_vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      org: 'Vance Dynamics'
    },
    {
      id: 'usr_priya_sharma',
      name: 'Priya Sharma',
      handle: '@priya_sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      org: 'Indus Ventures'
    },
    {
      id: 'usr_ai_copilot',
      name: 'OMNI AI Executive Assistant',
      handle: '@omni_assistant',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
      org: 'OMNI Core AI'
    }
  ];

  const filteredContacts = contactsList.filter(c =>
    c.name.toLowerCase().includes(searchContact.toLowerCase()) ||
    c.handle.toLowerCase().includes(searchContact.toLowerCase())
  );

  const toggleContact = (id: string) => {
    if (convType === 'direct' || convType === 'ai') {
      setSelectedContacts([id]);
    } else {
      setSelectedContacts(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
    }
  };

  const handleCreate = () => {
    if (selectedContacts.length === 0) return;
    const resolvedTitle = title.trim()
      ? title.trim()
      : convType === 'direct'
      ? contactsList.find(c => c.id === selectedContacts[0])?.name || 'Direct Chat'
      : 'New Group Channel';

    onCreateConversation(convType, resolvedTitle, selectedContacts, {
      ephemeralTimerSeconds: ephemeralTimer,
      crmDealValue: convType === 'business' ? parseFloat(crmDealValue) : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Start New Conversation</h3>
              <p className="text-[10px] text-slate-400">Omni Passport Encrypted Routing</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conversation Type Picker */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Conversation Type</label>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: 'direct', label: '1-on-1', icon: User },
              { id: 'group', label: 'Group', icon: Users },
              { id: 'business', label: 'CRM Deal', icon: Briefcase },
              { id: 'ai', label: 'AI Copilot', icon: Bot }
            ].map(type => {
              const Icon = type.icon;
              const isSelected = convType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setConvType(type.id as ConversationType);
                    setSelectedContacts([]);
                  }}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-500 text-white font-bold shadow'
                      : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-[11px]">{type.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Channel Title (for groups and CRM) */}
        {convType !== 'direct' && (
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              {convType === 'business' ? 'Deal / Account Name' : 'Channel Name'}
            </label>
            <input
              type="text"
              placeholder={convType === 'business' ? 'e.g. Apex Global Expansion RFP' : 'e.g. Executive Governance Council'}
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}

        {/* Select Contacts */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-400">
              {convType === 'direct' ? 'Select Recipient' : 'Select Participants'}
            </label>
            <span className="text-[10px] text-indigo-400 font-bold">
              {selectedContacts.length} selected
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search contacts across OMNI graph..."
              value={searchContact}
              onChange={e => setSearchContact(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1 divide-y divide-slate-800">
            {filteredContacts.map(contact => {
              const isSelected = selectedContacts.includes(contact.id);
              return (
                <button
                  key={contact.id}
                  onClick={() => toggleContact(contact.id)}
                  className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors ${
                    isSelected ? 'bg-indigo-600/20 border border-indigo-500/40' : 'hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{contact.name}</h4>
                      <p className="text-[10px] text-slate-400">{contact.handle} • {contact.org}</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    isSelected ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700 bg-slate-800'
                  }`}>
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ephemeral Timer & Security Option */}
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <div>
              <p className="font-bold text-white text-[11px]">Signal Double-Ratchet E2EE</p>
              <p className="text-[9px] text-slate-400">Post-Quantum Kyber-1024 enabled</p>
            </div>
          </div>
          <select
            value={ephemeralTimer}
            onChange={e => setEphemeralTimer(parseInt(e.target.value))}
            className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-200"
          >
            <option value="0">Self-Destruct: Off</option>
            <option value="3600">1 Hour</option>
            <option value="86400">24 Hours</option>
            <option value="604800">7 Days</option>
          </select>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={selectedContacts.length === 0}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-colors ${
              selectedContacts.length > 0
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Start Conversation
          </button>
        </div>
      </div>
    </div>
  );
};
