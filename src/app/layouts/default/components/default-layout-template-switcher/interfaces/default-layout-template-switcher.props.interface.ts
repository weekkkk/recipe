import { TOrientation } from "@/shared/types";

export interface IDefaultLayoutTemplateSwitcherProps
  extends Record<TOrientation, boolean> {
  setX: () => void;
  setY: () => void;
}
