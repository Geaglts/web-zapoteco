import React from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/react-hooks";

import ListaDeUsuarios from "./Listas/ListaDeUsuarios";

function MainComponent() {
    const history = useHistory();

    const usuariosResponse = useQuery(GraphqlOp.query.GET_USUARIOS);

    if (usuariosResponse.loading) return null;

    usuariosResponse.refetch();

    let verifiersData = usuariosResponse.data.verifiers;
    let capturers = usuariosResponse.data.capturers;

    const goBack = () => {
        history.goBack();
    };

    return (
        <div>
            <button onClick={goBack}>regrasar</button>
            <h1>Docente</h1>
            <ListaDeUsuarios label="Capturadores" data={capturers} />
            <ListaDeUsuarios label="Verificadores" data={verifiersData} />
        </div>
    );
}

export default MainComponent;

const GraphqlOp = {
    query: {
        GET_USUARIOS: gql`
            {
                capturers {
                    id
                    nombre
                    apaterno
                    amaterno
                    ncontrol
                    correo
                    roles
                    palabrasAgregadas
                    palabrasPendientes
                    palabrasRechazadas
                }
                verifiers {
                    id
                    nombre
                    apaterno
                    amaterno
                    ncontrol
                    correo
                    roles
                    palabrasVerificadas
                }
            }
        `,
    },
    mutation: {},
};
