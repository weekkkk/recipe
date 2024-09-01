import { FC, useEffect, useMemo, useRef } from "react";
import type { IResizeBoxPointProps } from "./interfaces";
import {
  resizeBoxPointSideClasses as sideClasses,
  resizeBoxPointTranslateClasses as translateClasses,
} from "./classes";
import { DragService, DragServiceEvent } from "@/shared/services";
import { SizePropNameType } from "@/shared/types";
import { SideEnum } from "@/shared/enums";

export const ResizeBoxPoint: FC<IResizeBoxPointProps> = ({
  children,
  side,
  onGrab,
  onDrag,
  onDrop,
}) => {
  const $localChildrenChild = useRef<HTMLDivElement>(null);

  const className = `${children.props.className ?? ""} absolute ${
    sideClasses[side]
  } ${translateClasses[side]} touch-none`;

  const localChildren: JSX.Element = {
    ...children,
    props: {
      ...children.props,
      className,
      children: (
        <>
          {children.props.children} <div hidden ref={$localChildrenChild} />
        </>
      ),
    },
  };

  const xSides = [SideEnum.Left, SideEnum.Right];

  const orientation = useMemo(
    () => (xSides.includes(side) ? "x" : "y"),
    [side]
  );

  const sizePropName = useMemo<SizePropNameType>(
    () => (orientation == "x" ? "width" : "height"),
    [orientation]
  );

  const handleStart = (e: DragServiceEvent) => {
    const delta = e.deltaPosition[orientation];
    onGrab?.(delta, side, sizePropName);
  };

  const handleDrag = (e: DragServiceEvent) => {
    const delta = e.deltaPosition[orientation];
    onDrag?.(delta, side, sizePropName);
  };

  const handleStop = (e: DragServiceEvent) => {
    const delta = e.deltaPosition[orientation];
    onDrop?.(delta, side, sizePropName);
  };

  useEffect(() => {
    if (!$localChildrenChild.current) return;
    const parent = $localChildrenChild.current.parentElement;
    if (!parent) return;
    const dragAndDropService = new DragService(parent, {
      start: handleStart,
      process: handleDrag,
      stop: handleStop,
    });
    dragAndDropService.init();
    return () => {
      dragAndDropService.destroy();
    };
  }, []);

  return localChildren;
};
