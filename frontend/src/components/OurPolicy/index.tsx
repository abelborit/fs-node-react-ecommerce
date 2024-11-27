import { exchange, policy, support } from "../../assets";

const ourPolicyItems = [
  {
    image: exchange,
    title: "Easy Exchange Policy",
    description: "We offer hassle free exchange policy",
  },
  {
    image: policy,
    title: "7 Days Return Policy",
    description: "We provide 7 days free return policy",
  },
  {
    image: support,
    title: "Best customer support",
    description: "We provide 24/7 customer support",
  },
];

/* FORMA 1: pantallas pequeñas que sea en columna */
// export const OurPolicy = () => {
//   return (
//     <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
//       {ourPolicyItems.map((element) => (
//         <div key={element.title}>
//           <img
//             src={element.image}
//             alt={element.image}
//             className="w-12 m-auto mb-5"
//           />
//           <p className="font-semibold">{element.title}</p>
//           <p className="text-gray-400">{element.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

/* FORMA 2: pantallas pequeñas que sea como carrusel */
export const OurPolicy = () => {
  return (
    <div className="py-20">
      <div className="text-center text-xs sm:text-sm md:text-base text-gray-700">
        {/* Carrusel para pantallas pequeñas */}
        <div className="flex gap-6 sm:gap-8 overflow-x-auto sm:hidden scrollbar-hide">
          {ourPolicyItems.map((element) => (
            <div
              key={element.title}
              className="flex-shrink-0 w-1/2 flex flex-col items-center mx-auto"
            >
              <img
                src={element.image}
                alt={element.title}
                className="w-12 m-auto mb-5"
              />
              <p className="font-semibold text-sm md:text-base">
                {element.title}
              </p>
              <p className="text-gray-400 text-sm md:text-base">
                {element.description}
              </p>
            </div>
          ))}
        </div>

        {/* Diseño para pantallas medianas y grandes */}
        <div className="hidden sm:flex gap-5 justify-around w-full">
          {ourPolicyItems.map((element) => (
            <div key={element.title} className="flex flex-col items-center">
              <img
                src={element.image}
                alt={element.title}
                className="w-12 m-auto mb-5"
              />
              <p className="font-semibold text-sm md:text-base">
                {element.title}
              </p>
              <p className="text-gray-400 text-sm md:text-base">
                {element.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
