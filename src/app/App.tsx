import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { HeaderLayout } from "./layouts";

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  import("./assets/styles/index.scss").then(() => {
    setIsLoading(false);
  });

  if (isLoading) return "loading";
  return (
    <>
      <HeaderLayout />
      <Outlet />
    </>
  );
};
