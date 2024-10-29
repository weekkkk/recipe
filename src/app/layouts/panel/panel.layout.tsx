import { FC, useMemo } from "react";
import classNames from "classnames";
import { ResizeBox } from "@/shared/components";
import { PanelLayoutResizePoint } from "./components";
import { TSide, TSizeRange } from "@/shared/types";
import {
  getCapitalizeString,
  getOrientationBySide,
  getSizePropNameByOrientation,
} from "@/shared/functions";
import { useTransitionState } from "@/shared/hooks";
import { IRange } from "@/shared/interfaces";
import { panelLayoutInsetClasses as insetClasses } from "./classes";
import { TPanelLayoutProps, TPanelLayoutSizeRangeProps } from "./types";

export const PanelLayout: FC<TPanelLayoutProps> = ({
  side,
  height,
  width,
  children,
  position = "relative",
  className,
  visible = true,
  ...sizeRangeProps
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

  const sideClass = useMemo(() => `${side}-0`, [side]);

  const hideSize = useMemo(() => visible || 0, [visible]);
  const sizeRange: TPanelLayoutSizeRangeProps = useMemo(() => {
    const sizePropName = getSizePropNameByOrientation(orientation);
    const capitalizeSizePropName = getCapitalizeString(sizePropName);
    const rangeKeys: (keyof IRange)[] = ["max", "min"];

    const _sizeRange = rangeKeys.reduce<TPanelLayoutSizeRangeProps>(
      (calc, rK) => {
        const obj = { ...calc };
        const key: keyof TSizeRange = `${rK}${capitalizeSizePropName}`;
        obj[key] = hideSize && sizeRangeProps[key];
        return obj;
      },
      {}
    );

    return _sizeRange;
  }, [hideSize, orientation, sizeRangeProps]);

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
        className={classNames(
          "flex shrink-0 bg-default transition-size",
          sideClass,
          insetClasses[orientation],
          className,
          {
            "overflow-hidden": isTransition || !visible,
          }
        )}
        style={{
          width,
          height,
          ...sizeRange,
        }}
      >
        <div className="px-8 py-4 overflow-y-auto overflow-x-auto">
          {children}
        </div>
      </aside>
    </ResizeBox>
  );
};
