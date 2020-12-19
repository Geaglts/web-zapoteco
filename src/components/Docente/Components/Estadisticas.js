import React from "react";
import styles from "../MainComponent.module.css";

function Estadisticas({ roles, ...items }) {
    return (
        <>
            {roles.map((rol, index) => {
                switch (rol) {
                    case "capturador":
                        return (
                            <div className={styles.contEstadistica} key={rol}>
                                <div className={styles.estadistica} key={rol}>
                                    <h4>Palabras agregadas</h4>
                                    <p>{items.palabrasAgregadas}</p>
                                </div>
                                <div className={styles.estadistica} key={rol}>
                                    <h4>Palabras pendientes</h4>
                                    <p>{items.palabrasPendientes}</p>
                                </div>
                                <div className={styles.estadistica} key={rol}>
                                    <h4>Palabras rechazadas</h4>
                                    <p>{items.palabrasRechazadas}</p>
                                </div>
                            </div>
                        );
                    case "verificador":
                        return (
                            <div className={styles.contEstadistica} key={rol}>
                                <div className={styles.estadistica} key={rol}>
                                    <h4>Palabras verificadas</h4>
                                    <p>{items.palabrasVerificadas}</p>
                                </div>
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
}

export default Estadisticas;
