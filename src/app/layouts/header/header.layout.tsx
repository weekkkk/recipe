import { FC } from "react";
import { LogoIcon } from "@/app/assets";
import { IHeaderLayoutProps } from "./interfaces";

export const HeaderLayout: FC<IHeaderLayoutProps> = ({ rightChildren }) => {
  return (
    <header className="fixed z-20 top-0 inset-x-0 px-8 py-2 flex justify-center text-brand bg-default shadow-base_25">
      <div className="flex grow"></div>
      <LogoIcon />
      <div className="flex items-center grow justify-end text-brand">
        {rightChildren}
      </div>
    </header>
  );
};
