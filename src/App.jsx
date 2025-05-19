import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Registro from "./pages/Register";
import PlanSuscripcion from "./pages/PlanSuscripcion";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/Navbar";
import Inventario from "./pages/Inventario";
import Mantenimiento from "./pages/Mantenimiento";
import PerfilUsuario from "./pages/PerfilUsuario";
import ProtectedRoute from './components/ProtectedRoute'; 
import HojadeVida from "./pages/HojaDeVida";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Ruta de inicio redirige a login si no hay sesión */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/planSuscripcion" element={<PlanSuscripcion />} />

        {/* Rutas protegidas */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute element={<Dashboard />} />
          }
        />
        <Route 
          path="/inventario" 
          element={
            <ProtectedRoute element={<Inventario />} />
          }
        />
        <Route 
          path="/mantenimiento" 
          element={
            <ProtectedRoute element={<Mantenimiento />} />
          }
        />
        <Route 
          path="/perfil" 
          element={
            <ProtectedRoute element={<PerfilUsuario />} />
          }
        />
        <Route 
          path="/hojadevida" 
          element={
            <ProtectedRoute element={<HojadeVida />} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
