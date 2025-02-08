import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login, registerColaborador } from '../../services/auth';
import './LoginForm.css';

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    setError 
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (activeTab === 'login') {
        await login(data);
        navigate('/dashboard');
      } else if (activeTab === 'cadastro') {  // Aqui vai o if que faltava
        await registerColaborador({
          ...data,
          role: "ADMIN"
        });
        // Após cadastro bem sucedido, você pode:
        alert('Cadastro realizado com sucesso!');
        setActiveTab('login'); // Volta para a aba de login
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error.response?.data?.message || 'Erro ao processar requisição'
      });
    }
};

  return (
    <div className="form-container">
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className="form-tabs">
          <button
            type="button"
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Entrar
          </button>
          <button
            type="button"
            className={`tab-button ${activeTab === 'cadastro' ? 'active' : ''}`}
            onClick={() => setActiveTab('cadastro')}
          >
            Cadastro
          </button>
        </div>

        {activeTab === 'login' ? (
          <>
            <div className="form-group">
              <label className='label-form'>Usuário:</label>
              <input 
                className='input' 
                type="text" 
                placeholder="Digite seu usuário"
                {...register('login', { required: 'Usuário é obrigatório' })}
              />
              {errors.login && <span className="error">{errors.login.message}</span>}
            </div>

            <div className="form-group">
              <label className='label-form'>Senha:</label>
              <input 
                className='input' 
                type="password" 
                placeholder="Digite sua senha"
                {...register('password', { required: 'Senha é obrigatória' })}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label className='label-form'>Nome:</label>
              <input 
                className='input' 
                type="text" 
                placeholder="Digite seu nome completo"
                {...register('nome', { required: 'Nome é obrigatório' })}
              />
              {errors.nome && <span className="error">{errors.nome.message}</span>}
            </div>

            <div className="form-group">
              <label className='label-form'>E-mail:</label>
              <input 
                className='input' 
                type="email" 
                placeholder="Digite seu e-mail"
                {...register('email', { 
                  required: 'E-mail é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "E-mail inválido"
                  }
                })}
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label className='label-form'>Registro:</label>
              <input 
                className='input' 
                type="text" 
                placeholder="Digite seu registro academico"
                {...register('registro', { required: 'Registro é obrigatório' })}
              />
              {errors.registro && <span className="error">{errors.registro.message}</span>}
            </div>

            <div className="form-group">
              <label className='label-form'>Login:</label>
              <input 
                className='input' 
                type="text" 
                placeholder="Digite seu login"
                {...register('login', { required: 'Login é obrigatório' })}
              />
              {errors.login && <span className="error">{errors.login.message}</span>}
            </div>

            <div className="form-group">
              <label className='label-form'>Senha:</label>
              <input 
                className='input' 
                type="password" 
                placeholder="Digite sua senha"
                {...register('password', { 
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'A senha deve ter no mínimo 6 caracteres'
                  }
                })}
              />
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
          </>
        )}

        {errors.root && <div className="error">{errors.root.message}</div>}

        <button 
          type="submit" 
          className="button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processando...' : activeTab === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;