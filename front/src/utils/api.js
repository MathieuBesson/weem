const defaultHeaders =  new Headers({
    "Content-Type": "application/json",
}); 

export function register(username, password, number = null, mail = null) {

    var raw = JSON.stringify({
        email: mail,
        password: password,
        name: username,
        phone: number,
    });

    var requestOptions = {
        method: "POST",
        headers: defaultHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("http://weem.com/api/users", requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
}
