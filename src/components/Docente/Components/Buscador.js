import React from "react";

function Buscador({ value, onSearch, onCancelSearch }) {
    return (
        <div>
            <h2>Filtrar</h2>
            <div>
                <input
                    type="text"
                    placeholder="nombre del alumno"
                    value={value}
                    onChange={onSearch}
                />
                <button onClick={onCancelSearch}>cancelar</button>
            </div>
        </div>
    );
}

export default Buscador;
