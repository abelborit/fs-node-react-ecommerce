import * as Yup from "yup";

/* se coloca afuera para evitar que se cree de nuevo innecesariamente y almacenar espacio en cada renderizado */
export const validationSchemaRules = Yup.object({
  /* colocar las reglas para los inputs */
  firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Must contain only letters")
    .min(2, "Must be 2 characters or more")
    .max(15, "Must be 15 characters or less")
    .required("This input is required"),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Must contain only letters")
    .min(2, "Must be 2 characters or more")
    .max(15, "Must be 15 characters or less")
    .required("This input is required"),
  email: Yup.string()
    .email("Invalid email format: email@example.com")
    .required("This input is required"),
  street: Yup.string()
    .min(2, "Must be 2 characters or more")
    .max(50, "Must be 50 characters or less")
    .required("This input is required"),
  city: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Must contain only letters")
    .min(2, "Must be 2 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("This input is required"),
  state: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Must contain only letters")
    .min(2, "Must be 2 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("This input is required"),
  zipcode: Yup.string()
    .matches(/^\d+$/, "Must contain only numbers")
    .min(5, "Must be 5 characters or more")
    .max(10, "Must be 10 characters or less")
    .required("This input is required"),
  country: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Must contain only letters")
    .min(2, "Must be 2 characters or more")
    .max(20, "Must be 20 characters or less")
    .required("This input is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Must contain only numbers")
    .min(10, "Must be 10 characters or more")
    .max(15, "Must be 15 characters or less")
    .required("This input is required"),
});
