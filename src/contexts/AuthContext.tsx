/**
 * Authentication Context
 * 
 * Provides global authentication state management across the app.
 * 
 * Features:
 * - Tracks current user and loading state
 * - Persists auth state across app restarts
 * - Provides login/logout/register functions
 * - Listens for Firebase auth state changes
 * 
 * Usage:
 * const { user, loading, login, logout } = useAuth();
 */

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { User } from '../features/auth/domain/entities/User';
import { FirebaseAuthRepository } from '../features/auth/data/repositories/FirebaseAuthRepository';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const authRepository = new FirebaseAuthRepository();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // User is signed in, get full user document
          const userData = await authRepository.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Error loading user data:', error);
          setUser(null);
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await authRepository.logout();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use auth context
 * 
 * Example:
 * const { user, loading, logout } = useAuth();
 * 
 * if (loading) return <LoadingScreen />;
 * if (!user) return <LoginScreen />;
 * return <HomeScreen user={user} />;
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
