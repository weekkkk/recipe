import { FC, useMemo } from "react";
import { IPanelLayoutResizePointProps } from "./interfaces";

export const PanelLayoutResizePoint: FC<IPanelLayoutResizePointProps> = ({
  orientation,
  className,
  children,
}) => {
  const sizeClass = useMemo(
    () => (orientation == "x" ? "w-full" : "h-full"),
    [orientation]
  );

  return (
    <div
      className={`${sizeClass} ${className} flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity`}
    >
      <hr className={`${sizeClass} border-2 border-brand z-10`} />
      {children}
    </div>
  );
};
