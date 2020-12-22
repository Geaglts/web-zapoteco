import React from "react";
import Button from "./Button";
import styles from "../Roles.module.css";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

export default function Buscador({ handleChange, value, onSubmitBuscar }) {
    return (
        <div className={classnames(styles.buscadorContainer)}>
            <div className={styles.contForm}>
                <form>
                    <div className={styles.contInput}>
                        <input
                            type="text"
                            placeholder="Ingresa el correo del usuario"
                            onChange={handleChange}
                            value={value}
                        />
                        <Button
                            callback={onSubmitBuscar(value)}
                            label={<FontAwesomeIcon icon={faSearch} />}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
