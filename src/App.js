import Principal from "./components/Principal";
import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Registro from "./components/Registro";
import PalabrasFinales from "./components/PalabrasFinales";
import CambiarRoles from "./components/Roles/Roles";
import Docente from "./components/Docente/MainComponent";
import AddPendingWord from "./components/FormPalabraPendiente/AddWord";
import VerificarWords from "./components/VerificarPalabra/VerificarWords";
import MisPalabras from "./components/Usuarios/MisPalabras/MainComponent";
import ActualizarPalabra from "./components/Usuarios/MisPalabras/ActualizarPalabra";

import { AdminPrincipal } from "./components/Admin";
import { Categorias, Tipos, Contexto } from "./components/Listas";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserRoute, NoUserRoutes, AdminRoutes } from "./routeCheckers";

const CambiarRolesRoute = {
    path: "/cambar-roles",
    component: CambiarRoles,
};

const NuevaPalabraPendienteRoute = {
    path: "/nueva-palabra-pendiente",
    component: AddPendingWord,
};

const ListasRoute = {
    path: "/listas",
    component: AdminPrincipal,
};

const DocenteRoute = {
    path: "/docente",
    component: Docente,
};

const VerificarPalabraRoute = {
    path: "/verificar-palabra",
    component: VerificarWords,
};

const MisPalabrasRoute = {
    path: "/mis-palabras",
    component: MisPalabras,
};

const ActualizarPalabraRoute = {
    path: "/update-word",
    component: ActualizarPalabra,
};

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <UserRoute path="/inicio" component={Inicio} />
                    <UserRoute
                        exact
                        path="/categorias"
                        component={Categorias}
                    />
                    <UserRoute exact path="/tipos" component={Tipos} />
                    <UserRoute exact path="/contextos" component={Contexto} />
                    <UserRoute exact {...CambiarRolesRoute} />
                    <UserRoute exact {...DocenteRoute} />
                    <UserRoute exact {...VerificarPalabraRoute} />
                    <UserRoute path="/inicio" component={Inicio} />
                    <UserRoute exact {...NuevaPalabraPendienteRoute} />
                    <UserRoute exact {...MisPalabrasRoute} />
                    <UserRoute exact {...ActualizarPalabraRoute} />

                    <NoUserRoutes exact path="/" component={Principal} />
                    <NoUserRoutes exact path="/Login" component={Login} />
                    <NoUserRoutes exact path="/registro" component={Registro} />
                    <Route
                        exact
                        path="/diccionario"
                        component={PalabrasFinales}
                    />

                    <AdminRoutes exact {...ListasRoute} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
