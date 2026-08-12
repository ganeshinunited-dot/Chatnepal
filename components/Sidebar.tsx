import { useState } from 'react';
import { ChatSession, UserProfile } from '../types';
import ModelLogo from './ModelLogo';
import { Plus, Search, Settings, PanelLeftClose } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  sessions: ChatSession[];
  activeChatId?: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  user: UserProfile;
}

export default function Sidebar({ isOpen, onClose, onOpenSettings, onOpenProfile, sessions, activeChatId, onSelectChat, onNewChat, user }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

  const filteredSessions = sessions.filter(session => 
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center shadow-sm">
            <ModelLogo model="ChatNP" className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">ChatNP</span>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col min-h-0 overflow-hidden">
        <button 
          onClick={onNewChat}
          className="w-full py-3 px-4 flex-shrink-0 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 justify-center mb-4 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
        
        {/* Search Bar */}
        <div className="relative mb-6 flex-shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search history..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 focus:border-blue-500 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        <div className="space-y-1 overflow-y-auto flex-1 pr-1 -mr-1">
          <div className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold px-2 mb-2">
            Recent History
          </div>
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => {
              const isActive = session.id === activeChatId;
              return (
                <div
                  key={session.id}
                  onClick={() => onSelectChat(session.id)}
                  className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer group transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-slate-400 dark:group-hover:bg-slate-500'}`}></div>
                  <span className={`text-sm truncate ${isActive ? 'font-medium text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>
                    {session.title}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="px-2 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
              No chats found.
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-1 gap-2">
          <div 
            onClick={onOpenProfile}
            className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400 text-sm overflow-hidden bg-cover bg-center" style={user.avatarUrl ? { backgroundImage: `url(${user.avatarUrl})` } : {}}>
              {!user.avatarUrl && initials}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">{user.name}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 truncate">Free Plan</span>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md md:hidden" title="Close Sidebar">
                <PanelLeftClose className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); onOpenSettings(); }} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors" title="Settings">
                <Settings className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
