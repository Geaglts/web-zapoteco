import { useState } from "react";
import styles from "./Registro.module.css";
import { NavLink, Redirect } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

function Registro() {
    const [goToLogin, setGoToLogin] = useState(false);
    const [variables, setVariables] = useState({
        nombre: "",
        amaterno: "",
        apaterno: "",
        usuario: "",
        correo: "",
        contrasena: "",
        ncontrol: "",
    });

    /**
     * Operaciones de graphql
     */

    const [registerMutation] = useMutation(GraphqlOperations.Mutation.REGISTER);

    const onChangeInput = (field) => (v) => {
        setVariables({ ...variables, [field]: v.target.value });
    };

    const registrar = async (e) => {
        try {
            e.preventDefault();

            const registerResponse = await registerMutation({ variables });

            if (registerResponse.data.newUser?.correo) {
                setGoToLogin(true);
            } else {
                console.log(registerResponse.data.newUser?.status);
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (goToLogin) {
        return <Redirect to="/" />;
    }

    return (
        <div className={styles.contenedor}>
            <div className={styles.formulario}>
                <div className={styles.contArriba}>
                    <h1 className={styles.titulo}>
                        Crear <span>Cuenta</span>
                    </h1>
                    <p>Registrate y forma parte de esta comunidad</p>
                </div>
                <form>
                    <div className={styles.contMedio}>
                        <div className={styles.campo1}>
                            <input
                                type="text"
                                name="txtNombre"
                                placeholder="Nombre"
                                value={variables.nombre}
                                onChange={onChangeInput("nombre")}
                            />
                        </div>
                        <div className={styles.campo2}>
                            <input
                                type="text"
                                name="txtAPP"
                                placeholder="Apellido Paterno"
                                value={variables.apaterno}
                                onChange={onChangeInput("apaterno")}
                            />
                            <input
                                type="text"
                                name="txtAPM"
                                placeholder="Apellido Materno"
                                value={variables.amaterno}
                                onChange={onChangeInput("amaterno")}
                            />
                        </div>
                        <div className={styles.campo1}>
                            <input
                                type="email"
                                name="txtCorreo"
                                placeholder="Correo"
                                value={variables.correo}
                                onChange={onChangeInput("correo")}
                            />
                        </div>
                        <div className={styles.campo2}>
                            <input
                                type="text"
                                name="txtUsuario"
                                placeholder="Usuario"
                                value={variables.usuario}
                                onChange={onChangeInput("usuario")}
                            />
                            <input
                                type="password"
                                name="txtPass"
                                placeholder="Contraseña"
                                value={variables.contrasena}
                                onChange={onChangeInput("contrasena")}
                            />
                        </div>
                        <div className={styles.campo2}>
                            <input
                                disabled
                                type="tel"
                                name="txtTelefono"
                                placeholder="Num. Telefono"
                            />
                            <input
                                type="text"
                                name="txtNCtrl"
                                placeholder="Num. control"
                                value={variables.ncontrol}
                                onChange={onChangeInput("ncontrol")}
                            />
                        </div>
                        <div className={styles.contBtn}>
                            <button
                                type="submit"
                                name="registrar"
                                onClick={registrar}
                            >
                                Registrar
                            </button>
                        </div>
                    </div>
                </form>
                <div className={styles.btnEnlaces}>
                    <NavLink className="link" to="/">
                        Cancelar
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Registro;

const GraphqlOperations = {
    Mutation: {
        REGISTER: gql`
            mutation(
                $nombre: String!
                $amaterno: String!
                $apaterno: String!
                $usuario: String!
                $correo: String!
                $contrasena: String!
                $ncontrol: String
            ) {
                newUser(
                    input: {
                        nombre: $nombre
                        amaterno: $amaterno
                        apaterno: $apaterno
                        usuario: $usuario
                        correo: $correo
                        contrasena: $contrasena
                        ncontrol: $ncontrol
                    }
                )
            }
        `,
    },
};
