import { ILoading } from "@/shared/interfaces";
import { IIngredient } from "../../interfaces";

export interface IIngredientState extends ILoading {
  list: IIngredient[];
  searchName: string;
  listOfPopular: IIngredient[];
  listOfSelected: IIngredient[];
}
