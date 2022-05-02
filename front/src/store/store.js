import { createSlice, configureStore } from "@reduxjs/toolkit"; 

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: "",
        user: {},
    },
    reducers: {
        setToken (state, action){
            console.log('On set le state')
            console.log(state); 
            state = {
                ...state, 
                token: action.payload
            }
            return state; 
        }
    }
});


const constantesSlice = createSlice({
    name: "constantes",
    initialState: {},
    reducers: {
        setConstantes (state, action){
            console.log('On set le state')
            console.log(state); 
            state = {...action.payload}
            return state; 
        }
    }
});


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        constantes: constantesSlice.reducer
    }
})

export const {setToken} = userSlice.actions; 
export const {setConstantes} = constantesSlice.actions; 