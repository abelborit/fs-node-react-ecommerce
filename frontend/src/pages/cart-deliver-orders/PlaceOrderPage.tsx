import { CartTotal } from "../../components/CartTotal";
import { DeliveryInformationForm } from "../../components/DeliveryInformationForm";
import { TitleComponent } from "../../components/TitleComponent/index";
import { PaymentMethods } from "../../components/PaymentMethods";
import { useFormDeliveryContext } from "../../context/formDeliveryContext/FormDeliveryContext";

export const PlaceOrderPage = () => {
  const { isFormValid } = useFormDeliveryContext();

  return (
    <div className="flex flex-col py-5 sm:py-10 border-t w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="text-xl sm:text-2xl">
          <TitleComponent firstText="DELIVERY" secondText="INFORMATION" />
        </div>

        <div className="flex flex-col gap-10 sm:flex-row justify-between">
          <DeliveryInformationForm />

          <div className="flex flex-col gap-10 items-end w-full">
            <CartTotal />

            <PaymentMethods />

            {/* Submit Button */}
            <div className="flex flex-col group items-center mt-2 justify-center">
              <button
                disabled={!isFormValid}
                className={`py-3 text-sm w-44 ${
                  isFormValid
                    ? "bg-gray-900 text-white hover:bg-gray-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={() => {}}
              >
                PLACE ORDER
              </button>

              <p
                className={`text-red-500 text-center text-sm transition-opacity duration-200 mt-2 ${
                  isFormValid
                    ? "opacity-0"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                Complete delivery information
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
