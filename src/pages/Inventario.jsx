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

  const [archivos, setArchivos] = useState({
    manualUsuario: null,
    fichaTecnica: null,
    registroSanitario: null,
    factura: null

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
      setFormData({
        ...equipo,
        fechaAdquisicion: equipo.fechaAdquisicion?.split("T")[0] || "",
        ultimaMantenimiento: equipo.ultimaMantenimiento?.split("T")[0] || ""
      });
      setArchivos({
        manualUsuario: null,
        fichaTecnica: null,
        registroSanitario: null
      });
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
      setArchivos({
        manualUsuario: null,
        fichaTecnica: null,
        registroSanitario: null
      });
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArchivoChange = (e) => {
    setArchivos({ ...archivos, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    for (const key in archivos) {
      if (archivos[key]) {
        data.append(key, archivos[key]);
      }
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data'
        }
      };

      if (equipoActual) {
        await axios.put(`http://localhost:5000/api/equipos/${equipoActual._id}`, data, config);
      } else {
        await axios.post("http://localhost:5000/api/equipos", data, config);
      }

      handleClose();
      cargarEquipos();
    } catch (error) {
      console.error("Error al guardar equipo:", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este equipo?")) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/equipos/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert(response.data.message);
      cargarEquipos();
    } catch (error) {
      console.error("Error al eliminar equipo:", error);
      if (error.response) {
        alert(error.response.data.message || "Error al eliminar el equipo.");
      }
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
            <th>Código UDI</th>
            <th>Número de Serie</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Ubicación</th>
            <th>Documentos</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo) => (
            <tr key={equipo._id}>
              <td>{equipo.nombre}</td>
              <td>{equipo.codigoUDI}</td>
              <td>{equipo.numeroSerie}</td>
              <td>{equipo.modelo}</td>
              <td>{equipo.marca}</td>
              <td>{equipo.ubicacion}</td>

              <td>
                {equipo.manualUsuario && (
                <a
                  href={`http://localhost:5000/${equipo.manualUsuario}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                📄 Manual
                </a>
                )}
                <br />
                {equipo.fichaTecnica && (
                <a
                  href={`http://localhost:5000/${equipo.fichaTecnica}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                📄 Ficha
                </a>
                )}
              <br />
              {equipo.registroSanitario && (
                <a
                 href={`http://localhost:5000/${equipo.registroSanitario}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                📄 Registro
                </a>
            )}
            {equipo.factura && (
            <>
            <br />
              <a
                href={`http://localhost:5000/${equipo.factura}`}
                target="_blank"
                rel="noopener noreferrer"
              > 
              📄 Factura
              </a>
             </>
            )}
            </td>
            <td>{equipo.estado}</td>
              <td>
                <Button variant="secondary" onClick={() => handleShow(equipo)} className="me-2">Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(equipo._id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{equipoActual ? "Editar Equipo" : "Agregar Equipo"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
              <Form.Group key={key} className="mb-2">
                <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                <Form.Control
                  type={key.includes("fecha") ? "date" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required={!key.includes("ultimaMantenimiento")}
                />
              </Form.Group>
            ))}

            <Form.Group className="mb-2">
              <Form.Label>Manual de Usuario</Form.Label>
              <Form.Control type="file" name="manualUsuario" onChange={handleArchivoChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Ficha Técnica</Form.Label>
              <Form.Control type="file" name="fichaTecnica" onChange={handleArchivoChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Registro Sanitario</Form.Label>
              <Form.Control type="file" name="registroSanitario" onChange={handleArchivoChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Factura</Form.Label>
              <Form.Control type="file" name="factura" onChange={handleArchivoChange} />
            </Form.Group>

            <Button variant="success" type="submit" className="mt-3 w-100">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Inventario;
