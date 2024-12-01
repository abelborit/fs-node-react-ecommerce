import { useState } from "react";
import { ProductInterface } from "../../database_local/products.interface";

interface useFilterProductsProps {
  products: ProductInterface[];
}

export const useFilterProducts = ({ products }: useFilterProductsProps) => {
  /* Estados para los filtros */
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [subCategoryFilter, setSubCategoryFilter] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("relevant");
  // console.log({ categoryFilter, subCategoryFilter, sortOption });

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

  return {
    /* states */
    categoryFilter,
    subCategoryFilter,
    sortOption,

    /* set states */
    setCategoryFilter,
    setSubCategoryFilter,
    setSortOption,

    /* funtions */
    filterProducts,
  };
};
