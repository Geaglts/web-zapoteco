import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/react-hooks";

export default function MainComponent() {
    return <Tarjeta />;
}

const Tarjeta = () => {
    let queryPendingWords = GraphqlOp.query.GET_PENDING_WORDS;
    let PendingWords = useQuery(queryPendingWords);

    if (PendingWords.loading) return null;
    if (PendingWords.error) return null;

    PendingWords.refetch();

    let pendientes = PendingWords.data.getPendingWords;

    return (
        <section>
            <h1>Verificar Palabra</h1>
            {pendientes.map((pendiente) => (
                <LlenarTarjeta
                    row={pendiente}
                    key={pendiente.id}
                    refetch={PendingWords.refetch}
                />
            ))}
        </section>
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
        <div>
            <section>
                <h3>{row.texto}</h3>
                <p>fonetica: {row.fonetica}</p>
                <p>categoria: {row.categoria}</p>
                <p>tipo: {row.tipo}</p>
                <section>
                    <h5>base</h5>
                    <p>español: {row.base.base_esp}</p>
                    <p>zapoteco: {row.base.base_zap}</p>
                </section>
                <section>
                    <h5>traducciones: </h5>
                    {<LlenarTraducciones row={row.traducciones} />}
                </section>
                <section>
                    <h5>contextos: </h5>
                    {<LlenarContextos row={row.contextos} />}
                </section>
                <section>
                    <h5>ejemplo</h5>
                    <p>español: {row.example.ejemplo_esp}</p>
                    <p>zapoteco: {row.example.ejemplo_zap}</p>
                </section>
                <button onClick={goShowAcceptCard}>aceptar</button>
                <button onClick={goShowRejectCard}>rechazar</button>
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
            </section>
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
        <section>
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
        </section>
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
