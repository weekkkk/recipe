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

  private getFullListOfPopular = async () => {
    let text = localStorage.getItem("fullListOfPopular");

    if (!text) {
      text = await readFileByUrl("popurlar-ingredient-list.csv");
      localStorage.setItem("fullListOfPopular", text);
    }

    const results: GetIngredientListResDto["results"] = text
      .split("\n")
      .map((el) => {
        const [name, id] = el.split(";");
        return { name, id: Number(id) };
      });

    return results;
  };

  getListOfPopular = async ({
    number,
    offset,
    query,
  }: GetIngredientListReqDto) => {
    let results = await this.getFullListOfPopular();
    results = results.filter((result) => result.name.includes(query));

    const res: GetIngredientListResDto = {
      results: results.slice(number * offset, number + offset),
      number,
      offset,
      totalResults: results.length,
    };

    return res;
  };
}

export const ingredientService = new IngredientService();
