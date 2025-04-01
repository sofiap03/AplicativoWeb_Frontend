import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import "../styles/Register.css"; // Archivo de estilos personalizados

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    docIdentidad: "",
    correo: "",
    telefono: "",
    contrasena: "",
    rol: "cliente"
  });
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/registro", formData);
      setMensaje({ type: "success", text: response.data.message });
      setTimeout(() => navigate("/login"), 2000); // Redirigir al login después de 2s
    } catch (error) {
      setMensaje({ type: "danger", text: error.response?.data?.message || "Error en el registro" });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="register-card p-4 shadow-lg">
        <Card.Body>
          <h2 className="text-center mb-4">Registro</h2>
          {mensaje && <Alert variant={mensaje.type}>{mensaje.text}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Documento de Identidad</Form.Label>
              <Form.Control type="number" name="docIdentidad" value={formData.docIdentidad} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="number" name="telefono" value={formData.telefono} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="cliente">Cliente</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">Registrarse</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
