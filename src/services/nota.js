/* eslint-disable no-useless-catch */
import api from './api';

export const notaService = {
    getAll: async () => {
        try {
            const response = await api.get('/nota');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getByAlunoId: async (alunoId) => {
        try {
            const response = await api.get(`/nota/aluno/${alunoId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    create: async (notaData) => {
        try {
            const response = await api.post('/nota', notaData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, notaData) => {
        try {
            const response = await api.put(`/nota/${id}`, notaData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`/nota/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getByAlunoEDisciplina: async (alunoId, disciplinaId) => {
        try {
            const response = await api.get(`/nota/aluno/${alunoId}/disciplina/${disciplinaId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default notaService;