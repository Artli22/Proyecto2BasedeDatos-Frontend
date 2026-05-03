import { useEffect, useState } from "react"
import { empleadosServicio } from "../../servicios/empleadosServicio"

export default function Empleados() {
  const [empleados, setEmpleados] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const datos = await empleadosServicio.obtenerTodos()
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
      <h1>Empleados</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #D0192B", backgroundColor: "#1A2A5E", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Nombre</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Teléfono</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Correo</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Activo</th>
          </tr>
        </thead>
        <tbody>
          {empleados.length > 0 ? (
            empleados.map((empleado) => (
              <tr key={empleado.id_empleado} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{empleado.id_empleado}</td>
                <td style={{ padding: "10px" }}>{empleado.nombre}</td>
                <td style={{ padding: "10px" }}>{empleado.telefono || "-"}</td>
                <td style={{ padding: "10px" }}>{empleado.correo || "-"}</td>
                <td style={{ padding: "10px" }}>{empleado.activo ? "Sí" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: "10px", textAlign: "center" }}>
                No hay empleados disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
