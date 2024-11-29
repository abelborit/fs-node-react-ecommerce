interface FilterBoxElementsProps {
  title: string;
  elementsToFilter: string[];
  showFilters: boolean;
}

export const FilterBoxElements = ({
  title,
  elementsToFilter,
  showFilters,
}: FilterBoxElementsProps) => {
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
            />
            <span>{element}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
