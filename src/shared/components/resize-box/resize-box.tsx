import { FC, memo, useCallback, useMemo, useRef, useState } from "react";
import type { IResizeBoxProps } from "./interfaces";
import { ResizeBoxControl, IResizeBoxControlHandler } from "./components";
import { ISize } from "@/shared/interfaces";
import { ESide } from "@/shared/enums";
import { TSide } from "@/shared/types";

export const ResizeBox: FC<IResizeBoxProps> = memo(
  ({ children, controlElements, position = "relative" }) => {
    const _childrenChild = useRef<HTMLDivElement>(null);

    const [height, setHeight] = useState<ISize["height"]>();
    const [width, setWidth] = useState<ISize["width"]>();
    const size: Partial<ISize> = useMemo(() => {
      const size: Partial<ISize> = {};
      if (height) size.height = height;
      if (width) size.width = width;
      return size;
    }, [height, width]);

    const getStartSize = (): ISize | undefined => {
      if (!_childrenChild.current) return;
      const $element = _childrenChild.current.parentElement;
      if (!$element) return;
      const { offsetHeight: height, offsetWidth: width } = $element;
      return { height, width };
    };
    const handleDrag: IResizeBoxControlHandler = useCallback(
      ({ delta, side, sizePropName }) => {
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
    const handleGrab: IResizeBoxControlHandler = useCallback(
      ({ sizePropName }) => {
        if (!handleDrag[sizePropName])
          handleDrag[sizePropName] = getStartSize()?.[sizePropName];
        if (sizePropName == "height") setHeight(handleDrag[sizePropName]);
        else setWidth(handleDrag[sizePropName]);
      },
      [handleDrag]
    );
    const handleDrop: IResizeBoxControlHandler = useCallback(
      (e) => {
        handleDrag(e);
        delete handleDrag[e.sizePropName];
      },
      [handleDrag]
    );
    const controls = useMemo(() => {
      const entries = Object.entries(controlElements) as [TSide, JSX.Element][];
      return entries.map(([side, pointElement]) => {
        return (
          <ResizeBoxControl
            key={side}
            side={side}
            onGrab={handleGrab}
            onDrag={handleDrag}
            onDrop={handleDrop}
          >
            {pointElement}
          </ResizeBoxControl>
        );
      });
    }, [controlElements, handleDrag, handleGrab, handleDrop]);

    const _children: JSX.Element = useMemo(() => {
      return {
        ...children,
        props: {
          ...children.props,
          style: { ...children.props.style, ...size },
          className: `${children.props.className} ${position}`,
          children: (
            <>
              {children.props.children} {controls}
              <div hidden ref={_childrenChild} />
            </>
          ),
        },
      };
    }, [size, children, controls, position]);

    return _children;
  }
);
