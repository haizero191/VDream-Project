import { createSlice } from "@reduxjs/toolkit"
import register from "../services/register.service"

const registerSlice = createSlice({
    name: "register",
    initialState: {
        isLoading : false,
        dataProcess: [],
        
    },
    extraReducers: (builder) => {
        builder.addCase(register.createAccount.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(register.createAccount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataProcess[0] = {
                success: action.payload.success,
                error: {
                    stack: action.payload.errors
                }, 
                data: action.payload.data,
                message: action.payload.message
            }
        })
        builder.addCase(register.createAccount.rejected, (state, action) => {
            state.error = true
        })
    }
})
export default registerSlice.reducer;