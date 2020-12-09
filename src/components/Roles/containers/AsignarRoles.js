import React, { useState } from "react";
import CheckboxGroup from "../componentes/CheckboxGroup";
import Buscador from "../componentes/Buscador";
import Button from "../componentes/Button";
import styles from "../Roles.module.css";
import { gql, useMutation } from "@apollo/react-hooks";
import classnames from "classnames";
import axios from "axios";

function AsignarRoles() {
    const [correo, setCorreo] = useState("");
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

    const onSubmitCerrar = () => {
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
                    onPressCerrar={onSubmitCerrar}
                />
            )}
        </>
    );
}

export default AsignarRoles;

const Usuario = ({ usuario, ...rest }) => {
    const [loading, setLoading] = useState(false);
    const { onPressCerrar } = rest;

    const [setRols] = useMutation(GraphqlOp.mutation.SET_ROLS);

    const modificarRoles = async (rolids) => {
        try {
            setLoading(true);
            let variables = { rolids, usuarioid: usuario.id };
            const { data } = await setRols({ variables });
            if (data.setRols?.status) {
                alert("Roles cambiados correctamente");
                onPressCerrar();
            }
        } catch (error) {
            alert("Verifique su informacion");
        } finally {
            setLoading(false);
        }
    };

    let nombreCompleto = `${usuario.nombre} ${usuario.apaterno} ${usuario.amaterno}`;

    if (loading) {
        return null;
    }

    return (
        <div className={classnames(styles.usuarioItem)}>
            <Button callback={onPressCerrar} label="Cerrar" />
            <h3>{nombreCompleto}</h3>
            <h4 className={classnames(styles.usuarioCorreo)}>
                {usuario.correo}
            </h4>
            <h4 className={classnames(styles.rolesTitle)}>Roles</h4>
            <CheckboxGroup verificar={modificarRoles} roles={usuario.roles} />
        </div>
    );
};

const GraphqlOp = {
    query: {},
    mutation: {
        SET_ROLS: gql`
            mutation($rolids: [Int], $usuarioid: Int!) {
                setRols(rolids: $rolids, usuarioid: $usuarioid)
            }
        `,
    },
};
