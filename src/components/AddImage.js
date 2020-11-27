import styles from "./AddText.module.css";

function AddText() {
  return (
    <form action="inicio2.html" method="GET">
      <div className={styles.formulario}>
        <div className={styles.contArriba}>
          <h1 className={styles.titulo}>
            Nueva <span>imagen</span>
          </h1>
          <p>Agrega una imagen</p>
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