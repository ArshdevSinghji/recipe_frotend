import { createSlice } from "@reduxjs/toolkit";
import { getRecipeByIdThunk, getRecipesThunk } from "../thunk/recipe.thunk";

export interface RecipeInterface {
  recipeId: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  createdBy: string;
}

interface RecipeState {
  recipes: RecipeInterface[];
  selectedRecipe: RecipeInterface | null;
  loading: boolean;
  error: any;
}

const initialState: RecipeState = {
  recipes: [],
  selectedRecipe: null,
  loading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecipesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(getRecipesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getRecipeByIdThunk.fulfilled, (state, action) => {
        state.selectedRecipe = action.payload;
      })
      .addCase(getRecipeByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecipeByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default recipeSlice.reducer;
