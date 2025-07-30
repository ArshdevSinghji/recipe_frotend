"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getRecipeByIdThunk,
  getRecipesThunk,
} from "@/redux/thunk/recipe.thunk";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const Recipe = () => {
  const router = useRouter();
  const { recipeId } = useParams();

  const dispatch = useAppDispatch();
  const { selectedRecipe } = useAppSelector((state) => state.recipe);

  useEffect(() => {
    const fetchRecipe = async () => {
      await dispatch(getRecipeByIdThunk(Number(recipeId)));
    };
    fetchRecipe();
  }, [dispatch, recipeId]);

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: 2,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80%",
        maxWidth: "600px",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => router.push("/home")}
      >
        Back to Home
      </Button>
      {selectedRecipe ? (
        <Box>
          <Typography variant="h4" gutterBottom>
            {selectedRecipe.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {selectedRecipe.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <List>
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <Typography variant="body2">{ingredient}</Typography>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Instructions
          </Typography>
          <Typography variant="body2">{selectedRecipe.instructions}</Typography>
        </Box>
      ) : (
        <Typography variant="body1" align="center">
          Loading recipe...
        </Typography>
      )}
    </Paper>
  );
};

export default Recipe;
