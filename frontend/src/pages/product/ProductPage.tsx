import { useParams } from "react-router-dom";
import { useShopContext } from "../../context/shopContext/ShopContext";
import { useEffect, useState } from "react";
import { ProductInterface } from "../../../database_local/products.interface";
import { ProductNotFound } from "../../components/ProductNotFound";
import { StarsRatingProduct } from "../../components/StarsRatingProduct";
import * as images from "../../assets";
import { DescriptionAndReviewProduct } from "../../components/DescriptionAndReviewProduct";
import { RelatedProducts } from "../../components/RelatedProducts";

/* Tipar las imágenes como un objeto con claves string y valores string (rutas de las imágenes) para que no sea interpretado como any, entonces se necesita tipar correctamente el objeto images y la propiedad image porque cuando se usa -- * as images --, TypeScript no sabe automáticamente qué claves hay en el objeto importado. Al declarar explícitamente el tipo como Record<string, string>, se le da esa información y se evita el error de tipo any */
/* En TypeScript, "Record" es un tipo utilitario incorporado que se usa para definir un objeto con claves y valores de tipos específicos. Es especialmente útil cuando se quiere describir objetos cuyas claves y valores tienen patrones predecibles -- Record<Keys, Type> -- como por ejemplo -- Record<string, string> -- y su equivalente sería -- { [key: string]: string } -- */
const typedImages: Record<string, string> = images;
// const typedImages: { [key: string]: string } = images;
// console.log(typedImages);

export const ProductPage = () => {
  const { productId } = useParams();
  const { products, currency, handleAddToCart } = useShopContext();
  const [productData, setProductData] = useState<ProductInterface | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleSelectedImage = (image: string) => {
    setSelectedImage(image);
  };

  const handleSelectedSize = (size: string) => {
    if (selectedSize === size) {
      setSelectedSize("");
      return;
    }

    setSelectedSize(size);
  };

  useEffect(() => {
    if (!productId || !products.length) return;

    const product = products.find(
      (product) => product._id === Number(productId)
    );

    if (product) {
      setProductData(product);
      setSelectedImage(product.image[0]);
    } else {
      setProductData(null);
      // console.error(`Product with ID ${productId} not found.`);
    }

    return;
  }, [productId, products]);

  if (!productData) {
    return <ProductNotFound />;
  }

  return (
    <div className="flex flex-col justify-center text-gray-800 w-full py-10">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-hidden justify-evenly sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((image) => (
              <img
                key={image}
                onClick={() => handleSelectedImage(image)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                /* si la imagen no coincide con ninguna entonces tendrá una imagen por defecto */
                src={typedImages[image] || typedImages["default_placeholder"]}
                alt={image}
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              /* si la imagen no coincide con ninguna entonces tendrá una imagen por defecto */
              src={
                typedImages[selectedImage] || typedImages["default_placeholder"]
              }
              alt={selectedImage}
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col flex-1">
          <h1 className="font-medium text-2xl">{productData.name}</h1>

          <StarsRatingProduct />

          <p className="mt-1 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <p className="mt-4 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p className="text-gray-800">Select Size</p>

            <div className="flex gap-2">
              {productData.sizes.map((element) => (
                <button
                  key={element}
                  onClick={() => handleSelectedSize(element)}
                  className={`border text-sm py-2 px-4 font-medium transition-colors duration-300 ${
                    selectedSize === element ? "bg-orange-400" : "bg-gray-100"
                  }`}
                >
                  {element}
                </button>
              ))}
            </div>
          </div>

          <div className="group w-36">
            <button
              disabled={!selectedSize}
              className={`py-3 text-xs w-36 ${
                selectedSize
                  ? "bg-gray-900 text-white hover:bg-gray-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() =>
                handleAddToCart({
                  productId: productData._id.toString(),
                  productSize: selectedSize,
                })
              }
            >
              ADD TO CART
            </button>

            <p
              className={`text-red-500 text-center text-xs transition-opacity duration-200 mt-2 ${
                selectedSize ? "opacity-0" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              Select a product size
            </p>
          </div>

          <hr className="mt-3" />

          <div className="text-xs text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <DescriptionAndReviewProduct />

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};
