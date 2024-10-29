import { TPosition } from "@/shared/types";

export type TResizeBoxPosition = Exclude<TPosition, "static">;
