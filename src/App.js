import Login from "./components/Login";
import Inicio from "./components/Inicio";
import Registro from "./components/Registro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/Inicio">
            <Inicio />
          </Route>
          <Route path="/Registro">
            <Registro />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
