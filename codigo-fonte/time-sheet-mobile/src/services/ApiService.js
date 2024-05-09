const apiUrl = "https://time-sheet-api.onrender.com";

export async function sendRequest(url, method, body, token) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  var headers = new Headers();
  var requestOptions = {};
  requestOptions.redirect = "follow";
  requestOptions.signal = controller.signal;

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (body) {
    headers.append("Content-Type", "application/json");
    requestOptions.body = JSON.stringify(body);
  }

  requestOptions.headers = headers;

  switch (method) {
    case "GET":
    case "POST":
    case "DELETE":
    case "PUT":
      requestOptions.method = method;
      break;
    default:
      throw Error(`Invalid request method: ${method}.`);
  }

  url = apiUrl.concat(url);

  return await fetch(url, requestOptions);
}
