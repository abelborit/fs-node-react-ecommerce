// import { FaStar  } from "react-icons/fa6";
// import { useEffect } from "react";
import { useAverageRatingProduct } from "../../hooks/useAverageRatingProduct";
import { useRatingProduct } from "../../hooks/useRatingProduct";
import { fakeRatingProductAndComments } from "../../../database_local/fakeRatingProductAndComments.json";

const fakeStarsRaiting = fakeRatingProductAndComments.map(
  (elements) => elements.rating
);

export const StarsRatingProduct = () => {
  const { rating, handleStarRating, clearRating } = useRatingProduct();
  const { averageRating } = useAverageRatingProduct(fakeStarsRaiting);

  /* para que comience el rating del usario en 0 y no se vea afectado por el rating que ya le dieron los demás usarios */
  // useEffect(() => {
  //   handleStarRating(averageRating);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [averageRating]);

  return (
    <div className="flex flex-col items-start justify-center">
      {/* Average Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <p>
            <span className="text-orange-500">{"★".repeat(averageRating)}</span>

            <span className="text-gray-400">
              {"★".repeat(5 - averageRating)}
            </span>
            {/* <span className="text-gray-400">{"☆".repeat(5 - averageRating)}</span> */}
          </p>
        </div>

        <p className="text-sm">({fakeStarsRaiting.length} reviews)</p>
      </div>

      {/* Client Rating */}
      <div className="flex flex-row w-full justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {/* se coloca el "_" como un valor que no se usará (es un standar colocarlo de esa forma) porque en este caso solo haremos uso del "index" */}
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleStarRating(index + 1)}
                className={`text-xl ${
                  index < rating ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                ★{/* <FaStar  /> */}
              </button>
            ))}
          </div>

          <p className="text-sm">(Your rating)</p>
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
    </div>
  );
};
