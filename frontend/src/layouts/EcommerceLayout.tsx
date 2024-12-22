import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SearchBar } from "../components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormUserContext } from "../context/formUserContext/FormUserContext";
import { useEffect } from "react";

export const EcommerceLayout = () => {
  const navigate = useNavigate();

  const { userInfo } = useFormUserContext();

  useEffect(() => {
    if (userInfo.isAuthenticated) {
      return navigate("/home");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    /* se están colocando estilos para que si es poco contenido o si es bastante contenido entonces el header y footer se queden arriba y abajo respectivamente (en el extremo superior e inferior) y el contenido del centro se amolde al espacio sobrante */
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex flex-col min-h-screen">
      <ToastContainer />

      <header>
        <Navbar />
        <SearchBar />
      </header>

      <main className="flex flex-grow container mx-auto">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
