import api from '../../utils/api/axios';
import type { AxiosResponse } from 'axios';
import type { State } from '@/utils/interfaces/common';

interface Result<T> {
    success: boolean;
    data?: T;
    message?: string;
}

const StatesService = {
    getAll: async (countryId?: string): Promise<Result<State[]>> => {
        try {
            const response: AxiosResponse<State[]> = await api.get(`states${countryId ? `?country=${countryId}` : ""}`);

            const { status, data } = response;

            if (status === 200) {
                return { success: true, data }
            }
            return {
                success: false,
                message: 'Error get state'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.message || 'Erro get data'
            };
        }
    }
}

export default StatesService;
