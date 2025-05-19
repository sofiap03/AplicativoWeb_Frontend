import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../styles/calendario.css";

const CalendarioMantenimientos = () => {
  const [eventos, setEventos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const cargarMantenimientos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/mantenimientos", {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("📦 Datos de mantenimientos recibidos:", res.data); // 👈 Log 1

        const eventosConvertidos = res.data
          // .filter((m) => new Date(m.fecha) >= new Date()) // Descomentar para ver solo mantenimientos futuros
          .map((m) => ({
            id: m._id,
            title: `${m.tipo} - ${m.estado}`,
            start: m.fecha,
            backgroundColor: m.estado === "programado" ? "#ffd966" : "#92d050", // amarillo / verde
            borderColor: "#ccc",
            textColor: "#000",
            extendedProps: {
              descripcion: m.descripcion,
              tecnico: m.tecnico,
              equipo: `${m.equipoId?.nombre} (${m.equipoId?.modelo})`
            }
          }));

        console.log("📅 Eventos convertidos para el calendario:", eventosConvertidos); // 👈 Log 2

        setEventos(eventosConvertidos);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      }
    };

    cargarMantenimientos();
  }, []);

  return (
    <div className="calendario-container">
      <h3>Calendario de Mantenimientos</h3>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="es"
        events={eventos}
        height="auto"
        eventContent={(arg) => (
          <div title={arg.event.extendedProps.descripcion}>
            <strong>{arg.event.title}</strong><br />
            {arg.event.extendedProps.equipo}
          </div>
        )}
      />
    </div>
  );
};

export default CalendarioMantenimientos;
