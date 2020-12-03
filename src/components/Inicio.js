import { useState } from "react";

import styles from "./Inicio.module.css";
import AddText from "./AddText";
import AddImage from "./AddImage";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

function Inicio() {
    // const [variable, funcion] = useState(valor);
    const [op, setOp] = useState(1);
    /**
     * Operacines de graphql
     */
    const aboutMe = useQuery(GraphqlOperations.Query.ABOUT_ME);

    if (aboutMe.loading) {
        return null;
    }

    let myData = {};
    if (aboutMe?.data) {
        myData = aboutMe.data.aboutMe;
    }

    const changeView = (op) => () => {
        setOp(op);
    };

    return (
        <header>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.perfil}>
                        <div className={styles.perfilAvatar}>
                            <img src="https://picsum.photos/200/200" alt="" />
                        </div>
                        <div className={styles.perfilDatos}>
                            <h1 onClick={changeView(4)}>{myData.usuario}</h1>
                            <h2>{myData.correo}</h2>
                            <h2>{myData.ncontrol}</h2>
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <div className={styles.opc} onClick={changeView(1)}>
                            <ion-icon name="text" />
                            <h6>
                                Nuevo <br /> texto
                            </h6>
                        </div>
                        <div className={styles.opc} onClick={changeView(2)}>
                            <ion-icon name="image" />
                            <h6>
                                Nueva <br /> imagen
                            </h6>
                        </div>
                        <div className={styles.opc} onClick={changeView(3)}>
                            <ion-icon name="musical-note" />
                            <h6>
                                Nuevo <br /> audio
                            </h6>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>{menu(op)}</div>
            </div>
        </header>
    );
}

function menu(opc) {
    switch (opc) {
        case 1:
            return <AddText />;
        case 2:
            return <AddImage />;
        case 3:
            return <AddText />;
        case 4:
            return <AddText />;
        default:
            return null;
    }
}

export default Inicio;

const GraphqlOperations = {
    Query: {
        ABOUT_ME: gql`
            {
                aboutMe {
                    id
                    nombre
                    amaterno
                    apaterno
                    usuario
                    correo
                    ncontrol
                }
            }
        `,
    },
};
