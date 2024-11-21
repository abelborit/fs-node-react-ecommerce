import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  /* Manipular la URL para asegurarse de que el path sea la raiz "/" ya que como se está usando el createHashRouter "#" entonces habría problemas como, por ejemplo, podría aparecer cosas antes del hash como http://localhost:5173/otracosa#/dashboard/home en vez de directamente el hash como http://localhost:5173/#/dashboard/home al redirigir cuando se entra a la ruta raiz */
  if (window.location.pathname !== "/") {
    /* establecer que el pathname solo sea con "/" para evitar palabras antes del hash */
    window.location.pathname = "/";
  }

  return <RouterProvider router={router} />;
}

export default App;
