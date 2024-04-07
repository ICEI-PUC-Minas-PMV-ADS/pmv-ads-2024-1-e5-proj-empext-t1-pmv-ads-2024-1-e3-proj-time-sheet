import * as ApiService from './ApiService.js';

export async function authenticate(cpf, password) {

    var result = {};

    var response = await ApiService.sendRequest('/user/authenticate', 'POST', {
        cpf: cpf,
        password: password
    });

    if (!response.ok) {
        if (response.status === 401) {
            result.message = 'CPF ou senha inválida.';
            result.status = 'UserNotFound';
        } else {
            result.message = 'Error ao se comunicar com o servidor.'
            result.status = 'Error';
        }

        return result;
    }

    var json = await response.text();
    var data = JSON.parse(json);

    localStorage.setItem('@TimeSheet:userCPF', cpf);
    localStorage.setItem('@TimeSheet:userToken', data.token);
    localStorage.setItem('@TimeSheet:userId', data.id);

    result.message = 'Usuário autenticado com sucesso.';
    result.status = 'UserAuthenticated';

    return result;
}
export async function logout() {
    localStorage.removeItem('@TimeSheet:userCPF');
    localStorage.removeItem('@TimeSheet:userToken');
    localStorage.removeItem('@TimeSheet:userId');
}
export async function verifyToken() {
    const cpf = localStorage.getItem('@TimeSheet:userCPF');
    const token = localStorage.getItem('@TimeSheet:userToken');

    if (token === null || cpf === null) {
        return false;
    }

    var response = await ApiService.sendRequest('/user/verify', 'POST', {
        cpf: cpf,
        token: token
    });

    if (!response.ok) {
        return false;
    }

    return true;
}
export async function getAuthenticatedUserData() {

    var userToken = localStorage.getItem('@TimeSheet:userToken');

    if (!userToken) {
        return null;
    }

    console.log(userToken);

    var response = await ApiService
        .sendRequest(`/user/authenticated`, 'GET', null, userToken);

    if (!response.ok) {
        return null;
    }

    var json = await response.text();
    var userData = JSON.parse(json);

    return userData;
}