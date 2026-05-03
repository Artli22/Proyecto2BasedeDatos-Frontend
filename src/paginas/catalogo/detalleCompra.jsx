import { useEffect, useState } from "react"
import { detalleCompraServicio } from "../../servicios/detalleCompraServicio"

export default function DetalleCompra() {
  const [detalles, setDetalles] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const datos = await detalleCompraServicio.obtenerTodos()
      setDetalles(datos.data || [])
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
      <h1>Detalles de Compra</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd", backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID Compra</th>
            <th style={{ padding: "10px", textAlign: "left" }}>ID Producto</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Cantidad</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Precio Unitario</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {detalles.length > 0 ? (
            detalles.map((detalle) => (
              <tr key={`${detalle.id_compra}-${detalle.id_producto}`} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{detalle.id_compra}</td>
                <td style={{ padding: "10px" }}>{detalle.id_producto}</td>
                <td style={{ padding: "10px" }}>{detalle.cantidad}</td>
                <td style={{ padding: "10px" }}>Q{detalle.precio_unitario?.toFixed(2) || "0.00"}</td>
                <td style={{ padding: "10px" }}>Q{detalle.sub_total?.toFixed(2) || "0.00"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: "10px", textAlign: "center" }}>
                No hay detalles de compra disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
