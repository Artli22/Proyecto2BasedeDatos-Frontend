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
}
