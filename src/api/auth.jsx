const DEBUG = true;

import { auth, db } from '../config/firebase';
import { 
  signInWithPhoneNumber, 
  PhoneAuthProvider,
  signOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { handleAuthError, logError } from '../utils/errorHandler';

// Send OTP to phone number
export const sendOTP = async (phoneNumber, recaptchaVerifier) => {
  try {
    const confirmation = await signInWithPhoneNumber(
      auth, 
      phoneNumber, 
      recaptchaVerifier
    );
    return { success: true, confirmation };
  } catch (error) {
    const errorMessage = handleAuthError(error);
    logError(error, 'auth/sendOTP');
    return { success: false, error: errorMessage };
  }
};

// Verify OTP code
export const verifyOTP = async (verificationId, code) => {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const result = await auth.signInWithCredential(credential);
    return { success: true, user: result.user };
  } catch (error) {
    const errorMessage = handleAuthError(error);
    logError(error, 'auth/verifyOTP');
    return { success: false, error: errorMessage };
  }
};

// Create or update user profile
export const updateUserProfile = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...userData,
      updatedAt: new Date(),
    }, { merge: true });
    
    return { success: true };
  } catch (error) {
    logError(error, 'auth/updateUserProfile');
    return { success: false, error: error.message };
  }
};

// Get user profile
export const getUserProfile = async (userId) => {
  if (DEBUG) console.log("AuthAPI: Getting user profile for", userId);
  
  try {
    if (!userId) {
      console.error("AuthAPI: getUserProfile called with null/undefined userId");
      return { success: false, error: "User ID is required" };
    }
    
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (userDoc.exists()) {
      const userData = { id: userDoc.id, ...userDoc.data() };
      if (DEBUG) console.log("AuthAPI: User profile found", userData);
      return { success: true, user: userData };
    } else {
      if (DEBUG) console.log("AuthAPI: User profile not found");
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error("AuthAPI: Error getting user profile", error);
    return { success: false, error: error.message };
  }
};

// Sign out user
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    const errorMessage = handleAuthError(error);
    logError(error, 'auth/signOutUser');
    return { success: false, error: errorMessage };
  }
};
