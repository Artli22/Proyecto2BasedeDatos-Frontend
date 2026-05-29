import { Navigate, Outlet } from 'react-router-dom';
import { loginServicio } from '../servicios/loginServicio';

export const ProtectedRoute = ({ requiredRoles }) => {
  const userRol = loginServicio.obtenerRol();

  if (!userRol) {
    return <Navigate to="/" replace />;
  }


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
      </div>
    );
  }

  return <Outlet />;
};
