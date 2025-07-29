"use client";

import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeSchema, ZRecipeSchema } from "@/utils/zod";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { toast } from "sonner";
import { createRecipeThunk } from "@/redux/thunk/recipe.thunk";

const AddRecipeDialog: React.FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ZRecipeSchema>({
    resolver: zodResolver(RecipeSchema),
  });

  const onSubmit = async (data: ZRecipeSchema) => {
    const result = await dispatch(
      createRecipeThunk({
        title: data.title,
        description: data.description,
        ingredients: data.ingredients,
        instructions: data.instructions,
        createdBy: user?.email,
      })
    );

    if (result.payload.statusCode === 400) {
      toast.error(`${result.payload.message}`);
    } else {
      toast.success("Successfully created recipe!");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Your Recipe</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            variant="standard"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            required
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            variant="standard"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            required
            margin="dense"
            id="ingredients"
            label="Ingredients (comma separated)"
            fullWidth
            variant="standard"
            multiline
            minRows={2}
            {...register("ingredients", {
              setValueAs: (v) =>
                v
                  .split(",")
                  .map((i: string) => i.trim())
                  .filter(Boolean),
            })}
            error={!!errors.ingredients}
            helperText={errors.ingredients?.message}
          />
          <TextField
            required
            margin="dense"
            id="instructions"
            label="Instructions"
            fullWidth
            variant="standard"
            multiline
            minRows={2}
            {...register("instructions")}
            error={!!errors.instructions}
            helperText={errors.instructions?.message}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              Create
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecipeDialog;
