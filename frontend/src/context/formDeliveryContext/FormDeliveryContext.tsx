/* el context es quien va a exponer los datos a los demás componentes */
import { createContext, useContext } from "react";
import { FormDeliveryInterface } from "../../constants/initialFormDelivery";
import { FormDeliveryProviderInterface } from "./FormDeliveryProvider";

/* aquí es donde se coloca qué es lo que quiero distribuir en el value del Provider, aquí deberían estar todos los métodos, estados, etc... */
interface FormContextProps {
  /* states */
  formDeliveryValues: FormDeliveryInterface;
  isFormValid: boolean;

  /* set state functions */
  setFormState: React.Dispatch<
    React.SetStateAction<FormDeliveryProviderInterface>
  >;
  setFormValidity: (valid: boolean) => void;
}

export const FormDeliveryContext = createContext<FormContextProps>(
  {} as FormContextProps
);

/* también se puede crear como un custom hook aquí para utilizar este contexto y ahorrarnos unas importaciones y líneas de código adicionales en donde se vaya a utilizar este contexto... */
export const useFormDeliveryContext = () => {
  const context = useContext(FormDeliveryContext);

  if (!context) {
    throw new Error("useFormDeliveryContext must be used within a Provider...");
  }

  return {
    ...context,
  };
};