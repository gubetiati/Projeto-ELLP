import './TextField.css';

export default function TextField({ label, valor, aoAlterado }) {
    return (
        <div className="campo-texto">
            <label>{label}</label>
            <input
                type="text"
                value={valor}
                onChange={(e) => aoAlterado(e.target.value)}
            />
        </div>
    );
}
