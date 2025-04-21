import React, { useEffect, useState } from "react";
import axios from "axios";
import FormularioMantenimiento from "../components/FormularioMantenimiento";
import "../styles/mantenimiento.css";

function Mantenimiento() {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [datosEdicion, setDatosEdicion] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchMantenimientos();
  }, []);

  const fetchMantenimientos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/mantenimientos", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMantenimientos(res.data);
    } catch (error) {
      console.error("Error al obtener mantenimientos:", error);
    }
  };

  const handleGuardar = async (nuevo) => {
    try {
      if (modoEdicion && datosEdicion) {
        await axios.put(`http://localhost:5000/api/mantenimientos/${datosEdicion._id}`, nuevo, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post("http://localhost:5000/api/mantenimientos", nuevo, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setFormVisible(false);
      setModoEdicion(false);
      setDatosEdicion(null);
      fetchMantenimientos();
    } catch (error) {
      console.error("Error al guardar mantenimiento:", error);
    }
  };

  const handleEditar = (mantenimiento) => {
    setDatosEdicion(mantenimiento);
    setModoEdicion(true);
    setFormVisible(true);
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/mantenimientos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMantenimientos();
    } catch (error) {
      console.error("Error al eliminar mantenimiento:", error);
    }
  };

  const handleAgregar = () => {
    setDatosEdicion(null);
    setModoEdicion(false);
    setFormVisible(true);
  };

  const handleCancelar = () => {
    setFormVisible(false);
    setModoEdicion(false);
    setDatosEdicion(null);
  };

  return (
    <div className="mantenimiento-container">
      <h2 className="titulo-principal">Gestión de Mantenimientos</h2>
      <button onClick={handleAgregar} className="btn btn-gris">➕ Agregar Mantenimiento</button>
  
      {formVisible && (
        <FormularioMantenimiento
          onSubmit={handleGuardar}
          valores={datosEdicion}
          modoEdicion={modoEdicion}
          onCancel={handleCancelar}
        />
      )}
  
      <h4 className="titulo-secundario">Mantenimientos Programados</h4>
      <div className="tabla-container">
        <table>
          <thead>
            <tr>
              <th>Equipo</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mantenimientos.map((m) => (
              <tr key={m._id}>
                <td>{m.equipoId?.nombre} ({m.equipoId?.modelo})</td>
                <td>{m.descripcion}</td>
                <td>{m.fecha?.substring(0, 10)}</td>
                <td>{m.tipo}</td>
                <td>{m.estado}</td>
                <td>
                  <button onClick={() => handleEditar(m)} className="btn btn-gris-sm" title="Editar">✏️</button>
                  <button onClick={() => handleEliminar(m._id)} className="btn btn-gris-sm" title="Eliminar">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );  
  
}

export default Mantenimiento;
