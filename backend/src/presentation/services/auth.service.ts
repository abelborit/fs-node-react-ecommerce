/* este AuthService será quien se encargue de ejecutar toda la parte pesada, es decir, todos los procesos o tareas de creación, validación, etc */

/* tener en cuenta que se están creando 2 tokens diferentes:

  - Token de loginUser: Este token se genera cuando un usuario inicia sesión con éxito. Se utiliza para autenticar al usuario para solicitudes posteriores, permitiéndoles acceder a recursos protegidos.

  - Token de registerUser: Este token se genera cuando un nuevo usuario se registra. Su propósito principal es permitir al usuario acceder a su cuenta inmediatamente después de registrarse, sin necesidad de iniciar sesión nuevamente.
*/

import { UserModel } from "../../database/mongo";
import { LoginUserDTO, RegisterUserDTO } from "../../domain/DTOs/auth";
import { CustomError } from "../../domain/errors/custom.error";
import { UserEntity } from "../../domain/entities/user.entity";
import { bcryptAdapter, JwtAdapter } from "../../config";

/* para tener en cuenta que si queremos usar la arquitectura limpia en su totalidad, entonces estos métodos del AuthService serían los casos de uso */
/* Considerar que trabajar con servicios y trabajar con el patrón basado en repositorios junto con los casos de uso son dos formas diferentes de trabajar:

  - Los servicios suelen ser utilizados en arquitecturas orientadas a servicios (SOA) y microservicios, donde cada servicio encapsula una funcionalidad específica y proporciona una interfaz para interactuar con ella. Los servicios suelen ser más grandes en granularidad que los casos de uso y pueden abarcar varios casos de uso.

  - Por otro lado, el patrón basado en repositorios y casos de uso es una arquitectura común en el desarrollo orientado a objetos. En este patrón, los casos de uso representan los escenarios de negocio y definen las interacciones entre los objetos de la aplicación. Los repositorios, por su parte, encapsulan el acceso a los datos y proporcionan una interfaz consistente para interactuar con diferentes fuentes de datos.
*/
export class AuthService {
  /* colocamos el constructor para poder realizar inyección de dependencias. Aquí podríamos recibir una función para enviar el correo electrónico (que sería como tener un caso de uso con la lógica y simplemente aquí usarlo directamente) o inyectar el servicio del correo y poder usar sus métodos y lógica aquí. En este caso lo haremos inyectando el servicio del correo */
  constructor() {}

