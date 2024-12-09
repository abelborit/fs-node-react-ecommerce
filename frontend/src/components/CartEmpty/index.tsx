import { useNavigate } from "react-router-dom";

export const CartEmpty = () => {
  const navigate = useNavigate();

  const handleGoCollection = () => {
    navigate("/collection");
  };

  return (
    <div className="flex flex-col items-center justify-center text-gray-800 w-full py-10 px-5 bg-red-50 rounded-3xl mt-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">Your cart is empty</h1>

        <p className="text-lg md:text-xl font-medium mt-4 text-gray-600">
          Start adding some products!
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={handleGoCollection}
            className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700 transition-all duration-300 w-52"
          >
            Go to products page
          </button>
        </div>
      </div>

      {/* <div className="mt-12">
          <img
            src="https://via.placeholder.com/400x300?text=No+Product+Found"
            alt="Product Not Found Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div> */}
    </div>
  );
};
