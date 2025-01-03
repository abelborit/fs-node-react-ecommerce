import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";

/* el controlador será una clase que nos permita hacer inyección de dependencias y también tendrá todos los handlers los cuales recibirán la información para poder realizar alguna acción pero los handlers en el controlador no deberían realizar los trabajos de creación, validación y los demás procesos, ya que simplemente este es el controlador de la ruta y en este caso quien va a realizar esas tareas será un servicio que sería algo similar a un gestor de estado y será quien se encargue de ejecutar toda la parte pesada, es decir, todos los procesos o tareas de creación, validación, etc, entonces nuestro controlador es quien delegará la información al servicio quien realizará la lógica */
export class ProductController {
  /* nuestro constructor será para poder hacer la inyección de dependencias */
  constructor() {}

  /* vamos a centralizar las respuestas que sean de error. Se coloca error: unknown porque puede ser un error lanzada por la aplicación o nuestro custom error, entonces lo haremos de tal forma que pueda aceptar cualquier tipo de excepción que se pueda dar. Algo importante a tener en cuenta es que este handleErrorResponse tiene que ser lo último que se pueda ejecutar */
  private handleErrorResponse = (response: Response, error: unknown) => {
    /* significa que es una excepción lanzada o controlada por nosotros mismos y que intencionalmente nosotros hicimos para poder controlarlo */
    if (error instanceof CustomError) {
      return response.status(error.statusCode).json({
        success: error.success,
        error: error.messageError,
      });
    }

    console.error(error); // Log para depuración de errores no controlados

    /* si no es un error controlado por nosotros entonces será un 500 porque es un error que no estamos manejando ni controlando. Esto no debería de suceder nunca porque no es un error manejado por nosotros, pero se puede dar por ejemplo que la base de datos no estaba creada, una conversión no fue posible o cosas similares */
    return response.status(500).json({
      success: false,
      error: "Internal Server Error - Check your logs (ProductController)",
    });
  };

  public getProducts = (request: Request, response: Response) => {
    response.status(200).json({ message: "getProducts" });
  };

  public getProductById = (request: Request, response: Response) => {
    response.status(200).json({ message: "getProductById" });
  };

  public createProduct = (request: Request, response: Response) => {
    response.status(200).json({ message: "createProduct" });
  };

  public updateProduct = (request: Request, response: Response) => {
    response.status(200).json({ message: "updateProduct" });
  };

  public deleteProduct = (request: Request, response: Response) => {
    response.status(200).json({ message: "deleteProduct" });
  };
}
