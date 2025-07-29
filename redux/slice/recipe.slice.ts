import { createSlice } from "@reduxjs/toolkit";
import {
  createRecipeThunk,
  getAllRecipesThunk,
  getRecipeByIdThunk,
  getRecipeBySearchTermThunk,
  getRecipesByCategoryThunk,
} from "../thunk/recipe.thunk";

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
      .addCase(getAllRecipesThunk.fulfilled, (state, action) => {
        state.recipes = action.payload;
      })
      .addCase(getAllRecipesThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getAllRecipesThunk.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(getRecipeByIdThunk.fulfilled, (state, action) => {
        state.selectedRecipe = action.payload;
      })
      .addCase(getRecipeByIdThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getRecipeByIdThunk.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(createRecipeThunk.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })
      .addCase(createRecipeThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createRecipeThunk.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(getRecipeBySearchTermThunk.fulfilled, (state, action) => {
        state.recipes = action.payload;
      })
      .addCase(getRecipeBySearchTermThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getRecipeBySearchTermThunk.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(getRecipesByCategoryThunk.fulfilled, (state, action) => {
        state.recipes = action.payload;
      })
      .addCase(getRecipesByCategoryThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getRecipesByCategoryThunk.pending, (state) => {
        state.loading = true;
      });
  },
});

export default recipeSlice.reducer;
