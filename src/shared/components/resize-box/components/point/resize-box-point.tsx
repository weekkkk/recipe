import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import type { IResizeBoxPointProps } from "./interfaces";
import {
  resizeBoxPointSideClasses as sideClasses,
  resizeBoxPointTranslateClasses as translateClasses,
  resizeBoxPointCursorClasses as cursorClasses,
} from "./classes";
import { DragService, DragServiceEvent } from "@/shared/services";
import { TSizePropName } from "@/shared/types";
import {
  getOrientationBySide,
  getSizePropNameByOrientation,
} from "@/shared/functions";

export const ResizeBoxPoint: FC<IResizeBoxPointProps> = ({
  children,
  side,
  onGrab,
  onDrag,
  onDrop,
}) => {
  const $localChildrenChild = useRef<HTMLDivElement>(null);

  const orientation = useMemo(() => getOrientationBySide(side), [side]);

  const className = `${children.props.className ?? ""} ${sideClasses[side]} ${
    translateClasses[side]
  } ${cursorClasses[orientation]} absolute touch-none`;

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

  const sizePropName = useMemo<TSizePropName>(
    () => getSizePropNameByOrientation(orientation),
    [orientation]
  );

  const deltaPositionOrientation: keyof DragServiceEvent["deltaPosition"] =
    useMemo(() => (orientation === "x" ? "y" : "x"), [orientation]);

  const handleStart = useCallback(
    (e: DragServiceEvent) => {
      const delta = e.deltaPosition[deltaPositionOrientation];
      onGrab?.(delta, side, sizePropName);
    },
    [onGrab, deltaPositionOrientation, side, sizePropName]
  );

  const handleDrag = useCallback(
    (e: DragServiceEvent) => {
      const delta = e.deltaPosition[deltaPositionOrientation];
      onDrag?.(delta, side, sizePropName);
    },
    [onDrag, deltaPositionOrientation, side, sizePropName]
  );

  const handleStop = useCallback(
    (e: DragServiceEvent) => {
      const delta = e.deltaPosition[deltaPositionOrientation];
      onDrop?.(delta, side, sizePropName);
    },
    [onDrop, deltaPositionOrientation, side, sizePropName]
  );

  useEffect(() => {
    // console.log($localChildrenChild.current);
    if (!$localChildrenChild.current) return;
    const parent = $localChildrenChild.current.parentElement;
    // console.log('parent', { parent });
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
