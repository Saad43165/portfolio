import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser } from '../types';

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
      const ALLOWED_ADMIN_EMAIL = 'saadnaz43165@gmail.com';
      
      // Simple hardcoded auth
      if (username.toLowerCase() !== ALLOWED_ADMIN_EMAIL.toLowerCase() || password !== 'admin123') {
        if (username.toLowerCase() !== ALLOWED_ADMIN_EMAIL.toLowerCase()) {
            console.error('Unauthorized access attempt');
            return false;
        }
        // In hardcoded mode, just accept any login with this email
      }

      const adminUser: AdminUser = {
        id: 'local-admin-id',
        username: 'admin',
        email: username,
        role: 'admin',
      };

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
    console.log("Password reset mock sent to:", email);
  };

  const logout = () => {
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
