import { useLayoutEffect, useState } from "react";

type Params = Parameters<typeof useLayoutEffect>

export const useUpdate = (
  callback: Params['0'], ...deps: NonNullable<Params['1']>
) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useLayoutEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    callback();
  }, deps);
};
