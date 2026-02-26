import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, type User } from '../api/auth';
import { tokenStorage } from '../utils/tokenStorage';
import { ApiError } from '../lib/apiClient';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, name: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing token and fetch user data
        const initAuth = async () => {
            const token = tokenStorage.getToken();
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                // Verify token is still valid and get user data
                const userData = await authApi.getCurrentUser();
                setUser(userData);
            } catch (error) {
                // Token is invalid or expired
                tokenStorage.removeToken();
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await authApi.login({ email, password });
            tokenStorage.setToken(response.token);
            setUser(response.user);
        } catch (error) {
            if (error instanceof ApiError) {
                throw new Error(error.message);
            }
            throw new Error('Login failed. Please try again.');
        }
    };

    const register = async (email: string, name: string, password: string) => {
        try {
            const response = await authApi.register({ email, name, password });
            tokenStorage.setToken(response.token);
            setUser(response.user);
        } catch (error) {
            if (error instanceof ApiError) {
                throw new Error(error.message);
            }
            throw new Error('Registration failed. Please try again.');
        }
    };

    const logout = () => {
        tokenStorage.removeToken();
        setUser(null);
        authApi.logout().catch(() => {
            // Ignore errors on logout API call
        });
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
