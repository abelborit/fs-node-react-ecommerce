/* Se está utilizando Yup para validaciones en el frontend, lo cual es excelente porque evita solicitudes innecesarias al backend */
import * as Yup from "yup";

/* Mensajes de error comunes */
const messages = {
  required: "This input is required",
};

/* se coloca afuera para evitar que se cree de nuevo innecesariamente y almacenar espacio en cada renderizado */
export const validationSchemaRules = Yup.object({
  /* colocar las reglas para los inputs */
  email: Yup.string()
    .email("Invalid email format: email@example.com")
    .required(messages.required),
  password: Yup.string()
    .min(8, "Must be 8 characters or more")
    .required(messages.required),
});
