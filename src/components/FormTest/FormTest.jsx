import React from 'react';
import { useForm } from 'react-hook-form';
import './FormTest.css'; // Importando a estilização

const FormTest = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      {/* Aluno */}
      <h2>Aluno</h2>
      <div className="form-group">
        <label>Nome:</label>
        <input type="text" {...register('aluno.nome', { required: 'Nome é obrigatório' })} />
        {errors.aluno?.nome && <span className="error">{errors.aluno?.nome.message}</span>}
      </div>
      <div className="form-group">
        <label>Sobrenome:</label>
        <input type="text" {...register('aluno.sobrenome', { required: 'Sobrenome é obrigatório' })} />
        {errors.aluno?.sobrenome && <span className="error">{errors.aluno?.sobrenome.message}</span>}
      </div>
      <div className="form-group">
        <label>Data de nascimento:</label>
        <input type="date" {...register('aluno.dataNascimento', { required: 'Data de nascimento é obrigatória' })} />
        {errors.aluno?.dataNascimento && <span className="error">{errors.aluno?.dataNascimento.message}</span>}
      </div>

      {/* Escola */}
      <h2>Escola</h2>
      <div className="form-group">
        <label>Série:</label>
        <input type="text" {...register('escola.serie', { required: 'Série é obrigatória' })} />
        {errors.escola?.serie && <span className="error">{errors.escola?.serie.message}</span>}
      </div>

      {/* Família */}
      <h2>Família</h2>
      <div className="form-group">
        <label>Nome do responsável:</label>
        <input type="text" {...register('familia.nomeResponsavel', { required: 'Nome do responsável é obrigatório' })} />
        {errors.familia?.nomeResponsavel && <span className="error">{errors.familia?.nomeResponsavel.message}</span>}
      </div>
      <div className="form-group">
        <label>Sobrenome do responsável:</label>
        <input type="text" {...register('familia.sobrenomeResponsavel', { required: 'Sobrenome do responsável é obrigatório' })} />
        {errors.familia?.sobrenomeResponsavel && <span className="error">{errors.familia?.sobrenomeResponsavel.message}</span>}
      </div>
      <div className="form-group">
        <label>Renda Familiar:</label>
        <input type="number" {...register('familia.rendaFamiliar', { required: 'Renda familiar é obrigatória' })} />
        {errors.familia?.rendaFamiliar && <span className="error">{errors.familia?.rendaFamiliar.message}</span>}
      </div>
      <div className="form-group">
        <label>Número de membros da família:</label>
        <input type="number" {...register('familia.numeroMembros', { required: 'Número de membros é obrigatório' })} />
        {errors.familia?.numeroMembros && <span className="error">{errors.familia?.numeroMembros.message}</span>}
      </div>
      <div className="form-group">
        <label>Número de telefone do responsável:</label>
        <input type="tel" {...register('familia.telefoneResponsavel', { required: 'Telefone do responsável é obrigatório' })} />
        {errors.familia?.telefoneResponsavel && <span className="error">{errors.familia?.telefoneResponsavel.message}</span>}
      </div>
      <div className="form-group">
        <label>Possui internet?</label>
        <input type="checkbox" {...register('familia.possuiInternet')} />
      </div>
      <div className="form-group">
        <label>Possui computador?</label>
        <input type="checkbox" {...register('familia.possuiComputador')} />
      </div>

      {/* Notas */}
      <h2>Notas</h2>
      <div className="form-group">
        <label>Nota antiga:</label>
        <select {...register('notas.notaAntiga', { required: 'Nota antiga é obrigatória' })}>
          <option value="">Selecione</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {errors.notas?.notaAntiga && <span className="error">{errors.notas?.notaAntiga.message}</span>}
      </div>
      <div className="form-group">
        <label>Nota nova:</label>
        <select {...register('notas.notaNova', { required: 'Nota nova é obrigatória' })}>
          <option value="">Selecione</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        {errors.notas?.notaNova && <span className="error">{errors.notas?.notaNova.message}</span>}
      </div>
      <div className="form-group">
        <label>Bimestre:</label>
        <input type="text" {...register('notas.bimestre', { required: 'Bimestre é obrigatório' })} />
        {errors.notas?.bimestre && <span className="error">{errors.notas?.bimestre.message}</span>}
      </div>
      <div className="form-group">
        <label>Data de matrícula:</label>
        <input type="date" {...register('notas.dataMatricula', { required: 'Data de matrícula é obrigatória' })} />
        {errors.notas?.dataMatricula && <span className="error">{errors.notas?.dataMatricula.message}</span>}
      </div>
      <div className="form-group">
        <label>Data de encerramento:</label>
        <input type="date" {...register('notas.dataEncerramento', { required: 'Data de encerramento é obrigatória' })} />
        {errors.notas?.dataEncerramento && <span className="error">{errors.notas?.dataEncerramento.message}</span>}
      </div>
      <div className="form-group">
        <label>Nota de matemática:</label>
        <input type="number" {...register('notas.notaMatematica', { required: 'Nota de matemática é obrigatória' })} />
        {errors.notas?.notaMatematica && <span className="error">{errors.notas?.notaMatematica.message}</span>}
      </div>
      <div className="form-group">
        <label>Nota de ciências:</label>
        <input type="number" {...register('notas.notaCiencias', { required: 'Nota de ciências é obrigatória' })} />
        {errors.notas?.notaCiencias && <span className="error">{errors.notas?.notaCiencias.message}</span>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormTest;
