import { Copy, RotateCw, Check, Heart } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [isLoved, setIsLoved] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} py-3`}
    >
      {isUser ? (
        <div className="flex flex-col items-end w-full max-w-2xl px-4 py-3 milky-card rounded-2xl rounded-tr-sm text-sm leading-relaxed text-slate-900 dark:text-white shadow-sm">
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
      ) : (
        <div className="flex flex-col items-start w-full max-w-3xl">
          {message.isThinking ? (
             <div className="flex items-center gap-3 my-2 px-4 py-3 milky-card rounded-xl border border-white/40">
               <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
               <span className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide">
                 ChatNP is thinking...
               </span>
             </div>
          ) : (
            <div className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 w-full py-1 px-1">
              <p className="whitespace-pre-wrap">{message.content}</p>
              
              <div className="flex items-center gap-2 mt-3 pt-1">
                <button onClick={handleCopy} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors" title="Copy">
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors" title="Regenerate">
                  <RotateCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsLoved(!isLoved)} 
                  className={`p-1.5 rounded-md transition-colors ${isLoved ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`} 
                  title="Love"
                >
                  <Heart className={`w-4 h-4 ${isLoved ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
