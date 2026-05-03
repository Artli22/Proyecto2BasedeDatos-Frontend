import { useEffect, useState } from "react"
import { rentabilidadServicio } from "../../servicios/rentabilidadServicio"

export default function Rentabilidad() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const datos = await rentabilidadServicio.obtenerTodos()
      setProductos(datos.data || [])
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
      <h1>Rentabilidad de Productos</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd", backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID Producto</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Producto</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Categoría</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Unidades Vendidas</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Ingresos Totales</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Precio Promedio Venta</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto.id_producto} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{producto.id_producto}</td>
                <td style={{ padding: "10px" }}>{producto.producto}</td>
                <td style={{ padding: "10px" }}>{producto.categoria}</td>
                <td style={{ padding: "10px" }}>{producto.unidades_vendidas}</td>
                <td style={{ padding: "10px" }}>Q{producto.ingresos_totales?.toFixed(2) || "0.00"}</td>
                <td style={{ padding: "10px" }}>Q{producto.precio_promedio_venta?.toFixed(2) || "0.00"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: "10px", textAlign: "center" }}>
                No hay datos de rentabilidad disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
