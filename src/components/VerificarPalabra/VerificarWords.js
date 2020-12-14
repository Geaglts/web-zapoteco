import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import CardCarousel from "./components/CardCarousel";
import styles from "./VerificarWords.module.css";
import "pure-react-carousel/dist/react-carousel.es.css";

export default function MainComponent() {
    return <Tarjeta />;
}

const Tarjeta = () => {
    const history = useHistory();
    const goToRegresar = () => {
        history.push("/inicio");
    };

    let queryPendingWords = GraphqlOp.query.GET_PENDING_WORDS;
    let PendingWords = useQuery(queryPendingWords);

    if (PendingWords.loading) return null;
    if (PendingWords.error) return null;

    PendingWords.refetch();

    let pendientes = PendingWords.data.getPendingWords;

    return (
        <div className={styles.contVerificar}>
            <div className={styles.header}>
                <h1>Diccionario de palabras</h1>
                <button className={styles.regresar} onClick={goToRegresar}>
                    Volver
                </button>
            </div>
            <div className={styles.contCard}>
                {pendientes.map((pendiente) => (
                    <LlenarTarjeta
                        row={pendiente}
                        key={pendiente.id}
                        refetch={PendingWords.refetch}
                    />
                ))}
                {/* <LlenarTarjeta
                    pendientes={pendientes}
                    refetch={PendingWords.refetch}
                /> */}
            </div>
        </div>
    );
};

const LlenarTarjeta = ({ row, refetch }) => {
    const [visibleConfirmacion, setVisibleConfirmacion] = useState(false);
    const [visibleRechazar, setVisibleRechazar] = useState(false);

    const goShowAcceptCard = () => {
        setVisibleConfirmacion(!visibleConfirmacion);
    };

    const goShowRejectCard = () => {
        setVisibleRechazar(!visibleRechazar);
    };

    return (
        <div className={styles.card}>
            <div className={styles.contPalabra}>
                <div className={styles.contTitulo}>
                    <h1>{row.texto}</h1>
                    <div className={styles.contInfo}>
                        <div className={styles.contTxt}>
                            <h2>fonetica</h2>
                            <h3>{row.fonetica}</h3>
                        </div>
                        <div className={styles.contTxt}>
                            <h2>categoria</h2>
                            <h3>{row.categoria}</h3>
                        </div>
                        <div className={styles.contTxt}>
                            <h2>tipo</h2>
                            <h3>{row.tipo}</h3>
                        </div>
                    </div>
                </div>
                <div className={styles.contTitulo}>
                    <h1>base</h1>
                    <div className={styles.contInfo}>
                        <div className={styles.contTxt}>
                            <h2>español</h2>
                            <h3>{row.base.base_esp}</h3>
                        </div>
                        <div className={styles.contTxt}>
                            <h2>zapoteco</h2>
                            <h3>{row.base.base_zap}</h3>
                        </div>
                    </div>
                </div>
                <div className={styles.contTitulo}>
                    <div className={styles.contInfo}>
                        <div className={styles.contTxt}>
                            <h2>traducciones</h2>
                            <h3>
                                {<LlenarTraducciones row={row.traducciones} />}
                            </h3>
                        </div>
                        <div className={styles.contTxt}>
                            <h2>ejemplo</h2>
                            <h3>ESPAÑOL: {row.example.ejemplo_esp}</h3>
                            <h3>ZAPOTECO: {row.example.ejemplo_zap}</h3>
                        </div>
                    </div>
                </div>
                <div className={styles.botones}>
                    <button onClick={goShowAcceptCard}>aceptar</button>
                    <button onClick={goShowRejectCard}>rechazar</button>
                </div>
                {visibleConfirmacion && (
                    <VentanaConfirmar
                        usuarioid={row.usuarioid}
                        palabraid={row.id}
                        hideWindow={goShowAcceptCard}
                        refetch={refetch}
                    />
                )}
                {visibleRechazar && (
                    <VentanaRechazar
                        usuarioid={row.usuarioid}
                        palabraid={row.id}
                        hideWindow={goShowRejectCard}
                        refetch={refetch}
                    />
                )}
                {/* <Card fluid {...cardProps} /> */}
            </div>
        </div>
    );
};

const LlenarTraducciones = ({ row }) => {
    return (
        <section>
            {row.map((traduccion, index) => (
                <p key={index}>{traduccion}</p>
            ))}
        </section>
    );
};

const LlenarContextos = ({ row }) => {
    return (
        <section>
            {row.map((contexto, index) => (
                <p key={index}>{contexto.contexto}</p>
            ))}
        </section>
    );
};

const VentanaConfirmar = ({ usuarioid, palabraid, hideWindow, refetch }) => {
    let CheckPendingWord = GraphqlOp.mutation.CHECK_PENDING_WORD;
    const [checkPending] = useMutation(CheckPendingWord);

    const ConfirmarPalabra = async () => {
        try {
            await checkPending({
                variables: {
                    id_usuario: usuarioid,
                    id_palabra_p: palabraid,
                },
            });

            await refetch();
            hideWindow();
        } catch (e) {
            alert("No deberias ver esto");
        }
    };

    return (
        <div className={styles.accion}>
            <h3>¿Estas seguro que deseas agregar esta palabra?</h3>
            <div className={styles.botones}>
                <button onClick={ConfirmarPalabra}>confirmar</button>
                <button onClick={hideWindow}>volver</button>
            </div>
        </div>
    );
};

const VentanaRechazar = ({ usuarioid, palabraid, hideWindow, refetch }) => {
    const [mensaje, setMensaje] = useState("");

    let rejectMutation = GraphqlOp.mutation.REJECT_PENDING_WORD;
    const [rejectPendingWord] = useMutation(rejectMutation);

    const onChangeInput = (e) => {
        setMensaje(e.target.value);
    };

    const RechazarPalabra = async () => {
        try {
            if (mensaje.length < 4) {
                alert("No puede rechazar con un mensaje tan corto");
            } else {
                await rejectPendingWord({
                    variables: {
                        palabra_id: palabraid,
                        mensaje,
                    },
                });

                await refetch();

                setMensaje("");
                hideWindow();
            }
        } catch (error) {
            alert("Que raro que estes aqui");
        }
    };

    return (
        <div className={styles.accion}>
            <h3>Rechazar palabra</h3>
            <input
                required
                value={mensaje}
                onChange={onChangeInput}
                type="text"
                placeholder="mensaje"
            />
            <div className={styles.botones}>
                <button onClick={RechazarPalabra}>rechazar</button>
                <button onClick={hideWindow}>volver</button>
            </div>
        </div>
    );
};

const GraphqlOp = {
    query: {
        GET_PENDING_WORDS: gql`
            {
                getPendingWords {
                    id
                    texto
                    fonetica
                    tipo
                    traducciones
                    usuarioid
                    categoria
                    base {
                        id
                        base_esp
                        base_zap
                    }
                    contextos {
                        id
                        contexto
                    }
                    example {
                        ejemplo_esp
                        ejemplo_zap
                    }
                }
            }
        `,
    },
    mutation: {
        CHECK_PENDING_WORD: gql`
            mutation($id_usuario: Int!, $id_palabra_p: Int!) {
                checkPendingWord(
                    id_usuario: $id_usuario
                    id_palabra_p: $id_palabra_p
                )
            }
        `,
        REJECT_PENDING_WORD: gql`
            mutation($palabra_id: Int!, $mensaje: String!) {
                rejectPendingWord(palabra_id: $palabra_id, mensaje: $mensaje)
            }
        `,
    },
};
