import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




// Create account with email address
const createAccount = createAsyncThunk("CREATE_ACCOUNT", async (args) => {
  var response = await axios({
    method: "post",
    url: process.env.REACT_APP_BASE_URL + `api/accounts/register`,
    headers: {},
    data: {
      Email: args.Email,
      Password: args.Password
    },
  });
  return response.data;
});

// Verify Email 
const verifyAccount = createAsyncThunk("VERIFY_ACCOUNT", async (args) => {
  var response = await axios({
    method: "post",
    url: process.env.REACT_APP_BASE_URL + `api/accounts/verify`,
    headers: {},
    data: {
      Email: args.Email,
      Code: args.Code
    },
  });
  return response.data;
});

// Create password
const createPassword = createAsyncThunk("CREATE_PASSWORD", async (args) => {
  var response = await axios({
    method: "post",
    url: process.env.REACT_APP_BASE_URL + `api/accounts/createPassword`,
    headers: {
      authorization: "Bearer " + args.AccessToken
    },
    data: {
      Email: args.Email,
      Password: args.Password
    },
  });
  return response.data;
})

export default {createAccount, verifyAccount, createPassword} 