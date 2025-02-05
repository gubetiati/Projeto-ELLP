import { useForm } from 'react-hook-form';
import './FormFamilia.css';
import ListaBimestre from '../ListaBimestre/ListaBimestre';

export default function FormFamilia() {
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
                <h2>Cadastro de família</h2>
            </header>

            <main className="container">
                <section className="titulo">
                    <h2>Familia:</h2>
                </section>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        {/** Repetição reduzida com map */}
                        {[
                            { label: 'Nome do responsável', name: 'nomeResponsavel' },
                            { label: 'Endereço', name: 'endereco' },
                            { label: 'Nº de pessoas na família', name: 'numeroPessoas', type: 'number'},
                            
                        ].map(({ label, name, type = 'text' }) => (
                            <div className="form-group" key={name} style={{gridColumn: '1'}}>
                                <label htmlFor={name}>{label}</label>
                                <input
                                    type={type}
                                    id={name}
                                    {...register(name, { required: `${label} é obrigatório(a)` })}
                                />
                                {errors[name] && <p className="error">{errors[name].message}</p>}
                            </div>
                        ))}

                        {[
                            { label: 'Número', name: 'numero' },
                            { label: 'Bairro', name: 'bairro' },
                            { label: 'Telefone', name: 'telefone' },
                            { label: 'Escolaridade do pai', name: 'escolaridadePai' },
                            { label: 'Emprego Pai', name: 'empregoPai' },
                            { label: 'Quantos filhos há na família', name: 'numeroFilhos', type: 'number' },
                            { label: 'Renda aproximada da família', name: 'rendaFamilia' },

                        ].map(({ label, name, type = 'text' }) => (
                            <div className="form-group" key={name} style={{gridColumn: '2'}}>
                                <label htmlFor={name}>{label}</label>
                                <input
                                    type={type}
                                    id={name}
                                    {...register(name, { required: `${label} é obrigatório(a)` })}
                                />
                                {errors[name] && <p className="error">{errors[name].message}</p>}
                            </div>
                        ))}

                        {[
                            { label: 'Complemento', name: 'complemento' },
                            { label: 'Celular/Whatsapp', name: 'celular' },
                            { label: 'Escolaridade da mãe', name: 'escolaridadeMae' },
                            { label: 'Emprego da Mãe', name: 'empregoMae' },
                            { label: 'Nº de pessoas empregadas na família', name: 'pessoasEmpregadas', type: 'number' },


                        ].map(({ label, name, type = 'text' }) => (
                            <div className="form-group" key={name} style={{gridColumn: '3'}}>
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
                            <label htmlFor="transporte">
                                <input
                                    type="checkbox"
                                    id="transporte"
                                    {...register('transporte', {
                                        valueAsBoolean: false,
                                    })}
                                />
                                Necessita de transporte?
                            </label>
                            {errors.transporte && <p className="error">{errors.transporte.message}</p>}
                        </div>   

                        <div className="form-group checkbox-container">
                            <label htmlFor="internet">
                                <input
                                    type="checkbox"
                                    id="internet"
                                    {...register('internet', {
                                        valueAsBoolean: false,
                                    })}
                                />
                                Acesso à internet em casa?
                            </label>
                            {errors.internet && <p className="error">{errors.internet.message}</p>}
                        </div>   

                        <div className="form-group checkbox-container">
                            <label htmlFor="possuiComputador">
                                <input
                                    type="checkbox"
                                    id="possuiComputador"
                                    {...register('possuiComputador', {
                                        valueAsBoolean: false,
                                    })}
                                />
                                Possui computador em casa?
                            </label>
                            {errors.possuiComputador && <p className="error">{errors.possuiComputador.message}</p>}
                        </div> 

                        <div className="form-group checkbox-container">
                            <label htmlFor="carroProprio">
                                <input
                                    type="checkbox"
                                    id="carroProprio"
                                    {...register('carroProprio', {
                                        valueAsBoolean: false,
                                    })}
                                />
                                Família possui carro próprio?
                            </label>
                            {errors.carroProprio && <p className="error">{errors.carroProprio.message}</p>}
                        </div> 

                        <div className="form-group checkbox-container">
                            <label htmlFor="casaPropria">
                                <input
                                    type="checkbox"
                                    id="casaPropria"
                                    {...register('casaPropria', {
                                        valueAsBoolean: false,
                                    })}
                                />
                                Família possui casa própria?
                            </label>
                            {errors.casaPropria && <p className="error">{errors.casaPropria.message}</p>}
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
