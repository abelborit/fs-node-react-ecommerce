import { useLocation, useNavigate } from "react-router-dom";
import { OrderPDFContent } from "../../components/OrderPDFContent";
import { useEffect } from "react";

export const OrderPDFPage = () => {
  const { state } = useLocation();
  const { order, currency } = state;
  const navigate = useNavigate();

  useEffect(() => {
    // Abrir las herramientas de impresión
    const handlePrint = () => {
      window.print();

      // Monitorear si las herramientas de impresión se cierran
      const interval = setInterval(() => {
        if (document.visibilityState === "visible") {
          clearInterval(interval); // Limpiar el intervalo
          navigate("/orders"); // Redirigir a la página de órdenes
        }
      }, 100);
    };

    // Llamar a la función de impresión con un pequeño retraso
    setTimeout(handlePrint, 100);
  }, [navigate]);

  return (
    <div className="py-5 sm:py-10 border-t w-full">
      <OrderPDFContent order={order} currency={currency} />
    </div>
  );
};
