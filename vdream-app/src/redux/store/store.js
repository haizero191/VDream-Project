import { configureStore } from "@reduxjs/toolkit"
import registerSlice from "../slices/register.slice"


export const store = configureStore({
    reducer: {
        register: registerSlice
    }
})
