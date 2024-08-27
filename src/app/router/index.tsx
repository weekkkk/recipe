import { createBrowserRouter } from "react-router-dom";
import { IngredientListPage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IngredientListPage />,
  },
]);
