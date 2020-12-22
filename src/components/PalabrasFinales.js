import { useState } from "react";
import styles from "./PalabrasFinales.module.css";
import logo from "../assets/img2.jpg";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/react-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const filterList = (searchTerm) => (item) => {
    let { texto, traducciones } = item;
    const filterWithTexto = texto
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    for (let traduccion of traducciones) {
        const filterWithTraduccion = traduccion
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        if (filterWithTraduccion) {
            return filterWithTraduccion;
        }
    }

    return filterWithTexto;
};

function PalabrasFinales() {
    const history = useHistory();
    const [searchedValue, setSearchedValue] = useState("");
    const wordsQuery = useQuery(GraphqlOp.Query.GET_WORDS);

    if (wordsQuery.loading) {
        return null;
    }

    const onChangeSearched = (e) => {
        const value = e.target.value;
        setSearchedValue(value);
    };

    const goToRegresar = () => {
        history.push("/inicio");
    };

    const filterWord = (e) => {
        e.preventDefault();
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
                                        value={searchedValue}
                                        onChange={onChangeSearched}
                                    />
                                    <button onClick={filterWord}>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles.contCard}>
                        {words
                            .filter(filterList(searchedValue))
                            .map((word, index) => {
                                return (
                                    <div key={index} className={styles.card}>
                                        <div className={styles.contImg}>
                                            <div className={styles.contInfo}>
                                                <div className={styles.info}>
                                                    <h2>
                                                        {word.traducciones[0]}
                                                    </h2>
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
