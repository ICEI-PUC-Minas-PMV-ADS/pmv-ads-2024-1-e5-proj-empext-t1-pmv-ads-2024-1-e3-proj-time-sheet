import { parse } from "react-native-svg";

export function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000);
  });
}

export function validateCpf(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, "");

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais, o que é inválido para um CPF válido
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
  if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Validação do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
  if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
    return false;
  }

  // CPF válido
  return true;
}

export function convertToTime(value) {
  if (!value) return value;

  if (value.length > 2) {
    value = value.slice(0, 2) + "." + value.slice(2);
  }

  return parseFloat(value);
}

export function parseToTimeValue(value) {
  if (!value) return value;

  value = value.toString();

  if (value.includes(".")) {
    var p1 = value.split(".")[0].padStart(2, "0");
    var p2 = value.split(".")[1].padEnd(2, "0");

    value = p1 + p2;
  } else {
    var p1 = value.padStart(2, "0");
    var p2 = "00";

    value = p1 + p2;
  }

  return value;
}

export function parseToDate(time = null, date = null) {
  if (!time && !date) return Date();

  const year = date.split("-")[0];
  const month = date.split("-")[1];
  const day = date.split("-")[2];

  return new Date(
    parseInt(year),
    parseInt(month - 1),
    parseInt(day),
    parseInt(time.split(":")[0]),
    parseInt(time.split(":")[1]),
    0,
    0
  );
}

export function calculateTimeDiference(date1, date2) {

  const hours1 = date1.getHours();
  const minutes1 = date1.getMinutes();
  const hours2 = date2.getHours();
  const minutes2 = date2.getMinutes();

  // Converte as horas e minutos para minutos totais desde o início do dia
  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  // Calcula a diferença em minutos
  const differenceInMinutes = Math.abs(totalMinutes2 - totalMinutes1);

  // Converte a diferença de volta para horas e minutos
  const diffHours = Math.floor(differenceInMinutes / 60);
  const diffMinutes = differenceInMinutes % 60;

  return {
    hours: diffHours,
    minutes: diffMinutes
  };
}

export function convertPartialTime(value) {

  var hours = "00";
  var minutes = "00";

  if (value.includes(":")) {
    hours = value.split(":")[0];
    minutes = value.split(":")[1];
  } else {
    hours = value;
    minutes = "00"
  }

  return `${hours.padStart("0", 2)}:${minutes.padEnd("0", 2)}`
}