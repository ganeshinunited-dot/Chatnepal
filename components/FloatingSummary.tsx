'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, MessageSquareText, Loader2 } from 'lucide-react';

export function FloatingSummary() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const fetchSummary = async () => {
    if (summary) {
      setIsOpen(true);
      return;
    }
    setLoading(true);
    setIsOpen(true);
    try {
      const res = await fetch('/api/v1/summarize', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        setSummary(data.summary);
      } else {
        setSummary('माफ गर्नुहोला, सारांश लोड गर्न सकिएन: ' + (data.error || 'Unknown error'));
      }
    } catch (err: any) {
      setSummary('त्रुटि देखियो: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Round Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchSummary}
          className="flex items-center gap-2.5 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl border border-blue-400/30 transition-all font-medium text-sm group"
          title="Summarize to ChatNP"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-blue-200 animate-pulse" />
          </div>
          <span className="tracking-wide">Summarize to ChatNP</span>
        </motion.button>
      </div>

      {/* Summary Modal / Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-slate-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <MessageSquareText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">ChatNP Quick Summary</h3>
                    <p className="text-xs text-slate-400">Powered by NP1 MONI & Meta AI</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 min-h-[140px] flex items-center justify-center">
                {loading ? (
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    <p className="text-sm">ल्यान्डिङ पेजको सारांश तयार गर्दैछ...</p>
                  </div>
                ) : (
                  <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
                    {summary}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end pt-4 border-t border-slate-800 text-xs text-slate-400">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-medium"
                >
                  बन्द गर्नुहोस् (Close)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
