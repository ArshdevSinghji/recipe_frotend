import { createSlice } from "@reduxjs/toolkit";
import {
  addFavoriteRecipeThunk,
  removeFavoriteRecipeThunk,
  getFavoritesByUserIdThunk,
} from "../thunk/userFavorite.thunk";
import { RecipeInterface } from "./recipe.slice";

export interface FavoritePayloadInterface {
  favoriteId: number;
  userId: number;
  recipeId: number;
  recipe: RecipeInterface;
}

export interface UserFavoriteState {
  favorites: FavoritePayloadInterface[];
  favoriteRecipeIds: number[];
  loading: boolean;
  error: string | null;
}

const initialState: UserFavoriteState = {
  favorites: [],
  favoriteRecipeIds: [],
  loading: false,
  error: null,
};

const userFavoriteSlice = createSlice({
  name: "userFavorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch favorites
      .addCase(getFavoritesByUserIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavoritesByUserIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
        state.favoriteRecipeIds = action.payload.map(
          (fav: FavoritePayloadInterface) => fav.recipe?.recipeId
        );
      })
      .addCase(getFavoritesByUserIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add favorite
      .addCase(addFavoriteRecipeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavoriteRecipeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites.push(action.payload);
        if (!state.favoriteRecipeIds.includes(action.payload.recipeId)) {
          state.favoriteRecipeIds.push(action.payload.recipeId);
        }
      })
      .addCase(addFavoriteRecipeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Remove favorite
      .addCase(removeFavoriteRecipeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavoriteRecipeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = state.favorites.filter(
          (fav) => fav.recipeId !== action.meta.arg.recipeId
        );
        state.favoriteRecipeIds = state.favoriteRecipeIds.filter(
          (id) => id !== action.meta.arg.recipeId
        );
      })
      .addCase(removeFavoriteRecipeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userFavoriteSlice.reducer;
