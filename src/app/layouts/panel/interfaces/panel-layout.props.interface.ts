import { TResizeBoxPosition } from "@/shared/components";
import { ISize } from "@/shared/interfaces";
import { TSide } from "@/shared/types";

type PanelLayoutPositionType = TResizeBoxPosition;

export interface IPanelLayoutProps extends Partial<ISize<string>> {
  side: TSide;
  children: JSX.Element;
  visible?: boolean;
  position?: PanelLayoutPositionType;
  className?: string;
  maxWidth?: string;
  minWidth?: string;
  maxHeight?: string;
  minHeight?: string;
}
