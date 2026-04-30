import { type RefObject, useEffect } from "react";

/* Locks page scroll and closes an open modal with Escape. */
export function useModalKeyboardLock(
  isOpen: boolean,
  closeButtonRef: RefObject<HTMLButtonElement>,
  onClose: () => void,
): void {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeButtonRef, isOpen, onClose]);
}
