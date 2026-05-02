const URL_BASE = "http://localhost:8080"

// Proveedores: solo lectura en el backend
export const proveedoresServicio = {
  obtenerTodos: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/proveedores`)
      if (!respuesta.ok) throw new Error("Error al obtener proveedores")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  obtenerPorID: async (id) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/proveedores/detalle?id=${id}`)
      if (!respuesta.ok) throw new Error("Error al obtener proveedor")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
