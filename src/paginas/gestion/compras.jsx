import { useEffect, useState } from "react"
import { comprasServicio } from "../../servicios/comprasServicio"
import { clientesServicio } from "../../servicios/clientesServicio"
import { empleadosServicio } from "../../servicios/empleadosServicio"
import { productosServicio } from "../../servicios/productosServicio"
import { loginServicio } from "../../servicios/loginServicio"
import { puedeHacer, columnaVisible } from "../../config/accionesPermiso"

export default function Compras() {
  const [compras, setCompras] = useState([])
  const [clientes, setClientes] = useState([])
  const [empleados, setEmpleados] = useState([])
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [editando, setEditando] = useState(null)
  const [creando, setCreando] = useState(false)
  const [formData, setFormData] = useState({
    fecha: "",
    metodo_pago: "",
    id_cliente: 0,
    id_empleado: 0,
    productos: [],
  })
  const [itemCompra, setItemCompra] = useState({
    id_producto: 0,
    cantidad: 1,
  })

  // Permisos del usuario actual
  const rol = loginServicio.obtenerRol()
  const puedeCrear = puedeHacer("compra", rol, "crear")
  const puedeEditar = puedeHacer("compra", rol, "editar")
  const puedeEliminar = puedeHacer("compra", rol, "eliminar")
  const verTotal = columnaVisible("compra", rol, "total")
  const verNumFactura = columnaVisible("compra", rol, "num_factura")

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setCargando(true)
      const [datosCompras, datosClientes, datosEmpleados, datosProductos] = await Promise.all([
        comprasServicio.obtenerTodos(),
        clientesServicio.obtenerTodos(),
        empleadosServicio.obtenerTodos(),
        productosServicio.obtenerTodos(),
      ])
      setCompras(datosCompras.data || [])
      setClientes(datosClientes.data || [])
      setEmpleados(datosEmpleados.data || [])
      setProductos(datosProductos.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }

  const handleEditar = (compra) => {
    setCreando(false)
    setEditando(compra.id_compra)
    setFormData({
      fecha: compra.fecha,
      total: compra.total,
      metodo_pago: compra.metodo_pago,
      estado: compra.estado,
      num_factura: compra.num_factura || "",
      id_cliente: compra.id_cliente,
      id_empleado: compra.id_empleado,
    })
  }

  const handleCrear = () => {
    setCreando(true)
    setEditando(null)
    setFormData({
      fecha: "",
      metodo_pago: "",
      id_cliente: 0,
      id_empleado: 0,
      productos: [],
    })
    setItemCompra({
      id_producto: 0,
      cantidad: 1,
    })
  }

  const handleCancelar = () => {
    setEditando(null)
    setCreando(false)
    setFormData({
      fecha: "",
      metodo_pago: "",
      id_cliente: 0,
      id_empleado: 0,
      productos: [],
    })
    setItemCompra({
      id_producto: 0,
      cantidad: 1,
    })
  }

  const handleGuardar = async () => {
    if (!formData.fecha) {
      alert("La fecha es requerida")
      return
    }
    if (!formData.metodo_pago.trim()) {
      alert("El método de pago es requerido")
      return
    }
    if (formData.id_cliente === 0) {
      alert("Debe seleccionar un cliente")
      return
    }
    if (formData.id_empleado === 0) {
      alert("Debe seleccionar un empleado")
      return
    }
    
    if (creando) {
      if (formData.productos.length === 0) {
        alert("Debe agregar al menos un producto a la compra")
        return
      }
    }
    
    try {
      if (creando) {
        await comprasServicio.crear({
          fecha: formData.fecha,
          metodo_pago: formData.metodo_pago,
          id_cliente: formData.id_cliente,
          id_empleado: formData.id_empleado,
          productos: formData.productos,
        })
        // Recargar las compras para obtener todos los datos correctamente
        await cargarDatos()
      } else {
        await comprasServicio.actualizar(editando, formData)
        setCompras(
          compras.map((c) =>
            c.id_compra === editando ? { ...c, ...formData } : c
          )
        )
      }
      handleCancelar()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCancelarCompra = async (id) => {
    if (!confirm("¿Seguro de cancelar esta compra?")) return
    try {
      await comprasServicio.actualizar(id, { estado: "cancelado" })
      setCompras(
        compras.map((c) =>
          c.id_compra === id ? { ...c, estado: "cancelado" } : c
        )
      )
    } catch (err) {
      setError(err.message)
    }
  }

  const getNombreCliente = (id) => {
    return clientes.find((c) => c.id_cliente === id)?.nombre || "-"
  }

  const getNombreEmpleado = (id) => {
    return empleados.find((e) => e.id_empleado === id)?.nombre || "-"
  }

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "completado":
        return "green"
      case "cancelado":
        return "red"
      case "pendiente":
        return "orange"
      default:
        return "gray"
    }
  }

  if (cargando) return <div>Cargando...</div>
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>

  return (
    <div style={{ padding: "20px" }}>
      <h1>Compras</h1>
      {puedeCrear && (
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
          + Crear Nueva Compra
        </button>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #D0192B", backgroundColor: "#1A2A5E", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>ID</th>
            {verNumFactura && <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Factura</th>}
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Fecha</th>
            {verTotal && <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Total</th>}
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Método Pago</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Cliente</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Empleado</th>
            <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Estado</th>
            {(puedeEditar || puedeEliminar) && <th style={{ padding: "10px", textAlign: "left", color: "white" }}>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {compras.length > 0 ? (
            compras.map((compra) => (
              <tr key={compra.id_compra} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{compra.id_compra}</td>
                {verNumFactura && <td style={{ padding: "10px" }}>{compra.num_factura || "-"}</td>}
                <td style={{ padding: "10px" }}>{compra.fecha}</td>
                {verTotal && <td style={{ padding: "10px" }}>Q{compra.total.toFixed(2)}</td>}
                <td style={{ padding: "10px" }}>{compra.metodo_pago || "-"}</td>
                <td style={{ padding: "10px" }}>{getNombreCliente(compra.id_cliente)}</td>
                <td style={{ padding: "10px" }}>{getNombreEmpleado(compra.id_empleado)}</td>
                <td style={{ padding: "10px" }}>
                  <span style={{ color: getEstadoColor(compra.estado), fontWeight: "bold" }}>
                    {compra.estado}
                  </span>
                </td>
                {(puedeEditar || puedeEliminar) && (
                  <td style={{ padding: "10px", display: "flex", gap: "5px" }}>
                    {puedeEditar && (
                      <button
                        onClick={() => handleEditar(compra)}
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
                    )}
                    {puedeEliminar && compra.estado === "completado" && (
                      <button
                        onClick={() => handleCancelarCompra(compra.id_compra)}
                        style={{
                          backgroundColor: "#D0192B",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : null}
        </tbody>
      </table>

      {compras.length === 0 && (
        <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
          No se encontraron registros
        </div>
      )}

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
              maxWidth: "600px",
              width: "90%",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h2>{creando ? "Crear Nueva Compra" : "Editar Compra"}</h2>
            
            {creando ? (
              <>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={formData.fecha}
                    onChange={(evento) => setFormData({ ...formData, fecha: evento.target.value })}
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
                    Método de Pago
                  </label>
                  <input
                    type="text"
                    value={formData.metodo_pago}
                    onChange={(evento) => setFormData({ ...formData, metodo_pago: evento.target.value })}
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
                    Cliente
                  </label>
                  <select
                    value={formData.id_cliente || ""}
                    onChange={(evento) => setFormData({ ...formData, id_cliente: parseInt(evento.target.value) || 0 })}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">Seleccionar cliente</option>
                    {clientes.map((cli) => (
                      <option key={cli.id_cliente} value={cli.id_cliente}>
                        {cli.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Empleado
                  </label>
                  <select
                    value={formData.id_empleado || ""}
                    onChange={(evento) => setFormData({ ...formData, id_empleado: parseInt(evento.target.value) || 0 })}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">Seleccionar empleado</option>
                    {empleados.map((emp) => (
                      <option key={emp.id_empleado} value={emp.id_empleado}>
                        {emp.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f8f8", borderRadius: "4px" }}>
                  <h3 style={{ marginTop: 0 }}>Agregar Productos</h3>
                  
                  <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                      Producto
                    </label>
                    <select
                      value={itemCompra.id_producto || ""}
                      onChange={(evento) => setItemCompra({ ...itemCompra, id_producto: parseInt(evento.target.value) || 0 })}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="">Seleccionar producto</option>
                      {productos.length > 0 ? (
                        productos.map((prod) => (
                          <option key={prod.id_producto} value={prod.id_producto}>
                            {prod.nombre} (Stock: {prod.stock})
                          </option>
                        ))
                      ) : (
                        <option disabled>No hay productos disponibles</option>
                      )}
                    </select>
                  </div>

                  <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                      Cantidad
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={itemCompra.cantidad}
                      onChange={(evento) => setItemCompra({ ...itemCompra, cantidad: parseInt(evento.target.value) || 1 })}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (itemCompra.id_producto === 0) {
                        alert("Selecciona un producto")
                        return
                      }
                      if (formData.productos.some(p => p.id_producto === itemCompra.id_producto)) {
                        alert("Este producto ya está en la compra")
                        return
                      }
                      setFormData({
                        ...formData,
                        productos: [...formData.productos, { ...itemCompra }]
                      })
                      setItemCompra({ id_producto: 0, cantidad: 1 })
                    }}
                    style={{
                      backgroundColor: "#1A2A5E",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      width: "100%",
                      fontWeight: "bold",
                    }}
                  >
                    Agregar Producto
                  </button>

                  {formData.productos.length > 0 && (
                    <div style={{ marginTop: "15px" }}>
                      <h4 style={{ marginBottom: "10px" }}>Productos en la Compra:</h4>
                      {formData.productos.map((item, idx) => {
                        const prod = productos.find(p => p.id_producto === item.id_producto)
                        return (
                          <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", backgroundColor: "white", borderRadius: "4px", marginBottom: "8px", border: "1px solid #ddd" }}>
                            <span>{prod?.nombre} x{item.cantidad}</span>
                            <button
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  productos: formData.productos.filter((_, i) => i !== idx)
                                })
                              }}
                              style={{
                                backgroundColor: "#D0192B",
                                color: "white",
                                border: "none",
                                padding: "4px 10px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "12px",
                              }}
                            >
                              Eliminar
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ color: "#666", marginBottom: "20px" }}>
                <p><strong>Compra #{compras.find(c => c.id_compra === editando)?.id_compra}</strong></p>
                <p>Edición limitada. Para cambios significativos, cancele la compra y cree una nueva.</p>
              </div>
            )}

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
                {creando ? "Crear Compra" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
