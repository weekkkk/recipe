import { TOrientation, TSizePropName } from "../types";

export const getSizePropNameByOrientation = (
  orientation: TOrientation
): TSizePropName => (orientation == "x" ? "height" : "width");