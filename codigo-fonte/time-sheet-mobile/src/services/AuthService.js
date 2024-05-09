import * as ApiService from "./ApiService.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function authenticate(cpf, password) {
  var result = {};

  try {
    var response = await ApiService.sendRequest("/user/authenticate", "POST", {
      cpf: cpf,
      password: password,
    });

    if (!response.ok) {
      if (response.status === 401) {
        result.message = "CPF ou senha inválida.";
        result.status = "UserNotFound";
      } else {
        result.message = "Error ao se comunicar com o servidor.";
        result.status = "Error";
      }

      return result;
    }

    var json = await response.text();
    var data = JSON.parse(json);

    await AsyncStorage.setItem("@TimeSheet:userCPF", cpf);
    await AsyncStorage.setItem("@TimeSheet:userToken", data.token);
    await AsyncStorage.setItem("@TimeSheet:userId", data.id);

    result.message = "Usuário autenticado com sucesso.";
    result.status = "UserAuthenticated";

    return result;
  } catch (err) {
    result.message = "Error ao se comunicar com o servidor.";
    result.status = "Error";
    return result;
  }
}
export async function logout() {
  await AsyncStorage.removeItem("@TimeSheet:userCPF");
  await AsyncStorage.removeItem("@TimeSheet:userToken");
  await AsyncStorage.removeItem("@TimeSheet:userId");
}
export async function verifyToken() {
  const cpf = await AsyncStorage.getItem("@TimeSheet:userCPF");
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  if (token === null || cpf === null) {
    return false;
  }

  var response = await ApiService.sendRequest("/user/verify", "POST", {
    cpf: cpf,
    token: token,
  });

  if (!response.ok) {
    return false;
  }

  return true;
}
export async function getAuthenticatedUserData() {
  var userToken = await AsyncStorage.getItem("@TimeSheet:userToken");

  if (!userToken) {
    return null;
  }

  var response = await ApiService.sendRequest(
    `/user/authenticated`,
    "GET",
    null,
    userToken
  );

  if (!response.ok) {
    return null;
  }

  var json = await response.text();
  var userData = JSON.parse(json);

  return userData;
}
export async function changepassword(cpf, password) {
  var result = {};

  try {
    var response = await ApiService.sendRequest("/user/changepassword", "PUT", {
      cpf: cpf,
      password: password,
    });


    var json = await response.text();
    var userData = JSON.parse(json);

    if (!response.ok) {
      if (response.status === 404) {
        result.message = "CPF inválido.";
        result.status = "UserNotFound";
      } else {
        result.message = "Error ao se comunicar com o servidor.";
        result.status = "Error";
      }

      return result;
    }

    result.message = "Senha alterada com sucesso.";
    result.status = "UserPasswordChanged";

    return result;
  } catch (err) {
    result.message = "Error ao se comunicar com o servidor.";
    result.status = "Error";
    return result;
  }
}
