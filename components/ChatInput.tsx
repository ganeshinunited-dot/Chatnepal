import { Plus, File, Image as ImageIcon, Wand2, Lock, ArrowUp, Globe, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatInputProps {
  onSend: (message: string, fileData?: { name: string; content: string }) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ name: string; content: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if ((input.trim() || attachedFile) && !disabled) {
      onSend(input.trim() || `Analyze this file: ${attachedFile?.name}`, attachedFile || undefined);
      setInput('');
      setAttachedFile(null);
      setIsMenuOpen(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {
      alert('Files must be smaller than 2 MB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string || '';
      setAttachedFile({ name: file.name, content });
      setIsMenuOpen(false);
    };
    reader.onerror = () => {
      alert('We could not read this file.');
    };

    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md') || file.name.endsWith('.json') || file.name.endsWith('.js') || file.name.endsWith('.ts')) {
      reader.readAsText(file);
    } else {
      // For binary files like PDF, read as data url or base64
      reader.readAsDataURL(file);
    }
    
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
              className="w-10 h-10 flex flex-col items-center justify-center text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer" 
              title="Upload File"
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

      <div className="w-full rounded-[26px] border border-white/45 bg-white/48 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.14)] backdrop-blur-2xl transition-colors dark:border-white/10 dark:bg-slate-950/45 dark:shadow-black/25">
        
        {/* Attached File Preview Badge */}
        {attachedFile && (
          <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-xl px-3 py-1.5 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <File className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-xs font-medium text-blue-900 dark:text-blue-200 truncate">{attachedFile.name}</span>
            </div>
            <button 
              onClick={() => setAttachedFile(null)}
              className="p-1 text-blue-500 hover:text-red-500 transition-colors"
              title="Remove file"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

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
          placeholder={attachedFile ? 'Ask about this file...' : 'Ask anything or upload a file...'}
          className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none resize-none min-h-[44px] px-2 py-2 text-sm scrollbar-hide"
          rows={1}
          disabled={disabled}
        />
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept=".txt,.md,.json,.js,.ts,.csv,.pdf,.png,.jpg,.jpeg"
        />
        
        <div className="flex items-center justify-between mt-1 px-1">
          <div className="flex items-center gap-2">
            {/* Plus button & Menu Container */}
            <div className="relative flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-white/75 text-slate-900 shadow-sm transition-all hover:scale-105 hover:bg-white active:scale-95 dark:border-white/20 dark:bg-white/90"
                title="Attach file"
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
            disabled={(!input.trim() && !attachedFile) || disabled}
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-all ${
              (input.trim() || attachedFile) && !disabled
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
