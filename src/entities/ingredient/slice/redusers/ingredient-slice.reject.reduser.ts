import { PayloadAction } from "@reduxjs/toolkit";
import { IIngredientState } from "../interfaces";

export const ingredientSliceRejectReduser = <
  S extends IIngredientState,
  A extends PayloadAction<unknown>
>(
  state: S,
  { payload }: A
) => {
  if (typeof payload == "string") state.error = payload;
  state.isLoading = false;
};
