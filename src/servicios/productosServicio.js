const URL_BASE = "http://localhost:8080"

export const productosServicio = {
  obtenerTodos: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/productos`)
      if (!respuesta.ok) throw new Error("Error al obtener productos")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  obtenerPorID: async (id) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/productos/detalle?id=${id}`)
      if (!respuesta.ok) throw new Error("Error al obtener producto")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  crear: async (datos) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })
      if (!respuesta.ok) throw new Error("Error al crear producto")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  actualizar: async (id, datos) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/productos/detalle?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })
      if (!respuesta.ok) throw new Error("Error al actualizar producto")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  eliminar: async (id) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/productos/detalle?id=${id}`, {
        method: "DELETE",
      })
      if (!respuesta.ok) throw new Error("Error al eliminar producto")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
