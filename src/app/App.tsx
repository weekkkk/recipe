import { FC, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { HeaderLayout } from "./layouts";
import { router } from "./router";

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  import("./assets/styles/index.scss").then(() => {
    setIsLoading(false);
  });

  if (isLoading) return "loading";
  return (
    <>
      <HeaderLayout />
      <RouterProvider router={router} />
    </>
  );
};
