import styles from "./Verificador.module.css";
import { useHistory } from "react-router-dom";
import { BotonFlotante } from "../../../modules";
import hasRoles from "../../../utils/hasRoles";

export default function Verificador({ correo, usuario, ncontrol, roles }) {
    const history = useHistory();
    const goToDiccionario = () => {
        history.push("/diccionario");
    };

    const rolCapturador = hasRoles(roles, ["capturador"]);

    return (
        <div className={styles.content}>
            <h1>Verificador</h1>
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
                <BotonFlotante
                    label="Verifiacar Palabra"
                    onClick={goToDiccionario}
                />
                {rolCapturador && (
                    <BotonFlotante
                        label="Agregar Palabra"
                        onClick={goToDiccionario}
                    />
                )}
            </section>
        </div>
    );
}
