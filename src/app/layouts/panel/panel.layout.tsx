import { FC, useMemo } from "react";
import { IPanelLayoutProps } from "./interfaces";
import { ResizeBox } from "@/shared/components";
import { PanelLayoutResizePoint } from "./components";
import { TSide } from "@/shared/types";
import { getOrientationBySide } from "@/shared/functions";
import classNames from "classnames";
import { useTransitionState } from "@/shared/hooks";
// import { IRange, ISize } from "@/shared/interfaces";

export const PanelLayout: FC<IPanelLayoutProps> = ({
  side,
  height,
  width,
  children,
  position = "relative",
  className = "",
  visible = true,
  ...restSize
}) => {
  const orientation = useMemo(() => getOrientationBySide(side), [side]);

  const pointSide: TSide = useMemo(() => {
    switch (side) {
      case "top":
        return "bottom";
      case "bottom":
        return "top";
      case "left":
        return "right";
      case "right":
        return "left";
    }
  }, [side]);

  const insetClass = useMemo(
    () => (orientation == "x" ? "inset-x-0" : "inset-y-0"),
    [orientation]
  );

  // const hideSize = useMemo(() => visible || 0, [visible]);

  // const size = useMemo<Partial<ISize<IRange>>>(() => {
    
  // }, [orientation, restSize]);

  // const maxHeight = useMemo(
  //   () => (orientation == "x" ? hideSize && propMaxHeight : propMaxHeight),
  //   [orientation, hideSize, propMaxHeight]
  // );
  // const maxWidth = useMemo(
  //   () => (orientation == "y" ? hideSize && propMaxWidth : propMaxWidth),
  //   [orientation, hideSize, propMaxWidth]
  // );
  // const minHeight = useMemo(
  //   () => (orientation == "x" ? hideSize && propMinHeight : propMinHeight),
  //   [orientation, hideSize, propMinHeight]
  // );
  // const minWidth = useMemo(
  //   () => (orientation == "y" ? hideSize && propMinWidth : propMinWidth),
  //   [orientation, hideSize, propMinWidth]
  // );

  const [isTransition, onTransitionEnd] = useTransitionState(visible);

  return (
    <ResizeBox
      position={position}
      pointElements={{
        [pointSide]: <PanelLayoutResizePoint orientation={orientation} />,
      }}
    >
      <aside
        onTransitionEnd={onTransitionEnd}
        className={`${side}-0 ${insetClass} ${className} transition-size ${classNames(
          {
            "overflow-hidden": isTransition || !visible,
          }
        )} shrink-0 bg-default flex`}
        style={{
          maxWidth,
          minWidth,
          width,
          maxHeight,
          minHeight,
          height,
        }}
      >
        <div className="px-8 py-4 overflow-y-auto overflow-x-auto">
          {children}
        </div>
      </aside>
    </ResizeBox>
  );
};
