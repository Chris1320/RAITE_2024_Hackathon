import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthRoute(props){

    const navigate = useNavigate();

    useEffect(() => {
        if (!props.isAuthenticated){
            navigate("/login")
            return;
        }
    }, []);


    return props.component;

}

export default AuthRoute;