import { FilterWrapper } from "../../components/FilterWrapper";
import { TitleComponent } from "../../components/TitleComponent";
import { ProductSort } from "../../components/ProductSort";

export const CollectionPage = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <FilterWrapper />

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <TitleComponent firstText="ALL" secondText="COLLECTIONS" />

          {/* Product Sort */}
          <ProductSort />
        </div>
      </div>
    </div>
  );
};
