import React, { useState } from "react";
import CheckboxGroup from "../componentes/CheckboxGroup";
import Buscador from "../componentes/Buscador";
import Button from "../componentes/Button";
import styles from "../Roles.module.css";
import classnames from "classnames";
import axios from "axios";

function AsignarRoles() {
    const [correo, setCorreo] = useState("juggantis@gmail.com");
    const [usuario, setUsuario] = useState(null);

    // Axios
    const getUser = async (correo) => {
        const getUser = {
            method: "POST",
            url: process.env.REACT_APP_APOLLO_SERVER_URI,
            data: {
                query: `
                    query {
                        getUser(correo: "${correo}"){
                            id
                            nombre
                            apaterno
                            amaterno
                            correo
                            roles
                        }
                    }
                `,
            },
        };

        try {
            const { data } = await axios.request(getUser);
            setUsuario(data.data.getUser);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => setCorreo(e.target.value);

    const onSubmitBuscar = (correo) => {
        getUser(correo);
        setCorreo("");
    };

    const onSubmitCancelar = () => {
        setUsuario(null);
    };

    return (
        <>
            <Buscador
                onSubmitBuscar={onSubmitBuscar}
                handleChange={handleChange}
                value={correo}
            />
            {usuario && (
                <Usuario
                    key={usuario.id}
                    usuario={usuario}
                    onPressCancelar={onSubmitCancelar}
                />
            )}
        </>
    );
}

export default AsignarRoles;

const Usuario = ({ usuario, ...rest }) => {
    const { onPressCancelar } = rest;

    const verificar = (rolids) => {
        console.log(rolids);
    };

    let nombreCompleto = `${usuario.nombre} ${usuario.apaterno} ${usuario.amaterno}`;

    return (
        <div className={classnames(styles.usuarioItem)}>
            <Button callback={onPressCancelar} label="Cancelar" />
            <h3>{nombreCompleto}</h3>
            <h4 className={classnames(styles.usuarioCorreo)}>
                {usuario.correo}
            </h4>
            <h4 className={classnames(styles.rolesTitle)}>Roles</h4>
            <CheckboxGroup verificar={verificar} roles={usuario.roles} />
        </div>
    );
};
