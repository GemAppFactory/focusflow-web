import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { db, storage, auth } from '../firebase';
import { UserProfile } from '../types';

// Get user profile from Firestore
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const profileRef = doc(db, 'users', userId, 'profile', 'info');
    const snapshot = await getDoc(profileRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        uid: userId,
        displayName: data.displayName || '',
        email: data.email || '',
        photoURL: data.photoURL || '',
        bio: data.bio || '',
        updatedAt: data.updatedAt?.toMillis() || Date.now()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

// Update user profile in Firestore and Firebase Auth
export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<void> => {
  try {
    const profileRef = doc(db, 'users', userId, 'profile', 'info');

    // Update Firestore
    await setDoc(profileRef, {
      ...updates,
      updatedAt: serverTimestamp()
    }, { merge: true });

    // Update Firebase Auth profile if displayName or photoURL changed
    if (auth.currentUser && (updates.displayName || updates.photoURL)) {
      await updateProfile(auth.currentUser, {
        displayName: updates.displayName || auth.currentUser.displayName,
        photoURL: updates.photoURL || auth.currentUser.photoURL
      });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Upload avatar image to Firebase Storage
export const uploadAvatar = async (userId: string, file: File): Promise<string> => {
  try {
    // Create a reference to the avatar location
    const avatarRef = ref(storage, `avatars/${userId}/${Date.now()}_${file.name}`);

    // Upload the file
    await uploadBytes(avatarRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(avatarRef);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
};

// Initialize user profile on first login
export const initializeUserProfile = async (
  userId: string,
  email: string,
  displayName: string,
  photoURL: string
): Promise<void> => {
  try {
    const profileRef = doc(db, 'users', userId, 'profile', 'info');
    const snapshot = await getDoc(profileRef);

    // Only initialize if profile doesn't exist
    if (!snapshot.exists()) {
      await setDoc(profileRef, {
        uid: userId,
        email,
        displayName: displayName || email.split('@')[0],
        photoURL: photoURL || '',
        bio: '',
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error initializing user profile:', error);
  }
};
