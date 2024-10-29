import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import type { IResizeBoxControlProps } from "./interfaces";
import {
  resizeBoxControlSideClasses as sideClasses,
  resizeBoxControlTranslateClasses as translateClasses,
  resizeBoxControlCursorClasses as cursorClasses,
} from "./classes";
import { DragService, DragServiceEvent } from "@/shared/services";
import { TSizePropName } from "@/shared/types";
import {
  getOrientationBySide,
  getSizePropNameByOrientation,
} from "@/shared/functions";
import classNames from "classnames";
import { EEventStage } from "@/shared/enums";

export const ResizeBoxControl: FC<IResizeBoxControlProps> = ({
  children,
  side,
  onGrab,
  onDrag,
  onDrop,
}) => {
  const _childrenChild = useRef<HTMLDivElement>(null);

  const orientation = useMemo(() => getOrientationBySide(side), [side]);
  const className = useMemo(() => {
    const { className: defaultClasses } = children.props;
    const customClasses = "absolute touch-none";
    return classNames(
      defaultClasses,
      sideClasses[side],
      translateClasses[side],
      cursorClasses[orientation],
      customClasses
    );
  }, [side, orientation, children]);
  const _children: JSX.Element = {
    ...children,
    props: {
      ...children.props,
      className,
      children: (
        <>
          {children.props.children}
          <div hidden ref={_childrenChild} />
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
  const _onDrag = useCallback(
    ({ deltaPosition, stage }: DragServiceEvent) => {
      const delta = deltaPosition[deltaPositionOrientation];
      const event = { delta, side, sizePropName };
      switch (stage) {
        case EEventStage.Start:
          onGrab?.(event);
          break;
        case EEventStage.Process:
          onDrag?.(event);
          break;
        case EEventStage.Stop:
          onDrop?.(event);
          break;
      }
    },
    [deltaPositionOrientation, side, sizePropName, onGrab, onDrag, onDrop]
  );

  useEffect(() => {
    if (!_childrenChild.current) return;
    const $element = _childrenChild.current.parentElement;
    if (!$element) return;

    const dragService = new DragService($element, {
      start: _onDrag,
      process: _onDrag,
      stop: _onDrag,
    });
    dragService.init();

    return dragService.destroy;
  }, [_onDrag]);

  return _children;
};
