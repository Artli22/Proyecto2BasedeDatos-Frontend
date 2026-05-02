const URL_BASE = "http://localhost:8080"

// Empleados: solo lectura en el backend
export const empleadosServicio = {
  obtenerTodos: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/empleados`)
      if (!respuesta.ok) throw new Error("Error al obtener empleados")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  obtenerPorID: async (id) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/empleados/detalle?id=${id}`)
      if (!respuesta.ok) throw new Error("Error al obtener empleado")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
