import { validateCpf } from "./utils";

/* Name Validations */

function nameIsBlank(name) {
  return !name;
}

function nameLengthTooShort(name) {
  return name.length < 3;
}

function nameLengthTooLong(name) {
  return name.length > 50;
}

export const nameValidations = {
  nameIsBlank,
  nameLengthTooShort,
  nameLengthTooLong,
};

/* CPF Validations */

function cpfIsBlank(cpf) {
  return !cpf;
}

function cpfLengthTooShort(cpf) {
  return cpf < 11;
}

function cpfIsAllDigitsSame(cpf) {
  return /^(\d)\1{10}$/.test(cpf);
}

function cpfIsInvalid(cpf) {
  return !validateCpf(cpf);
}

export const cpfValidations = {
  cpfIsBlank,
  cpfLengthTooShort,
  cpfIsAllDigitsSame,
  cpfIsInvalid,
};

/* Password Validations */

function passwordIsBlank(password) {
  return !password;
}

function passwordLengthTooShort(password) {
  return password .length < 8;
}

function passwordDoesNotHaveLetters(password) {
  return !/[A-Za-z]/.test(password);
}

function passwordDoesNotHaveUpperLetters(password) {
  return !/[A-Z]/.test(password);
}

function passwordDoesNotHaveNumbers(password) {
  return !/[0-9]/.test(password);
}

function passwordContainsSpecialChars(password) {
  return /[#%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
}

export const passwordValidations = {
  passwordIsBlank,
  passwordLengthTooShort,
  passwordDoesNotHaveLetters,
  passwordDoesNotHaveNumbers,
  passwordContainsSpecialChars,
  passwordDoesNotHaveUpperLetters,
};

/* Time Validations */

function timeIsOutsideTimeBounds(time) {
  return time > 24 || time < 0;
}

function timeIsBlank(time) {
  return !time;
}

export const timeValidations = {
  timeIsOutsideTimeBounds,
  timeIsBlank,
};
