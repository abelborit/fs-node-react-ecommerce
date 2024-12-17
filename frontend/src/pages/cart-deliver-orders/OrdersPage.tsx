import { useState } from "react";
import { TitleComponent } from "../../components/TitleComponent";
import { OrdersProductsTracking } from "../../components/OrdersProductsTracking";
import { useBuyProductsLocalStorage } from "../../hooks/useBuyProductsLocalStorage";
import { useShopContext } from "../../context/shopContext/ShopContext";
import { OrderFormTotalCartTracking } from "../../components/OrderFormTotalCartTracking";

export const OrdersPage = () => {
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  const { purchaseShopState } = useBuyProductsLocalStorage();
  const { currency } = useShopContext();

  /* convertir el objeto de compras a un array para mapearlo */
  const orders = Object.entries(purchaseShopState).map(([date, data]) => ({
    date,
    ...data,
  }));

  const toggleOrderDetails = (index: number) => {
    setExpandedOrders((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const expandAllOrders = () => setExpandedOrders(orders.map((_, i) => i));

  const collapseAllOrders = () => setExpandedOrders([]);

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
              : " border border-slate-700 text-gray-700 hover:bg-slate-500 hover:text-white hover:border-slate-500"
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
              key={order.date}
              className="border rounded-lg shadow-md bg-white overflow-hidden"
            >
              {/* Encabezado del desplegable */}
              <button
                onClick={() => toggleOrderDetails(index)}
                className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
              >
                <span className="font-semibold">{order.date}</span>
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
