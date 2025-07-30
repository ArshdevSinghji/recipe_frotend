"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getRecipesThunk } from "@/redux/thunk/recipe.thunk";
import {
  Button,
  Container,
  Pagination,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import LinkIcon from "@mui/icons-material/Link";
import { useEffect, useMemo, useState } from "react";
import {
  addFavoriteRecipeThunk,
  getFavoritesByUserIdThunk,
  removeFavoriteRecipeThunk,
} from "@/redux/thunk/userFavorite.thunk";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import AddRecipeButton from "@/components/addRecipeButton";
import FilterRecipeSidebar from "@/components/filterRecipeSidebar";
import debounce from "lodash/debounce";

const Home = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { recipes } = useAppSelector((state) => state.recipe);
  const { user } = useAppSelector((state) => state.auth);
  const { favoriteRecipeIds } = useAppSelector((state) => state.userFavorite);

  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);

  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      await dispatch(getRecipesThunk({ limit: 10, offset: page - 1 }));
    };
    fetchRecipes();
  }, [dispatch, page]);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        await dispatch(
          getRecipesThunk({ searchTerm: value, limit: 10, offset: page - 1 })
        );
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user?.userId) {
        await dispatch(getFavoritesByUserIdThunk(user.userId));
      }
    };
    fetchFavorites();
  }, [dispatch, user?.userId]);

  const handleAddToFav = async (recipeId: number) => {
    const result = await dispatch(
      addFavoriteRecipeThunk({
        userId: user?.userId || 0,
        recipeId: recipeId,
      })
    );
    if (result.payload.statusCode === "401") {
      toast.error(`${result.payload.message}`);
      return;
    } else if (result.payload.statusCode === 400) {
      toast.error(`${result.payload.message}`);
    } else {
      toast.success("Successfully added to favorites!");
    }
  };

  const handleRemoveFromFav = async (recipeId: number) => {
    const result = await dispatch(
      removeFavoriteRecipeThunk({
        userId: user?.userId || 0,
        recipeId: recipeId,
      })
    );
    if (result.payload.statusCode === "401") {
      toast.error(`${result.payload.message}`);
      return;
    } else if (result.payload.statusCode === 400) {
      toast.error(`${result.payload.message}`);
    } else {
      toast.success("Successfully removed from favorites!");
    }
  };

  return (
    <Container>
      <Stack spacing={2} direction="row" alignItems="center" p={2}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          fullWidth
          onChange={(e) => debouncedSearch(e.target.value)}
          margin="normal"
        />
        <Button
          startIcon={<LinkIcon />}
          variant="contained"
          color="primary"
          onClick={toggleDrawer(true)}
        >
          filter
        </Button>
      </Stack>

      {recipes.length > 0 ? (
        recipes.map((recipe) => {
          return (
            <Paper
              variant="outlined"
              key={recipe.recipeId}
              sx={{
                margin: "10px",
                padding: "10px",
                position: "relative",
                "&:hover": {
                  cursor: "pointer",
                  transform: "scale(1.02)",
                  transition: "transform 0.2s ease-in-out",
                },
              }}
              onClick={() => router.push(`/home/${recipe.recipeId}`)}
            >
              {favoriteRecipeIds.includes(recipe.recipeId) ? (
                <Tooltip title="Remove from favorites">
                  <StarOutlineIcon
                    color="primary"
                    sx={{ position: "absolute", top: "10px", right: "10px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromFav(recipe.recipeId);
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Add to favorites">
                  <StarOutlineIcon
                    color="disabled"
                    sx={{ position: "absolute", top: "10px", right: "10px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToFav(recipe.recipeId);
                    }}
                  />
                </Tooltip>
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
      {accessToken && <AddRecipeButton />}
      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{ float: "right", marginTop: "20px" }}
      />

      <FilterRecipeSidebar open={open} toggleDrawer={toggleDrawer} />
    </Container>
  );
};

export default Home;
