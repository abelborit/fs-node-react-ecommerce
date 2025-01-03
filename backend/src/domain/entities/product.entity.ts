/* dentro de entities van a ser nuestros objetos que son lo más atómico de la aplicación y no debería tener ninguna ingerencia del mundo exterior (las carpetas exteriores), es decir, todo lo que hagamos en domain no debería de tener nada del código externo como por ejemplo, importaciones de librerías sino solo debería de ser el código y lenguaje de programación que estamos utilizando, en este caso express o si usamos python entonces solo python, eso sería lo recomendado */

import { CustomError } from "../errors/custom.error";

/* lo que esté en entities, y a diferencia de lo que tenemos en la base de datos, este entity no está relacionado a la base de datos, se asemeja mucho a lo que se grabará sin embargo, esto es lo que se usará en la aplicación y luego lo que se tendrá en la base de datos es indiferente porque la base de datos puede cambiar pero yo no quiero que mi aplicación se vea afectada y por otro lado si la entidad cambia por alguna razón no debería verse afectada la base de datos tampoco */

/* aquí como nosotros queramos crear nuestra entidad va a depender de lo que tengamos, por ejemplo tener un método que se fromJSON, o de repente otros. Esta es una simple entidad y conforme la vayamos usando, por ejemplo se podría crear un mapper y de lo que venga de Prisma o Mongo u otra base de datos a nuestra entidad vamos a tener que hacer algún tipo de conversión y que cuando se use la entidad siempre se va a tener la información correspondiente */
export class ProductEntity {
  constructor(
    /* no se coloca como readonly a las propiedades porque bueno, esas propiedades se podrían modificar. Aquí es muy similar a lo que se tiene en la base de datos pero NO es lo mismo */
    public id: string, // aunque Mongoose colocará el _id, aquí también lo manejaremos pero como un id
    public name: string,
    public description: string,
    public price: number,
    public images: string[],
    public category: string,
    public subCategory: string,
    public sizes: string[],
    // public date: Date = new Date(), // por defecto que se coloque la fecha actual aquí también en la entidad
    public date?: Date, // dejar que el modelo maneje la fecha predeterminada (Date.now). En la entidad, se hará que la fecha sea opcional, de manera que la lógica no dependa de la entidad para asignar valores. Esto mantiene la independencia entre capas
    // public bestseller?: boolean // cuando se coloca una propiedad en opcional, tiene que ir al último
    public bestseller: boolean = false
  ) {}

  /* ahora con esto podemos crear la instancia desde el objeto, entonces esto quiere decir que en realidad nuestro fromObject sería un método estático y por eso el static y al final nuestro fromObject recibirá el objeto y crea nuestra instancia con lo que necesita (con lo que se pide en el constructor) */
  /* cuando se define un argumento como { [key: string]: any }, se está diciendo básicamente que esperamos un objeto donde las keys del objeto son strings y los valores pueden ser de cualquier tipo, esto es útil cuando no se sabe exactamente qué propiedades va a tener el objeto que se va a recibir en la función, pero se sabe que puede tener varias y que todas serán strings con cualquier tipo de valor, es como una forma de decir esto puede ser cualquier cosa pero con la estructura de un objeto, así da la flexibilidad para manejar datos que pueden variar mucho sin perder la ventaja de tener tipado en TypeScript */
  public static fromObject(object: { [key: string]: any }): ProductEntity {
    /* desestructurar de las propiedades que vienen de la base de datos para poder luego retornarlas en nuestra entidad */
    const {
      id, // este sería ya el id serializado, es decir, el que nos da Mongoose
      _id, // es el que viene de Mongo (Propiedad interna de MongoDB)
      name,
      description,
      price,
      images,
      category,
      subCategory,
      sizes,
      date,
      bestseller,
    } = object;

    /* aquí se podrían realizar los análisis o las validaciones necesarias. Aquí también se podría colocar dentro de un logger pero técnicamente esto no se estaría esperando que sea algo que dispare el cliente o sea la solicitud de la persona, sino que son más que todo protecciones para los desarrolladores que quieran usar este ProductEntity por si algún día cambia la base de datos y que no esté estrechamente ligado nuestro código con esa base de datos y poder trabajarlo de forma independiente */
    /* para un caso práctico se podría colocar directo algo similar a un --if (!id) throw "id is required";-- con el throw "propiedad is required" directo porque es un caso práctico y solo se está colocando el mensaje directo, pero sería mejor colocarlo con --if (!id) throw new Error("propiedad is required");-- para crear un objeto de error que contiene información adicional lo que facilita la depuración y entendimiento del código de error, pero en este caso haremos uso de la clase CustomError */

    if (!_id && !id)
      throw CustomError.badRequest_400("ProductEntity - id is missing"); // si el _id y id no vienen dará error

    if (!name)
      throw CustomError.badRequest_400("ProductEntity - name is missing");

    if (!description)
      throw CustomError.badRequest_400(
        "ProductEntity - description is missing"
      );

    if (price === undefined)
      throw CustomError.badRequest_400("ProductEntity - price is missing");

    if (!images || !Array.isArray(images) || images.length === 0)
      throw CustomError.badRequest_400(
        "ProductEntity - images are missing or invalid"
      );

    if (!category)
      throw CustomError.badRequest_400("ProductEntity - category is missing");

    if (!subCategory)
      throw CustomError.badRequest_400(
        "ProductEntity - subCategory is missing"
      );

    if (!sizes || !Array.isArray(sizes) || sizes.length === 0)
      throw CustomError.badRequest_400(
        "ProductEntity - sizes are missing or invalid"
      );

    /* regresar nuestra entidad ProductEntity con las propiedades necesarias para nuestra aplicación (aquí ya estarían convertidas del objeto que se recibe de la base de datos) */
    return new ProductEntity(
      _id || id,
      name,
      description,
      price,
      images,
      category,
      subCategory,
      sizes,
      // date ? new Date(date) : new Date(), // Si date viene desde el modelo o algún otro origen, se utilizará y si date no viene, la entidad asignará automáticamente la fecha actual. Si se decide no asignar un valor predeterminado en la entidad (usando undefined como en el código de abajo), se está confiando en el modelo para manejarlo al guardar en la base de datos. Esto simplifica la lógica en la entidad y mantiene la separación de responsabilidades. Sin embargo, si se necesita una fecha siempre presente para la aplicación, se podría asignar un valor como new Date() directamente en la entidad como salvaguarda

      /* Si la fecha no viene, qué pasa en la práctica?
          Desde la base de datos: Si el modelo tiene una lógica predeterminada, como: -- date: { type: Date, default: Date.now } -- entonces Mongoose asignará automáticamente la fecha actual al momento de guardar el registro, sin importar si la entidad no la proporciona. En este caso, cuando se consulte el registro, siempre tendrá una fecha válida.
      */
      date ? new Date(date) : undefined, // Usa la fecha si viene del modelo. Cuando undefined se asigna a date en la entidad, significa que no se establecerá ninguna fecha por defecto desde la entidad misma, y será responsabilidad del modelo de Mongoose (o de la base de datos) manejar la fecha.

      bestseller ?? false
    );
  }
}
