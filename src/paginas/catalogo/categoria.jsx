import { useEffect, useState } from "react"
import { categoriasServicio } from "../../servicios/categoriasServicio"

export default function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const datos = await categoriasServicio.obtenerTodos()
      setCategorias(datos.data || [])
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
      <h1>Categorías</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd", backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Nombre</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length > 0 ? (
            categorias.map((categoria) => (
              <tr key={categoria.id_categoria} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{categoria.id_categoria}</td>
                <td style={{ padding: "10px" }}>{categoria.nombre}</td>
                <td style={{ padding: "10px" }}>{categoria.descripcion || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ padding: "10px", textAlign: "center" }}>
                No hay categorías disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
