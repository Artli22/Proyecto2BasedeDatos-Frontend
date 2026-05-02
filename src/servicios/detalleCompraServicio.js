const URL_BASE = "http://localhost:8080"

export const detalleCompraServicio = {
  obtenerTodos: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/detalle-compra`)
      if (!respuesta.ok) throw new Error("Error al obtener detalles de compra")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  obtenerPorID: async (id) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/detalle-compra/detalle?id=${id}`)
      if (!respuesta.ok) throw new Error("Error al obtener detalle de compra")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  crear: async (datos) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/detalle-compra`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })
      if (!respuesta.ok) throw new Error("Error al crear detalle de compra")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  actualizar: async (id, datos) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/detalle-compra/detalle?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })
      if (!respuesta.ok) throw new Error("Error al actualizar detalle de compra")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  eliminar: async (id) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/detalle-compra/detalle?id=${id}`, {
        method: "DELETE",
      })
      if (!respuesta.ok) throw new Error("Error al eliminar detalle de compra")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
