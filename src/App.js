import "./app.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
} from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <ul className="list">
                    <li>
                        <NavLink className="link" to="/">
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="link" to="/about">
                            Acerca de
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="link" to="/dashboard">
                            Dashboard
                        </NavLink>
                    </li>
                </ul>
                <hr />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
}

export default App;
