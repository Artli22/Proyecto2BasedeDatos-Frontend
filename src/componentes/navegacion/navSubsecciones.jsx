import { NavLink, useLocation } from "react-router-dom"
import {secciones_Navegacion } from "../../navConfiguracion"

export default function SectionTabs() {
  const { pathname } = useLocation()

  const seccionActual = secciones_Navegacion.find((s) => pathname.startsWith(s.path))

  if (!seccionActual) return null

  return (
    <nav style={{ display: "flex", gap: "0.25rem", padding: "0.5rem 1.5rem", borderBottom: "1px solid #e8edf7", backgroundColor: "#f0f2f7" }}>
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
            color: isActive ? "#1A2A5E" : "#6b7280",
            borderBottom: isActive ? "3px solid #D0192B" : "none",
            backgroundColor: isActive ? "#e8edf7" : "transparent",
          })}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}