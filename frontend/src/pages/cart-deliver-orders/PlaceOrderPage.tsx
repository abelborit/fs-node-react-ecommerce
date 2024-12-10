import { useState } from "react";
import { CartTotal } from "../../components/CartTotal";
import { DeliveryInformationForm } from "../../components/DeliveryInformationForm";
import { TitleComponent } from "../../components/TitleComponent/index";

export const PlaceOrderPage = () => {
  const [isComplete, setIsComplete] = useState(false);

  return (
    <div className="flex flex-col py-5 sm:py-10 border-t w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="text-xl sm:text-2xl">
          <TitleComponent firstText="DELIVERY" secondText="INFORMATION" />
        </div>

        <div className="flex flex-col gap-10 sm:flex-row justify-between">
          <DeliveryInformationForm />

          <div className="flex flex-col gap-14 items-end w-full">
            <CartTotal />

            {/* Submit Button */}
            <div className="flex flex-col group items-center justify-center">
              <button
                disabled={!isComplete}
                className={`py-3 text-sm w-36 ${
                  isComplete
                    ? "bg-gray-900 text-white hover:bg-gray-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={() => {}}
              >
                PLACE ORDER
              </button>

              <p
                className={`text-red-500 text-center text-sm transition-opacity duration-200 mt-2 ${
                  isComplete ? "opacity-0" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                Complete the form
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
