import { useSelector } from "react";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
    const userId = useSelector((state) => state.auth.userId);

    useEffect(() => {
        if (!userId) {
            navigate("/login");
        }
    }, [userId]);

    if (!userId) {
        return children;
    }
};

export default PrivateRoute;