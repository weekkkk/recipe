import { FC, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { IResizeBoxProps } from "./interfaces";
import { ResizeBoxPoint } from "./components";
import {
  IResizeBoxPointHandler,
  IResizeBoxPointProps,
} from "./components/point";
import { ISize } from "@/shared/interfaces";
import { SideEnum } from "@/shared/enums";

export const ResizeBox: FC<IResizeBoxProps> = ({ children, pointElements }) => {
  const $localChildrenChild = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<ISize>();

  const handleGrab: IResizeBoxPointHandler = () => {
    if (!handleDrag.startSize) handleDrag.startSize = getStartSize();
    setSize(handleDrag.startSize);
  };

  const handleDrag: IResizeBoxPointHandler = (delta, side, sizePropName) => {
    const startSize = handleDrag.startSize;
    if (!startSize) return;
    const newSize = { ...startSize };
    if (side == SideEnum.Right || side == SideEnum.Bottom) delta = -delta;
    newSize[sizePropName] += delta;
    setSize(newSize);
  };

  const handleDrop: IResizeBoxPointHandler = (delta, side, sizePropName) => {
    handleDrag(delta, side, sizePropName);
    handleDrag.startSize = undefined;
  };

  const points = useMemo(() => {
    const entries = Object.entries(pointElements) as [
      IResizeBoxPointProps["side"],
      JSX.Element
    ][];
    return entries.map(([side, pointElement]) => {
      return (
        <ResizeBoxPoint
          key={side}
          side={side}
          onGrab={handleGrab}
          onDrag={handleDrag}
          onDrop={handleDrop}
        >
          {pointElement}
        </ResizeBoxPoint>
      );
    });
  }, []);

  const localChildren: JSX.Element = useMemo(() => {
    return {
      ...children,
      props: {
        ...children.props,
        style: { ...children.props.style, ...size },
        className: `${children.props.className} relative`,
        children: (
          <>
            {children.props.children} {points}
            <div hidden ref={$localChildrenChild} />
          </>
        ),
      },
    };
  }, [size]);

  useLayoutEffect(() => {
    setSize(getStartSize());
  }, []);

  const getStartSize = (): ISize | undefined => {
    if (!$localChildrenChild.current) return;
    const parent = $localChildrenChild.current.parentElement;
    if (!parent) return;
    return {
      height: parent.offsetHeight,
      width: parent.offsetWidth,
    };
  };

  return localChildren;
};
