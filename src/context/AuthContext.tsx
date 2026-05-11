import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser } from '../types';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../components/Helpers/firebase';
interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  sendPasswordReset: (email: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('portfolio_admin_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Security Check: Only allow specific admin email
      const ALLOWED_ADMIN_EMAIL = 'saadnaz43165@gmail.com';
      
      if (username.toLowerCase() !== ALLOWED_ADMIN_EMAIL.toLowerCase()) {
        console.error('Unauthorized access attempt');
        return false;
      }

      const res = await signInWithEmailAndPassword(auth, username, password);
      const fbUser: FirebaseUser = res.user;

      const adminUser: AdminUser = {
        id: fbUser.uid,
        username: fbUser.displayName || fbUser.email?.split('@')[0] || 'admin',
        email: fbUser.email || '',
        role: 'admin',
      };

      // Store admin details in Firestore if not already stored
      const docRef = doc(db, 'admin', fbUser.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: adminUser.username,
          email: adminUser.email,
          createdAt: new Date().toISOString(),
        });
      }

      setUser(adminUser);
      localStorage.setItem('portfolio_admin_user', JSON.stringify(adminUser));
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = () => {
    firebaseSignOut(auth);
    setUser(null);
    localStorage.removeItem('portfolio_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, sendPasswordReset, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

