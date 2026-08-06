'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Sparkles, User, Settings2, Plus, MessageSquare, Leaf, Briefcase, GraduationCap } from 'lucide-react';
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

  // Suggestion Chips Data
  const suggestions = [
    { icon: <Leaf className="w-4 h-4 text-emerald-400" />, text: "Give me tips for tomato farming in Nepal" },
    { icon: <Briefcase className="w-4 h-4 text-blue-400" />, text: "Write a polite business email" },
    { icon: <GraduationCap className="w-4 h-4 text-purple-400" />, text: "Explain Newton's laws simply" }
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-orange-900/50">
      
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r border-white/5 bg-[#080808] p-4 shadow-2xl z-20">
        <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to KarkTech</span>
        </Link>

        <button 
          onClick={() => setMessages([{ role: 'assistant', content: 'Namaste! I am ChatNP, developed by KarkTech. How can I help you today?' }])}
          className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold transition-all text-sm mb-6 shadow-lg shadow-orange-900/20 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>

        <div className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
          <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest mb-3 px-2">Recent Chats</p>
          <button className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-zinc-800/50 text-left text-sm text-zinc-300 transition-colors group">
            <MessageSquare className="w-4 h-4 text-zinc-500 group-hover:text-orange-400 shrink-0 transition-colors" />
            <span className="truncate">Explain quantum computing...</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-zinc-800/50 text-left text-sm text-zinc-300 transition-colors group">
            <MessageSquare className="w-4 h-4 text-zinc-500 group-hover:text-orange-400 shrink-0 transition-colors" />
            <span className="truncate">Nepali agriculture tips</span>
          </button>
        </div>

        <div className="pt-4 border-t border-white/5 mt-auto">
          <button className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-zinc-800/50 text-left text-sm text-zinc-400 transition-colors">
            <Settings2 className="w-4 h-4 shrink-0" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative bg-[#050505]">
        
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 bg-[#050505]/90 backdrop-blur-xl shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center text-[11px] font-black text-white shadow-lg shadow-orange-900/30">
                NP
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-wide">ChatNP</span>
                <span className="text-[10px] text-zinc-500 font-medium">v1.0-alpha</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              className="bg-zinc-900/80 border border-white/10 rounded-lg text-xs font-medium text-zinc-300 px-3 py-1.5 outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer hidden sm:block transition-all hover:bg-zinc-800"
            >
              <option value="chatnp-fast">⚡ Fast (Search Grounded)</option>
              <option value="chatnp-advanced">🧠 Advanced (Deep Think)</option>
            </select>
          </div>
        </header>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 scroll-smooth">
          <div className="max-w-3xl mx-auto py-8 space-y-6">
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shrink-0 shadow-md shadow-orange-900/20 mt-1">
                    <span className="text-[10px] font-bold text-white">NP</span>
                  </div>
                )}
                
                <div className={`max-w-[85%] sm:max-w-[75%] px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-zinc-800 text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-transparent text-zinc-200 rounded-2xl rounded-tl-sm border border-white/5'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 justify-start"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[10px] font-bold text-white">NP</span>
                </div>
                <div className="flex items-center gap-1.5 px-5 py-4 bg-transparent border border-white/5 rounded-2xl rounded-tl-sm h-11">
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Area (Bottom Fixed inside Flex) */}
        <div className="shrink-0 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent pt-4 pb-6 px-4 sm:px-6 z-10">
          <div className="max-w-3xl mx-auto">
            
            {/* Prompt Chips (Shows only when chat is empty) */}
            {messages.length === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4"
              >
                {suggestions.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setInput(item.text)}
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 hover:bg-zinc-900 transition-all text-left group"
                  >
                    <div className="p-1.5 rounded-lg bg-white/5 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-xs text-zinc-400 font-medium leading-tight">{item.text}</span>
                  </button>
                ))}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="relative flex items-end bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl focus-within:ring-1 focus-within:ring-orange-500/50 transition-all">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Message ChatNP..."
                rows={1}
                className="w-full bg-transparent py-4 pl-5 pr-14 text-sm text-white focus:outline-none resize-none max-h-32 min-h-[56px] custom-scrollbar placeholder:text-zinc-500"
                disabled={isLoading}
              />
              <div className="absolute right-2 bottom-2">
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white flex items-center justify-center transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
            <p className="text-[10.5px] text-center text-zinc-500 mt-4 font-medium tracking-wide">
              ChatNP uses contextual intelligence. Responses may occasionally be inaccurate.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
