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
            state = {
                ...state, 
                token: action.payload
            }
            return state; 
        }
    }
});


export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})

export const {setToken} = userSlice.actions; 