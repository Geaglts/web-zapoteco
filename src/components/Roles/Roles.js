import React from "react";
import Button from "./componentes/Button";
import styles from "./Roles.module.css";
import { useHistory } from "react-router-dom";
import classnames from "classnames";

import AsignarRoles from "./containers/AsignarRoles";

function App() {
    const history = useHistory();

    // const onSubmitRegresar = () => {
    //     history.push("/inicio");
    // };

    const goToRegresar = () => {
        history.push("/inicio");
    };

    return (
        <div className={classnames(styles.container, styles.noselect)}>
            <div className={styles.header}>
                <h1>Asignacion de roles</h1>
                <button className={styles.regresar} onClick={goToRegresar}>
                    Volver
                </button>
            </div>
            <div className={styles.contBuscador}>
                <AsignarRoles />
            </div>
        </div>
    );
}

export default App;
