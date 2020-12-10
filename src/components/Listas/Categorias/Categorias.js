import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import styles from "../Listas.module.css";
import hasRoles from "../../../utils/hasRoles";
import { useState } from "react";

export default function Categorias() {
    const history = useHistory();
    const [updatingCategoria, setUpdatingCategoria] = useState(false);
    const [values, setValues] = useState({ id: "", categoria: "" });

    const myData = useQuery(GraphqlOp.query.GET_ROLES);
    const cateforiasData = useQuery(GraphqlOp.query.GET_CATEGORIA);
    const [addCategoria] = useMutation(GraphqlOp.mutation.ADD_CATEGORIA);
    const [updateCategoria] = useMutation(GraphqlOp.mutation.UPDATE_CATEGORIA);

    if (myData.loading || cateforiasData.loading) {
        return null;
    }

    const goTo = (ruta) => () => {
        return history.push(ruta);
    };

    const handleChange = (field) => (e) => {
        setValues({ ...values, [field]: e.target.value });
    };

    const changeToUpdate = (categoria) => {
        setUpdatingCategoria(true);
        setValues({ categoria: categoria.categoria, id: categoria.id });
    };

    const cancelar = () => {
        setUpdatingCategoria(false);
        setValues({ categoria: "", id: "" });
    };

    const add = async (e) => {
        e.preventDefault();
        if (values.categoria.length > 0) {
            const { data } = await addCategoria({
                variables: { categoria: values.categoria },
            });
            if (data.newCategory.status) {
                categorias.push({
                    id: categorias.length + 1,
                    categoria: values.categoria,
                });
                setValues({ categoria: "" });
            }
        }
    };

    const update = async (e) => {
        e.preventDefault();
        if (values.categoria.length > 0) {
            const { data } = await updateCategoria({
                variables: values,
            });
            if (data.updateCategory?.status) {
                let updateIndex = categorias.findIndex(
                    ({ id }) => id === values.id
                );
                categorias[updateIndex] = values;
                setValues({ categoria: "", id: "" });
                setUpdatingCategoria(false);
            }
        }
    };

    let categorias = cateforiasData.data.getCategories;

    const { roles, admin } = myData.data.aboutMe;
    const usuarioTieneLosRoles = hasRoles(roles, ["capturador"]);

    if (usuarioTieneLosRoles || admin) {
        return (
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1>Nueva categoría</h1>
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
                                    placeholder="Escribir categoría"
                                    value={values.categoria}
                                    onChange={handleChange("categoria")}
                                />
                                <button
                                    onClick={updatingCategoria ? update : add}
                                >
                                    {updatingCategoria
                                        ? "Actualizar"
                                        : "Agregar"}
                                </button>
                            </div>
                        </form>
                        {updatingCategoria && (
                            <div className={styles.contBtn}>
                                <button onClick={cancelar}>cancelar</button>
                            </div>
                        )}
                    </div>
                    <div className={styles.contTipos}>
                        <div className={styles.contCard}>
                            <div className={styles.cards}>
                                {categorias &&
                                    categorias.map((categoria, index) => {
                                        return (
                                            <div className={styles.infoCard}>
                                                <h1>{categoria.categoria}</h1>
                                                <button
                                                    onClick={() =>
                                                        changeToUpdate(
                                                            categoria
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
            //     <h1>Tipos</h1>
            //     <button onClick={goTo(admin ? "/admin" : "/inicio")}>
            //         Regresar
            //     </button>
            //     <section>
            //         <h4>Nueva categoria</h4>
            //         <form>
            //             <input
            //                 required
            //                 placeholder="categoria"
            //                 value={values.categoria}
            //                 onChange={handleChange("categoria")}
            //             />
            //             <button onClick={updatingCategoria ? update : add}>
            //                 {updatingCategoria ? "Actualizar" : "Agregar"}
            //             </button>
            //         </form>
            //         {updatingCategoria && (
            //             <button onClick={cancelar}>cancelar</button>
            //         )}
            //     </section>
            //     <section>
            //         <h4>Lista de categorias</h4>
            //         <table>
            //             <thead>
            //                 <tr>
            //                     <th>ID</th>
            //                     <th>Categoria</th>
            //                     <th>opciones</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 {categorias &&
            //                     categorias.map((categoria, index) => {
            //                         return (
            //                             <tr key={categoria.id}>
            //                                 <td>{index + 1}</td>
            //                                 <td>{categoria.categoria}</td>
            //                                 <td>
            //                                     <button
            //                                         onClick={() =>
            //                                             changeToUpdate(
            //                                                 categoria
            //                                             )
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
        GET_CATEGORIA: gql`
            {
                getCategories {
                    id
                    categoria
                }
            }
        `,
    },
    mutation: {
        ADD_CATEGORIA: gql`
            mutation($categoria: String!) {
                newCategory(categoria: $categoria)
            }
        `,
        UPDATE_CATEGORIA: gql`
            mutation($id: Int!, $categoria: String!) {
                updateCategory(id: $id, categoria: $categoria)
            }
        `,
    },
};
