const defaultHeaders = new Headers({
    "Content-Type": "application/json",
});

export const request = (url, method, data = {}, headers = {}) => {
    for (const headerKey in headers) {
        defaultHeaders.append(headerKey, headers[headerKey]);
    }

    var requestOptions = {
        method: method,
        headers: defaultHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
    };

    return fetch(url, requestOptions).then((response) =>
    {
        // console.log(response.text())
        if(!response.ok){
            return response.json().then(json => { throw new Error(JSON.stringify(json)) })
        } else {
            return response; 
        }
        // return !response.ok ? Promise.reject(response) : response.json()
    }
    );
};
