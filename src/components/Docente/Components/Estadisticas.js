import React from "react";

function Estadisticas({ roles, ...items }) {
    return (
        <>
            {roles.map((rol, index) => {
                switch (rol) {
                    case "capturador":
                        return (
                            <section key={rol}>
                                <h4>Palabras agregadas</h4>
                                <p>{items.palabrasAgregadas}</p>
                                <h4>Palabras pendientes</h4>
                                <p>{items.palabrasPendientes}</p>
                                <h4>Palabras rechazadas</h4>
                                <p>{items.palabrasRechazadas}</p>
                            </section>
                        );
                    case "verificador":
                        return (
                            <section key={rol}>
                                <h4>Palabras verificadas</h4>
                                <p>{items.palabrasVerificadas}</p>
                            </section>
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
}

export default Estadisticas;
