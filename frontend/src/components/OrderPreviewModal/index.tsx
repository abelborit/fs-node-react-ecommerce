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
      <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-4 relative">
        <button
          className="absolute top-2 right-2 text-red-500 text-xl"
          onClick={onClose}
        >
          X
        </button>

        <div id="pdf-content">
          <OrderPDFContent order={order} currency={currency} />
        </div>

        <button
          onClick={handlePrint}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};
