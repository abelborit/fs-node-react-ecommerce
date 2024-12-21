/* crear el provider que es un componente que vamos a utilizar para obtener la información de nuestro context y es quien envolverá al componente más alto para repartir la información a sus hijos. Aquí se va a definir el estado a través de una interface para ir viendo cómo quiero que se vea a futuro la aplicación */
import { useMemo, useState } from "react";
import { FormUserContext } from "./FormUserContext";
import {
  FormLoginInterface,
  initialFormLogin,
} from "../../constants/initialFormLogin";
import {
  FormRegisterInterface,
  initialFormRegister,
} from "../../constants/initialFormRegister";
import { initialUserInfo, UserInfoInterface } from "../../constants/initialUserInfo";

interface FormProviderProps {
  children: JSX.Element | JSX.Element[];
}

/* aquí es cómo quiero que luzca mi estado inicial que no necesariamente será el mismo que la interface del Context ya que en la función de abajo se crearán funciones (porque se hará uso de los reducers en algunas ocasiones o solo funciones simples sin reducers lo cual se puede eliminar su importación) las cuales serán añadidas al value y ahí ese value tiene que satisfacer todo lo que se solicita en la interface del Context */
export interface FormUserProviderInterface {
  formLoginValues: FormLoginInterface;
  formRegisterValues: FormRegisterInterface;
  userInfoValues: UserInfoInterface;
}

const INITIAL_STATE: FormUserProviderInterface = {
  formLoginValues: initialFormLogin,
  formRegisterValues: initialFormRegister,
  userInfoValues: initialUserInfo,
};

export const FormUserProvider = ({ children }: FormProviderProps) => {
  const [userInfo, setUserInfo] = useState(INITIAL_STATE.userInfoValues); // estado donde se guardará la información del usuario que venga desde backend al loguearse o registrarse

  const [formLogin, setFormLogin] = useState<FormLoginInterface>(() => {
    /* Recupera el estado inicial del formulario desde localStorage o usa el predeterminado */
    // const savedState = localStorage.getItem("login-formState");
    // return savedState ? JSON.parse(savedState) : INITIAL_STATE.formLoginValues;

    return INITIAL_STATE.formLoginValues;
  });

  const [formRegister, setFormRegister] = useState<FormRegisterInterface>(
    () => {
      /* Recupera el estado inicial del formulario desde localStorage o usa el predeterminado */
      // const savedState = localStorage.getItem("register-formState");
      // return savedState
      //   ? JSON.parse(savedState)
      //   : INITIAL_STATE.formRegisterValues;

      return INITIAL_STATE.formRegisterValues;
    }
  );

  // const [isFormLoginValid, setIsFormLoginValid] = useState<boolean>(false);
  const [isFormRegisterValid, setIsFormRegisterValid] =
    useState<boolean>(false);

  const handleSetFormLogin = (valuesForm: FormLoginInterface) => {
    /* Iterar sobre cada clave y valor en el objeto valuesForm */
    const trimmedValuesForm = Object.keys(valuesForm).reduce((acc, key) => {
      acc[key as keyof FormLoginInterface] =
        typeof valuesForm[key as keyof FormLoginInterface] === "string"
          ? valuesForm[key as keyof FormLoginInterface].trim() // Eliminar espacios si el valor es un string
          : valuesForm[key as keyof FormLoginInterface]; // Mantener el valor original si no es un string
      return acc;
    }, {} as FormLoginInterface);

    /* Establecer el estado con los valores modificados */
    setFormLogin(trimmedValuesForm);

    setUserInfo({
      userInfo: {
        firstName: "First Name",
        lastName: "Lastname",
        email: "user@email.com",
      },
      isAuthenticated: true,
      tokenUser: "tokenUser123",
    });

    // Almacenar en el localStorage los valores recortados
    // localStorage.setItem("login-formState", JSON.stringify(trimmedValuesForm));
  };

  const handleSetFormRegister = (valuesForm: FormRegisterInterface) => {
    /* Iterar sobre cada clave y valor en el objeto valuesForm */
    const trimmedValuesForm = Object.keys(valuesForm).reduce((acc, key) => {
      acc[key as keyof FormRegisterInterface] =
        typeof valuesForm[key as keyof FormRegisterInterface] === "string"
          ? valuesForm[key as keyof FormRegisterInterface].trim() // Eliminar espacios si el valor es un string
          : valuesForm[key as keyof FormRegisterInterface]; // Mantener el valor original si no es un string
      return acc;
    }, {} as FormRegisterInterface);

    /* Establecer el estado con los valores modificados */
    setFormRegister(trimmedValuesForm);

    setUserInfo({
      userInfo: {
        firstName: "First Name",
        lastName: "Lastname",
        email: "user@email.com",
      },
      isAuthenticated: true,
      tokenUser: "tokenUser123",
    });

    // Almacenar en el localStorage los valores recortados
    // localStorage.setItem(
    //   "register-formState",
    //   JSON.stringify(trimmedValuesForm)
    // );
  };

  // const handleFormLoginValidity = (isValid: boolean) => {
  //   setIsFormLoginValid(isValid);
  // };

  const handleFormRegisterValidity = (isValid: boolean) => {
    setIsFormRegisterValid(isValid);
  };

  const handleSubmitLogin = () => {
    console.log(formLogin);
  };

  const handleSubmitRegister = () => {
    console.log(formRegister);
  };

  /* funciones y métodos para colocar en el value... */
  /* Para optimizar sería bueno hacer uso de useCallback() para las funciones y useMemo() para los valores que se le pasarán al value para evitar que en cada render del provider (se hace un nuevo render cada vez que cambia el estado) se cree una nueva referencia en memoria de la misma función y el mismo objeto del estado (misma referencia en memoria pero diferente valor ya que se va cambiando). Esto es lo mismo que se haría para un custom hook para mejorar el performance y no tener fugas de memoria. Es decir, si el valor de API Context es un objeto deberemos pasarlo memorizado ya que si no se hace esto entonces en cada render estaremos generando una nueva instancia del mismo objeto lo que provocará que todos los componentes consumidores se rendericen. Para resolver este problema emplearemos los hooks useMemo y useCallback... */

  const valueProvider = useMemo(
    () => ({
      /* states */
      userInfo,
      formLogin,
      formRegister,
      // isFormLoginValid,
      isFormRegisterValid,

      /* set state functions */

      /* functions */
      handleSetFormLogin,
      handleSetFormRegister,
      // handleFormLoginValidity,
      handleFormRegisterValidity,
      handleSubmitLogin,
      handleSubmitRegister,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formLogin, formRegister, /* isFormLoginValid, */ isFormRegisterValid]
  );

  return (
    <FormUserContext.Provider value={valueProvider}>
      {children}
    </FormUserContext.Provider>
  );
};
