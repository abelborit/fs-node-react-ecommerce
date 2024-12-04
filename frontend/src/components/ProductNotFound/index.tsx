import { useNavigate } from "react-router-dom";

export const ProductNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/collection");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center text-gray-800 w-full">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">Product Not Found</h1>

        <p className="text-lg md:text-xl font-medium mt-4 text-gray-600">
          We couldn't find the product you're looking for. It may have been
          removed or is temporarily unavailable.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md shadow-md hover:bg-gray-300 transition-all duration-300"
          >
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700 transition-all duration-300"
          >
            Go to Homepage
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
