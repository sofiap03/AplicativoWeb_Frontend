import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import axios from "axios";
import "../styles/Inventario.css";

const Inventario = () => {
  const [equipos, setEquipos] = useState([]);
  const [show, setShow] = useState(false);
  const [equipoActual, setEquipoActual] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    codigoUDI: "",
    numeroSerie: "",
    modelo: "",
    marca: "",
    ubicacion: "",
    estado: "Operativo",
    fechaAdquisicion: "",
    ultimaMantenimiento: "",
    responsable: ""
  });

  useEffect(() => {
    cargarEquipos();
  }, []);

  const cargarEquipos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/equipos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setEquipos(response.data);
    } catch (error) {
      console.error("Error al cargar equipos", error);
    }
  };

  const handleShow = (equipo = null) => {
    if (equipo) {
      setEquipoActual(equipo);
      setFormData(equipo);
    } else {
      setEquipoActual(null);
      setFormData({
        nombre: "",
        codigoUDI: "",
        numeroSerie: "",
        modelo: "",
        marca: "",
        ubicacion: "",
        estado: "Operativo",
        fechaAdquisicion: "",
        ultimaMantenimiento: "",
        responsable: ""
      });
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (equipoActual) {
        await axios.put(`http://localhost:5000/api/equipos/${equipoActual._id}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
      } else {
        await axios.post("http://localhost:5000/api/equipos", formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
      }
      handleClose();
      cargarEquipos();
    } catch (error) {
      console.error("Error al guardar equipo", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/equipos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      cargarEquipos();
    } catch (error) {
      console.error("Error al eliminar equipo", error);
    }
  };

  return (
    <Container className="inventario-container">
      <h2 className="mb-4">Inventario de Equipos</h2>
      <Button variant="primary" onClick={() => handleShow()} className="mb-3">Agregar Equipo</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Estado</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo) => (
            <tr key={equipo._id}>
              <td>{equipo.nombre}</td>
              <td>{equipo.modelo}</td>
              <td>{equipo.marca}</td>
              <td>{equipo.estado}</td>
              <td>{equipo.ubicacion}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(equipo)} className="me-2">Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(equipo._id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal para agregar/editar equipo */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{equipoActual ? "Editar Equipo" : "Agregar Equipo"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Modelo</Form.Label>
              <Form.Control type="text" name="modelo" value={formData.modelo} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Marca</Form.Label>
              <Form.Control type="text" name="marca" value={formData.marca} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Select name="estado" value={formData.estado} onChange={handleChange}>
                <option>Operativo</option>
                <option>En mantenimiento</option>
                <option>Fuera de servicio</option>
              </Form.Select>
            </Form.Group>
            <Button variant="success" type="submit" className="mt-3 w-100">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Inventario;