  /* tener en consideración que aquí como en otros archivos se está colocando como un function method normal (como una función con el nivel de public, private, etc) y no como función flecha como en el caso de los controladores por ejemplo el controller.ts porque, por ejemplo, en controller.ts si se ejecuta como un function method como en este archivo, entonces el puntero del "this" no funciona algunas veces y nos puede dar errores como que el objeto no está o no se definió, entonces al usar las funciones flecha solo hace caso al scope de su función como tal y solo en el controller.ts estamos usando las funciones flecha, aunque en realidad en todos los archivos se puede usar esa forma, de función flecha, porque al final de cuentas y a la larga, todo eso termina siendo lo mismo */
  public async registerUser(registerUserDTO: RegisterUserDTO) {
    /* en este método del servicio de AuthService es donde haremos realmente la lógica pesada de creación, validación, etc, para registrar a un usuario y aquí usaremos el modelo creado anteriormente porque es una referencia al modelo de la tabla que tenemos en Mongoose, es decir, es como una representación de la tabla de usuarios en nuestra base de datos, con este modelo podemos hacer consultas a la base de datos, como buscar un usuario, crear un nuevo usuario, actualizar un usuario, etc., todo esto ya está proporcionado por Mongoose, en este caso se usa el modelo para buscar un usuario por correo electrónico */
    /* tener en cuenta que aquí se está colocando directo el UserModel y no mediante una inyección de dependencias, lo cual, en un futuro, si se desea cambiar la base de datos la única parte donde tendrían que haber los cambios pesados sería aquí en el AuthService y pueden haber otros cambios en otros archivos pero ya no tan difíciles, se podría inyectar el repositorio para que sea el repositorio quien cambie la base de datos (usando el patrón repository) */
    const isUserExist = await UserModel.findOne({
      email: registerUserDTO.email,
    });

    if (isUserExist)
      throw CustomError.badRequest_400("Email already exist - AuthService");

    /* cuando se quiere grabar en base de datos, es mejor hacerlo dentro de un try/catch porque puede ser que alguna condición no se cumpla o de repente que algo suceda y que nosotros no estamos esperando eso, etc. pero tener en cuenta que no se debería de lanzar ese error del catch con el error 500, pero igual, por si sucede entonces ahí ya lo estamos controlando */
    try {
      const newUser = new UserModel(registerUserDTO);

      /* encriptar la contraseña */
      newUser.password = bcryptAdapter.hash(registerUserDTO.password);

      await newUser.save();

      /* en este punto también se puede tomar el objeto del newUser y crear nuestra entidad para asegurarnos al menos que vamos a trabajar con nuestra entidad y la entidad se encargará de validar todo. Este es un paso opcional aunque aquí lo haremos */
      /* algo importante a tener en cuenta es que nos está regresando el password y eso no lo queremos hacer público para el usuario, entonces haremos la desestructuración del password y del resto de las propiedades y lo que mandaremos será solo el resto de las propiedades, aunque también se pueden hacer de otras formas */
      // const newUserEntity = UserEntity.fromObject(newUser);
      const { password, ...restPropsNewUserEntity } =
        UserEntity.fromObject(newUser);

      /* aquí en el register veríamos qué guardar en el payload del token que en este caso solo guardaremos el id y el email del usuario. Puede ser que falle la creación o generación del token, pero eso no debería de ser un error como bad request, como lo venimos trabajando, sino, debería de ser un internal server error porque significa que algo sucedió y por ende dió error y que no estábamos esperando que sucediera ese error */
      const token = await JwtAdapter.generateToken({
        id: newUser.id,
        email: newUser.email,
      });
      /* siempre nuestro JwtAdapter.generateToken(......) está regresando de manera exitosa todo mediante el resolve(.....), así falle o no la generación, pero aquí ya realizamos la validación correspondiente */
      if (!token)
        throw CustomError.internalServer_500(
          "Error while creating JWT - AuthService"
        );

      // return newUser; // se puede usar el newUser dado por la base de datos
      // return newUserEntity; // se puede usar newUserEntity dado por nuestra entidad UserEntity
      /* Podemos usar https://jwt.io/ para validar el token que estamos generando y ver si la información que estamos enviando nos genera correctamente. */
      return {
        success: true,
        user: restPropsNewUserEntity,
        token: token,
      }; // se puede usar restPropsNewUserEntity dado por nuestra entidad UserEntity sin utilizar el password. Se puede colocar como mejor veamos por conveniente, en este caso se dividirán las propiedades, es decir, se enviará las propiedades del usuario y también el token pero por separado
    } catch (error) {
      throw CustomError.internalServer_500(
        `Internal Server Error - AuthService - ${error}`
      );
    }
  }

  public async loginUser(loginUserDTO: LoginUserDTO) {
    const isUserExist = await UserModel.findOne({
      email: loginUserDTO.email,
    });

    if (!isUserExist)
      throw CustomError.badRequest_400("Email does not exist - AuthService");

    /* comparar la contraseña recibida y la hasheada */
    const isMatchPassword = bcryptAdapter.compare(
      loginUserDTO.password,
      isUserExist.password! // se coloca el ! porque ya sabemos que el isUserExist sí existe porque si no existiera entonces ya se está validando arriba
    );

    if (!isMatchPassword)
      throw CustomError.badRequest_400("Password is not valid - AuthService");

    try {
      const { password, ...restPropsNewUserEntity } =
        UserEntity.fromObject(isUserExist);

      /* aquí en el login veríamos qué guardar en el payload del token que en este caso solo guardaremos el id y el email del usuario. Puede ser que falle la creación o generación del token, pero eso no debería de ser un error como bad request, como lo venimos trabajando, sino, debería de ser un internal server error porque significa que algo sucedió y por ende dió error y que no estábamos esperando que sucediera ese error */
      const token = await JwtAdapter.generateToken({
        id: isUserExist.id,
        email: isUserExist.email,
      });
      /* siempre nuestro JwtAdapter.generateToken(......) está regresando de manera exitosa todo mediante el resolve(.....), así falle o no la generación, pero aquí ya realizamos la validación correspondiente */
      if (!token)
        throw CustomError.internalServer_500(
          "Error while creating JWT - AuthService"
        );

      /* Podemos usar https://jwt.io/ para validar el token que estamos generando y ver si la información que estamos enviando nos genera correctamente. */
      return {
        success: true,
        user: restPropsNewUserEntity,
        token: token,
      }; // se puede usar restPropsNewUserEntity dado por nuestra entidad UserEntity sin utilizar el password. Se puede colocar como mejor veamos por conveniente, en este caso se dividirán las propiedades, es decir, se enviará las propiedades del usuario y también el token pero por separado
    } catch (error) {
      throw CustomError.internalServer_500(
        `Internal Server Error - AuthService - ${error}`
      );
    }
  }
}
