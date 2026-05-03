const URL_BASE = "http://localhost:8080"

export const stockCriticoServicio = {
  obtenerTodos: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/reportes/stock-critico`)
      if (!respuesta.ok) throw new Error("Error al obtener stock crítico")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
