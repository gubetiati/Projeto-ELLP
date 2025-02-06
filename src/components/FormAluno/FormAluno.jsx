import { useForm } from 'react-hook-form';
import './FormAluno.css';
import ListaBimestre from '../ListaBimestre/ListaBimestre';

export default function FormAluno() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm();

    const bimestre = ['2024/4', '2025/1', '2025/2', '2025/3', '2025/4'];
    const notaAntiga = watch('notaAntiga', bimestre[0]);
    const notaNova = watch('notaNova', bimestre[0]);

    const onSubmit = async (data) => {
        console.log(data);
        // Mensagem de sucesso integrada à UI
        alert('Dados salvos com sucesso!');
    };

    const handleBimestreChange = (field, value) => {
        setValue(field, value);
    }


    return (
        <>
            <header className="header">
                <h2>Cadastro de aluno</h2>
            </header>

            <main className="container">
                <section className="titulo">
                    <h2>Aluno:</h2>
                </section>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        {/** Repetição reduzida com map */}
                        {[
                            { label: 'Nome Completo', name: 'nomeCompleto' },
                            { label: 'Série', name: 'serie' },
                            { label: 'Data de nascimento', name: 'dataNascimento', type: 'date' },
                            { label: 'Escola', name: 'escola' },

                        ].map(({ label, name, type = 'text' }) => (
                            <div className="form-group" key={name}>
                                <label htmlFor={name}>{label}</label>
                                <input
                                    type={type}
                                    id={name}
                                    {...register(name, { required: `${label} é obrigatório(a)` })}
                                />
                                {errors[name] && <p className="error">{errors[name].message}</p>}
                            </div>
                        ))}

                        <div className="form-group checkbox-container">
                            <label htmlFor="atendimento">
                                <input
                                    type="checkbox"
                                    id="atendimento"
                                    {...register('atendimento', {
                                        valueAsBoolean: false,
                                    })}
                                />
                                O aluno recebe atendimento médico/clínico?
                            </label>
                            {errors.atendimento && <p className="error">{errors.atendimento.message}</p>}
                        </div>     
                    </div>
                
                <div className="containers-wrapper">
                    <div className='container-notas-freq'>
                        <legend className='legenda'>Notas</legend>
                        <div className="notas">
                            <ListaBimestre
                                titulo="Nota Antiga"
                                label="Bimestre:"
                                value={notaAntiga}
                                itens={bimestre}
                                onChange={(value) => setValue('notaAntiga', value)}
                            />
                            <input type="hidden" {...register('notaAntiga')} />
                            
                            <ListaBimestre
                                titulo="Nota Nova"
                                label="Bimestre:"
                                value={notaNova}
                                itens={bimestre}
                                onChange={(value) => setValue('notaNova', value)}
                            />
                            <input type="hidden" {...register('notaNova')} />
                        </div>
                    </div>


                    <div className='container-frequency'>
                    <legend className='legenda'>Frequência</legend>
                    
                    <div className="form-group">
                        <label htmlFor="ativo">
                            <input
                                type="checkbox"
                                id="ativo"
                                {...register('ativo', {
                                    valueAsBoolean: false
                                })}
                            />
                            Ativo:
                        </label>
                    </div>

                        {/* Data de Matrícula */}
                        <div className="form-group">
                            <label>Data de Matrícula</label>
                            <input
                                type="date"
                                {...register('dataMatricula', {
                                    required: 'Data de matrícula é obrigatória'
                                })}
                            />
                            {errors.dataMatricula && <p className="error">{errors.dataMatricula.message}</p>}
                        </div>

                        <div className="form-group">
                            <label>Data de Encerramento</label>
                            <input
                                type="date"
                                {...register('dataEncerramento', {
                                    required: 'Data de encerramento é obrigatória'
                                })}
                            />
                            {errors.dataEncerramento && <p className="error">{errors.dataEncerramento.message}</p>}
                        </div>
                    </div>
                </div>
                <div className="div-botao">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                    
                </form>
            </main>
        </>
    );
}
