import { X, User, Mail, Shield, Camera, Edit2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  setUser: (user: UserProfile) => void;
}

export default function ProfileModal({ isOpen, onClose, user, setUser }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editAvatar, setEditAvatar] = useState(user.avatarUrl || '');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    setUser({ ...user, name: editName, email: editEmail, avatarUrl: editAvatar });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setEditAvatar(user.avatarUrl || '');
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const initials = editName ? editName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
  const displayInitials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 tracking-tight">
            {isEditing ? 'Edit Profile' : 'Profile'}
          </h2>
          <button onClick={() => { handleCancel(); onClose(); }} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col items-center gap-4">
          
          {/* Avatar Section */}
          <div className="relative group">
            <div 
              className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/40 border-4 border-white dark:border-slate-800 shadow-md flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-3xl overflow-hidden bg-cover bg-center"
              style={(isEditing ? editAvatar : user.avatarUrl) ? { backgroundImage: `url(${isEditing ? editAvatar : user.avatarUrl})` } : {}}
            >
              {!(isEditing ? editAvatar : user.avatarUrl) && (isEditing ? initials : displayInitials)}
            </div>
            {isEditing && (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors border-2 border-white dark:border-slate-800"
                title="Change Picture"
              >
                <Camera className="w-4 h-4" />
              </button>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange} 
            />
          </div>

          {/* Details Section */}
          {isEditing ? (
            <div className="w-full space-y-3 mt-2">
              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 block">Name / Nickname</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 block">Email</label>
                <input 
                  type="email" 
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          ) : (
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{user.name}</h3>
              <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            </div>
          )}
          
          {!isEditing && (
            <div className="w-full mt-4 bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  Account Status
                </div>
                <span className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full font-bold">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <User className="w-4 h-4 text-blue-500" />
                  Member Since
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Aug 2026</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-end gap-2">
          {isEditing ? (
            <>
              <button 
                onClick={handleCancel} 
                className="px-4 py-2 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)} 
              className="px-5 py-2.5 w-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
