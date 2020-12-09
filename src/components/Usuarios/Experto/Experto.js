import { useState } from "react";
import { Redirect } from "react-router-dom";
import { deleteAdmin, deleteToken } from "../../../token";
import fondo from "../../../assets/img2.jpg";

import styles from "./Experto.module.css";
import { useHistory } from "react-router-dom";
import { BotonFlotante } from "../../../modules";

export default function Visitante({ correo, ncontrol, nombre, apaterno }) {
    const history = useHistory();

    const goToDiccionario = () => {
        history.push("/diccionario");
    };

    const [goToLogin, setGoToLogin] = useState(false);

    const cerrarSesion = () => {
        deleteAdmin();
        deleteToken();
        setGoToLogin(true);
    };

    if (goToLogin) {
        return <Redirect to="/" />;
    }

    return (
        <div className={styles.content}>
            <div className={styles.container}>
                <div className={styles.sesion}>
                    <div className={styles.sesionData}>
                        <h1>Experto</h1>
                        <h2>No. Control: {ncontrol}</h2>
                    </div>
                    <div className={styles.sesionCerrar}>
                        <button onClick={cerrarSesion}>cerrar sesión</button>
                    </div>
                </div>
                <div className={styles.contProfile}>
                    <div className={styles.profile}>
                        <div className={styles.profileUser}>
                            <h1>
                                {nombre} {apaterno}
                            </h1>
                            <h2>{correo}</h2>
                        </div>
                        <div className={styles.profileData}>
                            <div className={styles.contData}>
                                <h1>palabra</h1>
                                <h1>imagen</h1>
                                <h1>audio</h1>
                                <h2>25</h2>
                                <h2>10</h2>
                                <h2>0</h2>
                            </div>
                        </div>
                    </div>
                    <div className={styles.contImg}>
                        <img src={fondo} />
                    </div>
                </div>
                <div className={styles.contButtons}>
                    <div className={styles.buttons}>
                        <button onClick={goToDiccionario}>Diccionario de palabras</button>
                        <button onClick={goToDiccionario}>Agregar Palabra</button>
                        <button onClick={goToDiccionario}>Verificar Palabra</button>
                    </div>
                </div>
            </div>
        </div>
        // <div className={styles.content}>
        //     <h1>Experto</h1>
        //     <section className={styles.containerMisDatos}>
        //         <p>{usuario}</p>
        //         <p>{correo}</p>
        //         {ncontrol && <p>{ncontrol}</p>}
        //     </section>
        //     <section className={styles.botonera}>
        //         <BotonFlotante
        //             label="Diccionario De Palabras"
        //             onClick={goToDiccionario}
        //         />
        //         <BotonFlotante
        //             label="Agregar Palabra"
        //             onClick={goToDiccionario}
        //         />
        //         <BotonFlotante
        //             label="Verificar Palabra"
        //             onClick={goToDiccionario}
        //         />
        //     </section>
        // </div>
    );
}
