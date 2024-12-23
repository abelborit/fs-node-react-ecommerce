import { hero_img } from "../../assets";

export const HeroComponent = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 w-full aspect-[2.5/1]">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <div className="w-8 md:w-11 h-[2px] bg-[#414141]"></div>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>

          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <div className="w-8 md:w-11 h-[2px] bg-[#414141]"></div>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      {/* se pone el -- aspect-[2/1.6] -- en el contenedor porque cuando la imagen no está disponible, el navegador no puede renderizar su espacio y, por lo tanto, no respeta las proporciones del contenedor definido por el -- aspect-[2/1.6] -- entonces para solucionar eso se está colocando en el contenedor para que que mantenga la proporción de aspecto incluso cuando la imagen aún no se ha cargado o está ausente */}
      <div className="w-full h-full sm:w-1/2 aspect-[2/1.6]">
        <img className="w-full h-full" src={hero_img} alt="hero-image" />
      </div>
    </div>
  );
};
