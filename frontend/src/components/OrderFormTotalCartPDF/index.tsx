import { TitleComponent } from "../TitleComponent";
import { paymentMethodsOptions } from "../../constants/paymentMethodsOptions";
import { FormDeliveryInterface } from "../../constants/initialFormDelivery";
import { CartDataInterface } from "../../context/shopContext/ShopProvider";
import { OrderCartTotalPDF } from "../OrderCartTotalPDF";

interface OrderFormTotalCartPDFProps {
  formDeliveryValues: FormDeliveryInterface;
  selectedMethod: string;
  cartItems: CartDataInterface;
  currency: string;
}

export const OrderFormTotalCartPDF = ({
  formDeliveryValues,
  selectedMethod,
  cartItems,
  currency,
}: OrderFormTotalCartPDFProps) => {
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
      <div className="w-full text-left px-4 py-2 bg-gray-100 flex justify-between items-center">
        <span className="font-semibold text-gray-800">
          Order Form & Cart Total Summary
        </span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-8">
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
          <OrderCartTotalPDF cartItems={cartItems} currency={currency} />
        </div>
      </div>
    </div>
  );
};
