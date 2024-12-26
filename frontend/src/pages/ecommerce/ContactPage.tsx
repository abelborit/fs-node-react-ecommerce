import { NewsletterBox } from "../../components/NewsletterBox";
import { TitleComponent } from "../../components/TitleComponent";
import { contact_us } from "../../assets";

export const ContactPage = () => {
  return (
    <div className="w-full flex flex-col mt-12">
      <div className="text-2xl text-center">
        <TitleComponent firstText="CONTACT" secondText="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 mb-16 sm:mb-24">
        <img
          src={contact_us}
          alt="contact_us"
          className="w-full sm:max-w-[450px] m-auto object-cover"
        />

        <div className="flex flex-col justify-center gap-12 md:w-2/4 text-gray-600">
          <div className="flex flex-col gap-4">
            <b className="text-gray-800 text-lg">Our Store</b>
            <div>
              <p>54709 Willms Station</p>
              <p>Suite 350, Washington, USA</p>
            </div>

            <div>
              <p>Tel: (000) 000-0000</p>
              <p>Email: email@enterprise.com</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <b className="text-gray-800 text-lg">Careers at Forever</b>
            <div>
              <p>Learn more about our teams and job openings.</p>
            </div>

            {/* el botón aparecerá deshabilitado por ahora */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
              <button
                disabled={true}
                type="submit"
                onClick={() => {
                  console.log("Not implemented yet");
                }}
                className={`py-2 px-4 w-[200px] ${
                  true
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
              >
                Explore more
              </button>
            </div>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};
