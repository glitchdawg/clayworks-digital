// components/DayPass.tsx
"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Star, Clock, Play } from "lucide-react";

// Types for component props
export interface ImageConfig {
  src?: string;
  alt?: string;
  placeholder?: string;
  bgGradient?: string;
  hasPlayButton?: boolean;
}

export interface FormOption {
  value: string;
  label: string;
}

export interface TabOption {
  label: string;
  value: string;
  active?: boolean;
}

export interface RatingInfo {
  rating: number;
  reviewCount: number;
}

export interface DayPassProps {
  // Layout configuration
  layout?: "image-left" | "image-right" | "dual-image-right";

  // Content
  badge?: string;
  subtitle?: string; // e.g., "Richmond Road, BLR"
  title: string;
  description: string;

  // Optional rating and hours
  rating?: RatingInfo;
  operatingHours?: string; // e.g., "Open 24/7"

  // Images
  mainImage?: ImageConfig;
  secondaryImages?: [ImageConfig, ImageConfig]; // For dual image layout

  // Tab navigation (optional)
  tabs?: TabOption[];
  onTabChange?: (value: string) => void;

  // Form configuration
  showForm?: boolean;
  dateOptions?: FormOption[];
  timeOptions?: FormOption[]; // Optional time selector
  guestsOptions?: FormOption[];
  locationOptions?: FormOption[];

  // Button configuration
  buttonText?: string;
  buttonTextMobile?: string;
  buttonColor?: string;
  buttonHoverColor?: string;

  // Callbacks (optional - component handles internally if not provided)
  onSubmit?: (data: {
    date?: string;
    time?: string;
    guests?: string;
    location?: string;
  }) => void;
  onExplore?: () => void;

  // Styling
  className?: string;
}

