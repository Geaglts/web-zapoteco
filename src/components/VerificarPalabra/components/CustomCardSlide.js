import PropTypes from "prop-types";
import { Slide } from "pure-react-carousel";
import styles from "../VerificarWords.module.css";

import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/react-hooks";
// import { Card } from "semantic-ui-react";

const CustomCardSlide = ({ index, row, refetch, ...cardProps }) => {
    const [visibleConfirmacion, setVisibleConfirmacion] = useState(false);
    const [visibleRechazar, setVisibleRechazar] = useState(false);

    const goShowAcceptCard = () => {
        setVisibleConfirmacion(!visibleConfirmacion);
    };

    const goShowRejectCard = () => {
        setVisibleRechazar(!visibleRechazar);
    };
    return (
        <div className={styles.containerSlide}>
            <Slide className={styles.slide} index={index}>
                <div className={styles.contPalabra}>
                    <div className={styles.contInfo}>
                        <div className={styles.palabra}>
                            <h3>{row.texto}</h3>
                            <p>fonetica: {row.fonetica}</p>
                            <p>categoria: {row.categoria}</p>
                            <p>tipo: {row.tipo}</p>
                        </div>
                        <div className={styles.base}>
                            <h5>base</h5>
                            <p>español: {row.base.base_esp}</p>
                            <p>zapoteco: {row.base.base_zap}</p>
                        </div>
                        <div className={styles.traducciones}>
                            <h5>traducciones: </h5>
                            {<LlenarTraducciones row={row.traducciones} />}
                        </div>
                        <div className={styles.contextos}>
                            <h5>contextos: </h5>
                            {<LlenarContextos row={row.contextos} />}
                        </div>
                        <div className={styles.ejemplo}>
                            <h5>ejemplo</h5>
                            <p>español: {row.example.ejemplo_esp}</p>
                            <p>zapoteco: {row.example.ejemplo_zap}</p>
                        </div>
                        <div className={styles.botones}>
                            <button onClick={goShowAcceptCard}>aceptar</button>
                            <button onClick={goShowRejectCard}>rechazar</button>
                        </div>
                        {/* {visibleConfirmacion && (
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
                        )} */}
                    </div>
                    {/* <Card fluid {...cardProps} /> */}
                </div>
            </Slide>
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
        </div>
    );
};

CustomCardSlide.propTypes = {
    index: PropTypes.number.isRequired,
};

export default CustomCardSlide;

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
        <section>
            <h3>¿Estas seguro que deseas agregar esta palabra?</h3>
            <button onClick={ConfirmarPalabra}>confirmar</button>
            <button onClick={hideWindow}>volver</button>
        </section>
    );
};

const VentanaRechazar = ({ usuarioid, palabraid, hideWindow, refetch }) => {
    const [mensaje, setMensaje] = useState("");

    let rejectMutation = GraphqlOp.mutation.REJECT_PENDING_WORD;
    const [rejectPendingWord] = useMutation(rejectMutation);

    const onChangeInput = (e) => {
        setMensaje(e.target.value);
        console.log(e.target.value);
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
        <div className={styles.contAccion}>
            <h3>Rechazar palabra</h3>
            <input
                required
                value={mensaje}
                onChange={onChangeInput}
                type="text"
                placeholder="mensaje"
            />
            <button onClick={RechazarPalabra}>rechazar</button>
            <button onClick={hideWindow}>volver</button>
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
