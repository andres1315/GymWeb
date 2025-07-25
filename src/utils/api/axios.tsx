import { encryptionService } from '../encryption/encryption';
import axios, { AxiosError, type AxiosInstance, type AxiosResponse, type CreateAxiosDefaults } from 'axios';

export interface ApiResponse<T = unknown> {
    success: boolean;
    data: T;
    message: string;
    timestamp: string;
}

const apiConfig: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};

const routesExternal = ["/client-external"]

const api: AxiosInstance = axios.create(apiConfig);

api.interceptors.request.use(function (config) {
    const encryptedToken = localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY || 'authToken');

    if (encryptedToken && config.headers) {
        const tokenResult = encryptionService.decryptString(encryptedToken);

        if (tokenResult.success && tokenResult.data) {
            config.headers.Authorization = `Bearer ${tokenResult.data}`;
        }
    }
    if (config.headers) {
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        config.headers['X-Timestamp'] = new Date().toISOString();
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});


api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    (error: AxiosError): Promise<AxiosError> => {
        const { response } = error;
        if (response) {
            const { status } = response;
            if (status == 401) {
                handleUnauthorized();
            }
        }
        return Promise.reject(error);
    }
);

// Validate authorization
const handleUnauthorized = (): void => {

    localStorage.removeItem(import.meta.env.VITE_APP_TOKEN_KEY || 'authToken');

    const currentPath = window.location.pathname;
    if (currentPath !== '/login' && !routesExternal.includes(currentPath)) {
        window.location.href = '/login';
    }
};

export default api;
export { handleUnauthorized };