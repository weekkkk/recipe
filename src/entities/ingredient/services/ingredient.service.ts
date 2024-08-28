import {
  $ingredient,
  GetIngredientListReqDto,
  GetIngredientListResDto,
} from "../api";

class IngredientService {
  getIngredientList(dto: GetIngredientListReqDto) {
    return $ingredient.get<GetIngredientListResDto>("/search_", {
      params: dto,
    });
  }
}

export const ingredientService = new IngredientService();
