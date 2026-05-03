import { useEffect, useState } from "react"
import { proveedoresServicio } from "../../servicios/proveedoresServicio"

export default function Proveedores() {
  const [proveedores, setProveedores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const datos = await proveedoresServicio.obtenerTodos()
      setProveedores(datos.data || [])
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
      <h1>Proveedores</h1>
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
          {proveedores.length > 0 ? (
            proveedores.map((proveedor) => (
              <tr key={proveedor.id_proveedor} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{proveedor.id_proveedor}</td>
                <td style={{ padding: "10px" }}>{proveedor.nombre}</td>
                <td style={{ padding: "10px" }}>{proveedor.telefono || "-"}</td>
                <td style={{ padding: "10px" }}>{proveedor.correo || "-"}</td>
                <td style={{ padding: "10px" }}>{proveedor.activo ? "Sí" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: "10px", textAlign: "center" }}>
                No hay proveedores disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
