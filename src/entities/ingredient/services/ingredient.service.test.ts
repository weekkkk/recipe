import {
  jest,
  describe,
  it,
  beforeEach,
  expect,
  afterEach,
} from "@jest/globals";
import { ingredientService } from "./ingredient.service";
import {
  $ingredient,
  GetIngredientListReqDto,
  GetIngredientListResDto,
} from "../api";
import { AxiosResponse } from "axios";

import * as sharedFunctions from "@/shared/functions";

describe("ingredientService", () => {
  describe("getList", () => {
    const res: Pick<AxiosResponse<GetIngredientListResDto>, "data"> = {
      data: {
        results: [
          {
            id: 19400,
            name: "banana chips",
            image: "banana-chips.jpg",
          },
          {
            id: 93779,
            name: "banana liqueur",
            image: "limoncello.jpg",
          },
        ],
        offset: 0,
        number: 2,
        totalResults: 13,
      },
    };
    const dto: GetIngredientListReqDto = {
      number: 2,
      offset: 0,
      query: "banana",
    };
    const mockIngredientGet = jest.spyOn($ingredient, "get");

    beforeEach(() => {
      mockIngredientGet.mockReturnValue(Promise.resolve(res));
    });
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("должен возвращать результат $ingredient.get, не трансформируя данные", async () => {
      const mockIngredientGet = jest.spyOn($ingredient, "get");
      mockIngredientGet.mockReturnValue(Promise.resolve(res));
      expect(await ingredientService.getList(dto)).toEqual(res);
    });

    it("должен использовать $ingredient.get c корректным url и параметрами", async () => {
      const url = "/search_";
      const params = dto;
      const mockIngredientGet = jest.spyOn($ingredient, "get");
      mockIngredientGet.mockReturnValue(Promise.resolve(res));
      await ingredientService.getList(dto);
      expect(mockIngredientGet).toHaveBeenCalledWith(url, { params });
    });

    it("должен использовать $ingredient.get один раз", async () => {
      const mockIngredientGet = jest.spyOn($ingredient, "get");
      mockIngredientGet.mockReturnValue(Promise.resolve(res));
      await ingredientService.getList(dto);
      expect(mockIngredientGet).toBeCalledTimes(1);
    });

    it("должен возвращать ответ c учетом настроек пагинации", async () => {
      const {
        data: { number, offset, results },
      } = await ingredientService.getList(dto);
      expect(number).toBe(dto.number);
      expect(offset).toBe(dto.offset);
      expect(results.length).toBe(dto.number);
    });
  });

  describe("getListOfPopular", () => {
    const res: GetIngredientListResDto = {
      results: [
        {
          id: 11482,
          name: "acorn squash",
        },
        {
          id: 6979,
          name: "adobo sauce",
        },
      ],
      offset: 0,
      number: 2,
      totalResults: 13,
    };
    const dto: GetIngredientListReqDto = {
      number: 2,
      offset: 0,
      query: "a",
    };
    const readFileByUrlRes = `5 spice powder;1002002
acorn squash;11482
adobo sauce;6979
agave nectar;19912
ahi tuna;15117
alfredo pasta sauce;93606
almond extract;1002050
almond flour;93740
almond milk;93607
almonds;12061`;

    const mockReadFileByUrl = jest.spyOn(sharedFunctions, "readFileByUrl");
    mockReadFileByUrl.mockReturnValue(Promise.resolve(readFileByUrlRes));

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("должен возвращать определенный массив ингредиентов в поле results", async () => {
      const result = await ingredientService.getListOfPopular(dto);
      expect(result.results).toEqual(res.results);
    });

    it("должен возвращать ответ c учетом настроек пагинации", async () => {
      const result = await ingredientService.getListOfPopular(dto);
      if (result.totalResults >= dto.number)
        expect(result.results.length).toBe(dto.number);
      expect(result.number).toBe(dto.number);
      expect(result.offset).toBe(dto.offset);
    });

    it("должен возвращать пустой массив ингредиентов в поле results, если не нашел совпадений с dto.query", async () => {
      const { number, offset } = dto;
      const result = await ingredientService.getListOfPopular({
        number,
        offset,
        query: "____",
      });
      expect(result.results).toEqual([]);
      expect(result.totalResults).toEqual(0);
    });

    it("должен не вызывать readFileByUrl если в localStorage записано поле fullListOfPopular, иначе вызывать 1 раз", async () => {
      await ingredientService.getListOfPopular(dto);

      if (localStorage.getItem("fullListOfPopular"))
        expect(mockReadFileByUrl).toBeCalledTimes(0);
      else expect(mockReadFileByUrl).toBeCalledTimes(1);
    });
  });
});
