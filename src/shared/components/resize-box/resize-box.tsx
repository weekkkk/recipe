import {
  FC,
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { IResizeBoxProps } from "./interfaces";
import { ResizeBoxPoint, IResizeBoxPointHandler } from "./components";
import { ISize } from "@/shared/interfaces";
import { SideEnum } from "@/shared/enums";
import { SideType } from "@/shared/types";
import { optimizeSetState } from "@/shared/functions";

export const ResizeBox: FC<IResizeBoxProps> = memo(
  ({ children, pointElements }) => {
    const $localChildrenChild = useRef<HTMLDivElement>(null);

    const [size, setSize] = useState<ISize>();

    const optimizedSetSize = useMemo(() => optimizeSetState(setSize), []);

    const handleDrag: IResizeBoxPointHandler = useCallback(
      (delta, side, sizePropName) => {
        const startSize = handleDrag.startSize;
        if (!startSize) return;
        const newSize = { ...startSize };
        if (side == SideEnum.Right || side == SideEnum.Bottom) delta = -delta;
        newSize[sizePropName] += delta;
        if (newSize[sizePropName] < 0) newSize[sizePropName] = 0;
        setSize(newSize);
      },
      []
    );

    const handleGrab: IResizeBoxPointHandler = useCallback(() => {
      if (!handleDrag.startSize) handleDrag.startSize = getStartSize();
      setSize(handleDrag.startSize);
    }, [handleDrag]);

    const handleDrop: IResizeBoxPointHandler = useCallback(
      (delta, side, sizePropName) => {
        handleDrag(delta, side, sizePropName);
        handleDrag.startSize = undefined;
      },
      [handleDrag]
    );

    const points = useMemo(() => {
      const entries = Object.entries(pointElements) as [
        SideType,
        JSX.Element
      ][];
      return entries.map(([side, pointElement]) => {
        return (
          <ResizeBoxPoint
            key={side}
            side={side}
            onGrab={handleGrab}
            onDrag={handleDrag}
            onDrop={handleDrop}
          >
            {pointElement}
          </ResizeBoxPoint>
        );
      });
    }, [pointElements, handleDrag, handleGrab, handleDrop]);

    const localChildren: JSX.Element = useMemo(() => {
      return {
        ...children,
        props: {
          ...children.props,
          style: { ...children.props.style, ...size },
          className: `${children.props.className} relative`,
          children: (
            <>
              {children.props.children} {points}
              <div hidden ref={$localChildrenChild} />
            </>
          ),
        },
      };
    }, [size, children, points]);

    useLayoutEffect(() => {
      optimizedSetSize(getStartSize());
    }, [optimizedSetSize]);

    const getStartSize = (): ISize | undefined => {
      if (!$localChildrenChild.current) return;
      const parent = $localChildrenChild.current.parentElement;
      if (!parent) return;
      return {
        height: parent.offsetHeight,
        width: parent.offsetWidth,
      };
    };

    return localChildren;
  }
);
