import { IResizeBoxPointHandler } from "./resize-box-point-handler.interface";
import { SideType } from "@/shared/types";

export interface IResizeBoxPointProps {
  children: JSX.Element;
  side: SideType;
  onGrab?: IResizeBoxPointHandler;
  onDrag?: IResizeBoxPointHandler;
  onDrop?: IResizeBoxPointHandler;
}
