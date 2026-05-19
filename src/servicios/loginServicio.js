const URL_BASE = "http://localhost:8080"

export const loginServicio = {
  login: async (usuario, contraseña) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contraseña }),
      })
      if (!respuesta.ok) throw new Error("Credenciales inválidas")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  guardarToken: (token) => {
    localStorage.setItem("token", token)
    localStorage.setItem("usuario", JSON.parse(atob(token.split('.')[1])).usuario)
    // Limpiar el prefijo "rol_" y normalizar a minúsculas
    const rolCompleto = JSON.parse(atob(token.split('.')[1])).rol
    const rolLimpio = rolCompleto.replace("rol_", "").toLowerCase()
    localStorage.setItem("rol", rolLimpio)
  },

  obtenerToken: () => {
    return localStorage.getItem("token")
  },

  obtenerUsuario: () => {
    return localStorage.getItem("usuario")
  },

  obtenerRol: () => {
    const rol = localStorage.getItem("rol")
    return rol ? rol.replace("rol_", "").toLowerCase() : ""
  },

  cerrarSesion: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    localStorage.removeItem("rol")
  },

  estaAutenticado: () => {
    return localStorage.getItem("token") !== null
  },
}
