import { Link } from "react-router-dom";
import { ProductInterface } from "../../../database_local/products.interface";
import { useShopContext } from "../../context/shopContext/ShopContext";
import * as images from "../../assets";

/* Tipar las imágenes como un objeto con claves string y valores string (rutas de las imágenes) para que no sea interpretado como any, entonces se necesita tipar correctamente el objeto images y la propiedad image porque cuando se usa -- * as images --, TypeScript no sabe automáticamente qué claves hay en el objeto importado. Al declarar explícitamente el tipo como Record<string, string>, se le da esa información y se evita el error de tipo any */
/* En TypeScript, "Record" es un tipo utilitario incorporado que se usa para definir un objeto con claves y valores de tipos específicos. Es especialmente útil cuando se quiere describir objetos cuyas claves y valores tienen patrones predecibles -- Record<Keys, Type> -- como por ejemplo -- Record<string, string> -- y su equivalente sería -- { [key: string]: string } -- */
const typedImages: Record<string, string> = images;
// const typedImages: { [key: string]: string } = images;
// console.log(typedImages);

interface ProductItemProps {
  product: ProductInterface;
}

export const ProductCard = ({ product }: ProductItemProps) => {
  const { currency } = useShopContext();

  const { _id: id, image, name, price } = product;
  // console.log({ image });

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          /* si la imagen no coincide con ninguna entonces tendrá una imagen por defecto */
          src={typedImages[image[0]] || typedImages["default_placeholder"]}
          alt={name}
        />
      </div>

      <p className="pt-3 pb-1 text-sm">{name}</p>

      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};
