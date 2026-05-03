import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import Formato from "./formatoApp"
import Clientes from "./paginas/gestion/clientes"
import Productos from "./paginas/gestion/productos"
import Compras from "./paginas/gestion/compras"
import Empleados from "./paginas/catalogo/empleado"
import Categorias from "./paginas/catalogo/categoria"
import Proveedores from "./paginas/catalogo/proveedores"
import DetalleCompra from "./paginas/catalogo/detalleCompra"
import Auditoria from "./paginas/reportes/auditoria"
import Rentabilidad from "./paginas/reportes/rentabilidad"
import Desempeno from "./paginas/reportes/desempeno"
import StockCritico from "./paginas/reportes/stockCritico"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Formato />,
    children: [
      { index: true, element: <Navigate to="/gestion/clientes" replace /> },

      { path: "gestion/clientes",  element: <Clientes />  },
      { path: "gestion/productos", element: <Productos /> },
      { path: "gestion/compras",   element: <Compras />   },

      { path: "catalogo/empleados",      element: <Empleados />      },
      { path: "catalogo/categorias",     element: <Categorias />     },
      { path: "catalogo/proveedores",    element: <Proveedores />    },
      { path: "catalogo/detalleCompra", element: <DetalleCompra />   },

      { path: "reportes/auditoria",    element: <Auditoria />        },
      { path: "reportes/rentabilidad", element: <Rentabilidad />     },
      { path: "reportes/desempeno",    element: <Desempeno />        },
      { path: "reportes/stock",        element: <StockCritico />     },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}