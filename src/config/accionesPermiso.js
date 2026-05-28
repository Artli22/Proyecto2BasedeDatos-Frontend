export const accionesPermiso = {

  cliente: {
    administrador: { acciones: ["ver", "crear", "editar", "eliminar"], columnasBloqueadas: [] },
    gerente:       { acciones: ["ver"],                                 columnasBloqueadas: [] },
    vendedor:      { acciones: ["ver"],                                 columnasBloqueadas: ["correo", "telefono"] },
    recursohumano: null, 
    auditor:       { acciones: ["ver"],                                 columnasBloqueadas: [] },
  },

  empleado: {
    administrador:  { acciones: ["ver", "crear", "editar", "eliminar"], columnasBloqueadas: [] },
    gerente:        { acciones: ["ver"],                                 columnasBloqueadas: [] },
    vendedor:       null, 
    recursohumano:  { acciones: ["ver", "crear", "editar", "eliminar"], columnasBloqueadas: [] },
    auditor:        { acciones: ["ver"],                                 columnasBloqueadas: [] },
  },

  producto: {
    administrador: { acciones: ["ver", "crear", "editar", "eliminar"], columnasBloqueadas: [] },
    gerente:       { acciones: ["ver", "editar"],                       columnasBloqueadas: [] },
    vendedor:      { acciones: ["ver"],                                 columnasBloqueadas: ["id_proveedor"] },
    recursohumano: null, 
    auditor:       { acciones: ["ver"],                                 columnasBloqueadas: [] },
  },

  compra: {
    administrador: { acciones: ["ver", "crear", "editar", "eliminar"], columnasBloqueadas: [] },
    gerente:       { acciones: ["ver", "editar"],                       columnasBloqueadas: ["total", "num_factura"] },
    vendedor:      { acciones: ["ver", "crear"],                        columnasBloqueadas: [] },
    recursohumano: null, 
    auditor:       { acciones: ["ver"],                                 columnasBloqueadas: [] },
  },

  categoria: {
    administrador: { acciones: ["ver"], columnasBloqueadas: [] },
    gerente:       { acciones: ["ver"], columnasBloqueadas: [] },
    vendedor:      { acciones: ["ver"], columnasBloqueadas: [] },
    recursohumano: null, 
    auditor:       { acciones: ["ver"], columnasBloqueadas: [] },
  },

  proveedor: {
    administrador: { acciones: ["ver"], columnasBloqueadas: [] },
    gerente:       { acciones: ["ver"], columnasBloqueadas: [] },
    vendedor:      null, 
    recursohumano: null, 
    auditor:       { acciones: ["ver"], columnasBloqueadas: [] },
  },

  detalleCompra: {
    administrador: { acciones: ["ver"], columnasBloqueadas: [] },
    gerente:       { acciones: ["ver"], columnasBloqueadas: [] },
    vendedor:      { acciones: ["ver"], columnasBloqueadas: [] },
    recursohumano: null, 
    auditor:       { acciones: ["ver"], columnasBloqueadas: [] },
  },

  auditoria: {
    administrador: { acciones: ["ver"], columnasBloqueadas: [] },
    gerente:       { acciones: ["ver"], columnasBloqueadas: [] },
    vendedor:      null, 
    recursohumano: null, 
    auditor:       { acciones: ["ver"], columnasBloqueadas: [] },
  },

  rentabilidad: {
    administrador: { acciones: ["ver"], columnasBloqueadas: [] },
    gerente:       { acciones: ["ver"], columnasBloqueadas: [] },
    vendedor:      null, 
    recursohumano: null, 
    auditor:       { acciones: ["ver"], columnasBloqueadas: [] },
  },

  stockCritico: {
    administrador: { acciones: ["ver"], columnasBloqueadas: [] },
    gerente:       { acciones: ["ver"], columnasBloqueadas: [] },
    vendedor:      { acciones: ["ver"], columnasBloqueadas: [] },
    recursohumano: null, 
    auditor:       { acciones: ["ver"], columnasBloqueadas: [] },
  },

  desempeno: {
    administrador: { acciones: ["ver"], columnasBloqueadas: [] },
    gerente:       { acciones: ["ver"], columnasBloqueadas: [] },
    vendedor:      null, 
    recursohumano: { acciones: ["ver"], columnasBloqueadas: [] },
    auditor:       { acciones: ["ver"], columnasBloqueadas: [] },
  },
};

export const obtenerPermisos = (tabla, rol) => {
  return accionesPermiso[tabla]?.[rol] ?? { acciones: [], columnasBloqueadas: [] };
};

export const puedeHacer = (tabla, rol, accion) => {
  const permisos = obtenerPermisos(tabla, rol);
  return permisos?.acciones?.includes(accion) ?? false;
};

export const columnaVisible = (tabla, rol, columna) => {
  const permisos = obtenerPermisos(tabla, rol);
  return !permisos?.columnasBloqueadas?.includes(columna) ?? true;
};
