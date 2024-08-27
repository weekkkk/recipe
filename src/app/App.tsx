import { FC, useState } from "react";

export const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  import("./assets/styles/index.scss").then(() => {
    setIsLoading(false);
  });

  if (isLoading) return "loading";
  return (
    <>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae itaque ea,
        facilis saepe rem culpa harum labore fugiat dignissimos est odit soluta
        pariatur modi necessitatibus et blanditiis nisi quaerat eligendi!
      </h1>
    </>
  );
};
