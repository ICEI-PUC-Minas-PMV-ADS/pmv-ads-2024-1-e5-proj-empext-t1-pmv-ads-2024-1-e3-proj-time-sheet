import * as ApiService from "./ApiService.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function GetAllUsers() {

    var result = { };
    const token = await AsyncStorage.getItem("@TimeSheet:userToken");

    try {

        var response = await ApiService.sendRequest("/user/all", "GET", null, token);

        var json = await response.text();
        var data = JSON.parse(json);

        result.message = "Usuários encontrados.";
        result.status = "Success";
        result.users = data.users;

        return result;
        
    }catch(err) {
        result.message = "Error ao se comunicar com o servidor.";
        result.status = "Error";
        return result;
    }
}