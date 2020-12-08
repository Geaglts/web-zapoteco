import styles from "./Seccion.module.css";

export default function Seccion({ label, children }) {
    return (
        <section className={styles.listas}>
            <h3>{label}</h3>
            {children}
        </section>
    );
}
