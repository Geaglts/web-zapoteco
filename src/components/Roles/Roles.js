import React from "react";
import Button from "./componentes/Button";
import styles from "./Roles.module.css";
import { useHistory } from "react-router-dom";
import classnames from "classnames";

import AsignarRoles from "./containers/AsignarRoles";

function App() {
    const history = useHistory();

    const onSubmitRegresar = () => {
        history.push("/inicio");
    };

    return (
        <div className={classnames(styles.container, styles.noselect)}>
            <Button
                callback={onSubmitRegresar}
                label="Regresar"
                styleClass={styles.regresarInicioBtn}
            />
            <h1>Asignacion De Roles</h1>
            <AsignarRoles />
        </div>
    );
}

export default App;
