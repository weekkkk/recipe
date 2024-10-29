import { CapitalizeString } from "../types";

export const getCapitalizeString = <T extends string>(
  str: T
): CapitalizeString<T> => `${str[0].toUpperCase()}${str.slice(1)}` as CapitalizeString<T>;
