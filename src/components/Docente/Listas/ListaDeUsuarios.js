import React, { useState } from "react";
import Lista from "../Components/Lista";
import styles from "../MainComponent.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

function ListaDeUsuarios({ label = "", data = [] }) {
    const [showList, setShowList] = useState(false);

    const changeStatusShowList = () => {
        setShowList(!showList);
    };

    return (
        <div className={styles.contLista}>
            <div className={styles.headerLista}>
                <h1>{label}</h1>
                <button onClick={changeStatusShowList}>
                    {/* {!showList ? <FontAwesomeIcon icon={faCaretDown} /> : "Ocultar"} */}
                    <FontAwesomeIcon
                        icon={!showList ? faCaretDown : faCaretUp}
                    />
                </button>
            </div>
            {showList && <Lista data={data} />}
        </div>
    );
}

export default ListaDeUsuarios;
