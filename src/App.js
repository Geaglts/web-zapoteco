import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Registro from "./components/Registro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserRoute } from "./routeCheckers";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <UserRoute path="/Inicio" component={Inicio} />
                    <Route path="/Registro">
                        <Registro />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
