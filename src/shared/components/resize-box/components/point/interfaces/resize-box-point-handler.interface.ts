import { SideEnum } from "@/shared/enums";
import { ISize } from "@/shared/interfaces";
import { SizePropNameType } from "@/shared/types";

export interface IResizeBoxPointHandler {
  (delta: number, side: SideEnum, sizePropName: SizePropNameType): void;
  startSize?: ISize;
}
