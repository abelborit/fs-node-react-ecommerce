import { useShopContext } from "../../context/shopContext/ShopContext";
import { useRoundedCurrency } from "../../hooks/useRoundedCurrency";
import { TitleComponent } from "../TitleComponent";

export const CartTotal = () => {
  const { currency, delivery_fee, handleGetCountAmount } = useShopContext();
  const { handleFormattedValue } = useRoundedCurrency();

  const formattedDelivery_fee = handleFormattedValue(delivery_fee);
  const formattedCountAmont = handleFormattedValue(handleGetCountAmount());
  const formattedTotal =
    handleGetCountAmount() === 0
      ? "0"
      : handleFormattedValue(handleGetCountAmount() + delivery_fee);

  return (
    <div className="w-full sm:max-w-[450px]">
      <div className="text-2xl">
        <TitleComponent firstText="CART" secondText="TOTALS" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {formattedCountAmont}
          </p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {formattedDelivery_fee}
          </p>
        </div>

        <hr />

        <div className="flex justify-between font-semibold text-base">
          <p>Total</p>
          <p>
            {currency} {formattedTotal}
          </p>
        </div>
      </div>
    </div>
  );
};
