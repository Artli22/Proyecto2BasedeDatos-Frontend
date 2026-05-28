
export const rolesPermiso = {

  "gestion": {
    "clientes":  ["administrador", "gerente", "vendedor", "auditor"],
    "empleados": ["administrador", "gerente", "recursohumano", "auditor"],
    "productos": ["administrador", "gerente", "vendedor", "auditor"],
    "compras":   ["administrador", "gerente", "vendedor", "auditor"],
  },

  "catalogo": {
    "categorias":   ["administrador", "gerente", "vendedor", "auditor"],
    "proveedores":  ["administrador", "gerente", "auditor"],
    "detalleCompra":["administrador", "gerente", "vendedor", "auditor"]
  },

  "reportes": {
    "auditoria":   ["administrador", "gerente", "auditor"],
    "rentabilidad":["administrador", "gerente", "auditor"],
    "desempeno":   ["administrador", "gerente", "recursohumano", "auditor"],
    "stock":       ["administrador", "gerente", "vendedor", "auditor"]
  }
};

export const obtenerRolesPermitidos = (seccion, subseccion) => {
  return rolesPermiso[seccion]?.[subseccion] || [];
};

export const tieneAcceso = (rol, seccion, subseccion) => {
  const rolesPermitidos = obtenerRolesPermitidos(seccion, subseccion);
  return rolesPermitidos.includes(rol);
};
