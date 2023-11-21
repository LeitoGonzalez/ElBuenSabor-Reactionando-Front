import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type AdminRouteProps = {
    element: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({element}:AdminRouteProps) => {
  
  const {state} = useAuth();
  
    return (<>
        {(state.isAuthenticated && state.role === "ADMIN") ? element : <Navigate to='/' /> };
    </>);
}
export default AdminRoute