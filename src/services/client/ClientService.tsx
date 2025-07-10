import { encryptionService } from '../../utils/encryption/encryption';
import api from '../../utils/api/axios';
import type { AxiosResponse } from 'axios';
import type { LoginCredentials, User, LoginResponse, AuthResult, UserResponse } from '../../common/auth.type';

const ClientService = {

    getAll: async (credentials: LoginCredentials): Promise<AuthResult<User>> => {
        try {
            const response: AxiosResponse<LoginResponse> = await api.post('auth/login', credentials);

            const { data: responseData, success } = response.data;

            if (success) {
                const { token, user } = responseData;

                let encryption = encryptionService.encryptString(token);
                if (!encryption.success) {
                    throw new Error('Error to encrypt token to storage');
                }

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
}

export default ClientService;
