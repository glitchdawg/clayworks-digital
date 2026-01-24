/**
 * Screen Reader Announcement Utility
 *
 * Provides programmatic announcements for screen readers using ARIA live regions.
 */

import type {
  AnnounceOptions,
  AnnouncePriority,
} from "@/app/types/accessibility";

/**
 * Announce a message to screen readers
 *
 * Creates a temporary ARIA live region element, announces the message,
 * and removes it after a timeout.
 *
 * @param message - The message to announce
 * @param options - Announcement options
 *
 * @example
 * ```ts
 * announce('Form submitted successfully', { priority: 'polite' });
 * announce('Error: Please fix the form errors', { priority: 'assertive' });
 * ```
 */
export function announce(message: string, options: AnnounceOptions = {}): void {
  const { priority = "polite", timeout = 1000 } = options;

  // Create announcement element
  const announcement = document.createElement("div");
  announcement.setAttribute(
    "role",
    priority === "assertive" ? "alert" : "status",
  );
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  // Append to body
  document.body.appendChild(announcement);

  // Force a reflow to ensure the announcement is processed
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  announcement.offsetHeight;

  // Remove after timeout
  setTimeout(() => {
    if (announcement.parentNode) {
      document.body.removeChild(announcement);
    }
  }, timeout);
}

/**
 * Create a persistent live region for announcements
 *
 * Useful when you need to make multiple announcements without
 * creating/destroying elements each time.
 *
 * @param priority - Priority level for announcements
 * @returns Object with announce function and cleanup function
 *
 * @example
 * ```ts
 * const { announce, cleanup } = createLiveRegion('polite');
 * announce('First message');
 * announce('Second message');
 * cleanup(); // Remove when done
 * ```
 */
export function createLiveRegion(priority: AnnouncePriority = "polite") {
  const announcement = document.createElement("div");
  announcement.setAttribute(
    "role",
    priority === "assertive" ? "alert" : "status",
  );
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  document.body.appendChild(announcement);

  return {
    /**
     * Announce a message using this live region
     */
    announce: (message: string) => {
      announcement.textContent = message;
      // Force a reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      announcement.offsetHeight;
    },
    /**
     * Clean up the live region
     */
    cleanup: () => {
      if (announcement.parentNode) {
        document.body.removeChild(announcement);
      }
    },
  };
}
