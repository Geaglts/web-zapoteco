import React, { useState } from "react";
import Buscador from "./Buscador";
import Estadisticas from "./Estadisticas";

const filterUserList = (searchTerm) => (item) => {
    let { nombre, apaterno, amaterno } = item;
    let nombreCompleto = `${nombre} ${apaterno} ${amaterno}`;
    return nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase());
};

function Lista({ data }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChangeSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    const cancelSearch = () => {
        setSearchTerm("");
    };

    return (
        <div>
            <Buscador
                value={searchTerm}
                onSearch={handleChangeSearchTerm}
                onCancelSearch={cancelSearch}
            />
            <section>
                {data.filter(filterUserList(searchTerm)).map((item) => {
                    let {
                        nombre,
                        apaterno,
                        amaterno,
                        correo,
                        ncontrol,
                        ...restItem
                    } = item;
                    let nombreCompleto = `${nombre} ${apaterno} ${amaterno}`;

                    return (
                        <section key={item.id}>
                            <h2>{nombreCompleto}</h2>
                            <p>{correo}</p>
                            <p>{ncontrol}</p>
                            <section>
                                <h2>estadisticas</h2>
                                <Estadisticas {...restItem} />
                            </section>
                        </section>
                    );
                })}
            </section>
        </div>
    );
}

export default Lista;
