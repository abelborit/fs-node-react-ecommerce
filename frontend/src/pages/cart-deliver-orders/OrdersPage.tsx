import { useState } from "react";
import { TitleComponent } from "../../components/TitleComponent";
import { OrdersProductsTracking } from "../../components/OrdersProductsTracking";
import { useBuyProductsLocalStorage } from "../../hooks/useBuyProductsLocalStorage";
import { useShopContext } from "../../context/shopContext/ShopContext";
import { OrderFormTotalCartTracking } from "../../components/OrderFormTotalCartTracking";
import { CartDataInterface } from "../../context/shopContext/ShopProvider";
import { FormDeliveryInterface } from "../../constants/initialFormDelivery";
import { useNavigate } from "react-router-dom";
// import { OrderPreviewModal } from "../../components/OrderPreviewModal";

export interface OrderInterface {
  cartItems: CartDataInterface;
  getCountAmount: number;
  formDeliveryValues: FormDeliveryInterface;
  selectedMethod: string;
  shopDate: Date;
  date: string;
  time: string;
}

export const OrdersPage = () => {
  const navigate = useNavigate();
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  // const [selectedOrder, setSelectedOrder] = useState<OrderInterface | null>(
  //   null
  // );
  const { purchaseShopState } = useBuyProductsLocalStorage();
  const { currency } = useShopContext();

  /* convertir el objeto de compras a un array para mapearlo */
  const orders = Object.entries(purchaseShopState).map(([dateKey, data]) => {
    // Dividir clave en partes (a partir del tercer guión, el resto es timestamp)
    const lastHyphenIndex = dateKey.lastIndexOf("-");
    const date = dateKey.slice(0, lastHyphenIndex); // Obtener solo la fecha (YYYY-MM-DD)
    const timestamp = dateKey.slice(lastHyphenIndex + 1); // Obtener el timestamp en milisegundos

    // Convertir timestamp a hora local
    const time = new Date(parseInt(timestamp, 10)).toLocaleTimeString(
      undefined,
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Formato de 24 horas
      }
    );

    // return {
    //   date, // Fecha (YYYY-MM-DD)
    //   time, // Hora local
    //   // purchaseState: "Sending purchase request",
    //   // purchaseState: "In the process of validation",
    //   purchaseState: "Ready to ship products",
    //   ...data,
    // };

    /* se está colocando en código duro según sea el estado de la compra */
    /* NOTA: toda esta orden de compra debería venir por backend para que por frontend podamos hacer el consumo de la API correctamente y la maquetación correspondiente */
    return {
      date, // Fecha (YYYY-MM-DD)
      time, // Hora local
      purchaseState: date.includes("2024-")
        ? "Sending purchase request"
        : date.includes("2025-")
        ? "In the process of validation"
        : "Ready to ship products",
      ...data,
    };
  });

  const toggleOrderDetails = (index: number) => {
    setExpandedOrders((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const expandAllOrders = () => setExpandedOrders(orders.map((_, i) => i));

  const collapseAllOrders = () => setExpandedOrders([]);

  // const handlePreviewPDF = (order: OrderInterface) => {
  //   setSelectedOrder(order);
  // };

  // const closeModal = () => {
  //   setSelectedOrder(null);
  // };

  const handleOrderPDFPrint = (order: OrderInterface) => {
    /* se está navegando a otra página y el segundo argumento de navigate es un objeto de configuración, que tiene una propiedad state, la cual es una forma de pasar datos entre las páginas (sin tener que incluirlos en la URL) */
    navigate("/order-pdf", { state: { order, currency } });
  };

  const handleOrderTracking = (order: OrderInterface) => {
    /* se está navegando a otra página y el segundo argumento de navigate es un objeto de configuración, que tiene una propiedad state, la cual es una forma de pasar datos entre las páginas (sin tener que incluirlos en la URL) */
    navigate("/order-tracking", { state: { order, currency } });
  };

  return (
    <div className="py-5 sm:py-10 border-t w-full">
      {/* Título principal */}
      <div className="text-2xl mb-4">
        <TitleComponent firstText="MY" secondText="ORDERS" />
      </div>

      {/* Botones para expandir/colapsar */}
      <div className="mb-6 flex gap-4">
        <button
          disabled={orders.length === 0}
          onClick={expandAllOrders}
          className={`px-4 py-2 rounded-lg ${
            orders.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : " bg-slate-700 text-white hover:bg-slate-500"
          }`}
        >
          Expand All
        </button>

        <button
          disabled={orders.length === 0}
          onClick={collapseAllOrders}
          className={`px-4 py-2 rounded-lg ${
            orders.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "border border-slate-700 text-gray-700 hover:bg-slate-500 hover:text-white hover:border-slate-500"
          }`}
        >
          Collapse All
        </button>
      </div>

      {/* Lista de órdenes */}
      <div className="flex flex-col gap-6">
        {orders.length === 0 ? (
          <p className="text-gray-600 text-center text-xl">
            No orders available for now
          </p>
        ) : (
          orders.map((order, index) => (
            <div
              key={order.date + order.time}
              className="border rounded-lg shadow-md bg-white overflow-hidden"
            >
              {/* Encabezado del desplegable */}
              <button
                onClick={() => toggleOrderDetails(index)}
                className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
              >
                <div className="flex flex-row items-center justify-center gap-2">
                  {/* Fecha */}
                  <span className="font-semibold">{order.date}</span>
                  <span className="block text-sm text-gray-500">-</span>

                  {/* Hora */}
                  <span className="block text-sm text-gray-500">
                    {order.time}
                  </span>
                </div>

                <span className="text-sm text-gray-600">
                  {expandedOrders.includes(index) ? "Hide" : "Show"}
                </span>
              </button>

              {/* Detalles del pedido */}
              <div
                className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                  expandedOrders.includes(index)
                    ? "max-h-[500px] overflow-y-auto"
                    : "max-h-0"
                }`}
              >
                <div className="px-4 py-3">
                  <OrdersProductsTracking
                    cartItems={order.cartItems}
                    currency={currency}
                  />
                </div>

                <div className="px-4 py-3">
                  <OrderFormTotalCartTracking
                    formDeliveryValues={order.formDeliveryValues}
                    selectedMethod={order.selectedMethod}
                    cartItems={order.cartItems}
                    currency={currency}
                  />
                </div>

                {/* Botón para previsualizar el PDf de la orden de compra para descargar */}
                <div className="my-2 flex gap-4 justify-between px-4 py-3">
                  <button
                    onClick={() => handleOrderPDFPrint(order)}
                    className={`px-4 py-2 rounded-lg border border-slate-700 text-gray-700 hover:bg-slate-500 hover:text-white hover:border-slate-500`}
                  >
                    Preview & Download PDF
                  </button>

                  <div className="flex flex-row items-center justify-evenly gap-10">
                    <div className="flex items-center gap-2">
                      {/* este sería un estado el cual tendría que venir de backend para poder hacer seguimiento del pedido y ver si está "Enviando solicitud de compra" - "En proceso de validación" - "Listo para enviar" */}

                      {/* <p className="min-w-2 h-2 rounded-full bg-red-500"></p>
                      <p className="text-sm md:text-base">
                        Sending purchase request
                      </p> */}

                      {/* <p className="min-w-2 h-2 rounded-full bg-yellow-500"></p>
                      <p className="text-sm md:text-base">
                        In the process of validation
                      </p> */}

                      {/* <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                      <p className="text-sm md:text-base">
                        Ready to ship products
                      </p> */}

                      <p
                        className={`min-w-2 h-2 rounded-full ${
                          order.purchaseState === "Sending purchase request"
                            ? "bg-red-500"
                            : order.purchaseState ===
                              "In the process of validation"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></p>
                      <p className="text-sm md:text-base">
                        {order.purchaseState}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOrderTracking(order)}
                      className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-500"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de previsualización */}
      {/* {selectedOrder && (
        <OrderPreviewModal
          order={selectedOrder}
          currency={currency}
          onClose={closeModal}
        />
      )} */}
    </div>
  );
};
