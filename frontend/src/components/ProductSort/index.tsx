import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

interface ProductSortProps {
  setSortOption: (value: string) => void;
}

const sortOptions = [
  {
    value: "relevant",
    label: "Sort by: Relevant",
  },
  {
    value: "low-high",
    label: "Sort by: Low to High",
  },
  {
    value: "high-low",
    label: "Sort by: High to Low",
  },
];

export const ProductSort = ({ setSortOption }: ProductSortProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);

  const handleSelectOption = (option: (typeof sortOptions)[number]) => {
    setSelectedOption(option);
    setSortOption(option.value);
    setIsOpen(false);
  };

  const handleToggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-48">
      {/* Botón para abrir/cerrar el menú */}
      <button
        onClick={handleToggleIsOpen}
        className="w-full flex items-center justify-between border border-gray-300 px-3 py-2 text-sm bg-white hover:bg-gray-100 transition"
      >
        {selectedOption.label}
        <FaChevronDown
          className={`text-gray-500 transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 shadow-lg rounded-md z-10">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelectOption(option)}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-200 rounded-md ${
                selectedOption.value === option.value
                  ? "bg-gray-700 font-medium text-white hover:text-gray-700"
                  : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
