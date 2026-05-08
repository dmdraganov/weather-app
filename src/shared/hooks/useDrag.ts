import { type RefObject, type PointerEvent, useRef, useState } from 'react';

interface UseDragOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  contentWidth: number;
}

interface UseDragResult {
  isDragging: boolean;
  handlers: {
    onPointerDown: (e: PointerEvent) => void;
    onPointerMove: (e: PointerEvent) => void;
    onPointerUp: (e: PointerEvent) => void;
    onPointerCancel: (e: PointerEvent) => void;
  };
}

export const useDrag = ({
  containerRef,
  contentRef,
  contentWidth,
}: UseDragOptions): UseDragResult => {
  const [isDragging, setIsDragging] = useState(false);
  const lastXRef = useRef(0);
  const offsetRef = useRef(0);

  const handleDragStart = (e: PointerEvent) => {
    if (!containerRef.current) return;
    containerRef.current.setPointerCapture(e.pointerId);
    lastXRef.current = e.clientX;
    setIsDragging(true);
  };

  const handleDragMove = ({ clientX }: PointerEvent) => {
    const container = containerRef.current;
    if (!isDragging || !container) return;
    const maxOffset = -(contentWidth - container.clientWidth);
    const lastX = lastXRef.current;
    let offset = offsetRef.current;
    const diff = clientX - lastX;
    lastXRef.current = clientX;
    offset += diff;
    if (offset > 0) offset = 0;
    if (offset < maxOffset) offset = maxOffset;
    contentRef.current!.style.transform = `translateX(${offset}px)`;
    offsetRef.current = offset;
  };

  const handleDragEnd = (e: PointerEvent) => {
    if (!containerRef.current) return;
    containerRef.current.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  return {
    isDragging,
    handlers: {
      onPointerDown: handleDragStart,
      onPointerMove: handleDragMove,
      onPointerUp: handleDragEnd,
      onPointerCancel: handleDragEnd,
    },
  };
};
