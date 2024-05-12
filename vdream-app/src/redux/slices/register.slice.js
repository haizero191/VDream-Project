import { createSlice } from "@reduxjs/toolkit"
import register from "../services/register.service"



const registerSlice = createSlice({
    name: "register",
    initialState: {
        isLoading : false,
        dataProcess: [],  
    },
    extraReducers: (builder) => {

        // Handle async thunk for [ Create account with email ]
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
            console.log("Action: ", action)
        })
        builder.addCase(register.createAccount.rejected, (state, action) => {
            state.error = true
        })

    
        // Handle async thunk for [ Verify email ]
        builder.addCase(register.verifyAccount.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(register.verifyAccount.fulfilled, (state, action) => {
            state.isLoading = false;
            if(action.payload.success) {
                localStorage.setItem(process.env.REACT_APP_ACCESSTOKEN_KEY_STORE, action.payload.data.accessToken)
                localStorage.setItem(process.env.REACT_APP_REFRESHTOKEN_KEY_STORE, action.payload.data.refreshToken)
            }

            state.dataProcess[1] = {
                success: action.payload.success,
                error: {
                    stack: action.payload.errors
                }, 
                data: action.payload.data,
                message: action.payload.message
            }
        })
        builder.addCase(register.verifyAccount.rejected, (state, action) => {
            state.error = true
        })


        // Handle async thunk for [ Create password for account ]
        builder.addCase(register.createPassword.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(register.createPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dataProcess[2] = {
                success: action.payload.success,
                error: {
                    stack: action.payload.errors
                }, 
                data: action.payload.data,
                message: action.payload.message
            }
        })
        builder.addCase(register.createPassword.rejected, (state, action) => {
            state.error = true
        })
    }
})
export default registerSlice.reducer;