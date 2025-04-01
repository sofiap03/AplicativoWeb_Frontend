import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";
import Logo from "../assets/logo.png";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [show, setShow] = useState(false);

  if (location.pathname === "/login" || location.pathname === "/registro") return null;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar superior */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Container fluid>
          {/* Sección izquierda: Botón de menú + Logo + Nombre */}
          <div className="d-flex align-items-center">
            <Button className="custom-hamburger" onClick={() => setShow(true)}>
             ☰
            </Button>
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
              <img src={Logo} alt="Logo" className="navbar-logo me-2" />
              <span className="navbar-title">Gestión de Equipos Biomédicos</span>
            </Navbar.Brand>
          </div>

          {/* Sección derecha: Usuario y Cerrar Sesión */}
          <div className="ms-auto d-flex align-items-center">
            {usuario ? (
              <>
                <Navbar.Text className="text-white me-3">Bienvenido, {usuario.nombre}</Navbar.Text>
                <Button variant="danger" onClick={cerrarSesion}>Cerrar Sesión</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white me-3">Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to="/registro" className="text-white">Registrarse</Nav.Link>
              </>
            )}
          </div>
        </Container>
      </Navbar>

      {/* Menú lateral Offcanvas */}
      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/inventario" onClick={() => setShow(false)}>Inventario</Nav.Link>
            <Nav.Link as={Link} to="/mantenimientos" onClick={() => setShow(false)}>Mantenimientos</Nav.Link>
            <Nav.Link as={Link} to="/reportes" onClick={() => setShow(false)}>Reportes</Nav.Link>
            <Nav.Link as={Link} to="/dashboard" onClick={() => setShow(false)}>Inicio</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;
