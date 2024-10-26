import { Grid2HorizontalIcon, Grid2VerticalIcon } from "@/app/assets";
import { Button } from "@/shared/components";
import { FC } from "react";
import { IDefaultLayoutTemplateSwitcherProps } from "./interfaces";

export const DefaultLayoutTemplateSwitcher: FC<
  IDefaultLayoutTemplateSwitcherProps
> = ({ x, setX, y, setY }) => {
  return (
    <div className="flex gap-2">
      <Button border={!y} onClick={() => setY()}>
        <Grid2HorizontalIcon />
      </Button>

      <Button border={!x} onClick={() => setX()}>
        <Grid2VerticalIcon />
      </Button>
    </div>
  );
};
