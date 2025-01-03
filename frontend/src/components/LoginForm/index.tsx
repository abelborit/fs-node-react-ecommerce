import { useEffect } from "react";
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
    userInfo,
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

  /* Validar si el formulario es válido basado en campos tocados */
  // useEffect(() => {
  //   const hasTouchedErrors = Object.keys(formik.errors).some(
  //     (field) => formik.touched[field]
  //   );
  //   const allFieldsTouched = Object.keys(formik.values).every(
  //     (field) => formik.touched[field]
  //   );
  //   const isValid = !hasTouchedErrors && allFieldsTouched;
  //   handleFormLoginValidity(isValid);
  // }, [formik.errors, formik.touched, formik.values, handleFormLoginValidity]);

  useEffect(() => {
    if (userInfo.isAuthenticated) {
      navigate("/home");
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <div className="flex items-center justify-between w-full sm:max-w-[450px] mt-2">
        <button onClick={() => console.log("not implemented yet")}>
          Forgot your password?
        </button>

        <button onClick={handleGoRegister}>Create account</button>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center">
        <button
          disabled={!formik.isValid || !formik.dirty} // Deshabilitado si no es válido o no se ha editado
          type="submit"
          onClick={handleSubmitLogin}
          className={`py-2 px-4 w-[200px] ${
            !formik.isValid || !formik.dirty
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-700"
          }`}
        >
          Login
        </button>
      </div>

      {/* datos de prueba */}
      <p className="flex flex-col gap-3 text-sm mt-2 bg-red-50 p-2 px-10">
        <span>For instance, you could use this fake user:</span>
        <span>
          <strong>Email: </strong>email@example.com
        </span>
        <span>
          <strong>Password: </strong>12AS@@ww
        </span>
      </p>
    </>
  );
};
