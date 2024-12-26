import { CartTotal } from "../../components/CartTotal";
import { DeliveryInformationForm } from "../../components/DeliveryInformationForm";
import { TitleComponent } from "../../components/TitleComponent/index";
import { PaymentMethods } from "../../components/PaymentMethods";
import { useFormDeliveryContext } from "../../context/formDeliveryContext/FormDeliveryContext";
import { useNavigate } from "react-router-dom";
import { useFormUserContext } from "../../context/formUserContext/FormUserContext";

export const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const { isFormValid, selectedMethod, formDeliveryValues } =
    useFormDeliveryContext();
  const { userInfo } = useFormUserContext();
  const { isAuthenticated } = userInfo;

  /* Verificar si todos los campos tienen valores no vacíos */
  const isFieldsNotEmpty = Object.values(formDeliveryValues).every(
    (value) => value.trim() !== "" // Evitar valores en blanco
  );

  const handleGoShopSummary = () => {
    if (isFormValid && selectedMethod && isAuthenticated) {
      navigate("/shop-summary");
    }
  };

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
            <div className="flex flex-col group items-end mt-2 justify-center w-[12.5rem]">
              <button
                disabled={!isFormValid && !selectedMethod && !isAuthenticated}
                className={`py-3 text-sm w-44 ${
                  isFormValid && selectedMethod && isAuthenticated
                    ? "bg-gray-900 text-white hover:bg-gray-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleGoShopSummary}
              >
                SHOP SUMMARY
              </button>

              <p
                className={`text-red-500 text-center text-sm transition-opacity duration-200 mt-2 ${
                  isFormValid && selectedMethod
                    ? "opacity-0"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {!isFieldsNotEmpty
                  ? "Complete delivery information"
                  : !isFormValid
                  ? "Validate delivery information"
                  : "Select a paymet method"}
              </p>

              {isAuthenticated ? null : (
                <p className="text-red-500 text-center text-sm">
                  You must login to view your shop summary
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
