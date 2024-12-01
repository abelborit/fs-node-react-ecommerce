import { useShopContext } from "../../context/shopContext/ShopContext";
import { FilterWrapper } from "../../components/FilterWrapper";
import { TitleComponent } from "../../components/TitleComponent";
import { ProductSort } from "../../components/ProductSort";
import { ProductCard } from "../../components/ProductCard";
import { useEffect, useState } from "react";
import { ProductInterface } from "../../../database_local/products.interface";
import { useFilterProducts } from "../../hooks/useFilterProducts";

export const CollectionPage = () => {
  const { products } = useShopContext();
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    []
  );

  const {
    /* states */
    categoryFilter,
    subCategoryFilter,
    sortOption,

    /* set states */
    setCategoryFilter,
    setSubCategoryFilter,
    setSortOption,

    /* funtions */
    filterProducts,
  } = useFilterProducts({ products });

  /* Ejecuta el filtrado cada vez que cambian los filtros o los productos */
  useEffect(() => {
    setFilteredProducts(filterProducts());
  }, [products, categoryFilter, subCategoryFilter, sortOption]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <FilterWrapper
        setCategoryFilter={setCategoryFilter}
        setSubCategoryFilter={setSubCategoryFilter}
      />

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex flex-col lg:flex-row justify-between text-base sm:text-2xl mb-4">
          <TitleComponent firstText="ALL" secondText="COLLECTIONS" />

          {/* Product Sort */}
          <ProductSort setSortOption={setSortOption} />
        </div>

        {/* Rendering Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
