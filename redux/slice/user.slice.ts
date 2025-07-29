import { createSlice } from "@reduxjs/toolkit";
import {
  favouriteRecipesThunk,
  getFavouriteRecipesAndRemoveThunk,
  getFavouriteRecipesThunk,
} from "../thunk/user.thunk";
import { RecipeInterface } from "./recipe.slice";

interface UserInterface {
  userId: number;
  username: string;
  email: string;
  favouriteRecipes?: RecipeInterface[];
}

interface UserState {
  user: UserInterface | null;
  isLoading?: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavouriteRecipesThunk.fulfilled, (state, action) => {
        if (state.user) {
          state.user = action.payload;
        }
      })
      .addCase(getFavouriteRecipesThunk.rejected, (state, action) => {
        if (state.user) {
          state.isLoading = false;
        }
      })
      .addCase(getFavouriteRecipesThunk.pending, (state) => {
        if (state.user) {
          state.isLoading = true;
        }
      });
    builder
      .addCase(favouriteRecipesThunk.fulfilled, (state, action) => {
        if (state.user) {
          const recipe = action.payload;
          if (!state.user.favouriteRecipes) {
            state.user.favouriteRecipes = [];
          }
          state.user.favouriteRecipes.push(recipe);
        }
        state.isLoading = false;
      })
      .addCase(favouriteRecipesThunk.rejected, (state, action) => {
        if (state.user) {
          state.isLoading = false;
        }
      })
      .addCase(favouriteRecipesThunk.pending, (state) => {
        if (state.user) {
          state.isLoading = true;
        }
      });
    builder
      .addCase(getFavouriteRecipesAndRemoveThunk.fulfilled, (state, action) => {
        if (state.user) {
          state.user.favouriteRecipes = state.user.favouriteRecipes?.filter(
            (recipe) => recipe.recipeId !== action.payload.recipeId
          );
        }
      })
      .addCase(getFavouriteRecipesAndRemoveThunk.rejected, (state, action) => {
        if (state.user) {
          state.isLoading = false;
        }
      })
      .addCase(getFavouriteRecipesAndRemoveThunk.pending, (state) => {
        if (state.user) {
          state.isLoading = true;
        }
      });
  },
});

export default userSlice.reducer;
