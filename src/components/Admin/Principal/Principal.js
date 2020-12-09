import { useHistory } from "react-router-dom";
import styles from "./Principal.module.css";

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
            <section className={styles.lista}>
                <button onClick={goTo("/tipos")}>Tipos</button>
                <button onClick={goTo("/categorias")}>Categorias</button>
                <button onClick={goTo("/contextos")}>Contextos</button>
            </section>
        </div>
    );
}
