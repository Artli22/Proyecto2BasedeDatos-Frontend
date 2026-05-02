const URL_BASE = "http://localhost:8080"

export const clientesServicio = {
  obtenerTodos: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/clientes`)
      if (!respuesta.ok) throw new Error("Error al obtener clientes")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  obtenerPorID: async (id) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/clientes/detalle?id=${id}`)
      if (!respuesta.ok) throw new Error("Error al obtener cliente")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  crear: async (datos) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })
      if (!respuesta.ok) throw new Error("Error al crear cliente")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  actualizar: async (id, datos) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/clientes/detalle?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })
      if (!respuesta.ok) throw new Error("Error al actualizar cliente")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  eliminar: async (id) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/clientes/detalle?id=${id}`, {
        method: "DELETE",
      })
      if (!respuesta.ok) throw new Error("Error al eliminar cliente")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
