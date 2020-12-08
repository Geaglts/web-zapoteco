import styles from "./BotonFlotante.module.css";

const BotonFlotante = ({ label, ...rest }) => {
    return (
        <div className={styles.flotanteContainer} {...rest}>
            <h3 className={styles.flotanteLabel}>{label}</h3>
        </div>
    );
};

export default BotonFlotante;
