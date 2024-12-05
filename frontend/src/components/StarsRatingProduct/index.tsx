// import { FaStar  } from "react-icons/fa6";
import { useRatingProduct } from "../../hooks/useRatingProduct";

export const StarsRatingProduct = () => {
  const { rating, handleStarRating, clearRating } = useRatingProduct();

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {/* se coloca el "_" como un valor que no se usará (es un standar colocarlo de esa forma) porque en este caso solo haremos uso del "index" */}
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleStarRating(index + 1)}
              className={`text-xl ${
                index < rating ? "text-orange-500" : "text-gray-400"
              }`}
            >
              ★{/* <FaStar  /> */}
            </button>
          ))}
        </div>

        <p>(122)</p>
      </div>

      <div
        className={`transition-opacity duration-300 ${
          rating > 0 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-3 border border-red-500 hover:border-transparent rounded scale-[70%] transition-all duration-300 w-36"
          onClick={clearRating}
        >
          Clear rating
        </button>
      </div>
    </div>
  );
};
