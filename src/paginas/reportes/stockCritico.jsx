import { useEffect, useState } from "react"
import { stockCriticoServicio } from "../../servicios/stockCriticoServicio"

export default function StockCritico() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const datos = await stockCriticoServicio.obtenerTodos()
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
      <h1>Stock Crítico</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd", backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID Producto</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Producto</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Categoría</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Proveedor</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Teléfono Proveedor</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Stock Actual</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Fecha Vencimiento</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto.id_producto} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{producto.id_producto}</td>
                <td style={{ padding: "10px" }}>{producto.producto}</td>
                <td style={{ padding: "10px" }}>{producto.categoria}</td>
                <td style={{ padding: "10px" }}>{producto.proveedor}</td>
                <td style={{ padding: "10px" }}>{producto.telefono_proveedor || "-"}</td>
                <td style={{ padding: "10px" }}>
                  <span style={{ color: producto.stock_actual < 10 ? "red" : "green" }}>
                    {producto.stock_actual}
                  </span>
                </td>
                <td style={{ padding: "10px" }}>{producto.fecha_vencimiento || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: "10px", textAlign: "center" }}>
                No hay productos con stock crítico
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
