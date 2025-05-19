import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState({});
  const [cargandoPerfil, setCargandoPerfil] = useState(true);

  const [claveActual, setClaveActual] = useState('');
  const [nuevaClave, setNuevaClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [mensajeClave, setMensajeClave] = useState('');
  const [errorClave, setErrorClave] = useState('');
  const [cambiandoClave, setCambiandoClave] = useState(false);

  const obtenerPerfil = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/usuarios/perfil`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Perfil recibido:', response.data);
      setUsuario(response.data);
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
    } finally {
      setCargandoPerfil(false);
    }
  };

  useEffect(() => {
    obtenerPerfil();
  }, []);

  const handleCambiarClave = async (e) => {
    e.preventDefault();
    setMensajeClave('');
    setErrorClave('');

    if (nuevaClave !== confirmarClave) {
      setErrorClave('Las nuevas contraseñas no coinciden');
      return;
    }

    try {
      setCambiandoClave(true);
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/usuarios/cambiar-clave`,
        { claveActual, nuevaClave },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Usamos el mensaje del backend si existe, o uno por defecto
      setMensajeClave(response.data.message || 'Contraseña actualizada exitosamente');
      setClaveActual('');
      setNuevaClave('');
      setConfirmarClave('');
    } catch (error) {
      console.error('Error al cambiar clave:', error);
      const msg = error.response?.data?.message || 'Error al cambiar la contraseña';
      setErrorClave(msg);
    } finally {
      setCambiandoClave(false);
    }
  };

  if (cargandoPerfil) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        {/* Sección de información */}
        <Col md={6}>
          <Card className="mb-4 shadow-sm p-4">
            <h4 className="mb-3">Información del perfil</h4>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Correo:</strong> {usuario.correo}</p>
            <p><strong>Rol:</strong> {usuario.rol}</p>
            <p>
              <strong>Último Pago:</strong>{' '}
              {usuario.fechaPago
                ? new Date(usuario.fechaPago).toLocaleDateString()
                : 'No disponible'}
            </p>
            <p>
              <strong>Válido hasta:</strong>{' '}
              {usuario.fechaVencimiento
              ? new Date(usuario.fechaVencimiento).toLocaleDateString()
              : 'No disponible'}
            </p>
            <p>
              <strong>Estado del Plan:</strong> {usuario.estadoPlan}
            </p>
            
          </Card>
        </Col>

        {/* Sección de cambio de contraseña */}
        <Col md={6}>
          <Card className="shadow-sm p-4">
            <h4 className="mb-3">Cambiar contraseña</h4>

            {mensajeClave && <Alert variant="success">{mensajeClave}</Alert>}
            {errorClave && <Alert variant="danger">{errorClave}</Alert>}

            <Form onSubmit={handleCambiarClave}>
              <Form.Group className="mb-3" controlId="claveActual">
                <Form.Label>Contraseña actual</Form.Label>
                <Form.Control
                  type="password"
                  value={claveActual}
                  onChange={(e) => setClaveActual(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="nuevaClave">
                <Form.Label>Nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={nuevaClave}
                  onChange={(e) => setNuevaClave(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="confirmarClave">
                <Form.Label>Confirmar nueva contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmarClave}
                  onChange={(e) => setConfirmarClave(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit" disabled={cambiandoClave}>
                  {cambiandoClave ? (
                    <>
                      <Spinner animation="border" size="sm" /> Actualizando...
                    </>
                  ) : (
                    'Actualizar contraseña'
                  )}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PerfilUsuario;
