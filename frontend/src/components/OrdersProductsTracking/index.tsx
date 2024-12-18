import { useState } from "react";
import { TitleComponent } from "../TitleComponent";
import { CartDataInterface } from "../../context/shopContext/ShopProvider";
import * as images from "../../assets";

interface OrdersProductsTrackingProps {
  cartItems: CartDataInterface;
  currency: string;
}

/* Tipar las imágenes como un objeto con claves string y valores string (rutas de las imágenes) para que no sea interpretado como any, entonces se necesita tipar correctamente el objeto images y la propiedad image porque cuando se usa -- * as images --, TypeScript no sabe automáticamente qué claves hay en el objeto importado. Al declarar explícitamente el tipo como Record<string, string>, se le da esa información y se evita el error de tipo any */
/* En TypeScript, "Record" es un tipo utilitario incorporado que se usa para definir un objeto con claves y valores de tipos específicos. Es especialmente útil cuando se quiere describir objetos cuyas claves y valores tienen patrones predecibles -- Record<Keys, Type> -- como por ejemplo -- Record<string, string> -- y su equivalente sería -- { [key: string]: string } -- */
const typedImages: Record<string, string> = images;
// const typedImages: { [key: string]: string } = images;
// console.log(typedImages);

export const OrdersProductsTracking = ({
  cartItems,
  currency,
}: OrdersProductsTrackingProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extraemos todos los productos y sus datos desde cartItems
  const productEntries = Object.entries(cartItems).flatMap(
    ([id, { productData, quantityBySize }]) =>
      Object.entries(quantityBySize).map(([size, quantity]) => ({
        id,
        productData,
        size,
        quantity,
      }))
  );

  // Si no hay productos en el carrito, mostramos un mensaje
  if (productEntries.length === 0) {
    return <p className="text-gray-500">No items in this order</p>;
  }

  return (
    <div className="border rounded-lg shadow overflow-hidden">
      {/* Encabezado */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
      >
        <span className="font-semibold">Order Details</span>
        <span className="text-sm text-gray-600">
          {isExpanded ? "Hide" : "Show"}
        </span>
      </button>

      {/* Detalles del pedido */}
      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[500px] overflow-y-auto" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3">
          <div className="text-xl">
            <TitleComponent firstText="CURRENT" secondText="ORDER" />
          </div>

          {productEntries.map(({ id, productData, size, quantity }) => (
            <div
              key={`${id}-${size}`}
              className="py-4 border-b text-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              {/* Información del producto */}
              <div className="flex items-start gap-6">
                <img
                  src={
                    typedImages[productData.image[0]] ||
                    typedImages["default_placeholder"]
                  }
                  alt={productData.name}
                  className="w-16 sm:w-20"
                />

                <div>
                  <p className="font-semibold text-lg">{productData.name}</p>

                  <p className="text-xs text-gray-500 max-w-sm">
                    {productData.description.length > 120
                      ? `${productData.description.slice(0, 120)}...`
                      : productData.description}
                  </p>

                  <ul className="flex flex-col gap-1 mt-2 text-gray-700 text-sm">
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

                    <li>
                      <p className="font-medium">
                        Price:{" "}
                        <span className="text-gray-500">
                          {currency} {Number(productData.price) * quantity}
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
