import { useEffect, useState } from 'react';

/* Delays navigation entrance animation until after initial paint. */
export function useNavigationEntrance(): boolean {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    let firstFrameId = 0;
    let secondFrameId = 0;

    firstFrameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(() => {
        setHasEntered(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      window.cancelAnimationFrame(secondFrameId);
    };
  }, []);

  return hasEntered;
}
