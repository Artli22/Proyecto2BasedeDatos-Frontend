import { NavLink } from "react-router-dom"
import { secciones_Navegacion } from "../../navConfiguracion"

export default function TopNav() {
  return (
    <header style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1.5rem", borderBottom: "1px solid #e2e8f0", backgroundColor: "#fff" }}>
      <span style={{ fontWeight: 600, fontSize: "1rem", marginRight: "1rem" }}>
        Auditoria App
      </span>
      <nav style={{ display: "flex", gap: "0.25rem" }}>
        {secciones_Navegacion.map((section) => (
          <NavLink
            key={section.id}
            to={section.tabs[0].path}
            style={({ isActive }) => ({
              padding: "0.4rem 1rem",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "#1d4ed8" : "#374151",
              backgroundColor: isActive ? "#eff6ff" : "transparent",
            })}
          >
            {section.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}