import { createAsyncThunk } from "@reduxjs/toolkit";
import { ingredientService } from "../../services";
import { IIngredient } from "../../interfaces";

export const fetchIngredientList = createAsyncThunk<IIngredient[], string>(
  "ingredient/fetchList",
  async (searchName, { rejectWithValue }) => {
    try {
      const res = await ingredientService.getIngredientList({
        query: searchName,
        number: 10,
        offset: 0,
      });
      return res.data.results.map((item) => {
        const { id, image, name } = item;
        const ingredient: IIngredient = {
          id,
          image,
          name,
        };
        return ingredient;
      });
    } catch {
      return rejectWithValue("Ингредиенты не найдены");
    }
  }
);
