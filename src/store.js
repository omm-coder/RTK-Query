import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter/counterSlice'
import { countryApi } from "./services/countryApi";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [countryApi.reducerPath]: countryApi.reducer
    }, 

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(countryApi.middleware)
})