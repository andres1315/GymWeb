import api from '../../utils/api/axios';
import type { AxiosResponse } from 'axios';
import type { HowDidYouHear } from '@/utils/interfaces/common';

interface Result<T> {
    success: boolean;
    data?: T;
    message?: string;
}

const HowDidYouHearService = {
    getAll: async (): Promise<Result<HowDidYouHear[]>> => {
        try {
            const response: AxiosResponse<HowDidYouHear[]> = await api.get('how-did-you-hear');

            const { status, data } = response;

            if (status === 200) {
                return { success: true, data }
            }
            return {
                success: false,
                message: 'Error get how did you hear'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.message || 'Erro get data'
            };
        }
    }
}

export default HowDidYouHearService;
