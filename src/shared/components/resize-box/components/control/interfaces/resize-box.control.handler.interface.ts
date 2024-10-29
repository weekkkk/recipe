import { ISize } from "@/shared/interfaces";
import { TSide, TSizePropName } from "@/shared/types";

export interface IResizeBoxControlHandler extends Partial<ISize> {
  (event: { delta: number; side: TSide; sizePropName: TSizePropName }): void;
}
