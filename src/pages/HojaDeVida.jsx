import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const HojaDeVida = () => {
  const [formData, setFormData] = useState({
    componente1: 'N/A',
    marcaComponente1: 'N/A',
    modeloComponente1: 'N/A',
    componente2: 'N/A',
    marcaComponente2: 'N/A',
    modeloComponente2: 'N/A',
    componente3: 'N/A',
    marcaComponente3: 'N/A',
    modeloComponente3: 'N/A'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generarPDF = () => {
    const input = document.getElementById('formulario-pdf');
    html2canvas(input, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff'
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('HojaDeVidaEquipo.pdf');
    });
  };

  const renderInput = (label, name) => (
    <tr>
      <td style={{ border: '1px solid #000', padding: '3px', width: '35%' }}><strong>{label}</strong></td>
      <td style={{ border: '1px solid #000', padding: '3px' }}>
        <input
          name={name}
          value={formData[name] || ''}
          onChange={handleChange}
          style={{ width: '100%', border: 'none', fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '11px', background: 'transparent' }}
        />
      </td>
    </tr>
  );

  const renderSection = (title, inputs) => (
    <>
      <h3 style={{ fontSize: '16px', margin: '15px 0 5px' }}>{title}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        {inputs.map(([label, name]) => renderInput(label, name))}
      </table>
    </>
  );

  return (
    <div style={{ padding: '10px', fontFamily: 'Helvetica, Arial, sans-serif', background: '#f0f0f0' }}>
      <div
        id="formulario-pdf"
        style={{
          background: '#ffffff',
          padding: '20px',
          fontSize: '11px',
          border: '1px solid #000',
          maxWidth: '794px',
          margin: '0 auto'
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#007bff', fontSize: '14px', marginBottom: '10px' }}>
          HOJA DE VIDA DE EQUIPO HOSPITALARIO
        </h2>

        {renderSection('1. INFORMACIÓN GENERAL', [
          ['1.1 Equipo', 'equipo'], ['1.2 Modelo', 'modelo'], ['1.3 Servicio', 'servicio'], ['1.4 Ubicación', 'ubicacion'],
          ['1.5 Equipo fijo/móvil', 'movilidad'], ['1.6 No. de Inventario', 'inventario'], ['1.7 Registro INVIMA', 'invima'],
          ['1.8 Serie', 'serie'], ['1.9 Activo/Inactivo', 'activo'], ['1.10 Forma de adquisición', 'formaAdquisicion'],
          ['1.11 Fecha de compra', 'fechaCompra'], ['1.12 Documento de adquisición', 'documentoAdquisicion'],
          ['1.13 Acta de recepción', 'actaRecepcion'], ['1.14 Instalación', 'instalacion'],
          ['1.15 Fecha inicio operación', 'inicioOperacion'], ['1.16 Vida útil', 'vidaUtil'],
          ['1.17 Garantía', 'garantia'], ['1.18 Costo', 'costo'], ['1.19 Proveedor', 'proveedor'],
          ['1.20 Teléfono proveedor', 'telefonoProveedor'], ['1.21 Representante', 'representante'],
          ['1.22 Fabricante', 'fabricante']
        ])}

        {renderSection('2. REGISTRO HISTÓRICO DE INSTALACIÓN', [
          ['2.1 Fuente de alimentación', 'fuenteAlimentacion'], ['2.2 Corriente Max', 'corrienteMax'],
          ['2.3 Corriente Min', 'corrienteMin'], ['2.4 Voltaje Max', 'voltajeMax'],
          ['2.5 Voltaje Min', 'voltajeMin'], ['2.6 Potencia', 'potencia'],
          ['2.7 Frecuencia', 'frecuencia'], ['2.8 Peso', 'peso'],
          ['2.9 Rango de temperatura', 'temperatura']
        ])}

        {renderSection('3. REGISTRO TÉCNICO DE FUNCIONAMIENTO', [
          ['3.1 Rango voltaje', 'rangoVoltaje'], ['3.2 Rango corriente', 'rangoCorriente'],
          ['3.3 Rango potencia', 'rangoPotencia'], ['3.4 Frecuencia', 'frecuenciaFuncionamiento'],
          ['3.5 Rango presión', 'rangoPresion'], ['3.6 Rango velocidad', 'rangoVelocidad'],
          ['3.7 Rango temperatura', 'rangoTemperatura'], ['3.8 Peso', 'pesoFuncionamiento'],
          ['3.9 Rango humedad', 'rangoHumedad'], ['3.10 Recomendaciones', 'recomendaciones']
        ])}

        {renderSection('4. REGISTRO DE APOYO TÉCNICO', [
          ['4.1 Clasificación de riesgo', 'clasificacionRiesgo'],
          ['4.2 Manuales disponibles', 'manuales'],
          ['4.3 Mantenimiento preventivo', 'mantenimiento']
        ])}

        <h3 style={{ fontSize: '16px', margin: '15px 0 5px' }}>5. COMPONENTES</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          {[1, 2, 3].map((n) => (
            <tr key={n}>
              <td style={{ border: '1px solid #000', padding: '3px' }}><strong>Componente {n}</strong></td>
              <td style={{ border: '1px solid #000', padding: '3px' }}>
                <input name={`componente${n}`} value={formData[`componente${n}`]} onChange={handleChange} style={{ width: '100%', border: 'none', background: 'transparent' }} />
              </td>
              <td style={{ border: '1px solid #000', padding: '3px' }}><strong>Marca</strong></td>
              <td style={{ border: '1px solid #000', padding: '3px' }}>
                <input name={`marcaComponente${n}`} value={formData[`marcaComponente${n}`]} onChange={handleChange} style={{ width: '100%', border: 'none', background: 'transparent' }} />
              </td>
              <td style={{ border: '1px solid #000', padding: '3px' }}><strong>Modelo</strong></td>
              <td style={{ border: '1px solid #000', padding: '3px' }}>
                <input name={`modeloComponente${n}`} value={formData[`modeloComponente${n}`]} onChange={handleChange} style={{ width: '100%', border: 'none', background: 'transparent' }} />
              </td>
            </tr>
          ))}
        </table>

        {renderSection('6. MANTENIMIENTO', [
          ['Periodicidad del mantenimiento', 'periodicidadMantenimiento'],
          ['Requiere calibración', 'requiereCalibracion'],
          ['Periodicidad calibración', 'periodicidadCalibracion']
        ])}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={generarPDF} style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Generar PDF
        </button>
      </div>
    </div>
  );
};

export default HojaDeVida;