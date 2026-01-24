import { Icon } from "@iconify/react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative inline-block">
          <Icon
            icon="eos-icons:bubble-loading"
            className="w-16 h-16 text-brand-primary mx-auto"
          />
        </div>
        <p className="mt-6 text-gray-600 font-inter-medium text-lg">
          Loading...
        </p>
      </div>
    </div>
  );
}
