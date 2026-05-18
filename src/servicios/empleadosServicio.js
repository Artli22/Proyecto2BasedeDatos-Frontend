const URL_BASE = "http://localhost:8080"

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

  crear: async (datos) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/empleados`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })
      if (!respuesta.ok) throw new Error("Error al crear empleado")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  actualizar: async (id, datos) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/empleados/detalle?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })
      if (!respuesta.ok) throw new Error("Error al actualizar empleado")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  eliminar: async (id) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/empleados/detalle?id=${id}`, {
        method: "DELETE",
      })
      if (!respuesta.ok) throw new Error("Error al eliminar empleado")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
