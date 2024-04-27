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

export async function createUser(cpf, name, password, role, totalTime, lunchTime){
    var result = { };
    const token = await AsyncStorage.getItem("@TimeSheet:userToken");

    try {

        var response = await ApiService.sendRequest("/user/create", "POST", {
            cpf : cpf,
            name : name, 
            password : password,
            role : role ? 1 : 0,
            totalTime: parseFloat(totalTime),
            lunchTime: parseFloat(lunchTime)
        }, token);

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
        
    }catch(err) {
        result.message = "Error ao se comunicar com o servidor.";
        result.status = "Error";
        return result;
    } 
}