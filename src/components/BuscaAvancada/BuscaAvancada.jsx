import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alunoService } from '../../services/aluno';
import { toast } from 'react-toastify';
import './BuscaAvancada.css';

const BuscaAvancada = () => {
  const navigate = useNavigate();
  const [criterios, setCriterios] = useState({
    nome: '',
    idade: '',
    escola: '',
    rendaMinima: '',
    rendaMaxima: '',
    mediaMinima: '',
  });

  const [resultados, setResultados] = useState([]);

  const buscarAlunos = async () => {
    try {
      const response = await alunoService.getAll(criterios);
      console.log(response)
      const dadosResultado = Array.isArray(response) 
        ? response 
        : (response.data || response.content || []);
      
      setResultados(dadosResultado);

      if (dadosResultado.length === 0) {
        toast.info('Nenhum aluno encontrado com esses critérios');
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      toast.error('Erro ao realizar a busca. Tente novamente.');
      setResultados([]);
    }
  };

  return (
    <>
      <header className="header">
        <h2>Busca Avançada</h2>
      </header>

      <main className="container">
        <div className="busca-avancada">
          <div className="filtros-busca">
            <div className="form-group">
              <label htmlFor="nome">Nome do aluno</label>
              <input
                type="text"
                id="nome"
                value={criterios.nome}
                onChange={(e) => setCriterios({...criterios, nome: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="idade">Idade</label>
              <input
                type="number"
                id="idade"
                value={criterios.idade}
                onChange={(e) => setCriterios({...criterios, idade: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="escola">Escola</label>
              <input
                type="text"
                id="escola"
                value={criterios.escola}
                onChange={(e) => setCriterios({...criterios, escola: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="rendaMinima">Renda mínima</label>
              <input
                type="number"
                id="rendaMinima"
                value={criterios.rendaMinima}
                onChange={(e) => setCriterios({...criterios, rendaMinima: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rendaMaxima">Renda máxima</label>
              <input
                type="number"
                id="rendaMaxima"
                value={criterios.rendaMaxima}
                onChange={(e) => setCriterios({...criterios, rendaMaxima: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="mediaMinima">Média mínima</label>
              <input
                type="number"
                id="mediaMinima"
                value={criterios.mediaMinima}
                onChange={(e) => setCriterios({...criterios, mediaMinima: e.target.value})}
              />
            </div>
            
            <div className="div-botao">
              <button onClick={buscarAlunos}>Buscar</button>
            </div>
          </div>

          <div className="resultados-busca">
            {resultados.length > 0 ? (
              resultados.map(aluno => (
                <div key={aluno.id} className="card-aluno">
                  <h3>{aluno.nome}</h3>
                  <p>Idade: {aluno.idade}</p>
                  <p>Escola: {aluno.escola}</p>
                  <p>Média: {aluno.mediaGeral || 'N/A'}</p>
                  <button 
                    onClick={() => navigate(`/aluno/${aluno.id}`)}
                    className="button-detalhes"
                    >
                    Ver detalhes
                    </button>
                </div>
              ))
            ) : (
              <p>Nenhum resultado encontrado</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default BuscaAvancada;