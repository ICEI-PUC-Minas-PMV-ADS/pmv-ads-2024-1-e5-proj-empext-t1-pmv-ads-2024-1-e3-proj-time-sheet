import * as ApiService from "./ApiService.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function startWorkJourney() {
  var result = {};
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  try {
    var response = await ApiService.sendRequest(
      "/workjourney/startworkjourney",
      "POST",
      null,
      token
    );

    if (!response.ok) {
      if (response.status === 404) {
        result.message = "usuário não encontrado";
        result.status = "UserNotFound";
      } else {
        result.message = "Error ao se comunicar com o servidor.";
        result.status = "Error";
      }

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

export async function finishWorkJourney() {
  var result = {};
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  try {
    var response = await ApiService.sendRequest(
      "/workjourney/finishworkjourney",
      "POST",
      null,
      token
    );

    if (!response.ok) {
      if (response.status === 404) {
        result.message = "usuário não encontrado";
        result.status = "UserNotFound";
      } else {
        result.message = "Error ao se comunicar com o servidor.";
        result.status = "Error";
      }

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

export async function startLunchTime() {
  var result = {};
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  try {
    var response = await ApiService.sendRequest(
      "/workjourney/startlunchtime",
      "POST",
      null,
      token
    );

    if (!response.ok) {
      if (response.status === 404) {
        result.message = "usuário não encontrado";
        result.status = "UserNotFound";
      } else {
        result.message = "Error ao se comunicar com o servidor.";
        result.status = "Error";
      }

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

export async function finishLunchTime() {
  var result = {};
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  try {
    var response = await ApiService.sendRequest(
      "/workjourney/finishlunchtime",
      "POST",
      null,
      token
    );

    if (!response.ok) {
      if (response.status === 404) {
        result.message = "usuário não encontrado";
        result.status = "UserNotFound";
      } else {
        result.message = "Error ao se comunicar com o servidor.";
        result.status = "Error";
      }

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

export async function journeys(year, month) {
  var result = {};
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  try {
    var response = await ApiService.sendRequest(
      `/workjourney/journeys/${year}/${month}`,
      "GET",
      null,
      token
    );

    if (!response.ok) {
      if (response.status === 404) {
        result.message = "Jornada de trabalho não iniciada";
        result.status = "NotFound";
      } else {
        result.message = "Error ao se comunicar com o servidor.";
        result.status = "Error";
      }

      return result;
    }

    var json = await response.text();
    var data = JSON.parse(json);

    result.workJourneys = data.workJourneys;
    result.status = data.status;

    return result;
  } catch (err) {
    result.message = "Error ao se comunicar com o servidor.";
    result.status = "Error";
    return result;
  }
}

export async function alljourneys(year, month, includeInactive) {
  var result = {};
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  try {
    var response = await ApiService.sendRequest(
      `/workjourney/all/${year}/${month}?includeInactive=${includeInactive}`,
      "GET", null,
      token
    );

    if (!response.ok) {
      result.message = "Error ao se comunicar com o servidor.";
      result.status = "Error";

      return result;
    }

    var json = await response.text();
    var data = JSON.parse(json);

    result.workJourneys = data.workJourneys;
    result.status = "Success";

    return result;
  } catch (err) {
    result.message = "Error ao se comunicar com o servidor.";
    result.status = "Error";
    return result;
  }
}

export async function inProgress() {
  var result = {};
  const token = await AsyncStorage.getItem("@TimeSheet:userToken");

  try {
    var response = await ApiService.sendRequest(
      "/workjourney/inprogress",
      "GET",
      null,
      token
    );

    if (!response.ok) {
      if (response.status === 404) {
        result.message = "Jornada de trabalho não iniciada";
        result.status = "NotFound";
      } else {
        result.message = "Error ao se comunicar com o servidor.";
        result.status = "Error";
      }

      return result;
    }

    var json = await response.text();
    var data = JSON.parse(json);

    result.id = data.id;
    result.userId = data.userId;
    result.date = data.date;
    result.startTime = data.startTime;
    result.startLunchTime = data.startLunchTime;
    result.endLunchTime = data.endLunchTime;
    result.endTime = data.endTime;
    result.status = data.status;

    return result;
  } catch (err) {
    result.message = "Error ao se comunicar com o servidor.";
    result.status = "Error";
    return result;
  }
}

export async function serverTime() {
  var result = {};

  try {
    var response = await ApiService.sendRequest(
      "/workjourney/servertime",
      "GET",
      null,
      null
    );

    if (!response.ok) {
      result.message = "Error ao se comunicar com o servidor.";
      result.status = "Error";

      return result;
    }

    var json = await response.text();
    var data = JSON.parse(json);

    result.date = data.date;
    result.time = data.time;
    result.status = "Success";

    return result;
  } catch (err) {
    result.message = "Error ao se comunicar com o servidor.";
    result.status = "Error";
    return result;
  }
}
