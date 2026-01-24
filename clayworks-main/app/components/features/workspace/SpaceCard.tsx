"use client";

import type React from "react";
import Image from "next/image";
import { Info } from "lucide-react";

// Types
export interface SpaceFeature {
  icon: React.ReactNode;
  text: string;
}

export interface SpaceTag {
  label: string;
}

export interface SpaceCard {
  id: string;
  image: string;
  title: string;
  location: string;
  features: SpaceFeature[];
  tags: SpaceTag[];
  moreTagsCount?: number;
}

export interface SpaceCarouselProps {
  badge?: string;
  title: string | React.ReactNode;
  spaces: SpaceCard[];
  onCardClick?: (space: SpaceCard) => void; // Optional - component handles internally if not provided
  onInfoClick?: (space: SpaceCard) => void; // Optional - component handles internally if not provided
}

const SpaceCarousel: React.FC<SpaceCarouselProps> = ({
  badge = "EXPLORE",
  title,
  spaces,
  onCardClick,
  onInfoClick,
}) => {
  return (
    <div className="w-full bg-white py-12 md:py-16">
      <div className="lg:px-6 md:px-7 md:container md:mx-auto">
        {/* Header */}
        <div className="mb-6 px-6 md:px-0">
          {badge && (
            <p className="text-base font-inter-normal text-black mb-3 tracking-wider uppercase text-center md:text-left">
              {badge}
            </p>
          )}
          <h2 className="text-3xl md:!text-3xl lg:!text-3xl font-inter-semibold text-[#2B2B2B] text-center md:text-left lg:max-w-72">
            {title}
          </h2>
        </div>

        {/* Desktop Grid - Show only 3 cards */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6" role="list">
          {spaces.slice(0, 3).map((space) => (
            <article
              key={space.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow duration-300 shadow-lg hover:shadow-xl"
              role="listitem"
            >
              {/* Image */}
              <button
                type="button"
                className="relative h-56 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2"
                onClick={() => {
                  if (onCardClick) {
                    onCardClick(space);
                  } else {
                    // TODO: Implement navigation to space detail page or modal

                  }
                }}
                aria-label={`View details for ${space.title} at ${space.location}`}
              >
                <Image
                  src={space.image}
                  alt={`${space.title} workspace located at ${space.location}`}
                  fill
                  className="object-cover"
                />
              </button>

              {/* Content */}
              <div className="p-6">
                {/* Title and Info */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-inter-bold text-[#121212] flex-1">
                    {space.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      if (onInfoClick) {
                        onInfoClick(space);
                      } else {
                        // TODO: Implement modal or navigation for space info

                      }
                    }}
                    className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2"
                    aria-label={`More information about ${space.title}`}
                  >
                    <Info className="w-5 h-5 text-black" aria-hidden="true" />
                  </button>
                </div>

                {/* Location */}
                <p className="text-sm text-[#959393] font-inter-normal mb-3">
                  {space.location}
                </p>

                {/* Features */}
                <ul
                  className="flex flex-wrap items-center gap-4 mb-4"
                  role="list"
                >
                  {space.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-1 text-sm text-black"
                      role="listitem"
                    >
                      <span
                        className="w-5 h-5 flex-shrink-0 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        {feature.icon}
                      </span>
                      <span className="whitespace-nowrap leading-none">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {space.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium text-[#606060] font-inter-normal rounded-full border border-[#606060]"
                    >
                      {tag.label}
                    </span>
                  ))}
                  {space.moreTagsCount && space.moreTagsCount > 0 && (
                    <span className="px-3 py-1 text-xs font-medium text-[#606060] font-inter-normal rounded-full border border-[#606060]">
                      +{space.moreTagsCount}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile & Tablet Horizontal Scroll */}
        <div className="lg:hidden">
          <div
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div
              className="flex gap-4 px-6 pb-4"
              role="list"
              aria-label="Workspace spaces carousel"
            >
              {spaces.map((space) => (
                <article
                  key={space.id}
                  className="flex-shrink-0 w-[280px] md:w-[320px]"
                  role="listitem"
                >
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow duration-300 shadow-lg h-full">
                    {/* Image */}
                    <button
                      type="button"
                      className="relative h-48 md:h-56 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2"
                      onClick={() => {
                        if (onCardClick) {
                          onCardClick(space);
                        } else {

                        }
                      }}
                      aria-label={`View details for ${space.title} at ${space.location}`}
                    >
                      <Image
                        src={space.image}
                        alt={`${space.title} workspace located at ${space.location}`}
                        fill
                        className="object-cover"
                      />
                    </button>

                    {/* Content */}
                    <div className="p-4 md:p-6">
                      {/* Title and Info */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-inter-bold text-[#121212] flex-1">
                          {space.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() => {
                            if (onInfoClick) {
                              onInfoClick(space);
                            } else {

                            }
                          }}
                          className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2"
                          aria-label={`More information about ${space.title}`}
                        >
                          <Info
                            className="w-4 h-4 md:w-5 md:h-5 text-black"
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      {/* Location */}
                      <p className="text-sm text-[#959393] font-inter-normal mb-3">
                        {space.location}
                      </p>

                      {/* Features */}
                      <ul
                        className="flex flex-wrap items-center gap-3 md:gap-4 mb-4"
                        role="list"
                      >
                        {space.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 md:gap-1 text-xs md:text-sm text-black"
                            role="listitem"
                          >
                            <span
                              className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 flex items-center justify-center"
                              aria-hidden="true"
                            >
                              {feature.icon}
                            </span>
                            <span className="whitespace-nowrap leading-none">
                              {feature.text}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {space.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 md:px-3 text-xs font-medium text-[#606060] font-inter-normal rounded-full border border-[#606060]"
                          >
                            {tag.label}
                          </span>
                        ))}
                        {space.moreTagsCount && space.moreTagsCount > 0 && (
                          <span className="px-2 py-1 md:px-3 text-xs font-medium text-[#606060] font-inter-normal rounded-full border border-[#606060]">
                            +{space.moreTagsCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceCarousel;
