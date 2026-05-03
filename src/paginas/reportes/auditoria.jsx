import { useEffect, useState } from "react"
import { auditoriaServicio } from "../../servicios/auditoriaServicio"

export default function Auditoria() {
  const [auditorias, setAuditorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const datos = await auditoriaServicio.obtenerTodos()
      setAuditorias(datos.data || [])
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
      <h1>Auditoría de Ventas</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd", backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID Compra</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Factura</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Fecha</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Método Pago</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Estado</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Total</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Cliente</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Email Cliente</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Empleado Cajero</th>
          </tr>
        </thead>
        <tbody>
          {auditorias.length > 0 ? (
            auditorias.map((auditoria) => (
              <tr key={auditoria.id_compra} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{auditoria.id_compra}</td>
                <td style={{ padding: "10px" }}>{auditoria.num_factura}</td>
                <td style={{ padding: "10px" }}>{auditoria.fecha}</td>
                <td style={{ padding: "10px" }}>{auditoria.metodo_pago || "-"}</td>
                <td style={{ padding: "10px" }}>{auditoria.estado || "-"}</td>
                <td style={{ padding: "10px" }}>Q{auditoria.total?.toFixed(2) || "0.00"}</td>
                <td style={{ padding: "10px" }}>{auditoria.cliente}</td>
                <td style={{ padding: "10px" }}>{auditoria.correo_cliente || "-"}</td>
                <td style={{ padding: "10px" }}>{auditoria.empleado_cajero}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ padding: "10px", textAlign: "center" }}>
                No hay datos de auditoría disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
