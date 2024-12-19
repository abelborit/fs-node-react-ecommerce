import { toast } from "react-toastify";
import { ShopFormTotalCartSummary } from "../../components/ShopFormTotalCartSummary";
import { ShopProductsSummary } from "../../components/ShopProductsSummary";
import { TitleComponent } from "../../components/TitleComponent/index";
import { useFormDeliveryContext } from "../../context/formDeliveryContext/FormDeliveryContext";
import { useShopContext } from "../../context/shopContext/ShopContext";
import {
  useBuyProductsLocalStorage,
  UseBuyProductsLocalStorageInterface,
} from "../../hooks/useBuyProductsLocalStorage";
import { useNavigate } from "react-router-dom";

export const ShopSummary = () => {
  const navigate = useNavigate();
  const { cartItems, currency, delivery_fee, handleGetCountAmount } =
    useShopContext();
  const { formDeliveryValues, selectedMethod } = useFormDeliveryContext();
  const { addPurchase } = useBuyProductsLocalStorage();

  const handleGoOrders = () => {
    navigate("/orders");
  };

  const handleBuyProducts = () => {
    /* una vez finalizada la compra se podría eliminar todo el localStorage para que todo desde cero. También sería bueno enviar la fecha de la compra para que se pueda jalar después esa información desde el backend o sino que el backend pueda generar la fecha de compra al recibir esta solicitud */
    // console.log("handleBuyProducts", {
    //   cartItems,
    //   handleGetCountAmount: handleGetCountAmount() + delivery_fee,
    //   formDeliveryValues,
    //   selectedMethod,
    //   shopDate: new Date(),
    // });

    const newPurchase: UseBuyProductsLocalStorageInterface = {
      cartItems,
      formDeliveryValues,
      getCountAmount: handleGetCountAmount() + delivery_fee,
      selectedMethod,
      shopDate: new Date(),

      /* Sumar 1 día a la fecha actual */
      // shopDate: (() => {
      //   const currentDate = new Date();
      //   currentDate.setDate(currentDate.getDate() + 1); // Suma un día
      //   return currentDate;
      // })(),

      /* Sumar 1 año a la fecha actual */
      // shopDate: (() => {
      //   const currentDate = new Date();
      //   currentDate.setFullYear(currentDate.getFullYear() + 2); // Suma un año
      //   return currentDate;
      // })(),
    };

    addPurchase(newPurchase);

    toast.success("Processing your purchase!", {
      autoClose: 2000,
      pauseOnHover: false,
      position: "bottom-right",
    });

    toast.info("Redirecting to Orders Page", {
      autoClose: 3000,
      pauseOnHover: false,
      position: "bottom-right",
      onClose: handleGoOrders,
    });
  };

  return (
    <div className="flex flex-col py-5 sm:py-10 border-t w-full">
      <div className="text-2xl mb-2">
        <TitleComponent firstText="SHOP" secondText="SUMMARY" />
      </div>

      <div className="w-full flex flex-col gap-6 sm:gap-8 bg-gray-100 p-2 rounded-md">
        <div className="flex flex-col gap-6 bg-white shadow rounded-md p-4">
          <ShopProductsSummary cartItems={cartItems} currency={currency} />
        </div>

        <div className="flex flex-col gap-6 bg-white shadow rounded-md p-4">
          <ShopFormTotalCartSummary
            formDeliveryValues={formDeliveryValues}
            selectedMethod={selectedMethod}
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          className={`py-3 text-sm w-44 bg-gray-900 text-white hover:bg-gray-700`}
          onClick={handleBuyProducts}
        >
          BUY PRODUCTS
        </button>
      </div>
    </div>
  );
};
