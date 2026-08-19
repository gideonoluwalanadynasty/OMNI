import React, { useState } from 'react';
import { omniAi } from '../../../lib/omniAiSdk';
import { 
  Command, Sparkles, FileText, Layers, BarChart2, BookOpen, 
  ArrowRight, RefreshCw, X, CornerDownLeft, CheckCircle2 
} from 'lucide-react';
import { 
  SEED_OMNI_DOCUMENTS, SEED_OMNI_PRESENTATIONS, 
  SEED_OMNI_SPREADSHEETS 
} from '../../../ai_store_data';

interface OmniCommandBarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDocument?: (docId?: string) => void;
  onNavigateToSlideDeck?: (deckId?: string) => void;
  onNavigateToSpreadsheet?: (sheetId?: string) => void;
}

export const OmniCommandBar: React.FC<OmniCommandBarProps> = ({
  isOpen,
  onClose,
  onNavigateToDocument,
  onNavigateToSlideDeck,
  onNavigateToSpreadsheet
}) => {
  const [instruction, setInstruction] = useState('');
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>('doc_sovereign_spec');
  const [targetType, setTargetType] = useState<'document' | 'presentation' | 'spreadsheet'>('presentation');
  const [isLoading, setIsLoading] = useState(false);
  const [executionResult, setExecutionResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleExecute = async () => {
    if (!instruction.trim()) return;
    setIsLoading(true);
    setExecutionResult(null);
    try {
      const selectedDoc = SEED_OMNI_DOCUMENTS.find(d => d.id === selectedArtifactId);
      const selectedSheet = SEED_OMNI_SPREADSHEETS.find(s => s.id === selectedArtifactId);
      const selectedPres = SEED_OMNI_PRESENTATIONS.find(p => p.id === selectedArtifactId);
      const title = selectedDoc?.title || selectedSheet?.title || selectedPres?.title || selectedArtifactId;
      const type = selectedDoc ? 'document' : selectedSheet ? 'sheet' : 'slide';

      const resp = await omniAi.executeCommandBar({
        commandPrompt: `${instruction} (Output format: ${targetType})`,
        inputArtifactReferences: [
          {
            id: selectedArtifactId,
            type,
            title,
            contentSnippet: selectedDoc?.content?.substring(0, 300) || selectedSheet?.description || selectedPres?.subtitle
          }
        ],
        organizationId: 'org_dynasty'
      });
      setExecutionResult({
        success: resp.success,
        summary: resp.summaryMessage,
        createdArtifactType: resp.generatedArtifactType === 'slide' ? 'presentation' : resp.generatedArtifactType,
        createdArtifactId: resp.artifact?.id
      });
    } catch (err: any) {
      setExecutionResult({
        success: false,
        summary: `Execution notice: ${err.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyResult = () => {
    if (!executionResult) return;
    if (executionResult.createdArtifactType === 'presentation' && onNavigateToSlideDeck) {
      onNavigateToSlideDeck(executionResult.createdArtifactId);
    } else if (executionResult.createdArtifactType === 'document' && onNavigateToDocument) {
      onNavigateToDocument(executionResult.createdArtifactId);
    } else if (executionResult.createdArtifactType === 'spreadsheet' && onNavigateToSpreadsheet) {
      onNavigateToSpreadsheet(executionResult.createdArtifactId);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center pt-24 p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Top Input Bar */}
        <div className="p-4 border-b border-neutral-800 flex items-center space-x-3 bg-neutral-900/90">
          <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <input
            id="omni-command-bar-input"
            type="text"
            value={instruction}
            onChange={e => setInstruction(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleExecute()}
            placeholder="Ask OMNI AI Command Bar (e.g. 'Turn this research into a 10-slide presentation')..."
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 rounded text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Options */}
        <div className="p-4 bg-neutral-950/60 border-b border-neutral-800 grid grid-cols-2 gap-4 text-xs">
          {/* Source Artifact Reference */}
          <div>
            <label className="text-neutral-400 font-semibold block mb-1.5">Referenced Source Artifact</label>
            <select
              value={selectedArtifactId}
              onChange={e => setSelectedArtifactId(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
            >
              <optgroup label="Documents">
                {SEED_OMNI_DOCUMENTS.map(d => (
                  <option key={d.id} value={d.id}>{d.title}</option>
                ))}
              </optgroup>
              <optgroup label="Spreadsheets">
                {SEED_OMNI_SPREADSHEETS.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </optgroup>
              <optgroup label="Presentations">
                {SEED_OMNI_PRESENTATIONS.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Target Artifact Output */}
          <div>
            <label className="text-neutral-400 font-semibold block mb-1.5">Synthesize Into</label>
            <div className="flex bg-neutral-800 p-0.5 rounded-lg border border-neutral-700">
              <button
                onClick={() => setTargetType('presentation')}
                className={`flex-1 py-1 rounded text-center transition-colors ${
                  targetType === 'presentation' ? 'bg-amber-600 text-white font-semibold' : 'text-neutral-400'
                }`}
              >
                Slides
              </button>
              <button
                onClick={() => setTargetType('document')}
                className={`flex-1 py-1 rounded text-center transition-colors ${
                  targetType === 'document' ? 'bg-indigo-600 text-white font-semibold' : 'text-neutral-400'
                }`}
              >
                Document
              </button>
              <button
                onClick={() => setTargetType('spreadsheet')}
                className={`flex-1 py-1 rounded text-center transition-colors ${
                  targetType === 'spreadsheet' ? 'bg-emerald-600 text-white font-semibold' : 'text-neutral-400'
                }`}
              >
                Sheet
              </button>
            </div>
          </div>
        </div>

        {/* Preset Suggestion Chips */}
        <div className="p-4 space-y-2">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">Synthesize Quick Presets</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { text: 'Turn research spec into 6-slide executive deck', target: 'presentation' as const },
              { text: 'Analyse financial spreadsheet and draft executive report', target: 'document' as const },
              { text: 'Extract KPI tables from whitepaper into calculated sheet', target: 'spreadsheet' as const },
              { text: 'Summarise architecture doc into client proposal', target: 'document' as const }
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInstruction(preset.text);
                  setTargetType(preset.target);
                }}
                className="text-left p-2 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 transition-colors flex items-center justify-between"
              >
                <span className="truncate">{preset.text}</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Execution Result Box */}
        {executionResult && (
          <div className="p-4 bg-neutral-950 border-t border-neutral-800 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>{executionResult.summary || 'Artifact generated successfully!'}</span>
            </div>
            <button
              onClick={handleApplyResult}
              className="w-full py-2 px-4 text-xs font-semibold rounded-lg bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white shadow-md flex items-center justify-center space-x-1.5"
            >
              <span>Open Generated {executionResult.createdArtifactType?.toUpperCase() || 'ARTIFACT'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center space-x-1">
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 font-mono text-[10px]">Enter</kbd>
            <span>to execute</span>
          </div>
          <button
            onClick={handleExecute}
            disabled={isLoading || !instruction.trim()}
            className="px-4 py-1.5 font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 flex items-center space-x-1.5"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Orchestrating...</span>
              </>
            ) : (
              <>
                <span>Run Command</span>
                <CornerDownLeft className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
