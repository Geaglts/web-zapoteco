import styles from "./Registro.module.css";
import { NavLink } from "react-router-dom";

function Registro() {
  return (
    <div className={styles.contenedor}>
      <div className={styles.formulario}>
        <div className={styles.contArriba}>
          <h1 className={styles.titulo}>
            Crear <span>Cuenta</span>
          </h1>
          <p>Registrate para comenzar a disfrutar</p>
        </div>
        <form action="" method="GET">
          <div className={styles.contMedio}>
            <div className={styles.campo1}>
              <input type="text" name="txtNombre" placeholder="Nombre" />
            </div>
            <div className={styles.campo2}>
              <input type="text" name="txtAPP" placeholder="Apellido Paterno" />
              <input type="text" name="txtAPM" placeholder="Apellido Materno" />
            </div>
            <div className={styles.campo1}>
              <input type="email" name="txtCorreo" placeholder="Correo" />
            </div>
            <div className={styles.campo2}>
              <input type="text" name="txtUsuario" placeholder="Usuario" />
              <input type="password" name="txtPass" placeholder="Contraseña" />
            </div>
            <div className={styles.campo2}>
              <input
                type="tel"
                name="txtTelefono"
                placeholder="Num. Telefono"
              />
              <input type="number" name="txtNCtrl" placeholder="Num. control" />
            </div>
            <div className={styles.contBtn}>
              <button type="submit" name="registrar">
                Registrar
              </button>
            </div>
          </div>
        </form>
        <div className={styles.btnEnlaces}>
          <NavLink className="link" to="/">
            Cancelar
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Registro;
