import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../styles/dashboard.css";

const Dashboard = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario")) || { nombre: "Usuario" };
  
  // Datos simulados hasta conectar con las páginas futuras
  const [equiposRegistrados, setEquiposRegistrados] = useState(0);
  const [mantenimientosAgendados, setMantenimientosAgendados] = useState(0);

  useEffect(() => {
    // Aquí irán las peticiones a la API cuando las páginas estén listas
    // Simulamos datos con valores de prueba
    setEquiposRegistrados(5); 
    setMantenimientosAgendados(2); 
  }, []);

  return (
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
  );
};

export default Dashboard;
