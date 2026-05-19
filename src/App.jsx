import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Formato from "./formatoApp"
import Login from "./Login"
import { loginServicio } from "./servicios/loginServicio"
import { ProtectedRoute } from "./componentes/ProtectedRoute"
import Clientes from "./paginas/gestion/clientes"
import Empleados from "./paginas/gestion/empleados"
import Productos from "./paginas/gestion/productos"
import Compras from "./paginas/gestion/compras"
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

      // ========== GESTIÓN ==========
      // Clientes: Todos excepto RH
      {
        element: <ProtectedRoute requiredRoles={["administrador", "auditor", "gerente", "vendedor"]} />,
        children: [
          { path: "gestion/clientes", element: <Clientes /> },
        ]
      },

      // Empleados: Admin, Auditor, Gerente, RH
      {
        element: <ProtectedRoute requiredRoles={["administrador", "auditor", "gerente", "recursohumano"]} />,
        children: [
          { path: "gestion/empleados", element: <Empleados /> },
        ]
      },

      // Productos: Admin, Auditor, Gerente, Vendedor
      {
        element: <ProtectedRoute requiredRoles={["administrador", "auditor", "gerente", "vendedor"]} />,
        children: [
          { path: "gestion/productos", element: <Productos /> },
        ]
      },

      // Compras: Admin, Auditor, Gerente, Vendedor
      {
        element: <ProtectedRoute requiredRoles={["administrador", "auditor", "gerente", "vendedor"]} />,
        children: [
          { path: "gestion/compras", element: <Compras /> },
        ]
      },

      // ========== CATÁLOGO ==========
      // Categorías: Todos excepto RH
      {
        element: <ProtectedRoute requiredRoles={["administrador", "auditor", "gerente", "vendedor"]} />,
        children: [
          { path: "catalogo/categorias", element: <Categorias /> },
        ]
      },

      // Proveedores: Admin, Auditor, Gerente (NO Vendedor, NO RH)
      {
        element: <ProtectedRoute requiredRoles={["administrador", "auditor", "gerente"]} />,
        children: [
          { path: "catalogo/proveedores", element: <Proveedores /> },
        ]
      },

      // Detalle Compra: Todos excepto RH
      {
        element: <ProtectedRoute requiredRoles={["administrador", "auditor", "gerente", "vendedor"]} />,
        children: [
          { path: "catalogo/detalleCompra", element: <DetalleCompra /> },
        ]
      },

      // ========== REPORTES ==========
      // Auditoría: Admin, Auditor
      {
        element: <ProtectedRoute requiredRoles={["administrador", "auditor"]} />,
        children: [
          { path: "reportes/auditoria", element: <Auditoria /> },
        ]
      },

      // Rentabilidad: Admin, Auditor, Gerente (NO Vendedor, NO RH)
      {
        element: <ProtectedRoute requiredRoles={["administrador", "auditor", "gerente"]} />,
        children: [
          { path: "reportes/rentabilidad", element: <Rentabilidad /> },
        ]
      },

      // Desempeño: Admin, Auditor, RH
      {
        element: <ProtectedRoute requiredRoles={["administrador", "auditor", "recursohumano"]} />,
        children: [
          { path: "reportes/desempeno", element: <Desempeno /> },
        ]
      },

      // Stock Crítico: Todos
      {
        element: <ProtectedRoute requiredRoles={["administrador", "auditor", "gerente", "vendedor", "recursohumano"]} />,
        children: [
          { path: "reportes/stock", element: <StockCritico /> },
        ]
      },
    ],
  },
])

export default function App() {
  const [autenticado, setAutenticado] = useState(false)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Normalizar rol viejo: quitar prefijo "rol_" y convertir a minúsculas
    const rolViejo = localStorage.getItem("rol")
    if (rolViejo) {
      localStorage.setItem("rol", rolViejo.replace("rol_", "").toLowerCase())
    }

    // Verificar si ya hay sesión activa
    if (loginServicio.estaAutenticado()) {
      setAutenticado(true)
    }
    setCargando(false)
  }, [])

  const handleLoginSuccess = () => {
    setAutenticado(true)
  }

  if (cargando) {
    return <div>Cargando...</div>
  }

  if (!autenticado) {
    return <Login onLoginSuccess={handleLoginSuccess} />
  }

  return <RouterProvider router={router} />
}