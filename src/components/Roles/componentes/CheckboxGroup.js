import React from "react";
import styles from "../Roles.module.css";
import { gql, useQuery } from "@apollo/react-hooks";
import classnames from "classnames";

function CheckboxGroup({ verificar, roles: userRoles }) {
    let rolids = [];
    let roles = null;

    const rolsQuery = useQuery(GraphqlOp.query.GET_ROLES);

    if (rolsQuery.loading) {
        return null;
    }

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

    roles = rolsQuery.data.getRols;

    return (
        <div>
            <table>
                <tbody>
                    {roles &&
                        roles.map((rol) => {
                            let userHasRoles = userRoles.indexOf(rol.rol) > -1;
                            if (userHasRoles) {
                                rolids.push(parseInt(rol.id));
                            }
                            return (
                                <tr
                                    key={rol.id}
                                    className={classnames(
                                        styles.checkboxContainer
                                    )}
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

const GraphqlOp = {
    query: {
        GET_ROLES: gql`
            {
                getRols {
                    id
                    rol
                }
            }
        `,
    },
    mutation: {},
};
