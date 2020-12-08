import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import styles from "./Principal.module.css";
import { deleteToken, deleteAdmin } from "../../../token";

// Componentes locales
import Seccion from "./Seccion/Seccion";

export default function Principal() {
    const history = useHistory();
    const myData = useQuery(GraphqlOp.query.GET_MY_DATA);

    if (myData.loading) {
        return null;
    }

    myData.refetch();

    const { nombre, apaterno, amaterno } = myData.data.aboutMe;
    let nombreCompleto = `${nombre} ${apaterno} ${amaterno}`;

    const goTo = (ruta) => () => {
        return history.push(ruta);
    };

    const cerrarCesion = () => {
        deleteToken();
        deleteAdmin();
        history.push("/");
    };

    return (
        <div className={styles.container}>
            <section className={styles.misDatos}>
                <h1>BIENVENIDO</h1>
                <p>{nombreCompleto}</p>
                <button onClick={cerrarCesion}>Cerrar sesion</button>
            </section>
            <section className={styles.menus}>
                <Seccion label="Listas y Modificaciones">
                    <button onClick={goTo("/tipos")}>Tipos</button>
                    <button onClick={goTo("/categorias")}>Categorias</button>
                    <button onClick={goTo("/contextos")}>Contextos</button>
                </Seccion>
            </section>
        </div>
    );
}

const GraphqlOp = {
    query: {
        GET_MY_DATA: gql`
            {
                aboutMe {
                    id
                    nombre
                    apaterno
                    amaterno
                }
            }
        `,
    },
};
