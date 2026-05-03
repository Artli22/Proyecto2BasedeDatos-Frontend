import { useEffect, useState } from "react"
import { clientesServicio } from "../../servicios/clientesServicio"

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [editando, setEditando] = useState(null)
  const [creando, setCreando] = useState(false)
  const [formData, setFormData] = useState({ nombre: "", telefono: "", correo: "", activo: true })

  useEffect(() => {
    cargarClientes()
  }, [])

  const cargarClientes = async () => {
    try {
      setCargando(true)
      const datos = await clientesServicio.obtenerTodos()
      setClientes(datos.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  const handleEditar = (cliente) => {
    setCreando(false)
    setEditando(cliente.id_cliente)
    setFormData({
      nombre: cliente.nombre,
      telefono: cliente.telefono || "",
      correo: cliente.correo || "",
      activo: cliente.activo,
    })
  }

  const handleCrear = () => {
    setCreando(true)
    setEditando(null)
    setFormData({ nombre: "", telefono: "", correo: "", activo: true })
  }

  const handleCancelar = () => {
    setEditando(null)
    setCreando(false)
    setFormData({ nombre: "", telefono: "", correo: "", activo: true })
  }

  const handleGuardar = async () => {
    if (!formData.nombre.trim()) {
      alert("El nombre es requerido")
      return
    }
    try {
      if (creando) {
        const response = await clientesServicio.crear(formData)
        setClientes([...clientes, response.data])
      } else {
        await clientesServicio.actualizar(editando, formData)
        setClientes(
          clientes.map((c) =>
            c.id_cliente === editando ? { ...c, ...formData } : c
          )
        )
      }
      handleCancelar()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleToggleActivo = async (cliente) => {
    const nuevoEstado = !cliente.activo
    const accion = nuevoEstado ? "activar" : "desactivar"
    if (!confirm(`¿Seguro de ${accion} este cliente?`)) return
    try {
      await clientesServicio.actualizar(cliente.id_cliente, { 
        ...cliente, 
        activo: nuevoEstado 
      })
      setClientes(
        clientes.map((c) =>
          c.id_cliente === cliente.id_cliente ? { ...c, activo: nuevoEstado } : c
        )
      )
    } catch (err) {
      setError(err.message)
    }
  }

  if (cargando) return <div>Cargando...</div>
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>

  return (
    <div style={{ padding: "20px" }}>
      <h1>Clientes</h1>
      <button
        onClick={handleCrear}
        style={{
          backgroundColor: "#10b981",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        + Crear Nuevo Cliente
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd", backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Nombre</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Teléfono</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Correo</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Activo</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <tr key={cliente.id_cliente} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{cliente.id_cliente}</td>
                <td style={{ padding: "10px" }}>{cliente.nombre}</td>
                <td style={{ padding: "10px" }}>{cliente.telefono || "-"}</td>
                <td style={{ padding: "10px" }}>{cliente.correo || "-"}</td>
                <td style={{ padding: "10px" }}>
                  <span style={{ color: cliente.activo ? "green" : "red" }}>
                    {cliente.activo ? "✓" : "✗"}
                  </span>
                </td>
                <td style={{ padding: "10px", display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => handleEditar(cliente)}
                    style={{
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleToggleActivo(cliente)}
                    style={{
                      backgroundColor: cliente.activo ? "#dc2626" : "#10b981",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {cliente.activo ? "Desactivar" : "Activar"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: "10px", textAlign: "center" }}>
                No hay clientes registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {(editando || creando) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "500px",
              width: "90%",
            }}
          >
            <h2>{creando ? "Crear Cliente" : "Editar Cliente"}</h2>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Nombre
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Teléfono
              </label>
              <input
                type="text"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Correo
              </label>
              <input
                type="email"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={formData.activo}
                  onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                />
                <span>Activo</span>
              </label>
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={handleCancelar}
                style={{
                  backgroundColor: "#6b7280",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardar}
                style={{
                  backgroundColor: "#10b981",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
