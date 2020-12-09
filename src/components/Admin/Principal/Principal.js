import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import styles from "./Principal.module.css";

// Componentes locales
import Seccion from "./Seccion/Seccion";

export default function Principal() {
    const history = useHistory();

    const goTo = (ruta) => () => {
        return history.push(ruta);
    };

    return (
        <div className={styles.container}>
            <button
                onClick={goTo("/inicio")}
                className={styles.buttonCerrarSesion}
            >
                Regresar
            </button>
            <Seccion label="Listas y Modificaciones">
                <button onClick={goTo("/tipos")}>Tipos</button>
                <button onClick={goTo("/categorias")}>Categorias</button>
                <button onClick={goTo("/contextos")}>Contextos</button>
            </Seccion>
        </div>
    );
}
