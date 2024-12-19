import { useState } from "react";
import { TitleComponent } from "../../components/TitleComponent";
import { OrdersProductsTracking } from "../../components/OrdersProductsTracking";
import { useBuyProductsLocalStorage } from "../../hooks/useBuyProductsLocalStorage";
import { useShopContext } from "../../context/shopContext/ShopContext";
import { OrderFormTotalCartTracking } from "../../components/OrderFormTotalCartTracking";
import { OrderPreviewModal } from "../../components/OrderPreviewModal";
import { CartDataInterface } from "../../context/shopContext/ShopProvider";
import { FormDeliveryInterface } from "../../constants/initialFormDelivery";
import { useNavigate } from "react-router-dom";

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
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderInterface | null>(
    null
  );
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

    return {
      date, // Fecha (YYYY-MM-DD)
      time, // Hora local
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

  const handlePreviewPDF = (order: OrderInterface) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const navigate = useNavigate();

  const handlePrint = (order: OrderInterface) => {
    navigate("/order-pdf", { state: { order, currency } });
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
                <div className="my-2 flex gap-4 justify-center">
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      handlePrint(order);
                    }}
                    className={`px-4 py-2 rounded-lg border border-slate-700 text-gray-700 hover:bg-slate-500 hover:text-white hover:border-slate-500`}
                  >
                    Preview & Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de previsualización */}
      {selectedOrder && (
        <OrderPreviewModal
          order={selectedOrder}
          currency={currency}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
