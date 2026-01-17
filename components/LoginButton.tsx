import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, LogOut, User as UserIcon, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle, signOut } from '../services/authService';

interface LoginButtonProps {
  t: any;
  onProfileClick?: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ t, onProfileClick }) => {
  const { user, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const handleProfileClick = () => {
    setIsMenuOpen(false);
    onProfileClick?.();
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50">
        <div className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="relative" ref={menuRef}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors border border-zinc-700"
        >
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || 'User'}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-zinc-400" />
            </div>
          )}
          <span className="text-sm text-zinc-300 max-w-[120px] truncate">
            {user.displayName || user.email}
          </span>
          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50"
            >
              {/* User Info */}
              <div className="px-4 py-3 border-b border-zinc-800">
                <p className="text-sm font-medium text-zinc-200 truncate">
                  {user.displayName || 'User'}
                </p>
                <p className="text-xs text-zinc-500 truncate">{user.email}</p>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>{t?.profile?.title || 'Profile Settings'}</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t?.auth?.signOut || 'Sign Out'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleSignIn}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors border border-blue-500/20"
    >
      <LogIn className="w-4 h-4" />
      <span className="text-sm font-medium">{t?.auth?.signIn || 'Sign In with Google'}</span>
    </motion.button>
  );
};

export default LoginButton;
