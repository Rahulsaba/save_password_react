// ProtectedRoute.js
import React from "react";
import useAuthStore from "@/store";
import { Navigate ,Outlet} from "react-router";


const ProtectedRoute = () => {
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const isAuth = useAuthStore((state) => state.isAuth);
      React.useEffect(() => {
      checkAuth(); // will run on load, using persisted Zustand data
    }, [checkAuth]);
    return(
        <>
                {isAuth 
                    ?
                    <Outlet /> 
                    : 
                    <Navigate to={'/signin'}  />}
        </>
    )

};

export default ProtectedRoute;
