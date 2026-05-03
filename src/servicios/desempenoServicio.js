const URL_BASE = "http://localhost:8080"

export const desempenoServicio = {
  obtenerTodos: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/reportes/desempeno-empleados`)
      if (!respuesta.ok) throw new Error("Error al obtener desempeño de empleados")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
