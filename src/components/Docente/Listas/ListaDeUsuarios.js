import React, { useState } from "react";
import Lista from "../Components/Lista";

function ListaDeUsuarios({ label = "", data = [] }) {
    const [showList, setShowList] = useState(false);

    const changeStatusShowList = () => {
        setShowList(!showList);
    };

    return (
        <div>
            <h1>{label}</h1>
            <button onClick={changeStatusShowList}>
                {!showList ? "Mostrar" : "Ocultar"}
            </button>
            {showList && <Lista data={data} />}
        </div>
    );
}

export default ListaDeUsuarios;
