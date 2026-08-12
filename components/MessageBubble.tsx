import { Copy, RotateCw, Check, Sun, Moon, Heart } from 'lucide-react';
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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} py-4`}
    >
      {isUser ? (
        <div className="flex flex-col items-end w-full max-w-2xl">
          <div className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap py-1">
            {message.content}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start w-full max-w-3xl">
          {message.isThinking ? (
             <div className="flex items-center gap-3 mt-2 mb-2 px-1">
               <div className="relative w-9 h-9 rounded-full shadow-sm p-[1.5px] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800">
                 <div className="relative w-full h-full rounded-full overflow-hidden border border-white/50 dark:border-slate-800/50">
                   {/* Day Background */}
                   <motion.div
                     animate={{ opacity: [1, 1, 0, 0, 1, 1] }}
                     transition={{ duration: 4, repeat: Infinity, times: [0, 0.15, 0.35, 0.65, 0.85, 1], ease: "easeInOut" }}
                     className="absolute inset-0 bg-gradient-to-tr from-amber-200 via-orange-300 to-rose-300 dark:from-amber-400 dark:via-orange-500 dark:to-rose-500"
                   />
                   {/* Night Background */}
                   <motion.div
                     animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                     transition={{ duration: 4, repeat: Infinity, times: [0, 0.15, 0.35, 0.65, 0.85, 1], ease: "easeInOut" }}
                     className="absolute inset-0 bg-gradient-to-tr from-indigo-800 via-purple-800 to-slate-800 dark:from-indigo-950 dark:via-purple-950 dark:to-black"
                   >
                     {/* Stars */}
                     <div className="absolute top-1.5 left-2 w-[1.5px] h-[1.5px] bg-white/80 rounded-full animate-pulse" />
                     <div className="absolute top-3 right-1.5 w-[2px] h-[2px] bg-white/60 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                     <div className="absolute bottom-2 left-3 w-[1.5px] h-[1.5px] bg-white/90 rounded-full animate-pulse" style={{ animationDuration: '1.5s' }} />
                   </motion.div>

                   {/* Sun */}
                   <motion.div
                     animate={{ 
                       y: [0, 0, 25, -25, 0, 0],
                       opacity: [1, 1, 0, 0, 1, 1],
                       rotate: [0, 0, 90, -90, 0, 0],
                       scale: [1, 1, 0.5, 0.5, 1, 1]
                     }}
                     transition={{ duration: 4, repeat: Infinity, times: [0, 0.15, 0.35, 0.65, 0.85, 1], ease: "easeInOut" }}
                     className="absolute inset-0 flex items-center justify-center text-orange-600 dark:text-yellow-100 drop-shadow-md"
                   >
                     <Sun className="w-5 h-5 fill-current" />
                   </motion.div>

                   {/* Moon */}
                   <motion.div
                     animate={{ 
                       y: [-25, -25, 0, 0, 25, -25],
                       opacity: [0, 0, 1, 1, 0, 0],
                       rotate: [-90, -90, 0, 0, 90, -90],
                       scale: [0.5, 0.5, 1, 1, 0.5, 0.5]
                     }}
                     transition={{ duration: 4, repeat: Infinity, times: [0, 0.15, 0.35, 0.65, 0.85, 1], ease: "easeInOut" }}
                     className="absolute inset-0 flex items-center justify-center text-blue-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                   >
                     <Moon className="w-4 h-4 fill-current text-white" />
                   </motion.div>
                 </div>
               </div>
               
               <motion.div 
                 animate={{ opacity: [0.4, 1, 0.4] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase"
               >
                 Thinking...
               </motion.div>
             </div>
          ) : (
            <div className="text-sm leading-relaxed text-slate-800 dark:text-slate-200 w-full py-1">
              <p className="whitespace-pre-wrap">{message.content}</p>
              
              <div className="flex items-center gap-2 mt-3 pt-1">
                <button onClick={handleCopy} className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors" title="Copy">
                  {copied ? <Check className="w-4 h-4 text-green-500 dark:text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <button className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors" title="Regenerate">
                  <RotateCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsLoved(!isLoved)} 
                  className={`p-1.5 rounded-md transition-colors ${isLoved ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30' : 'text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30'}`} 
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
