import React from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  return (
    <div className="form-container">
      <div className="tabs">
      </div>
      <form className='form'>
        <label className='label-form'>Usuário:</label>
        <input className='input' type="text" placeholder="Digite seu usuário" />
        <label className='label-form' >Senha:</label>
        <input className='input' type="password" placeholder="Digite sua senha" />
        <Link to="/register">
          <button type="submit">Entrar</button>
        </Link>
        
      </form>
    </div>
  );
};

export default LoginForm;
