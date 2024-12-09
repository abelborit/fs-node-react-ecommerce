/* el context es quien va a exponer los datos a los demás componentes */
import { createContext, useContext } from "react";
import { ProductInterface } from "../../../database_local/products.interface";
import {
  CartDataInterface,
  HandleAddToCartInterface,
  HandleUpdateProductQuantityInterface,
} from "./ShopProvider";

/* aquí es donde se coloca qué es lo que quiero distribuir en el value del Provider, aquí deberían estar todos los métodos, estados, etc... */
interface ShopContextProps {
  /* states */
  products: ProductInterface[];
  currency: string;
  delivery_fee: number;
  search: string;
  showSearch: boolean;
  cartItems: CartDataInterface;

  /* set state functions */
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;

  /* functions */
  handleAddToCart: ({
    productId,
    productSize,
  }: HandleAddToCartInterface) => void;
  handleGetCartCount: () => number;
  handleUpdateProductQuantity: ({
    productId,
    productSize,
    productQuantity,
  }: HandleUpdateProductQuantityInterface) => void;
}

export const ShopContext = createContext<ShopContextProps>(
  {} as ShopContextProps
);

/* también se puede crear como un custom hook aquí para utilizar este contexto y ahorrarnos unas importaciones y líneas de código adicionales en donde se vaya a utilizar este contexto... */
export const useShopContext = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShopContext must be used within a Provider...");
  }

  return {
    ...context,
  };
};
