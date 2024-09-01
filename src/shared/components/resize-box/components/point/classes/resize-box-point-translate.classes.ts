import { IResizeBoxPointProps } from "../interfaces";

export const resizeBoxPointTranslateClasses: Record<
  IResizeBoxPointProps["side"],
  string
> = {
  top: "-translate-y-1/2 -translate-x-1/2",
  right: "translate-x-1/2 -translate-y-1/2",
  bottom: "translate-y-1/2 -translate-x-1/2",
  left: "-translate-x-1/2 -translate-y-1/2",
};
