import { IIngredientState } from "../interfaces";

export const ingredientSlicePendingReduser = <S extends IIngredientState>(
  state: S
) => {
  state.isLoading = true;
};
