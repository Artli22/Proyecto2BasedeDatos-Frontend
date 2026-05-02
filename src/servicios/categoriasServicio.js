const URL_BASE = "http://localhost:8080"

export const categoriasServicio = {
  obtenerTodos: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/categorias`)
      if (!respuesta.ok) throw new Error("Error al obtener categorías")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  obtenerPorID: async (id) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/categorias/detalle?id=${id}`)
      if (!respuesta.ok) throw new Error("Error al obtener categoría")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  crear: async (datos) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/categorias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })
      if (!respuesta.ok) throw new Error("Error al crear categoría")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  actualizar: async (id, datos) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/categorias/detalle?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })
      if (!respuesta.ok) throw new Error("Error al actualizar categoría")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  eliminar: async (id) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/categorias/detalle?id=${id}`, {
        method: "DELETE",
      })
      if (!respuesta.ok) throw new Error("Error al eliminar categoría")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
