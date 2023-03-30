import { pick } from "@/helper";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  loading: false,
  error: null,
};

const API_URL = "https://reqres.in/api/register";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await axios.post(API_URL, pick(userData,['email','password']));
    return response.data;
  }
);

export const userSlice = createSlice({           
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.firstName = action.payload.first_name;
        state.lastName = action.payload.last_name;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.password = action.payload.password;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
