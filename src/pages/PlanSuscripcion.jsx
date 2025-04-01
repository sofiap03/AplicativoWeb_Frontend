import { useNavigate } from "react-router-dom";
import "../styles/PlanSuscripcion.css";

const PlanSuscripcion = () => {
  const navigate = useNavigate();

  const seleccionarPlan = (plan) => {
    localStorage.setItem("planSeleccionado", plan); // Guardar el plan en localStorage
    navigate("/dashboard"); // Redirigir al Dashboard
  };

  return (
    <div className="plan-container">
      <h2>Plan de Suscripción</h2>
      <div className="plan-options">
        <div className="plan-card" onClick={() => seleccionarPlan("Estándar")}>
          <h3>Plan Estándar</h3>
          <p>Acceso a todas las funcionalidades de sus equipos médicos</p>
          <p><strong>$10/año</strong></p>
          <button>Pagar</button>
        </div>
      </div>
    </div>
  );
};

export default PlanSuscripcion;
