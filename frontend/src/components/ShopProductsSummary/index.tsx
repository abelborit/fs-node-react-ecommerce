import { useState } from "react";
import { TitleComponent } from "../TitleComponent";
import { CartDataInterface } from "../../context/shopContext/ShopProvider";
import * as images from "../../assets";

interface ShopProductsSummaryProps {
  cartItems: CartDataInterface;
  currency: string;
}

/* Tipar las imágenes como un objeto con claves string y valores string (rutas de las imágenes) para que no sea interpretado como any, entonces se necesita tipar correctamente el objeto images y la propiedad image porque cuando se usa -- * as images --, TypeScript no sabe automáticamente qué claves hay en el objeto importado. Al declarar explícitamente el tipo como Record<string, string>, se le da esa información y se evita el error de tipo any */
/* En TypeScript, "Record" es un tipo utilitario incorporado que se usa para definir un objeto con claves y valores de tipos específicos. Es especialmente útil cuando se quiere describir objetos cuyas claves y valores tienen patrones predecibles -- Record<Keys, Type> -- como por ejemplo -- Record<string, string> -- y su equivalente sería -- { [key: string]: string } -- */
const typedImages: Record<string, string> = images;
// const typedImages: { [key: string]: string } = images;
// console.log(typedImages);

export const ShopProductsSummary = ({
  cartItems,
  currency,
}: ShopProductsSummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Extraemos todos los productos y sus datos desde cartItems
  const productEntries = Object.entries(cartItems).flatMap(
    ([id, { productData, quantityBySize }]) => {
      return Object.entries(quantityBySize).map(([size, quantity]) => ({
        productId: id,
        productData,
        size,
        quantity,
      }));
    }
  );

  // Si no hay productos en el carrito, mostramos un mensaje
  if (productEntries.length === 0) {
    return <p className="text-gray-500">No items in the cart</p>;
  }

  // Renderizamos cada producto y sus tamaños y cantidades
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
      >
        <span className="font-semibold text-gray-800">Order Cart Summary</span>
        <span className="text-gray-600 text-sm">
          {isExpanded ? "Hide" : "Show"}
        </span>
      </button>

      <div
        className={`transition-all duration-300 ${
          isExpanded ? "max-h-[500px] overflow-y-auto" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3">
          <div className="text-2xl">
            <TitleComponent firstText="CURRENT" secondText="ORDERS" />
          </div>

          {productEntries.map(({ productId, productData, size, quantity }) => (
            <div
              key={productId + size}
              className="py-4 border-b text-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={
                    typedImages[productData.image[0]] ||
                    typedImages["default_placeholder"]
                  }
                  alt={productData.name}
                />

                <div>
                  <p className="font-semibold text-lg">{productData.name}</p>

                  <p className="text-xs text-gray-500">
                    {productData.description.length > 120
                      ? `${productData.description.slice(0, 120)}...`
                      : productData.description}
                  </p>

                  <ul className="mt-2 text-gray-700 text-sm">
                    <li>
                      <p className="font-medium">
                        Size: <span className="text-gray-500">{size}</span>
                      </p>
                    </li>

                    <li>
                      <p className="font-medium">
                        Quantity:{" "}
                        <span className="text-gray-500">{quantity}</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="font-semibold text-lg">
                <p>
                  {currency} {Number(productData.price) * quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
