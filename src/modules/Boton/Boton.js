export default function Boton({ onClick, label, styles }) {
    return (
        <button className={styles} onClick={onClick}>
            {label}
        </button>
    );
}
