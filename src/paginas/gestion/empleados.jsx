import { useEffect, useState } from "react"
import { empleadosServicio } from "../../servicios/empleadosServicio"

export default function Empleados() {
  const [empleados, setEmpleados] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [editando, setEditando] = useState(null)
  const [creando, setCreando] = useState(false)
  const [formData, setFormData] = useState({ nombre: "", telefono: "", correo: "", activo: true })

  useEffect(() => {
    cargarEmpleados()
  }, [])

  const cargarEmpleados = async () => {
    try {
      setCargando(true)
      const datos = await empleadosServicio.obtenerTodos()
      setEmpleados(datos.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  const handleEditar = (empleado) => {
    setCreando(false)
    setEditando(empleado.id_empleado)
    setFormData({
      nombre: empleado.nombre,
      telefono: empleado.telefono || "",
      correo: empleado.correo || "",
      activo: empleado.activo,
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
        const response = await empleadosServicio.crear(formData)
        setEmpleados([...empleados, response.data])
      } else {
        await empleadosServicio.actualizar(editando, formData)
        setEmpleados(
          empleados.map((e) =>
            e.id_empleado === editando ? { ...e, ...formData } : e
          )
        )
      }
      handleCancelar()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleToggleActivo = async (empleado) => {
    const nuevoEstado = !empleado.activo
    const accion = nuevoEstado ? "activar" : "desactivar"
    if (!confirm(`¿Seguro de ${accion} este empleado?`)) return
    try {
      await empleadosServicio.actualizar(empleado.id_empleado, { 
        ...empleado, 
        activo: nuevoEstado 
      })
      setEmpleados(
        empleados.map((e) =>
          e.id_empleado === empleado.id_empleado ? { ...e, activo: nuevoEstado } : e
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
      <h1>Empleados</h1>
      <button
        onClick={handleCrear}
        style={{
          backgroundColor: "#D0192B",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        + Crear Nuevo Empleado
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #D0192B", backgroundColor: "#1A2A5E", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Nombre</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Teléfono</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Correo</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Activo</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.length > 0 ? (
            empleados.map((empleado) => (
              <tr key={empleado.id_empleado} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{empleado.id_empleado}</td>
                <td style={{ padding: "10px" }}>{empleado.nombre}</td>
                <td style={{ padding: "10px" }}>{empleado.telefono || "-"}</td>
                <td style={{ padding: "10px" }}>{empleado.correo || "-"}</td>
                <td style={{ padding: "10px" }}>
                  <span style={{ color: empleado.activo ? "green" : "red" }}>
                    {empleado.activo ? "✓" : "✗"}
                  </span>
                </td>
                <td style={{ padding: "10px", display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => handleEditar(empleado)}
                    style={{
                      backgroundColor: "#1A2A5E",
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
                    onClick={() => handleToggleActivo(empleado)}
                    style={{
                      backgroundColor: empleado.activo ? "#D0192B" : "#10b981",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {empleado.activo ? "Desactivar" : "Activar"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: "10px", textAlign: "center" }}>
                No hay empleados registrados
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
            <h2>{creando ? "Crear Empleado" : "Editar Empleado"}</h2>
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
                  backgroundColor: "#D0192B",
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
