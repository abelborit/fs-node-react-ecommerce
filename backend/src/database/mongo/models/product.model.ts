/* hay que crear esquemas y modelos y estos son una forma de colección que sería como una tabla en una base de datos relacionales. Es una manera en la cual vamos a comenzar a grabar información en nuestra base de datos mongodb. Aquí se llaman modelos porque de alguna manera tenemos que ir viendo cómo vamos a guardar nuestra información en mongo */

/* uno de los beneficios de trabajar con mongoose y mongo es que a diferencia de la base de datos relacionales, aquí se puede ir trabajando con la base de datos antes de que se tenga definida la base de datos que aquí son llamadas colecciones y documentos */

import mongoose, { Schema, Document } from "mongoose";

/* Interfaz que define la estructura de un producto para TypeScript */
interface ProductMongoInterface extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subCategory: string;
  sizes: string[]; // Asumiendo que los tamaños son cadenas como "S", "M", "L", etc.
  bestseller?: boolean;
  date: Date;
}

/* el esquema serán las reglas que queremos definir en el objeto y es cómo queremos guardar la información */
/* este esquema tendrá la diferencia en que cada categoría creada en la base de datos debe tener relación con un usuario en la base de datos */
const productSchema = new Schema<ProductMongoInterface>(
  {
    name: {
      type: String,
      // required: true, // si se quiere guardar el name en nuestro productSchema entonces el name tiene que venir sí o sí porque si no dará un error
      required: [true, "Name is required"], // si se quiere guardar el name en nuestro productSchema entonces el name tiene que venir sí o sí porque si no dará un error el cual se lo podemos mandar de esa forma en un arreglo
      unique: true, // el name tiene que ser un valor único entonces en la base de datos NO tiene que existir un name duplicado
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      default: 0,
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"], // cada producto debe de tener una categoría
    },
    subCategory: {
      type: String,
      required: [true, "SubCategory is required"],
    },
    sizes: {
      type: [String],
      required: [true, "At least one size is required"],
    },
    bestseller: {
      type: Boolean,
      // required: [true, "bestseller is required"], // si no se define el requerido entonces significa que es opcional lo cual hará que la propiedad ni siquiera va a existir en el documento que se creará en la base de datos
    },

    /* No hay problema en que tanto el modelo de Mongoose como la entidad ProductEntity tengan la misma fecha por defecto (Date.now o una instancia de Date), pero es importante entender el propósito de cada capa para evaluar si es realmente necesario o redundante. */
    /* ¿Por qué no es un problema?
        - Consistencia de Datos:
          Si no se especifica una fecha al crear un producto, ambas capas asignarán la fecha actual, lo cual asegura que el registro tendrá una fecha válida en cualquier caso.

        - Redundancia Controlada:
          Aunque parece redundante, cada capa tiene su propia responsabilidad. La entidad asegura que los datos que ingresan a la aplicación están completos y válidos, mientras que el modelo se encarga de las reglas relacionadas con la base de datos.
    */
    /* ¿Cuándo podría ser un problema?
        - Desincronización:
          Si las reglas cambian en una capa (por ejemplo, se decide usar otra lógica para la fecha en la entidad o en el modelo), podríamos olvidarnos de actualizar la otra, lo que puede causar inconsistencias.

        - Sobrecarga innecesaria:
          Si siempre se va a depender de la fecha predeterminada del modelo (por ejemplo, Date.now en Mongoose), incluirla también en la entidad podría ser innecesario.
    */
    /* ¿Qué hacer para optimizar?
        1. Dejar la responsabilidad en el modelo (actual):
          Si la fecha predeterminada solo es relevante para la base de datos, se puede omitir en la entidad y confiar en la configuración del esquema de Mongoose.

        2. Dejar la responsabilidad en la entidad:
          Si la fecha es importante desde el momento en que los datos se manejan en la aplicación, y no depende de la base de datos, se puede omitir la configuración predeterminada en el modelo y usarla solo en la entidad.

        3. Usar la misma lógica en ambas capas:
          Si deseamos asegurar consistencia en ambas capas sin sobrepensar, se puede mantener la lógica de tener la fecha por defecto tanto en la entidad como en el modelo de mongoose
    */
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now, // Asignar fecha actual por defecto desde el modelo
    },
  }

  /* --- FORMA 1 --- */
  // {
  //   toJSON: {
  //     virtuals: true, // Incluir propiedades virtuales en la serialización
  //     versionKey: false, // Omitir la propiedad "__v"
  //     transform: (_, ret) => {
  //       delete ret._id; // Eliminar "_id" del objeto serializado
  //     },
  //   },
  // }
);

/* --- FORMA 2 --- */
/* cuando serializamos el objeto como JSON, podemos decirle a mongoose cómo queremos que sea serializado */
productSchema.set("toJSON", {
  virtuals: true, // para que coloque también el id (aparte del _id que ya se tiene)
  versionKey: false, // para quitar el version key o el "__v"
  transform: function (doc, ret, options) {
    /* no usar arrow function porque de esta forma tradicional se tiene el contexto this apuntando al objeto de productSchema */
    delete ret._id; // para que no aparezca el "_id" en el objeto de salida
  },
});

/* modelo para poder interactuar con mongo. El nombre que aparecerá será "Products" porque mongoose por defecto toma el nombre del modelo y le aumenta una "s" pero eso igual se puede colocar según el nombre que nosotros queramos */
export const ProductModel = mongoose.model<ProductMongoInterface>(
  "Product",
  productSchema
);
