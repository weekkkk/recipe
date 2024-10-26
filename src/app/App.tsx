import { FC, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Layout } from "./layouts/default/default.layout";

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  import("./assets/styles/index.scss").then(() => {
    setIsLoading(false);
  });

  if (isLoading) return "loading";
  return (
    <>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </>
  );
};
