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
}
