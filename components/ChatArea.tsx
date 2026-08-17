import { Menu, ChevronDown, Check, Lock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Message, AIModel } from '../types';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import ModelLogo from './ModelLogo';

interface ChatAreaProps {
  messages: Message[];
  onSend: (content: string, fileData?: { name: string; content: string }) => void;
  onOpenSidebar: () => void;
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  isThinking: boolean;
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
  isNight: boolean;
  onToggleNight: () => void;
  authChecked: boolean;
  isAuthenticated: boolean;
  onOpenLogin: () => void;
}

const MODELS: AIModel[] = ['ChatNP', 'Gemini', 'ChatGPT', 'Claude'];

import ThemeToggle from './ThemeToggle';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export default function ChatArea({
  messages,
  onSend,
  onOpenSidebar,
  onToggleSidebar,
  isSidebarCollapsed,
  isThinking,
  selectedModel,
  onModelChange,
  isNight,
  onToggleNight,
  authChecked,
  isAuthenticated,
  onOpenLogin,
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  useEffect(() => {
    const handleResize = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    };
    
    // Listen for window resizes (like keyboard opening)
    window.addEventListener('resize', handleResize);
    
    // Also try to scroll when visual viewport resizes (newer mobile browsers)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderWelcomeContent = () => {
    switch (selectedModel) {
      case 'ChatNP':
        return (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
              Welcome to ChatNP
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg text-sm md:text-base leading-relaxed">
              Your Nepal-first AI companion for language, culture, writing, and everyday questions. You can also upload a file for analysis.
            </p>
          </>
        );
      case 'Gemini':
        return (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
              Welcome to Gemini
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg text-sm md:text-base leading-relaxed">
              Your Google AI assistant, ready to help you write, plan, learn, and more.
            </p>
          </>
        );
      case 'ChatGPT':
        return (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
              ChatGPT
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg text-sm md:text-base leading-relaxed">
              I&apos;m ChatGPT, an AI language model created by OpenAI. How can I help you today?
            </p>
          </>
        );
      case 'Claude':
        return (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
              Hello, I&apos;m Claude
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg text-sm md:text-base leading-relaxed">
              I&apos;m an AI assistant created by Anthropic. I&apos;m here to help with writing, analysis, coding, and more.
            </p>
          </>
        );
    }
  };

  return (
    <div className="relative flex h-full flex-col bg-transparent transition-colors">
      {/* Top Header */}
      <div className="pointer-events-none absolute left-0 top-0 z-25 flex w-full items-center justify-between p-4 md:p-5">
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-white/45 text-slate-600 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden dark:border-white/10 dark:bg-slate-950/35 dark:text-slate-200 dark:hover:bg-white/15"
            title="Open sidebar"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onToggleSidebar}
            className="hidden h-10 items-center gap-2 rounded-2xl border border-white/40 bg-white/45 px-3 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:inline-flex dark:border-white/10 dark:bg-slate-950/35 dark:text-slate-200 dark:hover:bg-white/15"
            title={isSidebarCollapsed ? 'Open sidebar' : 'Collapse sidebar'}
            aria-label={isSidebarCollapsed ? 'Open sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            <span>{isSidebarCollapsed ? 'Open panel' : 'Collapse'}</span>
          </button>
        </div>

        {/* Right Header Actions: Theme Toggle & Login */}
        <div className="pointer-events-auto flex items-center gap-2">
          <ThemeToggle isNight={isNight} onToggle={onToggleNight} />
          {authChecked && !isAuthenticated && (
            <button
              onClick={onOpenLogin}
              className="cursor-pointer rounded-2xl border border-white/40 bg-blue-600/90 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-blue-700 active:scale-95"
              aria-label="Login"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Top Model Selector Badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20" ref={dropdownRef}>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="px-3 py-1.5 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-full shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <ModelLogo model={selectedModel} className="w-4 h-4 text-slate-700 dark:text-slate-200" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 tracking-tight">{selectedModel}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-30">
            <div className="py-1">
              {MODELS.map((model) => {
                const isLocked = model !== 'ChatNP';
                return (
                  <button
                    key={model}
                    onClick={() => {
                      if (isLocked) {
                        alert(`${model} is currently locked.`);
                        return;
                      }
                      onModelChange(model);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors ${
                      isLocked 
                        ? 'cursor-not-allowed opacity-60 hover:bg-slate-50/50 dark:hover:bg-slate-800/50' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer'
                    }`}
                  >
                    <span className={`font-medium flex items-center gap-2 ${selectedModel === model ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}`}>
                      {model}
                    </span>
                    {isLocked ? (
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      selectedModel === model && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pt-16 pb-8 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center mt-32 px-4">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm overflow-hidden">
                <ModelLogo model={selectedModel} className="w-10 h-10 text-slate-700 dark:text-slate-200" />
              </div>
              {renderWelcomeContent()}
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))
          )}

          {isThinking && (
            <MessageBubble message={{ id: 'thinking', role: 'assistant', content: '', isThinking: true }} />
          )}
          
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-transparent p-4 transition-colors md:pb-6">
        <div className="w-full max-w-3xl mx-auto">
          <ChatInput onSend={onSend} disabled={isThinking} />
        </div>
        <div className="text-center mt-3">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-tight">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
