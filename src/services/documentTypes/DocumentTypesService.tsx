import api from '../../utils/api/axios';
import type { AxiosResponse } from 'axios';
import type { DocumentType } from '@/utils/interfaces/common';

interface Result<T> {
    success: boolean;
    data?: T;
    message?: string;
}

const DocumentTypesService = {

    getAll: async (): Promise<Result<DocumentType[]>> => {
        try {
            const response: AxiosResponse<DocumentType[]> = await api.get('document-types');

            const { status, data } = response;

            if (status === 200) {
                return { success: true, data }
            }
            return {
                success: false,
                message: 'Error get documents types'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.message || 'Erro get data'
            };
        }
    }
}

export default DocumentTypesService;
