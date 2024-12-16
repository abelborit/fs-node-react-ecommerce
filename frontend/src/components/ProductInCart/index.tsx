import { ProductInCartDataInterface } from "../../pages/cart-deliver-orders/CartPage";
import { FaTrashCan } from "react-icons/fa6";
import * as images from "../../assets";
import { useShopContext } from "../../context/shopContext/ShopContext";

interface ProductInCartProps {
  productInCart: ProductInCartDataInterface;
}

/* Tipar las imágenes como un objeto con claves string y valores string (rutas de las imágenes) para que no sea interpretado como any, entonces se necesita tipar correctamente el objeto images y la propiedad image porque cuando se usa -- * as images --, TypeScript no sabe automáticamente qué claves hay en el objeto importado. Al declarar explícitamente el tipo como Record<string, string>, se le da esa información y se evita el error de tipo any */
/* En TypeScript, "Record" es un tipo utilitario incorporado que se usa para definir un objeto con claves y valores de tipos específicos. Es especialmente útil cuando se quiere describir objetos cuyas claves y valores tienen patrones predecibles -- Record<Keys, Type> -- como por ejemplo -- Record<string, string> -- y su equivalente sería -- { [key: string]: string } -- */
const typedImages: Record<string, string> = images;
// const typedImages: { [key: string]: string } = images;
// console.log(typedImages);

export const ProductInCart = ({ productInCart }: ProductInCartProps) => {
  const { cartItems, currency, handleUpdateProductQuantity } = useShopContext();

  const productDataInCart = cartItems[productInCart.id];

  if (!productDataInCart) return null;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    productInCart: ProductInCartDataInterface
  ) => {
    return event.target.value === "" || event.target.value === "0"
      ? null
      : handleUpdateProductQuantity({
          productId: productInCart.id,
          productSize: productInCart.size,
          productQuantity: Number(event.target.value),
        });
  };

  return (
    <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
      <div className="flex items-start gap-6">
        <img
          className="w-16 sm:w-20"
          src={
            typedImages[productDataInCart.productData?.image[0]] ||
            typedImages["default_placeholder"]
          }
          alt={productDataInCart.productData?.name}
        />

        <div>
          <p className="text-sm sm:text-lg font-medium">
            {productDataInCart.productData?.name}
          </p>

          <div className="flex items-center gap-5 mt-2">
            <p>
              {currency}
              {productDataInCart.productData?.price}
            </p>

            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
              {productInCart.size}
            </p>
          </div>
        </div>
      </div>

      <input
        className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 "
        type="number"
        min={1}
        max={30}
        defaultValue={productInCart.quantity}
        onChange={(event) => handleInputChange(event, productInCart)}
      />

      <FaTrashCan
        className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer outline-none"
        onClick={() =>
          handleUpdateProductQuantity({
            productId: productInCart.id,
            productSize: productInCart.size,
            productQuantity: 0,
          })
        }
      />
    </div>
  );
};
