import { IRange } from "../interfaces/range.interface";
import { CapitalizeString, TSizePropName } from ".";

export type TSizeRange<SK extends TSizePropName = TSizePropName, T = number> = {
  [RK in keyof IRange as `${RK}${CapitalizeString<SK>}`]: T;
};