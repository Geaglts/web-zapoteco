import React from "react";
import Button from "./componentes/Button";
import styles from "./Roles.module.css";
import classnames from "classnames";

import AsignarRoles from "./containers/AsignarRoles";

function App() {
    const onSubmitRegresar = () => {
        console.log("regresar");
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
