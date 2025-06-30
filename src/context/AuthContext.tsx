import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, AuthResponse } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Demo user data
const DEMO_USERS = [
  {
    id: '1',
    employeeId: 'NK2710IN',
    name: 'Nikhil Pant',
    email: 'nikhil.pant@avaconsultancy.com',
    role: 'manager' as const,
    department: 'Sales',
    avatar: undefined,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    employeeId: 'EMP001',
    name: 'John Doe',
    email: 'john.doe@avaconsultancy.com',
    role: 'employee' as const,
    department: 'Marketing',
    avatar: undefined,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    employeeId: 'EMP002',
    name: 'Jane Smith',
    email: 'jane.smith@avaconsultancy.com',
    role: 'admin' as const,
    department: 'IT',
    avatar: undefined,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
];

// Demo credentials (employeeId: password)
const DEMO_CREDENTIALS = {
  'NK2710IN': 'password123',
  'EMP001': 'password123',
  'EMP002': 'password123',
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      
      // Demo login logic
      const demoPassword = DEMO_CREDENTIALS[credentials.employeeId as keyof typeof DEMO_CREDENTIALS];
      
      if (demoPassword && credentials.password === demoPassword) {
        const userData = DEMO_USERS.find(user => user.employeeId === credentials.employeeId);
        
        if (userData) {
          const mockToken = `demo_token_${Date.now()}`;
          const mockResponse: AuthResponse = {
            user: userData,
            token: mockToken,
          };
          
          localStorage.setItem('token', mockToken);
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          return;
        }
      }
      
      // If demo login fails, try actual API
      try {
        const response: AuthResponse = await authService.login(credentials);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
      } catch (apiError) {
        throw new Error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 