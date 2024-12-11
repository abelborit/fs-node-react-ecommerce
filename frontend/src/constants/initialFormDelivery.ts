export interface FormDeliveryInterface {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
}

export const initialFormDelivery: FormDeliveryInterface = {
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  phone: "",
};

// export const initialFormDelivery: FormDeliveryInterface = {
//   firstName: "nombre",
//   lastName: "apellido",
//   email: "correo@correo.com",
//   street: "calle 123",
//   city: "ciudad",
//   state: "estado",
//   zipcode: "123456",
//   country: "pais",
//   phone: "123456789123",
// };
