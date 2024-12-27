/* Se está utilizando Yup para validaciones en el frontend, lo cual es excelente porque evita solicitudes innecesarias al backend */
import * as Yup from "yup";

/*
/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/

  - a-zA-Z: Permite letras minúsculas y mayúsculas.
  - áéíóúÁÉÍÓÚñÑ: Soporte para caracteres con tilde y la ñ.
  - \s: Permite espacios.
*/

/* Expresiones regulares reutilizables */
const onlyLettersRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

/* Mensajes de error comunes */
const messages = {
  required: "This input is required",
  onlyLetters: "Must contain only letters",
  invalidEmail: "Invalid email format: email@example.com",
  passwordLength: "Must be 8 characters or more",
  passwordLowercase: "Must contain at least one lowercase letter",
  passwordUppercase: "Must contain at least one uppercase letter",
  passwordNumber: "Must contain at least one number",
  passwordSpecial: "Must contain at least one special character",
  passwordsNotMatch: "The passwords must be equal",
};

/* se coloca afuera para evitar que se cree de nuevo innecesariamente y almacenar espacio en cada renderizado */
export const validationSchemaRules = Yup.object({
  /* colocar las reglas para los inputs */
  firstName: Yup.string()
    .matches(onlyLettersRegex, messages.onlyLetters)
    .min(2, "Must be 2 characters or more")
    .max(15, "Must be 15 characters or less")
    .required(messages.required),
  lastName: Yup.string()
    .matches(onlyLettersRegex, messages.onlyLetters)
    .min(2, "Must be 2 characters or more")
    .max(15, "Must be 15 characters or less")
    .required(messages.required),
  email: Yup.string().email(messages.invalidEmail).required(messages.required),

  /* Esto asegura que la contraseña tenga al menos:
    - Una letra minúscula.
    - Una letra mayúscula.
    - Un número.
    - Un carácter especial.
    - Mínimo 8 caracteres.
 */
  password: Yup.string()
    .min(8, messages.passwordLength)
    .matches(/[a-z]/, messages.passwordLowercase)
    .matches(/[A-Z]/, messages.passwordUppercase)
    .matches(/\d/, messages.passwordNumber)
    .matches(specialCharacterRegex, messages.passwordSpecial)
    .required(messages.required),

  /* .oneOf([Yup.ref("password")]) para que haga referencia al password y lo campare a ver si son o no iguales */
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], messages.passwordsNotMatch)
    .required(messages.required),
});
