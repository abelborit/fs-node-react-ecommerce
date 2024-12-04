import { useParams } from "react-router-dom";
import { useShopContext } from "../../context/shopContext/ShopContext";
import { useEffect, useState } from "react";
import { ProductInterface } from "../../../database_local/products.interface";
import { ProductNotFound } from "../../components/ProductNotFound";

export const ProductPage = () => {
  const { productId } = useParams();
  const { products } = useShopContext();
  const [productById, setProductById] = useState<ProductInterface | null>(null);

  useEffect(() => {
    if (!productId || !products.length) return;

    const product = products.find(
      (product) => product._id === Number(productId)
    );

    if (product) {
      setProductById(product);
    } else {
      setProductById(null);
      // console.error(`Product with ID ${productId} not found.`);
    }
    return;
  }, [productId, products]);

  if (!productById) {
    return <ProductNotFound />;
  }

  return (
    <div className="flex flex-col items-center justify-center text-gray-800 w-full">
      <h1>{productById?.name}</h1>
      <p>{productById?.description}</p>
      <p>Price: ${productById?.price}</p>
    </div>
  );
};
