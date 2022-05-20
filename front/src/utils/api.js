import { request, formateResponse } from "./request";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useGetAuthToken } from "./auth";

const baseUrl = "http://weem.com"; 
export const apiEndPoint = {
    register: {
        method: "POST",
        url: "/api/users",
        tokenRequired: false,
    },
    login: {
        method: "POST",
        url: "/api/login_check",
        tokenRequired: false,
    },
    constantes: {
        method: "GET",
        url: "/api/constantes",
        tokenRequired: false,
    },
    userConnected: {
        method: "GET",
        url: "/api/users/connected",
        tokenRequired: true,
    },
    brands: {
        method: "GET",
        url: "/api/car_brands",
        tokenRequired: true,
    },
    saveCar: {
        method: "POST",
        url: "/api/cars",
        tokenRequired: true,
    },

    
};

const generateUrl = (url, dataQuery = null) => {
    if (dataQuery) {
        if (dataQuery.hasOnePropriety("justValue")) {
            url += dataQuery.justValue;
        }

        if (dataQuery.hasOnePropriety("keyValue")) {
            url += "?";
            for (const dataQueryKey in dataQuery.keyValue) {
                url +=
                    dataQueryKey + "=" + dataQuery.keyValue[dataQueryKey] + "&";
            }
            url.slice(0, -1);
        }
    }
    return baseUrl + url;
};

export const useFetch = ({ endpoint, launchRequest, dataQuery, dataBody }) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [isSucceed, setIsSucced] = useState(false);
    const [queryCounter, setQueryCounter] = useState(0);
    const dispatch = useDispatch();


    const { cookieToken, stateToken} = useGetAuthToken(); 

    const token = stateToken ? stateToken : cookieToken;

    const endPointInfo = apiEndPoint[endpoint];

    useEffect(() => {
        if (launchRequest) {
            (async () => {
                try {
                    console.log("DO REQUEST : " + JSON.stringify({
                        url: generateUrl(endPointInfo.url, dataQuery),
                        method: endPointInfo.method,
                        data: dataBody,
                        token: token,
                    }));
                    const res = await request({
                        url: generateUrl(endPointInfo.url, dataQuery),
                        method: endPointInfo.method,
                        data: dataBody,
                        token: token,
                    });
                    setData(await formateResponse(res)); 
                    setError(null);
                    setIsSucced(true);
                    setQueryCounter(queryCounter + 1);
                } catch (err) {
                    console.log(err);
                    console.log(err.message);
                    setError(err.message);
                    setData({});
                    setIsSucced(false);
                    setQueryCounter(queryCounter + 1);
                }
            })();
        }
    }, [launchRequest]);
    return { data, error, isSucceed, queryCounter };
};

// export const register = (username, password, number = null, mail = null) => {
//     return post("http://weem.com/api/users", {
//         email: mail,
//         password: password,
//         name: username,
//         phone: number,
//     }).then((result) => {
//         return login(mail, password);
//     });
// };

// export const login = (username, password) => {

//     // const user = useSelector((state) => console.log(JSON.stringify(state.user)))
//     return post("http://weem.com/api/login_check", {
//         username: username,
//         password: password,
//     }).then(result => {

//         return result;
//     });
// };

// export const useRegister = (username, password, number = null, mail = null) => {
//     return request("http://weem.com/api/users", {
//         email: mail,
//         password: password,
//         name: username,
//         phone: number,
//     }).then((result) => {
//         return result;
//         // return login(mail, password);
//     });
// };
