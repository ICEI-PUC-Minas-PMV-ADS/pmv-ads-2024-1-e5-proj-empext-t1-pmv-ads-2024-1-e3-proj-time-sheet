export async function sendRequest(url, method, body, token) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  const API_URL = "https://localhost:7278";

  console.log("API " + API_URL);

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

  url = API_URL.concat(url);

  return await fetch(url, requestOptions);
}
