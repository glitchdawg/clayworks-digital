import Image from "next/image";
import { LocationCard } from "./LocationCard";
import { Button } from "../../ui/button";

export default function Location() {
  const locations = [
    {
      title: "ClayWorks JP Nagar",
      address: "3rd Phase, J. P. Nagar, Bangalore",
      travelTime: "25 min",
      distance: "2.1 km",
      hasPowerBackup: true,
    },
    {
      title: "ClayWorks Koramangala",
      address: "5th Block, Koramangala, Bangalore",
      travelTime: "18 min",
      distance: "1.8 km",
      hasPowerBackup: true,
    },
    {
      title: "ClayWorks Whitefield",
      address: "ITPL Road, Whitefield, Bangalore",
      travelTime: "32 min",
      distance: "4.2 km",
      hasPowerBackup: true,
    },
    {
      title: "ClayWorks Indiranagar",
      address: "100 Feet Road, Indiranagar, Bangalore",
      travelTime: "22 min",
      distance: "1.5 km",
      hasPowerBackup: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white lg:px-6 py-16">
      {/* Desktop Layout */}
      <div className="hidden lg:block container mx-auto">
        <div className="grid grid-cols-12 gap-12 mb-12">
          {/* Map Section */}
          <div className="relative col-span-7">
            <Image
              src="/images/location.png"
              alt="Location map"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-start col-span-5">
            <p className="text-base tracking-wider text-black uppercase mb-4">
              LOCATIONS
            </p>
            <h1 className="mb-6 text-4xl font-inter-medium text-[#1A2C42] max-w-80 leading-tight">
              Strategically Located Where Business Happens
            </h1>
            <p className="text-[#1A2C42] font-inter-normal max-w-md leading-relaxed">
              From startups to enterprises, our flexible spaces grow with you —
              fully managed, beautifully designed, and ready to use.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-4 gap-6 mb-12 relative -mt-28 z-10">
          {locations.map((location) => (
            <LocationCard key={location.title} {...location} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="px-12 border-[#2C3E50] text-[#2C3E50]"
          >
            Read all stories
          </Button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Text Section */}
        <div className="text-center mb-12">
          <p className="text-base tracking-wider text-[#1A2C42] font-inter-normal mb-4">
            LOCATIONS
          </p>
          <h1 className="mb-6 text-4xl font-inter-medium text-[#1A2C42]">
            Strategically located where business happens
          </h1>
          <p className="text-[#1A2C42] font-inter-normal">
            From startups to enterprises, our flexible spaces grow with
            you—fully managed, beautifully designed, and ready to use.
          </p>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="mb-12">
          <div
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="flex gap-4 px-6 pb-4">
              {locations.map((location) => (
                <div
                  key={`${location.title}-mobile`}
                  className="flex-shrink-0 w-[280px]"
                >
                  <LocationCard {...location} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="px-12 border-[#2C3E50] text-[#2C3E50]"
          >
            View All Locations
          </Button>
        </div>
      </div>
    </div>
  );
}
