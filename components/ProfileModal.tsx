import { X, User, Mail, Shield, Camera, Edit2, LoaderCircle, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { UserProfile } from '../types';

const MAX_PROFILE_IMAGE_BYTES = 250 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSave: (profile: { name: string; image: string | null }) => Promise<void>;
}

export default function ProfileModal({ isOpen, onClose, user, onSave }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editAvatar, setEditAvatar] = useState(user.avatarUrl || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const resetEditor = () => {
    setEditName(user.name);
    setEditAvatar(user.avatarUrl || '');
    setError('');
    setIsEditing(false);
  };

  const handleSave = async () => {
    const name = editName.trim().replace(/\s+/g, ' ');
    if (name.length < 2 || name.length > 80) {
      setError('Please enter a name between 2 and 80 characters.');
      return;
    }

    setError('');
    setIsSaving(true);
    try {
      await onSave({ name, image: editAvatar || null });
      setIsEditing(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save your profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      setError('Use a PNG, JPEG, or WebP profile image.');
      return;
    }

    if (file.size > MAX_PROFILE_IMAGE_BYTES) {
      setError('Choose a profile image smaller than 250 KB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setEditAvatar(reader.result);
        setError('');
      }
    };
    reader.onerror = () => setError('Unable to read this image. Please choose another file.');
    reader.readAsDataURL(file);
  };

  const initials = editName ? editName.split(' ').map((name) => name[0]).join('').substring(0, 2).toUpperCase() : 'U';
  const displayInitials = user.name ? user.name.split(' ').map((name) => name[0]).join('').substring(0, 2).toUpperCase() : 'U';
  const avatar = isEditing ? editAvatar : user.avatarUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm sm:p-6">
      <div className="flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all dark:bg-slate-800">
        <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-700">
          <h2 className="text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100">{isEditing ? 'Edit Profile' : 'Profile'}</h2>
          <button onClick={() => { resetEditor(); onClose(); }} className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700" aria-label="Close profile">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 p-6">
          <div className="group relative">
            <div
              className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-blue-100 bg-cover bg-center text-3xl font-bold text-blue-600 shadow-md dark:border-slate-800 dark:bg-blue-900/40 dark:text-blue-400"
              style={avatar ? { backgroundImage: `url(${avatar})` } : {}}
            >
              {!avatar && (isEditing ? initials : displayInitials)}
            </div>
            {isEditing && (
              <>
                <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-blue-600 p-2 text-white shadow-lg transition-colors hover:bg-blue-700 dark:border-slate-800" title="Change profile image" aria-label="Change profile image">
                  <Camera className="h-4 w-4" />
                </button>
                {editAvatar && (
                  <button onClick={() => setEditAvatar('')} className="absolute -left-1 bottom-0 rounded-full border-2 border-white bg-slate-600 p-1.5 text-white shadow-lg transition-colors hover:bg-red-600 dark:border-slate-800" title="Remove profile image" aria-label="Remove profile image">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} />
          </div>

          {isEditing ? (
            <div className="mt-2 w-full space-y-3">
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="Your name"
                  maxLength={80}
                />
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Verified email</label>
                <div className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">{user.email}</div>
                <p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">Your verified email is your account identity and cannot be changed here.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-1 text-center">
              <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">{user.name}</h3>
              <div className="flex items-center justify-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
            </div>
          )}

          {error && <p role="alert" className="w-full text-sm text-red-600 dark:text-red-400">{error}</p>}

          {!isEditing && (
            <div className="mt-4 flex w-full flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"><Shield className="h-4 w-4 text-emerald-500" />Account Status</div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"><User className="h-4 w-4 text-blue-500" />Account data</div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Private to this account</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          {isEditing ? (
            <>
              <button onClick={resetEditor} disabled={isSaving} className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60 dark:text-slate-300 dark:hover:bg-slate-700">Cancel</button>
              <button onClick={() => { void handleSave(); }} disabled={isSaving} className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
                {isSaving && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Save Profile
              </button>
            </>
          ) : (
            <button onClick={() => { setError(''); setIsEditing(true); }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-200 px-5 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
