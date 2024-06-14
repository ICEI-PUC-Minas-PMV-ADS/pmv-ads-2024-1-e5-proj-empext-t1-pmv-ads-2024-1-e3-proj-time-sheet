import * as ApiService from "./ApiService.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function GetAllUsers() {
  var result = {};
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  try {
    var response = await ApiService.sendRequest(
      "/user/all",
      "GET",
      null,
      token
    );

    var json = await response.text();
    var data = JSON.parse(json);

    result.message = "Usuários encontrados.";
    result.status = "Success";
    result.users = data.users;

    return result;
  } catch (err) {
    result.message = "Error ao se comunicar com o servidor.";
    result.status = "Error";
    return result;
  }
}

export async function createUser(
  cpf,
  name,
  password,
  role,
  totalTime,
  lunchTime
) {
  var result = {};
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  try {
    var response = await ApiService.sendRequest(
      "/user/create",
      "POST",
      {
        cpf: cpf,
        name: name,
        password: password,
        role: role ? 0 : 1,
        workTime: parseFloat(totalTime),
        lunchTime: parseFloat(lunchTime),
      },
      token
    );

    if (!response.ok && response.status !== 400) {
      result.message = "Erro ao se comunicar com o servidor.";
      result.status = "Error";

      return result;
    }

    var json = await response.text();
    var data = JSON.parse(json);

    result.message = data.message;
    result.status = data.status;

    return result;
  } catch (err) {
    result.message = "Error ao se comunicar com o servidor.";
    result.status = "Error";
    return result;
  }
}

export async function disableUser(id) {
  var result = {};
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  try {
    var response = await ApiService.sendRequest(
      "/user/disable",
      "PUT",
      { userId: id },
      token
    );

    var json = await response.text();
    var data = JSON.parse(json);

    result.message = data.message;
    result.status = data.status;

    return result;
    
  } catch (err) {
    result.message = "Error ao se comunicar com o servidor.";
    result.status = "Error";
    return result;
  }
}

export async function enableUser(id) {
  var result = {};
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  try {
    var response = await ApiService.sendRequest(
      "/user/enable",
      "PUT",
      { userId: id },
      token
    );

    var json = await response.text();
    var data = JSON.parse(json);

    result.message = data.message;
    result.status = data.status;

    return result;
    
  } catch (err) {
    result.message = "Error ao se comunicar com o servidor.";
    result.status = "Error";
    return result;
  }
}

export async function deleteUser(id) {
  var result = {};
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  try {
    var response = await ApiService.sendRequest(
      "/user/delete",
      "DELETE",
      { userId: id },
      token
    );

    var json = await response.text();
    var data = JSON.parse(json);

    result.message = data.message;
    result.status = data.status;

    return result;

  } catch (err) {
    result.message = "Error ao se comunicar com o servidor.";
    result.status = "Error";
    return result;
  }
}

export async function UpdateUser(id, name, cpf, totalTime, lunchTime, role) {
  var result = {};
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  try {

    var response = await ApiService.sendRequest(
      "/user/update",
      "PUT",
      {
        userId: id,
        name: name,
        cpf: cpf,
        workTime: totalTime,
        lunchTime: lunchTime,
        role: role,
      },
      token
    );

    var json = await response.text();
    var data = JSON.parse(json);

    result.message = data.message;
    result.status = data.status;

    return result;

  } catch (err) {
    result.message = "Error ao se comunicar com o servidor.";
    result.status = "Error";
    return result;
  }
}
