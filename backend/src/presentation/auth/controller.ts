import { Request, Response } from "express";
import { LoginUserDTO, RegisterUserDTO } from "../../domain/DTOs/auth";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../../domain/errors/custom.error";

/* el controlador será una clase que nos permita hacer inyección de dependencias y también tendrá todos los handlers los cuales recibirán la información para poder realizar alguna acción pero los handlers en el controlador no deberían realizar los trabajos de creación, validación y los demás procesos, ya que simplemente este es el controlador de la ruta y en este caso quien va a realizar esas tareas será un servicio que sería algo similar a un gestor de estado y será quien se encargue de ejecutar toda la parte pesada, es decir, todos los procesos o tareas de creación, validación, etc, entonces nuestro controlador es quien delegará la información al servicio quien realizará la lógica */
export class AuthController {
  /* nuestro constructor será para poder hacer la inyección de dependencias */
  constructor(public readonly authService: AuthService) {}

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
      error: "Internal Server Error - Check your logs (AuthController)",
    });
  };

  public loginUser = (request: Request, response: Response): void => {
    // console.log(request.body);

    const [error, loginUserDTO] = LoginUserDTO.execute(request.body);

    if (error) {
      response.status(400).json({ error: error + " - " + "LoginUserDTO" });
      return;
    }
    // response.status(200).json(loginUserDTO);

    /* aquí se coloca el ! porque ya se sabe que si todo está correcto entonces el loginUserDTO tiene el valor porque si hubiera algún error entonces iría al condicional del error */
    /* tener en cuenta que se está usando promesas (.then().catch()) y no async/await aunque ambos son totalmente válidos, pero Fernando Herrera recomienda usar promesas porque según Express nos dice que es una buena práctica cuando trabajamos en controladores, pero se puede usar async/await si nos resulta más cómodo ya que no debería haber problemas con usar uno o el otro */
    this.authService
      .loginUser(loginUserDTO!)
      .then((user) => response.status(200).json(user))
      .catch((error) => this.handleErrorResponse(response, error));
  };

  public registerUser = (request: Request, response: Response): void => {
    // console.log(request.body);

    const [error, registerUserDTO] = RegisterUserDTO.create(request.body);

    if (error) {
      response.status(400).json({ error: error + " - " + "RegisterUserDTO" });
      return;
    }
    // response.status(201).json(registerUserDTO);

    /* aquí se coloca el ! porque ya se sabe que si todo está correcto entonces el registerUserDTO tiene el valor porque si hubiera algún error entonces iría al condicional del error */
    /* tener en cuenta que se está usando promesas (.then().catch()) y no async/await aunque ambos son totalmente válidos, pero Fernando Herrera recomienda usar promesas porque es una buena práctica cuando trabajamos en controladores, pero se puede usar async/await si nos resulta más cómodo ya que no debería haber problemas con usar uno o el otro */
    this.authService
      .registerUser(registerUserDTO!)
      .then((user) => response.status(201).json(user)) // como estamos creando sería un status 201 porque significa que una solicitud se procesó correctamente y devolvió o creó, un recurso o recursos en el proceso
      .catch((error) => this.handleErrorResponse(response, error));
  };

  public adminUser = (request: Request, response: Response) => {
    response.status(200).json({ message: "adminUser" });
  };
}
