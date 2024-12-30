/* hay que crear esquemas y modelos y estos son una forma de colección que sería como una tabla en una base de datos relacionales. Es una manera en la cual vamos a comenzar a grabar información en nuestra base de datos mongodb. Aquí se llaman modelos porque de alguna manera tenemos que ir viendo cómo vamos a guardar nuestra información en mongo */

/* uno de los beneficios de trabajar con mongoose y mongo es que a diferencia de la base de datos relacionales, aquí se puede ir trabajando con la base de datos antes de se tenga definida la base de datos que aquí son llamadas colecciones y documentos */

import mongoose, { Schema, Document } from "mongoose";
import type { CartDataInterface } from "../../../interfaces/cartDataInterface";
import { errorCommonMessageForm } from "../../../config";
// import { passwordStrengthIndicator } from "../../../helpers/passwordStrengthIndicator";

/* --- DEFINICIÓN DE SUB-ESQUEMAS --- */
/* Esquema para CartDataInterface que utilice subesquemas de Mongoose para que pueda ser utilizado en el modelo de UserModel de manera más eficiente. De este modo, Mongoose podrá validar correctamente la estructura del objeto */
/* Este esquema refleja la estructura de CartDataInterface, con un campo productData que es un objeto que contiene los detalles del producto y un campo quantityBySize que es un Map de números (esto permite manejar diferentes cantidades por talla) */
const cartDataSchema = new Schema({
  productData: {
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: [{ type: String, required: true }],
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: [{ type: String, required: true }],
    date: { type: Number, required: true },
    bestseller: { type: Boolean, required: true },
  },
  quantityBySize: {
    type: Map,
    of: Number,
    required: true,
  },
});

/* Expresiones regulares reutilizables */
const onlyLettersRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

/* Interfaz para definir la estructura del documento */
interface UserMongoInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  emailValidated: boolean;
  password: string;
  cartData: CartDataInterface;
}

/* el esquema serán las reglas que queremos definir en el objeto y es cómo queremos guardar la información */
const userSchema = new Schema<UserMongoInterface>(
  {
    firstName: {
      type: String,
      match: [onlyLettersRegex, errorCommonMessageForm.onlyLetters],
      // required: true, // si se quiere guardar el name en nuestro userSchema entonces el name tiene que venir sí o sí porque si no dará un error
      trim: true, // Elimina espacios innecesarios al inicio o final
      minlength: [2, "Must be 2 characters or more"],
      maxlength: [15, "Must be 15 characters or less"],
      required: [true, "FirstName is required"], // si se quiere guardar el name en nuestro userSchema entonces el name tiene que venir sí o sí porque si no dará un error el cual se lo podemos mandar de esa forma en un arreglo
    },

    lastName: {
      type: String,
      match: [onlyLettersRegex, errorCommonMessageForm.onlyLetters],
      // required: true, // si se quiere guardar el name en nuestro userSchema entonces el name tiene que venir sí o sí porque si no dará un error
      trim: true, // Elimina espacios innecesarios al inicio o final
      minlength: [2, "Must be 2 characters or more"],
      maxlength: [15, "Must be 15 characters or less"],
      required: [true, "LastName is required"], // si se quiere guardar el name en nuestro userSchema entonces el name tiene que venir sí o sí porque si no dará un error el cual se lo podemos mandar de esa forma en un arreglo
    },

    /* Si se quiere mayor consistencia se podría agregar la misma expresión regular del backend al frontend para garantizar que el formato sea idéntico. Aunque Yup.string().email() ya es confiable, usar la misma regex evitaría posibles discrepancias en formatos admitidos */
    email: {
      type: String,
      unique: true, // el email tiene que ser un valor único entonces en la base de datos NO tiene que existir un email duplicado
      lowercase: true, // Convierte automáticamente el email a minúsculas
      trim: true, // Elimina espacios innecesarios al inicio o final
      match: [emailFormatRegex, errorCommonMessageForm.invalidEmail],
      required: [true, "Email is required"],
    },

    emailValidated: {
      type: Boolean,
      default: false,
    },

    /* --- FORMA 1: password -> con una sola expresión regular --- */
    /* aquí es similar a lo que se tiene en el frontend solo que en el backend está con una sola expresión regular y un poco más compleja, pero al final de cuentas es algo muy similar a como se maneja en el frontend. Para mayor robustez, se podría usar la misma expresión regular tanto en el backend como en el frontend. Esto podría evitar problemas si una regla cambia en el futuro */
    // password: {
    //   type: String,
    //   match: [
    //     passwordRegex,
    //     "Password must meet complexity requirements (At least 8 characters - At least one lowercase letter - At least one uppercase letter - At least one number - At least one special character)",
    //   ],
    //   required: [true, "Password is required"],
    //   select: false, // Por defecto, para que no se incluya automáticamente en las consultas de MongoDB. Solo se devolverá si se solicita explícitamente
    // },
    /* Validación de repeatPassword: No es necesario validar el campo repeatPassword en el backend, ya que solo es útil en el frontend para verificar coincidencia antes de enviar los datos. */

    /* --- FORMA 2: password -> tener similar a las validaciones que se tienen en frontend --- */
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: [
        {
          validator: (value: string) => value.length >= 8,
          message: errorCommonMessageForm.passwordLength,
        },
        {
          validator: (value: string) => /[a-z]/.test(value),
          message: errorCommonMessageForm.passwordLowercase,
        },
        {
          validator: (value: string) => /[A-Z]/.test(value),
          message: errorCommonMessageForm.passwordUppercase,
        },
        {
          validator: (value: string) => /\d/.test(value),
          message: errorCommonMessageForm.passwordNumber,
        },
        {
          validator: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
          message: errorCommonMessageForm.passwordSpecial,
        },
      ],
    },

    cartData: {
      type: Map, // es una estructura más adecuada para almacenar pares clave-valor. Cada valor es un documento que sigue el sub-esquema cartDataSchema
      of: cartDataSchema, // Usamos el esquema que definimos para el campo cartData
      default: {},
    },
  },
  {
    /* para que pueda aceptar valores vacíos como por ejemplo el valor por defecto de cartData que es un objeto vacío y que Mongoose no lo remueva */
    minimize: false,

    /* --- FORMA 1: serialización a JSON en el mismo esquema --- */
    // toJSON: {
    //   virtuals: true, // Incluir propiedades virtuales
    //   versionKey: false, // Omitir "__v"
    //   transform: (_, ret) => {
    //     delete ret._id; // Eliminar "_id"
    //     delete ret.password; // Eliminar "password" al serializar
    //   },
    // },
  }
);

