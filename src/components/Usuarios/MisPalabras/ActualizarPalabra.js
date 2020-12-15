import React, { useState } from "react";
import styles from "./MainComponent.module.css";
import formStyles from "./ActualizarPalabra.module.css";
import { gql, useQuery } from "@apollo/react-hooks";
import useRoute from "../../../utils/useRoute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

function ActualizarPalabra() {
    const { history, location } = useRoute();
    let palabra = location.state.palabra;
    const example = palabra.example;

    const [values, setValues] = useState({
        texto: palabra.texto || "",
        fonetica: palabra.fonetica || "",
        contexto: palabra.contextos || [],
        ejemplo_esp: example?.ejemplo_esp || "",
        ejemplo_zap: example?.ejemplo_zap || "",
        traducciones: palabra.traducciones || [],
        base_id: palabra.base.id || "",
        base_actual: palabra.base?.base_esp || "",
    });

    const comboOptions = useQuery(GraphqlOp.query.GET_OPTIONS);
    if (comboOptions.loading) return null;

    const onChangeText = (field) => (e) => {
        let value = e.target.value;
        setValues({ ...values, [field]: value });
    };

    const onChangeTraducciones = (index) => (e) => {
        let value = e.target.value;
        let traducciones = values.traducciones;
        traducciones[index] = value;

        setValues({
            ...values,
            traducciones,
        });
    };

    const onChangeCombo = (nameValue, id, actual) => (e) => {
        e.preventDefault();
        setValues({ ...values, [nameValue]: id, base_actual: actual });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(values.base_id);
    };

    const newTranslation = (e) => {
        e.preventDefault();
        setValues({ ...values, traduccion: values.traducciones.push("") });
    };

    const dropTranslation = (index) => (e) => {
        e.preventDefault();
        let traducciones = values.traducciones;
        traducciones.splice(index, 1);
        setValues({ ...values, traducciones });
    };

    const bases = comboOptions.data.allTheBases;
    // const categorias = comboOptions.data.getCategories;
    // const contextos = comboOptions.data.getContextos;
    // const tipos = comboOptions.data.getTypes;

    return (
        <div className={classnames(styles.container, styles.noselect)}>
            <button onClick={history.goBack} className={styles.regresar}>
                regresar
            </button>
            <section className={formStyles.content}>
                <form className={formStyles.form}>
                    <h1 className={formStyles.titleForm}>
                        Actuzalizar {values.texto}
                    </h1>
                    <div className={formStyles.divHorizontal}>
                        <Input
                            labelText="palabra en zapoteco"
                            value={values.texto}
                            onChange={onChangeText("texto")}
                        />
                        <Input
                            labelText="fonetica"
                            value={values.fonetica}
                            onChange={onChangeText("fonetica")}
                        />
                    </div>
                    <div className={formStyles.divHorizontal}>
                        <Input
                            labelText="Ejemplo en español"
                            value={values.ejemplo_esp}
                            onChange={onChangeText("ejemplo_esp")}
                        />
                        <Input
                            labelText="Ejemplo en zapoteco"
                            value={values.ejemplo_zap}
                            onChange={onChangeText("ejemplo_zap")}
                        />
                    </div>
                    <button
                        onClick={newTranslation}
                        className={classnames(
                            formStyles.formButton,
                            formStyles.addTraduccion
                        )}
                    >
                        Agregar traduccion
                    </button>
                    <div className={formStyles.divTraducciones}>
                        {values.traducciones.map((traduccion, index) => {
                            return (
                                <div
                                    key={index}
                                    className={formStyles.divTraduccion}
                                >
                                    {index > 0 && (
                                        <button
                                            onClick={dropTranslation(index)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faWindowClose}
                                            />
                                        </button>
                                    )}
                                    <Input
                                        required
                                        labelText={`traduccion ${index + 1}`}
                                        value={traduccion}
                                        onChange={onChangeTraducciones(index)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <DropDown
                        data={bases}
                        actuactualValue={values.base_actual}
                        itemName="base_id"
                        itemText="base_esp"
                        itemId="id"
                        itemType="base: "
                        placeholder="Selecciona una base"
                        onChange={onChangeCombo}
                    />
                    <button
                        onClick={onSubmitForm}
                        className={classnames(
                            formStyles.formButton,
                            formStyles.confirmar
                        )}
                    >
                        Confirmar
                    </button>
                </form>
            </section>
        </div>
    );
}

const Input = ({ labelText, ...rest }) => {
    return (
        <div className={formStyles.formGroup}>
            <label htmlFor={labelText}>{labelText}</label>
            <input name={labelText} {...rest} />
        </div>
    );
};

const DropDown = ({
    data = [],
    actuactualValue = "",
    placeholder = "",
    itemName = "",
    itemText = "",
    itemId = "",
    itemType = "",
    onChange = () => {},
}) => {
    const [visible, setVisible] = useState(false);

    const changeVisibleState = (e) => {
        e.preventDefault();
        setVisible(!visible);
    };

    return (
        <div>
            <h1>
                {itemType}
                {actuactualValue}
            </h1>
            <button onClick={changeVisibleState}>{placeholder}</button>
            {visible &&
                data.map((item, index) => {
                    return (
                        <div
                            key={item[itemId]}
                            onClick={onChange(
                                itemName,
                                item[itemId],
                                item[itemText]
                            )}
                        >
                            <p>{item[itemText]}</p>
                        </div>
                    );
                })}
        </div>
    );
};

const GraphqlOp = {
    query: {
        GET_OPTIONS: gql`
            {
                getTypes {
                    id
                    tipo
                }
                getContextos {
                    id
                    contexto
                }
                getCategories {
                    id
                    categoria
                }
                allTheBases {
                    id
                    base_esp
                }
            }
        `,
    },
    mutation: {},
};

export default ActualizarPalabra;
