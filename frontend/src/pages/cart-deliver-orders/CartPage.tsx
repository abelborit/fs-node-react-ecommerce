// import { useEffect, useState } from "react";
import { useMemo } from "react";
import { useShopContext } from "../../context/shopContext/ShopContext";
import { TitleComponent } from "../../components/TitleComponent";
import { ProductInCart } from "../../components/ProductInCart";
import { CartEmpty } from "../../components/CartEmpty";
import { CartTotal } from "../../components/CartTotal";
import { useNavigate } from "react-router-dom";

export interface ProductInCartDataInterface {
  id: string;
  size: string;
  quantity: number;
}

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, handleCleanCart } = useShopContext();

  // const [cartData, setCartData] = useState<CartDataInterface[]>([]);

  // useEffect(() => {
  //   const tempCartData: CartDataInterface[] = [];

  //   for (const items in cartItems) {
  //     for (const item in cartItems[items]) {
  //       if (cartItems[items][item] > 0) {
  //         tempCartData.push({
  //           id: items,
  //           size: item,
  //           quantity: cartItems[items][item],
  //         });
  //       }
  //     }
  //   }

  //   // console.log(tempCartData);
  //   setCartData(tempCartData);
  // }, [cartItems]);

  /* useMemo asegura que cartData no se recalcula innecesariamente */
  const cartData: ProductInCartDataInterface[] = useMemo(() => {
    /* Object.entries(cartItems) permite iterar directamente sobre las claves (id de productos) y valores (objetos con tallas y cantidades) de cartItems */
    /* El flatMap combina map y aplanamiento en un solo paso, eliminando la necesidad de crear un array temporal como en el código de arriba */
    return Object.entries(cartItems).flatMap(([id, sizes]) => {
      /* Dentro de cada entrada, utilizamos otro Object.entries para obtener las tallas y sus cantidades */
      return Object.entries(sizes)
        .filter(([, quantity]) => quantity > 0)
        .map(([size, quantity]) => ({
          id,
          size,
          quantity,
        }));
    });
  }, [cartItems]);

  const handleGoToCheckout = () => {
    navigate("/place-order");
  };

  if (!cartData.length) {
    return <CartEmpty />;
  }

  return (
    <div className="border-t pt-14 w-full">
      <div className="flex flex-col text-2xl mb-3">
        <TitleComponent firstText="YOUR" secondText="CART" />

        <button
          className="text-sm bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-3 border border-red-500 hover:border-transparent rounded transition-all duration-300 w-32"
          onClick={handleCleanCart}
        >
          Clear all cart
        </button>
      </div>

      <div>
        {cartData.map((productInCart, index) => (
          <ProductInCart
            key={`${index}-${productInCart.id}-${productInCart.size}`}
            productInCart={productInCart}
          />
        ))}
      </div>

      <CartTotal />

      <div className="w-full text-end my-5">
        <button
          className={
            "bg-gray-900 text-white hover:bg-gray-700 py-3 px-8 text-sm"
          }
          onClick={handleGoToCheckout}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};
