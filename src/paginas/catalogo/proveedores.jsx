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
          <tr style={{ borderBottom: "2px solid #ddd", backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Nombre</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Teléfono</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Dirección</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.length > 0 ? (
            proveedores.map((proveedor) => (
              <tr key={proveedor.id_proveedor} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{proveedor.id_proveedor}</td>
                <td style={{ padding: "10px" }}>{proveedor.nombre}</td>
                <td style={{ padding: "10px" }}>{proveedor.email || "-"}</td>
                <td style={{ padding: "10px" }}>{proveedor.telefono || "-"}</td>
                <td style={{ padding: "10px" }}>{proveedor.direccion || "-"}</td>
                <td style={{ padding: "10px" }}>{proveedor.ciudad || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: "10px", textAlign: "center" }}>
                No hay proveedores disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
