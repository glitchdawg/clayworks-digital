"use client";

import type React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PartnersTabButtonsProps {
  activeTab: "property-owner" | "broker";
  propertyOwnerLabel?: string;
  brokerLabel?: string;
}

const PartnersTabButtons: React.FC<PartnersTabButtonsProps> = ({
  activeTab,
  propertyOwnerLabel = "I'm a Property Owner",
  brokerLabel = "I'm a Broker",
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createTabUrl = (tab: "property-owner" | "broker") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div
      role="tablist"
      aria-label="Partner type selection"
      className="flex gap-4 mt-12 md:!mt-16 justify-center"
    >
      <Link
        href={createTabUrl("property-owner")}
        scroll={false}
        role="tab"
        aria-selected={activeTab === "property-owner"}
        aria-controls="property-owner-tabpanel"
        className={`px-6 py-3 rounded-full font-inter-medium text-sm md:!text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 ${
          activeTab === "property-owner"
            ? "bg-[#5A5A5A] text-white font-inter-bold"
            : "bg-white text-black hover:bg-gray-50"
        }`}
      >
        {propertyOwnerLabel}
      </Link>
      <Link
        href={createTabUrl("broker")}
        scroll={false}
        role="tab"
        aria-selected={activeTab === "broker"}
        aria-controls="broker-tabpanel"
        className={`px-6 py-3 rounded-full font-inter-medium text-sm md:!text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 ${
          activeTab === "broker"
            ? "bg-[#5A5A5A] text-white font-inter-bold"
            : "bg-white text-black hover:bg-gray-50"
        }`}
      >
        {brokerLabel}
      </Link>
    </div>
  );
};

export default PartnersTabButtons;
