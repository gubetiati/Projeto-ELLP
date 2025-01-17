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

                <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
        <div className="form-group">
            <label>Nome</label>
            <input 
                type="text"  
                {...register('nome', { required: 'O nome é obrigatório' })} 
            />
            {errors.nome && <p className="error">{errors.nome.message}</p>}
        </div>

        <div className="form-group">
            <label>Sobrenome</label>
            <input 
                type="text" 
                {...register('sobrenome', { required: 'O sobrenome é obrigatório' })} 
            />
            {errors.sobrenome && <p className="error">{errors.sobrenome.message}</p>}
        </div>

        <div className="form-group">
            <label>Data de nascimento</label>
            <input 
                type="text" 
                {...register('dataNascimento')} 
            />
        </div>

        <div className="form-group">
            <label>Escola</label>
            <input 
                type="text" 
                {...register('escola')} 
            />
        </div>

        <div className="form-group">
            <label>Série</label>
            <input 
                type="text" 
                {...register('serie')} 
            />
        </div>

        <div className="form-group">
            <label>Família</label>
            <input 
                type="text" 
                {...register('familia')} 
            />
        </div>

        <div className="form-row">
            <div className="form-group" style={{width: '260px'}}>
                <label>Rua:</label>
                <input 
                    type="text" 
                    {...register('rua')} 
                />
            </div>

                <div 
                    className="form-group small"
                    style={{width: '100px', marginLeft: '5px'}}
                >
                    <label>Número:</label>
                    <input 
                        type="text" 
                        {...register('numero')} 
                    />
                </div>

                <div 
                className="form-group small"
                style={{marginLeft: '-20px', width: '200px'}}
                >
                    <label>Bairro:</label>
                    <input 
                        type="text" 
                        {...register('bairro')} 
                    />
                </div>
                
        </div>
        <div 
            className="form-group small" 
            style={{marginLeft: '35px'}}
        >
                <label>Complemento:</label>
                <input 
                    type="text" 
                    {...register('complemento')} 
                />
            </div>

            
        {/* <div className="form-group">
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
        </div> */}

    </div>

    <div className="div-botao">
        <button type="submit">Salvar</button>
    </div>
</form>
            </div>
        </>
    );
}
