'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, MessageSquareText, Loader2, Presentation } from 'lucide-react';

export function FloatingSummary() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'deck'>('general');

  const fetchSummary = async (type: 'general' | 'deck' = 'general') => {
    setActiveTab(type);
    setLoading(true);
    setIsOpen(true);
    try {
      const res = await fetch('/api/v1/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      if (data.success) {
        setSummary(data.summary);
      } else {
        setSummary('Failed to load summary: ' + (data.error || 'Unknown error'));
      }
    } catch (err: any) {
      setSummary('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Floating Panel / Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 bg-slate-900 border border-slate-800 rounded-2xl w-[90vw] max-w-sm sm:max-w-md p-5 shadow-2xl relative text-slate-100 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <MessageSquareText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">ChatNP Quick Summary</h3>
                  <p className="text-[11px] text-slate-400">Powered by NP1 MONI</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Action Switcher Tabs */}
            <div className="flex items-center gap-1.5 mt-3">
              <button
                onClick={() => fetchSummary('general')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'general'
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                Website Summary
              </button>
              <button
                onClick={() => fetchSummary('deck')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-[11px] font-medium transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'deck'
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Presentation className="w-3 h-3" />
                Investor Deck
              </button>
            </div>

            {/* Content box with internal scrolling */}
            <div className="py-4 max-h-[260px] overflow-y-auto flex items-center justify-center pr-1 custom-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center gap-2 text-slate-400 py-6">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                  <p className="text-xs">
                    {activeTab === 'deck'
                      ? 'Analyzing pitch deck for investors...'
                      : 'Generating clean summary...'}
                  </p>
                </div>
              ) : (
                <div className="text-xs leading-relaxed text-slate-300 whitespace-pre-wrap w-full text-left">
                  {summary}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="text-slate-500">KarkTech</span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium text-[11px]"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Round Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (!isOpen) {
            fetchSummary('general');
          } else {
            setIsOpen(false);
          }
        }}
        className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl border border-blue-400/30 transition-all font-sans font-medium text-xs group"
        title="Summarize to ChatNP"
      >
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-blue-200 animate-pulse" />
        </div>
        <span className="tracking-wide">Summarize to ChatNP</span>
      </motion.button>
    </div>
  );
}
