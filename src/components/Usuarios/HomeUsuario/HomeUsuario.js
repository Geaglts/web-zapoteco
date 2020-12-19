import { useState } from "react";
import { Redirect } from "react-router-dom";
import { deleteAdmin, deleteToken } from "../../../token";
import fondo from "../../../assets/img2.jpg";

import styles from "./HomeUsuario.module.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookReader, faBookMedical, faHandshake, faSpellCheck, faClipboardList, faUsers, faFont } from "@fortawesome/free-solid-svg-icons";
import hasRoles from "../../../utils/hasRoles";

export default function HomeUsuario({ ncontrol, ...rest }) {
    const { correo, nombre, apaterno, amaterno, roles, admin } = rest;
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

    const esVisitante = hasRoles(roles, ["visitante"]);

    return (
        <div className={styles.content}>
            <div className={styles.container}>
                <div className={styles.sesion}>
                    <div className={styles.sesionData}>
                        <h1>{roles[0]}</h1>
                        {ncontrol && <h2>No. Control: {ncontrol}</h2>}
                    </div>
                    <div className={styles.sesionCerrar}>
                        <button onClick={cerrarSesion}>cerrar sesión</button>
                    </div>
                </div>
                <div className={styles.contProfile}>
                    <div className={styles.profile}>
                        <div className={styles.profileUser}>
                            <h1>
                                {nombre} {apaterno} {amaterno}
                            </h1>
                            <h2>{correo}</h2>
                        </div>
                        <div className={styles.profileData}>
                            {!esVisitante && (
                                <div className={styles.contData}>
                                    <h1>palabra</h1>
                                    <h1>imagen</h1>
                                    <h1>audio</h1>
                                    <h2>25</h2>
                                    <h2>10</h2>
                                    <h2>0</h2>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.contImg}>
                        <img src={fondo} alt="fondo" />
                    </div>
                </div>
                <div className={styles.contButtons}>
                    <div className={styles.buttons}>
                        <button onClick={goToDiccionario}>
                            <span>
                                <FontAwesomeIcon icon={faBook} />
                            </span>
                            <h1>Diccionario de palabras</h1>
                        </button>
                        <ShowMenu roles={roles} admin={admin} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const ShowMenu = ({ roles = [], admin }) => {
    const history = useHistory();

    const esCapturador = hasRoles(roles, ["capturador"]) || admin;
    const esVisitante = hasRoles(roles, ["visitante"]) || admin;
    const esExperto = hasRoles(roles, ["experto"]) || admin;
    const esVerificador = hasRoles(roles, ["verificador"]) || admin;
    const esCoordinador = hasRoles(roles, ["coordinador"]) || admin;
    const esDocente = hasRoles(roles, ["docente"]) || admin;

    const redirect = (page) => () => {
        switch (page) {
            case 1:
                history.push("/nueva-palabra-pendiente");
                return;
            case 2:
                history.push("/inicio");
                return;
            case 3:
                history.push("/inicio");
                return;
            case 4:
                history.push("/verificar-palabra");
                return;
            case 5:
                history.push("/cambar-roles");
                return;
            case 6:
                history.push("/listas");
                return;
            case 7:
                history.push("/docente");
                return;
            case 8:
                history.push("/mis-palabras");
                return;
            default:
                return;
        }
    };

    const Boton = ({ label, callback, condition, icon }) => {
        return condition ? (
            <button onClick={callback}>
                <span>{icon}</span>
                <h1>{label}</h1>
            </button>
        ) : null;
    };

    return (
        <>
            <Boton
                label="Nueva Palabra"
                callback={redirect(1)}
                condition={esCapturador}
                icon={<FontAwesomeIcon icon={faBookMedical} />}
            />
            <Boton
                label="mis palabras"
                callback={redirect(8)}
                condition={esCapturador}
                icon={<FontAwesomeIcon icon={faFont} />}
            />
            <Boton
                label="participar"
                callback={redirect(2)}
                condition={esVisitante}
                icon={<FontAwesomeIcon icon={faHandshake} />}
            />
            <Boton
                label="revisar palabras"
                callback={redirect(3)}
                condition={esExperto}
                icon={<FontAwesomeIcon icon={faBookReader} />}
            />
            <Boton
                label="verificar palabras"
                callback={redirect(4)}
                condition={esVerificador}
                icon={<FontAwesomeIcon icon={faSpellCheck} />}
            />
            <Boton
                label="modificar roles"
                callback={redirect(5)}
                condition={esCoordinador}
                icon={<FontAwesomeIcon icon={faBook} />}
            />
            <Boton
                label="listas"
                callback={redirect(6)}
                condition={admin}
                icon={<FontAwesomeIcon icon={faClipboardList} />}
            />
            <Boton
                label="Participantes"
                callback={redirect(7)}
                condition={esDocente}
                icon={<FontAwesomeIcon icon={faUsers} />}
            />
        </>
    );
};
