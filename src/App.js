import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Registro from "./components/Registro";
import PalabrasFinales from "./components/PalabrasFinales";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserRoute, NoUserRoutes } from "./routeCheckers";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <UserRoute path="/inicio" component={Inicio} />
                    <NoUserRoutes exact path="/" component={Login} />
                    <NoUserRoutes exact path="/registro" component={Registro} />
                    <Route
                        exact
                        path="/diccionario"
                        component={PalabrasFinales}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
