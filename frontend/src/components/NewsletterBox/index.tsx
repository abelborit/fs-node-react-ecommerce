import { useState } from "react";

export const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailSended, setEmailSended] = useState(false);

  /* Expresión regular para validar emails */
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailRegex =
    /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setIsValidEmail(emailRegex.test(inputEmail));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValidEmail && email) {
      console.log("Submitted email:", { email });
      setEmail("");
      setEmailSended(true);

      setTimeout(() => {
        setEmailSended(false);
      }, 1000);
    } else {
      console.log("Invalid email address");
    }
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>

      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae rem
        voluptate.
      </p>

      <form
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto mt-6 mb-3 border pl-3"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          disabled={emailSended}
          placeholder="Enter your email"
          required
          className={`w-full sm:flex-1 outline-none text-gray-700 ${
            emailSended ? "cursor-not-allowed" : ""
          }`}
          onChange={handleChangeInput}
          value={email}
        />

        <button
          type="submit"
          disabled={!email || !isValidEmail}
          className={`text-xs px-10 py-4 transition ease-in-out ${
            isValidEmail && email
              ? "bg-gray-900 text-white hover:bg-gray-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          SUBSCRIBE
        </button>
      </form>

      {/* FORMA 1: que no exista el elemento pero que aparezca y desaparezca normal */}
      {/* {!isValidEmail && email && (
        <p className="text-red-500 text-sm mt-2">
          Please enter a valid email address
        </p>
      )}

      {!emailSended && email && (
        <p className="text-green-500 text-sm mt-2">
          Email address sended successfully
        </p>
      )} */}

      {/* FORMA 2: que exista el elemento pero que aparezca y desaparezca con animación suave pero el mensaje de error aparece por unos segundos debido a las validaciones de arriba porque cuando desaparece el mensaje de éxito queda visible aún el mensaje del error */}
      {/* {emailSended ? (
        <p className="text-green-500 text-sm transition-opacity duration-200 opacity-100">
          Email address sent successfully
        </p>
      ) : (
        <p
          className={`text-red-500 text-sm transition-opacity duration-200 ${
            !isValidEmail && email ? "opacity-100" : "opacity-0"
          }`}
        >
          Please enter a valid email address
        </p>
      )} */}

      {/* FORMA 3: que exista el elemento pero que aparezca y desaparezca con animación suave pero el mensaje de éxito estará un poco más abajo (se solucionó con un -- mt-[-20px] --) */}
      <p
        className={`text-red-500 text-sm transition-opacity duration-200 ${
          !isValidEmail && email ? "opacity-100" : "opacity-0"
        } ${emailSended ? "order-2" : ""}`}
      >
        Please enter a valid email address such as{" "}
        <strong>email@example.com</strong>
      </p>

      <p
        className={`text-green-500 text-sm transition-opacity duration-200 mt-[-20px] font-semibold ${
          emailSended ? "opacity-100 order-1" : "opacity-0"
        }`}
      >
        Email address sent successfully
      </p>
    </div>
  );
};
