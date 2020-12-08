import styles from "./Visitante.module.css";
import { useHistory } from "react-router-dom";
import { BotonFlotante } from "../../../modules";

export default function Visitante({ correo, usuario, ncontrol }) {
    const history = useHistory();

    const goToDiccionario = () => {
        history.push("/diccionario");
    };

    return (
        <div className={styles.content}>
            <h1>Visitante</h1>
            <section className={styles.containerMisDatos}>
                <p>{usuario}</p>
                <p>{correo}</p>
                {ncontrol && <p>{ncontrol}</p>}
            </section>
            <section className={styles.botonera}>
                <BotonFlotante
                    label="Diccionario De Palabras"
                    onClick={goToDiccionario}
                />
                <BotonFlotante label="Me Interesa Participar" />
            </section>
        </div>
    );
}
