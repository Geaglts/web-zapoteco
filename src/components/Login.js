// import "./app.css";
import styles from "./Login.module.css";
import {
  NavLink,
} from "react-router-dom";

function Login() {
  return (
    <header>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.textos}>
            <h1>Shitalsha nuutu''</h1>
            <h2>Padiushi</h2>
            <div className={styles.contParrafo}>
              <p>
                Ti nguiiu ni qui gápa ti xcaanda naca ti mani'huiini ne qui gápa
                shiaa <br /> Un hombre sin sueños es como un pájaro sin alas.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <form action="" method="GET">
            <div className={styles.formulario}>
              <div className={styles.contArriba}>
                <h1 className={styles.titulo}>
                  Ingresar <span>Cuenta</span>
                </h1>
                <p>Ingresa tu usuario y contraseña</p>
              </div>
              <div className={styles.contMedio}>
                <div className={styles.campo}>
                  <ion-icon name="person" />
                  <input type="text" name="txtuser" placeholder="Usuario" />
                </div>
                <div className={styles.campo}>
                  <ion-icon name="lock-closed" />
                  <input
                    type="password"
                    name="txtpass"
                    placeholder="Contraseña"
                  />
                </div>
                <a>Olvide mi contraseña</a>
                <button type="submit" name="ingresar">
                  <NavLink className="link" to="/Inicio">
                    Ingresar
                  </NavLink>
                </button>
              </div>
              <div className={styles.contAbajo}>
                <div className={styles.btnEnlaces}>
                  <NavLink className="link" to="/Registro">
                    ¿No tienes una cuenta?
                    <span> Registrate</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Login;
