import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Registro from "./pages/Register"
import PlanSuscripcion from "./pages/PlanSuscripcion";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/Navbar";
import Inventario from "./pages/Inventario";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/planSuscripcion" element={<PlanSuscripcion />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventario" element={<Inventario />} />
      </Routes>
    </>
  );
}

export default App;
