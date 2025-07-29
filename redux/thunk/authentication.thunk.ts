import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SignInPayloadInterface,
  SignUpPayloadInterface,
} from "../payload.interface";

export const signInThunk = createAsyncThunk(
  "signInThunk",
  async (signInPayload: SignInPayloadInterface, thunkAPI) => {
    try {
      const res = await axiosInstance.post("auth/signin", signInPayload);

      document.cookie = `accessToken=${res.data.accessToken}; path=/; max-age=3600;`;

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Sign in failed");
    }
  }
);

export const signUpThunk = createAsyncThunk(
  "signUpThunk",
  async (signUpPayload: SignUpPayloadInterface, thunkAPI) => {
    try {
      const res = await axiosInstance.post("auth/signup", signUpPayload);

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Sign up failed");
    }
  }
);
