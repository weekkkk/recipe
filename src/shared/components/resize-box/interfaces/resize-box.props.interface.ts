import { TSide } from "@/shared/types";
import { IResizeBoxControlProps } from "../components";
import { TResizeBoxPosition } from "../types";

type TResizeBoxControlElement = IResizeBoxControlProps["children"];

export interface IResizeBoxProps {
  children: JSX.Element;
  controlElements: Partial<Record<TSide, TResizeBoxControlElement>>;
  position?: TResizeBoxPosition;
}
