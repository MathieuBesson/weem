export const request = ({
    url,
    method,
    token = null,
    data = {},
    headers = {},
}) => {
    const defaultHeaders = {
        "Content-Type":
            method !== "PATCH"
                ? "application/json"
                : "application/merge-patch+json",
    };

    if (token !== null && token !== "") {
        headers = {
            ...headers,
            Authorization: "Bearer " + token,
        };
    }

    var requestOptions = {
        method: method,
        headers: new Headers({
            ...defaultHeaders,
            ...headers,
        }),
        redirect: "follow",
    };

    if (data !== null && Object.keys(data).length !== 0) {
        requestOptions.body = JSON.stringify(data);
    }

    return fetch(url, requestOptions).then((response) => {
        // console.log(response)
        if (!response.ok) {
            return response.json().then((json) => {
                console.log(JSON.stringify(json));

                let errorMessage = "";
                switch (true) {
                    case json.hasOwnProperty("message"):
                        errorMessage = json.message;
                        if (json.message === "Invalid credentials.") {
                            errorMessage =
                                "La combinaison indentifiant / mot de passe n'est pas valide";
                        }
                        break;
                    case json.hasOwnProperty("violations"):
                        errorMessage = json.violations[0].message;
                        if (json.message === "Invalid credentials.") {
                            errorMessage =
                                "La combinaison indentifiant / mot de passe n'est pas valide";
                        }
                        break;
                    default:
                        errorMessage = "Erreur par défaut";
                }
                throw new Error(errorMessage);
            });
        } else {
            return response;
        }
        // return !response.ok ? Promise.reject(response) : response.json()
    });
};

export const formateResponse = (response) => {
    return response.json().then((data) => {
        console.log(data);
        if (data.hasOwnProperty("hydra:member")) {
            return Object.values(data["hydra:member"]);
        }
        return data;
    });
};
