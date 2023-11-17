import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Contacto from "../pages/Contacto";
import Historial from "../pages/Historial";
import { AboutUs } from "../pages/AboutUs";
import ABMProducto from "../pages/ABMProducto";
import ABMIngrediente from "../pages/ABMIngrediente";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/historial" element={<Historial />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/abmproductos" element={<PrivateRoute element={<ABMProducto/>}/>}/>
      <Route path="/abmingredientes" element={<ABMIngrediente/>}/>
    </Routes>
  );
};

export default AppRoutes;
