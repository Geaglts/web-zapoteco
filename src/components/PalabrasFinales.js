import styles from "./PalabrasFinales.module.css";
import logo from "../assets/img2.jpg";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/react-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

function PalabrasFinales() {
    const history = useHistory();
    const wordsQuery = useQuery(GraphqlOp.Query.GET_WORDS);

    if (wordsQuery.loading) {
        return null;
    }

    const goToRegresar = () => {
        history.push("/inicio");
    };

    wordsQuery.refetch();

    if (wordsQuery.data?.data) {
        let words = wordsQuery.data?.data;

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Diccionario de palabras</h1>
                    <button className={styles.regresar} onClick={goToRegresar}>
                        Volver
                    </button>
                </div>
                <div className={styles.contenedor}>
                    <div className={styles.buscadorContainer}>
                        <div className={styles.contForm}>
                            <form>
                                <div className={styles.contInput}>
                                    <input
                                        type="text"
                                        placeholder="Buscar palabra"
                                    />
                                    <button><FontAwesomeIcon icon={faSearch} /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles.contCard}>
                        {words.map((word, index) => {
                            return (
                                <div key={index} className={styles.card}>
                                    <div className={styles.contImg}>
                                        <div className={styles.contInfo}>
                                            <div className={styles.info}>
                                                <h2>{word.traducciones[0]}</h2>
                                                <h1>{word.texto}</h1>
                                                <button>Ver más</button>
                                            </div>
                                        </div>
                                        <img src={logo} alt="logo" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
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