const DayPass: React.FC<DayPassProps> = ({
  layout = "image-left",
  badge,
  subtitle,
  title,
  description,
  rating,
  operatingHours,
  mainImage = {
    placeholder: "Professional Image",
    bgGradient: "from-blue-100 to-blue-50",
  },
  secondaryImages,
  tabs,
  onTabChange,
  showForm = true,
  dateOptions = [],
  timeOptions = [],
  guestsOptions = [],
  locationOptions = [],
  buttonText = "",
  buttonTextMobile = "",
  buttonColor = "bg-brand-primary",
  buttonHoverColor = "hover:bg-brand-primary-hover",
  onSubmit,
  onExplore,
  className = "",
}) => {
  const [date, setDate] = useState(dateOptions[0]?.value || "");
  const [time, setTime] = useState(timeOptions[0]?.value || "");
  const [guests, setGuests] = useState(guestsOptions[0]?.value || "");
  const [location, setLocation] = useState(locationOptions[0]?.value || "");
  const [activeTab, setActiveTab] = useState(
    tabs?.find((t) => t.active)?.value || tabs?.[0]?.value || "",
  );

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ date, time, guests, location });
    } else {
      // TODO: Implement backend API integration for form submission

    }
  };

  const handleExplore = () => {
    if (onExplore) {
      onExplore();
    } else {
      // TODO: Implement navigation or action for explore button

    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onTabChange) {
      onTabChange(value);
    }
  };

  // Single Image Section Component
  const SingleImageSection = () => (
    <div className="flex items-center w-full">
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] overflow-hidden rounded-3xl">
        {mainImage.src ? (
          <>
            <Image
              src={mainImage.src}
              alt={mainImage.alt || "Main image"}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-fill rounded-3xl"
              priority
            />
            {mainImage.hasPlayButton && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2"
                  aria-label="Play video"
                >
                  <Play
                    className="w-8 h-8 text-gray-800 ml-1"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
          </>
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${mainImage.bgGradient} rounded-3xl flex items-center justify-center`}
          >
            <div className="absolute top-4 left-4 space-y-2">
              <div className="w-12 h-2 bg-blue-400 rounded"></div>
              <div className="w-8 h-8 bg-blue-300 rounded"></div>
              <div className="w-6 h-6 bg-blue-200 rounded"></div>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <p className="text-gray-500">{mainImage.placeholder}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Dual Image Section Component
  const DualImageSection = () => (
    <div className="w-full grid grid-cols-2 gap-4">
      {secondaryImages?.map((image, index) => (
        <div
          key={index}
          className="relative h-[265px] md:h-[315px] lg:h-[365px] xl:h-[390px] overflow-hidden rounded-2xl"
        >
          {image.src ? (
            <Image
              src={image.src}
              alt={image.alt || `Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
              className="object-fill rounded-2xl"
              priority
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${image.bgGradient} rounded-2xl flex items-center justify-center`}
            >
              <p className="text-gray-500 text-sm">{image.placeholder}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Content Section Component
  const ContentSection = () => (
    <div className="flex flex-col justify-center space-y-6 lg:py-8">
      <div>
        {/* Subtitle - Location/Category */}
        {subtitle && (
          <p className="text-sm md:!text-base font-inter-medium text-gray-600 mb-2">
            {subtitle}
          </p>
        )}

        {/* Badge */}
        {badge && (
          <p className="text-sm md:!text-lg font-inter-medium text-black mb-2 tracking-wider uppercase">
            {badge}
          </p>
        )}

        {/* Title */}
        <h1 className="text-3xl md:!text-4xl lg:!text-3xl xl:!text-5xl font-inter-semibold text-black mb-4 leading-tight">
          {title}
        </h1>

        {/* Rating and Operating Hours */}
        {(rating || operatingHours) && (
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {rating && (
              <div className="flex items-center gap-2">
                <Star
                  className="w-5 h-5 fill-black text-black"
                  aria-hidden="true"
                />
                <span className="font-inter-medium text-black">
                  {rating.rating} ({rating.reviewCount} reviews)
                </span>
              </div>
            )}
            {operatingHours && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-black" aria-hidden="true" />
                <span className="font-inter-medium text-black">
                  {operatingHours}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-[#1A2C42] font-inter-normal text-sm md:!text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Tabs Navigation */}
      {tabs && tabs.length > 0 && (
        <div
          className="grid md:grid-cols-3 grid-cols-1 gap-3"
          role="tablist"
          aria-label="Navigation tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.value}
              aria-controls={`tabpanel-${tab.value}`}
              onClick={() => handleTabChange(tab.value)}
              className={`px-6 py-2.5 rounded-full font-inter-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2 ${activeTab === tab.value
                  ? "bg-[#5A5A5A] text-white"
                  : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Form - Desktop */}
      {showForm && buttonText && (
        <form
          className="hidden md:block space-y-4 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm p-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          aria-label="Booking form"
          style={{
            boxShadow: `
              0px 3px 7px 0px #0000000A,
              0px 13px 13px 0px #00000008,
              0px 30px 18px 0px #00000005,
              0px 53px 21px 0px #00000003,
              0px 83px 23px 0px #00000000
            `,
          }}
        >
          {/* Date, Time, and Guests Row */}
          <div
            className={`grid gap-4 ${timeOptions.length > 0 ? "grid-cols-2" : guestsOptions.length > 0 ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {/* Date Selector */}
            {dateOptions.length > 0 && (
              <div className="relative">
                <label htmlFor="date-select" className="sr-only">
                  Select date
                </label>
                <select
                  id="date-select"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-lg appearance-none text-gray-900 text-sm focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] cursor-pointer border border-[#E0E0E0] bg-[#F9F9F9] transition-all"
                  aria-label="Select date"
                >
                  {dateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5"
                  aria-hidden="true"
                />
              </div>
            )}

            {/* Time Selector */}
            {timeOptions.length > 0 && (
              <div className="relative">
                <label htmlFor="time-select" className="sr-only">
                  Select time
                </label>
                <select
                  id="time-select"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-lg appearance-none text-gray-900 text-sm focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] cursor-pointer border border-[#E0E0E0] bg-[#F9F9F9] transition-all"
                  aria-label="Select time"
                >
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5"
                  aria-hidden="true"
                />
              </div>
            )}

            {/* Guests Selector */}
            {guestsOptions.length > 0 && !timeOptions.length && (
              <div className="relative">
                <label htmlFor="guests-select" className="sr-only">
                  Select number of guests
                </label>
                <select
                  id="guests-select"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-lg appearance-none text-gray-900 text-sm focus:outline-none focus:border-[#E07B39] focus:shadow-[0_0_0_1.5px_#E07B39] cursor-pointer border border-[#E0E0E0] bg-[#F9F9F9] transition-all"
                  aria-label="Select number of guests"
                >
                  {guestsOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>

          {/* Location Selector */}
          {locationOptions.length > 0 && (
            <div className="relative">
              <label htmlFor="location-select" className="sr-only">
                Select location
              </label>
              <select
                id="location-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3.5 rounded-lg appearance-none text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:border-transparent cursor-pointer border border-[#E0E0E0] bg-[#F9F9F9]"
                aria-label="Select location"
              >
                {locationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5"
                aria-hidden="true"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full ${buttonColor} ${buttonHoverColor} text-white font-semibold py-3.5 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2`}
            style={{
              boxShadow: "0px 15px 26px 0px #00000040",
            }}
          >
            {buttonText}
          </button>
        </form>
      )}

      {/* Standalone Button - Desktop (when showForm is false) */}
      {!showForm && buttonText && (
        <div className="hidden md:block">
          <button
            type="button"
            onClick={handleExplore}
            className={`${buttonColor} ${buttonHoverColor} text-white font-semibold py-3.5 px-16 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2`}
            style={{
              boxShadow: "0px 15px 26px 0px #00000040",
            }}
          >
            {buttonText}
          </button>
        </div>
      )}

      {/* Mobile Button */}
      {buttonTextMobile && (
        <div className="md:hidden flex justify-center">
          <button
            type="button"
            onClick={showForm ? handleSubmit : handleExplore}
            className={`${buttonColor} ${buttonHoverColor} text-white font-semibold py-3 px-20 rounded-lg transition-colors duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E07B39] focus:ring-offset-2`}
            style={{
              boxShadow: "0px 15px 26px 0px #00000040",
            }}
          >
            {buttonTextMobile}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className={`bg-white ${className}`}>
      <div className="container mx-auto px-6">
        {/* Main Content */}
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 xl:gap-16 items-center">
            {layout === "image-left" && (
              <>
                <div className="lg:col-span-6">
                  <SingleImageSection />
                </div>
                <div className="lg:col-span-4">
                  <ContentSection />
                </div>
              </>
            )}

            {layout === "image-right" && (
              <>
                <div className="lg:col-span-4">
                  <ContentSection />
                </div>
                <div className="lg:col-span-6">
                  <SingleImageSection />
                </div>
              </>
            )}

            {layout === "dual-image-right" && (
              <>
                <div className="lg:col-span-4">
                  <ContentSection />
                </div>
                <div className="lg:col-span-6">
                  <DualImageSection />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayPass;
