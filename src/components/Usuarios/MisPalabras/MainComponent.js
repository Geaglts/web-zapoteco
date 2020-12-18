import React, { useState } from "react";
import styles from "./MainComponent.module.css";
import { gql, useQuery, useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import fondo from "../../../assets/img2.jpg";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBandAid } from "@fortawesome/free-solid-svg-icons";

function MainComponent() {
    const [confirmacionVisible, setConfirmacionVisible] = useState(false);
    const [palabraId, setPalabraId] = useState(0);
    const [tipoDeLista, setTipoDeLista] = useState(1);
    const history = useHistory();

    let getData = useQuery(GraphqlOp.Query.ABOUT_ME);
    if (getData.loading) return null;

    getData.refetch();

    const returnBack = () => {
        history.goBack();
    };

    const changeTipoDeLista = (tipo) => () => {
        setTipoDeLista(tipo);
    };

    const activateConfirmation = (id) => (e) => {
        e.preventDefault();
        setPalabraId(id);
        setConfirmacionVisible(!confirmacionVisible);
    };

    let { nombre, apaterno, amaterno, ...usuario } = getData.data.aboutMe;
    let nombre_completo = `${nombre} ${apaterno} ${amaterno}`;

    return (
        <>
            <Confirmacion
                visible={confirmacionVisible}
                setVisible={setConfirmacionVisible}
                palabraId={palabraId}
                refetch={getData.refetch}
            />
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
                            <Lista
                                tipo={tipoDeLista}
                                activateConfirmation={activateConfirmation}
                            />
                        </section>
                    </section>
                </div>
            </div>
        </>
    );
}

const Lista = ({ tipo, activateConfirmation }) => {
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
                    <PalabrasNormales
                        data={pendingWord}
                        tipo={tipo}
                        activateConfirmation={activateConfirmation}
                    />
                </div>
            );
        case 3:
            return (
                <div className={classnames(styles.listItems)}>
                    <div className={classnames(styles.listDiv)}>
                        <h1>Rechazadas</h1>
                    </div>
                    <PalabrasNormales
                        data={rejectWords}
                        tipo={tipo}
                        activateConfirmation={activateConfirmation}
                    />
                </div>
            );
        default:
            return null;
    }
};

const PalabrasNormales = ({ data, tipo, activateConfirmation = (_) => {} }) => {
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
                                            <TableButton
                                                onClick={activateConfirmation(
                                                    palabra.id
                                                )}
                                                label="Eliminar"
                                            />
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

const Confirmacion = ({
    visible = false,
    setVisible = (_) => {},
    palabraId,
    refetch,
}) => {
    const deletePendingWordMutation = GraphqlOp.Mutation.DELETE_PENDING_WORD;
    const [deletePendingWordFun] = useMutation(deletePendingWordMutation);

    const deletePendingWord = async () => {
        try {
            const res = await deletePendingWordFun({
                variables: {
                    palabraId,
                },
            });

            if (res.data) {
                await refetch();
                setVisible(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const closeWindow = () => {
        setVisible(false);
    };

    return (
        visible && (
            <div className={classnames(styles.confirmacion, styles.noselect)}>
                <div className={styles.confirmacionContent}>
                    <div className={styles.mensaje}>
                        <h1>Estas seguro?</h1>
                        <p>
                            Esta accion eliminara esta palabra y no podra ser
                            recuperada.
                        </p>
                    </div>
                    <div className={styles.botonera}>
                        <button onClick={deletePendingWord}>Confirmar</button>
                        <button onClick={closeWindow}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
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
                        base_esp
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
                    traducciones
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
    Mutation: {
        DELETE_PENDING_WORD: gql`
            mutation($palabraId: Int!) {
                deletePendingWord(palabra_id: $palabraId)
            }
        `,
    },
};

export default MainComponent;
