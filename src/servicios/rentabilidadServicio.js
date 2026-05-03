const URL_BASE = "http://localhost:8080"

export const rentabilidadServicio = {
  obtenerTodos: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/reportes/rentabilidad-productos`)
      if (!respuesta.ok) throw new Error("Error al obtener rentabilidad de productos")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
