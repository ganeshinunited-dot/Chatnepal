'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, User, Settings2, Plus, MessageSquare, Leaf, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
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
        body: JSON.stringify({
          message: userMessage,
          history: messages
            .filter((m) => m.content.trim())
            .slice(-12)
            .map((m) => ({ role: m.role, content: m.content })),
        })
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

  const suggestions = [
    { icon: <Leaf className="w-4 h-4 text-emerald-500" />, text: "Give me tips for tomato farming in Nepal" },
    { icon: <Briefcase className="w-4 h-4 text-blue-500" />, text: "Write a polite business email" },
    { icon: <GraduationCap className="w-4 h-4 text-purple-500" />, text: "Explain Newton's laws simply" }
  ];

  return (
    // Fixed height for mobile browsers using 100dvh to prevent bottom cutoff
    <div className="flex h-[100dvh] bg-[#050505] text-white font-sans overflow-hidden selection:bg-blue-900/50">
      
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex flex-col w-64 border-r border-white/5 bg-[#080808] p-4 shrink-0">
        <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to KarkTech</span>
        </Link>

        <button 
          aria-label="Start a new chat"
          onClick={() => setMessages([{ role: 'assistant', content: 'Namaste! I am ChatNP, developed by KarkTech. How can I help you today?' }])}
          className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-brand-blue hover:bg-brand-blue-bright text-white font-medium transition-colors text-sm mb-6"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>

        <div className="flex-1 overflow-y-auto space-y-1">
          <p className="text-xs font-semibold text-zinc-600 uppercase tracking-wider mb-3 px-2">Recent Chats</p>
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 text-left text-sm text-zinc-300 transition-colors group" aria-label="Open recent chat: Explain quantum computing...">
            <MessageSquare className="w-4 h-4 text-zinc-500 group-hover:text-brand-blue-bright shrink-0" />
            <span className="truncate">Explain quantum computing...</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 text-left text-sm text-zinc-300 transition-colors group" aria-label="Open recent chat: Nepali agriculture tips">
            <MessageSquare className="w-4 h-4 text-zinc-500 group-hover:text-brand-blue-bright shrink-0" />
            <span className="truncate">Nepali agriculture tips</span>
          </button>
        </div>

        <div className="pt-4 border-t border-white/5 mt-auto">
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 text-left text-sm text-zinc-400 transition-colors" aria-label="Open settings">
            <Settings2 className="w-4 h-4 shrink-0" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area - Pure flex column structure with blended background photo */}
      <div className="relative flex-1 flex flex-col min-w-0 bg-[#050505]">
        {/* Background photo — darkened, blurred-edge blend with the black theme */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/chat-bg.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[#050505]/82" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050505] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050505]/60 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050505]/60 to-transparent" />
        </div>
        
        {/* Header - Fixed height, shrink-0 prevents it from squishing */}
        <header className="shrink-0 h-14 border-b border-white/5 flex items-center justify-between px-4 bg-[#050505]">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="md:hidden text-zinc-400 hover:text-white shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-6 h-6 bg-gradient-to-br from-brand-blue to-brand-red rounded flex items-center justify-center text-[10px] font-bold text-white">
                NP
              </div>
              <div className="flex items-baseline gap-1.5 hidden sm:flex">
                <span className="font-semibold text-sm">ChatNP</span>
                <span className="text-[10px] text-zinc-500">v1.0</span>
              </div>
            </div>
          </div>
          
          {/* Model Badge — NP1 MONI (Live) */}
          <div className="shrink-0 ml-2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-white/10 bg-zinc-900/80 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue-bright" />
            <span className="text-xs font-semibold text-white">NP1 MONI</span>
            <span className="hidden sm:inline text-[10px] font-medium text-zinc-400">·</span>
            <span className="hidden sm:inline text-[10px] font-medium text-emerald-400">Live</span>
          </div>
        </header>

        {/* Scrollable Messages Area */}
        <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded bg-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[9px] font-bold text-white">NP</span>
                  </div>
                )}
                
                <div className={`max-w-[85%] sm:max-w-[75%] px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-zinc-800 text-white rounded-2xl rounded-tr-sm' 
                    : 'bg-transparent text-zinc-300 rounded-2xl rounded-tl-sm border border-white/10'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-7 h-7 rounded bg-brand-blue flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[9px] font-bold text-white">NP</span>
                  </div>
                <div className="flex items-center gap-1.5 px-4 py-3 bg-transparent border border-white/10 rounded-2xl rounded-tl-sm h-10">
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} className="h-2" />
          </div>
        </div>

        {/* Input Area - Fixed at bottom within the flex column (no absolute positioning) */}
        <div className="relative z-10 shrink-0 bg-[#050505] p-4 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            
            {/* Suggestions - Visible only when chat has 1 message */}
            {messages.length === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                {suggestions.map((item, idx) => (
                  <button 
                    key={idx}
                    aria-label={`Use suggestion: ${item.text}`}
                    onClick={() => setInput(item.text)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:bg-zinc-900 transition-colors text-left"
                  >
                    <div className="shrink-0">{item.icon}</div>
                    <span className="text-xs text-zinc-400 font-medium">{item.text}</span>
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative flex items-end bg-zinc-900 border border-white/10 rounded-xl focus-within:border-brand-blue/50 transition-colors">
              <label htmlFor="chat-input" className="sr-only">Message ChatNP</label>
              <textarea 
                id="chat-input"
                aria-label="Message ChatNP"
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
                className="w-full bg-transparent py-3.5 pl-4 pr-12 text-sm text-white focus:outline-none resize-none max-h-32 min-h-[50px] placeholder:text-zinc-600"
                disabled={isLoading}
              />
              <div className="absolute right-1.5 bottom-1.5">
                <button 
                  type="submit"
                  aria-label="Send message"
                  disabled={!input.trim() || isLoading}
                  className="p-2 rounded-lg bg-brand-blue hover:bg-brand-blue-bright disabled:bg-zinc-800 disabled:text-zinc-600 text-white flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-zinc-500 font-medium">ChatNP can make mistakes. Verify important information.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
