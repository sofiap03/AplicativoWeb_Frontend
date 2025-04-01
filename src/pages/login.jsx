import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ correo: "", contrasena: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejo del envío de formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Obtener respuesta del servidor

      if (!response.ok) throw new Error(data.message || "Credenciales incorrectas");

      // Guardar el token en localStorage (si el backend lo devuelve)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Inicio de sesión exitoso");
      navigate("/dashboard"); // Redirige a la página principal
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Sección izquierda (Formulario de Login) */}
        <div className="login-left">
          <img src="/logo.png" alt="Logo" className="login-logo" />
          <h2 className="login-title">Iniciar Sesión</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="login-input"
              name="correo"
              placeholder="Correo Electrónico"
              onChange={handleChange}
              required
            />
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                className="login-input"
                name="contrasena"
                placeholder="Contraseña"
                onChange={handleChange}
                required
              />
              <span className="toggle-password" onClick={() => setPasswordVisible(!passwordVisible)}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" className="login-button">INICIAR SESIÓN</button>
          </form>
          
          <Link to="/recuperar" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Sección derecha (Registro) */}
        <div className="login-right">
          <h2 className="welcome-title">¡Hola!</h2>
          <p>Si no tienes una cuenta</p>
          <Link to="/registro" className="register-button">
            REGÍSTRATE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
