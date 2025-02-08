import api from './api';

export const registrarAluno = async (dadosAluno) => {
  return api.post('/register/user', {
    ...dadosAluno,
    role: 'ALUNO'
  });
};