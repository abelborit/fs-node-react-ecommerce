import { useShopContext } from "../../context/shopContext/ShopContext";
import { CartDataInterface } from "../../context/shopContext/ShopProvider";
import { useRoundedCurrency } from "../../hooks/useRoundedCurrency";
import { TitleComponent } from "../TitleComponent";

interface OrderCartTotalTrackingProps {
  cartItems: CartDataInterface;
  currency: string;
}

export const OrderCartTotalTracking = ({
  cartItems,
  currency,
}: OrderCartTotalTrackingProps) => {
  const { delivery_fee, handleGetCountAmountInEachOrder } = useShopContext();
  const { handleFormattedValue } = useRoundedCurrency();

  const formattedDeliveryFee = handleFormattedValue(delivery_fee);
  const formattedCountAmount = handleFormattedValue(
    handleGetCountAmountInEachOrder(cartItems)
  );
  const formattedTotal =
    handleGetCountAmountInEachOrder(cartItems) === 0
      ? "0"
      : handleFormattedValue(
          handleGetCountAmountInEachOrder(cartItems) + delivery_fee
        );

  return (
    <div className="w-full sm:max-w-[450px]">
      <div className="text-2xl">
        <TitleComponent firstText="CART" secondText="TOTALS" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {formattedCountAmount}
          </p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {formattedDeliveryFee}
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
