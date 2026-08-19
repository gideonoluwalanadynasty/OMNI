import React from 'react';
import {
  Sparkles,
  X,
  CheckCircle2,
  ArrowRight,
  FileText,
  Calendar,
  CheckSquare,
  BookOpen,
  ShieldAlert,
  Download,
  Copy,
  ExternalLink
} from 'lucide-react';
import { WorkspaceAiQueryResponse } from '../../../types/workspace';

interface OmniWorkspaceAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  response: WorkspaceAiQueryResponse | null;
  onExecuteAction?: (actionType: string, payload?: any) => void;
}

export const OmniWorkspaceAiModal: React.FC<OmniWorkspaceAiModalProps> = ({
  isOpen,
  onClose,
  response,
  onExecuteAction
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !response) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(response.summaryMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-200 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-gradient-to-r from-stone-900 via-indigo-950/40 to-stone-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono text-[10px] uppercase font-bold">
                  OMNI Sovereign Intelligence
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {response.queryType.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-bold text-stone-100 mt-0.5">{response.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans select-text">
          <div className="prose prose-invert max-w-none space-y-3 whitespace-pre-wrap font-sans">
            {response.summaryMarkdown}
          </div>

          {/* Suggested Actions Bar */}
          {response.suggestedActions && response.suggestedActions.length > 0 && (
            <div className="pt-4 border-t border-stone-800/80 space-y-2.5">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Suggested Follow-Up Workspace Actions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {response.suggestedActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (onExecuteAction) onExecuteAction(action.actionType, action.payload);
                      onClose();
                    }}
                    className="px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600 hover:text-white text-indigo-300 border border-indigo-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm group"
                  >
                    <span>{action.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950/80 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Zero-Knowledge Local Execution • No DOM Sent to Third Parties</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
