import React from "react";
import Button from "./Button";
import styles from "../Roles.module.css";
import classnames from "classnames";

export default function Buscador({ handleChange, value, onSubmitBuscar }) {
    return (
        <div className={classnames(styles.buscadorContainer)}>
            <input
                type="text"
                placeholder="Ingresa el correo del usuario"
                onChange={handleChange}
                value={value}
            />
            <Button callback={() => onSubmitBuscar(value)} label="Buscar" />
        </div>
    );
}
