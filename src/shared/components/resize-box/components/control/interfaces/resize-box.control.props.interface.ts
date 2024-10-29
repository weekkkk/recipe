import { IResizeBoxControlHandler } from "./resize-box.control.handler.interface";
import { TSide } from "@/shared/types";

export interface IResizeBoxControlProps {
  children: JSX.Element;
  side: TSide;
  onGrab?: IResizeBoxControlHandler;
  onDrag?: IResizeBoxControlHandler;
  onDrop?: IResizeBoxControlHandler;
}
