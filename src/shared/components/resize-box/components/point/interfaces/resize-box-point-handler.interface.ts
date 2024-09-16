import { ISize } from "@/shared/interfaces";
import { SideType, SizePropNameType } from "@/shared/types";

export interface IResizeBoxPointHandler {
  (delta: number, side: SideType, sizePropName: SizePropNameType): void;
  startSize?: ISize;
}
