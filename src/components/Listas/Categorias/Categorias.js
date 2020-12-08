import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import hasRoles from "../../../utils/hasRoles";

export default function Categorias() {
    const history = useHistory();

    const myData = useQuery(GraphqlOp.query.GET_ROLES);

    if (myData.loading) {
        return null;
    }

    const usuarioTieneLosRoles = hasRoles([], []);

    if (myData.roles) {
    }

    return <div></div>;
}

const GraphqlOp = {
    query: {
        GET_ROLES: gql`
            {
                aboutMe {
                    id
                    roles
                    admin
                }
            }
        `,
    },
    mutation: {},
};
