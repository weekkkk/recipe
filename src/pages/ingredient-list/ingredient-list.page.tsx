// import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import { fetchPopulatIngredientList } from "@/entities/ingredient";
import { ingredientService } from "@/entities/ingredient/services";
import { FC, useEffect } from "react";

export const IngredientListPage: FC = () => {
  // const { listOfPopular } = useAppSelector((state) => state.ingredient);
  // const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(fetchPopulatIngredientList());
    ingredientService.getListOfPopular();
  }, []);

  return <div className="bg-slate-50">{}</div>;
};
