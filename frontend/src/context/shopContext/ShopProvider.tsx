/* crear el provider que es un componente que vamos a utilizar para obtener la información de nuestro context y es quien envolverá al componente más alto para repartir la información a sus hijos. Aquí se va a definir el estado a través de una interface para ir viendo cómo quiero que se vea a futuro la aplicación */
import { useMemo, useState } from "react";
import { ShopContext } from "./ShopContext";
import database_local from "../../../database_local/products.json";
import { ProductInterface } from "../../../database_local/products.interface";
import { toast } from "react-toastify";

export interface HandleAddToCartInterface {
  productId: string;
  productSize: string;
}

/* ambas son el mismo tipado y dicen lo mismo pero de distinta forma */
// export type CartDataInterface = Record<string, Record<string, number>>;
export type CartDataInterface = {
  [key: string]: {
    [key: string]: number;
  };
};

interface ShopProviderProps {
  children: JSX.Element | JSX.Element[];
}

/* aquí es cómo quiero que luzca mi estado inicial que no necesariamente será el mismo que la interface del Context ya que en la función de abajo se crearán funciones (porque se hará uso de los reducers en algunas ocasiones o solo funciones simples sin reducers lo cual se puede eliminar su importación) las cuales serán añadidas al value y ahí ese value tiene que satisfacer todo lo que se solicita en la interface del Context */
export interface ShopProviderStateInterface {
  products: ProductInterface[];
}

const INITIAL_STATE: ShopProviderStateInterface = {
  products: database_local.products,
};

