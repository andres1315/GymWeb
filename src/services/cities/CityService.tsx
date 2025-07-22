import api from '../../utils/api/axios';
import type { AxiosResponse } from 'axios';
import type { City } from '@/utils/interfaces/common';

interface Result<T> {
    success: boolean;
    data?: T;
    message?: string;
}

const CityService = {
    getAll: async (stateId?: string): Promise<Result<City[]>> => {
        try {
            const response: AxiosResponse<City[]> = await api.get(`cities${stateId ? `?state=${stateId}` : ""}`);

            const { status, data } = response;

            if (status === 200) {
                return { success: true, data }
            }
            return {
                success: false,
                message: 'Error get cities'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.message || 'Erro get data'
            };
        }
    }
}

export default CityService;
