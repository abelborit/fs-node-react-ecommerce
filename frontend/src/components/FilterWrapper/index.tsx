import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FilterBoxElements } from "../FilterBoxElements";

const categoriesFilter: string[] = ["Men", "Women", "Kids"];
const typesFilter: string[] = ["Topwear", "Bottomwear", "Winterwear"];

export const FilterWrapper = () => {
  const [showFilters, setShowFilters] = useState(false);

  const handleToggleShowFilter = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-w-60 mb-6">
      <button
        onClick={handleToggleShowFilter}
        className="my-2 text-xl flex items-center cursor-pointer sm:cursor-auto gap-2"
      >
        <span>FILTERS</span>
        <FaAngleRight
          className={`h-4 sm:hidden text-gray-500 transition-all duration-300 ease-in-out ${
            showFilters ? "rotate-90" : ""
          }`}
        />
      </button>

      {/* Category Filter */}
      <FilterBoxElements
        key="CATEGORIES"
        title="CATEGORIES"
        elementsToFilter={categoriesFilter}
        showFilters={showFilters}
      />

      {/* Subcategory Filter */}
      <FilterBoxElements
        key="TYPE"
        title="TYPE"
        elementsToFilter={typesFilter}
        showFilters={showFilters}
      />
    </div>
  );
};
