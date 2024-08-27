import { $ingredient, GetIngredientListResDto } from "../api";

export class IngredientService {
  getIngredientList(dto: GetIngredientListResDto) {
    return $ingredient.get("/search", { params: dto });
  }
}
