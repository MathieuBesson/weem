import { createSlice, configureStore } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: "",
        datas: {},
    },
    reducers: {
        setToken(state, action) {
            console.log("On set le state");
            // console.log(action.payload);
            const cookies = new Cookies();
            cookies.set("token", action.payload, { path: "/" });
            state = {
                ...state,
                token: action.payload,
            };
            return state;
        },
        setUserDatas(state, action) {
            console.log("On set le state");
            // console.log(action.payload);
            state = {
                ...state,
                datas: action.payload,
            };
            return state;
        },
    },
});

const constantesSlice = createSlice({
    name: "constantes",
    initialState: {},
    reducers: {
        setConstantes(state, action) {
            state = { ...action.payload };
            return state;
        },
    },
});

const currentCarSlice = createSlice({
    name: "currentCar",
    initialState: null,
    reducers: {
        setCurrentCar(state, action) {
            state = action.payload;
            return state;
        },
    },
});

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        constantes: constantesSlice.reducer,
        currentCar: currentCarSlice.reducer,
    },
});

export const { setToken, setUserDatas } = userSlice.actions;
export const { setConstantes } = constantesSlice.actions;
export const { setCurrentCar } = currentCarSlice.actions;
