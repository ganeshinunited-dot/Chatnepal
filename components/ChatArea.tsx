import { Menu, ChevronDown, Check, Lock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Message, AIModel } from '../types';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import ModelLogo from './ModelLogo';

interface ChatAreaProps {
  messages: Message[];
  onSend: (content: string) => void;
  onOpenSidebar: () => void;
  isThinking: boolean;
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

const MODELS: AIModel[] = ['ChatNP', 'Gemini', 'ChatGPT', 'Claude'];

export default function ChatArea({ messages, onSend, onOpenSidebar, isThinking, selectedModel, onModelChange }: ChatAreaProps) {
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
              नमस्ते! म ChatNP
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg text-sm md:text-base leading-relaxed">
              म तपाईलाई नेपाली भाषा, संस्कृति, लेखन, र अन्य विभिन्न विषयहरूमा सहयोग गर्न तयार छु। म तपाईलाई कसरी मद्दत गर्न सक्छु?
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
              I'm ChatGPT, an AI language model created by OpenAI. How can I help you today?
            </p>
          </>
        );
      case 'Claude':
        return (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
              Hello, I'm Claude
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg text-sm md:text-base leading-relaxed">
              I'm an AI assistant created by Anthropic. I'm here to help with writing, analysis, coding, and more.
            </p>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 relative transition-colors">
      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between z-20 pointer-events-none">
        <button 
          onClick={onOpenSidebar}
          className="md:hidden p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-full shadow-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors pointer-events-auto"
          title="Open Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
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
      <div className="p-4 md:pb-6 bg-slate-50 dark:bg-slate-900 transition-colors">
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
