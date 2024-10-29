import { IResizeBoxControlProps } from "../interfaces";

export const resizeBoxControlSideClasses: Record<
  IResizeBoxControlProps["side"],
  string
> = {
  top: "top-0 left-1/2",
  right: "right-0 top-1/2",
  bottom: "bottom-0 left-1/2",
  left: "left-0 top-1/2",
};
