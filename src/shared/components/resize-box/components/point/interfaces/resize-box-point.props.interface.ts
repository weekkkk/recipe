import { SideEnum } from "@/shared/enums";
import { IResizeBoxPointHandler } from "./resize-box-point-handler.interface";

export interface IResizeBoxPointProps {
  children: JSX.Element;
  side: SideEnum;
  onGrab?: IResizeBoxPointHandler;
  onDrag?: IResizeBoxPointHandler;
  onDrop?: IResizeBoxPointHandler;
}
