import { createSlice } from "@reduxjs/toolkit";
import { signInThunk, signUpThunk } from "../thunk/authentication.thunk";

interface User {
  userId: number;
  username: string;
  email: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInThunk.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(signUpThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signUpThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
