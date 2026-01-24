import Link from "next/link";
import { Icon } from "@iconify/react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="mb-4">
            <Icon
              icon="streamline-freehand:server-error-404-not-found"
              className="w-24 h-24 text-brand-primary mx-auto"
            />
          </div>
        </div>
        <h2 className="text-2xl font-inter-semibold text-text-heading mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-600 font-inter-normal text-base mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-3 rounded-lg font-inter-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2  min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            Return Home
          </Link>
          <Link
            href="/contact-us"
            className="border border-brand-secondary text-brand-secondary hover:bg-gray-50 px-6 py-3 rounded-lg font-inter-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
