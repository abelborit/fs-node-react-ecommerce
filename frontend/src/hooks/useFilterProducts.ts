import { useEffect, useState } from "react";
import { ProductInterface } from "../../database_local/products.interface";

interface UseFilterProductsProps {
  products: ProductInterface[];
}

export const useFilterProducts = ({ products }: UseFilterProductsProps) => {
  /* Estados para los filtros */
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [subCategoryFilter, setSubCategoryFilter] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("relevant");
  // console.log({ categoryFilter, subCategoryFilter, sortOption });

  /* Estado para los productos filtrados */
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    []
  );

  /* Función para leer los parámetros de la URL hash */
  /* Para adaptar la lógica al uso de un createHashRouter, necesitamos ajustar cómo se gestionan los filtros y cómo se manipula la URL, dado que en las rutas basadas en hash (#), la parte significativa de la URL sigue a # */
  const getHashParams = () => {
    const hash = window.location.hash.split("?")[1];

    if (!hash) return new URLSearchParams();

    return new URLSearchParams(hash);
  };

  /* Sincroniza los filtros con la URL al inicializar */
  useEffect(() => {
    const searchParams = getHashParams();
    // const searchParams = new URLSearchParams(window.location.search); // por si no se usa el hash en la URL

    const initialCategory = searchParams.get("category")?.split(",") || [];
    const initialSubCategory =
      searchParams.get("subCategory")?.split(",") || [];
    const initialSort = searchParams.get("sort") || "relevant";

    setCategoryFilter(initialCategory);
    setSubCategoryFilter(initialSubCategory);
    setSortOption(initialSort);
  }, []);

  /* Actualiza la URL cada vez que los filtros cambien */
  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (categoryFilter?.length > 0) {
      searchParams.set("category", categoryFilter.join(","));
    }

    if (subCategoryFilter?.length > 0) {
      searchParams.set("subCategory", subCategoryFilter.join(","));
    }

    if (sortOption !== "relevant") {
      searchParams.set("sort", sortOption);
    }

    /* por si no se usa el hash en la URL */
    // const newPathname = `${
    //   window.location.pathname
    // }?${searchParams.toString()}`;
    // window.history.replaceState({}, "", newPathname);

    const basePath = window.location.hash.split("?")[0];
    const newHash = `${basePath}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    window.location.hash = newHash;
  }, [categoryFilter, subCategoryFilter, sortOption]);

  /* Función para manejar el filtrado */
  const filterProducts = () => {
    let tempProducts = [...products];

    /* se coloca sin un return de forma dentro de los -- if(....) { return .....} -- porque como la lógica de filtrado y ordenamiento está diseñada para ejecutarse de manera secuencial pero debido a cómo están estructuradas las condiciones en la función filterProducts, una parte de la lógica puede devolver resultados antes de que todas las condiciones se evalúen, esto sucede porque las secciones de filtrado tienen return temprano, lo que corta el proceso antes de llegar al ordenamiento. Entonces, para que el filtrado y el ordenamiento funcionen juntos, nos aseguramos de que todas las operaciones (filtros y ordenamiento) se apliquen en secuencia sobre los mismos datos sin retornos intermedios, es decir, sin aplicar el return directamente en el -- if(....) { .....} -- */

    /* Filtrado por categoría */
    if (categoryFilter?.length > 0) {
      tempProducts = tempProducts.filter((product) => {
        return categoryFilter.includes(product.category);
      });
    }

    /* Filtrado por subcategoría */
    if (subCategoryFilter?.length > 0) {
      tempProducts = tempProducts.filter((product) => {
        return subCategoryFilter.includes(product.subCategory);
      });
    }

    /* Ordenamiento */
    if (sortOption === "low-high") {
      tempProducts.sort((a, b) => {
        return Number(a.price) - Number(b.price);
      });
    } else if (sortOption === "high-low") {
      tempProducts.sort((a, b) => {
        return Number(b.price) - Number(a.price);
      });
    }

    return tempProducts;
  };

  /* Ejecuta el filtrado cada vez que cambian los filtros o los productos */
  useEffect(() => {
    setFilteredProducts(filterProducts());
  }, [products, categoryFilter, subCategoryFilter, sortOption]);

  return {
    /* states */
    filteredProducts,

    /* set states */
    setCategoryFilter,
    setSubCategoryFilter,
    setSortOption,
  };
};
