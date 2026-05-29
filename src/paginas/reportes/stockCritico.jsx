import { useEffect, useState } from "react"
import { reportesServicio } from "../../servicios/reportesServicio"

export default function StockCritico() {
  const [reporte, setReporte] = useState(null)
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [limiteStock, setLimiteStock] = useState("20")

  useEffect(() => {
    if (limiteStock) {
      cargarDatos(parseInt(limiteStock))
    }
  }, [limiteStock])

  const cargarDatos = async (limite) => {
    try {
      setCargando(true)
      const datos = await reportesServicio.obtenerInventarioCritico(limite)
      setReporte(datos.data || datos)
      setProductos(datos.data?.productos || datos.productos || [])
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
      
      <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
        <label style={{ marginRight: "10px" }}>
          Límite de Stock (Unidades): 
          <input 
            type="number" 
            value={limiteStock}
            onChange={(e) => setLimiteStock(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", width: "80px" }}
          />
        </label>
      </div>

      {/* Resumen general */}
      {reporte?.mensaje && (
        <div style={{ 
          padding: "12px", 
          backgroundColor: "#fff3cd", 
          borderLeft: "4px solid #ffc107",
          borderRadius: "3px",
          marginBottom: "20px"
        }}>
          <strong>{reporte.mensaje}</strong>
        </div>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #D0192B", backgroundColor: "#1A2A5E", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Producto</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Categoría</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Proveedor</th>
            <th style={{ padding: "10px", textAlign: "center", color: "white" }}>Teléfono</th>
            <th style={{ padding: "10px", textAlign: "center", color: "white" }}>Stock</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Vencimiento</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto, idx) => {
              const esProductoCritico = idx === 0 // El primero es el más crítico
              
              return (
                <tr 
                  key={producto.id_producto} 
                  style={{ 
                    borderBottom: "1px solid #ddd",
                    backgroundColor: esProductoCritico ? "#ffe6e6" : "white",
                    fontWeight: esProductoCritico ? "bold" : "normal"
                  }}
                >
                  <td style={{ padding: "10px" }}>{producto.id_producto}</td>
                  <td style={{ padding: "10px" }}>
                    {producto.nombre}
                  </td>
                  <td style={{ padding: "10px" }}>{producto.categoria}</td>
                  <td style={{ 
                    padding: "10px",
                    color: "#007bff",
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}>
                    {producto.proveedor}
                  </td>
                  <td style={{ 
                    padding: "10px",
                    textAlign: "center",
                    color: "#007bff",
                    fontWeight: "bold"
                  }}>
                    {producto.telefono_proveedor || "-"}
                  </td>
                  <td style={{ 
                    padding: "10px",
                    textAlign: "center",
                    color: producto.stock_actual < 10 ? "red" : "orange",
                    fontWeight: "bold",
                    fontSize: "14px"
                  }}>
                    {producto.stock_actual}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {producto.fecha_vencimiento ? new Date(producto.fecha_vencimiento).toLocaleDateString() : "-"}
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: "10px", textAlign: "center", color: "green" }}>
                No hay productos con stock crítico
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
