// import { createAppAsyncThunk } from "@/app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IIngredient } from "../../interfaces";

export const fetchPopulatIngredientList = createAsyncThunk(
  "ingredient/fetchListOfPopular",
  async (_, { rejectWithValue }) => {
    try {
      const test = await fetch("ingredients.csv");
      const file = await test.blob();
      const fileText = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          reader.abort();
          resolve(reader.result?.toString() || "");
        };
        reader.onerror = () => {
          reader.abort();
          reject();
        };
      });
      const list = fileText.split("\n").map((el) => {
        const [name, id] = el.split(";");
        const ingredient: IIngredient = {
          id: Number(id),
          name,
        };
        return ingredient;
      });
      return list;
    } catch {
      return rejectWithValue("Ошибка при чтении файла");
    }
  }
);
