import { Navbar, Nav, Container, Button, Offcanvas, Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";
import Logo from "../assets/logo.png";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      try {
        const usuarioParseado = JSON.parse(storedUser);
        setUsuario(usuarioParseado);
      } catch (error) {
        console.error("Error al parsear usuario desde localStorage:", error);
        setUsuario(null);
      }
    }
  }, [location]);

  if (location.pathname === "/login" || location.pathname === "/registro")
    return null;

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
          {/* Sección izquierda: Menú + Logo */}
          <div className="d-flex align-items-center">
            <Button className="custom-hamburger me-2" onClick={() => setShow(true)}>
              ☰
            </Button>
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
              <img src={Logo} alt="Logo" className="navbar-logo me-2" />
              <span className="navbar-title">Gestión de Equipos Biomédicos</span>
            </Navbar.Brand>
          </div>

          {/* Sección derecha: Usuario / Sesión */}
          <div className="ms-auto d-flex align-items-center">
            {usuario ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="primary" id="dropdown-user" className="me-3">
                  {usuario.nombre}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/perfil">Mi Perfil</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={cerrarSesion}>Cerrar Sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white me-3">
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/registro" className="text-white">
                  Registrarse
                </Nav.Link>
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
            <Nav.Link as={Link} to="/dashboard" onClick={() => setShow(false)}>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/inventario" onClick={() => setShow(false)}>Inventario</Nav.Link>
            <Nav.Link as={Link} to="/mantenimiento" onClick={() => setShow(false)}>Mantenimientos</Nav.Link>
            <Nav.Link as={Link} to="/hojadevida" onClick={() => setShow(false)}>Hoja de vida Equipos</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;