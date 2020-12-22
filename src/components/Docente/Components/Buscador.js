import React from "react";
import styles from "../MainComponent.module.css";

function Buscador({ value, onSearch, onCancelSearch }) {
    return (
        <div className={styles.buscadorContainer}>
            <div className={styles.contForm}>
                <form>
                    <div className={styles.contInput}>
                        <input
                            type="text"
                            placeholder="Nombre del alumno"
                            value={value}
                            onChange={onSearch}
                        />
                        <button onClick={onCancelSearch}>x</button>
                    </div>
                </form>
            </div>
            {/* <div className={styles.contBuscador}>
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
            </div> */}
        </div>
    );
}

export default Buscador;
