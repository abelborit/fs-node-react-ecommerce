import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { useShopContext } from "../../context/shopContext/ShopContext";

export const SearchBar = () => {
  const { search, showSearch, setSearch, setShowSearch } = useShopContext();

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCloseSearchBar = () => {
    setShowSearch(false);
  };

  /* ************************************************************************************************************************ */
  /* Mostrar o no el elemento con un condicional ternario */
  // return showSearch ? (
  //   <div className="border-t border-b bg-gray-50 text-center">
  //     <div className={"inline-flex items-center justify-center bg-white border border-gray-300 px-5 py-2 my-5 mx-2 rounded-full w-3/4 sm:w-1/2"}>
  //       <input
  //         className="flex-1 outline-none bg-inherit text-sm"
  //         type="text"
  //         placeholder="Search here..."
  //         value={search}
  //         onChange={handleChangeSearch}
  //       />

  //       <FaMagnifyingGlass className="w-4 min-w-4 h-4 min-h-4" />
  //     </div>

  //     <button onClick={handleCloseSearchBar}>
  //       <FaXmark className="w-5 min-w-5 h-5 min-h-5 inline cursor-pointer" />
  //     </button>
  //   </div>
  // ) : null;

  /* ************************************************************************************************************************ */
  /* Efecto desplazamiento suave */
  return (
    <div
      className={`overflow-hidden transition-all duration-700 ease-in-out ${
        showSearch ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="border-t border-b bg-gray-50 text-center">
        <div className="inline-flex items-center justify-center bg-white border border-gray-300 px-5 py-2 my-5 mx-2 rounded-full w-3/4 sm:w-1/2">
          <input
            className="flex-1 outline-none bg-inherit text-sm"
            type="text"
            placeholder="Search here..."
            value={search}
            onChange={handleChangeSearch}
          />

          <FaMagnifyingGlass className="w-4 min-w-4 h-4 min-h-4" />
        </div>

        <button onClick={handleCloseSearchBar}>
          <FaXmark className="w-5 min-w-5 h-5 min-h-5 inline cursor-pointer" />
        </button>
      </div>
    </div>
  );

  /* ************************************************************************************************************************ */
  /* Efecto como si fuera un modal */
  // return (
  //   <div
  //     className={`fixed inset-0 bg-gray-50 z-50 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
  //       showSearch ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-10"
  //     }`}
  //   >
  //     <div
  //       className={`inline-flex items-center justify-center bg-white border border-gray-300 px-5 py-2 my-5 mx-2 rounded-full w-3/4 sm:w-1/2`}
  //     >
  //       <input
  //         className="flex-1 outline-none bg-inherit text-sm"
  //         type="text"
  //         placeholder="Search here..."
  //         value={search}
  //         onChange={handleChangeSearch}
  //       />

  //       <FaMagnifyingGlass className="w-4 min-w-4 h-4 min-h-4" />
  //     </div>

  //     <button onClick={handleCloseSearchBar}>
  //       <FaXmark className="w-5 min-w-5 h-5 min-h-5 inline cursor-pointer" />
  //     </button>
  //   </div>
  // );
};
