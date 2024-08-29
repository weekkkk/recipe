import { readFileByUrl } from "@/shared/functions";
import {
  $ingredient,
  GetIngredientListReqDto,
  GetIngredientListResDto,
} from "../api";

class IngredientService {
  getList = (dto: GetIngredientListReqDto) => {
    return $ingredient.get<GetIngredientListResDto>("/search_", {
      params: dto,
    });
  };

  getListOfPopular = async ({
    number,
    offset,
    query,
  }: GetIngredientListReqDto) => {
    const text = await readFileByUrl("popurlar-ingredient-list.csv");

    const results: GetIngredientListResDto["results"] = text
      .split("\n")
      .map((el) => {
        const [name, id] = el.split(";");
        return { name, id: Number(id) };
      })
      .filter((result) => result.name.includes(query));

    const res: GetIngredientListResDto = {
      results: results.slice(number, number + offset),
      number,
      offset,
      totalResults: results.length,
    };

    return res;
  };
}

export const ingredientService = new IngredientService();
