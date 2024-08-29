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

  // describe("getListOfPopular", () => {
  //   const mockAxiosGet = jest.spyOn(axios, "get");
  //   const res: GetIngredientListResDto = {
  //     results: [
  //       {
  //         id: 11482,
  //         name: "acorn squash",
  //       },
  //       {
  //         id: 6979,
  //         name: "adobo sauce",
  //       },
  //     ],
  //     offset: 0,
  //     number: 2,
  //     totalResults: 13,
  //   };
  //   const dto: GetIngredientListReqDto = {
  //     number: 2,
  //     offset: 0,
  //     query: "a",
  //   };

  //   it("должен использовать FileReader");

  //   // it("должен возвращать результат моделью GetIngredientListResDto");
  // });
});
