import { useEffect } from "react";

interface FilterBoxElementsProps {
  title: string;
  elementsToFilter: string[];
  showFilters: boolean;

  categoryFilter?: string[];
  subCategoryFilter?: string[];

  /* se colocaría de esta forma si se estuviera esperando que se pasen por argumentos de forma directa los valores de los filters */
  // setCategoryFilter?: (filters: string[]) => void;
  // setSubCategoryFilter?: (filters: string[]) => void;

  /* pero como aquí en FilterBoxElements se está intentando utilizarlas como funciones de actualización con un callback, es decir, de esta forma -- setCategoryFilter((prevState) => [...prevState, value]); -- entonces se está colocando el tipado de tal forma que las funciones de actualización de estado puedan aceptar un callback para actualizar el estado en función del estado previo */
  setCategoryFilter?: React.Dispatch<React.SetStateAction<string[]>>;
  setSubCategoryFilter?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FilterBoxElements = ({
  title,
  elementsToFilter,
  showFilters,
  categoryFilter = [],
  subCategoryFilter = [],
  setCategoryFilter,
  setSubCategoryFilter,
}: FilterBoxElementsProps) => {
  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    // console.log({ value, isChecked });

    if (title === "CATEGORIES" && setCategoryFilter) {
      setCategoryFilter((prevState: string[]) => {
        const updatedCategoryFilter = isChecked
          ? [...prevState, value]
          : prevState.filter((filter) => filter !== value);

        /* Actualizar localStorage para categorías cuando se desmarque o marque la opción (más que todo cuando se desmarque porque en el hook no está esa funcionalidad) */
        localStorage.setItem(
          "categoryFilter",
          JSON.stringify(updatedCategoryFilter)
        );

        return updatedCategoryFilter;
      });
    } else if (title === "TYPE" && setSubCategoryFilter) {
      setSubCategoryFilter((prevState: string[]) => {
        const updatedSubCategoryFilter = isChecked
          ? [...prevState, value]
          : prevState.filter((filter) => filter !== value);

        /* Actualizar localStorage para subcategorías cuando se desmarque o marque la opción (más que todo cuando se desmarque porque en el hook no está esa funcionalidad) */
        localStorage.setItem(
          "subCategoryFilter",
          JSON.stringify(updatedSubCategoryFilter)
        );

        return updatedSubCategoryFilter;
      });
    }
  };

  // Inicializar los checkboxes al montar el componente
  useEffect(() => {
    if (title === "CATEGORIES" && setCategoryFilter) {
      /* trabajarlo mediante el localStorage */
      // const savedCategoryFilter = JSON.parse(
      //   localStorage.getItem("categoryFilter") || "[]"
      // );
      // setCategoryFilter(savedCategoryFilter);

      setCategoryFilter(categoryFilter);
    } else if (title === "TYPE" && setSubCategoryFilter) {
      /* trabajarlo mediante el localStorage */
      // const savedSubCategoryFilter = JSON.parse(
      //   localStorage.getItem("subCategoryFilter") || "[]"
      // );
      // setSubCategoryFilter(savedSubCategoryFilter);

      setSubCategoryFilter(subCategoryFilter);
    }
  }, [
    title,
    categoryFilter,
    subCategoryFilter,
    setCategoryFilter,
    setSubCategoryFilter,
  ]);

  return (
    <div
      className={`border border-gray-300 px-5 py-3 mt-6 overflow-hidden transition-all duration-700 ease-in-out ${
        showFilters ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
      } sm:max-h-none sm:opacity-100`}
    >
      <p className="mb-3 text-sm font-medium">{title}</p>

      <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
        {elementsToFilter.map((element) => (
          <label key={element} className="flex gap-2 w-32">
            <input
              className="w-3"
              type="checkbox"
              value={element.toLocaleUpperCase()}
              checked={
                (title === "CATEGORIES" && categoryFilter.includes(element)) ||
                (title === "TYPE" && subCategoryFilter.includes(element))
              }
              onChange={(event) =>
                handleCheckboxChange(element, event.target.checked)
              }
            />
            <span>{element}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
