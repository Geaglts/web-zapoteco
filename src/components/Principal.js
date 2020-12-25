import styles from "./Principal.module.css";
import { useHistory } from "react-router-dom";
import { useState, Children, cloneElement } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { Link } from "react-scroll";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faMapMarkedAlt,
    faPhone,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { gql, useQuery, useMutation } from "@apollo/react-hooks";
import Combo from "./FormPalabraPendiente/Combo";
import facebook from "../assets/Facebook.png";
import twitter from "../assets/Twitter.png";
import instagram from "../assets/Instagram.png";

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

function Principal() {
    const history = useHistory();
    const goToDiccionario = () => {
        history.push("/diccionario");
    };
    const goToLogin = () => {
        history.push("/Login");
    };

    const [navbar, setNavbar] = useState(false);
    const [animar, setAnimar] = useState(false);

    const cambiaStyles = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    window.addEventListener("scroll", cambiaStyles);

    const MyData = useQuery(GraphqlOp.query.GET_USER);

    if (MyData.loading) return null;

    return (
        <div className={styles.contSecciones}>
            <div
                className={
                    navbar
                        ? classnames(styles.header, styles.headerBG)
                        : styles.header
                }
            >
                <div className={styles.contMenu}>
                    <Link
                        activeClass="active"
                        to="idInicio"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={700}
                    >
                        Inicio
                    </Link>
                    <Link
                        activeClass="active"
                        to="idBuscador"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={700}
                    >
                        Diccionario
                    </Link>
                    <Link
                        activeClass="active"
                        to="idContribuir"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={700}
                    >
                        Contribuir
                    </Link>
                    <Link
                        activeClass="active"
                        to="idServicios"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={700}
                    >
                        Trabajos
                    </Link>
                    <Link
                        activeClass="active"
                        to="idContacto"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={700}
                    >
                        Contacto
                    </Link>
                </div>
                <div className={styles.contBtn}>
                    <button onClick={goToLogin}>Iniciar sesión</button>
                </div>
            </div>
            <section id={"idInicio"} className={styles.setInicio}>
                <div className={styles.content}>
                    <h1>zapoteco</h1>
                    <p>
                        Ti nguiiu ni qui gápa ti xcaanda naca ti mani'huiini ne
                        qui gápa shiaa <br /> Un hombre sin sueños es como un
                        pájaro sin alas.
                    </p>
                </div>
            </section>
            <section id={"idBuscador"} className={styles.setBuscador}>
                <div
                    className={
                        animar
                            ? classnames(
                                  styles.contBuscador,
                                  styles.cambiarContBuscador
                              )
                            : styles.contBuscador
                    }
                >
                    <h1 className={styles.titulo}>
                        Consultar <span>Dicionario</span>{" "}
                    </h1>
                    <p className={styles.descripcion}>
                        Si su busqueda no es exitosa contribuya con nosotros
                        para mejorar
                    </p>
                    <form
                        className={
                            animar
                                ? classnames(styles.form, styles.moverForm)
                                : classnames(styles.form, styles.reiniciarForm)
                        }
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Buscar palabra"
                            className={
                                animar
                                    ? classnames(
                                          styles.txtPalabra,
                                          styles.cambiarTxtPalabra
                                      )
                                    : styles.txtPalabra
                            }
                        />
                        <button
                            onClick={() => setAnimar(!animar)}
                            className={
                                animar
                                    ? classnames(
                                          styles.btnBuscar,
                                          styles.cambiarBtn
                                      )
                                    : styles.btnBuscar
                            }
                        >
                            {animar ? "x" : <FontAwesomeIcon icon={faSearch} />}
                        </button>
                    </form>
                    <div
                        className={
                            animar ? styles.verContInfo : styles.contInfo
                        }
                    >
                        <h2>Sustantivo</h2>
                        <h1>Palabra</h1>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                        </p>
                        <h3>
                            REAL ACADEMIA ESPAÑOLA: <br /> Diccionario de la
                            lengua española, 23.ª ed., [versión 23.4 en línea].{" "}
                        </h3>
                    </div>
                </div>
            </section>
            <section id={"idContribuir"} className={styles.setContribuir}>
                <div className={styles.container}>
                    <PendingWord>
                        <PrimeraParte />
                        <SegundaParte />
                    </PendingWord>
                    <div className={styles.contText}>
                        <div className={styles.text}>
                            <h2>Gracias</h2>
                            <p>¡Tu aporte tiene mucho valor!</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id={"idContacto"} className={styles.setContacto}>
                <div className={styles.contenedor}>
                    {/* <h1 className={styles.titulo}>
                        Contactanos <span>Aquí</span>{" "}
                    </h1>
                    <p className={styles.descripcion}>
                        Si su busqueda no es exitosa contribuya con nosotros
                        para mejorar
                    </p> */}
                    <div className={styles.cardWrapper}>
                        <div className={styles.card}>
                            <span>
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                            <h1>Llamanos</h1>
                            <h6>971 154 0996</h6>
                        </div>
                        <div className={styles.card}>
                            <span>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <h1>Envia un correo</h1>
                            <h6>support@cinere.com</h6>
                        </div>
                        <div className={styles.card}>
                            <span>
                                <FontAwesomeIcon icon={faMapMarkedAlt} />
                            </span>
                            <h1>Visitanos</h1>
                            <h6>Juchitan de Zaragoza Oaxaca</h6>
                        </div>
                    </div>
                    <form
                        className={styles.formContact}
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <div className={styles.inputWrap}>
                            <input type="text" placeholder="Nombre *" />
                            <input type="text" placeholder="Correo *" />
                            <input
                                className={styles.inputAsunto}
                                type="text"
                                placeholder="Asunto"
                            />
                            <input
                                className={styles.inputMensaje}
                                type="text"
                                placeholder="Escribir mensaje..."
                            />
                        </div>
                        <div className={styles.btnWrapper}>
                            <button>Enviar mensaje</button>
                        </div>
                    </form>
                </div>
            </section>
            <footer>
                <div className={styles.footer}>
                    <div className={styles.footerSocial}>
                        <button><img src={facebook} alt="Facebook" /></button>
                        <button><img src={twitter} alt="Twitter" /></button>
                        <button><img src={instagram} alt="Instagram" /></button>
                    </div>
                    <p>
                        Copyright 2020 &copy; Cinere. Todos los derechos
                        reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Principal;

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
            const res = await addPendingWord({
                variables: {
                    ...values[0],
                    idtipo: parseInt(values[0].idtipo),
                    idcontexto: parseInt(values[0].idcontexto),
                    categoria_id: parseInt(values[0].categoria_id),
                },
            });

            if (res.data.newPendingWord) {
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
            } else {
                alert("Quiza ya exista esa palabra");
            }
        } catch (e) {
            alert("A ocurrido un error");
            // console.log(e);
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
                placeholder="Palabra Zapoteco"
                value={fields.texto}
                onChange={onChangeInput("texto")}
            />
            <input
                required
                type="text"
                placeholder="Palabra Español"
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
            <div className={styles.accion}>
                <div className={styles.contAccion}>
                    <h1>Se ha agregado tu palabra</h1>
                    <button
                        className={styles.btnAceptar}
                        onClick={setVisibleVentana}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
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
