import React, { useState } from "react";
import styles from "./MainComponent.module.css";
import { gql, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import fondo from "../../../assets/img2.jpg";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBandAid } from "@fortawesome/free-solid-svg-icons";

function MainComponent() {
    const [tipoDeLista, setTipoDeLista] = useState(1);
    const history = useHistory();

    let getData = useQuery(GraphqlOp.Query.ABOUT_ME);
    if (getData.loading) return null;

    const returnBack = () => {
        history.goBack();
    };

    const changeTipoDeLista = (tipo) => () => {
        setTipoDeLista(tipo);
    };

    let { nombre, apaterno, amaterno, ...usuario } = getData.data.aboutMe;
    let nombre_completo = `${nombre} ${apaterno} ${amaterno}`;

    return (
        <div className={classnames(styles.container, styles.noselect)}>
            <button
                onClick={returnBack}
                className={classnames(styles.regresar)}
            >
                regresar
            </button>
            <div className={classnames(styles.content)}>
                <section className={classnames(styles.miData)}>
                    <img src={fondo} alt="fondo" />
                    <h3>{nombre_completo}</h3>
                    <p>{usuario?.correo}</p>
                    <p>{usuario?.ncontrol}</p>
                    <h4>Roles</h4>
                    <ul>
                        {usuario?.roles.map((rol) => (
                            <p>{rol}</p>
                        ))}
                    </ul>
                    <h4>Estadistica</h4>
                    <section className={classnames(styles.estadisticas)}>
                        <p>
                            Palabras agregadas
                            <span>{usuario?.palabrasAgregadas}</span>
                        </p>
                        <p>
                            Palabras pendientes
                            <span>{usuario?.palabrasPendientes}</span>
                        </p>
                        <p>
                            Palabras rechazadas
                            <span>{usuario?.palabrasRechazadas}</span>
                        </p>
                    </section>
                </section>
                <section className={classnames(styles.views)}>
                    <nav className={classnames(styles.menu)}>
                        <ul>
                            <button onClick={changeTipoDeLista(1)}>
                                Agregadas
                            </button>
                            <button onClick={changeTipoDeLista(2)}>
                                Pendientes
                            </button>
                            <button onClick={changeTipoDeLista(3)}>
                                Rechazadas
                            </button>
                        </ul>
                    </nav>
                    <section className={classnames(styles.lists)}>
                        <Lista tipo={tipoDeLista} />
                    </section>
                </section>
            </div>
        </div>
    );
}

const Lista = ({ tipo }) => {
    let myWords = useQuery(GraphqlOp.Query.MIS_PALABRAS);
    if (myWords.loading) return null;

    let pendingWord = myWords.data.pendingWords;
    let approvedWords = myWords.data.approvedWords;
    let rejectWords = myWords.data.rejectedWords;

    switch (tipo) {
        case 1:
            return (
                <div className={classnames(styles.listItems)}>
                    <div className={classnames(styles.listDiv)}>
                        <h1>Agregadas</h1>
                    </div>
                    <PalabrasNormales data={approvedWords} tipo={tipo} />
                </div>
            );
        case 2:
            return (
                <div className={classnames(styles.listItems)}>
                    <div className={classnames(styles.listDiv)}>
                        <h1>Pendientes</h1>
                    </div>
                    <PalabrasNormales data={pendingWord} tipo={tipo} />
                </div>
            );
        case 3:
            return (
                <div className={classnames(styles.listItems)}>
                    <div className={classnames(styles.listDiv)}>
                        <h1>Rechazadas</h1>
                    </div>
                    <PalabrasNormales data={rejectWords} tipo={tipo} />
                </div>
            );
        default:
            return null;
    }
};

const PalabrasNormales = ({ data, tipo }) => {
    let activarBotonera = tipo == 2 || tipo == 3;

    return (
        <div className={classnames(styles.wordItemsContainer)}>
            <div className={classnames(styles.wordItems)}>
                <table className={classnames(styles.tableWords)}>
                    <thead>
                        <tr>
                            <th>Palabra</th>
                            <th>Traducciones</th>
                            {activarBotonera && <th>Opciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((palabra) => {
                            return (
                                <tr key={palabra.id}>
                                    <td>{palabra.texto}</td>
                                    <td className={styles.traducciones}>
                                        {palabra?.traducciones?.map(
                                            (traduccion) => (
                                                <p>{traduccion}</p>
                                            )
                                        )}
                                    </td>
                                    {activarBotonera && (
                                        <td>
                                            <button
                                                className={styles.tableButton}
                                            >
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faBandAid}
                                                    />
                                                </span>
                                                Actuzalizar
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {/* {data.map((palabra) => {
                    return (
                        <div
                            key={palabra.id}
                            className={classnames(styles.wordItem)}
                        >
                            <div
                                className={classnames(styles.wordDecorate)}
                            ></div>
                            <div className={classnames(styles.wordData)}>
                                <p>
                                    Zapoteco <span>{palabra.texto}</span>
                                </p>
                                <hr />
                                <div
                                    className={classnames(styles.traducciones)}
                                >
                                    <h2>Traducciones</h2>
                                    <div>
                                        {palabra?.traducciones?.map(
                                            (traduccion) => (
                                                <p>{traduccion}</p>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })} */}
            </div>
        </div>
    );
};

const GraphqlOp = {
    Query: {
        ABOUT_ME: gql`
            {
                aboutMe {
                    id
                    nombre
                    amaterno
                    apaterno
                    usuario
                    correo
                    ncontrol
                    roles
                    palabrasAgregadas
                    palabrasRechazadas
                    palabrasPendientes
                    admin
                }
            }
        `,
        MIS_PALABRAS: gql`
            {
                pendingWords {
                    id
                    texto
                    traducciones
                }
                approvedWords {
                    id
                    texto
                    traducciones
                }
                rejectedWords {
                    id
                    texto
                    traducciones
                }
            }
        `,
    },
};

export default MainComponent;
