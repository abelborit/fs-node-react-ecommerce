import { TitleComponent } from "../../components/TitleComponent";
import { about_us } from "../../assets";
import { NewsletterBox } from "../../components/NewsletterBox";

const whyChooseUsItems = [
  {
    // image: "",
    title: "Quality Assurance:",
    description:
      "We meticulously select and vet each product to ensure it meets our stringent quality standards.",
  },
  {
    // image: "",
    title: "Convenience:",
    description:
      "With our user-friendly interface and hassle-free ordering process, shopping has never been easier.",
  },
  {
    // image: "",
    title: "Exceptional Customer Service:",
    description:
      "Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.",
  },
];

export const AboutPage = () => {
  return (
    <div className="w-full flex flex-col mt-12">
      <div className="text-2xl text-center">
        <TitleComponent firstText="ABOUT" secondText="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={about_us}
          alt="about_us"
          className="w-full md:max-w-[450px]"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      <div className="text-xl py-6">
        <TitleComponent firstText="WHY" secondText="CHOOSE US" />
      </div>

      <div className="pt-3 pb-8 sm:pt-6 sm:pb-16">
        <div className="text-center text-xs sm:text-sm md:text-base text-gray-700">
          {/* Carrusel para pantallas pequeñas */}
          {/* <div className="flex gap-12 sm:gap-8 overflow-x-auto sm:hidden scrollbar-hide">
            {whyChooseUsItems.map((element) => (
              <div
                key={element.title}
                className="flex-shrink-0 w-1/2 flex flex-col items-center mx-auto gap-3"
              >
                <p className="font-semibold text-base md:text-base">
                  {element.title}
                </p>
                <p className="text-gray-400 text-sm md:text-base">
                  {element.description}
                </p>
              </div>
            ))}
          </div> */}

          {/* Diseño para pantallas medianas y grandes */}
          {/* <div className="hidden sm:flex justify-around w-full">
            {whyChooseUsItems.map((element) => (
              <div
                key={element.title}
                className="flex flex-col items-center gap-3 border p-12"
              >
                <p className="font-semibold text-base md:text-base mr-auto">
                  {element.title}
                </p>
                <p className="text-gray-400 text-sm md:text-base text-left">
                  {element.description}
                </p>
              </div>
            ))}
          </div> */}

          {/* mismo diseño para pantallas pequeñas y grandes */}
          <div className="sm:flex justify-around w-full">
            {whyChooseUsItems.map((element) => (
              <div
                key={element.title}
                className="flex flex-col items-center gap-3 border p-8 sm:p-12"
              >
                {/* <img
                src={element.image}
                alt={element.title}
                className="w-12 m-auto mb-5"
              /> */}
                <p className="font-semibold text-base md:text-base mr-auto">
                  {element.title}
                </p>
                <p className="text-gray-400 text-sm md:text-base text-left">
                  {element.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};
