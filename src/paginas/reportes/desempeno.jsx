import { useEffect, useState } from "react"
import { desempenoServicio } from "../../servicios/desempenoServicio"

export default function Desempeno() {
  const [empleados, setEmpleados] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const datos = await desempenoServicio.obtenerTodos()
      setEmpleados(datos.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  if (cargando) return <div style={{ padding: "20px" }}>Cargando...</div>
  if (error) return <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>

  return (
    <div style={{ padding: "20px" }}>
      <h1>Desempeño de Empleados</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #D0192B", backgroundColor: "#1A2A5E", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>ID Empleado</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Nombre</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Total Transacciones</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Monto Total Vendido</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Ticket Promedio</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>\u00daltima Venta</th>
          </tr>
        </thead>
        <tbody>
          {empleados.length > 0 ? (
            empleados.map((empleado) => (
              <tr key={empleado.id_empleado} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{empleado.id_empleado}</td>
                <td style={{ padding: "10px" }}>{empleado.empleado}</td>
                <td style={{ padding: "10px" }}>{empleado.total_transacciones}</td>
                <td style={{ padding: "10px" }}>Q{empleado.monto_total_vendido?.toFixed(2) || "0.00"}</td>
                <td style={{ padding: "10px" }}>Q{empleado.ticket_promedio?.toFixed(2) || "0.00"}</td>
                <td style={{ padding: "10px" }}>{empleado.ultima_venta || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: "10px", textAlign: "center" }}>
                No hay datos de desempeño disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