export const ShopProvider = ({ children }: ShopProviderProps) => {
  const [state, setState] = useState(INITIAL_STATE);
  /* aquí en el "search" nos está dando un warning de que está tipado como string o null pero nosotros solo queremos que sea string, así sea un string vacío, este error sucede porque -- localStorage.getItem("searchTerm") -- devuelve un valor que puede ser una cadena de texto o null. Esto sucede porque si no hay un elemento almacenado con la clave "searchTerm", getItem retorna null. Aunque se intente manejar esto con un operador ternario, el tipo infiere que search puede ser -- string | null -- . */
  const [search, setSearch] = useState<string>(
    /* El operador ?? asegura que el valor sea "" solo si el resultado de localStorage.getItem("searchTerm") es null o undefined. Esto es más seguro que || porque evita valores como false, 0 o "" que podrían ser considerados falsy por || */
    localStorage.getItem("searchTerm") ?? "" // Asegura que sea string incluso si es null
  );
  const [showSearch, setShowSearch] = useState(
    localStorage.getItem("searchTerm") ? true : false
  );
  const [cartItems, setCartItems] = useState<CartDataInterface>({});

  const handleAddToCart = ({
    productId,
    productSize,
  }: HandleAddToCartInterface) => {
    /* El método "structuredClone" es una función nativa de JavaScript que realiza una copia profunda (deep copy) de un objeto o valor. Esto significa que crea una nueva instancia del objeto y copia todo su contenido, incluidos los objetos anidados, sin mantener referencias al original. Es una alternativa moderna y eficiente a técnicas como JSON.parse(JSON.stringify(obj)), que tienen ciertas limitaciones por ejemplo que el "structuredClone" soporta valores complejos como -- Date / RegExp / ArrayBuffer / Map / Set -- */
    /*  */
    const cartData: CartDataInterface = structuredClone(cartItems);

    if (!productSize) {
      toast.error("Select product size", {
        autoClose: 1500,
        pauseOnHover: false,
        position: "top-right",
      });

      return;
    }

    if (cartData[productId]) {
      if (cartData[productId][productSize]) {
        cartData[productId][productSize] += 1;
      } else {
        cartData[productId][productSize] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][productSize] = 1;
    }

    setCartItems(cartData);
    toast.success("Product added!", {
      autoClose: 1500,
      pauseOnHover: false,
      position: "top-right",
    });
  };

  // const handleGetCartCount = (): number => {
  //   let totalCartCount: number = 0;

  //   for (const items in cartItems) {
  //     for (const item in cartItems[items]) {
  //       try {
  //         if (cartItems[items][item] > 0) {
  //           totalCartCount += cartItems[items][item];
  //         }
  //       } catch (error) {
  //         console.log("getCartCount", error);
  //       }
  //     }
  //   }

  //   return totalCartCount;
  // };

  const handleGetCartCount = (): number => {
    // console.log("cartItems", cartItems);
    // console.log("Object.values(cartItems)", Object.values(cartItems));

    /* El primer reduce acumula el total del carrito sumando los totales de cada productsInCart */
    return Object.values(cartItems).reduce((total, productsInCart) => {
      // console.log("productsInCart", productsInCart);

      /* El segundo reduce dentro de cada productsInCart acumula la suma de los valores individuales, filtrando con (count > 0 ? count : 0) para asegurarnos de que solo se sumen valores positivos */
      const productsInCartTotal = Object.values(productsInCart).reduce(
        (sum, count) => sum + (count > 0 ? count : 0),
        0
      );
      // console.log("productsInCartTotal", productsInCartTotal);

      return total + productsInCartTotal;
    }, 0);
  };

  /* funciones y métodos para colocar en el value... */
  /* Para optimizar sería bueno hacer uso de useCallback() para las funciones y useMemo() para los valores que se le pasarán al value para evitar que en cada render del provider (se hace un nuevo render cada vez que cambia el estado) se cree una nueva referencia en memoria de la misma función y el mismo objeto del estado (misma referencia en memoria pero diferente valor ya que se va cambiando). Esto es lo mismo que se haría para un custom hook para mejorar el performance y no tener fugas de memoria. Es decir, si el valor de API Context es un objeto deberemos pasarlo memorizado ya que si no se hace esto entonces en cada render estaremos generando una nueva instancia del mismo objeto lo que provocará que todos los componentes consumidores se rendericen. Para resolver este problema emplearemos los hooks useMemo y useCallback... */
  const currency = "$";
  const delivery_fee = 10;

  const valueProvider = useMemo(
    () => ({
      /* states */
      ...state,
      currency,
      delivery_fee,
      search,
      showSearch,
      cartItems,

      /* set state functions */
      setSearch,
      setShowSearch,

      /* functions */
      handleAddToCart,
      handleGetCartCount,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, search, showSearch, cartItems]
  );

  return (
    <ShopContext.Provider value={valueProvider}>
      {children}
    </ShopContext.Provider>
  );
};

/* NOTA: diferencia entre -- ?? (Nullish Coalescing) -- y -- && (Logical AND) -- */
/* La diferencia entre los operadores ?? (nullish coalescing) y && (logical AND) radica en el propósito y el comportamiento al evaluar valores: */

/* ?? (Nullish Coalescing) */
/*
- Propósito: Retorna el valor del lado derecho solo si el valor del lado izquierdo es null o undefined. De lo contrario, devuelve el valor del lado izquierdo.

- Casos comunes: Es útil para proporcionar valores predeterminados solo cuando un valor puede ser null o undefined, sin afectar otros valores considerados "falsy" como false, 0, o "".



const value = null ?? "default";  // "default"
const value2 = undefined ?? "default";  // "default"
const value3 = "" ?? "default";  // "" (porque "" no es null ni undefined)
const value4 = 0 ?? "default";  // 0 (porque 0 no es null ni undefined)
*/

/* && (Logical AND) */
/*
- Propósito: Evalúa y retorna el valor del lado derecho solo si el valor del lado izquierdo es "truthy". Si el lado izquierdo es "falsy", retorna ese valor inmediatamente.

- Casos comunes: Es útil para realizar operaciones condicionales, donde solo deseas evaluar o ejecutar algo si una condición es verdadera.



const value = true && "hello";  // "hello" (porque true es truthy)
const value2 = false && "hello";  // false (porque false es falsy)
const value3 = 0 && "hello";  // 0 (porque 0 es falsy)
const value4 = "text" && "world";  // "world" (porque "text" es truthy)
*/

/* Comparación Directa */
/*
Situación	                                          |   ?? Resulta en:          |   && Resulta en:
Izquierda es null o undefined	                      |   Devuelve la derecha     |   Devuelve la izquierda (falsy)
Izquierda es un valor "falsy" (ej: "", 0, false)    |   Devuelve la izquierda   |   Devuelve la izquierda
Izquierda es "truthy"                               |   Devuelve la izquierda   |   Devuelve la derecha
*/
