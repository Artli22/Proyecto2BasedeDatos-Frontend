import { NavLink, useNavigate } from "react-router-dom"
import { secciones_Navegacion } from "../../navConfiguracion"
import { loginServicio } from "../../servicios/loginServicio"
import logo from "../../img/Buy_n_Large_Logo.png"

export default function TopNav() {
  const navigate = useNavigate()
  const usuario = loginServicio.obtenerUsuario()
  const rol = loginServicio.obtenerRol()

  const handleLogout = () => {
    loginServicio.cerrarSesion()
    navigate(0) 
  }

  return (
    <header style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between",
      gap: "1rem", 
      padding: "0.75rem 1.5rem", 
      borderBottom: "2px solid #D0192B", 
      backgroundColor: "#1A2A5E" 
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ color: "white", fontSize: "0.9rem", textAlign: "right" }}>
          <div><strong>{usuario}</strong></div>
          <div style={{ fontSize: "0.8rem", color: "#ccc" }}>
            {rol ? rol.charAt(0).toUpperCase() + rol.slice(1) : ""}
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#D0192B",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "bold",
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  )
}