import { Navigate, Outlet } from 'react-router-dom';
import { loginServicio } from '../servicios/loginServicio';

export const ProtectedRoute = ({ requiredRoles }) => {
  // Obtener rol del usuario actual
  const userRol = loginServicio.obtenerRol();

  // Si no hay rol, usuario no autenticado
  if (!userRol) {
    return <Navigate to="/" replace />;
  }

  // Verificar si el rol actual está en los roles permitidos
  const isAuthorized = requiredRoles.includes(userRol);

  if (!isAuthorized) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1A2A5E',
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1>Acceso Denegado</h1>
        <p>Tu rol ({userRol}) no tiene permisos para acceder a esta sección.</p>
        <p>Contacta al administrador si crees que es un error.</p>
      </div>
    );
  }

  // Si está autorizado, renderizar las rutas hijas
  return <Outlet />;
};
