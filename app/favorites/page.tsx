"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getFavouriteRecipesThunk } from "@/redux/thunk/user.thunk";
import { Container, Paper, Typography } from "@mui/material";

import React, { useEffect } from "react";

const Favorite = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const user = useAppSelector((state) => state.user.user);

  if (!userId) return null;

  useEffect(() => {
    const fetchFavorites = async () => {
      await dispatch(getFavouriteRecipesThunk(userId));
    };
    fetchFavorites();
  }, []);

  return (
    <Container>
      {user && user.favouriteRecipes && user?.favouriteRecipes.length > 0 ? (
        user?.favouriteRecipes?.map((recipe) => {
          return (
            <Paper
              variant="outlined"
              key={recipe.recipeId}
              style={{ margin: "10px", padding: "10px", position: "relative" }}
            >
              <Typography variant="h5">{recipe.title}</Typography>
              <Typography variant="body1">{recipe.description}</Typography>
              <Typography variant="body2">
                Ingredients: {recipe.ingredients.join(", ")}
              </Typography>
              <Typography variant="subtitle2">{recipe.instructions}</Typography>
            </Paper>
          );
        })
      ) : (
        <Typography variant="h6" align="center" style={{ marginTop: "20px" }}>
          No favorite recipes found.
        </Typography>
      )}
    </Container>
  );
};

export default Favorite;
