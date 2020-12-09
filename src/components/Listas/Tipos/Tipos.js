import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import styles from "./Tipos.module.css";
import hasRoles from "../../../utils/hasRoles";
import { useState } from "react";

export default function Tipos() {
    const history = useHistory();
    const [updatingTipo, setUpdatingTipo] = useState(false);
    const [values, setValues] = useState({ id: "", tipo: "" });

    const myData = useQuery(GraphqlOp.query.GET_ROLES);
    const tiposData = useQuery(GraphqlOp.query.GET_TIPOS);
    const [addTipo] = useMutation(GraphqlOp.mutation.ADD_TIPO);
    const [updateTipo] = useMutation(GraphqlOp.mutation.UPDATE_TIPO);

    if (myData.loading || tiposData.loading) {
        return null;
    }

    const goTo = (ruta) => () => {
        return history.push(ruta);
    };

    const handleChange = (field) => (e) => {
        setValues({ ...values, [field]: e.target.value });
    };

    const cancelar = () => {
        setUpdatingTipo(false);
        setValues({ tipo: "", id: "" });
    };

    const changeToUpdate = (tipo) => {
        setUpdatingTipo(true);
        setValues({ tipo: tipo.tipo, id: tipo.id });
    };

    const add = async (e) => {
        e.preventDefault();
        if (values.tipo.length > 0) {
            const { data } = await addTipo({
                variables: { tipo: values.tipo },
            });
            if (data.newType.status) {
                tipos.push({ id: tipos.length + 1, tipo: values.tipo });
                setValues({ tipo: "" });
            }
        }
    };

    const update = async (e) => {
        e.preventDefault();
        if (values.tipo.length > 0) {
            const { data } = await updateTipo({
                variables: values,
            });
            if (data.updateType?.status) {
                let updateIndex = tipos.findIndex(({ id }) => id === values.id);
                tipos[updateIndex] = values;
                setValues({ tipo: "", id: "" });
                setUpdatingTipo(false);
            }
        }
    };

    let tipos = tiposData.data.getTypes;

    const { roles, admin } = myData.data.aboutMe;
    const usuarioTieneLosRoles = hasRoles(roles, ["capturador"]);

    if (usuarioTieneLosRoles || admin) {
        return (
            <div className={styles.content}>
                <div className={styles.header}>
                    <button onClick={goTo(admin ? "/admin" : "/inicio")}>
                        Volver al inicio
                    </button>
                </div>
                <div className={styles.container}>
                    <div className={styles.contForm}>
                        <form>
                            <div className={styles.contInput}>
                                <input
                                    required
                                    placeholder="Escribir tipo"
                                    value={values.tipo}
                                    onChange={handleChange("tipo")}
                                />
                                <button onClick={updatingTipo ? update : add}>
                                    {updatingTipo ? "Actualizar" : "Agregar"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className={styles.contTipos}>
                        <div className={styles.contCard}>
                            <div className={styles.cards}>
                                {tipos &&
                                    tipos.map((tipo, index) => {
                                        return (
                                            <div className={styles.infoCard}>
                                                <h1>{tipo.tipo}</h1>
                                                <button onClick={() => changeToUpdate(tipo) }>
                                                    actualizar
                                                </button>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // <div>
            //     <h1>Tipos</h1>
            //     <button onClick={goTo(admin ? "/admin" : "/inicio")}>
            //         Regresar
            //     </button>
            //     <section>
            //         <h4>Nuevo Tipo</h4>
            //         <form>
            //             <input
            //                 required
            //                 placeholder="tipo"
            //                 value={values.tipo}
            //                 onChange={handleChange("tipo")}
            //             />
            //             <button onClick={updatingTipo ? update : add}>
            //                 {updatingTipo ? "Actualizar" : "Agregar"}
            //             </button>
            //         </form>
            //         {updatingTipo && (
            //             <button onClick={cancelar}>cancelar</button>
            //         )}
            //     </section>
            //     <section>
            //         <h4>Lista de tipos</h4>
            //         <table>
            //             <thead>
            //                 <tr>
            //                     <th>ID</th>
            //                     <th>Tipo</th>
            //                     <th>opciones</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 {tipos &&
            //                     tipos.map((tipo, index) => {
            //                         return (
            //                             <tr key={tipo.id}>
            //                                 <td>{index + 1}</td>
            //                                 <td>{tipo.tipo}</td>
            //                                 <td>
            //                                     <button
            //                                         onClick={() =>
            //                                             changeToUpdate(tipo)
            //                                         }
            //                                     >
            //                                         actualizar
            //                                     </button>
            //                                 </td>
            //                             </tr>
            //                         );
            //                     })}
            //             </tbody>
            //         </table>
            //     </section>
            // </div>
        );
    } else {
        return history.push("/inicio");
    }
}

const GraphqlOp = {
    query: {
        GET_ROLES: gql`
            {
                aboutMe {
                    id
                    roles
                    admin
                }
            }
        `,
        GET_TIPOS: gql`
            {
                getTypes {
                    id
                    tipo
                }
            }
        `,
    },
    mutation: {
        ADD_TIPO: gql`
            mutation($tipo: String!) {
                newType(tipo: $tipo)
            }
        `,
        UPDATE_TIPO: gql`
            mutation($id: Int!, $tipo: String!) {
                updateType(id: $id, tipo: $tipo)
            }
        `,
    },
};
