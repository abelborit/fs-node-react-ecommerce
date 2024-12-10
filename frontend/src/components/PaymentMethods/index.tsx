import { useState } from "react";
import { TitleComponent } from "../TitleComponent";

export const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isHoveringDisabled, setIsHoveringDisabled] = useState<boolean>(false);

  const paymentMethodsOptions = [
    { id: "method1", label: "Credit Card", status: "disabled" },
    { id: "method2", label: "PayPal", status: "disabled" },
    { id: "method3", label: "Bank Transfer", status: "" },
  ];

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethod((prevMethod) =>
      prevMethod === methodId ? "" : methodId
    );
  };

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
            onMouseEnter={() =>
              method.status === "disabled" && setIsHoveringDisabled(true)
            }
            onMouseLeave={() =>
              method.status === "disabled" && setIsHoveringDisabled(false)
            }
            className={`flex items-center border rounded-md p-3 cursor-pointer transition hover:border-orange-400 ${
              selectedMethod === method.id
                ? "bg-orange-400 border-orange-500"
                : ""
            } ${
              method.status === "disabled"
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : ""
            }`}
          >
            {method.label}
          </div>
        ))}

        {/* Mensaje de opción deshabilitada */}
        {isHoveringDisabled && (
          <p className="absolute bottom-[-2rem] left-0 w-full text-center text-red-500 text-sm">
            This options is disabled for now
          </p>
        )}
      </div>
    </div>
  );
};
