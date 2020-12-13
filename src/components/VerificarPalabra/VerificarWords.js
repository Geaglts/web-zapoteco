import React, { useState } from "react";
import pendiente from "./data/pendientes";

export default function MainComponent() {
    return <Tarjeta />;
}

const Tarjeta = () => {
    return (
        <section>
            <h1>Verificar Palabra</h1>
            {pendiente.map((row, index) => (
                <LlenarTarjeta row={row} key={index} />
            ))}
        </section>
    );
};

const LlenarTarjeta = ({ row }) => {
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
                    />
                )}
                {visibleRechazar && (
                    <VentanaRechazar
                        usuarioid={row.usuarioid}
                        palabraid={row.id}
                        hideWindow={goShowRejectCard}
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
                <p>{traduccion}</p>
            ))}
        </section>
    );
};

const LlenarContextos = ({ row }) => {
    return (
        <section>
            {row.map((contexto, index) => (
                <p>{contexto.contexto}</p>
            ))}
        </section>
    );
};

const VentanaConfirmar = ({ usuarioid, palabraid, hideWindow }) => {
    const ConfirmarPalabra = () => {
        const data = {
            usuarioid,
            palabraid,
        };
        console.log(data);
        hideWindow();
    };

    return (
        <section>
            <h3>¿Estas seguro que deseas agregar esta palabra?</h3>
            <button onClick={ConfirmarPalabra}>confirmar</button>
            <button onClick={hideWindow}>volver</button>
        </section>
    );
};

const VentanaRechazar = ({ usuarioid, palabraid, hideWindow }) => {
    const [mensaje, setMensaje] = useState("");

    const onChangeInput = (e) => {
        setMensaje(e.target.value);
    };

    const RechazarPalabra = () => {
        const data = {
            usuarioid,
            palabraid,
            mensaje,
        };
        console.log(data);
        setMensaje("");
        hideWindow();
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
