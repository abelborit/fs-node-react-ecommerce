import { useFormik } from "formik";
import { InputComponent } from "../InputComponent";
import { useFormDeliveryContext } from "../../context/formDeliveryContext/FormDeliveryContext";
import { validationSchemaRules } from "./validationSchemaRules";
import {
  FormDeliveryInterface,
  initialFormDelivery,
} from "../../constants/initialFormDelivery";
import { useEffect } from "react";

const classWrapperInput =
  "flex flex-col sm:flex-row justify-evenly gap-6 w-full";

export const DeliveryInformationForm = () => {
  const {
    formDeliveryValues,
    isFormValid,
    handleSetFormState,
    handleFormValidity,
  } = useFormDeliveryContext();

  /* inicializar formik */
  const formik = useFormik({
    initialValues: formDeliveryValues,
    validationSchema: validationSchemaRules,
    validateOnChange: true, // Validar al escribir
    validateOnBlur: true, // Validar al desenfocar
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
    // validateOnMount: true,
    validate: (values: FormDeliveryInterface) => {
      /* Actualizar los valores en el contexto cada vez que un campo cambia */
      handleSetFormState(values);
    },
  });

  const handleValidation = async () => {
    /* Validar todos los campos y actualizar errores */
    const errors = await formik.validateForm();

    /* Marcar todos los campos como "touched" */
    formik.setTouched(
      Object.keys(formik.values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    /* Verificar si hay errores */
    const isFieldsWithoutErrors = Object.keys(errors).length === 0;

    /* Verificar si todos los campos tienen valores no vacíos */
    const isFieldsNotEmpty = Object.values(formik.values).every(
      (value) => value.trim() !== "" // Evitar valores en blanco
    );

    /* Determinar si el formulario es válido */
    const isFormValidStatus = isFieldsWithoutErrors && isFieldsNotEmpty;

    /* Actualizar el estado de validez del formulario */
    handleFormValidity(isFormValidStatus);
  };

  const handleResetForm = () => {
    formik.resetForm({ values: initialFormDelivery }); // Restablecer valores en Formik
    handleSetFormState(initialFormDelivery); // Actualizar el contexto con valores iniciales
    handleFormValidity(false); // Marcar el formulario como inválido
    // localStorage.removeItem("deliveryInformation-formState");
  };

  useEffect(() => {
    if (formik.errors) {
      handleFormValidity(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.errors]);

  /* componente para renderizar los inputs de forma dinámica y no colocar cada input con las mismas propiedades */
  const renderInputField = (
    label: string,
    name: keyof typeof formik.values, // El nombre debe coincidir con las claves de los valores iniciales en Formik
    type: string,
    placeholder: string
  ) => (
    <InputComponent
      label={label}
      name={name}
      type={type}
      placeholder={placeholder}
      value={formik.values[name]} // Pasar el valor del campo
      onChange={formik.handleChange} // Manejar el cambio
      onBlur={formik.handleBlur} // Manejar el desenfoque
      setFieldTouched={formik.setFieldTouched} // Para hacer el handleChangeManual manejando el estado "touched"
      error={formik.errors[name]} // Pasar el mensaje de error
      touched={formik.touched[name]} // Pasar el estado de "touched"
      isFormValid={isFormValid} // Pasar el estado de validación
    />
  );

  return (
    <form className="flex flex-col gap-4 py-6 px-6 bg-gray-100 rounded-lg w-full sm:max-w-[550px]">
      <div className={classWrapperInput}>
        {renderInputField("First Name", "firstName", "text", "Ana Rouse")}
        {renderInputField("Last Name", "lastName", "text", "Bart Zhon")}
      </div>

      <div className={classWrapperInput}>
        {renderInputField("Email", "email", "email", "email@example.com")}
      </div>

      <div className={classWrapperInput}>
        {renderInputField("Street", "street", "text", "Urb. Dot 504 - UX")}
      </div>

      <div className={classWrapperInput}>
        {renderInputField("City", "city", "text", "USA")}
        {renderInputField("State", "state", "text", "California")}
      </div>

      <div className={classWrapperInput}>
        {renderInputField("Zipcode", "zipcode", "text", "90001")}
        {renderInputField("Country", "country", "text", "LA - Los Ángeles")}
      </div>

      <div className={classWrapperInput}>
        {renderInputField("Phone", "phone", "tel", "850465234")}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-between">
        <button
          type="button"
          onClick={handleResetForm}
          className="text-sm py-2 px-4 w-full border border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white"
        >
          Reset Form
        </button>

        <button
          type="button"
          onClick={handleValidation}
          className="text-sm py-2 px-4 w-full bg-gray-900 text-white hover:bg-gray-700"
        >
          Validate Form
        </button>
      </div>
    </form>
  );
};
