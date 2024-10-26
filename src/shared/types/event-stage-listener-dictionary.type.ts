import { EEventStage } from "../enums";

export type TEventStageListenerDictionary<T = EventListener> = Record<
  (typeof EEventStage)[keyof typeof EEventStage],
  (event: T) => void
>;
