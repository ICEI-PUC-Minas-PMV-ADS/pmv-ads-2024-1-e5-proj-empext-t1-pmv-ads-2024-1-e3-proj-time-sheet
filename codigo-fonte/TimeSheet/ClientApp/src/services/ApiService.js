export async function sendRequest(url, method, body, token) {

    var headers = new Headers();
    var requestOptions = {};
    requestOptions.redirect = 'follow';

    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }

    if (body) {
        headers.append("Content-Type", "application/json");
        requestOptions.body = JSON.stringify(body);
    }

    requestOptions.headers = headers;

    switch (method) {
        case 'GET':
        case 'POST':
        case 'DELETE':
        case 'PUT':
            requestOptions.method = method;
            break;
        default:
            throw Error(`Invalid request method: ${method}.`);
    }

    return await fetch(url, requestOptions);
}