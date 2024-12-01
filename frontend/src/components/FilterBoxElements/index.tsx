interface FilterBoxElementsProps {
  title: string;
  elementsToFilter: string[];
  showFilters: boolean;

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
  setCategoryFilter,
  setSubCategoryFilter,
}: FilterBoxElementsProps) => {
  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    // console.log({ value, isChecked });

    if (title === "CATEGORIES" && setCategoryFilter) {
      setCategoryFilter((prevState: string[]) =>
        isChecked
          ? [...prevState, value]
          : prevState.filter((filter) => filter !== value)
      );
    } else if (title === "TYPE" && setSubCategoryFilter) {
      setSubCategoryFilter((prevState: string[]) =>
        isChecked
          ? [...prevState, value]
          : prevState.filter((filter) => filter !== value)
      );
    }
  };

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
