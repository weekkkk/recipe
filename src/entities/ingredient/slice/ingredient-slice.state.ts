import { IIngredientState } from "./interfaces";

export const ingredientSliceState: IIngredientState = {
  list: [],
  listOfPopular: [],
  listOfSelected: [],
  isLoading: false,
  error: "",
  searchName: "",
};
