import api from '../../utils/api/axios';
import type { AxiosResponse } from 'axios';
import type { BloodType } from '@/utils/interfaces/common';

interface Result<T> {
    success: boolean;
    data?: T;
    message?: string;
}

const BloodTypesService = {
    getAll: async (): Promise<Result<BloodType[]>> => {
        try {
            const response: AxiosResponse<BloodType[]> = await api.get('blood-types');

            const { status, data } = response;

            if (status === 200) {
                return { success: true, data }
            }
            return {
                success: false,
                message: 'Error get blood types'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.message || 'Erro get data'
            };
        }
    }
}

export default BloodTypesService;
