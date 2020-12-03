// import "./app.css";
import { useState } from "react";
import styles from "./Login.module.css";
import { NavLink, Redirect } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { setAdmin, setToken, getToken } from "../token";

function Login() {
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [values, setValues] = useState({ user: "", contrasena: "" });

    /**
     * Operaciones de graphql
     */

    const [loginMutation] = useMutation(GraphqlOperations.Mutation.LOGIN);

    /**
     * Verificar que el usuario ya este logueado
     * si no lo esta, lo redirige al login.
     */
    if (getToken()) {
        return <Redirect to="/inicio" />;
    }

    const onChangeInput = (field) => (v) => {
        setValues({ ...values, [field]: v.target.value });
    };

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        const loginResponse = await loginMutation({ variables: values });
        const { admin, token } = loginResponse.data.login;

        setLoading(false);

        if (token) {
            setAdmin(admin);
            setToken(token);
            setRedirect(true);
        }
    };

    /**
     * Si algun proceso esta cargando no se muestra nada
     * puede mostrar una vista de carga si se desea.
     */
    if (loading) {
        return null;
    }

    /**
     * Si los datos son correctos lo redirige al inicio.
     */
    if (redirect) {
        return <Redirect to="/Inicio" />;
    }

    return (
        <header>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.textos}>
                        <h1>Shitalsha nuutu''</h1>
                        <h2>Padiushi</h2>
                        <div className={styles.contParrafo}>
                            <p>
                                Ti nguiiu ni qui gápa ti xcaanda naca ti
                                mani'huiini ne qui gápa shiaa <br /> Un hombre
                                sin sueños es como un pájaro sin alas.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <form>
                        <div className={styles.formulario}>
                            <div className={styles.contArriba}>
                                <h1 className={styles.titulo}>
                                    Ingresar <span>Cuenta</span>
                                </h1>
                                <p>Ingresa tu usuario y contraseña</p>
                            </div>
                            <div className={styles.contMedio}>
                                <div className={styles.campo}>
                                    <ion-icon name="person" />
                                    <input
                                        required
                                        type="text"
                                        name="txtuser"
                                        placeholder="Usuario"
                                        value={values.user}
                                        onChange={onChangeInput("user")}
                                    />
                                </div>
                                <div className={styles.campo}>
                                    <ion-icon name="lock-closed" />
                                    <input
                                        required
                                        type="password"
                                        name="txtpass"
                                        placeholder="Contraseña"
                                        value={values.contrasena}
                                        onChange={onChangeInput("contrasena")}
                                    />
                                </div>
                                <a href="/">Olvide mi contraseña</a>
                                <button
                                    type="submit"
                                    name="ingresar"
                                    onClick={login}
                                >
                                    Ingresar
                                </button>
                            </div>
                            <div className={styles.contAbajo}>
                                <div className={styles.btnEnlaces}>
                                    <NavLink className="link" to="/Registro">
                                        ¿No tienes una cuenta?
                                        <span> Registrate</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </header>
    );
}

export default Login;

const GraphqlOperations = {
    Mutation: {
        LOGIN: gql`
            mutation($user: String!, $contrasena: String!) {
                login(user: $user, contrasena: $contrasena)
            }
        `,
    },
};
