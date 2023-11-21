type PrivateRouteProps = {
    element: React.ReactNode;
}

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute: React.FC<PrivateRouteProps> = ({element}:PrivateRouteProps) => {

    const {state} = useAuth();
  
    return (<>
        {state.isAuthenticated ? element : <Navigate to='/' /> };
    </>);
}
export default PrivateRoute