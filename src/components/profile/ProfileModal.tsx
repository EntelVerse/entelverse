import React, { useState, useEffect, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { 
  Camera, Edit2, LogOut, Trash2, CheckCircle, 
  AlertCircle, Loader2, X, Mail, Shield 
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Profile, getProfile, updateProfile, uploadAvatar, deleteAvatar } from '../../lib/profile';
import { TwoFactorModal } from '../TwoFactorModal';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadProfile();
    }
  }, [isOpen]);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('User not authenticated');
        return;
      }

      setUser(user);
      const userProfile = await getProfile(user);
      if (userProfile) {
        setProfile(userProfile);
        const [firstName, lastName] = (userProfile.full_name || '').split(' ');
        setForm(prev => ({
          ...prev,
          firstName: firstName || '',
          lastName: lastName || '',
          username: userProfile.username || ''
        }));
      }
    } catch (error) {
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Rest of the handlers (handleFileChange, handleSaveProfile, etc.) remain the same as in ProfilePage
  // Just copy them from the existing ProfilePage component

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div 
          ref={modalRef}
          className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Copy the content from ProfilePage and adjust styling for modal context */}
          <div className="p-8">
            {/* Profile content goes here */}
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
            
            {/* Rest of the profile content */}
            {/* Copy the content sections from ProfilePage */}
          </div>
        </div>
      </div>

      {is2FAModalOpen && (
        <TwoFactorModal
          isOpen={is2FAModalOpen}
          onClose={() => setIs2FAModalOpen(false)}
          user={user!}
          onSuccess={() => {
            setSuccess('2FA enabled successfully!');
            setIs2FAModalOpen(false);
          }}
        />
      )}
    </div>
  );
}