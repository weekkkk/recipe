import { TOrientation, TSide } from "../types";

export const getOrientationBySide = (side: TSide): TOrientation =>
  side == "bottom" || side == "top" ? "x" : "y";
