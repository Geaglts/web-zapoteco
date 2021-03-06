import styles from "./AddText.module.css";

function AddText() {
  return (
    <form action="" method="GET">
      <div className={styles.formulario}>
        <div className={styles.contArriba}>
          <h1 className={styles.titulo}>
            Nuevo <span>texto</span>
          </h1>
          <p>Agrega una palabra o un texto</p>
        </div>
        <div className={styles.contMedio}>
          <div className={styles.campo}>
            <h5>Texto en zapoteco</h5>
            <input type="text" name="txtuser" placeholder="Texto en zapoteco" />
          </div>
          <div className={styles.campo}>
            <h5>Texto en español</h5>
            <input type="text" name="txtuser" placeholder="Texto en español" />
          </div>
          <button type="submit" name="ingresar">
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddText;
