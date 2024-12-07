import { useEffect, useState } from "react";
import { useShopContext } from "../../context/shopContext/ShopContext";
import { ProductInterface } from "../../../database_local/products.interface";
import { ProductCard } from "../ProductCard";
import { TitleComponent } from "../TitleComponent";

interface RelatedProductsProps {
  category: string;
  subCategory: string;
}

export const RelatedProducts = ({
  category,
  subCategory,
}: RelatedProductsProps) => {
  const { products } = useShopContext();
  const [relatedProducts, setRelatedProducts] = useState<ProductInterface[]>(
    []
  );

  useEffect(() => {
    if (!category || !subCategory || products.length === 0) {
      setRelatedProducts([]);
      return;
    }

    if (products.length > 0) {
      /* slice no muta el arreglo original y se puede trabajar de forma directa ya que retorna un nuevo arreglo y en este caso se está creando una nueva referencia en memoria de los productos */
      let tempProducts = products.slice();

      tempProducts = tempProducts.filter(
        (element) =>
          element.category === category && element.subCategory === subCategory
      );

      setRelatedProducts(tempProducts.slice(0, 5));
    }
  }, [category, products, subCategory]);

  return (
    <div className="my-16">
      <div className="text-center text-2xl sm:text-2xl mb-4">
        <TitleComponent firstText="RELATED" secondText="PRODUCTS" />
      </div>

      {relatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No related products found.</p>
      )}
    </div>
  );
};
