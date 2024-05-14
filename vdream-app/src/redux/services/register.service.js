import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";





const createAccount = createAsyncThunk("register", async (args) => {
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


const verifyAccount = createAsyncThunk("register", async (email, password) => {
  var response = await axios({
    method: "post",
    url: process.env.REACT_APP_BASE_URL + `api/accounts/register`,
    headers: {},
    data: {
      Email: email,
      Password: password
    },
  });
  return response.data;
});


export default {createAccount, verifyAccount} 