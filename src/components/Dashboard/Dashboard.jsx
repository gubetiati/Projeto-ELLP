import { useState, useEffect } from 'react';
import { alunoService } from '../../services/aluno';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAlunos: 0,
    mediaNotas: 0,
  });
  const { logout } = useAuth();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const alunos = await alunoService.getAll();
        setStats({
          totalAlunos: alunos.length,
          mediaNotas: 0,
        });
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <>
      <header className="header">
        <h2>Dashboard</h2>
      </header>

      <main className="container">
        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-box">
              <h3>Total de Alunos</h3>
              <p>{stats.totalAlunos}</p>
            </div>
            
            <div className="stat-box">
              <h3>Média de Notas</h3>
              <p>{stats.mediaNotas.toFixed(1)}</p>
            </div>
          </div>

          <div className="cadastro-links">
            <Link to="/aluno" className="cadastro-link cadastro-link-aluno">
              Cadastrar Aluno
            </Link>
            <Link to="/familia" className="cadastro-link cadastro-link-familia">
              Cadastrar Família
            </Link>
            <Link to="/escola" className="cadastro-link cadastro-link-escola">
              Cadastrar Escola
            </Link>
            <Link to="/bairro" className="cadastro-link cadastro-link-bairro">
              Cadastrar Bairro
            </Link>
          </div>

          <div className="logout-container">
            <button onClick={logout} className="logout-button">
              Sair
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;