"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { locationsDetail } from "@/db/locations";
import {
  locationMapping,
  solutions,
  resources,
  navigation,
  contactInfo,
  logoConfig,
  headerConfig,
} from "@/db/header";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [isMobileLocationsOpen, setIsMobileLocationsOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);

  // Check if a route is active
  const isActive = (href: string) => pathname === href;

  // Check if any solution route is active
  const isSolutionsActive = solutions.some((solution) =>
    isActive(solution.href),
  );

  // Check if any location route is active
  const isLocationsActive = pathname.startsWith("/location/");

  // Check if any resource route is active
  const isResourcesActive = resources.some((resource) =>
    isActive(resource.href),
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism Background - constrained to header bar only on mobile */}
      <div
        className="absolute top-0 left-0 right-0 h-[72px] lg:inset-0 lg:h-auto backdrop-blur-sm border-b border-white/40"
        style={{
          background: "#FFFFFF",
          boxShadow: "0px 4px 24px 0px #00000012",
        }}
      ></div>
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 lg:py-5">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <Image
                  src={logoConfig.src}
                  alt={logoConfig.alt}
                  width={logoConfig.width}
                  height={logoConfig.height}
                  className="h-7 w-auto lg:h-10"
                />
              </Link>
            </div>

            {/* Navigation + Contact Section - Desktop */}
            <div className="hidden lg:flex items-center gap-6 xl:!gap-8">
              {/* Navigation */}
              <nav className="flex items-center gap-6 xl:!gap-8">
                {/* Navigation Items */}
                {navigation.map((navItem) => (
                  <Link
                    key={navItem.href}
                    href={navItem.href}
                    className={`text-sm whitespace-nowrap transition-colors ${
                      isActive(navItem.href)
                        ? "font-semibold text-black"
                        : "font-normal text-gray-900 hover:text-gray-600"
                    }`}
                  >
                    {navItem.label}
                  </Link>
                ))}

                {/* Solutions Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsSolutionsOpen(true)}
                  onMouseLeave={() => setIsSolutionsOpen(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 group cursor-pointer bg-transparent border-none p-0"
                    aria-expanded={isSolutionsOpen}
                    aria-haspopup="true"
                    aria-controls="solutions-menu"
                    onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsSolutionsOpen(!isSolutionsOpen);
                      } else if (e.key === "ArrowDown" && !isSolutionsOpen) {
                        e.preventDefault();
                        setIsSolutionsOpen(true);
                      }
                    }}
                  >
                    <span
                      className={`text-sm whitespace-nowrap transition-colors ${
                        isSolutionsActive
                          ? "font-semibold text-black"
                          : "font-normal text-gray-900 group-hover:text-gray-600"
                      }`}
                    >
                      SOLUTIONS
                    </span>
                    <Icon
                      icon="mdi:chevron-down"
                      className={`w-6 h-6 transition-transform duration-200 ${
                        isSolutionsActive
                          ? "text-black"
                          : "text-gray-900 group-hover:text-gray-600"
                      } ${isSolutionsOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isSolutionsOpen && (
                    <div
                      id="solutions-menu"
                      role="menu"
                      className="absolute top-full left-0 w-72 pt-2"
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setIsSolutionsOpen(false);
                          const button = e.currentTarget
                            .previousElementSibling as HTMLElement;
                          button?.focus();
                        }
                      }}
                    >
                      <div
                        className="bg-white rounded-xl py-4 z-50"
                        style={{
                          boxShadow: `
                            0px 8px 18px 0px #0000001A,
                            0px 34px 34px 0px #00000017,
                            0px 75px 45px 0px #0000000D,
                            0px 134px 54px 0px #00000003,
                            0px 210px 59px 0px #00000000
                          `,
                        }}
                      >
                        {solutions.map((solution, index) => {
                          const active = isActive(solution.href);
                          return (
                            <React.Fragment key={solution.href}>
                              <Link
                                href={solution.href}
                                role="menuitem"
                                className="block px-6 py-3 hover:bg-gray-50 transition-colors group/item focus:bg-gray-50 focus:outline-none"
                                onClick={() => setIsSolutionsOpen(false)}
                              >
                                <div
                                  className={`text-sm mb-1 ${
                                    active
                                      ? "font-semibold text-black"
                                      : "font-semibold text-gray-900 group-hover/item:text-gray-700"
                                  }`}
                                >
                                  {solution.title}
                                </div>
                                <div className="text-xs text-gray-600 leading-relaxed">
                                  {solution.subtitle}
                                </div>
                              </Link>
                              {index < solutions.length - 1 && (
                                <div className="mx-6 h-px bg-gray-200" />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Locations Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsLocationsOpen(true)}
                  onMouseLeave={() => setIsLocationsOpen(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 group cursor-pointer bg-transparent border-none p-0"
                    aria-expanded={isLocationsOpen}
                    aria-haspopup="true"
                    aria-controls="locations-menu"
                    onClick={() => setIsLocationsOpen(!isLocationsOpen)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsLocationsOpen(!isLocationsOpen);
                      } else if (e.key === "ArrowDown" && !isLocationsOpen) {
                        e.preventDefault();
                        setIsLocationsOpen(true);
                      }
                    }}
                  >
                    <span
                      className={`text-sm whitespace-nowrap transition-colors ${
                        isLocationsActive
                          ? "font-semibold text-black"
                          : "font-normal text-gray-900 group-hover:text-gray-600"
                      }`}
                    >
                      LOCATIONS
                    </span>
                    <Icon
                      icon="mdi:chevron-down"
                      className={`w-6 h-6 transition-transform duration-200 ${
                        isLocationsActive
                          ? "text-black"
                          : "text-gray-900 group-hover:text-gray-600"
                      } ${isLocationsOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isLocationsOpen && (
                    <div
                      id="locations-menu"
                      role="menu"
                      className="absolute top-full left-0 w-72 pt-2"
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setIsLocationsOpen(false);
                          const button = e.currentTarget
                            .previousElementSibling as HTMLElement;
                          button?.focus();
                        }
                      }}
                    >
                      <div
                        className="bg-white rounded-xl py-4 z-50"
                        style={{
                          boxShadow: `
                            0px 8px 18px 0px #0000001A,
                            0px 34px 34px 0px #00000017,
                            0px 75px 45px 0px #0000000D,
                            0px 134px 54px 0px #00000003,
                            0px 210px 59px 0px #00000000
                          `,
                        }}
                      >
                        <div className="px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {headerConfig.locations.cityLabel}
                        </div>
                        {locationsDetail
                          .filter((location) => locationMapping[location.slug])
                          .map((location, index, filteredLocations) => {
                            const mapping = locationMapping[location.slug];
                            const active = isActive(
                              `/location/${location.slug}`,
                            );
                            return (
                              <React.Fragment key={location.slug}>
                                <Link
                                  href={`/location/${location.slug}`}
                                  role="menuitem"
                                  className="block px-6 py-3 hover:bg-gray-50 transition-colors group/item focus:bg-gray-50 focus:outline-none"
                                  onClick={() => setIsLocationsOpen(false)}
                                >
                                  <div
                                    className={`text-sm mb-1 ${
                                      active
                                        ? "font-semibold text-black"
                                        : "font-semibold text-gray-900 group-hover/item:text-gray-700"
                                    }`}
                                  >
                                    {mapping.title}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {mapping.subtitle}
                                  </div>
                                </Link>
                                {index < filteredLocations.length - 1 && (
                                  <div className="mx-6 h-px bg-gray-200" />
                                )}
                              </React.Fragment>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Resources Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 group cursor-pointer bg-transparent border-none p-0"
                    aria-expanded={isResourcesOpen}
                    aria-haspopup="true"
                    aria-controls="resources-menu"
                    onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsResourcesOpen(!isResourcesOpen);
                      } else if (e.key === "ArrowDown" && !isResourcesOpen) {
                        e.preventDefault();
                        setIsResourcesOpen(true);
                      }
                    }}
                  >
                    <span
                      className={`text-sm whitespace-nowrap transition-colors ${
                        isResourcesActive
                          ? "font-semibold text-black"
                          : "font-normal text-gray-900 group-hover:text-gray-600"
                      }`}
                    >
                      RESOURCES
                    </span>
                    <Icon
                      icon="mdi:chevron-down"
                      className={`w-6 h-6 transition-transform duration-200 ${
                        isResourcesActive
                          ? "text-black"
                          : "text-gray-900 group-hover:text-gray-600"
                      } ${isResourcesOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isResourcesOpen && (
                    <div
                      id="resources-menu"
                      role="menu"
                      className="absolute top-full left-0 w-56 pt-2"
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setIsResourcesOpen(false);
                          const button = e.currentTarget
                            .previousElementSibling as HTMLElement;
                          button?.focus();
                        }
                      }}
                    >
                      <div
                        className="bg-white rounded-xl py-4 z-50"
                        style={{
                          boxShadow: `
                            0px 8px 18px 0px #0000001A,
                            0px 34px 34px 0px #00000017,
                            0px 75px 45px 0px #0000000D,
                            0px 134px 54px 0px #00000003,
                            0px 210px 59px 0px #00000000
                          `,
                        }}
                      >
                        {resources.map((resource) => {
                          const active = isActive(resource.href);
                          return (
                            <Link
                              key={resource.href}
                              href={resource.href}
                              role="menuitem"
                              className={`block px-6 py-3 text-sm transition-colors focus:bg-gray-50 focus:outline-none ${
                                active
                                  ? "font-semibold text-black"
                                  : "text-gray-900 hover:bg-gray-50"
                              }`}
                              onClick={() => setIsResourcesOpen(false)}
                            >
                              {resource.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </nav>

              {/* Contact Section */}
              <div className="flex items-center gap-8">
                <div className="text-sm font-normal text-gray-900 whitespace-nowrap">
                  CALL US :{" "}
                  <span className="font-bold">{contactInfo.phoneDisplay}</span>
                </div>
                <a
                  href="https://wa.me/917338546910"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-all duration-300 flex-shrink-0"
                  aria-label="Contact us on WhatsApp"
                >
                  <Image
                    src="/images/whatsapp.svg"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:${contactInfo.phone}`}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-all duration-300"
                aria-label={`Call us at ${contactInfo.phoneDisplay}`}
              >
                <Icon icon="mdi:phone" className="w-6 h-6 text-gray-900" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-all duration-300"
                aria-label={
                  isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
                }
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <Icon icon="gg:close" className="w-8 h-8 text-gray-900" />
                ) : (
                  <Icon icon="gg:menu" className="w-8 h-8 text-gray-900" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - positioned outside container */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 pb-4">
            <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg rounded-b-3xl max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-4 sm:p-6 space-y-1">
                  {/* Navigation Items */}
                  {navigation.map((navItem) => (
                    <Link
                      key={navItem.href}
                      href={navItem.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-sm transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 ${
                        isActive(navItem.href)
                          ? "font-semibold text-black"
                          : "font-medium text-gray-900 hover:text-gray-600"
                      }`}
                    >
                      {navItem.label}
                    </Link>
                  ))}

                  {/* Solutions Dropdown */}
                  <div>
                    <button
                      onClick={() =>
                        setIsMobileSolutionsOpen(!isMobileSolutionsOpen)
                      }
                      className={`w-full flex items-center justify-between text-sm transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 ${
                        isSolutionsActive
                          ? "font-semibold text-black"
                          : "font-medium text-gray-900 hover:text-gray-600"
                      }`}
                      aria-expanded={isMobileSolutionsOpen}
                      aria-label={`${isMobileSolutionsOpen ? "Collapse" : "Expand"} Solutions menu`}
                    >
                      <span>SOLUTIONS</span>
                      <Icon
                        icon="mdi:chevron-down"
                        className={`w-6 h-6 transition-transform duration-200 ${
                          isSolutionsActive ? "text-black" : "text-gray-900"
                        } ${isMobileSolutionsOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    {isMobileSolutionsOpen && (
                      <div className="pl-4 mt-1 space-y-1">
                        {solutions.map((solution) => {
                          const active = isActive(solution.href);
                          return (
                            <Link
                              key={solution.href}
                              href={solution.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`block text-sm transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 ${
                                active
                                  ? "text-black"
                                  : "text-gray-700 hover:text-gray-900"
                              }`}
                            >
                              <div
                                className={`mb-1 ${
                                  active ? "font-semibold" : "font-semibold"
                                }`}
                              >
                                {solution.title}
                              </div>
                              <div className="text-xs text-gray-600 leading-relaxed">
                                {solution.subtitle}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Locations Dropdown */}
                  <div>
                    <button
                      onClick={() =>
                        setIsMobileLocationsOpen(!isMobileLocationsOpen)
                      }
                      className={`w-full flex items-center justify-between text-sm transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 ${
                        isLocationsActive
                          ? "font-semibold text-black"
                          : "font-medium text-gray-900 hover:text-gray-600"
                      }`}
                      aria-expanded={isMobileLocationsOpen}
                      aria-label={`${isMobileLocationsOpen ? "Collapse" : "Expand"} Locations menu`}
                    >
                      <span>LOCATIONS</span>
                      <Icon
                        icon="mdi:chevron-down"
                        className={`w-6 h-6 transition-transform duration-200 ${
                          isLocationsActive ? "text-black" : "text-gray-900"
                        } ${isMobileLocationsOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    {isMobileLocationsOpen && (
                      <div className="pl-4 mt-1 space-y-1">
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {headerConfig.locations.cityLabel}
                        </div>
                        {locationsDetail.map((location) => {
                          const mapping = locationMapping[location.slug];
                          if (!mapping) return null;
                          const active = isActive(`/location/${location.slug}`);
                          return (
                            <Link
                              key={location.slug}
                              href={`/location/${location.slug}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`block text-sm transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 ${
                                active
                                  ? "text-black"
                                  : "text-gray-700 hover:text-gray-900"
                              }`}
                            >
                              <div
                                className={`mb-1 ${
                                  active ? "font-semibold" : "font-semibold"
                                }`}
                              >
                                {mapping.title}
                              </div>
                              <div className="text-xs text-gray-600">
                                {mapping.subtitle}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Resources Dropdown */}
                  <div>
                    <button
                      onClick={() =>
                        setIsMobileResourcesOpen(!isMobileResourcesOpen)
                      }
                      className={`w-full flex items-center justify-between text-sm transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 ${
                        isResourcesActive
                          ? "font-semibold text-black"
                          : "font-medium text-gray-900 hover:text-gray-600"
                      }`}
                      aria-expanded={isMobileResourcesOpen}
                      aria-label={`${isMobileResourcesOpen ? "Collapse" : "Expand"} Resources menu`}
                    >
                      <span>RESOURCES</span>
                      <Icon
                        icon="mdi:chevron-down"
                        className={`w-6 h-6 transition-transform duration-200 ${
                          isResourcesActive ? "text-black" : "text-gray-900"
                        } ${isMobileResourcesOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    {isMobileResourcesOpen && (
                      <div className="pl-4 mt-1 space-y-1">
                        {resources.map((resource) => {
                          const active = isActive(resource.href);
                          return (
                            <Link
                              key={resource.href}
                              href={resource.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`block text-sm transition-colors py-2 px-4 rounded-lg hover:bg-gray-50 ${
                                active
                                  ? "font-semibold text-black"
                                  : "text-gray-700 hover:text-gray-900"
                              }`}
                            >
                              {resource.title}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
