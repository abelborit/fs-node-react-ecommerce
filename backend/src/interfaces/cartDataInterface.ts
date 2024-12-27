import { ProductInterface } from "./productInterface";

/* ambas son el mismo tipado y dicen lo mismo pero de distinta forma */
// export type CartDataInterface = Record<string, HandleAddToCartInterface>; // Mapear ID de producto al HandleAddToCartInterface
export type CartDataInterface = {
  [key: string]: {
    productData: ProductInterface; // Información general del producto
    quantityBySize: Record<string, number>; // Cantidades agrupadas por talla
  };
};
