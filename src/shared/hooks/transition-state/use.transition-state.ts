import { TransitionEvent, useState } from "react";
import { useUpdate } from "../update";
import { TOnTransitionEnd } from "./types";

export const useTransitionState = <T = Element>(
  reactiveVar?: unknown
): [boolean, TOnTransitionEnd<T>, () => void] => {
  const [isTransition, setIsTransition] = useState(false);

  const onTransitionStart = () => {
    if (isTransition) return;
    setIsTransition(true);
  };

  useUpdate(onTransitionStart, reactiveVar);

  const onTransitionEnd: TOnTransitionEnd<T> = ({
    target,
    currentTarget,
    propertyName,
  }: TransitionEvent<T>) => {
    if (target !== currentTarget) return;

    const { propertyName: savedPropertyName } = onTransitionEnd;

    if (savedPropertyName && savedPropertyName !== propertyName) return;
    Object.assign(onTransitionEnd, { propertyName });

    setIsTransition(false);
  };

  return [isTransition, onTransitionEnd, onTransitionStart];
};
