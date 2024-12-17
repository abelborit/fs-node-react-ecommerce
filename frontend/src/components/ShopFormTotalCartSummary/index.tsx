import { useState } from "react";
import { CartTotal } from "../CartTotal";
import { TitleComponent } from "../TitleComponent";
import { paymentMethodsOptions } from "../../constants/paymentMethodsOptions";
import { FormDeliveryInterface } from "../../constants/initialFormDelivery";

interface ShopFormTotalCartSummaryProps {
  formDeliveryValues: FormDeliveryInterface;
  selectedMethod: string;
}

export const ShopFormTotalCartSummary = ({
  formDeliveryValues,
  selectedMethod,
}: ShopFormTotalCartSummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSelectedMethodValue = (selectedMethod: string) => {
    const selectedMethodValue = paymentMethodsOptions.find(
      (method) => method.id === selectedMethod
    );

    if (selectedMethodValue) {
      // console.log("Selected Method Label:", selectedMethodValue.label);
      return selectedMethodValue.label;
    }

    // console.log("Selected Method not found");
    return "Payment method not found";
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
            <div className="text-2xl">
              <TitleComponent firstText="DELIVERY" secondText="INFORMATION" />
            </div>

            <ul className="text-gray-700 space-y-1">
              <li>
                <span className="font-bold text-lg">First Name:</span>{" "}
                {formDeliveryValues.firstName}
              </li>

              <li>
                <span className="font-bold text-lg">Last Name:</span>{" "}
                {formDeliveryValues.lastName}
              </li>

              <li>
                <span className="font-bold text-lg">Email:</span>{" "}
                {formDeliveryValues.email}
              </li>

              <li>
                <span className="font-bold text-lg">Street:</span>{" "}
                {formDeliveryValues.street}
              </li>

              <li>
                <span className="font-bold text-lg">City:</span>{" "}
                {formDeliveryValues.city}
              </li>

              <li>
                <span className="font-bold text-lg">State:</span>{" "}
                {formDeliveryValues.state}
              </li>

              <li>
                <span className="font-bold text-lg">Zipcode:</span>{" "}
                {formDeliveryValues.zipcode}
              </li>

              <li>
                <span className="font-bold text-lg">Country:</span>{" "}
                {formDeliveryValues.country}
              </li>

              <li>
                <span className="font-bold text-lg">Phone:</span>{" "}
                {formDeliveryValues.phone}
              </li>

              <li>
                <span className="font-bold text-lg">Payment Method:</span>{" "}
                {handleSelectedMethodValue(selectedMethod)}
              </li>
            </ul>
          </div>
        </div>

        {/* Resumen del carrito */}
        <div className="flex flex-col gap-10 items-end w-full px-4 py-3">
          <CartTotal />
        </div>
      </div>
    </div>
  );
};
