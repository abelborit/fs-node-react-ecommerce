import { useShopContext } from "../../context/shopContext/ShopContext";
import { FilterWrapper } from "../../components/FilterWrapper";
import { TitleComponent } from "../../components/TitleComponent";
import { ProductSort } from "../../components/ProductSort";
import { ProductCard } from "../../components/ProductCard";
import { useFilterProducts } from "../../hooks/useFilterProducts";
import { useSearchFilterProducts } from "../../hooks/useSearchFilterProducts";

export const CollectionPage = () => {
  const { products, search, showSearch } = useShopContext();

  const {
    /* states */
    filteredProducts,
    categoryFilter,
    subCategoryFilter,
    sortOption,

    /* set states */
    setCategoryFilter,
    setSubCategoryFilter,
    setSortOption,
  } = useFilterProducts({ products });

  const { searchFilteredProducts } = useSearchFilterProducts({
    products: filteredProducts, // Aplicar búsqueda sobre productos filtrados
    search,
  });

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <FilterWrapper
        categoryFilter={categoryFilter}
        subCategoryFilter={subCategoryFilter}
        setCategoryFilter={setCategoryFilter}
        setSubCategoryFilter={setSubCategoryFilter}
      />

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex flex-col lg:flex-row justify-between text-base sm:text-2xl mb-4">
          <TitleComponent firstText="ALL" secondText="COLLECTIONS" />

          {/* Product Sort */}
          <ProductSort sortOption={sortOption} setSortOption={setSortOption} />
        </div>

        {/* Rendering Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {searchFilteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
