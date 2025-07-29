"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getFavoritesByUserIdThunk } from "@/redux/thunk/userFavorite.thunk";
import { Button, Container, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

const Favorite = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.userId);
  const { favorites } = useAppSelector((state) => state.userFavorite);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (typeof userId === "number") {
        await dispatch(getFavoritesByUserIdThunk(userId));
      }
    };
    fetchFavorites();
  }, [userId, dispatch]);

  return (
    <Container sx={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/home")}
      >
        Back to Home
      </Button>
      {favorites && favorites.length > 0 ? (
        favorites.map((fav) => (
          <Paper
            variant="outlined"
            key={fav.favoriteId}
            sx={{ padding: "20px", marginTop: "20px" }}
          >
            <Typography variant="h5">{fav.recipe.title}</Typography>
            <Typography variant="body1">{fav.recipe.description}</Typography>
            <Typography variant="body2">
              Ingredients: {fav.recipe.ingredients.join(", ")}
            </Typography>
            <Typography variant="subtitle2">
              {fav.recipe.instructions}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography variant="h6" align="center" style={{ marginTop: "20px" }}>
          No favorite recipes found.
        </Typography>
      )}
    </Container>
  );
};

export default Favorite;
