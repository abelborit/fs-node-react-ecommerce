import { useState } from "react";
import { TitleComponent } from "../TitleComponent";
import { paymentMethodsOptions } from "../../constants/paymentMethodsOptions";
import { FormDeliveryInterface } from "../../constants/initialFormDelivery";
import { OrderCartTotalTracking } from "../OrderCartTotalTracking";
import { CartDataInterface } from "../../context/shopContext/ShopProvider";

interface OrderFormTotalCartTrackingProps {
  formDeliveryValues: FormDeliveryInterface;
  selectedMethod: string;
  cartItems: CartDataInterface;
  currency: string;
}

export const OrderFormTotalCartTracking = ({
  formDeliveryValues,
  selectedMethod,
  cartItems,
  currency,
}: OrderFormTotalCartTrackingProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelectedMethodValue = (selectedMethod: string) => {
    const selectedMethodValue = paymentMethodsOptions.find(
      (method) => method.id === selectedMethod
    );

    return selectedMethodValue
      ? selectedMethodValue.label
      : "Payment method not found";
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
      >
        <span className="font-semibold text-gray-800">
          Order Form & Cart Total Summary
        </span>
        <span className="text-gray-600 text-sm">
          {isExpanded ? "Hide" : "Show"}
        </span>
      </button>

      <div
        className={`flex flex-col sm:flex-row justify-between gap-8 transition-all duration-300 ${
          isExpanded ? "max-h-[500px] overflow-y-auto" : "max-h-0"
        }`}
      >
        {/* Detalles del formulario */}
        <div className="flex flex-col gap-10 items-start w-full px-4 py-3">
          <div>
            <div className="text-xl">
              <TitleComponent firstText="DELIVERY" secondText="INFORMATION" />
            </div>

            <ul className="text-gray-700 space-y-1">
              <li>
                <span className="font-bold text-base">First Name:</span>{" "}
                {formDeliveryValues.firstName}
              </li>

              <li>
                <span className="font-bold text-base">Last Name:</span>{" "}
                {formDeliveryValues.lastName}
              </li>

              <li>
                <span className="font-bold text-base">Email:</span>{" "}
                {formDeliveryValues.email}
              </li>

              <li>
                <span className="font-bold text-base">Street:</span>{" "}
                {formDeliveryValues.street}
              </li>

              <li>
                <span className="font-bold text-base">City:</span>{" "}
                {formDeliveryValues.city}
              </li>

              <li>
                <span className="font-bold text-base">State:</span>{" "}
                {formDeliveryValues.state}
              </li>

              <li>
                <span className="font-bold text-base">Zipcode:</span>{" "}
                {formDeliveryValues.zipcode}
              </li>

              <li>
                <span className="font-bold text-base">Country:</span>{" "}
                {formDeliveryValues.country}
              </li>

              <li>
                <span className="font-bold text-base">Phone:</span>{" "}
                {formDeliveryValues.phone}
              </li>

              <li>
                <span className="font-bold text-base">Payment Method:</span>{" "}
                {handleSelectedMethodValue(selectedMethod)}
              </li>
            </ul>
          </div>
        </div>

        {/* Resumen del carrito pero en la página de Ordenes */}
        <div className="flex flex-col gap-10 items-end w-full px-4 py-3">
          <OrderCartTotalTracking cartItems={cartItems} currency={currency} />
        </div>
      </div>
    </div>
  );
};
