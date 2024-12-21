// import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FormLoginInterface } from "../../constants/initialFormLogin";
import { validationSchemaRules } from "./validationSchemaRules";
import { InputComponent } from "../InputComponent";
import { useFormUserContext } from "../../context/formUserContext/FormUserContext";

const classWrapperInput = "flex flex-col justify-evenly gap-4 w-full";

export const LoginForm = () => {
  const navigate = useNavigate();
  const {
    formLogin,
    // isFormLoginValid,
    handleSetFormLogin,
    handleSubmitLogin,
    // handleFormLoginValidity,
  } = useFormUserContext();

  const handleGoRegister = () => {
    navigate("/register");
  };

  /* inicializar formik */
  const formik = useFormik({
    initialValues: formLogin,
    validationSchema: validationSchemaRules,
    validateOnChange: true, // Validar al escribir
    validateOnBlur: true, // Validar al desenfocar
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
    // validateOnMount: true,
    validate: (values: FormLoginInterface) => {
      /* Actualizar los valores en el contexto cada vez que un campo cambia */
      handleSetFormLogin(values);
    },
  });

  // const handleValidation = async () => {
  //   /* Validar todos los campos y actualizar errores */
  //   const errors = await formik.validateForm();

  //   /* Marcar todos los campos como "touched" */
  //   formik.setTouched(
  //     Object.keys(formik.values).reduce(
  //       (acc, key) => ({ ...acc, [key]: true }),
  //       {}
  //     )
  //   );

  //   /* Verificar si hay errores */
  //   const isFieldsWithoutErrors = Object.keys(errors).length === 0;

  //   /* Verificar si todos los campos tienen valores no vacíos */
  //   const isFieldsNotEmpty = Object.values(formik.values).every(
  //     (value) => value.trim() !== "" // Evitar valores en blanco
  //   );

  //   /* Determinar si el formulario es válido */
  //   const isFormValidStatus = isFieldsWithoutErrors && isFieldsNotEmpty;

  //   /* Actualizar el estado de validez del formulario */
  //   handleFormLoginValidity(isFormValidStatus);
  // };

  // useEffect(() => {
  //   if (formik.errors) {
  //     handleFormLoginValidity(false);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formik.errors]);

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
      // isFormValid={isFormLoginValid} // Pasar el estado de validación
    />
  );

  return (
    <>
      <form className="flex flex-col gap-4 py-6 px-6 bg-gray-100 rounded-lg w-full sm:max-w-[450px]">
        <div className={classWrapperInput}>
          {renderInputField("Email", "email", "email", "correo@example.com")}
          {renderInputField("Password", "password", "password", "********")}
        </div>
      </form>

      <div className="flex items-center justify-between w-full sm:max-w-[450px] mt-3">
        <button onClick={() => console.log("not implemented yet")}>
          Forgot your password?
        </button>

        <button onClick={handleGoRegister}>Create account</button>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center">
        <button
          type="button"
          onClick={handleSubmitLogin}
          className="py-2 px-4 w-[200px] bg-gray-900 text-white hover:bg-gray-700"
        >
          Login
        </button>
      </div>
    </>
  );
};
