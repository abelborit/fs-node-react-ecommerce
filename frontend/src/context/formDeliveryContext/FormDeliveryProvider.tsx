/* crear el provider que es un componente que vamos a utilizar para obtener la información de nuestro context y es quien envolverá al componente más alto para repartir la información a sus hijos. Aquí se va a definir el estado a través de una interface para ir viendo cómo quiero que se vea a futuro la aplicación */
import { useMemo, useState } from "react";
import { FormDeliveryContext } from "./FormDeliveryContext";
import {
  FormDeliveryInterface,
  initialFormDelivery,
} from "../../constants/initialFormDelivery";

interface FormDeliveryProviderProps {
  children: JSX.Element | JSX.Element[];
}

/* aquí es cómo quiero que luzca mi estado inicial que no necesariamente será el mismo que la interface del Context ya que en la función de abajo se crearán funciones (porque se hará uso de los reducers en algunas ocasiones o solo funciones simples sin reducers lo cual se puede eliminar su importación) las cuales serán añadidas al value y ahí ese value tiene que satisfacer todo lo que se solicita en la interface del Context */
export interface FormDeliveryProviderInterface {
  formDeliveryValues: FormDeliveryInterface;
}

const INITIAL_STATE: FormDeliveryProviderInterface = {
  formDeliveryValues: initialFormDelivery,
};

export const FormDeliveryProvider = ({
  children,
}: FormDeliveryProviderProps) => {
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const setFormValidity = (valid: boolean) => {
    setIsFormValid(valid);
  };

  const handleSelectMethod = (methodId: string) => {
    setSelectedMethod((prevMethod) =>
      prevMethod === methodId ? "" : methodId
    );
  };

  /* funciones y métodos para colocar en el value... */
  /* Para optimizar sería bueno hacer uso de useCallback() para las funciones y useMemo() para los valores que se le pasarán al value para evitar que en cada render del provider (se hace un nuevo render cada vez que cambia el estado) se cree una nueva referencia en memoria de la misma función y el mismo objeto del estado (misma referencia en memoria pero diferente valor ya que se va cambiando). Esto es lo mismo que se haría para un custom hook para mejorar el performance y no tener fugas de memoria. Es decir, si el valor de API Context es un objeto deberemos pasarlo memorizado ya que si no se hace esto entonces en cada render estaremos generando una nueva instancia del mismo objeto lo que provocará que todos los componentes consumidores se rendericen. Para resolver este problema emplearemos los hooks useMemo y useCallback... */

  const valueProvider = useMemo(
    () => ({
      /* states */
      ...formState,
      isFormValid,
      selectedMethod,

      /* set state functions */
      setFormState,
      setFormValidity,

      /* functions */
      handleSelectMethod,
    }),

    [formState, isFormValid, selectedMethod]
  );

  return (
    <FormDeliveryContext.Provider value={valueProvider}>
      {children}
    </FormDeliveryContext.Provider>
  );
};
