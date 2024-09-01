import { IResizeBoxPointProps } from "../components/point";

type PointElementType = IResizeBoxPointProps["children"];

export interface IResizeBoxProps {
  children: JSX.Element;
  pointElements: Partial<
    Record<IResizeBoxPointProps["side"], PointElementType>
  >;
}
