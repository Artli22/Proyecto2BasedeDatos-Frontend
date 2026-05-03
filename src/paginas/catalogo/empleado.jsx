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
          <tr style={{ borderBottom: "2px solid #ddd", backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Nombre</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Teléfono</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Puesto</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Salario</th>
          </tr>
        </thead>
        <tbody>
          {empleados.length > 0 ? (
            empleados.map((empleado) => (
              <tr key={empleado.id_empleado} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{empleado.id_empleado}</td>
                <td style={{ padding: "10px" }}>{empleado.nombre}</td>
                <td style={{ padding: "10px" }}>{empleado.email || "-"}</td>
                <td style={{ padding: "10px" }}>{empleado.telefono || "-"}</td>
                <td style={{ padding: "10px" }}>{empleado.puesto || "-"}</td>
                <td style={{ padding: "10px" }}>Q{empleado.salario?.toFixed(2) || "0.00"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: "10px", textAlign: "center" }}>
                No hay empleados disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
