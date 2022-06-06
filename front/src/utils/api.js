import { request, formateResponse } from "./request";
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
    car: {
        method: "GET",
        url: "/api/cars",
        tokenRequired: true,
    },
    carSave: {
        method: "POST",
        url: "/api/cars",
        tokenRequired: true,
    },
    carPart: {
        method: "GET",
        url: "/api/car_parts",
        tokenRequired: true,
    },
    carPartMaintenance: {
        method: "GET",
        url: "/api/car_part_maintenances",
        tokenRequired: true,
    },
    carPartMaintenanceSave: {
        method: "PATCH",
        url: "/api/car_part_maintenances",
        tokenRequired: true,
    },
    carPartMaintenanceCreate: {
        method: "POST",
        url: "/api/car_part_maintenances",
        tokenRequired: true,
    },
    carPartMaintenanceDelete: {
        method: "DELETE",
        url: "/api/car_part_maintenances",
        tokenRequired: true,
    },
};

const generateUrl = (url, dataQuery = null) => {
    if (dataQuery) {
        if (dataQuery.hasOwnProperty("justValue")) {
            url += "/" + dataQuery.justValue;
        }

        if (dataQuery.hasOwnProperty("keyValue")) {
            url += "?";
            for (const dataQueryKey in dataQuery.keyValue) {
                if (url.slice(-1) !== "?") {
                    url += "&";
                }
                url += dataQueryKey + "=" + dataQuery.keyValue[dataQueryKey];
            }
            url.slice(0, -1);
        }
    }
    return baseUrl + url;
};

export const useFetch = ({
    endpoint,
    launchRequest = false,
    dataQuery,
    dataBody,
}) => {
    // console.log("FETCH", generateUrl( apiEndPoint[endpoint].url, dataQuery), launchRequest);

    const defaultQuesryState = {
        data: {},
        error: null,
        isSucceed: false,
        queryCounter: 0,
        launchRequest: false,
    };

    const [queryState, setQueryState] = useState(defaultQuesryState);

    const resetQuery = () => {
        setQueryState({
            ...queryState,
            isSucceed: false,
            launchRequest: false,
        });
    };

    const setLaunchRequest = (value) => {
        setQueryState({
            ...queryState,
            launchRequest: value,
        });
    };

    const { cookieToken, stateToken } = useGetAuthToken();
    const token = stateToken ? stateToken : cookieToken;
    const endPointInfo = apiEndPoint[endpoint];

    useEffect(() => {
        if (launchRequest || queryState.launchRequest) {
            (async () => {
                try {
                    console.log(
                        "DO REQUEST : " +
                            JSON.stringify({
                                url: generateUrl(endPointInfo.url, dataQuery),
                                method: endPointInfo.method,
                                data: dataBody,
                                token: token?.slice(0, 10),
                            })
                    );

                    setQueryState({
                        data: await formateResponse(
                            await request({
                                url: generateUrl(endPointInfo.url, dataQuery),
                                method: endPointInfo.method,
                                data: dataBody,
                                token: token ? token : null,
                            })
                        ),
                        error: null,
                        isSucceed: true,
                        queryCounter: queryState.queryCounter + 1,
                        launchRequest: false,
                    });
                } catch (err) {
                    console.log(err);
                    console.log(err.message);

                    setQueryState({
                        data: {},
                        error: err.message,
                        isSucceed: false,
                        queryCounter: queryState.queryCounter + 1,
                        launchRequest: false,
                    });
                }
            })();
        }
    }, [launchRequest, queryState.launchRequest]);
    return { ...queryState, resetQuery, setLaunchRequest };
};
