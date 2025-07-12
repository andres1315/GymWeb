import api from '../../utils/api/axios';
import type { AxiosResponse } from 'axios';
import type { Client } from '@/utils/interfaces/client';
import type { ClientFormValues } from '@/features/Home/components/client/ClientForm';
import type { PaginatedResponse } from '@/utils/interfaces/common';

interface Result<T> {
    success: boolean;
    data?: T;
    message?: string;
}

const ClientService = {

    getAll: async (): Promise<Result<Client[]>> => {
        try {
            const response: AxiosResponse<PaginatedResponse<Client>> = await api.get('clients');

            const { status, data } = response;

            if (status == 200) {
                return { success: true, data: data.data }
            }
            return {
                success: false,
                message: 'Error get clients'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.message || 'Erro get data clients'
            };
        }
    },

    store: async (data: ClientFormValues): Promise<Result<Client>> => {
        try {
            const response: AxiosResponse<Client> = await api.post('clients', data);

            const { status, data: dataResponse } = response;

            if (status == 200) {
                return { success: true, data: dataResponse }
            }
            return {
                success: false,
                message: 'Error create client'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Erro get data new client'
            };
        }
    },

    destroy: async (id: number): Promise<Result<Client>> => {
        try {
            const response: AxiosResponse<{ message: string }> = await api.delete('clients/' + id);

            const { status, data: dataResponse } = response;

            if (status == 200) {
                return { success: true, message: dataResponse.message }
            }
            return {
                success: false,
                message: 'Error delete client'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Erro get data delete client'
            };
        }
    },

    update: async (data: ClientFormValues, id: number): Promise<Result<Client>> => {
        try {
            const response: AxiosResponse<Client> = await api.put('clients/' + id, data);

            const { status, data: dataResponse } = response;

            if (status == 200) {
                return { success: true, data: dataResponse }
            }
            return {
                success: false,
                message: 'Error create client'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.error?.message || error.response?.data?.message || error.message || 'Erro get data new client'
            };
        }
    },
}

export default ClientService;
