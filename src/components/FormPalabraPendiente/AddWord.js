import React, { useState, Children, cloneElement } from "react";
import Combo from "./Combo";

import { useHistory } from "react-router-dom";
import styles from "./AddWord.module.css";
import categorias from "./data/categoria";
import tipos from "./data/tipos";
import contexto from "./data/contexto";
import base from "./data/base";

const initialState = {
    texto: "",
    fonetica: "",
    traduccion: "",
    base_id: base[0].id,
    idcontexto: contexto[0].id,
    idtipo: tipos[0].id,
    categoria_id: categorias[0].id,
    ejemplo_esp: "",
    ejemplo_zap: "",
};

export default function MainComponent() {
    return (
        <section className={styles.addPalabra}>
            <div className={styles.container}>
                <PendingWord>
                    <PrimeraParte />
                    <SegundaParte />
                </PendingWord>
                <div className={styles.contText}>
                    <div className={styles.text}>
                        <h1>Juggantiss</h1>
                        <h2>Gracias</h2>
                        <p>¡Tu aporte tiene mucho valor!</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

const PendingWord = ({ children }) => {
    const visible = useState(false);
    const visibleVentana = useState(false);
    const values = useState(initialState);

    const onChangeInput = (field) => (v) => {
        values[1]({ ...values[0], [field]: v.target.value });
    };

    const onSubmit = () => {
        let variables = { ...values[0], base_id: values[0].base_id.toString() };
        visibleVentana[1](!visibleVentana[0]);
        console.log(variables);
    };

    const childrenWithProps = Children.map(children, (child, i) => {
        return cloneElement(child, {
            visible,
            visibleVentana,
            values,
            onChangeInput,
            onSubmit,
        });
    });

    return <div className={styles.contForm}>{childrenWithProps}</div>;
};

const PrimeraParte = ({ values, onChangeInput, visible }) => {
    let fields = values[0];
    let setVisible = () => {
        visible[1](!visible[0]);
    };

    if (visible[0]) return null;

    return (
        <div className={styles.form}>
            <input
                required
                type="text"
                placeholder="Palabra"
                value={fields.texto}
                onChange={onChangeInput("texto")}
            />
            <input
                required
                type="text"
                placeholder="Palabra Zapoteco"
                value={fields.traduccion}
                onChange={onChangeInput("traduccion")}
            />
            <input
                required
                type="text"
                placeholder="Pronunciacion Fonetica"
                value={fields.fonetica}
                onChange={onChangeInput("fonetica")}
            />
            <Combo
                data={categorias}
                text="Categoria"
                name="categoria_id"
                name_value="categoria"
                values={values}
            />
            <Combo
                data={tipos}
                text="Tipos"
                name="idtipo"
                values={values}
                name_value="tipo"
            />
            <button onClick={setVisible}>Siguiente</button>
        </div>
    );
};

const VentanaFinal = ({ visibleVentana }) => {
    let setVisibleVentana = () => visibleVentana[1](!visibleVentana[0]);

    if (visibleVentana[0]) {
        return (
            <section>
                <h1>Se ha agregado tu palabra</h1>
                <button onClick={setVisibleVentana}>Aceptar</button>
                {/* <button>Agregar Imagen</button>
        <button>Agregar Audio</button> */}
            </section>
        );
    }
};

const SegundaParte = (props) => {
    const { values, onChangeInput, visible, visibleVentana, onSubmit } = props;

    let fields = values[0];
    let setVisible = () => visible[1](!visible[0]);

    if (!visible[0]) return null;

    return (
        <div className={styles.form}>
            <input
                required
                type="text"
                placeholder="Ejemplo"
                value={fields.ejemplo_esp}
                onChange={onChangeInput("ejemplo_esp")}
            />
            <input
                required
                type="text"
                placeholder="Ejemplo Zapoteco"
                value={fields.ejemplo_zap}
                onChange={onChangeInput("ejemplo_zap")}
            />
            <Combo
                data={base}
                text="Palabra Base"
                name="base_id"
                values={values}
                name_value="base"
            />
            <Combo
                data={contexto}
                text="Contexto"
                name="idcontexto"
                values={values}
                name_value="contexto"
            />
            <div className={styles.contBtn}>
                <button onClick={onSubmit}>Registrar</button>
                <button onClick={setVisible}>Volver</button>
            </div>
            {visibleVentana[0] && (
                <VentanaFinal visibleVentana={visibleVentana} />
            )}
        </div>
    );
};
