const DEBUG = true;


import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { 
  onAuthStateChanged, 
  signInWithPhoneNumber, 
  PhoneAuthProvider,
  signOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthAPI from '../api/auth';
import * as Storage from '../services/storage';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verificationId, setVerificationId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (DEBUG) console.log("AuthContext: Initializing auth state listener");
    
    const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
      if (DEBUG) console.log("AuthContext: Auth state changed", userAuth ? "User logged in" : "No user");
      
      if (userAuth) {
        if (DEBUG) console.log("AuthContext: Getting user profile for", userAuth.uid);
        const { success, user: userProfile, error } = await AuthAPI.getUserProfile(userAuth.uid);
        
        if (DEBUG) console.log("AuthContext: User profile result", { success, userProfile, error });
        
        if (success) {
          setUser(userProfile);
        } else {
          // User exists in auth but not in Firestore
          setUser({ uid: userAuth.uid, phoneNumber: userAuth.phoneNumber, isNewUser: true });
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const sendVerificationCode = async (phoneNum, recaptchaVerifier) => {
    try {
      setLoading(true);
      setPhoneNumber(phoneNum);
      
      const { success, confirmation, error } = await AuthAPI.sendOTP(phoneNum, recaptchaVerifier);
      
      if (success && confirmation) {
        setVerificationId(confirmation.verificationId);
        setLoading(false);
        return true;
      } else {
        console.error('Error sending verification code:', error);
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      setLoading(false);
      return false;
    }
  };

  const confirmVerificationCode = async (code) => {
    try {
      setLoading(true);
      
      const { success, user: authUser, error } = await AuthAPI.verifyOTP(verificationId, code);
      
      if (success && authUser) {
        // Check if user exists in Firestore
        const { success: profileSuccess, user: userProfile } = await AuthAPI.getUserProfile(authUser.uid);
        
        if (profileSuccess) {
          // User exists, update user state
          setUser(userProfile);
        } else {
          // New user, they'll need to select user type
          setUser({ 
            uid: authUser.uid, 
            phoneNumber: authUser.phoneNumber || phoneNumber, 
            isNewUser: true 
          });
        }
        
        setLoading(false);
        return true;
      } else {
        console.error('Error confirming verification code:', error);
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Error confirming verification code:', error);
      setLoading(false);
      return false;
    }
  };

  const completeUserProfile = async (userType, userData) => {
    try {
      setLoading(true);
      
      // Create or update user document in Firestore
      const { success, error } = await AuthAPI.updateUserProfile(user.uid, {
        phoneNumber: user.phoneNumber || phoneNumber,
        userType,
        ...userData,
        createdAt: new Date(),
        isNewUser: false,
      });
      
      if (success) {
        // Update local user state
        setUser({
          ...user,
          userType,
          ...userData,
          isNewUser: false,
        });
        
        setLoading(false);
        return true;
      } else {
        console.error('Error completing user profile:', error);
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Error completing user profile:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      const { success } = await AuthAPI.signOutUser();
      
      if (success) {
        setUser(null);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error signing out:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        sendVerificationCode,
        confirmVerificationCode,
        completeUserProfile,
        logout,
        phoneNumber,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
