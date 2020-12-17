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
                            <p key={rol}>{rol}</p>
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

    myWords.refetch();

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
    const history = useHistory();
    let activarBotonera = tipo === 2 || tipo === 3;
    let ocultarTraducciones = tipo === 3;

    const goToUpdate = (palabra) => () => {
        history.push({
            pathname: "/update-word",
            state: { palabra, tipo },
        });
    };

    return (
        <div className={classnames(styles.wordItemsContainer)}>
            <div className={classnames(styles.wordItems)}>
                <table className={classnames(styles.tableWords)}>
                    <thead>
                        <tr>
                            <th>Palabra</th>
                            {!ocultarTraducciones && <th>Traducciones</th>}
                            {ocultarTraducciones && <th>Mensaje</th>}
                            {ocultarTraducciones && <th>Rechazado por</th>}
                            {activarBotonera && <th>Opciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((palabra) => {
                            return (
                                <tr key={palabra.id}>
                                    <td>{palabra.texto}</td>
                                    {!ocultarTraducciones && (
                                        <td className={styles.traducciones}>
                                            {palabra?.traducciones?.map(
                                                (traduccion, index) => (
                                                    <p key={index}>
                                                        {traduccion}
                                                    </p>
                                                )
                                            )}
                                        </td>
                                    )}
                                    {ocultarTraducciones && (
                                        <td>{palabra?.mensaje}</td>
                                    )}
                                    {ocultarTraducciones && (
                                        <td>
                                            {palabra?.rechazado_por?.nombre}
                                        </td>
                                    )}
                                    {activarBotonera && (
                                        <td>
                                            <TableButton
                                                onClick={goToUpdate(palabra)}
                                                label="Actuzalizar"
                                            />
                                            <TableButton label="Eliminar" />
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

const TableButton = ({ label, ...rest }) => {
    return (
        <button className={styles.tableButton} {...rest}>
            <span>
                <FontAwesomeIcon icon={faBandAid} />
            </span>
            {label}
        </button>
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
                    fonetica
                    tipo
                    traducciones
                    categoria
                    base {
                        id
                    }
                    contextos {
                        id
                        contexto
                    }
                    example {
                        _id
                        ejemplo_esp
                        ejemplo_zap
                    }
                }
                approvedWords {
                    id
                    texto
                    fonetica
                    tipo
                    traducciones
                    categoria
                    base {
                        id
                        base_esp
                    }
                    contextos {
                        id
                        contexto
                    }
                }
                rejectedWords {
                    id
                    texto
                    fonetica
                    tipo
                    traducciones
                    categoria
                    base {
                        id
                        base_esp
                    }
                    contextos {
                        id
                        contexto
                    }
                    mensaje
                    rechazado_por {
                        id
                        nombre
                        apaterno
                        amaterno
                    }
                    example {
                        _id
                        ejemplo_esp
                        ejemplo_zap
                    }
                }
            }
        `,
    },
};

export default MainComponent;
