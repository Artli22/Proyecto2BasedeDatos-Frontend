import { useEffect, useState } from "react"
import { reportesServicio } from "../../servicios/reportesServicio"

export default function ClienteHistorial({ clienteId, nombreCliente, onCerrar }) {
  const [historial, setHistorial] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarHistorial()
  }, [clienteId])

  const cargarHistorial = async () => {
    try {
      setCargando(true)
      const datos = await reportesServicio.obtenerClienteConHistorial(clienteId)
      setHistorial(datos.data || datos)
      setError(null)
    } catch (err) {
      setError(err.message)
      setHistorial(null)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div style={{
      marginTop: "40px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      border: "2px solid #1A2A5E"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>Historial de {nombreCliente}</h2>
        <button
          onClick={onCerrar}
          style={{
            backgroundColor: "#666",
            color: "white",
            border: "none",
            padding: "5px 15px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Cerrar
        </button>
      </div>

      {error && (
        <div style={{ padding: "10px", backgroundColor: "#fee", color: "#c33", borderRadius: "3px", marginBottom: "20px" }}>
          Error: {error}
        </div>
      )}

      {cargando ? (
        <div>Cargando historial...</div>
      ) : historial ? (
        <>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginBottom: "20px"
          }}>
            <div style={{
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "5px",
              border: "1px solid #ddd"
            }}>
              <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}>Nombre</p>
              <p style={{ margin: "0", fontSize: "16px", fontWeight: "bold" }}>{historial.nombre_cliente}</p>
            </div>
            <div style={{
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "5px",
              border: "1px solid #ddd"
            }}>
              <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}>Teléfono</p>
              <p style={{ margin: "0", fontSize: "16px", fontWeight: "bold" }}>{historial.telefono_cliente || "-"}</p>
            </div>
            <div style={{
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "5px",
              border: "1px solid #ddd"
            }}>
              <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}>Correo</p>
              <p style={{ margin: "0", fontSize: "16px", fontWeight: "bold" }}>{historial.correo_cliente || "-"}</p>
            </div>
            <div style={{
              padding: "15px",
              backgroundColor: "#e8f4f8",
              borderRadius: "5px",
              border: "1px solid #1A2A5E"
            }}>
              <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}>Total Compras</p>
              <p style={{ margin: "0", fontSize: "20px", fontWeight: "bold", color: "#1A2A5E" }}>{historial.total_compras}</p>
            </div>
            <div style={{
              padding: "15px",
              backgroundColor: "#fef3e8",
              borderRadius: "5px",
              border: "1px solid #D0192B"
            }}>
              <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}>Monto Total Gastado</p>
              <p style={{ margin: "0", fontSize: "20px", fontWeight: "bold", color: "#D0192B" }}>Q{(historial.monto_total_gastado || 0).toFixed(2)}</p>
            </div>
          </div>

          {historial?.mensaje && (
            <div style={{
              padding: "10px",
              backgroundColor: "#e8f4f8",
              borderLeft: "4px solid #1A2A5E",
              borderRadius: "3px"
            }}>
              <strong>{historial.mensaje}</strong>
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}
