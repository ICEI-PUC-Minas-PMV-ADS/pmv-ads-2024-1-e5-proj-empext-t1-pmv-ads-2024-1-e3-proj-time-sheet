// API - users/all

export async function getUsers () {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer ${token}");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  return await fetch("/user/all", requestOptions);
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
}


// API - users/authenticate
// "cpf": "00000000000",
// "password": "admin@123"

export async function authUsers(cpf, password) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "cpf": cpf,
    "password": password
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return await fetch("/user/authenticate", requestOptions).then(response => response.text())
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
}

// API - users/disable

export async function disabledUsers() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer ${token}");
  
  var raw = JSON.stringify({
    "userId": "f2f506c2-1a3e-425f-8349-4b228ad52e40"
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return await fetch("/user/disable", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
}



// API - users/enable

export async function enableUsers() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer ${token}");
  
  var raw = JSON.stringify({
    "userId": "f2f506c2-1a3e-425f-8349-4b228ad52e40"
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return await fetch("/user/enable", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
}

// API - users/changepassword

export async function changePassword() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer ${token}");
  
  var raw = JSON.stringify({
    "cpf": "50160209064",
    "password": "Admin@123"
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return await fetch("/user/changepassword", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
}

// API - users/update

export async function updateUser() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer ${token}");
  
  var raw = JSON.stringify({
    "userId": "f2f506c2-1a3e-425f-8349-4b228ad52e40",
    "name": "Bob Premista",
    "cpf": "56788075018",
    "totalTime": 10,
    "lunchTime": 2,
    "role": 0
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return await fetch("/user/update", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
}

// API - delete

export async function deleteUser() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer ${token}");
  
  var raw = JSON.stringify({
    "userId": "f2f506c2-1a3e-425f-8349-4b228ad52e40"
  });
  
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return await fetch("/user/delete", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
}

