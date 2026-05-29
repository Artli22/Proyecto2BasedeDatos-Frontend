import { useEffect, useState } from "react"
import { reportesServicio } from "../../servicios/reportesServicio"
import { rentabilidadServicio } from "../../servicios/rentabilidadServicio"

export default function Rentabilidad() {
  const [resumen, setResumen] = useState(null)
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [idClienteFiltro, setIdClienteFiltro] = useState("")

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async (idCliente = null) => {
    try {
      setCargando(true)
      
      // Cargar resumen agregado de compras
      const datosResumen = await reportesServicio.obtenerResumenCompras(idCliente)
      setResumen(datosResumen.data || datosResumen)
      
      // Cargar detalle de rentabilidad por producto
      const datosProductos = await rentabilidadServicio.obtenerTodos()
      setProductos(datosProductos.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  const handleFiltrar = () => {
    const id = idClienteFiltro ? parseInt(idClienteFiltro) : null
    cargarDatos(id)
  }

  if (cargando) return <div style={{ padding: "20px" }}>Cargando...</div>
  if (error) return <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>

  return (
    <div style={{ padding: "20px" }}>
      <h1>Rentabilidad de Productos</h1>
      
      <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
        <label style={{ marginRight: "10px" }}>
          Filtrar por ID Cliente: 
          <input 
            type="number" 
            value={idClienteFiltro}
            onChange={(e) => setIdClienteFiltro(e.target.value)}
            placeholder="Dejar vacío para ver todos"
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
        <button 
          onClick={handleFiltrar}
          style={{ 
            marginLeft: "10px", 
            padding: "5px 15px", 
            backgroundColor: "#D0192B", 
            color: "white", 
            border: "none", 
            borderRadius: "3px", 
            cursor: "pointer" 
          }}
        >
          Filtrar
        </button>
        <button 
          onClick={() => { setIdClienteFiltro(""); cargarDatos(null) }}
          style={{ 
            marginLeft: "5px", 
            padding: "5px 15px", 
            backgroundColor: "#1A2A5E", 
            color: "white", 
            border: "none", 
            borderRadius: "3px", 
            cursor: "pointer" 
          }}
        >
          Limpiar
        </button>
      </div>

      {resumen && (
        <>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "15px", 
            marginBottom: "30px" 
          }}>
            <div style={{ 
              padding: "15px", 
              backgroundColor: "#1A2A5E", 
              color: "white", 
              borderRadius: "5px",
              textAlign: "center"
            }}>
              <h3>Total de Compras</h3>
              <p style={{ fontSize: "24px", margin: "10px 0" }}>{resumen.total_compras || 0}</p>
            </div>
            <div style={{ 
              padding: "15px", 
              backgroundColor: "#D0192B", 
              color: "white", 
              borderRadius: "5px",
              textAlign: "center"
            }}>
              <h3>Monto Total</h3>
              <p style={{ fontSize: "24px", margin: "10px 0" }}>Q{(resumen.monto_total || 0).toFixed(2)}</p>
            </div>
            <div style={{ 
              padding: "15px", 
              backgroundColor: "#333", 
              color: "white", 
              borderRadius: "5px",
              textAlign: "center"
            }}>
              <h3>Monto Promedio</h3>
              <p style={{ fontSize: "24px", margin: "10px 0" }}>Q{(resumen.monto_promedio || 0).toFixed(2)}</p>
            </div>
          </div>

        </>
      )}

      <h2 style={{ marginTop: "30px", marginBottom: "15px", borderBottom: "2px solid #D0192B", paddingBottom: "10px" }}>
        Detalle por Producto
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #D0192B", backgroundColor: "#1A2A5E", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>ID Producto</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Producto</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Categoría</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Unidades Vendidas</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Ingresos Totales</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Precio Promedio Venta</th>
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
