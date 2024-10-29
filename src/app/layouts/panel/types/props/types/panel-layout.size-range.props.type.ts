import { TSizePropName, TSizeRange } from "@/shared/types";

export type TPanelLayoutSizeRangeProps = Partial<
  TSizeRange<TSizePropName, string | number>
>;
