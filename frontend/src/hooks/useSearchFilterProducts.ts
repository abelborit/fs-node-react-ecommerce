import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductInterface } from "../../database_local/products.interface";

interface UseSearchFilterProductsProps {
  products: ProductInterface[];
  search: string;
}

export const useSearchFilterProducts = ({
  products,
  search,
}: UseSearchFilterProductsProps) => {
  const [searchFilteredProducts, setSearchFilteredProducts] = useState<
    ProductInterface[]
  >([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const location = useLocation();
  const navigate = useNavigate();

  // Al iniciar, recuperar el search del localStorage si no está en la URL
  useEffect(() => {
    const storedSearch = localStorage.getItem("searchTerm");
    if (!search && storedSearch) {
      // Si no hay un valor de búsqueda en la URL, usar el valor guardado en localStorage
      navigate({
        pathname: "/collection",
        search: `?search=${storedSearch}`, // Aplicar el search almacenado
      });
    }
  }, [search, navigate]);

  // Debounce para retrasar el filtro
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      localStorage.setItem("searchTerm", search); // Guardar el valor en localStorage

      const searchParams = new URLSearchParams(location.search);

      // Agregar o actualizar el parámetro de búsqueda
      if (search) {
        searchParams.set("search", search);
      } else {
        searchParams.delete("search");
      }

      // Actualizar la URL sin recargar la página
      navigate({
        pathname: "/collection",
        search: searchParams.toString() ? `?${searchParams.toString()}` : "",
      });
    }, 400);

    return () => clearTimeout(handler);
  }, [search, location, navigate]);

  // Filtrar productos
  useEffect(() => {
    const lowerCaseSearch = debouncedSearch.trim().toLowerCase();

    const filteredBySearch = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseSearch)
    );

    setSearchFilteredProducts(filteredBySearch);
  }, [products, debouncedSearch]);

  return {
    searchFilteredProducts,
  };
};
