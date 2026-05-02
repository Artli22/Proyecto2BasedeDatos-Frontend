export const secciones_Navegacion = [
  {
    id: "gestion",
    label: "Gestión",
    path: "/gestion",
    tabs: [
      { id: "clientes",  label: "Clientes",  path: "/gestion/clientes"  },
      { id: "productos", label: "Productos", path: "/gestion/productos" },
      { id: "compras",   label: "Compras",   path: "/gestion/compras"   },
    ],
  },
  {
    id: "catalogo",
    label: "Catálogo",
    path: "/catalogo",
    tabs: [
      { id: "empleados",      label: "Empleados",         path: "/catalogo/empleados"      },
      { id: "categorias",     label: "Categorías",        path: "/catalogo/categorias"     },
      { id: "proveedores",    label: "Proveedores",       path: "/catalogo/proveedores"    },
      { id: "detalleCompra", label: "Detalle de compra", path: "/catalogo/detalle-compra" },
    ],
  },
  {
    id: "reportes",
    label: "Reportes",
    path: "/reportes",
    tabs: [
      { id: "auditoria",    label: "Auditoría completa",       path: "/reportes/auditoria"    },
      { id: "rentabilidad", label: "Rentabilidad de producto", path: "/reportes/rentabilidad" },
      { id: "desempeno",    label: "Desempeño de empleados",   path: "/reportes/desempeno"    },
      { id: "stockCritico",        label: "Control de stock crítico", path: "/reportes/stock"        },
    ],
  },
]