import { useLocation } from "react-router-dom";

export const OrderTrackingPage = () => {
  /* acceder a los datos que se pasaron desde una página anterior, donde el valor de state será lo que se pasó desde la página anterior. El hook useLocation() obtiene información sobre la ubicación de la página actual, incluidas las propiedades de la navegación, como el estado (state). */
  const { state } = useLocation();
  const { order, currency } = state;

  return (
    <div>
      <pre>{JSON.stringify({ order, currency }, null, 2)}</pre>
    </div>
  );
};
