import { Navigate, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type AdminEmpleadoRouteProps = {
    element: React.ReactNode;
}

const AdminEmpleadoRoute: React.FC<AdminEmpleadoRouteProps> = ({element}:AdminEmpleadoRouteProps) => {
  
  const {state} = useAuth();
  
    return (
        <>
            {(state.role === "ADMIN" || state.role === "EMPLEADO") ? (<>{element}</>) : (<Navigate to={"/"} replace={true} />)}
        </>
    );
};

export default AdminEmpleadoRoute