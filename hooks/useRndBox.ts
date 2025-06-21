import { useState, useCallback } from "react";

export function useRndBox(initial = { width: 200, height: 100, x: 150, y: 150 }) {
  const [position, setPosition] = useState({ x: initial.x, y: initial.y });
  const [size, setSize] = useState({ width: initial.width, height: initial.height });

  const onDragStop = useCallback((_: any, d: any) => {
    setPosition({ x: d.x, y: d.y });
  }, []);

  const onResizeStop = useCallback((_: any, __: any, ref: HTMLElement, ___: any, pos: any) => {
    setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
    setPosition(pos);
  }, []);

  return {
    position,
    size,
    setPosition,
    setSize,
    handlers: {
      onDragStop,
      onResizeStop,
    },
  };
}
