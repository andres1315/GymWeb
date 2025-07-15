import api from '../../utils/api/axios';
import type { AxiosResponse } from 'axios';
import type { Gender } from '@/utils/interfaces/common';

interface Result<T> {
    success: boolean;
    data?: T;
    message?: string;
}

const GenderService = {
    getAll: async (): Promise<Result<Gender[]>> => {
        try {
            const response: AxiosResponse<Gender[]> = await api.get('gender');

            const { status, data } = response;

            if (status === 200) {
                return { success: true, data }
            }
            return {
                success: false,
                message: 'Error get genders'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.message || 'Erro get data'
            };
        }
    }
}

export default GenderService;
