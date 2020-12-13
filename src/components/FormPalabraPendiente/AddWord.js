import React, { useState, Children, cloneElement } from "react";
import { gql, useQuery, useMutation } from "@apollo/react-hooks";
import Combo from "./Combo";

// import { useHistory } from "react-router-dom";
import styles from "./AddWord.module.css";

const initialState = {
    texto: "",
    fonetica: "",
    traduccion: "",
    base_id: "",
    idcontexto: "",
    idtipo: "",
    categoria_id: "",
    ejemplo_esp: "",
    ejemplo_zap: "",
};

export default function MainComponent() {
    const MyData = useQuery(GraphqlOp.query.GET_USER);

    if (MyData.loading) return null;

    return (
        <section className={styles.addPalabra}>
            <div className={styles.container}>
                <PendingWord>
                    <PrimeraParte />
                    <SegundaParte />
                </PendingWord>
                <div className={styles.contText}>
                    <div className={styles.text}>
                        <h1>{MyData.data?.aboutMe?.usuario}</h1>
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

    const ComboData = useQuery(GraphqlOp.query.GET_COMBO_DATA);
    let AddPendingMutation = GraphqlOp.mutation.ADD_NEW_PENDING_WORD;
    const [addPendingWord] = useMutation(AddPendingMutation);

    if (ComboData.loading) return null;

    const onChangeInput = (field) => (v) => {
        values[1]({ ...values[0], [field]: v.target.value });
    };

    const onSubmit = async () => {
        try {
            await addPendingWord({
                variables: {
                    ...values[0],
                    idtipo: parseInt(values[0].idtipo),
                    idcontexto: parseInt(values[0].idcontexto),
                    categoria_id: parseInt(values[0].categoria_id),
                },
            });

            visibleVentana[1](!visibleVentana[0]);
            values[1]({
                texto: "",
                fonetica: "",
                traduccion: "",
                base_id: "",
                idcontexto: "",
                idtipo: "",
                categoria_id: "",
                ejemplo_esp: "",
                ejemplo_zap: "",
            });
        } catch (e) {
            alert("A ocurrido un error");
            console.log(e);
        }
    };

    const childrenWithProps = Children.map(children, (child) => {
        return cloneElement(child, {
            visible,
            visibleVentana,
            values,
            onChangeInput,
            onSubmit,
            comboData: ComboData.data,
        });
    });

    return <div className={styles.contForm}>{childrenWithProps}</div>;
};

const PrimeraParte = ({ values, onChangeInput, visible, comboData }) => {
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
                data={comboData.getCategories}
                name="categoria_id"
                name_value="categoria"
                values={values}
            />
            <Combo
                data={comboData.getTypes}
                name="idtipo"
                values={values}
                name_value="tipo"
            />
            <button onClick={setVisible}>Siguiente</button>
        </div>
    );
};

const SegundaParte = (props) => {
    const {
        values,
        onChangeInput,
        visible,
        visibleVentana,
        onSubmit,
        comboData,
    } = props;

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
                data={comboData.allTheBases}
                name="base_id"
                values={values}
                name_value="base_esp"
            />
            <Combo
                data={comboData.getContextos}
                name="idcontexto"
                values={values}
                name_value="contexto"
            />
            <div className={styles.contBtn}>
                <button onClick={onSubmit}>Registrar</button>
                <button onClick={setVisible}>Volver</button>
            </div>
            {visibleVentana[0] && (
                <VentanaFinal
                    visibleVentana={visibleVentana}
                    visible={visible}
                />
            )}
        </div>
    );
};

const VentanaFinal = ({ visibleVentana, visible }) => {
    let setVisibleVentana = () => {
        visible[1](!visible[0]);
        visibleVentana[1](!visibleVentana[0]);
    };

    if (visibleVentana[0]) {
        return (
            <section>
                <h1>Se ha agregado tu palabra</h1>
                <button onClick={setVisibleVentana}>Aceptar</button>
            </section>
        );
    }
};

const GraphqlOp = {
    query: {
        GET_USER: gql`
            {
                aboutMe {
                    id
                    usuario
                }
            }
        `,
        GET_COMBO_DATA: gql`
            {
                allTheBases {
                    id
                    base_esp
                }
                getTypes {
                    id
                    tipo
                }
                getCategories {
                    id
                    categoria
                }
                getContextos {
                    id
                    contexto
                }
            }
        `,
    },
    mutation: {
        ADD_NEW_PENDING_WORD: gql`
            mutation(
                $base_id: String!
                $categoria_id: Int!
                $ejemplo_esp: String!
                $ejemplo_zap: String!
                $fonetica: String!
                $idcontexto: Int!
                $idtipo: Int!
                $texto: String!
                $traduccion: String!
            ) {
                newPendingWord(
                    input: {
                        texto: $texto
                        fonetica: $fonetica
                        traduccion: $traduccion
                        base_id: $base_id
                        idcontexto: $idcontexto
                        idtipo: $idtipo
                        categoria_id: $categoria_id
                        ejemplo_esp: $ejemplo_esp
                        ejemplo_zap: $ejemplo_zap
                    }
                ) {
                    id
                    texto
                }
            }
        `,
    },
};
