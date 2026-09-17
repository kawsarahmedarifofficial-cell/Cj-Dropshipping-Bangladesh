import { signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Create new user profile
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName || 'User',
        photoURL: user.photoURL || '',
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        role: 'user'
      });
    } else {
      // Update last login
      await updateDoc(userRef, {
        lastLoginAt: serverTimestamp(),
        displayName: user.displayName || 'User',
        photoURL: user.photoURL || ''
      });
    }
    
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}
