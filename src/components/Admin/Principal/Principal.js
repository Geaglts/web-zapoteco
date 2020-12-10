import { useHistory } from "react-router-dom";
import styles from "./Principal.module.css";

export default function Principal() {
    const history = useHistory();

    const goTo = (ruta) => () => {
        return history.push(ruta);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Listas</h1>
                <button onClick={goTo("/inicio")}>Volver</button>
            </div>
            <section className={styles.lista}>
                <div className={styles.contOpcion}>
                    <div className={styles.contCard}>
                        <div className={styles.contInfo}>
                            <h1>Lista</h1>
                            <h2>Tipo</h2>
                            <button onClick={goTo("/tipos")}>Ver</button>
                        </div>
                    </div>
                </div>
                <div className={styles.contOpcion}>
                    <div className={styles.contCard}>
                        <div className={styles.contInfo}>
                            <h1>Lista</h1>
                            <h2>Categorias</h2>
                            <button onClick={goTo("/categorias")}>Ver</button>
                        </div>
                    </div>
                </div>
                <div className={styles.contOpcion}>
                    <div className={styles.contCard}>
                        <div className={styles.contInfo}>
                            <h1>Lista</h1>
                            <h2>Contextos</h2>
                            <button onClick={goTo("/contextos")}>Ver</button>
                        </div>
                    </div>
                </div>
            </section>
            {/* <button
                onClick={goTo("/inicio")}
                className={styles.buttonCerrarSesion}
            >
                Regresar
            </button>
            <section className={styles.lista}>
                <button onClick={goTo("/tipos")}>Tipos</button>
                <button onClick={goTo("/categorias")}>Categorias</button>
                <button onClick={goTo("/contextos")}>Contextos</button>
            </section> */}
        </div>
    );
}
