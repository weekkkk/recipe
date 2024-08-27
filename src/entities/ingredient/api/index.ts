import axios from "axios";

const INGREDIENT_API_URL = "https://api.spoonacular.com/food/ingredients";
const API_KEY = "233790567fb9405ca3430e82b02eaedb";

export const $ingredient = axios.create({
  baseURL: INGREDIENT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apiKey: API_KEY,
  },
});

export * from "./types";
