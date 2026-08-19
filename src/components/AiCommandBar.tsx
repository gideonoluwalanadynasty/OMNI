import { useState, useEffect, useRef, FormEvent } from 'react';
import { Terminal, Send, Sparkles, HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiCommandBarProps {
  isOpen: boolean;
  onClose: () => void;
  runAiCommand: (cmd: string) => Promise<{ success: boolean; text: string }>;
}

export function AiCommandBar({ isOpen, onClose, runAiCommand }: AiCommandBarProps) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setResponse(null);
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);

    // Simulate small latency for realistic AI process feel
    setTimeout(async () => {
      const res = await runAiCommand(input);
      setResponse(res.text);
      setLoading(false);
    }, 400);
  };

  const insertSuggestion = (cmd: string) => {
    setInput(cmd);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div id="omni-ai-backdrop" className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        id="omni-ai-command-container"
        className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden font-sans"
      >
        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
          <Terminal className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            OMNI Command Interface
          </span>
          <button
            onClick={onClose}
            className="ml-auto text-neutral-400 hover:text-neutral-600 dark:hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command (e.g., /pay oluwalana 500 or /launch pay)..."
            className="w-full px-6 py-5 text-base text-neutral-900 dark:text-white placeholder-neutral-400 bg-transparent outline-none pr-16"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {loading ? (
              <div className="w-5 h-5 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <button
                type="submit"
                className="bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 p-2 rounded-xl transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        <div className="p-5 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800 text-xs">
          <AnimatePresence mode="wait">
            {response ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl max-h-60 overflow-y-auto"
              >
                <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-2 font-medium">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>Execution Result</span>
                </div>
                <pre className="text-neutral-800 dark:text-neutral-200 font-mono leading-relaxed whitespace-pre-wrap break-words">
                  {response}
                </pre>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 font-semibold mb-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span>Quick Interactive Tasks</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => insertSuggestion('/pay oluwalana 250')}
                      className="px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-left font-mono"
                    >
                      /pay oluwalana 250
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSuggestion('/launch pay')}
                      className="px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-left font-mono"
                    >
                      /launch pay
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSuggestion('/status')}
                      className="px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-left font-mono"
                    >
                      /status
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSuggestion('/flag omni-pay-instant')}
                      className="px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-left font-mono"
                    >
                      /flag omni-pay-instant
                    </button>
                  </div>
                </div>

                <div className="border-t border-neutral-200/50 dark:border-neutral-800/50 pt-3">
                  <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 font-semibold mb-1">
                    <HelpCircle className="w-4 h-4 text-neutral-400" />
                    <span>Ask OMNI Engine</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => insertSuggestion('What is my wallet balance?')}
                      className="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                    >
                      "What is my wallet balance?"
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSuggestion('List system router nodes')}
                      className="px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                    >
                      "List system router nodes"
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSuggestion('/help')}
                      className="px-3 py-1 bg-neutral-900 text-white border border-transparent rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer font-mono"
                    >
                      /help (view all)
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
