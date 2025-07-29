"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getAllRecipesThunk,
  getRecipeBySearchTermThunk,
} from "@/redux/thunk/recipe.thunk";
import {
  Container,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useEffect, useState } from "react";
import {
  favouriteRecipesThunk,
  getFavouriteRecipesAndRemoveThunk,
} from "@/redux/thunk/user.thunk";
import { toast } from "sonner";
import AddRecipeButton from "@/components/addRecipeButton";

const Home = () => {
  const dispatch = useAppDispatch();
  const { recipes } = useAppSelector((state) => state.recipe);
  const { user } = useAppSelector((state) => state.auth);
  // const userId = useAppSelector((state) => state.auth.user?.userId);

  const [page, setPage] = useState(1);
  const [isfavorite, setIsFavorite] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      await dispatch(getAllRecipesThunk({ limit: 10, offset: page - 1 }));
    };
    fetchRecipes();
  }, [dispatch, page]);

  useEffect(() => {
    const fetchSearchTerm = async () => {
      await dispatch(getRecipeBySearchTermThunk(searchTerm));
    };
    fetchSearchTerm();
  }, [searchTerm]);

  const handleAddToFav = async (recipeId: number) => {
    const result = await dispatch(
      favouriteRecipesThunk({
        userId: user?.userId || 0,
        recipeId: recipeId,
      })
    );
    if (result.payload.statusCode === 400) {
      toast.error(`${result.payload.message}`);
    } else {
      toast.success("Successfully added to favorites!");
    }
  };

  const handleRemoveFromFav = async (recipeId: number) => {
    const result = await dispatch(
      getFavouriteRecipesAndRemoveThunk({
        userId: user?.userId || 0,
        recipeId: recipeId,
      })
    );
    if (result.payload.statusCode === 400) {
      toast.error(`${result.payload.message}`);
    } else {
      toast.success("Successfully removed from favorites!");
    }
  };

  return (
    <Container>
      <TextField
        label="Search Recipes"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {recipes.length > 0 ? (
        recipes.map((recipe) => {
          return (
            <Paper
              variant="outlined"
              key={recipe.recipeId}
              style={{ margin: "10px", padding: "10px", position: "relative" }}
            >
              {isfavorite ? (
                <StarOutlineIcon
                  color="primary"
                  sx={{ position: "absolute", top: "10px", right: "10px" }}
                  onClick={() => {
                    handleRemoveFromFav(recipe.recipeId);
                    setIsFavorite(false);
                  }}
                />
              ) : (
                <StarOutlineIcon
                  color="disabled"
                  sx={{ position: "absolute", top: "10px", right: "10px" }}
                  onClick={() => {
                    handleAddToFav(recipe.recipeId);
                    setIsFavorite(true);
                  }}
                />
              )}
              <Typography variant="h5">{recipe.title}</Typography>
              <Typography variant="body1">{recipe.description}</Typography>
              <Typography variant="body2">
                Ingredients: {recipe.ingredients.join(", ")}
              </Typography>
            </Paper>
          );
        })
      ) : (
        <Typography variant="h6" align="center">
          No recipes found.
        </Typography>
      )}
      <AddRecipeButton />
      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </Container>
  );
};

export default Home;
