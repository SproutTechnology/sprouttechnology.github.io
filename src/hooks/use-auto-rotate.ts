import { useEffect } from "react";

interface UseAutoRotateOptions {
  disabled: boolean;
  intervalMs: number;
  itemCount: number;
  onRotate: () => void;
}

/* Rotates an active item on a timed interval. */
export function useAutoRotate({
  disabled,
  intervalMs,
  itemCount,
  onRotate,
}: UseAutoRotateOptions): void {
  useEffect(() => {
    if (disabled || itemCount === 0) {
      return;
    }

    const intervalId = window.setInterval(onRotate, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [disabled, intervalMs, itemCount, onRotate]);
}
