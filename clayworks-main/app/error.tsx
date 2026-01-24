"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service in production
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-4">
            <Icon
              icon="tabler:face-id-error"
              className="w-10 h-10 text-red-500"
            />
          </div>
        </div>
        <h2 className="text-2xl font-inter-semibold text-text-heading mb-3">
          Something went wrong!
        </h2>
        <p className="text-gray-600 font-inter-normal text-base mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 font-inter-normal mb-6">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-3 rounded-lg font-inter-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-brand-secondary text-brand-secondary hover:bg-gray-50 px-6 py-3 rounded-lg font-inter-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
