import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import styles from "../Listas.module.css";
import hasRoles from "../../../utils/hasRoles";
import { useState } from "react";

export default function Contexto() {
    const history = useHistory();
    const [updatingContexto, setUpdatingContexto] = useState(false);
    const [values, setValues] = useState({ id: "", contexto: "" });

    const myData = useQuery(GraphqlOp.query.GET_ROLES);
    const contextosData = useQuery(GraphqlOp.query.GET_CONTEXTOS);
    const [addContexto] = useMutation(GraphqlOp.mutation.ADD_CONTEXTO);
    const [updateContexto] = useMutation(GraphqlOp.mutation.UPDATE_CONTEXTO);

    if (myData.loading || contextosData.loading) {
        return null;
    }

    const goTo = (ruta) => () => {
        return history.push(ruta);
    };

    const handleChange = (field) => (e) => {
        setValues({ ...values, [field]: e.target.value });
    };

    const cancelar = () => {
        setUpdatingContexto(false);
        setValues({ contexto: "", id: "" });
    };

    const changeToUpdate = (contexto) => {
        setUpdatingContexto(true);
        setValues({ contexto: contexto.contexto, id: contexto.id });
    };

    const add = async (e) => {
        e.preventDefault();
        if (values.contexto.length > 0) {
            const { data } = await addContexto({
                variables: { contexto: values.contexto },
            });
            console.log(data);
            if (data?.newContexto) {
                contextos.push(data?.newContexto);
                setValues({ contexto: "" });
            }
        }
    };

    const update = async (e) => {
        e.preventDefault();
        if (values.contexto.length > 0) {
            const { data } = await updateContexto({
                variables: values,
            });
            if (data?.updateContexto) {
                let updateIndex = contextos.findIndex(
                    ({ id }) => id === values.id
                );
                contextos[updateIndex] = data?.updateContexto;
                setValues({ contexto: "", id: "" });
                setUpdatingContexto(false);
            }
        }
    };

    let contextos = contextosData.data.getContextos;

    const { roles, admin } = myData.data.aboutMe;
    const usuarioTieneLosRoles = hasRoles(roles, ["capturador"]);

    if (usuarioTieneLosRoles || admin) {
        return (
            <div className={styles.content}>
                <div className={styles.header}>
                     <h1>Nuevo contexto</h1>
                    <button onClick={goTo(admin ? "/listas" : "/inicio")}>
                        Volver
                    </button>
                </div>
                <div className={styles.container}>
                    <div className={styles.contForm}>
                        <form>
                            <div className={styles.contInput}>
                                <input
                                    required
                                    placeholder="Escribir tipo"
                                    value={values.contexto}
                                    onChange={handleChange("contexto")}
                                />
                                <button
                                    onClick={updatingContexto ? update : add}
                                >
                                    {updatingContexto
                                        ? "Actualizar"
                                        : "Agregar"}
                                </button>
                            </div>
                        </form>
                        {updatingContexto && (
                            <div className={styles.contBtn}><button onClick={cancelar}>cancelar</button></div>
                        )}
                    </div>
                    <div className={styles.contTipos}>
                        <div className={styles.contCard}>
                            <div className={styles.cards}>
                                {contextos &&
                                    contextos.map((contexto, index) => {
                                        return (
                                            <div className={styles.infoCard}>
                                                <h1>{contexto.contexto}</h1>
                                                <button
                                                    onClick={() =>
                                                        changeToUpdate(
                                                            contexto
                                                        )
                                                    }
                                                >
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
            //     <h1>Contextos</h1>
            //     <button onClick={goTo(admin ? "/admin" : "/inicio")}>
            //         Regresar
            //     </button>
            //     <section>
            //         <h4>Nuevo contexto</h4>
            //         <form>
            //             <input
            //                 required
            //                 placeholder="contexto"
            //                 value={values.contexto}
            //                 onChange={handleChange("contexto")}
            //             />
            //             <button onClick={updatingContexto ? update : add}>
            //                 {updatingContexto ? "Actualizar" : "Agregar"}
            //             </button>
            //         </form>
            //         {updatingContexto && (
            //             <button onClick={cancelar}>cancelar</button>
            //         )}
            //     </section>
            //     <section>
            //         <h4>Lista de contextos</h4>
            //         <table>
            //             <thead>
            //                 <tr>
            //                     <th>ID</th>
            //                     <th>Contexto</th>
            //                     <th>Opciones</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 {contextos &&
            //                     contextos.map((contexto, index) => {
            //                         return (
            //                             <tr key={contexto.id}>
            //                                 <td>{index + 1}</td>
            //                                 <td>{contexto.contexto}</td>
            //                                 <td>
            //                                     <button
            //                                         onClick={() =>
            //                                             changeToUpdate(contexto)
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
        GET_CONTEXTOS: gql`
            {
                getContextos {
                    id
                    contexto
                }
            }
        `,
    },
    mutation: {
        ADD_CONTEXTO: gql`
            mutation($contexto: String!) {
                newContexto(contexto: $contexto) {
                    id
                    contexto
                }
            }
        `,
        UPDATE_CONTEXTO: gql`
            mutation($id: Int!, $contexto: String!) {
                updateContexto(id: $id, contexto: $contexto) {
                    id
                    contexto
                }
            }
        `,
    },
};
