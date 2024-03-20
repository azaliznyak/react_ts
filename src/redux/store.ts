import {configureStore} from "@reduxjs/toolkit";
import {authReducer, loadingReducer} from "./slices";
import {carReducer} from "./slices/carSlice";

const store=configureStore({
    reducer:{
        loadingReducer,
        auth:authReducer,
        cars:carReducer

    }
})

export {
    store
}