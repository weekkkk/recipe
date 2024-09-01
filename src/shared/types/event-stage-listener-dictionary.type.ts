import { EventStageEnum } from "../enums";

export type EventStageListenerDictionaryType<T = EventListener> = Record<
  (typeof EventStageEnum)[keyof typeof EventStageEnum],
  (event: T) => void
>;
