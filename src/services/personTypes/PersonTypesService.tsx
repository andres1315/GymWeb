import api from '../../utils/api/axios';
import type { AxiosResponse } from 'axios';
import type { PersonType } from '@/utils/interfaces/common';

interface Result<T> {
    success: boolean;
    data?: T;
    message?: string;
}

const PersonTypesService = {
    getAll: async (): Promise<Result<PersonType[]>> => {
        try {
            const response: AxiosResponse<PersonType[]> = await api.get('person-types');

            const { status, data } = response;

            if (status === 200) {
                return { success: true, data }
            }
            return {
                success: false,
                message: 'Error get persons types'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.message || 'Erro get data'
            };
        }
    }
}

export default PersonTypesService;
