import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Brain,
  Bot,
  User,
  Copy,
  Check,
  BookOpen,
  HelpCircle,
  Code2,
  RefreshCw
} from 'lucide-react';
import { AiTutorMessage } from '../../../types/play_learn_ecosystem';
import { omniPlayLearnService } from '../../../sdk/browser-services/OmniPlayLearnService';

interface OmniAiTutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
  lessonTitle?: string;
}

export const OmniAiTutorDrawer: React.FC<OmniAiTutorDrawerProps> = ({
  isOpen,
  onClose,
  courseTitle,
  lessonTitle
}) => {
  const [messages, setMessages] = useState<AiTutorMessage[]>([
    {
      id: 'init_1',
      role: 'assistant',
      content: `Hello! I am your **OMNI Socratic AI Tutor**. I'm here to help you master ${courseTitle || 'Sovereign Systems & Computer Science'}. Ask me to explain concepts, guide you through code implementations, or test your comprehension with practice questions!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim() || isLoading) return;

    const userMsg: AiTutorMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const response = await omniPlayLearnService.queryAiTutor({
        userMessage: text,
        courseContext: courseTitle,
        lessonTitle: lessonTitle
      });

      const assistantMsg: AiTutorMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        codeSnippet: response.codeSnippet
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `ai_err_${Date.now()}`,
          role: 'assistant',
          content: 'I encountered a brief latency spike while formulating your Socratic explanation. Let us look at the core principles step-by-step.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const quickPrompts = [
    'Explain how PagedAttention prevents KV-cache fragmentation',
    'Walk me through the mathematical difference between AWQ and GPTQ',
    'Generate a 3-question quick quiz on Post-Quantum Cryptography'
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-stone-950 border-l border-stone-800 shadow-2xl flex flex-col justify-between">
      {/* Drawer Header */}
      <div className="p-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-100 flex items-center gap-1.5">
              <span>OMNI Socratic AI Tutor</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono">
                Live
              </span>
            </h3>
            <p className="text-[11px] text-stone-400 truncate max-w-xs">
              Context: {lessonTitle || courseTitle || 'General CS'}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 text-xs ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role === 'assistant' && (
              <div className="w-7 h-7 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 space-y-2.5 ${
                m.role === 'user'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-stone-900 border border-stone-800 text-stone-200 shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed">
                {m.content}
              </div>

              {m.codeSnippet && (
                <div className="rounded-xl bg-stone-950 border border-stone-800 overflow-hidden font-mono text-[11px] mt-2">
                  <div className="px-3 py-1.5 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-stone-400">
                    <span>{m.codeSnippet.language}</span>
                    <button
                      onClick={() => handleCopyCode(m.codeSnippet!.code, m.id)}
                      className="flex items-center gap-1 text-[10px] text-stone-400 hover:text-white"
                    >
                      {copiedCodeId === m.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 text-emerald-300 overflow-x-auto">
                    <code>{m.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              <div
                className={`text-[10px] text-right font-mono ${
                  m.role === 'user' ? 'text-indigo-200' : 'text-stone-500'
                }`}
              >
                {m.timestamp}
              </div>
            </div>

            {m.role === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 text-xs">
            <div className="w-7 h-7 rounded-xl bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400 shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-3 text-stone-400 italic">
              AI Tutor is analyzing lesson parameters...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-stone-900/40 border-t border-stone-800/80 overflow-x-auto flex gap-2">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 text-[11px] whitespace-nowrap transition-colors"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-4 bg-stone-900 border-t border-stone-800 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask a question or request a code breakdown..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-indigo-500"
        />

        <button
          type="submit"
          disabled={!inputVal.trim() || isLoading}
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-colors shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
