const URL_BASE = "http://localhost:8080"

export const reportesServicio = {
  // Reporte de Auditoria de Ventas
  obtenerAuditoriaVentas: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/reportes/auditoria-ventas`)
      if (!respuesta.ok) throw new Error("Error al obtener reporte de auditoría de ventas")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  // Reporte de Rentabilidad de Productos
  obtenerRentabilidadProductos: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/reportes/rentabilidad-productos`)
      if (!respuesta.ok) throw new Error("Error al obtener reporte de rentabilidad")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  // Reporte de Stock Crítico
  obtenerStockCritico: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/reportes/stock-critico`)
      if (!respuesta.ok) throw new Error("Error al obtener reporte de stock crítico")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  // Reporte de Desempeño de Empleados
  obtenerDesempenoEmpleados: async () => {
    try {
      const respuesta = await fetch(`${URL_BASE}/reportes/desempeno-empleados`)
      if (!respuesta.ok) throw new Error("Error al obtener reporte de desempeño")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  // Resumen de Compras 
  obtenerResumenCompras: async (idCliente = null) => {
    try {
      let url = `${URL_BASE}/reportes/resumen-compras`
      if (idCliente) {
        url += `?id_cliente=${idCliente}`
      }
      const respuesta = await fetch(url)
      if (!respuesta.ok) throw new Error("Error al obtener resumen de compras")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  // Inventario Crítico 
  obtenerInventarioCritico: async (limiteStock = null) => {
    try {
      let url = `${URL_BASE}/reportes/inventario-critico`
      if (limiteStock) {
        url += `?limite_stock=${limiteStock}`
      }
      const respuesta = await fetch(url)
      if (!respuesta.ok) throw new Error("Error al obtener inventario crítico")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  // Historial de Cliente 
  obtenerClienteConHistorial: async (idCliente) => {
    try {
      const respuesta = await fetch(`${URL_BASE}/clientes/historial?id=${idCliente}`)
      if (!respuesta.ok) throw new Error("Error al obtener historial del cliente")
      return await respuesta.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
