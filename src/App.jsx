import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import Formato from "./formatoApp"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Formato />,
    children: [
      { index: true, element: <Navigate to="/gestion/clientes" replace /> },

      { path: "gestion/clientes",  element: <div>Página Clientes</div>  },
      { path: "gestion/productos", element: <div>Página Productos</div> },
      { path: "gestion/compras",   element: <div>Página Compras</div>   },

      { path: "catalogo/empleados",      element: <div>Página Empleados</div>       },
      { path: "catalogo/categorias",     element: <div>Página Categorías</div>      },
      { path: "catalogo/proveedores",    element: <div>Página Proveedores</div>     },
      { path: "catalogo/detalle-compra", element: <div>Página Detalle Compra</div>  },

      { path: "reportes/auditoria",    element: <div>Página Auditoría</div>              },
      { path: "reportes/rentabilidad", element: <div>Página Rentabilidad</div>           },
      { path: "reportes/desempeno",    element: <div>Página Desempeño de empleados</div> },
      { path: "reportes/stock",        element: <div>Página Stock crítico</div>          },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}