import { NavLink, useLocation } from "react-router-dom"
import {secciones_Navegacion } from "../../navConfiguracion"

export default function SectionTabs() {
  const { pathname } = useLocation()

  const seccionActual = secciones_Navegacion.find((s) => pathname.startsWith(s.path))

  if (!seccionActual) return null

  return (
    <nav style={{ display: "flex", gap: "0.25rem", padding: "0.5rem 1.5rem", borderBottom: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
      {seccionActual.tabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          style={({ isActive }) => ({
            padding: "0.3rem 0.85rem",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: isActive ? 600 : 400,
            color: isActive ? "#1d4ed8" : "#6b7280",
            backgroundColor: isActive ? "#eff6ff" : "transparent",
          })}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}