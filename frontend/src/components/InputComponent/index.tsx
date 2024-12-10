import { ErrorMessage, useField } from "formik";

interface InputComponentProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  /* y también puede recibir X cantidad de propiedades adicionales que queramos pasarle y se puede ir colocando una a una o sino también de la siguiente forma usando un comodín "[x: string]: any;" que significa que puede recibir cualquier llave que será de tipo string y su valor será cualquier cosa y con este comodín nos permite agregar cualquier cantidad de propiedades adcionales */
  [x: string]: any;
}

export const InputComponent = (props: InputComponentProps) => {
  /* este componente "InputComponent" será para evitar ser redundante en el código ya que en "DeliveryInformationForm" en lo que retorna el componente había esta secuencia: */
  /*
    <label htmlFor="">XXXXX</label>
    <input type="" name="" className={} onChange={} />
    <ErrorMessage name="" component="" /> // esto no había pero se le agregará aquí en "InputComponent"
  */
  /* para esto Formik nos ofrece una forma de venir al Formik Context que es creado por el objeto <Formik></Formik> en "DeliveryInformationForm" y con eso podemos ir a ese contexto, tomarlo y traer todas las propiedades que necesitemos y se puede extraer facil con un custom hook de la librería Formik que es useField */

  /* useField() recibe propiedades que serán las props que queremos colocar en el formulario y esto desestructura un array donde nosotros llamaremos a cada elemento usando los nombres de field y metadata y el tercer elemento serán para otras funcionas que por ahora no usaremos */
  /* field será el onBlur, onChange, name y value */
  /* metadata será error, initialError, initialTouched, initialValue, touched, value */
  const [field, metadata] = useField(props);

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center justify-start">
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {props.label}
        </label>

        {props.type !== "email" ? (
          <span
            className={`text-xs ${
              metadata.touched && metadata.error ? "text-red-500" : ""
            }`}
          >
            ({field?.value?.length || 0} Characters)
          </span>
        ) : null}
      </div>

      {/* aquí se está esparciendo el field y props para hacerlo mucho más flexible y recibir todos las propiedades necesarias */}
      <input
        {...field}
        {...props}
        className="mt-1 block w-full rounded-md shadow-sm p-2 sm:text-sm outline-none"
      />

      {/* <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md shadow-sm p-2 sm:text-sm outline-none"
        required
      /> */}

      <ErrorMessage
        name={props.name}
        component="span"
        className="text-red-500 text-center text-xs"
      />

      {/* se hizo de esta forma para conocer qué es lo que traía el hook useField y que probablemente se pueda usar en alguna oportunidad pero en este caso se trabajará con el componente ErrorMessage que nos da Formik */}
      {/* {metadata.touched && metadata.error && (
        <span className="error">{metadata.error}</span>
      )} */}
    </div>
  );
};
