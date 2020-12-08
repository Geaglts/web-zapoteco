import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Registro from "./components/Registro";
import PalabrasFinales from "./components/PalabrasFinales";

import { AdminPrincipal } from "./components/Admin";
import { Categorias, Tipos } from "./components/Listas";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserRoute, NoUserRoutes, AdminRoutes } from "./routeCheckers";

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
