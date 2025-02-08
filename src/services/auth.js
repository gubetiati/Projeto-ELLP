import api from './api';

export const login = async (credentials) => {
  const response = await api.post('/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const registerColaborador = async (colaboradorData) => {
  return api.post('/register/colaborador', {
    ...colaboradorData,
    role: "ADMIN"
  });
};

export const registerUser = async (userData) => {
    return api.post('/register/user', userData);
  };
  