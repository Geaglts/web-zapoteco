import React, { useState } from "react";
import styles from "./MainComponent.module.css";
import formStyles from "./ActualizarPalabra.module.css";
import { gql, useMutation, useQuery } from "@apollo/react-hooks";
import useRoute from "../../../utils/useRoute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWindowClose,
    faCaretDown,
    faCaretUp,
    faAngleDoubleRight,
    faAngleDoubleLeft,
    faPlus,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

function ActualizarPalabra() {
    const { history, location } = useRoute();
    let palabra = location.state.palabra;
    const example = palabra.example;

    const [primeraParte, setPrimeraParte] = useState(true);
    const [values, setValues] = useState({
        texto: palabra.texto || "",
        fonetica: palabra.fonetica || "",
        ejemplo_esp: example?.ejemplo_esp || "",
        ejemplo_zap: example?.ejemplo_zap || "",
        traducciones: palabra.traducciones || [],
        contexto_id: palabra.contextos[0].id || 0,
        contexto_actual: palabra.contextos[0].contexto || "",
        base_id: palabra.base.id || "",
        base_actual: palabra.base?.base_esp || "",
        tipo: palabra.tipo || "",
        categoria: palabra.categoria || "",
    });

    let updatePendingWordMutation = GraphqlOp.mutation.UPDATE_PENDING_WORD;
    let resendPendingWordMutation = GraphqlOp.mutation.RESEND_PENDING_WORD;
    const [updatePendingWord] = useMutation(updatePendingWordMutation);
    const [resendPendingWord] = useMutation(resendPendingWordMutation);

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

    const onChangeCombo = (nameValue, id, actual, nameActual, setVisible) => (
        e
    ) => {
        e.preventDefault();
        setValues({ ...values, [nameValue]: id, [nameActual]: actual });
        setVisible(false);
    };

    const changePrimeraParte = (e) => {
        e.preventDefault();
        setPrimeraParte(!primeraParte);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            let variables = Object.assign({}, values);
            delete variables.base_actual;
            delete variables.contexto_actual;
            variables = { ...variables, palabraId: palabra.id };

            await updatePendingWord({ variables });
            switch (location.state.tipo) {
                // Pendiente
                case 1:
                    break;
                // Rechazada
                case 3:
                    // Si es una palabra rechazada va a pasar a pendientes => tipo 3
                    await resendPendingWord({
                        variables: {
                            palabra_id: palabra.id,
                        },
                    });
                    break;
                default:
                    break;
            }

            history.goBack();
        } catch (error) {
            console.log(error);
        }
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
    const contextos = comboOptions.data.getContextos;
    const categorias = comboOptions.data.getCategories;
    const tipos = comboOptions.data.getTypes;

    return (
        <div className={formStyles.container}>
            {/* <button onClick={history.goBack} className={styles.regresar}>
                regresar
            </button> */}
            <div className={formStyles.header}>
                <h1>Actualizar palabra</h1>
                <button
                    className={formStyles.regresar}
                    onClick={history.goBack}
                >
                    Volver
                </button>
            </div>
            <section className={formStyles.content}>
                <form className={formStyles.form}>
                    {/* <h1 className={formStyles.titleForm}>
                        Actuzalizar {values.texto}
                    </h1> */}
                    {primeraParte && (
                        <>
                            <div className={formStyles.infoPalabra}>
                                <div className={formStyles.contInfo}>
                                    {/* <input
                                        value={values.texto}
                                        onChange={onChangeText("texto")}
                                    /> */}
                                    <Input
                                        labelText="palabra en zapoteco"
                                        value={values.texto}
                                        onChange={onChangeText("texto")}
                                    />
                                </div>
                                <div className={formStyles.contInfo}>
                                    <Input
                                        labelText="fonetica"
                                        value={values.fonetica}
                                        onChange={onChangeText("fonetica")}
                                    />
                                </div>
                                <div className={formStyles.contInfo}>
                                    <DropDown
                                        data={bases}
                                        actuactualValue={values.base_actual}
                                        itemName="base_id"
                                        itemText="base_esp"
                                        itemId="id"
                                        nameActual="base_actual"
                                        itemType="base actual: "
                                        placeholder="Seleccionar base"
                                        onChange={onChangeCombo}
                                    />
                                </div>
                                {/* <div className={formStyles.contTraducir}>
                                    <div className={formStyles.encabezado}>
                                        <h1>Traducciones</h1>
                                        <button
                                            onClick={newTranslation}
                                            className={classnames(
                                                formStyles.formButton,
                                                formStyles.addTraduccion
                                            )}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <div className={formStyles.divTraducciones}>
                                        {values.traducciones.map(
                                            (traduccion, index) => {
                                                return (
                                                    <div key={index} className={formStyles.divTraduccion}>
                                                        {index > 0 && (
                                                            <button  onClick={dropTranslation(index)}>
                                                                <FontAwesomeIcon icon={faTimes} />
                                                            </button>
                                                        )}
                                                        <Input
                                                            required
                                                            // labelText={`traduccion ${
                                                            //     index + 1
                                                            // }`}
                                                            value={traduccion}
                                                            onChange={onChangeTraducciones(
                                                                index
                                                            )}
                                                        />
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div> */}
                            </div>
                            <div className={formStyles.contEjemplos}>
                                <div className={formStyles.contData}>
                                    <Input
                                        labelText="Ejemplo en español"
                                        value={values.ejemplo_esp}
                                        onChange={onChangeText("ejemplo_esp")}
                                    />
                                </div>
                                <div className={formStyles.contData}>
                                    <Input
                                        labelText="Ejemplo en zapoteco"
                                        value={values.ejemplo_zap}
                                        onChange={onChangeText("ejemplo_zap")}
                                    />
                                </div>
                            </div>
                            <div className={formStyles.contTraducciones}>
                                <div className={formStyles.contTraducir}>
                                    <div className={formStyles.encabezado}>
                                        <h1>Traducciones</h1>
                                        <button
                                            onClick={newTranslation}
                                            className={classnames(
                                                formStyles.formButton,
                                                formStyles.addTraduccion
                                            )}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <div className={formStyles.divTraducciones}>
                                        {values.traducciones.map(
                                            (traduccion, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={
                                                            formStyles.divTraduccion
                                                        }
                                                    >
                                                        {index > 0 && (
                                                            <button
                                                                onClick={dropTranslation(
                                                                    index
                                                                )}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTimes
                                                                    }
                                                                />
                                                            </button>
                                                        )}
                                                        <Input
                                                            required
                                                            // labelText={`traduccion ${
                                                            //     index + 1
                                                            // }`}
                                                            value={traduccion}
                                                            onChange={onChangeTraducciones(
                                                                index
                                                            )}
                                                        />
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* <div className={formStyles.divHorizontal}>
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
                            <div
                                className={classnames(
                                    formStyles.divHorizontal,
                                    formStyles.baseTraduccionContainer
                                )}
                            >
                                <div
                                    className={
                                        formStyles.divTraduccionesContainer
                                    }
                                >
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
                                        {values.traducciones.map(
                                            (traduccion, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={
                                                            formStyles.divTraduccion
                                                        }
                                                    >
                                                        {index > 0 && (
                                                            <button
                                                                onClick={dropTranslation(
                                                                    index
                                                                )}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faWindowClose
                                                                    }
                                                                />
                                                            </button>
                                                        )}
                                                        <Input
                                                            required
                                                            labelText={`traduccion ${
                                                                index + 1
                                                            }`}
                                                            value={traduccion}
                                                            onChange={onChangeTraducciones(
                                                                index
                                                            )}
                                                        />
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                                <DropDown
                                    data={bases}
                                    actuactualValue={values.base_actual}
                                    itemName="base_id"
                                    itemText="base_esp"
                                    itemId="id"
                                    nameActual="base_actual"
                                    itemType="base actual: "
                                    placeholder="Selecciona una base"
                                    onChange={onChangeCombo}
                                />
                            </div> */}
                        </>
                    )}
                    {!primeraParte && (
                        <>
                            <div className={formStyles.segundaParteForm}>
                                <section className={formStyles.section1}>
                                    <DropDown
                                        data={contextos}
                                        actuactualValue={values.contexto_actual}
                                        itemName="contexto_id"
                                        itemText="contexto"
                                        itemId="id"
                                        nameActual="contexto_actual"
                                        itemType="Contexto actual: "
                                        placeholder="Selecciona un contexto"
                                        onChange={onChangeCombo}
                                    />
                                </section>
                                <section className={formStyles.section1}>
                                    <DropDown
                                        data={tipos}
                                        actuactualValue={values.tipo}
                                        itemName="tipo"
                                        itemText="tipo"
                                        itemId="id"
                                        nameActual="tipo"
                                        itemType="Tipo actual: "
                                        placeholder="Selecciona el tipo"
                                        onChange={onChangeCombo}
                                    />
                                </section>
                                <section className={formStyles.section1}>
                                    <DropDown
                                        data={categorias}
                                        actuactualValue={values.categoria}
                                        itemName="categoria"
                                        itemText="categoria"
                                        itemId="id"
                                        nameActual="categoria"
                                        itemType="Categoria actual: "
                                        placeholder="Selecciona la categoria"
                                        onChange={onChangeCombo}
                                    />
                                </section>
                            </div>
                        </>
                    )}
                    <div className={formStyles.contBtn}>
                        <button
                            onClick={changePrimeraParte}
                            className={classnames(formStyles.segundaParte)}
                        >
                            {primeraParte ? (
                                <>
                                    Mas informacion
                                    {/* <FontAwesomeIcon
                                        icon={faAngleDoubleRight}
                                    /> */}
                                    {/* <p className={formStyles.text}>
                                        Mas informacion
                                    </p>
                                    <p className={formStyles.icon}>
                                        <FontAwesomeIcon
                                            icon={faAngleDoubleRight}
                                        />
                                    </p> */}
                                </>
                            ) : (
                                <>
                                    Regresar
                                    {/* <p className={formStyles.iconBack}>
                                        <FontAwesomeIcon
                                            icon={faAngleDoubleLeft}
                                        />
                                    </p>
                                    <p className={formStyles.text}>Regresar</p> */}
                                </>
                            )}
                        </button>
                        <button
                            onClick={onSubmitForm}
                            className={classnames(formStyles.confirmar)}
                        >
                            Confirmar
                        </button>
                    </div>
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
    nameActual = "",
    onChange = () => {},
}) => {
    const [visible, setVisible] = useState(false);

    const changeVisibleState = (e) => {
        e.preventDefault();
        setVisible(!visible);
    };

    return (
        <div className={formStyles.dropDownMenu}>
            <div className={formStyles.dropDownHeader}>
                <h1 className={formStyles.dropDownTitle}>
                    {itemType}
                    {actuactualValue}
                </h1>
                <button
                    className={formStyles.dropDownButton}
                    onClick={changeVisibleState}
                >
                    {placeholder}
                    <span>
                        <FontAwesomeIcon
                            icon={visible ? faCaretUp : faCaretDown}
                        />
                    </span>
                </button>
            </div>
            <div className={formStyles.dropDownOptions}>
                {visible &&
                    data.map((item, index) => {
                        return (
                            <div
                                className={formStyles.items}
                                key={item[itemId]}
                                onClick={onChange(
                                    itemName,
                                    item[itemId],
                                    item[itemText],
                                    nameActual,
                                    setVisible
                                )}
                            >
                                <p className={formStyles.dropDownItemText}>
                                    {item[itemText]}
                                </p>
                            </div>
                        );
                    })}
            </div>
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
    mutation: {
        UPDATE_PENDING_WORD: gql`
            mutation(
                $palabraId: Int!
                $texto: String!
                $fonetica: String!
                $traducciones: [String!]
                $base_id: String!
                $contexto_id: Int!
                $tipo: String!
                $categoria: String!
                $ejemplo_esp: String!
                $ejemplo_zap: String!
            ) {
                updatePendingWord(
                    input: {
                        palabraId: $palabraId
                        texto: $texto
                        fonetica: $fonetica
                        traducciones: $traducciones
                        base_id: $base_id
                        contexto_id: $contexto_id
                        tipo: $tipo
                        categoria: $categoria
                        ejemplo_esp: $ejemplo_esp
                        ejemplo_zap: $ejemplo_zap
                    }
                )
            }
        `,
        RESEND_PENDING_WORD: gql`
            mutation($palabra_id: Int!) {
                resendPendingWord(palabra_id: $palabra_id)
            }
        `,
    },
};

export default ActualizarPalabra;
