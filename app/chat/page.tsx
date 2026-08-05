'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Sparkles, User, Settings2, Plus, MessageSquare } from 'lucide-react';
import { motion } from "motion/react";

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatNPInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Namaste! I am ChatNP, developed by KarkTech. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const [modelType, setModelType] = useState('chatnp-fast');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, modelType })
      });

      if (!res.ok) throw new Error('API Error');
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting to my servers right now.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-body selection:bg-orange-900/50">
      
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r border-white/5 bg-[#050505] p-4">
        <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to KarkTech</span>
        </Link>

        <button className="flex items-center gap-2 w-full h-10 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold transition-colors text-sm mb-6 shadow-lg shadow-orange-900/20">
          <Plus className="w-4 h-4" />
          New Chat
        </button>

        <div className="flex-1 overflow-y-auto space-y-2">
          <p className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-3">Recent</p>
          <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-zinc-900 text-left text-sm text-zinc-300 transition-colors">
            <MessageSquare className="w-4 h-4 text-zinc-500 shrink-0" />
            <span className="truncate">Explain quantum computing...</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-zinc-900 text-left text-sm text-zinc-300 transition-colors">
            <MessageSquare className="w-4 h-4 text-zinc-500 shrink-0" />
            <span className="truncate">Nepali agriculture tips</span>
          </button>
        </div>

        <div className="pt-4 border-t border-white/5 mt-auto">
          <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-zinc-900 text-left text-sm text-zinc-300 transition-colors">
            <Settings2 className="w-4 h-4 text-zinc-500 shrink-0" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        
        {/* Header */}
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 bg-[#050505]/80 backdrop-blur-md absolute top-0 left-0 right-0 z-10">
          <div className="flex items-center gap-3">
            <Link href="/" className="md:hidden text-zinc-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="font-heading font-medium text-lg flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-600 rounded-md flex items-center justify-center text-[10px] font-black text-white">NP</div>
              <span>ChatNP</span> <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-zinc-400 font-body">v1.0-alpha</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              className="bg-zinc-900 border border-white/10 rounded-md text-sm text-zinc-300 px-2 py-1 outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer hidden sm:block"
            >
              <option value="chatnp-fast">ChatNP Fast (Search Grounded)</option>
              <option value="chatnp-advanced">ChatNP Advanced (Deep Think)</option>
            </select>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto pt-20 pb-32 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-orange-900/40">
                    <span className="text-[10px] font-bold text-white">NP</span>
                  </div>
                )}
                
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-zinc-800/80 text-zinc-300 rounded-tr-none' 
                    : 'bg-white/5 border border-white/5 text-zinc-300 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 text-xs text-zinc-300">
                    U
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-orange-900/40">
                  <span className="text-[10px] font-bold text-white">NP</span>
                </div>
                <div className="flex items-center gap-1.5 px-4 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none h-11">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent pt-10 pb-6 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto relative">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message ChatNP..."
                className="w-full bg-zinc-800 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-zinc-500 shadow-xl"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1.5 bottom-1.5 p-1.5 w-auto h-auto rounded-lg bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-center text-zinc-600 mt-3 uppercase tracking-widest">
              Nepal&apos;s First Sovereign AI Architecture
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
