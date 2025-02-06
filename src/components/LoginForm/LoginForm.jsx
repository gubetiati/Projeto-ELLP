// LoginForm.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className="form-container">
      <form className='form'>
        <div className="form-group">
          <label className='label-form'>Usuário:</label>
          <input 
            className='input' 
            type="text" 
            placeholder="Digite seu usuário" 
          />
        </div>

        <div className="form-group">
          <label className='label-form'>Senha:</label>
          <div className="password-wrapper">
              <input 
                  className='input' 
                  type="password" 
                  placeholder="Digite sua senha"
              />
          </div>
      </div>

        <button type="submit" className="button">Entrar</button>

      </form>
    </div>
  );
};

export default LoginForm;