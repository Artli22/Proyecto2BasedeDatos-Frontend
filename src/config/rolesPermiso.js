
export const rolesPermiso = {
  // GESTIÓN
  "gestion": {
    "clientes": ["administrador", "auditor", "gerente", "vendedor"],
    "empleados": ["administrador", "auditor", "gerente", "recursohumano"],
    "productos": ["administrador", "auditor", "gerente", "vendedor"],
    "compras": ["administrador", "auditor", "gerente", "vendedor"],
  },

  // CATÁLOGO
  "catalogo": {
    "categorias": ["administrador", "auditor", "gerente", "vendedor"],
    "proveedores": ["administrador", "auditor", "gerente"],
    "detalleCompra": ["administrador", "auditor", "gerente", "vendedor"]
  },

  // REPORTES
  "reportes": {
    "auditoria": ["administrador", "auditor"],
    "rentabilidad": ["administrador", "auditor", "gerente"],
    "desempeno": ["administrador", "auditor", "recursohumano"],
    "stock": ["administrador", "auditor", "gerente", "vendedor", "recursohumano"]
  }
};

/**
 * Obtener roles permitidos para una ruta
 * @param {string} seccion - ej: "gestion"
 * @param {string} subseccion - ej: "empleados"
 * @returns {array} Array de roles permitidos
 */
export const obtenerRolesPermitidos = (seccion, subseccion) => {
  return rolesPermiso[seccion]?.[subseccion] || [];
};

/**
 * Verificar si un rol tiene acceso a una sección
 * @param {string} rol - Rol del usuario
 * @param {string} seccion - ej: "gestion"
 * @param {string} subseccion - ej: "empleados"
 * @returns {boolean} True si tiene acceso
 */
export const tieneAcceso = (rol, seccion, subseccion) => {
  const rolesPermitidos = obtenerRolesPermitidos(seccion, subseccion);
  return rolesPermitidos.includes(rol);
};
