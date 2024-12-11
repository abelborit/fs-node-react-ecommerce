import { TitleComponent } from "../TitleComponent";
import { useFormDeliveryContext } from "../../context/formDeliveryContext/FormDeliveryContext";

export const PaymentMethods = () => {
  const { selectedMethod, handleSelectMethod } = useFormDeliveryContext();

  const paymentMethodsOptions = [
    { id: "method1", label: "Credit Card", status: "disabled" },
    { id: "method2", label: "PayPal", status: "disabled" },
    { id: "method3", label: "Bank Transfer", status: "" },
  ];

  return (
    <div className="w-full sm:max-w-[450px]">
      <div className="text-2xl">
        <TitleComponent firstText="PAYMENT" secondText="METHOD" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-2 text-sm relative">
        {paymentMethodsOptions.map((method) => (
          <div
            key={method.id}
            onClick={() =>
              method.status !== "disabled" && handleSelectMethod(method.id)
            }
            className={`group flex items-center border rounded-md p-3 cursor-pointer transition hover:border-orange-400 ${
              selectedMethod === method.id
                ? "bg-orange-400 border-orange-500"
                : ""
            } ${
              method.status === "disabled"
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : ""
            }`}
          >
            <span>{method.label}</span>

            {/* Mostrar mensaje solo si está deshabilitado y se hace hover */}
            {method.status === "disabled" && (
              <span className="absolute bottom-[-2rem] left-0 w-full text-center text-red-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                This option is disabled for now
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
