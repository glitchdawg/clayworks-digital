/**
 * useFocusTrap Hook
 *
 * Traps keyboard focus within a container element (useful for modals, dropdowns, etc.)
 *
 * @example
 * ```tsx
 * const containerRef = useFocusTrap({ isActive: isModalOpen });
 *
 * return (
 *   <div ref={containerRef}>
 *     <button>First</button>
 *     <button>Last</button>
 *   </div>
 * );
 * ```
 */

"use client";

import { useEffect, useRef } from "react";
import type { FocusTrapOptions } from "@/app/types/accessibility";
import {
  getFocusableElements,
  focusFirstElement,
  trapFocus,
} from "@/app/lib/accessibility";

export function useFocusTrap(options: FocusTrapOptions) {
  const {
    isActive,
    initialFocus = true,
    restoreFocus = true,
    focusableSelector,
  } = options;

  const containerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) {
      return;
    }

    // Store the currently focused element
    if (restoreFocus) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }

    // Focus first element if requested
    if (initialFocus) {
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => {
        focusFirstElement(containerRef.current, focusableSelector);
      });
    }

    // Handle Tab key to trap focus
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" && containerRef.current) {
        trapFocus(containerRef.current, event, focusableSelector);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      // Restore focus to previous element
      if (restoreFocus && previousFocusRef.current) {
        // Check if element still exists and is focusable
        const previousElement = previousFocusRef.current;
        if (
          document.body.contains(previousElement) &&
          previousElement instanceof HTMLElement
        ) {
          requestAnimationFrame(() => {
            previousElement.focus();
          });
        }
      }
    };
  }, [isActive, initialFocus, restoreFocus, focusableSelector]);

  return containerRef;
}
