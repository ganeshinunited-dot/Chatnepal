import { Plus, File, Image as ImageIcon, Wand2, Lock, ArrowUp, Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      setIsMenuOpen(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 500 * 1024) {
      alert("File size exceeds 500KB limit.");
      e.target.value = '';
      return;
    }
    
    alert(`File ready: ${file.name}`);
    setIsMenuOpen(false);
    e.target.value = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="max-w-3xl mx-auto w-full relative">
      {/* Options Popup placed outside the chat box completely */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9, transformOrigin: 'bottom left' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[calc(100%+16px)] -left-2 flex gap-3 z-50"
          >
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 flex flex-col items-center justify-center text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all" 
              title="File"
            >
              <File className="w-4 h-4" />
            </button>
            <button 
              onClick={() => alert("Photo upload is currently locked.")}
              className="relative w-10 h-10 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-80" 
              title="Photo"
            >
              <Lock className="absolute top-1 right-1 w-3 h-3 text-slate-400" />
              <ImageIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => alert("Image generator is currently locked.")}
              className="relative w-10 h-10 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 cursor-not-allowed opacity-80" 
              title="Create Image"
            >
              <Lock className="absolute top-1 right-1 w-3 h-3 text-slate-400" />
              <Wand2 className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800 rounded-[28px] p-3 flex flex-col transition-colors shadow-sm">
        <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
            window.dispatchEvent(new Event('resize'));
          }, 300);
        }}
        placeholder="Ask anything..."
        className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none resize-none min-h-[44px] px-2 py-2 text-sm scrollbar-hide"
        rows={1}
        disabled={disabled}
      />
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="*/*"
      />
      
      <div className="flex items-center justify-between mt-1 px-1">
        <div className="flex items-center gap-2">
          {/* Plus button & Menu Container */}
          <div className="relative flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-8 h-8 rounded-full bg-white dark:bg-white flex items-center justify-center text-slate-900 shadow-sm hover:scale-105 active:scale-95 transition-all border border-slate-200 dark:border-transparent"
            >
              <Plus className={`w-5 h-5 transition-transform duration-200 ${isMenuOpen ? 'rotate-45' : ''}`} />
            </button>
          </div>
          
          {/* Search Button */}
          <button className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors font-medium text-[13px] ml-1">
            <Globe className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            input.trim() && !disabled
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 active:scale-95 shadow-sm'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
          }`}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);
}
