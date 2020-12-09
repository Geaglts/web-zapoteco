import React from "react";
import styles from "../Roles.module.css";
import classnames from "classnames";

function Button({ label, callback, styleClass }) {
    return (
        <button
            className={classnames(styles.generalButton, styleClass)}
            onClick={callback}
        >
            {label}
        </button>
    );
}

export default Button;
