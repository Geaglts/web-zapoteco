import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Registro from "./components/Registro";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { UserRoute, NoUserRoutes } from "./routeCheckers";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <UserRoute path="/inicio" component={Inicio} />
                    <NoUserRoutes exact path="/" component={Login} />
                    <NoUserRoutes exact path="/registro" component={Registro} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
