import styles from "./Experto.module.css";

export default function Visitante({ correo, usuario, ncontrol }) {
    return (
        <div className={styles.content}>
            <h1>Experto</h1>
            <section className={styles.containerMisDatos}>
                <p>{usuario}</p>
                <p>{correo}</p>
                {ncontrol && <p>{ncontrol}</p>}
            </section>
        </div>
    );
}
