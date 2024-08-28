import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../interfaces";
import { fetchIngredientList, fetchPopulatIngredientList } from "./thunks";
import {
  ingredientSlicePendingReduser,
  ingredientSliceRejectReduser,
} from "./redusers";
import { ingredientSliceState as initialState } from "./ingredient-slice.state";

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    selectIngredient: (state, action: PayloadAction<IIngredient>) => {
      state.listOfSelected.push(action.payload);
    },
    updateSearchName: (state, action: PayloadAction<string>) => {
      state.searchName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchIngredientList.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredientList.pending, ingredientSlicePendingReduser)
      .addCase(fetchIngredientList.rejected, ingredientSliceRejectReduser)
      .addCase(fetchPopulatIngredientList.fulfilled, (state, { payload }) => {
        state.listOfPopular = payload;
        state.isLoading = false;
      })
      .addCase(
        fetchPopulatIngredientList.pending,
        ingredientSlicePendingReduser
      )
      .addCase(
        fetchPopulatIngredientList.rejected,
        ingredientSliceRejectReduser
      ),
});
