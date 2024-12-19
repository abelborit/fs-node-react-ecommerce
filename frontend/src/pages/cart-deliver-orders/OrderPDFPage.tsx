import { useLocation, useNavigate } from "react-router-dom";
import { OrderPDFContent } from "../../components/OrderPDFContent";
import { useEffect } from "react";

export const OrderPDFPage = () => {
  /* acceder a los datos que se pasaron desde una página anterior, donde el valor de state será lo que se pasó desde la página anterior. El hook useLocation() obtiene información sobre la ubicación de la página actual, incluidas las propiedades de la navegación, como el estado (state). */
  const { state } = useLocation();
  const { order, currency } = state;
  const navigate = useNavigate();

  useEffect(() => {
    // Cambiar el estilo de la página para impresión horizontal
    const printStyle = document.createElement("style");
    printStyle.innerHTML = `
      @media print {
        @page {
          size: landscape;
        }
      }
    `;
    document.head.appendChild(printStyle);

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
