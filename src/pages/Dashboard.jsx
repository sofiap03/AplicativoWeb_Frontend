import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import logo2 from "../assets/logo2.jpg"; // Imagen local
import "../styles/dashboard.css";

const Dashboard = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario")) || { nombre: "Usuario" };
  const token = localStorage.getItem("token");

  const [equiposRegistrados, setEquiposRegistrados] = useState(0);
  const [mantenimientosAgendados, setMantenimientosAgendados] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [resEquipos, resMantenimientos] = await Promise.all([
          axios.get("http://localhost:5000/api/equipos", config),
          axios.get("http://localhost:5000/api/mantenimientos", config),
        ]);

        setEquiposRegistrados(resEquipos.data.length);
        setMantenimientosAgendados(resMantenimientos.data.length);
      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <Container className="dashboard-container">
        <h1 className="text-center">¡Bienvenido, {usuario.nombre}!</h1>
        <p className="text-center">Estado Actual</p>

        <Row className="justify-content-center">
          <Col md={4}>
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title className="text-center">Equipos Registrados</Card.Title>
                <Card.Text className="text-center">{equiposRegistrados}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title className="text-center">Mantenimientos Agendados</Card.Title>
                <Card.Text className="text-center">{mantenimientosAgendados}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer con imagen pequeña */}
      <footer style={{
        marginTop: "60px",
        padding: "20px 0",
        backgroundColor: "#f8f9fa",
        textAlign: "center"
      }}>
        <img
          src={logo2}
          alt="Logo Endocol"
          style={{ width: "180px", height: "auto", opacity: 0.85 }}
        />
        <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "10px" }}>
          © 2025 EndoCol - Todos los derechos reservados
        </p>
      </footer>
    </>
  );
};

export default Dashboard;
