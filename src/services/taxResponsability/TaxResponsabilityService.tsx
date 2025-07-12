import api from '../../utils/api/axios';
import type { AxiosResponse } from 'axios';
import type { TaxResponsability } from '@/utils/interfaces/common';

interface Result<T> {
    success: boolean;
    data?: T;
    message?: string;
}

const TaxResponsabilityService = {
    getAll: async (): Promise<Result<TaxResponsability[]>> => {
        try {
            const response: AxiosResponse<TaxResponsability[]> = await api.get('tax-responsability');

            const { status, data } = response;

            if (status === 200) {
                return { success: true, data }
            }
            return {
                success: false,
                message: 'Error get tax responsability'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.message || 'Erro get data'
            };
        }
    }
}

export default TaxResponsabilityService;
