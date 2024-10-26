import { FC } from "react";
import { IButtonProps } from "./interfaces";
import classNames from "classnames";

export const Button: FC<IButtonProps> = ({
  children,
  className,
  border,
  onClick,
}) => {
  return (
    <button
      className={`p-2 outline-brand outline-1 ${classNames({
        outline: border,
        "text-brand": border,
        "bg-brand": !border,
        "text-default": !border,
      })} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
