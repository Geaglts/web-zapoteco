import React from "react";
import styles from "../Roles.module.css";
import classnames from "classnames";

const roles = [
    { id: "1", rol: "capturador" },
    { id: "2", rol: "visitante" },
    { id: "3", rol: "experto" },
    { id: "4", rol: "verificador" },
    { id: "5", rol: "coordinador" },
];

function CheckboxGroup({ verificar, roles: userRoles }) {
    let rolids = [];

    const handleChange = (e) => {
        const { value } = e.target;
        let intValue = parseInt(value);
        let index = rolids.indexOf(intValue);
        if (index > -1) {
            rolids.splice(index, 1);
        } else {
            rolids.push(intValue);
        }
    };

    return (
        <div>
            <table>
                <tbody>
                    {roles.map((rol) => {
                        let userHasRoles = userRoles.indexOf(rol.rol) > -1;
                        if (userHasRoles) {
                            rolids.push(parseInt(rol.id));
                        }
                        return (
                            <tr
                                key={rol.id}
                                className={classnames(styles.checkboxContainer)}
                            >
                                <td>
                                    <label htmlFor="check">{rol.rol}</label>
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        defaultChecked={userHasRoles}
                                        name="check"
                                        value={rol.id}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button
                onClick={() => verificar(rolids)}
                className={classnames(styles.checkboxGroupBtn)}
            >
                Modificar
            </button>
        </div>
    );
}
export default CheckboxGroup;
