/**
 * Accessibility Utility Functions
 *
 * Helper functions for managing focus, keyboard navigation, and accessibility features.
 */

/**
 * Get all focusable elements within a container
 *
 * @param container - The container element to search within
 * @param selector - Custom selector for focusable elements (optional)
 * @returns Array of focusable HTML elements
 */
export function getFocusableElements(
  container: HTMLElement | null,
  selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
): HTMLElement[] {
  if (!container) return [];

  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(selector),
  );

  // Filter out disabled and hidden elements
  return elements.filter((element) => {
    // Check if element is visible
    const style = window.getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden") {
      return false;
    }

    // Check if element is disabled
    if (
      element.hasAttribute("disabled") ||
      element.getAttribute("aria-disabled") === "true"
    ) {
      return false;
    }

    // Check if element has tabindex="-1" (should be excluded)
    const tabIndex = element.getAttribute("tabindex");
    if (tabIndex === "-1") {
      return false;
    }

    return true;
  });
}

/**
 * Check if an element is focusable
 *
 * @param element - The element to check
 * @returns True if the element is focusable
 */
export function isFocusable(element: HTMLElement | null): boolean {
  if (!element) return false;

  const focusableElements = getFocusableElements(
    element.parentElement || document.body,
  );
  return focusableElements.includes(element);
}

/**
 * Focus the first focusable element in a container
 *
 * @param container - The container element
 * @param selector - Custom selector for focusable elements (optional)
 * @returns The focused element, or null if none found
 */
export function focusFirstElement(
  container: HTMLElement | null,
  selector?: string,
): HTMLElement | null {
  if (!container) return null;

  const focusableElements = getFocusableElements(container, selector);
  const firstElement = focusableElements[0];

  if (firstElement) {
    firstElement.focus();
    return firstElement;
  }

  return null;
}

/**
 * Focus the last focusable element in a container
 *
 * @param container - The container element
 * @param selector - Custom selector for focusable elements (optional)
 * @returns The focused element, or null if none found
 */
export function focusLastElement(
  container: HTMLElement | null,
  selector?: string,
): HTMLElement | null {
  if (!container) return null;

  const focusableElements = getFocusableElements(container, selector);
  const lastElement = focusableElements[focusableElements.length - 1];

  if (lastElement) {
    lastElement.focus();
    return lastElement;
  }

  return null;
}

/**
 * Get the next focusable element in a list
 *
 * @param currentElement - The currently focused element
 * @param container - The container element
 * @param selector - Custom selector for focusable elements (optional)
 * @returns The next focusable element, or null if none found
 */
export function getNextFocusableElement(
  currentElement: HTMLElement,
  container: HTMLElement | null,
  selector?: string,
): HTMLElement | null {
  if (!container) return null;

  const focusableElements = getFocusableElements(container, selector);
  const currentIndex = focusableElements.indexOf(currentElement);

  if (currentIndex === -1) {
    return focusableElements[0] || null;
  }

  const nextIndex = (currentIndex + 1) % focusableElements.length;
  return focusableElements[nextIndex] || null;
}

/**
 * Get the previous focusable element in a list
 *
 * @param currentElement - The currently focused element
 * @param container - The container element
 * @param selector - Custom selector for focusable elements (optional)
 * @returns The previous focusable element, or null if none found
 */
export function getPreviousFocusableElement(
  currentElement: HTMLElement,
  container: HTMLElement | null,
  selector?: string,
): HTMLElement | null {
  if (!container) return null;

  const focusableElements = getFocusableElements(container, selector);
  const currentIndex = focusableElements.indexOf(currentElement);

  if (currentIndex === -1) {
    return focusableElements[focusableElements.length - 1] || null;
  }

  const previousIndex =
    (currentIndex - 1 + focusableElements.length) % focusableElements.length;
  return focusableElements[previousIndex] || null;
}

/**
 * Focus trap implementation helper
 * Handles Tab and Shift+Tab to keep focus within a container
 *
 * @param container - The container element to trap focus within
 * @param event - The keyboard event
 * @param selector - Custom selector for focusable elements (optional)
 * @returns True if the event was handled (prevented)
 */
export function trapFocus(
  container: HTMLElement | null,
  event: KeyboardEvent,
  selector?: string,
): boolean {
  if (!container || event.key !== "Tab") {
    return false;
  }

  const focusableElements = getFocusableElements(container, selector);

  if (focusableElements.length === 0) {
    return false;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement as HTMLElement;

  // If Shift+Tab and focus is on first element, move to last
  if (event.shiftKey) {
    if (activeElement === firstElement || !container.contains(activeElement)) {
      event.preventDefault();
      lastElement.focus();
      return true;
    }
  } else {
    // If Tab and focus is on last element, move to first
    if (activeElement === lastElement || !container.contains(activeElement)) {
      event.preventDefault();
      firstElement.focus();
      return true;
    }
  }

  return false;
}
