import {
  type RefObject,
  type PointerEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface UseDragOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  contentWidth: number;
}

interface UseDragResult {
  isDragging: boolean;
  canScrollBackward: boolean;
  canScrollForward: boolean;
  scrollBy: (distance: number) => void;
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
  const [scrollState, setScrollState] = useState({
    canScrollBackward: false,
    canScrollForward: false,
  });
  const lastXRef = useRef(0);
  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const pendingOffsetRef = useRef(0);
  const scrollStateRef = useRef(scrollState);

  const applyOffset = useCallback(
    (nextOffset: number) => {
      const container = containerRef.current;
      const content = contentRef.current;
      if (!container || !content) return;

      const nextMaxOffset = Math.min(0, container.clientWidth - contentWidth);
      const clampedOffset = Math.max(nextMaxOffset, Math.min(0, nextOffset));

      offsetRef.current = clampedOffset;
      pendingOffsetRef.current = clampedOffset;

      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(() => {
          content.style.transform = `translate3d(${pendingOffsetRef.current}px, 0, 0)`;
          frameRef.current = null;
        });
      }

      const nextScrollState = {
        canScrollBackward: clampedOffset < 0,
        canScrollForward: clampedOffset > nextMaxOffset,
      };

      if (
        scrollStateRef.current.canScrollBackward !==
          nextScrollState.canScrollBackward ||
        scrollStateRef.current.canScrollForward !==
          nextScrollState.canScrollForward
      ) {
        scrollStateRef.current = nextScrollState;
        setScrollState(nextScrollState);
      }
    },
    [containerRef, contentRef, contentWidth]
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateBounds = () => applyOffset(offsetRef.current);
    updateBounds();

    const resizeObserver = new ResizeObserver(updateBounds);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [applyOffset, containerRef]);

  const handleDragStart = useCallback(
    (e: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;

      container.setPointerCapture(e.pointerId);
      lastXRef.current = e.clientX;
      isDraggingRef.current = true;
      setIsDragging(true);
    },
    [containerRef]
  );

  const handleDragMove = useCallback(
    ({ clientX }: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const lastX = lastXRef.current;
      const diff = clientX - lastX;
      lastXRef.current = clientX;
      applyOffset(offsetRef.current + diff);
    },
    [applyOffset]
  );

  const handleDragEnd = useCallback(
    (e: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;

      if (container.hasPointerCapture(e.pointerId)) {
        container.releasePointerCapture(e.pointerId);
      }

      isDraggingRef.current = false;
      setIsDragging(false);
    },
    [containerRef]
  );

  const scrollBy = useCallback(
    (distance: number) => {
      applyOffset(offsetRef.current + distance);
    },
    [applyOffset]
  );

  return {
    isDragging,
    canScrollBackward: scrollState.canScrollBackward,
    canScrollForward: scrollState.canScrollForward,
    scrollBy,
    handlers: {
      onPointerDown: handleDragStart,
      onPointerMove: handleDragMove,
      onPointerUp: handleDragEnd,
      onPointerCancel: handleDragEnd,
    },
  };
};
