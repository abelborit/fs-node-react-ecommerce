export interface FormRegisterInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const initialFormRegister: FormRegisterInterface = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

// export const initialFormRegister: FormRegisterInterface = {
//   firstName: "nombre",
//   lastName: "apellido",
//   email: "correo@correo.com",
//   password: "password123",
//   repeatPassword: "password123",
// };
