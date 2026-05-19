import { useState } from "react"
import { loginServicio } from "./servicios/loginServicio"

export default function Login({ onLoginSuccess }) {
  const [usuario, setUsuario] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)
    setCargando(true)

    try {
      const response = await loginServicio.login(usuario, contraseña)
      loginServicio.guardarToken(response.data.token)
      onLoginSuccess()
    } catch (err) {
      setError("Usuario o contraseña incorrectos")
    } finally {
      setCargando(false)
    }
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#1A2A5E",
      fontFamily: "Arial, sans-serif",
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
      }}>
        <h1 style={{
          textAlign: "center",
          color: "#1A2A5E",
          marginBottom: "30px",
          fontSize: "28px",
        }}>
          Bienvenidos
        </h1>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}>
              Usuario
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ingresa tu usuario"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
                fontSize: "14px",
              }}
              disabled={cargando}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}>
              Contraseña
            </label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Ingresa tu contraseña"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
                fontSize: "14px",
              }}
              disabled={cargando}
            />
          </div>

          {error && (
            <div style={{
              marginBottom: "20px",
              padding: "10px",
              backgroundColor: "#fee",
              color: "#c33",
              borderRadius: "4px",
              textAlign: "center",
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={cargando}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#D0192B",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: cargando ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              opacity: cargando ? 0.7 : 1,
            }}
          >
            {cargando ? "Cargando..." : "Continuar"}
          </button>
        </form>

        <div style={{
          marginTop: "20px",
          fontSize: "12px",
          color: "#666",
          textAlign: "center",
        }}>
          <p><strong>Usuarios de prueba:</strong></p>
          <p>administrador1 / admin1</p>
          <p>gerente1 / gerente1</p>
          <p>vendedor1 / vendedor1</p>
          <p>recursoh1 / recursoh1</p>
          <p>auditor1 / auditor1</p>
        </div>
      </div>
    </div>
  )
}
