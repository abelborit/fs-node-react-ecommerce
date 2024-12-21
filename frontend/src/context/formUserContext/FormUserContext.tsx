/* el context es quien va a exponer los datos a los demás componentes */
import { createContext, useContext } from "react";
import { FormLoginInterface } from "../../constants/initialFormLogin";
import { FormRegisterInterface } from "../../constants/initialFormRegister";
import { UserInfoInterface } from "../../constants/initialUserInfo";

/* aquí es donde se coloca qué es lo que quiero distribuir en el value del Provider, aquí deberían estar todos los métodos, estados, etc... */
interface FormContextProps {
  /* states */
  userInfo: UserInfoInterface;
  formLogin: FormLoginInterface;
  formRegister: FormRegisterInterface;
  // isFormLoginValid: boolean;
  isFormRegisterValid: boolean;

  /* set state functions */

  /* functions */
  handleSetFormLogin: (values: FormLoginInterface) => void;
  handleSetFormRegister: (values: FormRegisterInterface) => void;
  // handleFormLoginValidity: (isValid: boolean) => void;
  handleFormRegisterValidity: (isValid: boolean) => void;
  handleSubmitLogin: () => void;
  handleSubmitRegister: () => void;
}

export const FormUserContext = createContext<FormContextProps>(
  {} as FormContextProps
);

/* también se puede crear como un custom hook aquí para utilizar este contexto y ahorrarnos unas importaciones y líneas de código adicionales en donde se vaya a utilizar este contexto... */
export const useFormUserContext = () => {
  const context = useContext(FormUserContext);

  if (!context) {
    throw new Error("useFormUserContext must be used within a Provider...");
  }

  return {
    ...context,
  };
};
