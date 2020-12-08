import { Route, useHistory } from "react-router-dom";
import { getToken, getAdmin } from "../token";

const AdminRoute = ({ component: Component, ...rest }) => {
    const history = useHistory();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (getToken() && getAdmin()) {
                    return <Component {...rest} {...props} />;
                } else {
                    return history.push("/");
                }
            }}
        />
    );
};

export default AdminRoute;
