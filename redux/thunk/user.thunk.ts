import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const accessToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("accessToken="))
  ?.split("=")[1];

export const favouriteRecipesThunk = createAsyncThunk(
  "favouriteRecipesThunk",
  async (params: { userId: number; recipeId: number }, thunkAPI) => {
    try {
      console.log(accessToken);
      const res = await axiosInstance.post(
        `user/${params.userId}/favorites/${params.recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getFavouriteRecipesThunk = createAsyncThunk(
  "getFavouriteRecipesThunk",
  async (userId: number, thunkAPI) => {
    try {
      console.log(accessToken);

      const res = await axiosInstance.get(`user/${userId}/favorites`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getFavouriteRecipesAndRemoveThunk = createAsyncThunk(
  "getFavouriteRecipesAndRemoveThunk",
  async (params: { userId: number; recipeId: number }, thunkAPI) => {
    try {
      console.log(accessToken);

      const res = await axiosInstance.delete(
        `user/${params.userId}/favorites/remove/${params.recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
