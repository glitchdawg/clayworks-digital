"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CoWorkingSpaces() {
  const spaces = [
    {
      id: 1,
      name: "ClayWorks Opus",
      location: "Richmond road, Bengaluru",
      image: "/images/workspace.jpg",
      tags: ["Flexible Office Spaces", "Meeting Rooms", "126 Seats"],
    },
    {
      id: 2,
      name: "ClayWorks Miniforest",
      location: "JP Nagar, Bengaluru",
      image: "/images/workspace1.jpg",
      tags: ["Flexible Office Spaces", "Meeting Rooms", "126 Seats"],
    },
    {
      id: 3,
      name: "ClayWorks Create",
      location: "Bannerghatta Road, Bengaluru",
      image: "/images/workspace2.jpg",
      tags: ["Flexible Office Spaces", "Meeting Rooms", "126 Seats"],
    },
  ];

  // Slick settings for responsive carousel
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    fade: false,
    cssEase: "ease-in-out",
    centerMode: true,
    centerPadding: "10%", // Mobile: Shows center card with 10% of next card visible
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "15%", // Tablet: More padding for better visibility
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "15%", // Desktop: Same as tablet for consistency
        },
      },
    ],
  };

  return (
    <section className=" bg-white ">
      {/* Section Header */}
      <div className="text-center mb-6 lg:mb-12">
        <p className="text-base font-inter-normal text-black uppercase tracking-wider mb-1">
          CO-WORKING SPACES
        </p>
        <h2 className="text-3xl md:!text-3xl lg:!text-4xl font-medium font-inter-medium text-[#2B2B2B]">
          Our Most Featured
        </h2>
      </div>
      <div className="container mx-auto">
        {/* Desktop Grid - Hidden on mobile/tablet */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group h-96 w-full flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-64 flex-shrink-0 overflow-hidden">
                <Image
                  src={space.image}
                  alt={`${space.name} co-working space located at ${space.location}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content Section */}
              <div className="p-4 flex-1 flex flex-col">
                {/* Space Name */}
                <h3 className="text-xl font-bold font-inter-bold text-[#212121]">
                  {space.name}
                </h3>

                {/* Location */}
                <p className="text-[#212121] my-2 text-base font-normal font-inter-normal">
                  {space.location}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {space.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium font-inter-medium text-[#212121] px-3 py-1 rounded-full border border-[#DDDDDD] transition-all duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Carousel with React Slick */}
      <div className="lg:hidden">
        <Slider {...settings}>
          {spaces.map((space) => (
            <div key={space.id} className="px-1 py-4">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden group h-96 w-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-56 flex-shrink-0 overflow-hidden">
                  <Image
                    src={space.image}
                    alt={`${space.name} co-working space located at ${space.location}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Space Name */}
                  <h3 className="text-xl font-bold font-inter-bold text-[#212121] mb-2">
                    {space.name}
                  </h3>

                  {/* Location */}
                  <p className="text-[#212121] mb-4 text-base font-normal font-inter-normal">
                    {space.location}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {space.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs font-medium font-inter-medium text-[#212121] px-2 py-1 rounded-full border border-[#DDDDDD] transition-all duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
