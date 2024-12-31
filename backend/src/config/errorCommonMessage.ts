/* Mensajes de error comunes para los formularios de login y register */
const errorCommonMessageForm = {
  /* required inputs */
  firstNameRequired: "FirstName is required",
  lastNameRequired: "LastName is required",
  emailRequired: "Email is required",
  passwordRequired: "Password is required",

  /* minlength - maxlength */
  minLengthCharacters: (value: number) => {
    return `Must be ${value} characters or less`;
  },
  maxLengthCharacters: (value: number) => {
    return `Must be ${value} characters or more`;
  },

  /* other common message */
  onlyLetters: "Must contain only letters",
  invalidEmail: "Invalid email format: email@example.com",

  /* password strength indicator */
  passwordLength: "Must be 8 characters or more",
  passwordLowercase: "Must contain at least one lowercase letter",
  passwordUppercase: "Must contain at least one uppercase letter",
  passwordNumber: "Must contain at least one number",
  passwordSpecial: "Must contain at least one special character",
  passwordsNotMatch: "The passwords must be equal",
};

export { errorCommonMessageForm };
