import styles from "./Visitante.module.css";
import { useHistory } from "react-router-dom";

const BotonFlotante = ({ label, ...rest }) => {
    return (
        <div className={styles.flotanteContainer} {...rest}>
            <h3 className={styles.flotanteLabel}>{label}</h3>
        </div>
    );
};

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
