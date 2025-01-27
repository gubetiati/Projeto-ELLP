import { useForm } from 'react-hook-form';
import './Form.css';
import ListaBimestre from '../ListaBimestre/ListaBimestre';

export default function Form() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();

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
                    <legend>Dados do Aluno</legend>
                    <div className="form-row">
                        {/** Repetição reduzida com map */}
                        {[
                            { label: 'Nome', name: 'nome' },
                            { label: 'Sobrenome', name: 'sobrenome' },
                            { label: 'Data de nascimento', name: 'dataNascimento', type: 'date' },
                            { label: 'Escola', name: 'escola' },
                            { label: 'Série', name: 'serie' },
                            { label: 'Família', name: 'familia' },
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
                    </div>
                    
                    <legend>Endereço</legend>
                    <div className="form-row">
                        {[
                            { label: 'Rua', name: 'rua' },
                            { label: 'Número', name: 'numero' },
                            { label: 'Bairro', name: 'bairro' },
                            { label: 'Complemento', name: 'complemento', required: false },
                        ].map(({ label, name, required = true }) => (
                            <div className="form-group" key={name}>
                                <label htmlFor={name}>{label}</label>
                                <input
                                    type="text"
                                    id={name}
                                    {...register(name, required ? { required: `${label} é obrigatório(a)` } : {})}
                                />
                                {errors[name] && <p className="error">{errors[name].message}</p>}
                            </div>
                        ))}
                    </div>
                    
                    <legend>Família</legend>
                    <div className="form-row">
                        {[
                            { label: 'Nome do responsável', name: 'nomeResponsavel' },
                            { label: 'Sobrenome do responsável', name: 'sobrenomeResponsavel' },
                            { label: 'Renda família média', name: 'renda', type: 'number' },
                            { label: 'Nº de membros da família', name: 'membrosFamilia', type: 'number' },
                            { 
                                label: 'Nº Telefone do responsável',
                                name: 'telefone',
                                pattern: {
                                    value: /\(?\d{2}\)?[\s-]?\d{4,5}[-]?\d{4}/,
                                    message: 'Digite um número de telefone válido',
                                },
                            },
                        ].map(({ label, name, type = 'text', pattern }) => (
                            <div className="form-group" key={name}>
                                <label htmlFor={name}>{label}</label>
                                <input
                                    type={type}
                                    id={name}
                                    {...register(name, {
                                        required: `${label} é obrigatório(a)`,
                                        ...(pattern && { pattern }),
                                    })}
                                />
                                {errors[name] && <p className="error">{errors[name].message}</p>}
                            </div>
                        ))}
                    </div>
                
                    <legend>Notas</legend>
                    <div className="notas">
                            {/* ListaBimestre para Nota Antiga */}
                            <ListaBimestre
                                titulo="Nota Antiga"
                                label="Bimestre:"
                                value={notaAntiga}
                                itens={bimestre}
                                onChange={(value) => setValue('notaAntiga', value)}
                            />
                            <input
                                type="hidden"
                                {...register('notaAntiga')}
                            />

                            {/* ListaBimestre para Nota Nova */}
                            <ListaBimestre
                                titulo="Nota Nova"
                                label="Bimestre:"
                                value={notaNova}
                                itens={bimestre}
                                onChange={(value) => setValue('notaNova', value)}
                            />
                            <input
                                type="hidden"
                                {...register('notaNova')}
                            />
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
