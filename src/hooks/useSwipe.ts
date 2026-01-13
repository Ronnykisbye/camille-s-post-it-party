import { useState, useCallback, useRef } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface SwipeState {
  startX: number;
  startY: number;
  deltaX: number;
  isSwiping: boolean;
}

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    startX: 0,
    startY: 0,
    deltaX: 0,
    isSwiping: false,
  });
  
  const threshold = 50;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setSwipeState({
      startX: touch.clientX,
      startY: touch.clientY,
      deltaX: 0,
      isSwiping: true,
    });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!swipeState.isSwiping) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - swipeState.startX;
    const deltaY = touch.clientY - swipeState.startY;
    
    // Only track horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setSwipeState(prev => ({ ...prev, deltaX }));
    }
  }, [swipeState.isSwiping, swipeState.startX, swipeState.startY]);

  const handleTouchEnd = useCallback(() => {
    if (!swipeState.isSwiping) return;
    
    if (swipeState.deltaX > threshold) {
      onSwipeRight?.();
      triggerHaptic();
    } else if (swipeState.deltaX < -threshold) {
      onSwipeLeft?.();
      triggerHaptic();
    }
    
    setSwipeState({
      startX: 0,
      startY: 0,
      deltaX: 0,
      isSwiping: false,
    });
  }, [swipeState, onSwipeLeft, onSwipeRight]);

  return {
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    deltaX: swipeState.deltaX,
    isSwiping: swipeState.isSwiping,
  };
}

function triggerHaptic() {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(10);
    } catch (e) {
      // Haptic not supported
    }
  }
}
