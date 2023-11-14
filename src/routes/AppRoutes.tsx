import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Contacto from "../pages/Contacto";
import Historial from "../pages/Historial";
import Producto from "../pages/Producto";
import { AboutUs } from "../pages/AboutUs";
import ABMProducto from "../pages/ABMProducto";
import MetodoPago from "../pages/MetodoPago";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/producto" element={<Producto />} />
      <Route path="/historial" element={<Historial />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/abmproductos" element={<ABMProducto />} />
      <Route path="/metodo_de_pago" element={<MetodoPago />} />
    </Routes>
  );
};

export default AppRoutes;
