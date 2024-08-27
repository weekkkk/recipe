import { FC } from "react";
import { LogoIcon } from "@/app/assets";

export const HeaderLayout: FC = () => {
  return (
    <header className="px-8 py-2 flex justify-center text-brand bg-default shadow-base_25">
      <LogoIcon />
    </header>
  );
};
