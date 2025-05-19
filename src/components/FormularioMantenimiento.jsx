import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/FormularioMantenimiento.css";

function FormularioMantenimiento({ onSubmit, valores, modoEdicion, onCancel }) {
  const [equipos, setEquipos] = useState([]);
  const [mantenimiento, setMantenimiento] = useState({
    equipoId: "",
    fecha: "",
    tipo: "preventivo",
    descripcion: "",
    tecnico: "",
    estado: "programado" 
  });

  useEffect(() => {
    const fetchEquipos = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/equipos", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEquipos(res.data);
      } catch (err) {
        console.error("Error al obtener equipos:", err);
      }
    };
    fetchEquipos();
  }, []);

  useEffect(() => {
    if (modoEdicion && valores) {
      setMantenimiento(valores);
    }
  }, [valores, modoEdicion]);

  const handleChange = (e) => {
    setMantenimiento({
      ...mantenimiento,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(mantenimiento);
  };

  return (
    <form onSubmit={handleSubmit} className="form-mantenimiento">
      <h2>{modoEdicion ? "Editar Mantenimiento" : "Agregar Mantenimiento"}</h2>

      <label>Equipo:</label>
      <select
        name="equipoId"
        value={mantenimiento.equipoId}
        onChange={handleChange}
        required
      >
        <option value="">Seleccione un equipo</option>
        {equipos.map((equipo) => (
          <option key={equipo._id} value={equipo._id}>
            {equipo.nombre} ({equipo.modelo})
          </option>
        ))}
      </select>

      <label>Fecha:</label>
      <input
        type="date"
        name="fecha"
        value={mantenimiento.fecha}
        onChange={handleChange}
        required
      />

      <label>Tipo:</label>
      <select name="tipo" value={mantenimiento.tipo} onChange={handleChange}>
        <option value="preventivo">Preventivo</option>
        <option value="correctivo">Correctivo</option>
      </select>

      <label>Descripción:</label>
      <input
        type="text"
        name="descripcion"
        value={mantenimiento.descripcion}
        onChange={handleChange}
        required
      />

      <label>Técnico:</label>
      <input
        type="text"
        name="tecnico"
        value={mantenimiento.tecnico}
        onChange={handleChange}
        required
      />

      {modoEdicion && (
        <>
          <label>Estado:</label>
          <select name="estado" value={mantenimiento.estado} onChange={handleChange}>
            <option value="programado">Programado</option>
            <option value="completado">Completado</option>
          </select>
        </>
      )}

      <div className="form-buttons">
        <button type="submit">{modoEdicion ? "Actualizar" : "Guardar"}</button>
        <button type="button" className="btn-cancelar" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

export default FormularioMantenimiento;
