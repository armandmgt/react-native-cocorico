import validators from '@cocorico/constants/validators';

export const validate = (value: string, validator: string) =>
  RegExp(validator).test(value);

export const isValidEmail = (email: string) =>
  validate(email, validators.email);

export const isValidPassword = (password: string) =>
  validate(password, validators.password);
