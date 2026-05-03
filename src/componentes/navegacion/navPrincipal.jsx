import { NavLink } from "react-router-dom"
import { secciones_Navegacion } from "../../navConfiguracion"
import logo from "../../img/Buy_n_Large_Logo.png"

export default function TopNav() {
  return (
    <header style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.75rem 1.5rem", borderBottom: "2px solid #D0192B", backgroundColor: "#1A2A5E" }}>
      <img 
        src={logo} 
        alt="Auditoria App Logo" 
        style={{ height: "45px", width: "auto", marginRight: "0.5rem" }} 
      />
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
              color: isActive ? "#D0192B" : "#ffffff",
              backgroundColor: isActive ? "#e8edf7" : "transparent",
            })}
          >
            {section.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}