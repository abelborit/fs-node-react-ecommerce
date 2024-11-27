import { useEffect, useState } from "react";
import { useShopContext } from "../../context/shopContext/ShopContext";
import { TitleComponent } from "../TitleComponent";
import { ProductInterface } from "../../../database_local/products.interface";
import { ProductCard } from "../ProductCard";

export const BestSellers = () => {
  const { products } = useShopContext();
  const [bestSellers, setBestSellers] = useState<ProductInterface[]>([]);

  useEffect(() => {
    const bestProducts = products.filter((product) => product.bestseller);
    setBestSellers(bestProducts.slice(0, 5));

    /* se coloca vacío porque solo queremos que se actualice la primera vez que se inicialice el componente "LatestCollection" */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <TitleComponent firstText="BEST" secondText="SELLERS" />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          vitae, accusamus doloremque deserunt sint et ipsa magnam minima.
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellers.map((bestSeller) => (
          <ProductCard key={bestSeller._id} product={bestSeller} />
        ))}
      </div>
    </div>
  );
};
