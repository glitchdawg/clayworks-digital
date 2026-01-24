/**
 * useKeyboardNavigation Hook
 *
 * Handles keyboard navigation events (arrow keys, Escape, Enter, Space, Home, End)
 *
 * @example
 * ```tsx
 * useKeyboardNavigation({
 *   enabled: isDropdownOpen,
 *   onEscape: () => setIsDropdownOpen(false),
 *   onArrowKey: (direction) => {
 *     if (direction === 'down') moveToNext();
 *     if (direction === 'up') moveToPrevious();
 *   },
 * });
 * ```
 */

"use client";

import { useEffect } from "react";
import type { KeyboardNavigationOptions } from "@/app/types/accessibility";

export function useKeyboardNavigation(options: KeyboardNavigationOptions) {
  const { enabled, onEscape, onEnter, onSpace, onArrowKey, onHome, onEnd } =
    options;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          if (onEscape) {
            event.preventDefault();
            onEscape();
          }
          break;

        case "Enter":
          if (onEnter) {
            event.preventDefault();
            onEnter(event);
          }
          break;

        case " ":
          if (onSpace) {
            event.preventDefault();
            onSpace(event);
          }
          break;

        case "ArrowUp":
          if (onArrowKey) {
            event.preventDefault();
            onArrowKey("up", event);
          }
          break;

        case "ArrowDown":
          if (onArrowKey) {
            event.preventDefault();
            onArrowKey("down", event);
          }
          break;

        case "ArrowLeft":
          if (onArrowKey) {
            event.preventDefault();
            onArrowKey("left", event);
          }
          break;

        case "ArrowRight":
          if (onArrowKey) {
            event.preventDefault();
            onArrowKey("right", event);
          }
          break;

        case "Home":
          if (onHome) {
            event.preventDefault();
            onHome(event);
          }
          break;

        case "End":
          if (onEnd) {
            event.preventDefault();
            onEnd(event);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, onEscape, onEnter, onSpace, onArrowKey, onHome, onEnd]);
}
