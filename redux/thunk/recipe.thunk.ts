import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RecipePayloadInterface } from "../payload.interface";

export const getAllRecipesThunk = createAsyncThunk(
  "getAllRecipesThunk",
  async (query: { limit: number; offset: number }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `recipe/all?limit=${query.limit}&offset=${query.offset}`
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getRecipeByIdThunk = createAsyncThunk(
  "getRecipeByIdThunk",
  async (recipeId: string, thunkAPI) => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      const res = await axiosInstance.get(`recipe/recipeId/${recipeId}`, {
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

export const createRecipeThunk = createAsyncThunk(
  "createRecipeThunk",
  async (recipeData: RecipePayloadInterface, thunkAPI) => {
    try {
      const accessToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];
      const res = await axiosInstance.post("recipe/create", recipeData, {
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

export const getRecipeBySearchTermThunk = createAsyncThunk(
  "getRecipeBySearchTermThunk",
  async (searchTerm: string, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `recipe/search?searchTerm=${searchTerm}`
      );
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
