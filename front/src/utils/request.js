const defaultHeaders = new Headers({
    "Content-Type": "application/json",
});

export const post = (url, data, headers = {}) => {
    for (const headerKey in headers) {
        defaultHeaders.append(headerKey, headers[headerKey]);
    }

    var requestOptions = {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
    };

    return fetch(url, requestOptions).then((response) =>
        !response.ok ? Promise.reject(response) : response.json()
    );
};
