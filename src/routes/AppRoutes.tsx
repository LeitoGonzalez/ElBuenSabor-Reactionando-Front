import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Contacto from "../pages/Contacto";
import Historial from "../pages/Historial";
import { AboutUs } from "../pages/AboutUs";
import ABMProducto from "../pages/ABMProducto";
import ABMIngrediente from "../pages/ABMIngrediente";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import MPedidos from "../pages/MPedidos";
import AdminEmpleadoRoute from "../components/PrivateRoute/AdminEmpleadoRoute";
import Producto from "../pages/Producto";

const AppRoutes: React.FC = () => {

  return (
    <Routes>
      <Route path="/abmproductos" element={<AdminEmpleadoRoute element={<ABMProducto/>} />} />
      <Route path="/abmingredientes" element={<AdminEmpleadoRoute element={<ABMIngrediente/>} />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/historial" element={<Historial />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/abmproductos" element={<PrivateRoute element={<ABMProducto/>}/>}/>
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/abmingredientes" element={<ABMIngrediente/>}/>
      <Route path="/abmpedidos" element={<PrivateRoute element={<MPedidos/>}/>}/>
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/producto" element={<Producto />} />
    </Routes>
  );
};

export default AppRoutes;
