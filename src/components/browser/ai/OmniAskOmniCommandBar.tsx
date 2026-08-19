import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  ShoppingBag,
  Share2,
  Mic,
  Compass,
  FileText,
  Table,
  Columns,
  Languages,
  ArrowRight,
  Command,
  X,
  Zap,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { OmniBrowserTab, OmniBrowserCommandItem, OmniBrowserAssistantSubMode } from '../../../types';
import { browserAiAssistantService } from '../../../sdk/browser-services/OmniBrowserAiAssistantService';

interface OmniAskOmniCommandBarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: OmniBrowserTab;
  onTriggerAction: (actionType: string, subMode: OmniBrowserAssistantSubMode, presetPrompt?: string) => void;
}

export const OmniAskOmniCommandBar: React.FC<OmniAskOmniCommandBarProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTriggerAction
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandItems = browserAiAssistantService.getCommandItems();

  const filteredCommands = commandItems.filter(cmd =>
    cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      } else if (searchQuery.trim()) {
        // Custom prompt execution
        onTriggerAction('custom_query', 'page_understanding', searchQuery);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const executeCommand = (cmd: OmniBrowserCommandItem) => {
    let subMode: OmniBrowserAssistantSubMode = 'page_understanding';
    if (cmd.category === 'research') subMode = 'research';
    else if (cmd.category === 'shopping') subMode = 'shopping';
    else if (cmd.category === 'creation') subMode = 'content_create';
    else if (cmd.category === 'voice') subMode = 'voice';

    onTriggerAction(cmd.actionType, subMode, cmd.presetPrompt);
    onClose();
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-emerald-400" />;
      case 'Table': return <Table className="w-4 h-4 text-cyan-400" />;
      case 'Columns': return <Columns className="w-4 h-4 text-amber-400" />;
      case 'Languages': return <Languages className="w-4 h-4 text-purple-400" />;
      case 'Compass': return <Compass className="w-4 h-4 text-cyan-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4 text-rose-400" />;
      case 'Share2': return <Share2 className="w-4 h-4 text-blue-400" />;
      case 'Mic': return <Mic className="w-4 h-4 text-red-400" />;
      default: return <Zap className="w-4 h-4 text-indigo-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="ask_omni_modal_overlay"
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      <div
        id="ask_omni_command_box"
        className="bg-slate-900/95 border border-slate-700/80 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden text-slate-100 animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/60">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          </div>
          <input
            ref={inputRef}
            id="input_ask_omni_search"
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask OMNI anything... (e.g. 'Summarise this page', 'Research this topic', 'Compare tabs')"
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
            <span>ESC</span>
          </div>
        </div>

        {/* Command List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  id={`cmd_item_${cmd.id}`}
                  onClick={() => executeCommand(cmd)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-600/20 border border-indigo-500/40 text-white'
                      : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                      {getIcon(cmd.icon)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold flex items-center gap-2">
                        <span>{cmd.title}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded">
                          {cmd.category.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate max-w-md">{cmd.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {cmd.shortcut && (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                        {cmd.shortcut}
                      </span>
                    )}
                    <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center space-y-2">
              <Sparkles className="w-6 h-6 text-indigo-400 mx-auto" />
              <p className="text-xs text-slate-300">
                Press <strong>Enter</strong> to ask OMNI: <em>"{searchQuery}"</em>
              </p>
              <p className="text-[11px] text-slate-500">
                Context provided: {activeTab.title} ({activeTab.url})
              </p>
            </div>
          )}
        </div>

        {/* Quick Footer Hints */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Command className="w-3 h-3 text-slate-500" />
              <span>Sovereign Context Active</span>
            </span>
            <span className="text-slate-600">•</span>
            <span>Zero Telemetry</span>
          </div>
          <div className="flex items-center gap-2">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
        </div>
      </div>
    </div>
  );
};
