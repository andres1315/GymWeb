import api from '../../utils/api/axios';
import type { AxiosResponse } from 'axios';
import type { Country } from '@/utils/interfaces/common';

interface Result<T> {
    success: boolean;
    data?: T;
    message?: string;
}

const CountriesService = {
    getAll: async (): Promise<Result<Country[]>> => {
        try {
            const response: AxiosResponse<Country[]> = await api.get('countries');

            const { status, data } = response;

            if (status === 200) {
                return { success: true, data }
            }
            return {
                success: false,
                message: 'Error get countries'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.message || 'Erro get data'
            };
        }
    }
}

export default CountriesService;
