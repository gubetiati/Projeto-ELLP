/* eslint-disable react/prop-types */
import './ListaBimestre.css';

// eslint-disable-next-line no-unused-vars
export default function ListaBimestre({ titulo, label, value, itens, onChange }) {
    return (
        <div className="notas-box">
            <h3>{titulo}</h3>
            <label>{label}</label>
            <select
                className="lista-bimestres"
                value={value}
                onChange={(e) => console.log('Selecionado:', e.target.value)}
            >
                {itens.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            <div className="inputs-notas">
                <div className="nota-item">
                    <label htmlFor="matematica">Matemática</label>
                    <input type="number" id="matematica" />
                </div>
                <div className="nota-item">
                    <label htmlFor="ciencias">Ciências</label>
                    <input type="number" id="ciencias" />
                </div>
                
            </div>
        </div>
    );
}
