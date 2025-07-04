import { encryptionService } from '../../utils/encryption/encryption';
import api, { type ApiResponse } from '../../utils/api/axios';
import type { AxiosResponse } from 'axios';
import type { LoginCredentials, User, LoginResponse, AuthResult, UserResponse } from '../../common/auth.type';

class AuthService {
    private readonly tokenKey: string;

    constructor() {
        this.tokenKey = import.meta.env.VITE_APP_TOKEN_KEY || 'authToken';
    }

    async login(credentials: LoginCredentials): Promise<AuthResult<User>> {
        try {
            const response: AxiosResponse<LoginResponse> = await api.post('auth/login', credentials);

            const { data: responseData, success } = response.data;

            if (success) {
                const { token, user } = responseData;

                let encryption = encryptionService.encryptString(token);
                if (!encryption.success) {
                    throw new Error('Error to encrypt token to storage');
                }

                localStorage.setItem(this.tokenKey, encryption.data ?? "");
                return { success: true, data: user }
            }
            return {
                success: false,
                message: 'Error log in'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.message || 'Erro get data'
            };
        }
    }

    async getCurrentUser(): Promise<User | null> {
        try {
            const response: AxiosResponse<UserResponse> = await api.get('user');

            const { data: responseData, success } = response.data;
            if (success) {
                return responseData.user;
            }
            return null;
        } catch (error: any) {
            return null;
        }
    }

    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
            localStorage.removeItem(this.tokenKey)
        } catch (error) {
            console.warn('Error al notificar logout al servidor:', error);
        } finally {
            this.clearLocalData();
        }
    }

    getAccessToken(): string | null {
        try {
            const encryptedData = localStorage.getItem(this.tokenKey);
            if (!encryptedData) return null;

            const result = encryptionService.decryptString(encryptedData);
            if (!result.success || !result.data) return null;

            return result.data;
        } catch (error) {
            console.error('Error al obtener token:', error);
            return null;
        }
    }

    async isAuthenticated(): Promise<User | null> {
        const token = this.getAccessToken();
        const user = await this.getCurrentUser()
        return token && user ? user : null;
    }

    private clearLocalData(): void {
        localStorage.removeItem(this.tokenKey);
    }
}

export const authService = new AuthService();
