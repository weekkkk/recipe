import { ISize } from "@/shared/interfaces";
import { TSide, TSizePropName } from "@/shared/types";

export interface IResizeBoxPointHandler extends Partial<ISize> {
  (delta: number, side: TSide, sizePropName: TSizePropName): void;
}
