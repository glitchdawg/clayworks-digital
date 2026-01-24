"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service in production
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-white">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-4">
                <Icon
                  icon="tabler:face-id-error"
                  className="w-10 h-10 text-red-500"
                />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-[#2B2B2B] mb-3">
              Something went wrong!
            </h2>
            <p className="text-gray-600 text-base mb-6">
              {error.message ||
                "A critical error occurred. Please refresh the page."}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-400 mb-6">
                Error ID: {error.digest}
              </p>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => reset()}
                className="bg-[#E07B39] hover:bg-[#D06A28] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2"
              >
                Try again
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="border border-[#2C3E50] text-[#2C3E50] hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2C3E50] focus:ring-offset-2"
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
