/* hay que crear esquemas y modelos y estos son una forma de colección que sería como una tabla en una base de datos relacionales. Es una manera en la cual vamos a comenzar a grabar información en nuestra base de datos mongodb. Aquí se llaman modelos porque de alguna manera tenemos que ir viendo cómo vamos a guardar nuestra información en mongo */

/* uno de los beneficios de trabajar con mongoose y mongo es que a diferencia de la base de datos relacionales, aquí se puede ir trabajando con la base de datos antes de que se tenga definida la base de datos que aquí son llamadas colecciones y documentos */

import mongoose, { Schema } from "mongoose";

/* el esquema serán las reglas que queremos definir en el objeto y es cómo queremos guardar la información */
/* este esquema tendrá la diferencia en que cada categoría creada en la base de datos debe tener relación con un usuario en la base de datos */
const productSchema = new mongoose.Schema({
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
  image: {
    type: Array,
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
    type: Array,
    required: [true, "At least one size is required"],
  },
  bestseller: {
    type: Boolean,
    // required: [true, "bestseller is required"], // si no se define el requerido entonces significa que es opcional lo cual hará que la propiedad ni siquiera va a existir en el documento que se creará en la base de datos
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
});

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
export const ProductModel = mongoose.model("Product", productSchema);
