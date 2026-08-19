import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Toast {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'error';
}

interface ToastSystemProps {
  toasts: Toast[];
}

export function ToastSystem({ toasts }: ToastSystemProps) {
  return (
    <div id="omni-toast-container" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            id={`toast-${toast.id}`}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto p-4 rounded-xl border flex gap-3 shadow-xl backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-neutral-900/95 text-white border-neutral-800'
                : toast.type === 'error'
                ? 'bg-red-950/95 text-red-100 border-red-900/60'
                : 'bg-neutral-100/95 text-neutral-900 border-neutral-200'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-wide">{toast.title}</h4>
              <p className="text-xs mt-1 text-neutral-400 font-normal leading-relaxed">
                {toast.description}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
