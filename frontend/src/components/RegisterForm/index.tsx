import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  FormRegisterInterface,
  initialFormRegister,
} from "../../constants/initialFormRegister";
import { validationSchemaRules } from "./validationSchemaRules";
import { InputComponent } from "../InputComponent";
import { useFormUserContext } from "../../context/formUserContext/FormUserContext";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { PasswordStrengthIndicator } from "../PasswordStrengthIndicator";

const classWrapperInput =
  "flex flex-col sm:flex-row justify-evenly gap-6 w-full";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const {
    userInfo,
    formRegister,
    isFormRegisterValid,
    handleSetFormRegister,
    handleSubmitRegister,
    handleFormRegisterValidity,
  } = useFormUserContext();

  const handleGoLogin = () => {
    navigate("/login");
  };

  /* inicializar formik */
  const formik = useFormik({
    initialValues: formRegister,
    validationSchema: validationSchemaRules,
    validateOnChange: true, // Validar al escribir (los indicadores y validaciones se actualizarán dinámicamente mientras el usuario escribe)
    validateOnBlur: true, // Validar al desenfocar
    onSubmit: (values) => {
      console.log("Form submitted", values);
    },
    // validateOnMount: true,
    validate: (values: FormRegisterInterface) => {
      /* Actualizar los valores en el contexto cada vez que un campo cambia */
      handleSetFormRegister(values);
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
    handleFormRegisterValidity(isFormValidStatus);
  };

  const handleResetForm = () => {
    formik.resetForm({ values: initialFormRegister }); // Restablecer valores en Formik
    handleSetFormRegister(initialFormRegister); // Actualizar el contexto con valores iniciales
    handleFormRegisterValidity(false); // Marcar el formulario como inválido
    // localStorage.removeItem("deliveryInformation-formState");
  };

  useEffect(() => {
    if (formik.errors) {
      handleFormRegisterValidity(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.errors]);

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
      isFormValid={isFormRegisterValid} // Pasar el estado de validación
    />
  );

  return (
    <>
      <form className="flex flex-col gap-4 py-6 px-6 bg-gray-100 rounded-lg w-full sm:max-w-[550px]">
        <div className={classWrapperInput}>
          {renderInputField("First Name", "firstName", "text", "Ana Rouse")}
          {renderInputField("Last Name", "lastName", "text", "Bart Zhon")}
        </div>

        <div className={classWrapperInput}>
          {renderInputField("Email", "email", "email", "email@example.com")}
        </div>

        <div className={`${classWrapperInput} items-start`}>
          <div className="w-full">
            <div className="flex items-start justify-center w-full relative">
              {renderInputField(
                "Password",
                "password",
                showPassword ? "text" : "password",
                "********"
              )}

              <span
                className={`absolute right-2 ${
                  formik.errors.repeatPassword &&
                  formik.touched.repeatPassword &&
                  !formik.errors.password &&
                  !formik.touched.password
                    ? "top-11"
                    : "top-9"
                } cursor-pointer`}
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* Mostrar los requisitos de contraseña */}
            <PasswordStrengthIndicator password={formik.values.password} />
          </div>

          <div className="flex items-start justify-center w-full relative">
            {renderInputField(
              "Repeat Password",
              "repeatPassword",
              showRepeatPassword ? "text" : "password",
              "********"
            )}

            <span
              className={`absolute right-2 ${
                formik.errors.password &&
                formik.touched.password &&
                !formik.errors.repeatPassword &&
                !formik.touched.repeatPassword
                  ? "top-11"
                  : "top-9"
              } cursor-pointer`}
              onClick={() => setShowRepeatPassword((prevState) => !prevState)}
            >
              {showRepeatPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-between">
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

      <div className="flex items-center justify-between w-full sm:max-w-[550px] mt-2">
        <button onClick={() => console.log("not implemented yet")}>
          Forgot your password?
        </button>

        <button onClick={handleGoLogin}>Login here</button>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center">
        <button
          disabled={!isFormRegisterValid}
          type="submit"
          onClick={handleSubmitRegister}
          className={`py-2 px-4 w-[200px] ${
            isFormRegisterValid
              ? "bg-gray-900 text-white hover:bg-gray-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Register
        </button>
      </div>

      {/* datos de prueba */}
      <p className="flex flex-col gap-3 text-sm mt-2 bg-red-50 p-2 px-10">
        <span>For instance, you could use this fake user:</span>
        <span>
          <strong>First name: </strong>Bart
        </span>

        <span>
          <strong>Last name: </strong>Vhen
        </span>

        <span>
          <strong>Email: </strong>email@example.com
        </span>

        <span>
          <strong>Password: </strong>12AS@@ww
        </span>

        <span>
          <strong>Repeat password: </strong>12AS@@ww
        </span>
      </p>
    </>
  );
};
