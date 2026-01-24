/**
 * useAnnouncer Hook
 *
 * Provides a function to announce messages to screen readers.
 *
 * @example
 * ```tsx
 * const announce = useAnnouncer();
 *
 * const handleSubmit = () => {
 *   // ... submit logic
 *   announce('Form submitted successfully', { priority: 'polite' });
 * };
 * ```
 */

"use client";

import { useCallback } from "react";
import { announce } from "@/app/lib/announcer";
import type { AnnounceOptions } from "@/app/types/accessibility";

export function useAnnouncer() {
  const announceMessage = useCallback(
    (message: string, options?: AnnounceOptions) => {
      announce(message, options);
    },
    [],
  );

  return announceMessage;
}
