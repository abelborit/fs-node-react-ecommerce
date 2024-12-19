import React from "react";
import { OrderPDFContent } from "../OrderPDFContent";
import { OrderInterface } from "../../pages/cart-deliver-orders/OrdersPage";

interface OrderPreviewModalProps {
  order: OrderInterface;
  currency: string;
  onClose: () => void;
}

export const OrderPreviewModal: React.FC<OrderPreviewModalProps> = ({
  order,
  currency,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-3/4 xl:w-2/3 p-4 relative"
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        {/* Botón para cerrar */}
        <button
          className="absolute bg-slate-700 hover:bg-slate-500 w-6 h-6 flex items-center justify-center rounded-full top-2 right-2"
          onClick={onClose}
        >
          <span className="text-white text-center">X</span>
        </button>

        {/* Contenido del PDF */}
        <div id="pdf-content">
          <OrderPDFContent order={order} currency={currency} />
        </div>

        {/* Botón para imprimir */}
        <div className="flex items-center justify-center">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-500"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};
