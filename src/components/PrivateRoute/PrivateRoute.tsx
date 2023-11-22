type PrivateRouteProps = {
    element: React.ReactNode;
}

import { Navigate } from "react-router-dom";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

const PrivateRoute: React.FC<PrivateRouteProps> = ({element}:PrivateRouteProps) => {
  
  const isLoggedIn: boolean = useIsLoggedIn();
  
    return (<>
        {isLoggedIn ? element : <Navigate to='/' /> };
    </>);
}
export default PrivateRoute