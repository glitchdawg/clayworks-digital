"use client";
import { ServiceCard } from "../services/ServiceCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function WorkspacesSection() {
  // Slick settings for mobile carousel - matching CoWorkingSpaces
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
    centerPadding: "10px", // Mobile: Fixed padding for better card visibility
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px", // Tablet: More padding for better visibility
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px", // Desktop: Same as tablet for consistency
        },
      },
    ],
  };

  const services = [
    {
      image: "/images/servicecard1.jpg",
      title: "Private Office Spaces",
      description:
        "Fully serviced private workspaces tailored for focused, growing teams.",
      features: [
        "Any team size",
        "On-site support",
        "Parking Available",
        "+6 More",
      ],
      buttonText: "Explore Private Offices",
      buttonVariant: "primary" as const,
      featured: true,
    },
    {
      image: "/images/servicecard2.jpg",
      title: "Day Pass",
      description:
        "Drop in for a productive workday in a beautiful co-working space",
      features: ["High-speed internet", "Ergonomic Seating", "+6 amenities"],
      buttonText: "Book Day Pass",
    },
    {
      image: "/images/servicecard3.jpg",
      title: "Premium Conference Rooms",
      description:
        "Drop in for a productive workday in a beautiful co-working space",
      features: ["Plug and play setup", "Catering", "+6 amenities"],
      buttonText: "Reserve Meeting Room",
    },
    {
      image: "/images/servicecard4.png",
      title: "Build-to-Suit",
      description:
        "End-to-end custom office creation for large and scaling enterprises",
      features: ["Location sourcing", "Brand integration", "+8 amenities"],
      buttonText: "View Case Studies",
    },
  ];

  return (
    <section className="pb-12 pt-20 md:py-16 lg:py-20">
      {/* Desktop Layout */}
      <div className="hidden lg:block container mx-auto">
        {/* Top Row: Header (left) + Featured Card (right) */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Header - Left Side (30%) */}
          <div className="col-span-4 flex flex-col justify-base space-y-2">
            <p className="text-base font-inter-normal text-black uppercase tracking-wider mb-1">
              OUR SERVICES
            </p>
            <h2 className="text-3xl md:!text-3xl lg:!text-4xl font-medium font-inter-medium text-[#2B2B2B] leading-tight">
              Workspaces
              <br />
              That Fit You
            </h2>
            <p className="text-[#333336] max-w-72 font-inter-normal mx-auto md:mx-0">
              Choose the kind of space that matches your need, style, and goals.
            </p>
          </div>

          {/* Featured Card - Right Side (70%) */}
          <div className="col-span-8">
            <ServiceCard {...services[0]} />
          </div>
        </div>

        {/* Bottom Row: Three cards in a row */}
        <div className="grid grid-cols-3 gap-6">
          {services.slice(1).map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Layout - Carousel */}
      <div className="lg:hidden pl-4 md:px-6">
        <div className="mb-8 text-center space-y-2">
          <p className="text-base font-inter-normal text-black uppercase tracking-wider">
            OUR SERVICES
          </p>
          <h2 className=" !text-[#2B2B2B] font-inter-medium md:!text-[52px] text-[32px] leading-tight">
            Workspaces <br /> That Fit You
          </h2>
          <p className="text-[#333336] max-w-72 font-inter-normal mx-auto md:mx-0">
            Choose the kind of space that matches your need, style, and goals.
          </p>
        </div>

        <Slider {...settings}>
          {services.map((service, index) => (
            <div key={index} className="py-4 pl-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden group h-[450px] w-full max-w-[360px] mx-auto flex flex-col">
                <ServiceCard {...service} featured={false} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
