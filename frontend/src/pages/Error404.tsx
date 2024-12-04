import { useNavigate } from "react-router-dom";

export const Error404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center text-gray-800">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-500">404</h1>

        <p className="text-2xl md:text-3xl font-semibold mt-2">
          Oops! Page not found
        </p>

        <p className="mt-4 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8">
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
          src="https://via.placeholder.com/400x300?text=Error+Image"
          alt="Error Illustration"
          className="w-full max-w-md mx-auto"
        />
      </div> */}
    </div>
  );
};
