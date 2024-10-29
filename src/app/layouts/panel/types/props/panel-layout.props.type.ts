import { TSide } from "@/shared/types";
import {
  TPanelLayoutPositionProp,
  TPanelLayoutSizeProps,
  TPanelLayoutSizeRangeProps,
} from "./types";

export type TPanelLayoutProps = {
  side: TSide;
  children: JSX.Element;
  visible?: boolean;
  position?: TPanelLayoutPositionProp;
  className?: string;
} & TPanelLayoutSizeProps &
  TPanelLayoutSizeRangeProps;
