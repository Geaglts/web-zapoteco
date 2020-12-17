import { useHistory, useLocation } from "react-router-dom";

const useRoute = () => {
    const history = useHistory();
    const location = useLocation();

    return { history, location };
};

export default useRoute;
