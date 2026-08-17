import { useState } from 'react';
import { ChatSession, UserProfile } from '../types';
import ModelLogo from './ModelLogo';
import { Plus, Search, Settings, PanelLeftClose, Trash2, LogOut, LoaderCircle } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed?: boolean;
  onClose: () => void;
  onToggleCollapse?: () => void;
  onOpenSettings: () => void;
  onOpenProfile: () => void;
  sessions: ChatSession[];
  activeChatId?: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  onClearHistory: () => void;
  isManagingHistory?: boolean;
  isAuthenticated: boolean;
  onLogout: () => void;
  user: UserProfile;
}

export default function Sidebar({
  isOpen,
  isCollapsed = false,
  onClose,
  onToggleCollapse,
  onOpenSettings,
  onOpenProfile,
  sessions,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onClearHistory,
  isManagingHistory = false,
  isAuthenticated,
  onLogout,
  user,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const initials = user.name ? user.name.split(' ').map((name) => name[0]).join('').substring(0, 2).toUpperCase() : 'U';

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[26px] border border-white/35 bg-white/35 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl transition-colors dark:border-white/10 dark:bg-slate-950/35 dark:shadow-black/20">
      <div className="flex items-center justify-between border-b border-white/30 px-4 py-4 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <ModelLogo model="ChatNP" className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">ChatNP</span>
        </div>
        <div className="flex items-center gap-1">
          {onToggleCollapse && !isCollapsed && (
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden rounded-xl p-2 text-slate-500 transition hover:bg-white/60 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:inline-flex dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-white/60 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
            title="Close sidebar"
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="h-4 w-4 md:hidden" />
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4">
        <button
          onClick={onNewChat}
          className="mb-4 flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-2xl border border-white/35 bg-white/35 px-4 py-3 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-white/60 dark:border-white/10 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/15"
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </button>

        <div className="relative mb-6 flex-shrink-0">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search history..."
            className="w-full rounded-2xl border border-white/35 bg-white/35 py-2.5 pl-9 pr-4 text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white/55 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-white/10 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-white/15 dark:focus:ring-blue-500/40"
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="mb-2 flex items-center justify-between px-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Recent History</span>
            {isAuthenticated && sessions.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                disabled={isManagingHistory}
                className="text-[10px] font-bold text-red-500 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:text-red-300"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="-mr-1 flex-1 space-y-1 overflow-y-auto pr-1">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => {
                const isActive = session.id === activeChatId;
                return (
                  <div
                    key={session.id}
                    onClick={() => onSelectChat(session.id)}
                    className={`group flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${
                      isActive
                        ? 'border-blue-100 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-900/20'
                        : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className={`h-2 w-2 flex-shrink-0 rounded-full ${isActive ? 'bg-blue-500' : 'bg-slate-300 group-hover:bg-slate-400 dark:bg-slate-600 dark:group-hover:bg-slate-500'}`} />
                    <span className={`min-w-0 flex-1 truncate text-sm ${isActive ? 'font-medium text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>
                      {session.title}
                    </span>
                    {isAuthenticated && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onDeleteChat(session.id);
                        }}
                        disabled={isManagingHistory}
                        aria-label={`Delete ${session.title}`}
                        title="Delete chat"
                        className="rounded-md p-1.5 text-slate-400 opacity-100 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 md:opacity-0 md:group-hover:opacity-100 dark:text-slate-500 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-2 py-4 text-center text-sm text-slate-500 dark:text-slate-400">No chats found.</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-white/30 p-4 dark:border-white/10">
        <div className="grid grid-cols-1 gap-2">
          <div
            onClick={isAuthenticated ? onOpenProfile : undefined}
            className={`flex items-center gap-3 rounded-xl p-2 transition-colors ${isAuthenticated ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800' : ''}`}
          >
            <div
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 bg-cover bg-center text-sm font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
              style={user.avatarUrl ? { backgroundImage: `url(${user.avatarUrl})` } : {}}
            >
              {!user.avatarUrl && initials}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-semibold text-slate-700 dark:text-slate-300">{user.name}</span>
              <span className="truncate text-xs text-slate-400 dark:text-slate-500">{isAuthenticated ? 'Free Plan' : 'Guest mode'}</span>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <button onClick={(event) => { event.stopPropagation(); onClose(); }} className="rounded-md p-2 hover:bg-slate-200 dark:hover:bg-slate-700 md:hidden" title="Close sidebar">
                <PanelLeftClose className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              </button>
              <button onClick={(event) => { event.stopPropagation(); onOpenSettings(); }} className="rounded-md p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700" title="Settings">
                <Settings className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              </button>
            </div>
          </div>

          {isAuthenticated && (
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log out
            </button>
          )}

          {isManagingHistory && (
            <div className="flex items-center justify-center gap-2 py-1 text-[11px] font-medium text-slate-400 dark:text-slate-500">
              <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
              Updating history...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
