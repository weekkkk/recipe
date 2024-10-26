import {
  FC,
  memo,
  useCallback,
  // useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { IResizeBoxProps } from "./interfaces";
import { ResizeBoxPoint, IResizeBoxPointHandler } from "./components";
import { ISize } from "@/shared/interfaces";
import { ESide } from "@/shared/enums";
import { TSide } from "@/shared/types";
// import { optimizeSetState } from "@/shared/functions";

export const ResizeBox: FC<IResizeBoxProps> = memo(
  ({ children, pointElements, position = "relative" }) => {
    const $localChildrenChild = useRef<HTMLDivElement>(null);

    const [height, setHeight] = useState<ISize["height"]>();
    const [width, setWidth] = useState<ISize["width"]>();
    const size: Partial<ISize> = useMemo(() => {
      const size: Partial<ISize> = {};
      if (height) size.height = height;
      if (width) size.width = width;
      // console.log(size);
      return size;
    }, [height, width]);

    // const optimizedSetSize = useMemo(() => optimizeSetState(setSize), []);

    const handleDrag: IResizeBoxPointHandler = useCallback(
      (delta, side, sizePropName) => {
        const startSize = handleDrag[sizePropName];
        if (!startSize) return;
        if (side == ESide.Right || side == ESide.Bottom) delta = -delta;
        let newSize = startSize + delta;
        if (newSize < 0) newSize = 0;
        if (sizePropName == "height") setHeight(newSize);
        if (sizePropName == "width") setWidth(newSize);
      },
      []
    );

    const handleGrab: IResizeBoxPointHandler = useCallback(
      (delta, side, sizePropName) => {
        // console.log(sizePropName);
        if (!handleDrag[sizePropName])
          handleDrag[sizePropName] = getStartSize()?.[sizePropName];
        if (sizePropName == "height") setHeight(handleDrag[sizePropName]);
        else setWidth(handleDrag[sizePropName]);
      },
      [handleDrag]
    );

    const handleDrop: IResizeBoxPointHandler = useCallback(
      (delta, side, sizePropName) => {
        handleDrag(delta, side, sizePropName);
        handleDrag[sizePropName] = undefined;
      },
      [handleDrag]
    );

    const points = useMemo(() => {
      const entries = Object.entries(pointElements) as [
        TSide,
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
      // console.log(points);
      return {
        ...children,
        props: {
          ...children.props,
          style: { ...children.props.style, ...size },
          className: `${children.props.className} ${position}`,
          children: (
            <>
              {children.props.children} {points}
              <div hidden ref={$localChildrenChild} />
            </>
          ),
        },
      };
    }, [size, children, points, position]);

    // useLayoutEffect(() => {
    //   optimizedSetSize(getStartSize());
    // }, [optimizedSetSize]);

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
