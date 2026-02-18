import { useState, useCallback, useRef, useEffect } from 'react';

interface Size {
  width: number;
  height: number;
}

interface Position {
  x: number;
  y: number;
}

export type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

interface UseResizableProps {
  initialSize?: Size;
  minSize?: Size;
  position: Position;
  setPosition: (pos: Position) => void;
}

export function useResizable({
  initialSize = { width: 600, height: 400 },
  minSize = { width: 200, height: 150 },
  position,
  setPosition,
}: UseResizableProps) {
  const [size, setSize] = useState<Size>(initialSize);
  const [isResizing, setIsResizing] = useState(false);
  
  // Refs to store start values to avoid dependency issues in listeners
  const resizeStartPos = useRef<Position>({ x: 0, y: 0 });
  const startSize = useRef<Size>(initialSize);
  const startPosition = useRef<Position>({ x: 0, y: 0 });
  const activeDirection = useRef<ResizeDirection | null>(null);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent, direction: ResizeDirection) => {
    // Only resize with left mouse button
    if (e.button !== 0) return;

    setIsResizing(true);
    activeDirection.current = direction;
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = size;
    startPosition.current = position;
    
    // Prevent text selection and parent dragging while resizing
    e.preventDefault();
    e.stopPropagation();
  }, [size, position]);

  const handleResizeMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !activeDirection.current) return;

    const deltaX = e.clientX - resizeStartPos.current.x;
    const deltaY = e.clientY - resizeStartPos.current.y;
    const direction = activeDirection.current;

    let newWidth = startSize.current.width;
    let newHeight = startSize.current.height;
    let newX = startPosition.current.x;
    let newY = startPosition.current.y;

    // Handle Width and X position (East/West)
    if (direction.includes('e')) {
      newWidth = Math.max(minSize.width, startSize.current.width + deltaX);
    } else if (direction.includes('w')) {
      const tentativeWidth = startSize.current.width - deltaX;
      if (tentativeWidth >= minSize.width) {
        newWidth = tentativeWidth;
        newX = startPosition.current.x + deltaX;
      } else {
        newWidth = minSize.width;
        newX = startPosition.current.x + (startSize.current.width - minSize.width);
      }
    }

    // Handle Height and Y position (South/North)
    if (direction.includes('s')) {
      newHeight = Math.max(minSize.height, startSize.current.height + deltaY);
    } else if (direction.includes('n')) {
      const tentativeHeight = startSize.current.height - deltaY;
      if (tentativeHeight >= minSize.height) {
        newHeight = tentativeHeight;
        newY = startPosition.current.y + deltaY;
      } else {
        newHeight = minSize.height;
        newY = startPosition.current.y + (startSize.current.height - minSize.height);
      }
    }

    setSize({ width: newWidth, height: newHeight });
    setPosition({ x: newX, y: newY });

  }, [isResizing, minSize.width, minSize.height, setPosition]);

  const handleResizeMouseUp = useCallback(() => {
    setIsResizing(false);
    activeDirection.current = null;
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMouseMove);
      window.addEventListener('mouseup', handleResizeMouseUp);
    } else {
      window.removeEventListener('mousemove', handleResizeMouseMove);
      window.removeEventListener('mouseup', handleResizeMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleResizeMouseMove);
      window.removeEventListener('mouseup', handleResizeMouseUp);
    };
  }, [isResizing, handleResizeMouseMove, handleResizeMouseUp]);

  return {
    size,
    setSize,
    isResizing,
    handleResizeMouseDown,
  };
}
