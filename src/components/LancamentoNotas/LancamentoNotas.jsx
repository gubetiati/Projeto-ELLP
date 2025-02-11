import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { alunoService } from '../../services/aluno';
import { disciplinaService } from '../../services/disciplina';
import { notaService } from '../../services/nota';
import { toast } from 'react-toastify';
import './LancamentoNotas.css';

const LancamentoNotas = () => {
    const [alunos, setAlunos] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [notasAnteriores, setNotasAnteriores] = useState(null);
    const [carregando, setCarregando] = useState(true);
    
    const { 
        register, 
        handleSubmit, 
        reset, 
        watch, 
        formState: { errors } 
    } = useForm({
        defaultValues: {
            alunoId: '',
            disciplinaId: '',
            primeiroBimestre: '',
            segundoBimestre: '',
            terceiroBimestre: '',
            quartoBimestre: ''
        }
    });

    const alunoSelecionado = watch('alunoId');
    const disciplinaSelecionada = watch('disciplinaId');

    useEffect(() => {
        const carregarDados = async () => {
            try {
                setCarregando(true);
                
                const [alunosData, disciplinasData] = await Promise.all([
                    alunoService.getAll(),
                    disciplinaService.getAll()
                ]);
    
                setAlunos(alunosData);
                setDisciplinas(disciplinasData);
    
                if (disciplinasData.length === 0) {
                    toast.warning('Nenhuma disciplina encontrada');
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                
                const errorMessage = error.response?.data?.message 
                    || 'Erro ao carregar dados. Tente novamente.';
                
                toast.error(errorMessage);
            } finally {
                setCarregando(false);
            }
        };
    
        carregarDados();
    }, []);

    useEffect(() => {
        const buscarNotasAnteriores = async () => {
            if (alunoSelecionado && disciplinaSelecionada) {
                try {
                    const historico = await notaService.getHistoricoPorAluno(
                        alunoSelecionado, 
                        disciplinaSelecionada
                    );
                    setNotasAnteriores(historico);
                } catch (error) {
                    console.error('Erro ao buscar histórico:', error);
                    toast.error('Não foi possível carregar o histórico de notas');
                    setNotasAnteriores(null);
                }
            }
        };

        buscarNotasAnteriores();
    }, [alunoSelecionado, disciplinaSelecionada]);

    const onSubmit = async (data) => {
        try {
            const notaData = {
                alunoId: data.alunoId,
                disciplinaId: data.disciplinaId,
                primeiroBimestre: parseFloat(data.primeiroBimestre) || 0,
                segundoBimestre: parseFloat(data.segundoBimestre) || 0,
                terceiroBimestre: parseFloat(data.terceiroBimestre) || 0,
                quartoBimestre: parseFloat(data.quartoBimestre) || 0,
                ano: new Date().getFullYear()
            };

            await notaService.create(notaData);
            toast.success('Notas cadastradas com sucesso!');
            reset();
            setNotasAnteriores(null);
        } catch (error) {
            console.error('Erro ao cadastrar notas:', error);
            toast.error('Não foi possível salvar as notas');
        }
    };

    if (carregando) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="lancamento-notas-container">
            <header className="header">
                <h2>Lançamento de Notas</h2>
            </header>

            <main className="container">
                <form onSubmit={handleSubmit(onSubmit)} className="form-notas">
                    <div className="form-section">
                        <div className="form-group">
                            <label htmlFor="alunoId">Aluno</label>
                            <select
                                id="alunoId"
                                {...register('alunoId', { 
                                    required: 'Selecione um aluno'
                                })}
                            >
                                <option value="">Selecione um aluno</option>
                                {alunos.map(aluno => (
                                    <option key={aluno.id} value={aluno.id}>
                                        {aluno.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.alunoId && (
                                <span className="error-message">
                                    {errors.alunoId.message}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="disciplinaId">Disciplina</label>
                            <select
                                id="disciplinaId"
                                {...register('disciplinaId', { 
                                    required: 'Selecione uma disciplina'
                                })}
                            >
                                <option value="">Selecione uma disciplina</option>
                                {disciplinas.map(disciplina => (
                                    <option key={disciplina.id} value={disciplina.id}>
                                        {disciplina.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.disciplinaId && (
                                <span className="error-message">
                                    {errors.disciplinaId.message}
                                </span>
                            )}
                        </div>
                    </div>

                    {notasAnteriores && notasAnteriores.length > 0 && (
                        <div className="historico-notas">
                            <h3>Histórico de Notas Anteriores</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Ano</th>
                                        <th>1º Bimestre</th>
                                        <th>2º Bimestre</th>
                                        <th>3º Bimestre</th>
                                        <th>4º Bimestre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notasAnteriores.map((nota, index) => (
                                        <tr key={index}>
                                            <td>{nota.ano}</td>
                                            <td>{nota.primeiroBimestre?.toFixed(1) || 'N/A'}</td>
                                            <td>{nota.segundoBimestre?.toFixed(1) || 'N/A'}</td>
                                            <td>{nota.terceiroBimestre?.toFixed(1) || 'N/A'}</td>
                                            <td>{nota.quartoBimestre?.toFixed(1) || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="form-section notas-bimestre">
                        <h3>Notas por Bimestre</h3>
                        <div className="notas-grid">
                            {['primeiro', 'segundo', 'terceiro', 'quarto'].map((bimestre, index) => (
                                <div className="form-group" key={bimestre}>
                                    <label htmlFor={`${bimestre}Bimestre`}>
                                        {`${index + 1}º Bimestre`}
                                    </label>
                                    <input
                                        type="number"
                                        id={`${bimestre}Bimestre`}
                                        step="0.1"
                                        min="0"
                                        max="10"
                                        {...register(`${bimestre}Bimestre`, {
                                            required: 'Nota obrigatória',
                                            min: { value: 0, message: 'Nota mínima é 0' },
                                            max: { value: 10, message: 'Nota máxima é 10' }
                                        })}
                                    />
                                    {errors[`${bimestre}Bimestre`] && (
                                        <span className="error-message">
                                            {errors[`${bimestre}Bimestre`].message}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="div-botao">
                        <button 
                            type="submit" 
                            className="btn-salvar-notas"
                        >
                            Salvar Notas
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default LancamentoNotas;