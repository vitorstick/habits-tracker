import { apiClient } from '../lib/apiClient';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    name: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
    };
}

export interface User {
    id: number;
    email: string;
    name: string;
}

export const authApi = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>('/auth/login', credentials);
    },

    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>('/auth/register', userData);
    },

    getCurrentUser: async (): Promise<User> => {
        return apiClient.get<User>('/auth/me');
    },

    logout: async (): Promise<void> => {
        // Optional: Call backend to invalidate token if needed
        // return apiClient.post('/auth/logout', {});
    }
};
