/* eslint-disable no-useless-catch */
import api from './api';

export const alunoService = {
    getAll: async () => {
        try {
            const response = await api.get('/aluno');
            const data = response.data;
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/aluno/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    create: async (alunoData) => {
        try {
            const response = await api.post('/aluno', alunoData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, alunoData) => {
        try {
            const response = await api.put(`/aluno/${id}`, alunoData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`/aluno/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    buscarAvancado: async (filtros) => {
        try {
            const response = await api.get('/aluno/busca', { 
                params: filtros 
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default alunoService;