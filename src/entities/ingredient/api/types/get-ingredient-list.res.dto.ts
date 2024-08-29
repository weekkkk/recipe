export type GetIngredientListResDto = {
  results: {
    id: number;
    name: string;
    image?: string;
  }[];
  offset: number;
  number: number;
  totalResults: number;
};
