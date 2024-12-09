// import { useEffect, useState } from "react";
import { useMemo } from "react";
import { useShopContext } from "../../context/shopContext/ShopContext";
import { TitleComponent } from "../../components/TitleComponent";
import { ProductInCart } from "../../components/ProductInCart";
import { CartEmpty } from "../../components/CartEmpty";

export interface ProductInCartDataInterface {
  id: string;
  size: string;
  quantity: number;
}

export const CartPage = () => {
  const { cartItems } = useShopContext();

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

  if (!cartData.length) {
    return <CartEmpty />;
  }

  return (
    <div className="border-t pt-14 w-full">
      <div className="text-2xl mb-3">
        <TitleComponent firstText="YOUR" secondText="CART" />
      </div>

      <div>
        {cartData.map((productInCart, index) => (
          <ProductInCart
            key={`${index}-${productInCart.id}-${productInCart.size}`}
            productInCart={productInCart}
          />
        ))}
      </div>
    </div>
  );
};
