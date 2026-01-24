"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function ExploreSection() {
  const [activeTab, setActiveTab] = useState("Co-working Space");
  const [dayPass, setDayPass] = useState("Day Pass");
  const [location, setLocation] = useState("");

  const tabs = [
    "Co-working Space",
    "Built-to-Suit",
    "Private Office",
    "Virtual Office",
    "Huddle",
  ];

  const dayPassOptions = ["Day Pass", "Meeting Room", "Private Office"];

  return (
    <section className="relative lg:-mt-40 -mt-20 mb-20 z-20">
      <div className="container mx-auto px-8">
        {/* Text Content */}
        <div className="hidden md:block mb-8 max-w-2xl mx-auto">
          <div
            className="px-8 py-3 rounded-full text-white text-center font-medium text-sm"
            style={{ backgroundColor: "#00000080" }}
          >
            Ready-to-use workspaces and meeting rooms designed for focus,
            comfort, and collaboration.
          </div>
        </div>

        {/* Explore Component */}
        <div
          className="bg-white/95 rounded-3xl px-4 py-6 lg:px-8 lg:py-10 border border-gray-100 max-w-4xl mx-auto"
          style={{
            boxShadow:
              "0px 3px 7px 0px rgba(0, 0, 0, 0.04), 0px 13px 13px 0px rgba(0, 0, 0, 0.03), 0px 30px 18px 0px rgba(0, 0, 0, 0.02), 0px 53px 21px 0px rgba(0, 0, 0, 0.01), 0px 83px 23px 0px rgba(0, 0, 0, 0.00)",
            backdropFilter: "blur(11px)",
          }}
        >
          {/* Desktop Tabs Row - Hidden on Mobile */}
          <div className="hidden md:block mb-8">
            <div
              role="tablist"
              aria-label="Workspace type selection"
              className="flex flex-wrap gap-10 w-full"
            >
              {tabs.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`tabpanel-${tab.replace(/\s+/g, "-").toLowerCase()}`}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full cursor-pointer font-medium text-sm transition-all duration-300 whitespace-nowrap min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    activeTab === tab
                      ? "text-white shadow-lg transform -translate-y-0.5"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  style={
                    activeTab === tab ? { backgroundColor: "#575757" } : {}
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Tabs Dropdown - Visible on Mobile */}
          <div className="md:hidden mb-6">
            <div className="relative">
              <label htmlFor="workspace-type-select" className="sr-only">
                Select workspace type
              </label>
              <select
                id="workspace-type-select"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                aria-label="Select workspace type"
                className="w-full px-6 py-3 rounded-full font-medium text-white focus:outline-none appearance-none pr-12"
                style={{
                  backgroundColor: "#636363",
                  borderRadius: "9999px",
                }}
              >
                {tabs.map((tab) => (
                  <option key={tab} value={tab}>
                    {tab}
                  </option>
                ))}
              </select>
              <div
                className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none z-10"
                style={{ zIndex: 10 }}
              >
                <Icon
                  icon="mdi:chevron-down"
                  width={20}
                  height={20}
                  className="text-white"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Day Pass Tabs - Mobile Only */}
          <div className="md:hidden mb-6">
            <div
              className="flex gap-2 w-full rounded-3xl"
              style={{ border: "1px solid #C4C4C4", backgroundColor: "white" }}
            >
              {dayPassOptions.map((option, index) => {
                const icons = [
                  "game-icons:office-chair",
                  "cbi:table-lighting-alt",
                  "guidance:office-pod",
                ];
                return (
                  <button
                    key={option}
                    onClick={() => setDayPass(option)}
                    className={`flex-1 px-3 py-2 rounded-3xl font-medium text-xs transition-all duration-300 flex flex-col items-center justify-center relative ${
                      dayPass === option
                        ? "border border-orange-500 bg-white -m-px z-10"
                        : "border border-transparent bg-white"
                    }`}
                    style={{
                      borderColor:
                        dayPass === option ? "#E07B39" : "transparent",
                    }}
                  >
                    <Icon
                      icon={icons[index]}
                      width={20}
                      height={20}
                      className={
                        dayPass === option
                          ? "text-orange-500 mb-1"
                          : "text-gray-400 mb-1"
                      }
                      style={{
                        color: dayPass === option ? "#E07B39" : "#999999",
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-xs font-medium whitespace-nowrap"
                      style={{
                        color: dayPass === option ? "#E07B39" : "#999999",
                      }}
                    >
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Search Form Row */}
          <div className="hidden md:flex flex-col md:flex-row gap-4 items-center">
            {/* Day Pass Dropdown - Desktop */}
            <div className="w-full md:w-1/2 relative">
              <label htmlFor="day-pass-select-desktop" className="sr-only">
                Select service type
              </label>
              <select
                id="day-pass-select-desktop"
                value={dayPass}
                onChange={(e) => setDayPass(e.target.value)}
                aria-label="Select service type"
                className="w-full px-6 py-3 rounded-xl font-normal text-gray-700 border border-gray-300 focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] appearance-none pr-12 transition-all"
                style={{
                  backgroundColor: "#F9F9F9",
                }}
              >
                {dayPassOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Icon
                  icon="mdi:chevron-down"
                  width={16}
                  color="#6B7280"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Location Input - Desktop */}
            <div className="w-full md:w-1/2">
              <label htmlFor="location-input-desktop" className="sr-only">
                Enter location
              </label>
              <input
                id="location-input-desktop"
                type="text"
                placeholder="Bengaluru"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Enter location"
                className="w-full px-6 py-3 rounded-xl font-normal text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] transition-all"
                style={{
                  backgroundColor: "#F9F9F9",
                }}
              />
            </div>

            {/* Explore Button - Desktop */}
            <button
              type="button"
              className="w-full md:w-auto text-white font-semibold px-10 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{
                backgroundColor: "#C76A30",
                boxShadow: "0px 15px 26px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              Explore
            </button>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {/* Location Input - Mobile */}
            <div>
              <label htmlFor="location-input-mobile" className="sr-only">
                Enter location
              </label>
              <input
                id="location-input-mobile"
                type="text"
                placeholder="Bengaluru"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Enter location"
                className="w-full px-6 py-3 rounded-xl font-normal text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] transition-all"
                style={{
                  backgroundColor: "#F9F9F9",
                }}
              />
            </div>

            {/* Explore Button - Mobile */}
            <button
              type="button"
              className="w-full text-white font-semibold px-10 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 min-h-[44px] flex items-center justify-center"
              style={{
                backgroundColor: "#C76A30",
                boxShadow: "0px 15px 26px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