/* --- FORMA 2: serialización a JSON --- */
/* cuando serializamos el objeto como JSON, podemos decirle a mongoose cómo queremos que sea serializado */
userSchema.set("toJSON", {
  virtuals: true, // para que coloque también el id (aparte del _id que ya se tiene)
  versionKey: false, // para quitar el version key o el "__v"
  transform: function (doc, ret, options) {
    /* no usar arrow function porque de esta forma tradicional se tiene el contexto this apuntando al objeto de userSchema */
    delete ret._id; // para que no aparezca el "_id" en el objeto de salida
    delete ret.password; // para que no aparezca el "password" en el objeto de salida
  },
});

/* --- FORMA 3: password -> crear validaciones mediante hooks de pre o middelwares en este mismo archivo --- */
/* también se puede usar un tipo middelware para el password */
// userSchema.pre("save", function (next) {
//   const password = this.password;

//   if (password.length < 8) {
//     return next(new Error(errorCommonMessageForm.passwordLength));
//   }

//   if (!/[a-z]/.test(password)) {
//     return next(new Error(errorCommonMessageForm.passwordLowercase));
//   }

//   if (!/[A-Z]/.test(password)) {
//     return next(new Error(errorCommonMessageForm.passwordUppercase));
//   }

//   if (!/\d/.test(password)) {
//     return next(new Error(errorCommonMessageForm.passwordNumber));
//   }

//   if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//     return next(new Error(errorCommonMessageForm.passwordSpecial));
//   }

//   next(); // Todo bien, continúa con el flujo
// });

/* --- FORMA 4: password -> crear el validador en otro archivo --- */
/* también se puede crear una función aparte para que valide la seguridad de la contraseña */
// userSchema.pre("save", function (next) {
//   const errors = passwordStrengthIndicator(this.password);
//   if (errors.length > 0) {
//     return next(new Error(errors.join(", ")));
//   }
//   next();
// });

/* modelo para poder interactuar con mongo. El nombre que aparecerá será "Users" porque mongoose por defecto toma el nombre del modelo y le aumenta una "s" pero eso igual se puede colocar según el nombre que nosotros queramos */
export const UserModel = mongoose.model<UserMongoInterface>("User", userSchema);

/* ************************************************************************************************************************ */
/* ************************************************************************************************************************ */
/* ************************************************************************************************************************ */

/* ---- NOTAS DE OTRO EJERCICIO ---- */
/* NOTA 1 */
/* como sabemos, nuestra entidad como por ejemplo un "src\domain\entities\log.entity.ts" es la que rije, entonces nosotros tenemos que hacernos un modelo para trabajar con la información similar a la que está abajo, puede ser idéntica, puede ser diferente, puede que tenga una base de datos ya previamente creada, etc, pero lo de abajo es lo que se maneja en la entidad y eso es lo importante para nosotros y no lo que esté en la base de datos, lo cual puede ser algo dificil de pensar porque se puede decir que la base de datos es quien rije todo, cosa que al día de mañana puede cambiar la base de datos o la estructura o algo similar y la aplicación no debería verse afectada */
/*
  severityLevel: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
*/
/* SUB-NOTA: en este ejercicio de node-typescript-express-auth-app la entidad es la que rije entonces nosotros creamos un modelo o esquema en base a lo que nosotros necesitamos trabajar en la base de datos, que en este caso es para trabajar con usuarios */

/* NOTA 2 */
/* también se puede tipar lo que regresa el model ya que tipar lo que retorna el modelo es una buena práctica en TypeScript. De esta manera, se puede asegurar que el modelo tenga las propiedades y métodos correctos. Además, en este caso, al extender la interfaz LogEntity e importar el tipo Document de Mongoose, también se está garantizando que el modelo tenga las propiedades y métodos necesarios para ser un modelo de Mongoose */

// import { LogEntity } from "../../../domain/entities/log.entity";

// export interface MongoLog extends LogEntity, Document {}

// export const LogModel = mongoose.model<MongoLog>("Log", logSchema);
