import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SideBar from './components/SideBar/SideBar';
import Form from './components/FormGeral/Form'; // Cadastro de famílias e alunos
import LoginForm from './components/LoginForm/LoginForm'; // Login
import FormAluno from './components/FormAluno/FormAluno';
import FormFamilia from './components/FormFamilia/FormFamilia';

function App() {
  return (
    <Router>
      <SideBar />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Form />} />
          <Route path="/aluno" element={<FormAluno />} />
          <Route path="/familia" element={<FormFamilia />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
