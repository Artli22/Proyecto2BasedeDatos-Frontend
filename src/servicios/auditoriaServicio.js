const URL_BASE = "http://localhost:8080"

export const auditoriaServicio = {
  obtenerTodos: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/reportes/auditoria-ventas`)
      if (!respuesta.ok) throw new Error("Error al obtener auditoría de ventas")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
