import React, { useState } from "react";
import Buscador from "./Buscador";
import styles from "../MainComponent.module.css";
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
        <div className={styles.contCard}>
            <Buscador
                value={searchTerm}
                onSearch={handleChangeSearchTerm}
                onCancelSearch={cancelSearch}
            />
            <section className={styles.card}>
                {data.filter(filterUserList(searchTerm)).map((item) => {
                    let {
                        nombre,
                        apaterno,
                        amaterno,
                        correo,
                        ncontrol,
                        ...restItem
                    } = item;
                    let apellidos = `${apaterno} ${amaterno}`;

                    return (
                        <div className={styles.infoCard} key={item.id}>
                            <div className={styles.perfil}>
                                <div className={styles.perfilInfo}>
                                    <h3>{nombre}</h3>
                                    <h3>{apellidos}</h3>
                                    <p>{correo}</p>
                                    <p>{ncontrol}</p>
                                </div>
                                {/* <img src={fondo} alt="fondo" /> */}
                            </div>
                            <Estadisticas {...restItem} />
                            {/* <h2>{nombreCompleto}</h2>
                            <p>{correo}</p>
                            <p>{ncontrol}</p>
                            <section>
                                <h2>estadisticas</h2>
                                <Estadisticas {...restItem} />
                            </section> */}
                        </div>
                    );
                })}
            </section>
        </div>
    );
}

export default Lista;
