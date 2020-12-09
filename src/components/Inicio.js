import styles from "./Inicio.module.css";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { Capturador } from "./Usuarios";

function Inicio() {
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

    return (
        <div className={styles.container}>
            <Capturador {...{ ...myData, ...roles }} />
        </div>
    );
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
                    admin
                }
            }
        `,
    },
};
