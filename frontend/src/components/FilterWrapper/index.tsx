import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FilterBoxElements } from "../FilterBoxElements";
import { useClearFilters } from "../../hooks/useClearFilters";
import { useShopContext } from "../../context/shopContext/ShopContext";

interface FilterWrapperProps {
  categoryFilter: string[];
  subCategoryFilter: string[];
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
  categoryFilter,
  subCategoryFilter,
  setCategoryFilter,
  setSubCategoryFilter,
}: FilterWrapperProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const { search, setSearch } = useShopContext();

  const { handleClearFilters } = useClearFilters();

  const handleClick = () => {
    /* Eliminar parámetros de URL y localStorage */
    handleClearFilters();

    /* resetear valores */
    setSearch("");
    setCategoryFilter([]);
    setSubCategoryFilter([]);
  };

  const handleToggleShowFilter = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-w-60 mb-6">
      <div className="flex justify-between">
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

        <div
          className={`transition-opacity duration-300 ${
            categoryFilter.length > 0 ||
            subCategoryFilter.length > 0 ||
            search !== ""
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-5 border border-red-500 hover:border-transparent rounded scale-75 transition-all duration-300"
            onClick={handleClick}
          >
            Clear
          </button>
        </div>
      </div>

      {/* contenedor para que en mobile no ocupe espacio innecesario */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showFilters ? "max-h-screen" : "max-h-0"
        } sm:max-h-none sm:overflow-visible`}
      >
        {/* Category Filter */}
        <FilterBoxElements
          key="CATEGORIES"
          title="CATEGORIES"
          elementsToFilter={categoriesFilter}
          showFilters={showFilters}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        {/* Subcategory Filter */}
        <FilterBoxElements
          key="TYPE"
          title="TYPE"
          elementsToFilter={typesFilter}
          showFilters={showFilters}
          subCategoryFilter={subCategoryFilter}
          setSubCategoryFilter={setSubCategoryFilter}
        />
      </div>
    </div>
  );
};
