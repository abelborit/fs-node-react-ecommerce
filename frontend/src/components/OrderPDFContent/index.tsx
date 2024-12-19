import { CartDataInterface } from "../../context/shopContext/ShopProvider";
import { FormDeliveryInterface } from "../../constants/initialFormDelivery";
import { OrdersProductsPDF } from "../OrdersProductsPDF";
import { OrderFormTotalCartPDF } from "../OrderFormTotalCartPDF";
import { TitleComponent } from "../TitleComponent";

interface OrderPDFContentProps {
  order: {
    cartItems: CartDataInterface;
    getCountAmount: number;
    formDeliveryValues: FormDeliveryInterface;
    selectedMethod: string;
    shopDate: Date;
    date: string;
    time: string;
  };
  currency: string;
}

export const OrderPDFContent = ({ order, currency }: OrderPDFContentProps) => {
  return (
    <div className="py-5 border-t w-full">
      {/* Título principal */}
      <div className="text-3xl flex items-center justify-center">
        <h2>- FOREVER -</h2>
      </div>

      <div className="text-lg mb-2 flex">
        <TitleComponent firstText="MY" secondText="ORDERS" />
      </div>

      {/* Lista de órdenes */}
      <div className="flex flex-col gap-6">
        <div
          key={order.date + order.time}
          className="border rounded-lg shadow-md bg-white overflow-hidden"
        >
          {/* Encabezado del desplegable */}
          <div className="w-full text-left px-4 py-3 bg-gray-100 flex justify-between items-center">
            <div className="flex flex-row items-center justify-center gap-2">
              {/* Fecha */}
              <span className="font-semibold">{order.date}</span>
              <span className="block text-sm text-gray-500">-</span>

              {/* Hora */}
              <span className="block text-sm text-gray-500">{order.time}</span>
            </div>
          </div>

          {/* Detalles del pedido */}
          <div className="">
            <div className="px-4 py-3">
              <OrdersProductsPDF
                cartItems={order.cartItems}
                currency={currency}
              />
            </div>

            <div className="px-4 py-3">
              <OrderFormTotalCartPDF
                formDeliveryValues={order.formDeliveryValues}
                selectedMethod={order.selectedMethod}
                cartItems={order.cartItems}
                currency={currency}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
