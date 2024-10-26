import { TSide } from "@/shared/types";
import { IResizeBoxPointProps } from "../components";
import { TResizeBoxPosition } from "../types";

type TResizeBoxPointElement = IResizeBoxPointProps["children"];

export interface IResizeBoxProps {
  children: JSX.Element;
  pointElements: Partial<Record<TSide, TResizeBoxPointElement>>;
  position?: TResizeBoxPosition;
}
