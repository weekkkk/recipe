import { IChangeValue } from "../interfaces";

export const optimizeSetState = <T>(
  setState: (newValue: T) => void
): IChangeValue<T> => {
  const localChange: IChangeValue<T> = (newValue: T) => {
    const oldValue = localChange.oldValue;
    if (JSON.stringify(oldValue) == JSON.stringify(newValue)) return;
    localChange.oldValue = newValue;
    setState(newValue);
  };
  return localChange;
};
