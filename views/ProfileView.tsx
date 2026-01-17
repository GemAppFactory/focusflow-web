import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Save, Loader, Check, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, updateUserProfile, uploadAvatar } from '../services/profileService';
import { UserProfile } from '../types';

interface ProfileViewProps {
  t: any;
}

const ProfileView: React.FC<ProfileViewProps> = ({ t }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const userProfile = await getUserProfile(user.uid);

      if (userProfile) {
        setProfile(userProfile);
        setDisplayName(userProfile.displayName);
        setBio(userProfile.bio || '');
        setAvatarURL(userProfile.photoURL);
      } else {
        // Use data from Firebase Auth
        setDisplayName(user.displayName || '');
        setBio('');
        setAvatarURL(user.photoURL || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert(t?.profile?.invalidFileType || 'Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(t?.profile?.fileTooLarge || 'File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const downloadURL = await uploadAvatar(user.uid, file);
      setAvatarURL(downloadURL);

      // Auto-save avatar
      await updateUserProfile(user.uid, { photoURL: downloadURL });
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      await updateUserProfile(user.uid, {
        displayName,
        bio,
        photoURL: avatarURL,
        email: user.email || '',
        uid: user.uid,
        updatedAt: Date.now()
      });

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-full"
      >
        <User className="w-16 h-16 text-zinc-600 mb-4" />
        <p className="text-zinc-400">{t?.profile?.pleaseSignIn || 'Please sign in to view your profile'}</p>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">
          {t?.profile?.title || 'Profile Settings'}
        </h1>
        <p className="text-zinc-400">
          {t?.profile?.subtitle || 'Manage your personal information and preferences'}
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-zinc-800 border-4 border-zinc-700">
              {avatarURL ? (
                <img
                  src={avatarURL}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-16 h-16 text-zinc-600" />
                </div>
              )}
            </div>

            {/* Upload Overlay */}
            <button
              onClick={handleAvatarClick}
              disabled={isUploading}
              className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            >
              {isUploading ? (
                <Loader className="w-8 h-8 text-white animate-spin" />
              ) : (
                <Camera className="w-8 h-8 text-white" />
              )}
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <p className="text-sm text-zinc-500 mt-3">
            {t?.profile?.avatarHint || 'Click to upload new avatar (max 5MB)'}
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              {t?.profile?.email || 'Email'}
            </label>
            <input
              type="email"
              value={user.email || ''}
              disabled
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-500 cursor-not-allowed"
            />
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              {t?.profile?.displayName || 'Display Name'}
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={t?.profile?.displayNamePlaceholder || 'Enter your name'}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              {t?.profile?.bio || 'Bio'}
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={t?.profile?.bioPlaceholder || 'Tell us about yourself...'}
              rows={4}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {isSaving ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>{t?.profile?.saving || 'Saving...'}</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>{t?.profile?.saveChanges || 'Save Changes'}</span>
              </>
            )}
          </motion.button>

          {/* Status Indicator */}
          {saveStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-green-400"
            >
              <Check className="w-5 h-5" />
              <span className="text-sm">{t?.profile?.saved || 'Saved!'}</span>
            </motion.div>
          )}

          {saveStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-red-400"
            >
              <X className="w-5 h-5" />
              <span className="text-sm">{t?.profile?.error || 'Error'}</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileView;
