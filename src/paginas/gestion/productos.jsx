import { useEffect, useState } from "react"
import { productosServicio } from "../../servicios/productosServicio"
import { categoriasServicio } from "../../servicios/categoriasServicio"
import { proveedoresServicio } from "../../servicios/proveedoresServicio"

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [editando, setEditando] = useState(null)
  const [creando, setCreando] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio_actual: 0,
    stock: 0,
    activo: true,
    id_categoria: "",
    id_proveedor: "",
  })

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const [datosProductos, datosCateg, datosProveed] = await Promise.all([
        productosServicio.obtenerTodos(),
        categoriasServicio.obtenerTodos(),
        proveedoresServicio.obtenerTodos(),
      ])
      setProductos(datosProductos.data || [])
      setCategorias(datosCateg.data || [])
      setProveedores(datosProveed.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  const handleEditar = (producto) => {
    setCreando(false)
    setEditando(producto.id_producto)
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion || "",
      precio_actual: producto.precio_actual,
      stock: producto.stock,
      activo: producto.activo,
      id_categoria: producto.id_categoria,
      id_proveedor: producto.id_proveedor,
    })
  }

  const handleCrear = () => {
    setCreando(true)
    setEditando(null)
    setFormData({
      nombre: "",
      descripcion: "",
      precio_actual: 0,
      stock: 0,
      activo: true,
      id_categoria: "",
      id_proveedor: "",
    })
  }

  const handleCancelar = () => {
    setEditando(null)
    setCreando(false)
    setFormData({
      nombre: "",
      descripcion: "",
      precio_actual: 0,
      stock: 0,
      activo: true,
      id_categoria: "",
      id_proveedor: "",
    })
  }

  const handleGuardar = async () => {
    if (!formData.nombre.trim()) {
      alert("El nombre es requerido")
      return
    }
    if (formData.precio_actual <= 0) {
      alert("El precio debe ser mayor a 0")
      return
    }
    try {
      if (creando) {
        const response = await productosServicio.crear(formData)
        setProductos([...productos, response.data])
      } else {
        await productosServicio.actualizar(editando, formData)
        setProductos(
          productos.map((p) =>
            p.id_producto === editando ? { ...p, ...formData } : p
          )
        )
      }
      handleCancelar()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleToggleActivo = async (producto) => {
    const nuevoEstado = !producto.activo
    const accion = nuevoEstado ? "activar" : "desactivar"
    if (!confirm(`¿Seguro de ${accion} este producto?`)) return
    try {
      await productosServicio.actualizar(producto.id_producto, { 
        ...producto, 
        activo: nuevoEstado 
      })
      setProductos(
        productos.map((p) =>
          p.id_producto === producto.id_producto ? { ...p, activo: nuevoEstado } : p
        )
      )
    } catch (err) {
      setError(err.message)
    }
  }

  const getNombreCategoria = (id) => {
    return categorias.find((c) => c.id_categoria === id)?.nombre || "-"
  }

  const getNombreProveedor = (id) => {
    return proveedores.find((p) => p.id_proveedor === id)?.nombre || "-"
  }

  if (cargando) return <div>Cargando...</div>
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>

  return (
    <div style={{ padding: "20px" }}>
      <h1>Productos</h1>
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
        + Crear Nuevo Producto
      </button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd", backgroundColor: "#f8f8f8" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Nombre</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Precio</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Stock</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Categoría</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Proveedor</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Activo</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto.id_producto} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{producto.id_producto}</td>
                <td style={{ padding: "10px" }}>{producto.nombre}</td>
                <td style={{ padding: "10px" }}>Q{producto.precio_actual.toFixed(2)}</td>
                <td style={{ padding: "10px" }}>{producto.stock}</td>
                <td style={{ padding: "10px" }}>{getNombreCategoria(producto.id_categoria)}</td>
                <td style={{ padding: "10px" }}>{getNombreProveedor(producto.id_proveedor)}</td>
                <td style={{ padding: "10px" }}>
                  <span style={{ color: producto.activo ? "green" : "red" }}>
                    {producto.activo ? "✓" : "✗"}
                  </span>
                </td>
                <td style={{ padding: "10px", display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => handleEditar(producto)}
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
                    onClick={() => handleToggleActivo(producto)}
                    style={{
                      backgroundColor: producto.activo ? "#dc2626" : "#10b981",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {producto.activo ? "Desactivar" : "Activar"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ padding: "10px", textAlign: "center" }}>
                No hay productos registrados
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
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h2>{creando ? "Crear Producto" : "Editar Producto"}</h2>
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
                Descripción
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  minHeight: "80px",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Precio Actual
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.precio_actual}
                onChange={(e) => setFormData({ ...formData, precio_actual: parseFloat(e.target.value) })}
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
                Stock
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
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
                Categoría
              </label>
              <select
                value={formData.id_categoria}
                onChange={(e) => setFormData({ ...formData, id_categoria: parseInt(e.target.value) })}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id_categoria} value={cat.id_categoria}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Proveedor
              </label>
              <select
                value={formData.id_proveedor}
                onChange={(e) => setFormData({ ...formData, id_proveedor: parseInt(e.target.value) })}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              >
                <option value="">Seleccionar proveedor</option>
                {proveedores.map((prov) => (
                  <option key={prov.id_proveedor} value={prov.id_proveedor}>
                    {prov.nombre}
                  </option>
                ))}
              </select>
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
