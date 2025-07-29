import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  favoriteRecipeIds: [] as number[],
};

const favoriteRecipeIdSlice = createSlice({
  name: "favoriteRecipeId",
  initialState,
  reducers: {
    addFavoriteRecipeId: (
      state,
      action: PayloadAction<{ recipeId: number }>
    ) => {
      state.favoriteRecipeIds.push(action.payload.recipeId);
    },
    removeFavoriteRecipeId: (
      state,
      action: PayloadAction<{ recipeId: number }>
    ) => {
      state.favoriteRecipeIds = state.favoriteRecipeIds.filter(
        (id) => id !== action.payload.recipeId
      );
    },
  },
});

export const { addFavoriteRecipeId, removeFavoriteRecipeId } =
  favoriteRecipeIdSlice.actions;

export default favoriteRecipeIdSlice.reducer;
