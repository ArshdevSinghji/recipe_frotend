import { axiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RecipePayloadInterface } from "../payload.interface";

import qs from "qs";

const accessToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("accessToken="))
  ?.split("=")[1];

export const getRecipeByIdThunk = createAsyncThunk(
  "getRecipeByIdThunk",
  async (recipeId: number, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`recipe/${recipeId}`, {
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

export const getRecipesThunk = createAsyncThunk(
  "getRecipesThunk",
  async (
    query: {
      category?: string[];
      searchTerm?: string;
      limit: number;
      offset: number;
    },
    thunkAPI
  ) => {
    try {
      const res = await axiosInstance.get("recipe", {
        params: {
          category: query.category,
          searchTerm: query.searchTerm,
          limit: query.limit,
          offset: query.offset,
        },
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
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
