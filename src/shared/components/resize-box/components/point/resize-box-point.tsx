import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import type { IResizeBoxPointProps } from "./interfaces";
import {
  resizeBoxPointSideClasses as sideClasses,
  resizeBoxPointTranslateClasses as translateClasses,
} from "./classes";
import { DragService, DragServiceEvent } from "@/shared/services";
import { SideType, SizePropNameType } from "@/shared/types";

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

  const xSides: SideType[] = useMemo(() => ["left", "right"], []);

  const orientation = useMemo(
    () => (xSides.includes(side) ? "x" : "y"),
    [xSides, side]
  );

  const sizePropName = useMemo<SizePropNameType>(
    () => (orientation == "x" ? "width" : "height"),
    [orientation]
  );

  const handleStart = useCallback(
    (e: DragServiceEvent) => {
      const delta = e.deltaPosition[orientation];
      onGrab?.(delta, side, sizePropName);
    },
    [onGrab, orientation, side, sizePropName]
  );

  const handleDrag = useCallback(
    (e: DragServiceEvent) => {
      const delta = e.deltaPosition[orientation];
      console.log(delta);
      onDrag?.(delta, side, sizePropName);
    },
    [onDrag, orientation, side, sizePropName]
  );

  const handleStop = useCallback(
    (e: DragServiceEvent) => {
      const delta = e.deltaPosition[orientation];
      onDrop?.(delta, side, sizePropName);
    },
    [onDrop, orientation, side, sizePropName]
  );

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
  }, [handleStart, handleDrag, handleStop]);

  return localChildren;
};
