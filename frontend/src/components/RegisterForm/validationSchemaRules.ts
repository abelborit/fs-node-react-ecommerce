import * as Yup from "yup";

/*
/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/

  - a-zA-Z: Permite letras minúsculas y mayúsculas.
  - áéíóúÁÉÍÓÚñÑ: Soporte para caracteres con tilde y la ñ.
  - \s: Permite espacios.
*/

/* se coloca afuera para evitar que se cree de nuevo innecesariamente y almacenar espacio en cada renderizado */
export const validationSchemaRules = Yup.object({
  /* colocar las reglas para los inputs */
  firstName: Yup.string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Must contain only letters")
    .min(2, "Must be 2 characters or more")
    .max(15, "Must be 15 characters or less")
    .required("This input is required"),
  lastName: Yup.string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Must contain only letters")
    .min(2, "Must be 2 characters or more")
    .max(15, "Must be 15 characters or less")
    .required("This input is required"),
  email: Yup.string()
    .email("Invalid email format: email@example.com")
    .required("This input is required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .required("This input is required"),
  /* .oneOf([Yup.ref("password")]) para que haga referencia al password y lo campare a ver si son o no iguales */
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "The passwords must be equal")
    .required("This input is required"),
});
