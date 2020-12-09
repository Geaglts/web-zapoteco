import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Registro from "./components/Registro";
import PalabrasFinales from "./components/PalabrasFinales";
import CambiarRoles from "./components/Roles/Roles";

import { AdminPrincipal } from "./components/Admin";
import { Categorias, Tipos, Contexto } from "./components/Listas";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserRoute, NoUserRoutes, AdminRoutes } from "./routeCheckers";

const CambiarRolesRoute = {
    path: "/cambar-roles",
    component: CambiarRoles,
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
                    <UserRoute path="/inicio" component={Inicio} />

                    <NoUserRoutes exact path="/" component={Login} />
                    <NoUserRoutes exact path="/registro" component={Registro} />
                    <Route
                        exact
                        path="/diccionario"
                        component={PalabrasFinales}
                    />

                    <AdminRoutes
                        exact
                        component={AdminPrincipal}
                        path="/admin"
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
