import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Contacto from "../pages/Contacto";
import Historial from "../pages/Historial";
import Producto from "../pages/Producto";
import { AboutUs } from "../pages/AboutUs";
import ABMProducto from "../pages/ABMProducto";
import ABMIngrediente from "../pages/ABMIngrediente";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import MPedidos from "../pages/MPedidos";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/producto" element={<Producto />} />
      <Route path="/historial" element={<Historial />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/abmproductos" element={<PrivateRoute element={<ABMProducto/>}/>}/>
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/abmingredientes" element={<ABMIngrediente/>}/>
      <Route path="/abmpedidos" element={<PrivateRoute element={<MPedidos/>}/>}/>
    </Routes>
  );
};

export default AppRoutes;
