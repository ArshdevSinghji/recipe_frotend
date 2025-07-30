import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const accessToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("accessToken="))
  ?.split("=")[1];

export const addFavoriteRecipeThunk = createAsyncThunk(
  "addFavoriteRecipeThunk",
  async (params: { userId: number; recipeId: number }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        `/favorites/recipe/${params.recipeId}/user/${params.userId}`,
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

export const getFavoritesByUserIdThunk = createAsyncThunk(
  "getFavoritesByUserIdThunk",
  async (userId: number, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/favorites/user/${userId}`, {
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

export const removeFavoriteRecipeThunk = createAsyncThunk(
  "removeFavoriteRecipeThunk",
  async (params: { userId: number; recipeId: number }, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `/favorites/recipe/${params.recipeId}/user/${params.userId}`,
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
