import styles from "./Principal.module.css";
import { useHistory } from "react-router-dom";
import { NavLink, Redirect } from "react-router-dom";

function Principal() {
    const history = useHistory();
    const goToDiccionario = () => {
        history.push("/diccionario");
    };
    const goToLogin = () => {
        history.push("/Login");
    };
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.contMenu}>
                    <NavLink className="link" to="">
                        Inicio
                    </NavLink>
                    <NavLink className="link" to="">
                        Opción1
                    </NavLink>
                    <NavLink className="link" to="">
                        Opción2
                    </NavLink>
                    <NavLink className="link" to="">
                        Opción3
                    </NavLink>
                </div>
                <div className={styles.contBtn}>
                    <button onClick={goToLogin}>Iniciar sesión</button>
                </div>
            </div>
            <section className={styles.setInicio}>
                <h1>zapoteco</h1>
                <p>
                    Ti nguiiu ni qui gápa ti xcaanda naca ti mani'huiini ne qui
                    gápa shiaa <br /> Un hombre sin sueños es como un pájaro sin
                    alas.
                </p>
                <button onClick={goToDiccionario} >diccionario</button>
            </section>
        </div>
    );
}

export default Principal;
