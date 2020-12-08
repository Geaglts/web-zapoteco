import { useState } from "react";

import styles from "./Inicio.module.css";
import { Redirect } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { deleteAdmin, deleteToken } from "../token";

// Utils
import hasRoles from "../utils/hasRoles";
// Mis modulos
import { Boton } from "../modules";
import { Visitante, Capturador, Experto, Verificador } from "./Usuarios";

function Inicio() {
    // const [variable, funcion] = useState(valor);
    const [goToLogin, setGoToLogin] = useState(false);
    /**
     * Operacines de graphql
     */
    const aboutMe = useQuery(GraphqlOp.Query.ABOUT_ME);

    if (aboutMe.loading) {
        return null;
    }

    let myData = {};
    let roles = [];
    if (aboutMe?.data) {
        aboutMe.refetch();
        myData = aboutMe.data.aboutMe;
        roles = aboutMe.data.aboutMe.roles;
    }

    const userHasRolVerificador = hasRoles(roles, ["verificador"]);
    const userHasRolVisitante = hasRoles(roles, ["visitante"]);
    const userHasRolCapturador = hasRoles(roles, ["capturador"]);
    const userHasRolExperto = hasRoles(roles, ["experto"]);

    const cerrarSesion = () => {
        deleteAdmin();
        deleteToken();
        setGoToLogin(true);
    };

    if (goToLogin) {
        return <Redirect to="/" />;
    }

    if (userHasRolVerificador) {
        return (
            <div className={styles.container}>
                <Boton
                    label="cerrar sesión"
                    onClick={cerrarSesion}
                    styles={styles.boton}
                />
                <Verificador {...{ ...myData, ...roles }} />
            </div>
        );
    } else if (userHasRolExperto) {
        return (
            <div className={styles.container}>
                <Boton
                    label="cerrar sesión"
                    onClick={cerrarSesion}
                    styles={styles.boton}
                />
                <Experto {...{ ...myData, ...roles }} />
            </div>
        );
    } else if (userHasRolCapturador) {
        return (
            <div className={styles.container}>
                <Boton
                    label="cerrar sesión"
                    onClick={cerrarSesion}
                    styles={styles.boton}
                />
                <Capturador {...{ ...myData, ...roles }} />
            </div>
        );
    } else if (userHasRolVisitante) {
        return (
            <div className={styles.container}>
                <Boton
                    label="cerrar sesión"
                    onClick={cerrarSesion}
                    styles={styles.boton}
                />
                <Visitante {...{ ...myData, ...roles }} />
            </div>
        );
    } else {
        return null;
    }
}

export default Inicio;

const GraphqlOp = {
    Query: {
        ABOUT_ME: gql`
            {
                aboutMe {
                    id
                    nombre
                    amaterno
                    apaterno
                    usuario
                    correo
                    ncontrol
                    roles
                }
            }
        `,
    },
};
