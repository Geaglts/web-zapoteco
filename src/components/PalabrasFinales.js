import styles from "./PalabrasFinales.module.css";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/react-hooks";

function PalabrasFinales() {
    const history = useHistory();
    const wordsQuery = useQuery(GraphqlOp.Query.GET_WORDS);

    if (wordsQuery.loading) {
        return null;
    }

    const goToRegresar = () => {
        history.push("/inicio");
    };

    if (wordsQuery.data?.data) {
        let words = wordsQuery.data?.data;

        return (
            <div>
                <button className={styles.regresar} onClick={goToRegresar}>
                    Regresar
                </button>
                <h1>Diccionario</h1>
								{
									words.map((word) => {
										return (
											<div className={styles.card}>
												
											</div>
										);
									})
								}
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Zapoteco</th>
                            <th>Traducciones</th>
                            <th>Tipo</th>
                            <th>Fonetica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {words.map((word) => {
                            return (
                                <tr>
                                    <td>{word.texto}</td>
                                    <td>
                                        {word.traducciones.map((traduccion) => {
                                            return traduccion;
                                        })}
                                    </td>
                                    <td>{word.tipo}</td>
                                    <td>{word.fonetica}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Diccionario</h1>
            </div>
        );
    }
}

const GraphqlOp = {
    Query: {
        GET_WORDS: gql`
            {
                data: getWords {
                    id
                    texto
                    fonetica
                    tipo
                    traducciones
                    more {
                        examples {
                            _id
                            ejemplo_esp
                            ejemplo_zap
                        }
                        significado
                    }
                }
            }
        `,
    },
};

export default PalabrasFinales;
