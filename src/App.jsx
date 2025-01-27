import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SideBar from './components/SideBar/SideBar';
import Form from './components/FormTest2/Form'; // Cadastro de famílias e alunos
import LoginForm from './components/LoginForm/LoginForm'; // Login

function App() {
  return (
    <Router>
      <SideBar />
      <div>
        <Routes>
          {/* Redirecionar para o login ao acessar a raiz */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Rota para a página de login */}
          <Route path="/login" element={<LoginForm />} />
          {/* Rota para a página de cadastro de famílias e alunos */}
          <Route path="/register" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
