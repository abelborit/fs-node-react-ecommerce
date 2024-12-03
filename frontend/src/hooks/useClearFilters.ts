import { useNavigate, useLocation } from "react-router-dom";

export const useClearFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClearFilters = () => {
    // Eliminar parámetros de la URL
    navigate({
      pathname: location.pathname,
      search: "",
    });

    // Eliminar elementos específicos del localStorage
    const keysToClear = [
      "searchTerm",
      "sortOption",
      "categoryFilter",
      "subCategoryFilter",
    ];

    keysToClear.forEach((key) => localStorage.removeItem(key));
  };

  return {
    handleClearFilters,
  };
};
