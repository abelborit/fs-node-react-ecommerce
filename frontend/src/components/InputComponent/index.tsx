interface InputComponentProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  error?: string;
  touched?: boolean;
  isFormValid?: boolean;

  /* y también puede recibir X cantidad de propiedades adicionales que queramos pasarle y se puede ir colocando una a una o sino también de la siguiente forma usando un comodín "[x: string]: any;" que significa que puede recibir cualquier llave que será de tipo string y su valor será cualquier cosa y con este comodín nos permite agregar cualquier cantidad de propiedades adcionales */
  // [x: string]: any;
}

export const InputComponent = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  setFieldTouched,
  error,
  touched,
  isFormValid,
}: InputComponentProps) => {
  const handleChangeManual = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    setFieldTouched(name, true, false); // Marcar el campo como "touched"
  };

  /* este componente "InputComponent" será para evitar ser redundante en el código ya que en "DeliveryInformationForm" en lo que retorna el componente había esta secuencia: */
  /*
    <label htmlFor="">XXXXX</label>
    <input type="" name="" className={} onChange={} />
    <ErrorMessage name="" component="" /> // esto no había pero se trabajará de forma diferente con un "span"
  */

  const labelColor = isFormValid
    ? error
      ? "text-red-500"
      : "text-green-500"
    : "text-gray-700";

  const inputClass = isFormValid
    ? error
      ? "border-red-500"
      : "border-green-500"
    : "";

  return (
    <div className="w-full h-[70px]">
      <div className="flex gap-2 items-center justify-start">
        <label
          htmlFor={name}
          className={`block text-sm font-medium ${labelColor}`}
        >
          {label}
        </label>

        {type !== "email" ? (
          <span className={`text-xs ${error ? labelColor : ""}`}>
            ({value?.length || 0} Characters)
          </span>
        ) : null}
      </div>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChangeManual} // Usar el nuevo manejador
        onBlur={onBlur}
        className={`mt-1 block w-full rounded-md shadow-sm p-2 sm:text-sm outline-none ${inputClass}`}
      />

      {touched && error && (
        <span className="text-red-500 text-xs text-center sm:text-left mt-1 block">
          {error}
        </span>
      )}
    </div>
  );
};
