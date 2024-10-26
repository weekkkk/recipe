import { NotReadonlyble } from "@/shared/types";
import { TransitionEvent, TransitionEventHandler } from "react";

export type TOnTransitionEnd<T = Element> = TransitionEventHandler<T> &
  NotReadonlyble<Partial<Pick<TransitionEvent, "propertyName">>>;
