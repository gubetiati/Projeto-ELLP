import { useForm } from 'react-hook-form';
import './FormTest2.css';

export default function FormTest2() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <div className='header'>
                <h2>Cadastro de aluno</h2>
            </div>

            <div className="container">

                <div className='titulo'>
                    <h2>Aluno:</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}> {/* Form envolvido no handleSubmit */}
                    <div className="form-group">
                        <label>Nome</label>
                        <input 
                            type="text" 
                            placeholder="Digite seu nome" 
                            {...register('nome', { required: 'O nome é obrigatório' })} 
                        />
                        {errors.nome && <p className="error">{errors.nome.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="Digite seu email" 
                            {...register('email', { 
                                required: 'O email é obrigatório',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Digite um email válido'
                                }
                            })} 
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    <div className="div-botao">
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </>
    );
}
