import { Outlet } from "react-router-dom";
import Principal from "./componentes/navegacion/navPrincipal";
import Subsecciones from "./componentes/navegacion/navSubsecciones";

export default function AppLayout() {
  return (
    <div className="formato-app">
      <Principal />
      <Subsecciones />
      <main className="formato-app__contenido">
        <Outlet />
      </main>
    </div>
  );
}