/* puede ser extends o implements */
export class CustomError extends Error {
  /* se coloca como private para que solo se pueda utilizar en nuestros métodos estáticos */
  private constructor(
    public readonly messageError: string,
    public readonly statusCode: number
  ) {
    /* aquí se coloca el super() porque como CustomError se está extendiendo del Error entonces necesita inicializar lo que necesita el Error para que sea permitido */
    super(messageError);

    /* Garantiza que instanceof funcione correctamente al extender clases nativas como Error */
    Object.setPrototypeOf(this, new.target.prototype); // Para soporte completo con "instanceof". Esta línea asegura que el objeto creado (this) tenga el prototipo correcto, lo que permite que "instanceof" funcione como se espera incluso si estamos extendiendo una clase nativa como Error. En JavaScript, cuando se extiende una clase nativa como Error, hay ciertos problemas de compatibilidad con el operador instanceof debido a cómo se establece el prototipo internamente. Por defecto, al crear una instancia de una clase que extiende Error, el prototipo de la instancia puede no coincidir con el prototipo de la subclase. Sin esta línea, error instanceof CustomError podría devolver false debido a problemas con el prototipo. Aquí "new.target" referencia la clase concreta que se está instanciando que en este caso, es CustomError. "Object.setPrototypeOf(this, new.target.prototype)" asegura que la instancia (this) tenga el prototipo de la clase CustomError y no solo el de Error.

    /* Limpia el stack trace eliminando detalles irrelevantes del constructor y enfocándose en el lugar donde ocurrió el error */
    Error.captureStackTrace(this, this.constructor); // Generar un stack trace (traza de pila) limpio y útil para depuración. En Node.js, Error.captureStackTrace es una API específica que permite capturar y personalizar el stack trace de un error. Cuando se lanza un error, la traza de pila incluye toda la información sobre dónde ocurrió el error en el código. Sin embargo, puede incluir detalles innecesarios, como la invocación del constructor de CustomError. En "Error.captureStackTrace" toma dos argumentos: this: El objeto donde se almacenará el stack trace (la instancia del error). this.constructor: El constructor que se omitirá del stack trace. Esto significa que los métodos del propio CustomError no aparecerán en la traza, haciendo que sea más limpio y directamente relacionado con el lugar donde ocurrió el error.
  }

  /* como van a ser muchos errores los que podríamos manejar, entonces sería medio tedioso ir creando la instancia de CustomError y pasarle el messageError y statusCode, entonces también podríamos hacer una serie de factory constructors o métodos factory que regresen nuestra instancia previamente creada */
  static badRequest_400(messageError: string): CustomError {
    /* regresar una instancia de nuestro CustomError con el messageError del método badRequest y el código en duro de lo que sería el error personalizado */
    return new CustomError(messageError, 400);
  }

  static unauthorized_401(messageError: string): CustomError {
    return new CustomError(messageError, 401);
  }

  static forbidden_403(messageError: string): CustomError {
    return new CustomError(messageError, 403);
  }

  static notFound_404(messageError: string): CustomError {
    return new CustomError(messageError, 404);
  }

  static internalServer_500(messageError: string): CustomError {
    return new CustomError(messageError, 500);
  }
}
