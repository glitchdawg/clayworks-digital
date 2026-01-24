/**
 * Accessibility Type Definitions
 *
 * TypeScript types for accessibility utilities, hooks, and components.
 */

/**
 * Priority level for screen reader announcements
 */
export type AnnouncePriority = "polite" | "assertive";

/**
 * Options for focus trap hook
 */
export interface FocusTrapOptions {
  /**
   * Whether the focus trap is active
   */
  isActive: boolean;
  /**
   * Whether to focus the first element when trap is activated
   * @default true
   */
  initialFocus?: boolean;
  /**
   * Whether to restore focus to the previously focused element when trap is deactivated
   * @default true
   */
  restoreFocus?: boolean;
  /**
   * Custom selector for focusable elements
   * @default 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
   */
  focusableSelector?: string;
}

/**
 * Options for keyboard navigation hook
 */
export interface KeyboardNavigationOptions {
  /**
   * Whether keyboard navigation is enabled
   */
  enabled: boolean;
  /**
   * Callback when Escape key is pressed
   */
  onEscape?: () => void;
  /**
   * Callback when Enter key is pressed
   */
  onEnter?: (event: KeyboardEvent) => void;
  /**
   * Callback when Space key is pressed
   */
  onSpace?: (event: KeyboardEvent) => void;
  /**
   * Callback for arrow key navigation
   */
  onArrowKey?: (
    direction: "up" | "down" | "left" | "right",
    event: KeyboardEvent,
  ) => void;
  /**
   * Callback when Home key is pressed
   */
  onHome?: (event: KeyboardEvent) => void;
  /**
   * Callback when End key is pressed
   */
  onEnd?: (event: KeyboardEvent) => void;
}

/**
 * Options for screen reader announcement
 */
export interface AnnounceOptions {
  /**
   * Priority of the announcement
   * @default 'polite'
   */
  priority?: AnnouncePriority;
  /**
   * Time in milliseconds before removing the announcement element
   * @default 1000
   */
  timeout?: number;
}
