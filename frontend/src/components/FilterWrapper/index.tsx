import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FilterBoxElements } from "../FilterBoxElements";

interface FilterWrapperProps {
  /* se colocaría de esta forma si se estuviera esperando que se pasen por argumentos de forma directa los valores de los filters */
  // setCategoryFilter: (filters: string[]) => void;
  // setSubCategoryFilter: (filters: string[]) => void;

  /* pero como en el componente hijo, es decir, en FilterBoxElements, se está intentando utilizarlas como funciones de actualización con un callback, es decir, de esta forma -- setCategoryFilter((prevState) => [...prevState, value]); -- entonces se está colocando el tipado de tal forma que las funciones de actualización de estado puedan aceptar un callback para actualizar el estado en función del estado previo */
  setCategoryFilter: React.Dispatch<React.SetStateAction<string[]>>;
  setSubCategoryFilter: React.Dispatch<React.SetStateAction<string[]>>;
}

const categoriesFilter: string[] = ["Men", "Women", "Kids"];
const typesFilter: string[] = ["Topwear", "Bottomwear", "Winterwear"];

export const FilterWrapper = ({
  setCategoryFilter,
  setSubCategoryFilter,
}: FilterWrapperProps) => {
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
        setCategoryFilter={setCategoryFilter}
      />

      {/* Subcategory Filter */}
      <FilterBoxElements
        key="TYPE"
        title="TYPE"
        elementsToFilter={typesFilter}
        showFilters={showFilters}
        setSubCategoryFilter={setSubCategoryFilter}
      />
    </div>
  );
};
