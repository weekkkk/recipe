import { IResizeBoxPointHandler } from "./resize-box-point-handler.interface";
import { TSide } from "@/shared/types";

export interface IResizeBoxPointProps {
  children: JSX.Element;
  side: TSide;
  onGrab?: IResizeBoxPointHandler;
  onDrag?: IResizeBoxPointHandler;
  onDrop?: IResizeBoxPointHandler;
}
