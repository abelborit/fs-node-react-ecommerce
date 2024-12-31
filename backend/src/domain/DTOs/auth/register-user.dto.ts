/* por ejemplo si queremos crear un usuario necesitaríamos que nos mande cierta información como un name, email, age y password pero cada propiedad o campo puede tener sus propias restricciones y validaciones. Si estamos esperando recibir esa información entonces eso se tiene que validar y transformar en caso sea necesario para tener el tipo de dato que se espera recibir porque puede ser que la aplicación no funcione si por ejemplo en el age se manda como número pero se esperaba recibir un string, entonces para hacer esas validaciones y transformaciones se usan los DTOs */

/* Los DTOs están diseñados para validar y transformar datos antes de interactuar con la base de datos o realizar lógica adicional. Aunque no tienen que coincidir exactamente con el esquema del modelo (ya que pueden adaptarse según las necesidades del caso de uso), suelen reflejar la estructura esperada de los datos */

import { errorCommonMessageForm, regularExps } from "../../../config";

/* los DTOs pueden ser una clase o función, pero se debe de asegurar de cómo viene la data */
export class RegisterUserDTO {
  /* será un private constructor porque la única forma de crear un DTO será a través del método estático propio de esta clase */
  private constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  /* aquí las props van a simular lo que vendría del request.body. Lo que se regresa puede ser cualquier cosa según como lo necesitemos, puede ser ": RegisterUserDTO | undefined" indicando que hubo un error o también ": RegisterUserDTO | string" para manejar si se retornar un error en caso algo salió mal y ver el mensaje pero en este caso será ": [string?, RegisterUserDTO?]" un arreglo donde el primer elemento será un string para saber qué fue lo que salió mal que indicaría el error y el segundo será una instancia del RegisterUserDTO pero ambos serán opcionales porque si tenemos un error entonces está el string y si no tenemos un error entonces está el RegisterUserDTO que sería la instancia */
  static create(props: { [key: string]: any }): [string?, RegisterUserDTO?] {
    const { firstName, lastName, email, password } = props;

    /* validaciones de nuestras properties tal cual lo haríamos comúnmente */
    // Validate firstName
    if (!firstName)
      return [errorCommonMessageForm.firstNameRequired, undefined]; // se podría colocar también como --if (!name) return ["name is missing"];-- porque el segundo argumento sería considerado como undefined
    if (!regularExps.onlyLettersRegex.test(firstName))
      return [errorCommonMessageForm.onlyLetters, undefined];
    if (firstName.length < 2)
      return [errorCommonMessageForm.minLengthCharacters(2), undefined];
    if (firstName.length > 15)
      return [errorCommonMessageForm.maxLengthCharacters(15), undefined];

    // Validate lastName
    if (!lastName) return ["Last name is required", undefined];
    if (!regularExps.onlyLettersRegex.test(lastName))
      return [errorCommonMessageForm.onlyLetters, undefined];
    if (lastName.length < 2)
      return [errorCommonMessageForm.minLengthCharacters(2), undefined];
    if (lastName.length > 15)
      return [errorCommonMessageForm.maxLengthCharacters(15), undefined];

    // Validate email
    if (!email) return [errorCommonMessageForm.emailRequired, undefined];
    if (!regularExps.emailFormatRegex.test(email))
      return [errorCommonMessageForm.invalidEmail, undefined];

    // Validate password
    if (!password) return [errorCommonMessageForm.passwordRequired, undefined];
    if (password.length < 8)
      return [errorCommonMessageForm.passwordLength, undefined];
    if (!/[a-z]/.test(password))
      return [errorCommonMessageForm.passwordLowercase, undefined];
    if (!/[A-Z]/.test(password))
      return [errorCommonMessageForm.passwordUppercase, undefined];
    if (!/\d/.test(password))
      return [errorCommonMessageForm.passwordNumber, undefined];
    if (!regularExps.specialCharacterRegex.test(password))
      return [errorCommonMessageForm.passwordSpecial, undefined];

    return [
      undefined,
      new RegisterUserDTO(firstName, lastName, email, password),
    ];
  }
}
