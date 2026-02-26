import { tokenStorage } from '../utils/tokenStorage';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public data?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

const getHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const token = tokenStorage.getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
    // Handle 401 Unauthorized - token expired or invalid
    if (response.status === 401) {
        tokenStorage.removeToken();
        // Trigger a page reload to redirect to login
        window.location.href = '/login';
        throw new ApiError('Unauthorized', 401);
    }

    if (!response.ok) {
        let errorMessage = response.statusText;
        let errorData;

        try {
            errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
            // Response body is not JSON
        }

        throw new ApiError(errorMessage, response.status, errorData);
    }

    // Handle empty responses (e.g., 204 No Content)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        return {} as T;
    }

    return response.json();
};

export const apiClient = {
    async get<T>(path: string): Promise<T> {
        const response = await fetch(`${BASE_URL}${path}`, {
            method: 'GET',
            headers: getHeaders(),
        });
        return handleResponse<T>(response);
    },

    async post<T>(path: string, data?: any): Promise<T> {
        const response = await fetch(`${BASE_URL}${path}`, {
            method: 'POST',
            headers: getHeaders(),
            body: data ? JSON.stringify(data) : undefined,
        });
        return handleResponse<T>(response);
    },

    async put<T>(path: string, data: any): Promise<T> {
        const response = await fetch(`${BASE_URL}${path}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse<T>(response);
    },

    async delete<T>(path: string): Promise<T> {
        const response = await fetch(`${BASE_URL}${path}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse<T>(response);
    },
};

export { ApiError };
