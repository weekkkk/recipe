import { FC, useMemo } from "react";
import { IPanelLayoutResizePointProps } from "./interfaces";
import {
  ResizeCircleHorizontalIcon,
  ResizeCircleVerticalIcon,
} from "@/app/assets";
import { Button } from "@/shared/components";

export const PanelLayoutResizePoint: FC<IPanelLayoutResizePointProps> = ({
  orientation,
  className,
  children,
}) => {
  const sizeClass = useMemo(
    () => (orientation == "x" ? "w-full" : "h-full"),
    [orientation]
  );
  // const rotateClass = useMemo(
  //   () => (orientation == "x" ? "rotate-0" : "rotate-90"),
  //   [orientation]
  // );

  return (
    <div
      className={`${sizeClass} ${className} flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity`}
    >
      <hr className={`${sizeClass} absolute border border-brand`} />
      <Button className="z-10">
        <>
          {orientation == "y" ? (
            <ResizeCircleHorizontalIcon />
          ) : (
            <ResizeCircleVerticalIcon />
          )}
          {children}
        </>
      </Button>
    </div>
  );
};
