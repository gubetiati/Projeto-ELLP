import { useState, useEffect } from 'react';
import { alunoService } from '../../services/aluno';
import './RelatorioDesempenho.css';

const RelatorioDesempenho = () => {
  const [alunos, setAlunos] = useState([]);
  const [filtros, setFiltros] = useState({
    rendaPerCapita: '',
    escola: '',
    evolucaoNotas: ''
  });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const response = await alunoService.getAll();
        setAlunos(response);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    carregarDados();
  }, []);

  const calcularMediaGeral = (notas) => {
    if (!notas || notas.length === 0) return 0;
    
    const soma = notas.reduce((acc, nota) => {
      const media = (nota.primeiroBimestre + nota.segundoBimestre + 
                    nota.terceiroBimestre + nota.quartoBimestre) / 4;
      return acc + media;
    }, 0);
    
    return (soma / notas.length).toFixed(2);
  };

  const calcularEvolucao = (notas) => {
    if (!notas || notas.length === 0) return "Sem dados";
    
    const primeiraNota = (notas[0].primeiroBimestre + notas[0].segundoBimestre + 
                         notas[0].terceiroBimestre + notas[0].quartoBimestre) / 4;
    
    const ultimaNota = (notas[notas.length - 1].primeiroBimestre + 
                       notas[notas.length - 1].segundoBimestre + 
                       notas[notas.length - 1].terceiroBimestre + 
                       notas[notas.length - 1].quartoBimestre) / 4;
    
    const evolucao = ((ultimaNota - primeiraNota) / primeiraNota * 100).toFixed(1);
    return `${evolucao}%`;
  };

  const filtrarAlunos = () => {
    let alunosFiltrados = [...alunos];
    
    if (filtros.rendaPerCapita) {
      alunosFiltrados = alunosFiltrados.filter(aluno => 
        aluno.familia && (aluno.familia.renda / aluno.familia.grupoFamiliar <= Number(filtros.rendaPerCapita))
      );
    }

    if (filtros.escola) {
        alunosFiltrados = alunosFiltrados.filter(aluno => 
          aluno.escola?.nome?.toLowerCase().includes(filtros.escola.toLowerCase())
        );
      }

    return alunosFiltrados;
  };

  const exportarParaCSV = () => {
    const tabela = document.querySelector('.tabela-relatorio');
    
    const linhas = tabela.querySelectorAll('tbody tr');
    
    const dadosCSV = [
      ['Aluno', 'Escola', 'Renda per capita', 'Média Geral', 'Evolução']
    ];

    linhas.forEach(linha => {
      const colunas = linha.querySelectorAll('td');
      dadosCSV.push([
        colunas[0].textContent,  
        colunas[1].textContent, 
        colunas[2].textContent, 
        colunas[3].textContent, 
        colunas[4].textContent 
      ]);
    });

    const csvContent = dadosCSV.map(linha => linha.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'relatorio_desempenho.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <header className="header">
        <h2>Relatório de Desempenho Acadêmico</h2>
        <button 
          onClick={exportarParaCSV}
          style={{
            marginLeft: '20px',
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Exportar CSV
        </button>
      </header>

      <main className="container">
        <div className="relatorio-container">
          <div className="filtros">
            <div className="form-group">
              <label htmlFor="rendaPerCapita">Renda per capita até:</label>
              <input
                type="number"
                id="rendaPerCapita"
                value={filtros.rendaPerCapita}
                onChange={(e) => setFiltros({...filtros, rendaPerCapita: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label htmlFor="escola">Escola:</label>
              <input
                type="text"
                id="escola"
                value={filtros.escola}
                onChange={(e) => setFiltros({...filtros, escola: e.target.value})}
              />
            </div>
          </div>

          <div className="tabela-container">
            <table className="tabela-relatorio">
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>Escola</th>
                  <th>Renda per capita</th>
                  <th>Média Geral</th>
                  <th>Evolução</th>
                </tr>
              </thead>
              <tbody>
                {filtrarAlunos().map(aluno => (
                  <tr key={aluno.id}>
                    <td>{aluno.nome}</td>
                    <td>{aluno.escola?.nome || 'N/A'}</td> 
                    <td>
                      {aluno.familia ? 
                        `R$ ${(aluno.familia.renda / aluno.familia.grupoFamiliar).toFixed(2)}` :
                        'N/A'}
                    </td>
                    <td>{calcularMediaGeral(aluno.notas)}</td>
                    <td>{calcularEvolucao(aluno.notas)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default RelatorioDesempenho;